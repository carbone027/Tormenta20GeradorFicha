const Pericia = require('../models/pericia');
const pool = require('../config/database');

class PericiaController {
  // Listar todas as perícias
  static async index(req, res) {
    try {
      const { categoria, atributo } = req.query;
      
      let pericias;
      if (categoria) {
        pericias = await Pericia.findByCategory(categoria);
      } else if (atributo) {
        pericias = await Pericia.findByAttribute(atributo);
      } else {
        pericias = await Pericia.getOrganizedSkills();
      }
      
      // Se for uma requisição AJAX, retornar JSON
      if (req.headers.accept && req.headers.accept.includes('application/json')) {
        return res.json({
          success: true,
          pericias
        });
      }
      
      // Buscar estatísticas para a view
      const estatisticas = await Pericia.getStatistics();
      
      res.render('pages/pericias', {
        title: 'Perícias de Tormenta20',
        activePage: 'pericias',
        user: req.session.user || null,
        pericias,
        estatisticas,
        filtroCategoria: categoria,
        filtroAtributo: atributo
      });
    } catch (error) {
      console.error('Erro ao carregar perícias:', error);
      res.status(500).render('error', {
        message: 'Erro ao carregar perícias',
        error,
        user: req.session.user
      });
    }
  }

  // Visualizar uma perícia específica
  static async view(req, res) {
    try {
      const { id } = req.params;
      
      // Buscar dados da perícia
      const periciaQuery = 'SELECT * FROM pericias WHERE id = $1';
      const periciaResult = await pool.query(periciaQuery, [id]);
      
      if (periciaResult.rows.length === 0) {
        return res.status(404).render('error', {
          message: 'Perícia não encontrada',
          error: { status: 404 },
          user: req.session.user
        });
      }
      
      const pericia = periciaResult.rows[0];
      
      // Buscar classes que têm essa perícia
      const classesQuery = `
        SELECT 
          c.nome,
          c.id,
          cp.obrigatoria,
          cp.opcional
        FROM classes c
        INNER JOIN classe_pericias cp ON c.id = cp.classe_id
        WHERE cp.pericia_id = $1
        ORDER BY cp.obrigatoria DESC, c.nome
      `;
      const classesResult = await pool.query(classesQuery, [id]);
      
      // Buscar estatísticas de uso
      const statsQuery = `
        SELECT 
          COUNT(pp.id) as total_personagens,
          COUNT(CASE WHEN pp.treinado THEN 1 END) as personagens_treinados,
          COUNT(CASE WHEN pp.especialista THEN 1 END) as especialistas
        FROM personagem_pericias pp
        WHERE pp.pericia_id = $1
      `;
      const statsResult = await pool.query(statsQuery, [id]);
      
      res.render('pages/pericia-details', {
        title: `${pericia.nome} - Detalhes da Perícia`,
        activePage: 'pericias',
        user: req.session.user || null,
        pericia,
        classes: classesResult.rows,
        estatisticas: statsResult.rows[0]
      });
      
    } catch (error) {
      console.error('Erro ao visualizar perícia:', error);
      res.status(500).render('error', {
        message: 'Erro ao carregar detalhes da perícia',
        error,
        user: req.session.user
      });
    }
  }

  // API: Buscar perícias de uma classe
  static async getByClass(req, res) {
    try {
      const { classId } = req.params;
      const { tipo } = req.query; // 'obrigatorias', 'opcionais', 'todas'
      
      let pericias;
      switch (tipo) {
        case 'obrigatorias':
          pericias = await Pericia.findMandatoryByClass(classId);
          break;
        case 'opcionais':
          pericias = await Pericia.findOptionalByClass(classId);
          break;
        default:
          pericias = await Pericia.findByClass(classId);
      }
      
      res.json({
        success: true,
        pericias,
        total: pericias.length
      });
      
    } catch (error) {
      console.error('Erro ao buscar perícias da classe:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // API: Buscar perícias de um personagem
  static async getCharacterSkills(req, res) {
    try {
      const { characterId } = req.params;
      
      const pericias = await Pericia.findByCharacter(characterId);
      
      // Organizar por categoria
      const periciasPorCategoria = {};
      pericias.forEach(pericia => {
        if (!periciasPorCategoria[pericia.categoria]) {
          periciasPorCategoria[pericia.categoria] = [];
        }
        periciasPorCategoria[pericia.categoria].push(pericia);
      });
      
      res.json({
        success: true,
        pericias,
        periciasPorCategoria,
        total: pericias.length
      });
      
    } catch (error) {
      console.error('Erro ao buscar perícias do personagem:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // API: Adicionar perícia a um personagem
  static async addToCharacter(req, res) {
    try {
      const { characterId } = req.params;
      const { periciaId, treinado, origem, observacoes } = req.body;
      
      const result = await Pericia.addToCharacter(
        characterId, 
        periciaId, 
        treinado || false, 
        origem || 'escolha', 
        observacoes
      );
      
      res.json({
        success: true,
        pericia: result,
        message: 'Perícia adicionada com sucesso'
      });
      
    } catch (error) {
      console.error('Erro ao adicionar perícia:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // API: Atualizar perícia de um personagem
  static async updateCharacterSkill(req, res) {
    try {
      const { characterId, skillId } = req.params;
      const updates = req.body;
      
      const result = await Pericia.updateCharacterSkill(characterId, skillId, updates);
      
      if (!result) {
        return res.status(404).json({
          success: false,
          error: 'Perícia não encontrada para este personagem'
        });
      }
      
      res.json({
        success: true,
        pericia: result,
        message: 'Perícia atualizada com sucesso'
      });
      
    } catch (error) {
      console.error('Erro ao atualizar perícia:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // API: Remover perícia de um personagem
  static async removeFromCharacter(req, res) {
    try {
      const { characterId, skillId } = req.params;
      
      const result = await Pericia.removeFromCharacter(characterId, skillId);
      
      if (!result) {
        return res.status(404).json({
          success: false,
          error: 'Perícia não encontrada para este personagem'
        });
      }
      
      res.json({
        success: true,
        message: 'Perícia removida com sucesso'
      });
      
    } catch (error) {
      console.error('Erro ao remover perícia:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // API: Calcular bônus de perícia
  static async calculateBonus(req, res) {
    try {
      const { characterId, skillId } = req.params;
      
      const bonus = await Pericia.calculateSkillBonus(characterId, skillId);
      
      res.json({
        success: true,
        bonus,
        characterId: parseInt(characterId),
        skillId: parseInt(skillId)
      });
      
    } catch (error) {
      console.error('Erro ao calcular bônus:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // API: Aplicar perícias automáticas de classe
  static async applyClassSkills(req, res) {
    try {
      const { characterId } = req.params;
      const { classId } = req.body;
      
      if (!classId) {
        return res.status(400).json({
          success: false,
          error: 'ID da classe é obrigatório'
        });
      }
      
      const periciasSucessfuly = await Pericia.applyClassSkills(characterId, classId);
      
      res.json({
        success: true,
        periciasSucessfuly,
        message: `${periciasSucessfuly} perícias de classe aplicadas automaticamente`
      });
      
    } catch (error) {
      console.error('Erro ao aplicar perícias de classe:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // API: Buscar perícias disponíveis para um personagem
  static async getAvailableForCharacter(req, res) {
    try {
      const { characterId } = req.params;
      
      const pericias = await Pericia.findAvailableForCharacter(characterId);
      
      // Organizar por categoria
      const periciasPorCategoria = {};
      pericias.forEach(pericia => {
        if (!periciasPorCategoria[pericia.categoria]) {
          periciasPorCategoria[pericia.categoria] = [];
        }
        periciasPorCategoria[pericia.categoria].push(pericia);
      });
      
      res.json({
        success: true,
        pericias,
        periciasPorCategoria,
        total: pericias.length
      });
      
    } catch (error) {
      console.error('Erro ao buscar perícias disponíveis:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // API: Buscar perícias por nome
  static async search(req, res) {
    try {
      const { q } = req.query;
      
      if (!q || q.length < 2) {
        return res.json({ success: true, pericias: [] });
      }
      
      const pericias = await Pericia.searchByName(q);
      
      res.json({
        success: true,
        pericias,
        total: pericias.length
      });
      
    } catch (error) {
      console.error('Erro na busca de perícias:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // API: Estatísticas das perícias
  static async statistics(req, res) {
    try {
      const estatisticas = await Pericia.getStatistics();
      
      res.json({
        success: true,
        estatisticas
      });
      
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Comparar diferentes perícias
  static async compare(req, res) {
    try {
      const { ids } = req.query;
      
      if (!ids || !Array.isArray(ids) || ids.length < 2) {
        return res.status(400).json({
          success: false,
          error: 'É necessário fornecer pelo menos 2 perícias para comparar'
        });
      }
      
      const placeholders = ids.map((_, index) => `$${index + 1}`).join(',');
      
      const query = `
        SELECT 
          p.*,
          COUNT(DISTINCT pp.personagem_id) as total_personagens,
          COUNT(CASE WHEN pp.treinado THEN 1 END) as personagens_treinados,
          COUNT(DISTINCT cp.classe_id) as classes_disponiveis
        FROM pericias p
        LEFT JOIN personagem_pericias pp ON p.id = pp.pericia_id
        LEFT JOIN classe_pericias cp ON p.id = cp.pericia_id
        WHERE p.id IN (${placeholders})
        GROUP BY p.id
        ORDER BY p.nome
      `;
      
      const result = await pool.query(query, ids);
      
      res.render('pages/pericia-comparison', {
        title: 'Comparação de Perícias',
        activePage: 'pericias',
        user: req.session.user || null,
        pericias: result.rows
      });
      
    } catch (error) {
      console.error('Erro ao comparar perícias:', error);
      res.status(500).render('error', {
        message: 'Erro ao comparar perícias',
        error,
        user: req.session.user
      });
    }
  }
}

module.exports = PericiaController;