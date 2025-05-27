const pool = require('../config/database');

class PowerController {
  // Listar todos os poderes
  static async index(req, res) {
    try {
      const query = `
        SELECT * FROM poderes 
        ORDER BY tipo, grupo, nome
      `;
      const poderes = await pool.query(query);
      
      // Agrupar poderes por tipo
      const poderesPorTipo = {};
      poderes.rows.forEach(poder => {
        if (!poderesPorTipo[poder.tipo]) {
          poderesPorTipo[poder.tipo] = [];
        }
        poderesPorTipo[poder.tipo].push(poder);
      });
      
      res.render('pages/powers', {
        title: 'Poderes de Tormenta20',
        activePage: 'powers',
        user: req.session.user || null,
        poderesPorTipo
      });
    } catch (error) {
      console.error('Erro ao carregar poderes:', error);
      res.status(500).render('error', {
        message: 'Erro ao carregar poderes',
        error,
        user: req.session.user
      });
    }
  }

  // Buscar poderes por raça
  static async getByRace(racaId) {
    try {
      const query = `
        SELECT p.* 
        FROM poderes p
        INNER JOIN raca_poderes rp ON p.id = rp.poder_id
        WHERE rp.raca_id = $1 AND rp.automatico = true
        ORDER BY p.nome
      `;
      const result = await pool.query(query, [racaId]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar poderes da raça:', error);
      throw error;
    }
  }

  // Buscar poderes por tipo
  static async getByType(tipo) {
    try {
      const query = `
        SELECT * FROM poderes 
        WHERE tipo = $1 
        ORDER BY nome
      `;
      const result = await pool.query(query, [tipo]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar poderes por tipo:', error);
      throw error;
    }
  }

  // Buscar poderes de um personagem
  static async getCharacterPowers(personagemId) {
    try {
      const query = `
        SELECT p.*, pp.fonte, pp.observacoes
        FROM poderes p
        INNER JOIN personagem_poderes pp ON p.id = pp.poder_id
        WHERE pp.personagem_id = $1
        ORDER BY p.tipo, p.nome
      `;
      const result = await pool.query(query, [personagemId]);
      return result.rows;
    } catch (error) {
      console.error('Erro ao buscar poderes do personagem:', error);
      throw error;
    }
  }

  // Adicionar poder a um personagem
  static async addToCharacter(personagemId, poderId, fonte = 'escolha', observacoes = null) {
    try {
      const query = `
        INSERT INTO personagem_poderes (personagem_id, poder_id, fonte, observacoes)
        VALUES ($1, $2, $3, $4)
        ON CONFLICT (personagem_id, poder_id) DO NOTHING
        RETURNING *
      `;
      const result = await pool.query(query, [personagemId, poderId, fonte, observacoes]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao adicionar poder ao personagem:', error);
      throw error;
    }
  }

  // Remover poder de um personagem
  static async removeFromCharacter(personagemId, poderId) {
    try {
      const query = `
        DELETE FROM personagem_poderes 
        WHERE personagem_id = $1 AND poder_id = $2
        RETURNING *
      `;
      const result = await pool.query(query, [personagemId, poderId]);
      return result.rows[0];
    } catch (error) {
      console.error('Erro ao remover poder do personagem:', error);
      throw error;
    }
  }

  // Aplicar poderes raciais automaticamente
  static async applyRacialPowers(personagemId, racaId) {
    try {
      // Buscar poderes raciais da raça
      const poderesRaciais = await this.getByRace(racaId);
      
      // Adicionar cada poder racial ao personagem
      for (const poder of poderesRaciais) {
        await this.addToCharacter(personagemId, poder.id, 'raca', 'Poder racial automático');
      }
      
      return poderesRaciais;
    } catch (error) {
      console.error('Erro ao aplicar poderes raciais:', error);
      throw error;
    }
  }

  // Buscar poderes disponíveis para seleção (não raciais)
  static async getAvailablePowers() {
    try {
      const query = `
        SELECT * FROM poderes 
        WHERE tipo IN ('geral', 'combate', 'destino', 'magia') 
        ORDER BY tipo, nome
      `;
      const result = await pool.query(query);
      
      // Agrupar por tipo
      const poderesPorTipo = {};
      result.rows.forEach(poder => {
        if (!poderesPorTipo[poder.tipo]) {
          poderesPorTipo[poder.tipo] = [];
        }
        poderesPorTipo[poder.tipo].push(poder);
      });
      
      return poderesPorTipo;
    } catch (error) {
      console.error('Erro ao buscar poderes disponíveis:', error);
      throw error;
    }
  }

  // API endpoint para buscar poderes por AJAX
  static async apiGetPowers(req, res) {
    try {
      const { tipo, raca_id } = req.query;
      
      let poderes = [];
      
      if (raca_id) {
        poderes = await this.getByRace(raca_id);
      } else if (tipo) {
        poderes = await this.getByType(tipo);
      } else {
        const result = await pool.query('SELECT * FROM poderes ORDER BY tipo, nome');
        poderes = result.rows;
      }
      
      res.json({ success: true, poderes });
    } catch (error) {
      console.error('Erro na API de poderes:', error);
      res.status(500).json({ success: false, error: error.message });
    }
  }

  // Método para popular relações raça-poder no banco
  static async setupRacePowerRelations() {
    try {
      // Este método seria usado uma vez para configurar as relações
      // Aqui você mapearia manualmente cada raça com seus poderes
      
      console.log('🔧 Configurando relações raça-poder...');
      
      // Exemplo de como mapear (você precisaria fazer isso para todas as raças)
      const mappings = [
        // Humano - ID assumido como 1
        { raca_nome: 'Humano', poder_nome: 'Versatilidade Humana' },
        
        // Anão - ID assumido como 2
        { raca_nome: 'Anão', poder_nome: 'Conhecimento das Rochas' },
        { raca_nome: 'Anão', poder_nome: 'Devagar e Sempre' },
        { raca_nome: 'Anão', poder_nome: 'Duro como Pedra' },
        { raca_nome: 'Anão', poder_nome: 'Tradição de Heredrimm' },
        
        // Continue para todas as raças...
      ];
      
      for (const mapping of mappings) {
        try {
          await pool.query(`
            INSERT INTO raca_poderes (raca_id, poder_id, automatico)
            SELECT r.id, p.id, true
            FROM racas r, poderes p
            WHERE r.nome = $1 AND p.nome = $2
            ON CONFLICT DO NOTHING
          `, [mapping.raca_nome, mapping.poder_nome]);
        } catch (err) {
          console.log(`⚠️ Erro ao mapear ${mapping.raca_nome} -> ${mapping.poder_nome}:`, err.message);
        }
      }
      
      console.log('✅ Relações raça-poder configuradas');
    } catch (error) {
      console.error('Erro ao configurar relações raça-poder:', error);
      throw error;
    }
  }
}

module.exports = PowerController;