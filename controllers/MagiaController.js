const Magia = require('../models/magia');
const pool = require('../config/database');

class MagiaController {
  // Listar todas as magias
  static async index(req, res) {
    try {
      const { circulo, tipo, escola } = req.query;

      let magias;
      if (circulo) {
        magias = await Magia.findByCircle(circulo);
      } else if (tipo) {
        magias = await Magia.findByType(tipo);
      } else if (escola) {
        magias = await Magia.findBySchool(escola);
      } else {
        // Para requisições da API, retornar todas as magias
        magias = await Magia.findAll();
      }

      // Se for uma requisição AJAX ou API, retornar JSON
      if (req.headers.accept && req.headers.accept.includes('application/json') || req.path.includes('/api/')) {
        console.log(`📡 API Request: Retornando ${Array.isArray(magias) ? magias.length : 'magias organizadas'} magias`);

        return res.json({
          success: true,
          magias: magias,
          total: Array.isArray(magias) ? magias.length : Object.keys(magias).length
        });
      }

      // Se for requisição normal da web, renderizar página
      let magiasParaView = magias;
      if (!Array.isArray(magias)) {
        // Se magias estão organizadas, converter para array para a view
        magiasParaView = await Magia.getOrganizedSpells();
      }

      // Buscar estatísticas para a view
      const estatisticas = await Magia.getStatistics();

      res.render('pages/magias', {
        title: 'Magias de Tormenta20',
        activePage: 'magias',
        user: req.session.user || null,
        magias: magiasParaView,
        estatisticas,
        filtroCirculo: circulo,
        filtroTipo: tipo,
        filtroEscola: escola
      });
    } catch (error) {
      console.error('Erro ao carregar magias:', error);

      // Se for requisição da API, retornar erro JSON
      if (req.headers.accept && req.headers.accept.includes('application/json') || req.path.includes('/api/')) {
        return res.status(500).json({
          success: false,
          error: error.message,
          magias: []
        });
      }

      // Se for requisição web, renderizar página de erro
      res.status(500).render('error', {
        message: 'Erro ao carregar magias',
        error,
        user: req.session.user
      });
    }
  }

  // Visualizar uma magia específica
  static async view(req, res) {
    try {
      const { id } = req.params;

      // Buscar dados da magia
      const magia = await Magia.findById(id);

      if (!magia) {
        return res.status(404).render('error', {
          message: 'Magia não encontrada',
          error: { status: 404 },
          user: req.session.user
        });
      }

      // Buscar aprimoramentos da magia
      const aprimoramentos = await Magia.getEnhancements(id);

      // Buscar classes que têm acesso a essa magia
      const classesQuery = `
        SELECT 
          c.nome,
          c.id,
          cm.nivel_minimo
        FROM classes c
        INNER JOIN classe_magias cm ON c.id = cm.classe_id
        WHERE cm.magia_id = $1
        ORDER BY cm.nivel_minimo, c.nome
      `;
      const classesResult = await pool.query(classesQuery, [id]);

      // Buscar estatísticas de uso
      const statsQuery = `
        SELECT 
          COUNT(pm.id) as total_personagens
        FROM personagem_magias pm
        WHERE pm.magia_id = $1
      `;
      const statsResult = await pool.query(statsQuery, [id]);

      res.render('pages/magia-details', {
        title: `${magia.nome} - Detalhes da Magia`,
        activePage: 'magias',
        user: req.session.user || null,
        magia,
        aprimoramentos,
        classes: classesResult.rows,
        estatisticas: statsResult.rows[0]
      });

    } catch (error) {
      console.error('Erro ao visualizar magia:', error);
      res.status(500).render('error', {
        message: 'Erro ao carregar detalhes da magia',
        error,
        user: req.session.user
      });
    }
  }

  // API: Buscar magias de uma classe
  static async getByClass(req, res) {
    try {
      const { classId } = req.params;
      const { nivel = 20, circulo } = req.query;

      let magias;
      if (circulo) {
        // Buscar magias de um círculo específico para a classe
        magias = await pool.query(`
          SELECT 
            m.*,
            cm.nivel_minimo
          FROM magias m
          INNER JOIN classe_magias cm ON m.id = cm.magia_id
          WHERE cm.classe_id = $1 AND cm.nivel_minimo <= $2 AND m.circulo = $3
          ORDER BY m.nome
        `, [classId, nivel, circulo]);
        magias = magias.rows;
      } else {
        magias = await Magia.findByClass(classId, nivel);
      }

      res.json({
        success: true,
        magias,
        total: magias.length
      });

    } catch (error) {
      console.error('Erro ao buscar magias da classe:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // API: Buscar magias de um personagem
  static async getCharacterSpells(req, res) {
    try {
      const { characterId } = req.params;

      const magias = await Magia.findByCharacter(characterId);

      // Organizar por círculo e tipo
      const magiasPorCirculo = {};
      magias.forEach(magia => {
        if (!magiasPorCirculo[magia.circulo]) {
          magiasPorCirculo[magia.circulo] = {};
        }
        if (!magiasPorCirculo[magia.circulo][magia.tipo]) {
          magiasPorCirculo[magia.circulo][magia.tipo] = [];
        }
        magiasPorCirculo[magia.circulo][magia.tipo].push(magia);
      });

      res.json({
        success: true,
        magias,
        magiasPorCirculo,
        total: magias.length
      });

    } catch (error) {
      console.error('Erro ao buscar magias do personagem:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // API: Adicionar magia a um personagem
  static async addToCharacter(req, res) {
    try {
      const { characterId } = req.params;
      const { magiaId, fonte, observacoes } = req.body;

      const result = await Magia.addToCharacter(
        characterId,
        magiaId,
        fonte || 'escolha',
        observacoes
      );

      res.json({
        success: true,
        magia: result,
        message: 'Magia adicionada com sucesso'
      });

    } catch (error) {
      console.error('Erro ao adicionar magia:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // API: Remover magia de um personagem
  static async removeFromCharacter(req, res) {
    try {
      const { characterId, spellId } = req.params;

      const result = await Magia.removeFromCharacter(characterId, spellId);

      if (!result) {
        return res.status(404).json({
          success: false,
          error: 'Magia não encontrada para este personagem'
        });
      }

      res.json({
        success: true,
        message: 'Magia removida com sucesso'
      });

    } catch (error) {
      console.error('Erro ao remover magia:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // API: Verificar se classe pode lançar magia
  static async canClassCast(req, res) {
    try {
      const { classId, spellId, level } = req.params;

      const canCast = await Magia.canClassCast(classId, spellId, level);

      res.json({
        success: true,
        canCast,
        classId: parseInt(classId),
        spellId: parseInt(spellId),
        level: parseInt(level)
      });

    } catch (error) {
      console.error('Erro ao verificar se classe pode lançar magia:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // API: Aplicar magias automáticas de classe
  static async applyClassSpells(req, res) {
    try {
      const { characterId } = req.params;
      const { classId, nivel } = req.body;

      if (!classId || !nivel) {
        return res.status(400).json({
          success: false,
          error: 'ID da classe e nível são obrigatórios'
        });
      }

      const magiasAdicionadas = await Magia.applyClassSpells(characterId, classId, nivel);

      res.json({
        success: true,
        magiasAdicionadas,
        message: `${magiasAdicionadas} magias de classe aplicadas automaticamente`
      });

    } catch (error) {
      console.error('Erro ao aplicar magias de classe:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // API: Buscar magias disponíveis para um personagem
  static async getAvailableForCharacter(req, res) {
    try {
      const { characterId } = req.params;

      // Buscar informações do personagem para determinar classe e nível
      const personagemQuery = `
        SELECT classe_id, nivel FROM personagens WHERE id = $1
      `;
      const personagemResult = await pool.query(personagemQuery, [characterId]);

      if (personagemResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Personagem não encontrado'
        });
      }

      const { classe_id, nivel } = personagemResult.rows[0];

      if (!classe_id) {
        return res.json({
          success: true,
          magias: [],
          message: 'Personagem não possui classe mágica'
        });
      }

      const magias = await Magia.getAvailableForClass(classe_id, nivel);

      // Organizar por círculo
      const magiasPorCirculo = {};
      magias.forEach(magia => {
        if (!magiasPorCirculo[magia.circulo]) {
          magiasPorCirculo[magia.circulo] = [];
        }
        magiasPorCirculo[magia.circulo].push(magia);
      });

      res.json({
        success: true,
        magias,
        magiasPorCirculo,
        total: magias.length
      });

    } catch (error) {
      console.error('Erro ao buscar magias disponíveis:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // API: Buscar magias por nome
  static async search(req, res) {
    try {
      const { q } = req.query;

      if (!q || q.length < 2) {
        return res.json({ success: true, magias: [] });
      }

      const magias = await Magia.searchByName(q);

      res.json({
        success: true,
        magias,
        total: magias.length
      });

    } catch (error) {
      console.error('Erro na busca de magias:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // API: Estatísticas das magias
  static async statistics(req, res) {
    try {
      const estatisticas = await Magia.getStatistics();

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

  // Comparar diferentes magias
  static async compare(req, res) {
    try {
      const { ids } = req.query;

      if (!ids || !Array.isArray(ids) || ids.length < 2) {
        return res.status(400).json({
          success: false,
          error: 'É necessário fornecer pelo menos 2 magias para comparar'
        });
      }

      const placeholders = ids.map((_, index) => `$${index + 1}`).join(',');

      const query = `
        SELECT 
          m.*,
          COUNT(DISTINCT pm.personagem_id) as total_personagens,
          COUNT(DISTINCT cm.classe_id) as classes_disponiveis
        FROM magias m
        LEFT JOIN personagem_magias pm ON m.id = pm.magia_id
        LEFT JOIN classe_magias cm ON m.id = cm.magia_id
        WHERE m.id IN (${placeholders})
        GROUP BY m.id
        ORDER BY m.circulo, m.nome
      `;

      const result = await pool.query(query, ids);

      res.render('pages/magia-comparison', {
        title: 'Comparação de Magias',
        activePage: 'magias',
        user: req.session.user || null,
        magias: result.rows
      });

    } catch (error) {
      console.error('Erro ao comparar magias:', error);
      res.status(500).render('error', {
        message: 'Erro ao comparar magias',
        error,
        user: req.session.user
      });
    }
  }

  // API: Buscar aprimoramentos de uma magia
  static async getEnhancements(req, res) {
    try {
      const { spellId } = req.params;

      const aprimoramentos = await Magia.getEnhancements(spellId);

      res.json({
        success: true,
        aprimoramentos,
        total: aprimoramentos.length
      });

    } catch (error) {
      console.error('Erro ao buscar aprimoramentos:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // API: Setup inicial do sistema de magias (deve ser executado uma vez)
  static async setupSpellSystem(req, res) {
    try {
      await Magia.setupClassSpellAccess();

      res.json({
        success: true,
        message: 'Sistema de magias configurado com sucesso'
      });

    } catch (error) {
      console.error('Erro ao configurar sistema de magias:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = MagiaController;