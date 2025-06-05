const pool = require('../config/database');

class Magia {
  // Buscar todas as magias
  static async findAll() {
    try {
      const result = await pool.query(`
        SELECT * FROM magias 
        ORDER BY circulo, tipo, nome
      `);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar magias:', error);
      throw error;
    }
  }

  // Buscar magias por círculo
  static async findByCircle(circulo) {
    try {
      const result = await pool.query(`
        SELECT * FROM magias 
        WHERE circulo = $1
        ORDER BY tipo, nome
      `, [circulo]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar magias por círculo:', error);
      throw error;
    }
  }

  // Buscar magias por tipo
  static async findByType(tipo) {
    try {
      const result = await pool.query(`
        SELECT * FROM magias 
        WHERE tipo = $1
        ORDER BY circulo, nome
      `, [tipo]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar magias por tipo:', error);
      throw error;
    }
  }

  // Buscar magias por escola
  static async findBySchool(escola) {
    try {
      const result = await pool.query(`
        SELECT * FROM magias 
        WHERE escola = $1
        ORDER BY circulo, nome
      `, [escola]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar magias por escola:', error);
      throw error;
    }
  }

  // Buscar magias de uma classe específica
  static async findByClass(classeId, nivel = 20) {
    try {
      const result = await pool.query(`
        SELECT 
          m.*,
          cm.nivel_minimo
        FROM magias m
        INNER JOIN classe_magias cm ON m.id = cm.magia_id
        WHERE cm.classe_id = $1 AND cm.nivel_minimo <= $2
        ORDER BY m.circulo, m.nome
      `, [classeId, nivel]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar magias da classe:', error);
      throw error;
    }
  }

  // Buscar magias disponíveis para uma classe em determinado nível
  static async getAvailableForClass(classeId, nivel) {
    try {
      const result = await pool.query(`
        SELECT * FROM get_magias_disponiveis($1, $2)
      `, [classeId, nivel]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar magias disponíveis:', error);
      throw error;
    }
  }

  // Buscar magias de um personagem
  static async findByCharacter(personagemId) {
    try {
      const result = await pool.query(`
        SELECT 
          pm.id as personagem_magia_id,
          pm.fonte,
          pm.observacoes,
          m.*
        FROM personagem_magias pm
        INNER JOIN magias m ON pm.magia_id = m.id
        WHERE pm.personagem_id = $1
        ORDER BY m.circulo, m.tipo, m.nome
      `, [personagemId]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar magias do personagem:', error);
      throw error;
    }
  }

  // Buscar uma magia específica por ID
  static async findById(id) {
    try {
      const result = await pool.query(`
        SELECT * FROM magias WHERE id = $1
      `, [id]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao buscar magia por ID:', error);
      throw error;
    }
  }

  // Buscar aprimoramentos de uma magia
  static async getEnhancements(magiaId) {
    try {
      const result = await pool.query(`
        SELECT * FROM magia_aprimoramentos 
        WHERE magia_id = $1
        ORDER BY nome
      `, [magiaId]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar aprimoramentos:', error);
      throw error;
    }
  }

  // Adicionar magia a um personagem
  static async addToCharacter(personagemId, magiaId, fonte = 'escolha', observacoes = null) {
    try {
      const result = await pool.query(`
        INSERT INTO personagem_magias (personagem_id, magia_id, fonte, observacoes)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (personagem_id, magia_id) 
        DO UPDATE SET 
          fonte = EXCLUDED.fonte,
          observacoes = EXCLUDED.observacoes
        RETURNING *
      `, [personagemId, magiaId, fonte, observacoes]);
      
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao adicionar magia ao personagem:', error);
      throw error;
    }
  }

  // Remover magia de um personagem
  static async removeFromCharacter(personagemId, magiaId) {
    try {
      const result = await pool.query(`
        DELETE FROM personagem_magias 
        WHERE personagem_id = $1 AND magia_id = $2
        RETURNING *
      `, [personagemId, magiaId]);
      
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao remover magia do personagem:', error);
      throw error;
    }
  }

  // Verificar se uma classe pode lançar uma magia
  static async canClassCast(classeId, magiaId, nivelPersonagem) {
    try {
      const result = await pool.query(`
        SELECT pode_lancar_magia($1, $2, $3) as pode_lancar
      `, [classeId, magiaId, nivelPersonagem]);
      
      return result.rows[0]?.pode_lancar || false;
    } catch (error) {
      console.error('Erro ao verificar se classe pode lançar magia:', error);
      throw error;
    }
  }

  // Buscar por nome (para autocomplete)
  static async searchByName(searchTerm) {
    try {
      const result = await pool.query(`
        SELECT *
        FROM magias
        WHERE nome ILIKE $1 OR descricao ILIKE $1
        ORDER BY circulo, nome
        LIMIT 10
      `, [`%${searchTerm}%`]);
      
      return result.rows;
    } catch (error) {
      console.error('Erro na busca de magias:', error);
      throw error;
    }
  }

  // Obter magias organizadas para exibição
  static async getOrganizedSpells() {
    try {
      const result = await pool.query(`
        SELECT 
          circulo,
          tipo,
          json_agg(
            json_build_object(
              'id', id,
              'nome', nome,
              'escola', escola,
              'custo_pm', custo_pm,
              'execucao', execucao,
              'alcance', alcance,
              'duracao', duracao,
              'descricao', descricao
            ) ORDER BY nome
          ) as magias
        FROM magias
        GROUP BY circulo, tipo
        ORDER BY circulo, tipo
      `);
      
      // Converter para estrutura mais fácil de usar
      const organized = {};
      result.rows.forEach(row => {
        if (!organized[row.circulo]) {
          organized[row.circulo] = {};
        }
        organized[row.circulo][row.tipo] = row.magias;
      });
      
      return organized;
    } catch (error) {
      console.error('Erro ao organizar magias:', error);
      throw error;
    }
  }

  // Aplicar magias automáticas de classe
  static async applyClassSpells(personagemId, classeId, nivel) {
    try {
      console.log(`🔮 Aplicando magias automáticas da classe ${classeId} para personagem ${personagemId}, nível ${nivel}`);
      
      // Buscar magias automáticas da classe até o nível atual
      const magiasSucessfuly = await this.getAvailableForClass(classeId, nivel);
      
      // Verificar se existem magias automáticas para esta classe
      if (magiasSucessfuly.length === 0) {
        console.log('⚠️ Nenhuma magia automática encontrada para esta classe/nível');
        return 0;
      }

      let magiasConcedidas = 0;
      
      // Aplicar cada magia automática (se aplicável)
      for (const magia of magiasSucessfuly) {
        try {
          // Verificar se a magia já existe para evitar duplicatas
          const existeQuery = `
            SELECT id FROM personagem_magias 
            WHERE personagem_id = $1 AND magia_id = $2
          `;
          const existe = await pool.query(existeQuery, [personagemId, magia.magia_id]);

          if (existe.rows.length === 0) {
            // Inserir magia de classe
            await this.addToCharacter(
              personagemId, 
              magia.magia_id, 
              'classe', 
              `Magia de classe - Nível ${magia.nivel_minimo}+`
            );
            
            magiasConcedidas++;
            console.log(`✅ Magia aplicada: ${magia.nome}`);
          } else {
            console.log(`ℹ️ Magia já existe: ${magia.nome}`);
          }
        } catch (error) {
          console.error(`❌ Erro ao aplicar magia ${magia.nome}:`, error.message);
        }
      }

      console.log(`✅ ${magiasConcedidas} magias de classe aplicadas com sucesso`);
      return magiasConcedidas;

    } catch (error) {
      console.error('❌ Erro ao aplicar magias de classe:', error);
      throw error;
    }
  }

  // Obter estatísticas de magias
  static async getStatistics() {
    try {
      // Total de magias
      const totalResult = await pool.query('SELECT COUNT(*) as total FROM magias');
      
      // Magias por círculo
      const circleResult = await pool.query(`
        SELECT circulo, COUNT(*) as quantidade 
        FROM magias 
        GROUP BY circulo 
        ORDER BY circulo
      `);
      
      // Magias por tipo
      const typeResult = await pool.query(`
        SELECT tipo, COUNT(*) as quantidade 
        FROM magias 
        GROUP BY tipo 
        ORDER BY quantidade DESC
      `);
      
      // Magias por escola
      const schoolResult = await pool.query(`
        SELECT escola, COUNT(*) as quantidade 
        FROM magias 
        GROUP BY escola 
        ORDER BY quantidade DESC
      `);
      
      // Magias mais usadas
      const popularResult = await pool.query(`
        SELECT 
          m.nome,
          m.tipo,
          m.circulo,
          COUNT(pm.id) as personagens_com_magia
        FROM magias m
        LEFT JOIN personagem_magias pm ON m.id = pm.magia_id
        GROUP BY m.id, m.nome, m.tipo, m.circulo
        ORDER BY personagens_com_magia DESC
        LIMIT 10
      `);
      
      return {
        total: totalResult.rows[0].total,
        porCirculo: circleResult.rows,
        porTipo: typeResult.rows,
        porEscola: schoolResult.rows,
        maisPopulares: popularResult.rows
      };
    } catch (error) {
      console.error('Erro ao obter estatísticas de magias:', error);
      throw error;
    }
  }

  // Configurar acesso das classes às magias (função auxiliar para setup inicial)
  static async setupClassSpellAccess() {
    try {
      console.log('🔧 Configurando acesso das classes às magias...');
      
      // Configurações baseadas no arquivo magias.txt
      const classConfigs = [
        {
          classe: 'Arcanista',
          tipos: ['Arcana', 'Universal'],
          niveis: [1, 5, 9, 13, 17] // 1º, 2º, 3º, 4º, 5º círculos
        },
        {
          classe: 'Bardo',
          tipos: ['Arcana', 'Universal'],
          niveis: [1, 6, 10, 14, null] // 1º, 2º, 3º, 4º círculos (sem 5º)
        },
        {
          classe: 'Clérigo',
          tipos: ['Divina', 'Universal'],
          niveis: [1, 5, 9, 13, 17] // 1º, 2º, 3º, 4º, 5º círculos
        },
        {
          classe: 'Druida',
          tipos: ['Divina', 'Universal'],
          niveis: [1, 6, 10, 14, null] // 1º, 2º, 3º, 4º círculos (sem 5º)
        }
      ];

      for (const config of classConfigs) {
        try {
          // Buscar ID da classe
          const classeResult = await pool.query('SELECT id FROM classes WHERE nome = $1', [config.classe]);
          
          if (classeResult.rows.length === 0) {
            console.log(`⚠️ Classe ${config.classe} não encontrada`);
            continue;
          }

          const classeId = classeResult.rows[0].id;

          // Para cada círculo de magia
          for (let circulo = 1; circulo <= 5; circulo++) {
            const nivelMinimo = config.niveis[circulo - 1];
            
            if (nivelMinimo === null) continue; // Classe não tem acesso a este círculo

            // Buscar magias do círculo e tipos permitidos
            const magiasQuery = `
              SELECT id FROM magias 
              WHERE circulo = $1 AND tipo = ANY($2)
            `;
            const magiasResult = await pool.query(magiasQuery, [circulo, config.tipos]);

            // Inserir relações classe-magia
            for (const magia of magiasResult.rows) {
              await pool.query(`
                INSERT INTO classe_magias (classe_id, magia_id, nivel_minimo)
                VALUES ($1, $2, $3)
                ON CONFLICT (classe_id, magia_id) DO NOTHING
              `, [classeId, magia.id, nivelMinimo]);
            }
          }

          console.log(`✅ Configuração aplicada para ${config.classe}`);
        } catch (error) {
          console.error(`❌ Erro ao configurar ${config.classe}:`, error.message);
        }
      }

      console.log('✅ Configuração de acesso às magias concluída');
    } catch (error) {
      console.error('❌ Erro na configuração de acesso às magias:', error);
      throw error;
    }
  }
}

module.exports = Magia;