const pool = require('../config/database');

class Pericia {
  // Buscar todas as perícias
  static async findAll() {
    try {
      const result = await pool.query(`
        SELECT * FROM pericias 
        ORDER BY categoria, nome
      `);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar perícias:', error);
      throw error;
    }
  }

  // Buscar perícias por categoria
  static async findByCategory(categoria = null) {
    try {
      let query = 'SELECT * FROM pericias';
      let params = [];

      if (categoria) {
        query += ' WHERE categoria = $1';
        params.push(categoria);
      }

      query += ' ORDER BY categoria, nome';

      const result = await pool.query(query, params);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar perícias por categoria:', error);
      throw error;
    }
  }

  // Buscar perícias por atributo
  static async findByAttribute(atributoChave) {
    try {
      const result = await pool.query(`
        SELECT * FROM pericias 
        WHERE atributo_chave = $1
        ORDER BY nome
      `, [atributoChave]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar perícias por atributo:', error);
      throw error;
    }
  }

  // Buscar perícias de uma classe específica
  static async findByClass(classeId) {
    try {
      const result = await pool.query(`
        SELECT 
          p.*,
          cp.obrigatoria,
          cp.opcional
        FROM pericias p
        INNER JOIN classe_pericias cp ON p.id = cp.pericia_id
        WHERE cp.classe_id = $1
        ORDER BY cp.obrigatoria DESC, p.nome
      `, [classeId]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar perícias da classe:', error);
      throw error;
    }
  }

  // Buscar perícias obrigatórias de uma classe
  static async findMandatoryByClass(classeId) {
    try {
      const result = await pool.query(`
        SELECT p.*
        FROM pericias p
        INNER JOIN classe_pericias cp ON p.id = cp.pericia_id
        WHERE cp.classe_id = $1 AND cp.obrigatoria = true
        ORDER BY p.nome
      `, [classeId]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar perícias obrigatórias:', error);
      throw error;
    }
  }

  // Buscar perícias opcionais de uma classe
  static async findOptionalByClass(classeId) {
    try {
      const result = await pool.query(`
        SELECT p.*
        FROM pericias p
        INNER JOIN classe_pericias cp ON p.id = cp.pericia_id
        WHERE cp.classe_id = $1 AND cp.opcional = true
        ORDER BY p.nome
      `, [classeId]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar perícias opcionais:', error);
      throw error;
    }
  }

  // Buscar perícias de um personagem
  static async findByCharacter(personagemId) {
    try {
      const result = await pool.query(`
        SELECT 
          pp.*,
          p.nome,
          p.atributo_chave,
          p.categoria,
          p.descricao,
          -- Calcular bônus
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
      `, [personagemId]);
      
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

  // Calcular bônus de uma perícia específica
  static async calculateSkillBonus(personagemId, periciaId) {
    try {
      const result = await pool.query(`
        SELECT calcular_bonus_pericia($1, $2) as bonus_total
      `, [personagemId, periciaId]);
      
      return result.rows[0]?.bonus_total || 0;
    } catch (error) {
      console.error('Erro ao calcular bônus da perícia:', error);
      throw error;
    }
  }

  // Adicionar perícia a um personagem
  static async addToCharacter(personagemId, periciaId, treinado = false, origem = 'escolha', observacoes = null) {
    try {
      const result = await pool.query(`
        INSERT INTO personagem_pericias (personagem_id, pericia_id, treinado, origem, observacoes)
        VALUES ($1, $2, $3, $4, $5)
        ON CONFLICT (personagem_id, pericia_id) 
        DO UPDATE SET 
          treinado = EXCLUDED.treinado,
          origem = EXCLUDED.origem,
          observacoes = EXCLUDED.observacoes
        RETURNING *
      `, [personagemId, periciaId, treinado, origem, observacoes]);
      
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao adicionar perícia ao personagem:', error);
      throw error;
    }
  }

  // Remover perícia de um personagem
  static async removeFromCharacter(personagemId, periciaId) {
    try {
      const result = await pool.query(`
        DELETE FROM personagem_pericias 
        WHERE personagem_id = $1 AND pericia_id = $2
        RETURNING *
      `, [personagemId, periciaId]);
      
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao remover perícia do personagem:', error);
      throw error;
    }
  }

  // Atualizar perícia de um personagem
  static async updateCharacterSkill(personagemId, periciaId, updates) {
    try {
      const { treinado, especialista, observacoes } = updates;
      
      const result = await pool.query(`
        UPDATE personagem_pericias 
        SET 
          treinado = COALESCE($3, treinado),
          especialista = COALESCE($4, especialista),
          observacoes = COALESCE($5, observacoes)
        WHERE personagem_id = $1 AND pericia_id = $2
        RETURNING *
      `, [personagemId, periciaId, treinado, especialista, observacoes]);
      
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao atualizar perícia do personagem:', error);
      throw error;
    }
  }

  // Aplicar perícias automáticas de classe
  static async applyClassSkills(personagemId, classeId) {
    try {
      console.log(`🎯 Aplicando perícias automáticas da classe ${classeId} para personagem ${personagemId}`);
      
      const result = await pool.query(`
        SELECT aplicar_pericias_classe($1, $2) as pericias_aplicadas
      `, [personagemId, classeId]);
      
      const periciasSucessfuly = result.rows[0]?.pericias_aplicadas || 0;
      console.log(`✅ ${periciasSucessfuly} perícias de classe aplicadas automaticamente`);
      
      return periciasSucessfuly;
    } catch (error) {
      console.error('❌ Erro ao aplicar perícias de classe:', error);
      throw error;
    }
  }

  // Obter estatísticas de perícias
  static async getStatistics() {
    try {
      // Total de perícias
      const totalResult = await pool.query('SELECT COUNT(*) as total FROM pericias');
      
      // Perícias por categoria
      const categoryResult = await pool.query(`
        SELECT categoria, COUNT(*) as quantidade 
        FROM pericias 
        GROUP BY categoria 
        ORDER BY quantidade DESC
      `);
      
      // Perícias por atributo
      const attributeResult = await pool.query(`
        SELECT 
          CASE atributo_chave
            WHEN 'for' THEN 'Força'
            WHEN 'des' THEN 'Destreza'  
            WHEN 'con' THEN 'Constituição'
            WHEN 'int' THEN 'Inteligência'
            WHEN 'sab' THEN 'Sabedoria'
            WHEN 'car' THEN 'Carisma'
            ELSE atributo_chave
          END as atributo,
          COUNT(*) as quantidade
        FROM pericias 
        GROUP BY atributo_chave 
        ORDER BY quantidade DESC
      `);
      
      // Perícias mais usadas
      const popularResult = await pool.query(`
        SELECT 
          p.nome,
          p.categoria,
          COUNT(pp.id) as personagens_com_pericia
        FROM pericias p
        LEFT JOIN personagem_pericias pp ON p.id = pp.pericia_id
        WHERE pp.treinado = true
        GROUP BY p.id, p.nome, p.categoria
        ORDER BY personagens_com_pericia DESC
        LIMIT 10
      `);
      
      return {
        total: totalResult.rows[0].total,
        porCategoria: categoryResult.rows,
        porAtributo: attributeResult.rows,
        maisPopulares: popularResult.rows
      };
    } catch (error) {
      console.error('Erro ao obter estatísticas de perícias:', error);
      throw error;
    }
  }

  // Buscar perícias disponíveis para adição (que o personagem não possui)
  static async findAvailableForCharacter(personagemId) {
    try {
      const result = await pool.query(`
        SELECT p.*
        FROM pericias p
        WHERE p.id NOT IN (
          SELECT pp.pericia_id 
          FROM personagem_pericias pp 
          WHERE pp.personagem_id = $1
        )
        ORDER BY p.categoria, p.nome
      `, [personagemId]);
      
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar perícias disponíveis:', error);
      throw error;
    }
  }

  // Buscar por nome (para autocomplete)
  static async searchByName(searchTerm) {
    try {
      const result = await pool.query(`
        SELECT *
        FROM pericias
        WHERE nome ILIKE $1 OR descricao ILIKE $1
        ORDER BY nome
        LIMIT 10
      `, [`%${searchTerm}%`]);
      
      return result.rows;
    } catch (error) {
      console.error('Erro na busca de perícias:', error);
      throw error;
    }
  }

  // Obter perícias organizadas para exibição
  static async getOrganizedSkills() {
    try {
      const result = await pool.query(`
        SELECT 
          categoria,
          json_agg(
            json_build_object(
              'id', id,
              'nome', nome,
              'atributo_chave', atributo_chave,
              'descricao', descricao
            ) ORDER BY nome
          ) as pericias
        FROM pericias
        GROUP BY categoria
        ORDER BY categoria
      `);
      
      // Converter para objeto mais fácil de usar
      const organized = {};
      result.rows.forEach(row => {
        organized[row.categoria] = row.pericias;
      });
      
      return organized;
    } catch (error) {
      console.error('Erro ao organizar perícias:', error);
      throw error;
    }
  }
}

module.exports = Pericia;