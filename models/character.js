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
      return result.rows[0];
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
}

module.exports = Character;