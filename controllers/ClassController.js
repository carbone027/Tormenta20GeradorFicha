const pool = require('../config/database');

class ClassController {
  // Listar todas as classes
  static async index(req, res) {
    try {
      const query = `
        SELECT 
          c.*,
          COUNT(DISTINCT ch.id) as total_habilidades,
          COUNT(DISTINCT cp.id) as total_poderes
        FROM classes c
        LEFT JOIN classe_habilidades ch ON c.id = ch.classe_id
        LEFT JOIN classe_poderes cp ON c.id = cp.classe_id
        GROUP BY c.id
        ORDER BY c.nome
      `;
      
      const classes = await pool.query(query);
      
      res.render('pages/classes', {
        title: 'Classes de Personagem',
        activePage: 'classes',
        user: req.session.user || null,
        classes: classes.rows
      });
    } catch (error) {
      console.error('Erro ao carregar classes:', error);
      res.status(500).render('error', {
        message: 'Erro ao carregar classes',
        error,
        user: req.session.user
      });
    }
  }

  // Visualizar uma classe específica com detalhes
  static async view(req, res) {
    try {
      const { id } = req.params;
      
      // Buscar dados da classe
      const classeQuery = `
        SELECT * FROM classes WHERE id = $1
      `;
      const classeResult = await pool.query(classeQuery, [id]);
      
      if (classeResult.rows.length === 0) {
        return res.status(404).render('error', {
          message: 'Classe não encontrada',
          error: { status: 404 },
          user: req.session.user
        });
      }
      
      const classe = classeResult.rows[0];
      
      // Buscar habilidades da classe organizadas por nível
      const habilidadesQuery = `
        SELECT 
          hc.*,
          ch.nivel_obtencao,
          ch.automatica,
          ch.observacoes
        FROM habilidades_classe hc
        INNER JOIN classe_habilidades ch ON hc.id = ch.habilidade_id
        WHERE ch.classe_id = $1
        ORDER BY ch.nivel_obtencao, hc.nome
      `;
      const habilidadesResult = await pool.query(habilidadesQuery, [id]);
      
      // Agrupar habilidades por nível
      const habilidadesPorNivel = {};
      habilidadesResult.rows.forEach(hab => {
        const nivel = hab.nivel_obtencao;
        if (!habilidadesPorNivel[nivel]) {
          habilidadesPorNivel[nivel] = [];
        }
        habilidadesPorNivel[nivel].push(hab);
      });
      
      // Buscar poderes específicos da classe
      const poderesQuery = `
        SELECT 
          p.*,
          cp.nivel_minimo,
          cp.pre_requisitos as pre_requisitos_classe
        FROM poderes p
        INNER JOIN classe_poderes cp ON p.id = cp.poder_id
        WHERE cp.classe_id = $1
        ORDER BY cp.nivel_minimo, p.nome
      `;
      const poderesResult = await pool.query(poderesQuery, [id]);
      
      // Agrupar poderes por nível mínimo
      const poderesPorNivel = {};
      poderesResult.rows.forEach(poder => {
        const nivel = poder.nivel_minimo;
        if (!poderesPorNivel[nivel]) {
          poderesPorNivel[nivel] = [];
        }
        poderesPorNivel[nivel].push(poder);
      });
      
      res.render('pages/class-details', {
        title: `${classe.nome} - Detalhes da Classe`,
        activePage: 'classes',
        user: req.session.user || null,
        classe,
        habilidadesPorNivel,
        poderesPorNivel,
        totalHabilidades: habilidadesResult.rows.length,
        totalPoderes: poderesResult.rows.length
      });
      
    } catch (error) {
      console.error('Erro ao visualizar classe:', error);
      res.status(500).render('error', {
        message: 'Erro ao carregar detalhes da classe',
        error,
        user: req.session.user
      });
    }
  }

  // API: Buscar habilidades de uma classe por nível
  static async getAbilitiesByLevel(req, res) {
    try {
      const { classId, level } = req.params;
      
      const query = `
        SELECT 
          hc.*,
          ch.nivel_obtencao,
          ch.automatica,
          ch.observacoes
        FROM habilidades_classe hc
        INNER JOIN classe_habilidades ch ON hc.id = ch.habilidade_id
        WHERE ch.classe_id = $1 AND ch.nivel_obtencao <= $2
        ORDER BY ch.nivel_obtencao, hc.nome
      `;
      
      const result = await pool.query(query, [classId, level]);
      
      res.json({
        success: true,
        habilidades: result.rows
      });
      
    } catch (error) {
      console.error('Erro ao buscar habilidades por nível:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // API: Buscar poderes disponíveis para uma classe
  static async getAvailablePowers(req, res) {
    try {
      const { classId, level } = req.params;
      
      const query = `
        SELECT 
          p.*,
          cp.nivel_minimo,
          cp.pre_requisitos as pre_requisitos_classe
        FROM poderes p
        INNER JOIN classe_poderes cp ON p.id = cp.poder_id
        WHERE cp.classe_id = $1 AND cp.nivel_minimo <= $2
        ORDER BY cp.nivel_minimo, p.nome
      `;
      
      const result = await pool.query(query, [classId, level]);
      
      res.json({
        success: true,
        poderes: result.rows
      });
      
    } catch (error) {
      console.error('Erro ao buscar poderes da classe:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Comparar classes
  static async compare(req, res) {
    try {
      const { ids } = req.query; // Array de IDs das classes
      
      if (!ids || !Array.isArray(ids) || ids.length < 2) {
        return res.status(400).json({
          success: false,
          error: 'É necessário fornecer pelo menos 2 classes para comparar'
        });
      }
      
      const placeholders = ids.map((_, index) => `$${index + 1}`).join(',');
      
      const query = `
        SELECT 
          c.*,
          COUNT(DISTINCT ch.id) as total_habilidades,
          COUNT(DISTINCT cp.id) as total_poderes
        FROM classes c
        LEFT JOIN classe_habilidades ch ON c.id = ch.classe_id
        LEFT JOIN classe_poderes cp ON c.id = cp.classe_id
        WHERE c.id IN (${placeholders})
        GROUP BY c.id
        ORDER BY c.nome
      `;
      
      const result = await pool.query(query, ids);
      
      res.render('pages/class-comparison', {
        title: 'Comparação de Classes',
        activePage: 'classes',
        user: req.session.user || null,
        classes: result.rows
      });
      
    } catch (error) {
      console.error('Erro ao comparar classes:', error);
      res.status(500).render('error', {
        message: 'Erro ao comparar classes',
        error,
        user: req.session.user
      });
    }
  }

  // Buscar classe por nome (para autocomplete)
  static async search(req, res) {
    try {
      const { q } = req.query;
      
      if (!q || q.length < 2) {
        return res.json({ success: true, classes: [] });
      }
      
      const query = `
        SELECT id, nome, descricao, atributo_principal
        FROM classes
        WHERE nome ILIKE $1 OR descricao ILIKE $1
        ORDER BY nome
        LIMIT 10
      `;
      
      const result = await pool.query(query, [`%${q}%`]);
      
      res.json({
        success: true,
        classes: result.rows
      });
      
    } catch (error) {
      console.error('Erro na busca de classes:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Estatísticas das classes
  static async statistics(req, res) {
    try {
      // Total de classes
      const totalClassesQuery = 'SELECT COUNT(*) as total FROM classes';
      const totalClasses = await pool.query(totalClassesQuery);
      
      // Classes mais populares (baseado em personagens criados)
      const popularesQuery = `
        SELECT 
          c.nome,
          c.id,
          COUNT(p.id) as total_personagens
        FROM classes c
        LEFT JOIN personagens p ON c.id = p.classe_id
        GROUP BY c.id, c.nome
        ORDER BY total_personagens DESC
        LIMIT 5
      `;
      const populares = await pool.query(popularesQuery);
      
      // Distribuição por atributo principal
      const atributosQuery = `
        SELECT 
          atributo_principal,
          COUNT(*) as quantidade
        FROM classes
        WHERE atributo_principal IS NOT NULL
        GROUP BY atributo_principal
        ORDER BY quantidade DESC
      `;
      const atributos = await pool.query(atributosQuery);
      
      // Média de habilidades por classe
      const mediaHabilidadesQuery = `
        SELECT AVG(total_hab) as media
        FROM (
          SELECT COUNT(ch.id) as total_hab
          FROM classes c
          LEFT JOIN classe_habilidades ch ON c.id = ch.classe_id
          GROUP BY c.id
        ) as subquery
      `;
      const mediaHabilidades = await pool.query(mediaHabilidadesQuery);
      
      res.json({
        success: true,
        estatisticas: {
          totalClasses: parseInt(totalClasses.rows[0].total),
          classesMaisPopulares: populares.rows,
          distribuicaoAtributos: atributos.rows,
          mediaHabilidadesPorClasse: Math.round(parseFloat(mediaHabilidades.rows[0].media) || 0)
        }
      });
      
    } catch (error) {
      console.error('Erro ao buscar estatísticas das classes:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = ClassController;