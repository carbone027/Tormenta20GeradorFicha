const pool = require('../config/database');

class Character {
  static async findAllByUser(userId) {
    try {
      const result = await pool.query(`
        SELECT p.*, r.nome as raca_nome, c.nome as classe_nome, d.nome as deus_nome
        FROM personagens p
        LEFT JOIN racas r ON p.raca_id = r.id
        LEFT JOIN classes c ON p.classe_id = c.id
        LEFT JOIN deuses d ON p.deus_id = d.id
        WHERE p.usuario_id = $1 
        ORDER BY p.created_at DESC
      `, [userId]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar personagens:', error);
      throw error;
    }
  }

  static async findById(id, userId = null) {
    try {
      let query = `
        SELECT p.*, r.nome as raca_nome, c.nome as classe_nome, d.nome as deus_nome,
               r.bonus_atributos as raca_bonus, c.atributo_principal as classe_atributo
        FROM personagens p
        LEFT JOIN racas r ON p.raca_id = r.id
        LEFT JOIN classes c ON p.classe_id = c.id
        LEFT JOIN deuses d ON p.deus_id = d.id
        WHERE p.id = $1
      `;

      let params = [id];
      if (userId) {
        query += ' AND p.usuario_id = $2';
        params.push(userId);
      }

      const result = await pool.query(query, params);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao buscar personagem:', error);
      throw error;
    }
  }

  static async create(characterData) {
    const {
      usuario_id, nome, raca_id, classe_id, deus_id,
      forca, destreza, constituicao, inteligencia, sabedoria, carisma,
      pontos_vida, pontos_mana, ca, nivel, experiencia,
      historia_pessoal, personalidade, objetivos
    } = characterData;

    try {
      const result = await pool.query(`
        INSERT INTO personagens (
          usuario_id, nome, raca_id, classe_id, deus_id,
          forca, destreza, constituicao, inteligencia, sabedoria, carisma,
          pontos_vida, pontos_mana, ca, nivel, experiencia,
          historia_pessoal, personalidade, objetivos
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19) 
        RETURNING *
      `, [
        usuario_id, nome, raca_id, classe_id, deus_id,
        forca, destreza, constituicao, inteligencia, sabedoria, carisma,
        pontos_vida, pontos_mana, ca, nivel, experiencia,
        historia_pessoal, personalidade, objetivos
      ]);

      const character = result.rows[0];

      // CORREÇÃO: Associar poderes de classe após criação (sem usar cp.automatico)
      if (character.classe_id && character.nivel) {
        try {
          await this.associateClassPowers(pool, character.id, character.classe_id, character.nivel);
        } catch (error) {
          console.warn('⚠️ Erro ao associar poderes de classe:', error.message);
        }
      }

      // NOVO: Aplicar perícias automáticas de classe
      if (character.classe_id) {
        try {
          await this.applyClassSkills(character.id, character.classe_id);
          console.log('✅ Perícias de classe aplicadas automaticamente');
        } catch (error) {
          console.warn('⚠️ Erro ao aplicar perícias de classe:', error.message);
        }
      }

      return character;
    } catch (error) {
      console.error('Erro ao criar personagem:', error);
      throw error;
    }
  }

  static async update(id, userId, characterData) {
    try {
      const result = await pool.query(`
        UPDATE personagens SET
          nome = $3, raca_id = $4, classe_id = $5, deus_id = $6,
          forca = $7, destreza = $8, constituicao = $9, inteligencia = $10, sabedoria = $11, carisma = $12,
          pontos_vida = $13, pontos_mana = $14, ca = $15, nivel = $16, experiencia = $17,
          historia_pessoal = $18, personalidade = $19, objetivos = $20,
          updated_at = CURRENT_TIMESTAMP
        WHERE id = $1 AND usuario_id = $2
        RETURNING *
      `, [
        id, userId, characterData.nome, characterData.raca_id, characterData.classe_id, characterData.deus_id,
        characterData.forca, characterData.destreza, characterData.constituicao,
        characterData.inteligencia, characterData.sabedoria, characterData.carisma,
        characterData.pontos_vida, characterData.pontos_mana, characterData.ca,
        characterData.nivel, characterData.experiencia,
        characterData.historia_pessoal, characterData.personalidade, characterData.objetivos
      ]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao atualizar personagem:', error);
      throw error;
    }
  }

  static async delete(id, userId) {
    try {
      const result = await pool.query(
        'DELETE FROM personagens WHERE id = $1 AND usuario_id = $2 RETURNING *',
        [id, userId]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao excluir personagem:', error);
      throw error;
    }
  }

  // CORREÇÃO: Método corrigido para associar poderes de classe sem usar cp.automatico
  static async associateClassPowers(client, characterId, classeId, nivel) {
    try {
      console.log(`🏛️ Associando poderes de classe para personagem ${characterId}`);

      // CORREÇÃO: Query sem a coluna cp.automatico (que não existe)
      const poderesClasseQuery = `
        SELECT p.id, p.nome, cp.nivel_minimo
        FROM poderes p
        INNER JOIN classe_poderes cp ON p.id = cp.poder_id
        WHERE cp.classe_id = $1 AND cp.nivel_minimo <= $2
        ORDER BY cp.nivel_minimo, p.nome
      `;

      const result = await client.query(poderesClasseQuery, [classeId, nivel]);

      const insertPowerQuery = `
        INSERT INTO personagem_poderes (personagem_id, poder_id, fonte, observacoes)
        VALUES ($1, $2, 'classe', $3)
        ON CONFLICT (personagem_id, poder_id) DO NOTHING
      `;

      for (const poder of result.rows) {
        await client.query(insertPowerQuery, [
          characterId,
          poder.id,
          `Poder de classe - Nível ${poder.nivel_minimo}+`
        ]);
      }

      console.log(`✅ ${result.rows.length} poderes de classe associados`);
      return result.rows.length;
    } catch (error) {
      console.error('❌ Erro ao associar poderes de classe:', error);
      throw error;
    }
  }

  // NOVO: Aplicar perícias automáticas de classe
  static async applyClassSkills(characterId, classeId) {
    try {
      console.log(`🎯 Aplicando perícias automáticas da classe ${classeId} para personagem ${characterId}`);

      // Buscar perícias obrigatórias da classe
      const periciaClasseQuery = `
        SELECT p.id, p.nome
        FROM pericias p
        INNER JOIN classe_pericias cp ON p.id = cp.pericia_id
        WHERE cp.classe_id = $1 AND cp.obrigatoria = true
      `;

      const result = await pool.query(periciaClasseQuery, [classeId]);

      if (result.rows.length === 0) {
        console.log('⚠️ Nenhuma perícia obrigatória encontrada para esta classe');
        return 0;
      }

      console.log(`📚 Encontradas ${result.rows.length} perícias obrigatórias para aplicar`);

      // Aplicar cada perícia obrigatória
      const periciasSucessfuly = [];
      for (const pericia of result.rows) {
        try {
          // Verificar se a perícia já existe para evitar duplicatas
          const existeQuery = `
            SELECT id FROM personagem_pericias 
            WHERE personagem_id = $1 AND pericia_id = $2
          `;
          const existe = await pool.query(existeQuery, [characterId, pericia.id]);

          if (existe.rows.length === 0) {
            // Inserir perícia obrigatória
            const insertQuery = `
              INSERT INTO personagem_pericias (personagem_id, pericia_id, treinado, origem, observacoes)
              VALUES ($1, $2, true, 'classe', $3)
              RETURNING *
            `;

            const insertResult = await pool.query(insertQuery, [
              characterId,
              pericia.id,
              'Perícia obrigatória da classe'
            ]);

            periciasSucessfuly.push(insertResult.rows[0]);
            console.log(`✅ Perícia aplicada: ${pericia.nome}`);
          } else {
            // Se já existe, garantir que está marcada como treinada
            const updateQuery = `
              UPDATE personagem_pericias 
              SET treinado = true, origem = 'classe', observacoes = $3
              WHERE personagem_id = $1 AND pericia_id = $2
              RETURNING *
            `;

            const updateResult = await pool.query(updateQuery, [
              characterId,
              pericia.id,
              'Perícia obrigatória da classe'
            ]);

            periciasSucessfuly.push(updateResult.rows[0]);
            console.log(`🔄 Perícia atualizada: ${pericia.nome}`);
          }
        } catch (error) {
          console.error(`❌ Erro ao aplicar perícia ${pericia.nome}:`, error.message);
        }
      }

      console.log(`✅ ${periciasSucessfuly.length} perícias de classe aplicadas com sucesso`);
      return periciasSucessfuly.length;

    } catch (error) {
      console.error('❌ Erro ao aplicar perícias de classe:', error);
      throw error;
    }
  }

  // NOVO: Buscar perícias de um personagem
  static async getCharacterSkills(characterId) {
    try {
      const result = await pool.query(`
        SELECT 
          pp.*,
          p.nome,
          p.atributo_chave,
          p.categoria,
          p.descricao,
          -- Calcular bônus baseado no personagem
          CASE p.atributo_chave
            WHEN 'for' THEN (per.forca - 10) / 2
            WHEN 'des' THEN (per.destreza - 10) / 2
            WHEN 'con' THEN (per.constituicao - 10) / 2
            WHEN 'int' THEN (per.inteligencia - 10) / 2
            WHEN 'sab' THEN (per.sabedoria - 10) / 2
            WHEN 'car' THEN (per.carisma - 10) / 2
            ELSE 0
          END as bonus_atributo,
          per.nivel / 2 as bonus_nivel,
          CASE 
            WHEN NOT pp.treinado THEN 0
            WHEN per.nivel BETWEEN 1 AND 6 THEN 2
            WHEN per.nivel BETWEEN 7 AND 14 THEN 4
            WHEN per.nivel >= 15 THEN 6
            ELSE 0
          END as bonus_treinamento
        FROM personagem_pericias pp
        INNER JOIN pericias p ON pp.pericia_id = p.id
        INNER JOIN personagens per ON pp.personagem_id = per.id
        WHERE pp.personagem_id = $1
        ORDER BY p.categoria, p.nome
      `, [characterId]);

      // Calcular bônus total para cada perícia
      const pericias = result.rows.map(pericia => {
        let bonusTotal = parseInt(pericia.bonus_nivel) + parseInt(pericia.bonus_atributo);

        if (pericia.treinado) {
          bonusTotal += parseInt(pericia.bonus_treinamento);

          // Bonus adicional para especialista (Ladino)
          if (pericia.especialista) {
            bonusTotal += parseInt(pericia.bonus_treinamento);
          }
        }

        return {
          ...pericia,
          bonus_total: bonusTotal
        };
      });

      return pericias;
    } catch (error) {
      console.error('Erro ao buscar perícias do personagem:', error);
      throw error;
    }
  }

  // NOVO: Atualizar perícias de um personagem
  static async updateCharacterSkills(characterId, periciasSelecionadas) {
    try {
      console.log(`🎯 Atualizando perícias do personagem ${characterId}`);

      // Primeiro, remover perícias de escolha existentes
      await pool.query(`
        DELETE FROM personagem_pericias 
        WHERE personagem_id = $1 AND origem = 'escolha'
      `, [characterId]);

      // Adicionar novas perícias selecionadas
      if (periciasSelecionadas && periciasSelecionadas.length > 0) {
        for (const periciaId of periciasSelecionadas) {
          if (periciaId && !isNaN(periciaId)) {
            const insertQuery = `
              INSERT INTO personagem_pericias (personagem_id, pericia_id, treinado, origem, observacoes)
              VALUES ($1, $2, true, 'escolha', 'Perícia escolhida pelo jogador')
              ON CONFLICT (personagem_id, pericia_id) 
              DO UPDATE SET treinado = true, origem = 'escolha'
            `;

            await pool.query(insertQuery, [characterId, parseInt(periciaId)]);
          }
        }
      }

      console.log(`✅ Perícias atualizadas para personagem ${characterId}`);
      return true;
    } catch (error) {
      console.error('❌ Erro ao atualizar perícias:', error);
      throw error;
    }
  }

  // NOVO: Buscar perícias disponíveis para seleção baseado na classe
  static async getAvailableSkillsForClass(classeId) {
    try {
      const result = await pool.query(`
        SELECT 
          p.*,
          cp.obrigatoria,
          cp.opcional
        FROM pericias p
        INNER JOIN classe_pericias cp ON p.id = cp.pericia_id
        WHERE cp.classe_id = $1
        ORDER BY cp.obrigatoria DESC, p.categoria, p.nome
      `, [classeId]);

      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar perícias da classe:', error);
      throw error;
    }
  }

  // NOVO: Calcular perícias por atributo de inteligência
  static async calculateBonusSkillsFromIntelligence(inteligencia) {
    const modInteligencia = Math.floor((inteligencia - 10) / 2);
    return Math.max(0, modInteligencia); // Não pode ser negativo
  }

  static async getCharacterSkillsComplete(characterId) {
    try {
      // Lista de perícias que precisam ser treinadas para serem utilizáveis
      const skillsRequireTraining = [
        'adestramento', 'atuação', 'conhecimento', 'guerra',
        'jogatina', 'ladinagem', 'misticismo', 'nobreza',
        'ofício', 'pilotagem', 'religião'
      ];

      const skillsRequireTrainingStr = skillsRequireTraining.map(skill => `'${skill}'`).join(',');

      const result = await pool.query(`
      WITH personagem_info AS (
        SELECT id, nivel, forca, destreza, constituicao, inteligencia, sabedoria, carisma
        FROM personagens WHERE id = $1
      ),
      pericias_personagem AS (
        SELECT 
          pp.*,
          p.nome,
          p.atributo_chave,
          p.categoria,
          p.descricao,
          TRUE as tem_no_personagem
        FROM personagem_pericias pp
        INNER JOIN pericias p ON pp.pericia_id = p.id
        WHERE pp.personagem_id = $1
      ),
      pericias_utilizaveis AS (
        SELECT 
          p.id as pericia_id,
          NULL::integer as personagem_id,
          p.nome,
          p.atributo_chave,
          p.categoria,
          p.descricao,
          FALSE as treinado,
          FALSE as especialista,
          'utilizavel'::text as origem,
          'Perícia utilizável sem treinamento'::text as observacoes,
          FALSE as tem_no_personagem
        FROM pericias p
        WHERE LOWER(p.nome) NOT IN (${skillsRequireTrainingStr})
        AND p.id NOT IN (
          SELECT pericia_id FROM personagem_pericias WHERE personagem_id = $1
        )
      )
      SELECT 
        COALESCE(pp.id, nextval('personagem_pericias_id_seq')) as id,
        COALESCE(pp.personagem_id, $1) as personagem_id,
        COALESCE(pp.pericia_id, pu.pericia_id) as pericia_id,
        COALESCE(pp.nome, pu.nome) as nome,
        COALESCE(pp.atributo_chave, pu.atributo_chave) as atributo_chave,
        COALESCE(pp.categoria, pu.categoria) as categoria,
        COALESCE(pp.descricao, pu.descricao) as descricao,
        COALESCE(pp.treinado, pu.treinado) as treinado,
        COALESCE(pp.especialista, pu.especialista) as especialista,
        COALESCE(pp.origem, pu.origem) as origem,
        COALESCE(pp.observacoes, pu.observacoes) as observacoes,
        COALESCE(pp.tem_no_personagem, pu.tem_no_personagem) as tem_no_personagem,
        -- Calcular bônus baseado no personagem
        CASE COALESCE(pp.atributo_chave, pu.atributo_chave)
          WHEN 'for' THEN (pi.forca - 10) / 2
          WHEN 'des' THEN (pi.destreza - 10) / 2
          WHEN 'con' THEN (pi.constituicao - 10) / 2
          WHEN 'int' THEN (pi.inteligencia - 10) / 2
          WHEN 'sab' THEN (pi.sabedoria - 10) / 2
          WHEN 'car' THEN (pi.carisma - 10) / 2
          ELSE 0
        END as bonus_atributo,
        pi.nivel / 2 as bonus_nivel,
        CASE 
          WHEN NOT COALESCE(pp.treinado, pu.treinado) THEN 0
          WHEN pi.nivel BETWEEN 1 AND 6 THEN 2
          WHEN pi.nivel BETWEEN 7 AND 14 THEN 4
          WHEN pi.nivel >= 15 THEN 6
          ELSE 0
        END as bonus_treinamento
      FROM personagem_info pi
      FULL OUTER JOIN pericias_personagem pp ON TRUE
      FULL OUTER JOIN pericias_utilizaveis pu ON TRUE
      WHERE (pp.nome IS NOT NULL OR pu.nome IS NOT NULL)
      ORDER BY 
        COALESCE(pp.categoria, pu.categoria),
        COALESCE(pp.treinado, pu.treinado) DESC,
        COALESCE(pp.nome, pu.nome)
    `, [characterId]);

      // Calcular bônus total para cada perícia
      const pericias = result.rows.map(pericia => {
        let bonusTotal = parseInt(pericia.bonus_nivel) + parseInt(pericia.bonus_atributo);

        if (pericia.treinado) {
          bonusTotal += parseInt(pericia.bonus_treinamento);

          // Bonus adicional para especialista (Ladino)
          if (pericia.especialista) {
            bonusTotal += parseInt(pericia.bonus_treinamento);
          }
        }

        return {
          ...pericia,
          bonus_total: bonusTotal
        };
      });

      return pericias;
    } catch (error) {
      console.error('Erro ao buscar perícias completas do personagem:', error);
      throw error;
    }
  }


}

module.exports = Character;