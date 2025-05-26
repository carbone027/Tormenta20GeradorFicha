const pool = require('../config/database');

class RunePage {
  static async findAllByUser(userId) {
    try {
      const result = await pool.query(
        'SELECT * FROM rune_pages WHERE user_id = $1 ORDER BY created_at DESC',
        [userId]
      );
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar páginas de runas:', error);
      throw error;
    }
  }

  static async create(runePage) {
    const {
      userId, name, primaryTree, primaryKeystone,
      primarySlot1, primarySlot2, primarySlot3,
      secondaryTree, secondarySlot1, secondarySlot2,
      shard1, shard2, shard3
    } = runePage;

    try {
      const result = await pool.query(
        `INSERT INTO rune_pages (
          user_id, name, primary_tree, primary_keystone,
          primary_slot1, primary_slot2, primary_slot3,
          secondary_tree, secondary_slot1, secondary_slot2,
          shard1, shard2, shard3
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *`,
        [
          userId, name, primaryTree, primaryKeystone,
          primarySlot1, primarySlot2, primarySlot3,
          secondaryTree, secondarySlot1, secondarySlot2,
          shard1, shard2, shard3
        ]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao salvar página de runas:', error);
      throw error;
    }
  }

  static async delete(id, userId) {
    try {
      const result = await pool.query(
        'DELETE FROM rune_pages WHERE id = $1 AND user_id = $2 RETURNING *',
        [id, userId]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao excluir página de runas:', error);
      throw error;
    }
  }
}

module.exports = RunePage;