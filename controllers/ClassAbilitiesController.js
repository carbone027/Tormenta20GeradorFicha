const pool = require('../config/database');

class ClassAbilitiesController {
  // Listar todas as habilidades de classe
  static async index(req, res) {
    try {
      const { tipo, nivel } = req.query;
      
      let query = `
        SELECT 
          hc.*,
          COUNT(DISTINCT ch.classe_id) as classes_que_possuem
        FROM habilidades_classe hc
        LEFT JOIN classe_habilidades ch ON hc.id = ch.habilidade_id
      `;
      
      const conditions = [];
      const params = [];
      
      if (tipo) {
        conditions.push(`hc.tipo = $${params.length + 1}`);
        params.push(tipo);
      }
      
      if (nivel) {
        conditions.push(`hc.nivel_requerido <= $${params.length + 1}`);
        params.push(parseInt(nivel));
      }
      
      if (conditions.length > 0) {
        query += ' WHERE ' + conditions.join(' AND ');
      }
      
      query += `
        GROUP BY hc.id
        ORDER BY hc.nivel_requerido, hc.nome
      `;
      
      const habilidades = await pool.query(query, params);
      
      // Buscar tipos únicos para filtros
      const tiposQuery = `
        SELECT DISTINCT tipo 
        FROM habilidades_classe 
        WHERE tipo IS NOT NULL 
        ORDER BY tipo
      `;
      const tipos = await pool.query(tiposQuery);
      
      res.render('pages/class-abilities', {
        title: 'Habilidades de Classe',
        activePage: 'classes',
        user: req.session.user || null,
        habilidades: habilidades.rows,
        tipos: tipos.rows,
        filtros: { tipo, nivel }
      });
      
    } catch (error) {
      console.error('Erro ao carregar habilidades:', error);
      res.status(500).render('error', {
        message: 'Erro ao carregar habilidades de classe',
        error,
        user: req.session.user
      });
    }
  }

  // Ver detalhes de uma habilidade específica
  static async view(req, res) {
    try {
      const { id } = req.params;
      
      // Buscar habilidade
      const habilidadeQuery = `
        SELECT * FROM habilidades_classe WHERE id = $1
      `;
      const habilidadeResult = await pool.query(habilidadeQuery, [id]);
      
      if (habilidadeResult.rows.length === 0) {
        return res.status(404).render('error', {
          message: 'Habilidade não encontrada',
          error: { status: 404 },
          user: req.session.user
        });
      }
      
      const habilidade = habilidadeResult.rows[0];
      
      // Buscar classes que possuem esta habilidade
      const classesQuery = `
        SELECT 
          c.id,
          c.nome,
          c.descricao,
          ch.nivel_obtencao,
          ch.automatica,
          ch.observacoes
        FROM classes c
        INNER JOIN classe_habilidades ch ON c.id = ch.classe_id
        WHERE ch.habilidade_id = $1
        ORDER BY ch.nivel_obtencao, c.nome
      `;
      const classesResult = await pool.query(classesQuery, [id]);
      
      res.render('pages/class-ability-details', {
        title: `${habilidade.nome} - Habilidade de Classe`,
        activePage: 'classes',
        user: req.session.user || null,
        habilidade,
        classes: classesResult.rows
      });
      
    } catch (error) {
      console.error('Erro ao visualizar habilidade:', error);
      res.status(500).render('error', {
        message: 'Erro ao carregar detalhes da habilidade',
        error,
        user: req.session.user
      });
    }
  }

  // API: Buscar habilidades disponíveis para uma classe em um nível
  static async getAvailableForClass(req, res) {
    try {
      const { classId, level } = req.params;
      
      const query = `
        SELECT 
          hc.*,
          ch.nivel_obtencao,
          ch.automatica,
          ch.observacoes,
          CASE 
            WHEN ch.id IS NOT NULL THEN true 
            ELSE false 
          END as possui_habilidade
        FROM habilidades_classe hc
        LEFT JOIN classe_habilidades ch ON (hc.id = ch.habilidade_id AND ch.classe_id = $1)
        WHERE hc.nivel_requerido <= $2
        ORDER BY hc.nivel_requerido, hc.nome
      `;
      
      const result = await pool.query(query, [classId, level]);
      
      res.json({
        success: true,
        habilidades: result.rows
      });
      
    } catch (error) {
      console.error('Erro ao buscar habilidades disponíveis:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // API: Buscar habilidades por tipo
  static async getByType(req, res) {
    try {
      const { tipo } = req.params;
      
      const query = `
        SELECT 
          hc.*,
          COUNT(DISTINCT ch.classe_id) as total_classes
        FROM habilidades_classe hc
        LEFT JOIN classe_habilidades ch ON hc.id = ch.habilidade_id
        WHERE hc.tipo = $1
        GROUP BY hc.id
        ORDER BY hc.nivel_requerido, hc.nome
      `;
      
      const result = await pool.query(query, [tipo]);
      
      res.json({
        success: true,
        habilidades: result.rows
      });
      
    } catch (error) {
      console.error('Erro ao buscar habilidades por tipo:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Buscar habilidades (para autocomplete)
  static async search(req, res) {
    try {
      const { q, classId } = req.query;
      
      if (!q || q.length < 2) {
        return res.json({ success: true, habilidades: [] });
      }
      
      let query = `
        SELECT 
          hc.id,
          hc.nome,
          hc.descricao,
          hc.tipo,
          hc.nivel_requerido
      `;
      
      const params = [`%${q}%`];
      
      if (classId) {
        query += `,
          CASE 
            WHEN ch.id IS NOT NULL THEN true 
            ELSE false 
          END as possui_habilidade,
          ch.nivel_obtencao
        FROM habilidades_classe hc
        LEFT JOIN classe_habilidades ch ON (hc.id = ch.habilidade_id AND ch.classe_id = $2)
        `;
        params.push(classId);
      } else {
        query += `
        FROM habilidades_classe hc
        `;
      }
      
      query += `
        WHERE hc.nome ILIKE $1 OR hc.descricao ILIKE $1
        ORDER BY hc.nome
        LIMIT 10
      `;
      
      const result = await pool.query(query, params);
      
      res.json({
        success: true,
        habilidades: result.rows
      });
      
    } catch (error) {
      console.error('Erro na busca de habilidades:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Progressão de habilidades por nível
  static async progression(req, res) {
    try {
      const { classId } = req.params;
      
      if (!classId) {
        return res.status(400).json({
          success: false,
          error: 'ID da classe é obrigatório'
        });
      }
      
      // Buscar informações da classe
      const classeQuery = 'SELECT * FROM classes WHERE id = $1';
      const classeResult = await pool.query(classeQuery, [classId]);
      
      if (classeResult.rows.length === 0) {
        return res.status(404).json({
          success: false,
          error: 'Classe não encontrada'
        });
      }
      
      // Buscar progressão de habilidades
      const progressaoQuery = `
        SELECT 
          ch.nivel_obtencao,
          hc.id,
          hc.nome,
          hc.descricao,
          hc.tipo,
          hc.progressao,
          hc.custo_pm,
          ch.automatica,
          ch.observacoes
        FROM classe_habilidades ch
        INNER JOIN habilidades_classe hc ON ch.habilidade_id = hc.id
        WHERE ch.classe_id = $1
        ORDER BY ch.nivel_obtencao, hc.nome
      `;
      
      const progressaoResult = await pool.query(progressaoQuery, [classId]);
      
      // Organizar por nível
      const progressaoPorNivel = {};
      for (let nivel = 1; nivel <= 20; nivel++) {
        progressaoPorNivel[nivel] = [];
      }
      
      progressaoResult.rows.forEach(hab => {
        progressaoPorNivel[hab.nivel_obtencao].push(hab);
      });
      
      res.json({
        success: true,
        classe: classeResult.rows[0],
        progressaoPorNivel
      });
      
    } catch (error) {
      console.error('Erro ao buscar progressão:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }

  // Estatísticas das habilidades
  static async statistics(req, res) {
    try {
      // Total de habilidades
      const totalQuery = 'SELECT COUNT(*) as total FROM habilidades_classe';
      const total = await pool.query(totalQuery);
      
      // Distribuição por tipo
      const tiposQuery = `
        SELECT 
          tipo,
          COUNT(*) as quantidade
        FROM habilidades_classe
        WHERE tipo IS NOT NULL
        GROUP BY tipo
        ORDER BY quantidade DESC
      `;
      const tipos = await pool.query(tiposQuery);
      
      // Distribuição por nível requerido
      const niveisQuery = `
        SELECT 
          nivel_requerido,
          COUNT(*) as quantidade
        FROM habilidades_classe
        GROUP BY nivel_requerido
        ORDER BY nivel_requerido
      `;
      const niveis = await pool.query(niveisQuery);
      
      // Habilidades mais comuns (presentes em mais classes)
      const comunsQuery = `
        SELECT 
          hc.nome,
          hc.tipo,
          COUNT(ch.classe_id) as total_classes
        FROM habilidades_classe hc
        INNER JOIN classe_habilidades ch ON hc.id = ch.habilidade_id
        GROUP BY hc.id, hc.nome, hc.tipo
        ORDER BY total_classes DESC
        LIMIT 10
      `;
      const comuns = await pool.query(comunsQuery);
      
      res.json({
        success: true,
        estatisticas: {
          totalHabilidades: parseInt(total.rows[0].total),
          distribuicaoTipos: tipos.rows,
          distribuicaoNiveis: niveis.rows,
          habilidadesMaisComuns: comuns.rows
        }
      });
      
    } catch (error) {
      console.error('Erro ao buscar estatísticas:', error);
      res.status(500).json({
        success: false,
        error: error.message
      });
    }
  }
}

module.exports = ClassAbilitiesController;