const express = require('express');
const router = express.Router();

// Importar controllers
const homeController = require('../controllers/HomeController');
const authController = require('../controllers/AuthController');
const characterController = require('../controllers/CharacterController');
const raceController = require('../controllers/RaceController');
const classController = require('../controllers/ClassController');
const ClassController = require('../controllers/ClassController');
const ClassAbilitiesController = require('../controllers/ClassAbilitiesController');
const godsController = require('../controllers/GodsController');
const equipmentController = require('../controllers/EquipmentController');
const PowerController = require('../controllers/PowerController');
const PericiaController = require('../controllers/PericiaController'); // NOVO

// Middleware para verificar autenticação
const checkAuth = (req, res, next) => {
  console.log('Session user:', req.session.user);
  res.locals.user = req.session.user || null;
  next();
};

// Aplicar middleware a todas as rotas
router.use(checkAuth);

// ========================================
// ROTAS PRINCIPAIS
// ========================================
router.get('/', homeController.index);
router.get('/racas', raceController.index);
router.get('/deuses', godsController.index);
router.get('/equipamentos', equipmentController.index);

// Rota para poderes
router.get('/poderes', PowerController.index);

// NOVO: Rotas para perícias
router.get('/pericias', PericiaController.index);

// ========================================
// ROTAS DE AUTENTICAÇÃO
// ========================================
router.get('/login', authController.loginForm);
router.post('/login', authController.login);
router.get('/register', authController.registerForm);
router.post('/register', authController.register);
router.get('/logout', authController.logout);

// ========================================
// ROTAS DE PERSONAGENS/FICHAS
// ========================================
router.get('/personagens', characterController.myCharacters);
router.get('/personagens/criar', characterController.createForm);
router.post('/personagens/criar', characterController.create);
router.get('/personagens/:id', characterController.view);
router.get('/personagens/:id/editar', characterController.editForm);
router.put('/personagens/:id', characterController.update);
router.delete('/personagens/:id', characterController.delete);

// ========================================
// ROTAS DE CLASSES (EXPANDIDAS)
// ========================================

// Rotas principais de classes
router.get('/classes', ClassController.index);
router.get('/classes/comparar', ClassController.compare);
router.get('/classes/estatisticas', ClassController.statistics);
router.get('/classes/buscar', ClassController.search);
router.get('/classes/:id', ClassController.view);

// API routes para classes
router.get('/api/classes/search', ClassController.search);
router.get('/api/classes/:classId/habilidades/:level', ClassController.getAbilitiesByLevel);
router.get('/api/classes/:classId/poderes/:level', ClassController.getAvailablePowers);
router.get('/api/classes/statistics', ClassController.statistics);

// ========================================
// ROTAS DE HABILIDADES DE CLASSE
// ========================================

// Rotas principais de habilidades
router.get('/habilidades', ClassAbilitiesController.index);
router.get('/habilidades/estatisticas', ClassAbilitiesController.statistics);
router.get('/habilidades/buscar', ClassAbilitiesController.search);
router.get('/habilidades/:id', ClassAbilitiesController.view);

// API routes para habilidades
router.get('/api/habilidades/search', ClassAbilitiesController.search);
router.get('/api/habilidades/tipo/:tipo', ClassAbilitiesController.getByType);
router.get('/api/habilidades/classe/:classId/:level', ClassAbilitiesController.getAvailableForClass);
router.get('/api/habilidades/progressao/:classId', ClassAbilitiesController.progression);
router.get('/api/habilidades/statistics', ClassAbilitiesController.statistics);

// ========================================
// ROTAS DE PERÍCIAS (NOVO)
// ========================================

// Rotas principais de perícias
router.get('/pericias', PericiaController.index);
router.get('/pericias/comparar', PericiaController.compare);
router.get('/pericias/estatisticas', PericiaController.statistics);
router.get('/pericias/buscar', PericiaController.search);
router.get('/pericias/:id', PericiaController.view);

// API routes para perícias
router.get('/api/pericias/search', PericiaController.search);
router.get('/api/pericias/statistics', PericiaController.statistics);
router.get('/api/pericias/classe/:classId', PericiaController.getByClass);
router.get('/api/pericias/personagem/:characterId', PericiaController.getCharacterSkills);
router.get('/api/pericias/disponiveis/:characterId', PericiaController.getAvailableForCharacter);

// Rotas para gerenciar perícias de personagem
router.post('/api/pericias/personagem/:characterId/adicionar', PericiaController.addToCharacter);
router.put('/api/pericias/personagem/:characterId/:skillId', PericiaController.updateCharacterSkill);
router.delete('/api/pericias/personagem/:characterId/:skillId', PericiaController.removeFromCharacter);
router.get('/api/pericias/personagem/:characterId/:skillId/bonus', PericiaController.calculateBonus);
router.post('/api/pericias/personagem/:characterId/aplicar-classe', PericiaController.applyClassSkills);

// ========================================
// ROTAS DE API PARA PODERES
// ========================================
router.get('/api/poderes', PowerController.apiGetPowers);
router.get('/api/racas/:raca_id/poderes', characterController.getRacialPowers);

// NOVO: Rotas para perícias de classes e personagens
router.get('/api/classes/:classe_id/pericias', characterController.getClassSkills);
router.get('/api/inteligencia/:inteligencia/bonus-pericias', characterController.calculateBonusSkills);

// ========================================
// NOVAS ROTAS PARA PODERES DE CLASSE
// ========================================

// Buscar poderes de uma classe específica (para o sistema de poderes de classe)
router.get('/api/classes/:classId/poderes', async (req, res) => {
  try {
    const { classId } = req.params;
    const { nivel = 20 } = req.query; // Default nível 20 para pegar todos os poderes
    
    console.log(`📡 Requisição de poderes para classe ${classId}, nível máximo ${nivel}`);
    
    const query = `
      SELECT 
        p.id,
        p.nome,
        p.tipo,
        p.grupo,
        p.descricao,
        p.pre_requisitos,
        p.efeito_especial,
        p.custo_pm,
        p.alcance,
        p.duracao,
        cp.nivel_minimo,
        cp.pre_requisitos as pre_requisitos_classe
      FROM poderes p
      INNER JOIN classe_poderes cp ON p.id = cp.poder_id
      WHERE cp.classe_id = $1 AND cp.nivel_minimo <= $2
      ORDER BY cp.nivel_minimo, p.nome
    `;
    
    const result = await require('../config/database').query(query, [classId, nivel]);
    
    console.log(`✅ Encontrados ${result.rows.length} poderes para a classe`);
    
    res.json({
      success: true,
      poderes: result.rows,
      total: result.rows.length,
      classId: classId,
      nivelMaximo: nivel
    });
    
  } catch (error) {
    console.error('❌ Erro ao buscar poderes da classe:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      poderes: []
    });
  }
});

router.get('/api/classes/:id/completo', async (req, res) => {
  try {
    const { id } = req.params;
    const { nivel = 1 } = req.query;
    
    // Buscar dados básicos da classe
    const classeQuery = 'SELECT * FROM classes WHERE id = $1';
    const classeResult = await require('../config/database').query(classeQuery, [id]);
    
    if (classeResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Classe não encontrada'
      });
    }
    
    const classe = classeResult.rows[0];
    
    // Query para habilidades
    const habilidadesQuery = `
      SELECT 
        hc.*,
        ch.nivel_obtencao,
        ch.observacoes
      FROM habilidades_classe hc
      INNER JOIN classe_habilidades ch ON hc.id = ch.habilidade_id
      WHERE ch.classe_id = $1 AND ch.nivel_obtencao <= $2
      ORDER BY ch.nivel_obtencao, hc.nome
    `;
    const habilidadesResult = await require('../config/database').query(habilidadesQuery, [id, nivel]);
    
    // Query para poderes
    const poderesQuery = `
      SELECT 
        p.*,
        cp.nivel_minimo,
        cp.pre_requisitos as pre_requisitos_classe
      FROM poderes p
      INNER JOIN classe_poderes cp ON p.id = cp.poder_id
      WHERE cp.classe_id = $1 AND cp.nivel_minimo <= $2
      ORDER BY cp.nivel_minimo, p.nome
    `;
    const poderesResult = await require('../config/database').query(poderesQuery, [id, nivel]);
    
    // NOVO: Query para perícias
    const periciasQuery = `
      SELECT 
        p.*,
        cp.obrigatoria,
        cp.opcional
      FROM pericias p
      INNER JOIN classe_pericias cp ON p.id = cp.pericia_id
      WHERE cp.classe_id = $1
      ORDER BY cp.obrigatoria DESC, p.categoria, p.nome
    `;
    const periciasResult = await require('../config/database').query(periciasQuery, [id]);
    
    res.json({
      success: true,
      classe,
      habilidades: habilidadesResult.rows,
      poderes: poderesResult.rows,
      pericias: periciasResult.rows
    });
    
  } catch (error) {
    console.error('Erro ao buscar informações completas da classe:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Buscar informações básicas de uma classe (fallback)
router.get('/api/classes/:classId/info', async (req, res) => {
  try {
    const { classId } = req.params;
    
    const query = `
      SELECT 
        id,
        nome,
        descricao,
        atributo_principal,
        pontos_vida_base,
        pontos_mana_base
      FROM classes 
      WHERE id = $1
    `;
    
    const result = await require('../config/database').query(query, [classId]);
    
    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Classe não encontrada'
      });
    }
    
    res.json({
      success: true,
      classe: result.rows[0]
    });
    
  } catch (error) {
    console.error('Erro ao buscar informações da classe:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ========================================
// ROTAS DE INTEGRAÇÃO ENTRE SISTEMAS
// ========================================

// Validar pré-requisitos de poder para uma classe
router.post('/api/classes/:classId/validar-poder', async (req, res) => {
  try {
    const { classId } = req.params;
    const { poderId, nivel, atributos = {} } = req.body;
    
    // Buscar informações do poder
    const poderQuery = `
      SELECT 
        p.*,
        cp.nivel_minimo,
        cp.pre_requisitos as pre_requisitos_classe
      FROM poderes p
      INNER JOIN classe_poderes cp ON p.id = cp.poder_id
      WHERE p.id = $1 AND cp.classe_id = $2
    `;
    const poderResult = await require('../config/database').query(poderQuery, [poderId, classId]);
    
    if (poderResult.rows.length === 0) {
      return res.json({
        success: false,
        valido: false,
        motivo: 'Poder não disponível para esta classe'
      });
    }
    
    const poder = poderResult.rows[0];
    
    // Validar nível mínimo
    if (nivel < poder.nivel_minimo) {
      return res.json({
        success: true,
        valido: false,
        motivo: `Nível mínimo necessário: ${poder.nivel_minimo}`
      });
    }
    
    res.json({
      success: true,
      valido: true,
      poder
    });
    
  } catch (error) {
    console.error('Erro ao validar pré-requisitos:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// Calcular progressão de personagem baseada na classe
router.get('/api/classes/:classId/progressao/:nivelAtual/:nivelDesejado', async (req, res) => {
  try {
    const { classId, nivelAtual, nivelDesejado } = req.params;
    
    if (parseInt(nivelDesejado) <= parseInt(nivelAtual)) {
      return res.status(400).json({
        success: false,
        error: 'Nível desejado deve ser maior que o atual'
      });
    }
    
    // Buscar classe
    const classeQuery = 'SELECT * FROM classes WHERE id = $1';
    const classeResult = await require('../config/database').query(classeQuery, [classId]);
    
    if (classeResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'Classe não encontrada'
      });
    }
    
    const classe = classeResult.rows[0];
    
    // Calcular ganhos
    const niveisGanhos = parseInt(nivelDesejado) - parseInt(nivelAtual);
    const pvGanhos = (classe.pv_por_nivel || 5) * niveisGanhos;
    const pmGanhos = (classe.pm_por_nivel || 3) * niveisGanhos;
    
    // Buscar novas habilidades
    const novasHabilidadesQuery = `
      SELECT 
        hc.*,
        ch.nivel_obtencao
      FROM habilidades_classe hc
      INNER JOIN classe_habilidades ch ON hc.id = ch.habilidade_id
      WHERE ch.classe_id = $1 
        AND ch.nivel_obtencao > $2 
        AND ch.nivel_obtencao <= $3
      ORDER BY ch.nivel_obtencao, hc.nome
    `;
    const novasHabilidades = await require('../config/database').query(novasHabilidadesQuery, [classId, nivelAtual, nivelDesejado]);
    
    // Buscar novos poderes
    const novosPoderesQuery = `
      SELECT 
        p.*,
        cp.nivel_minimo
      FROM poderes p
      INNER JOIN classe_poderes cp ON p.id = cp.poder_id
      WHERE cp.classe_id = $1 
        AND cp.nivel_minimo > $2 
        AND cp.nivel_minimo <= $3
      ORDER BY cp.nivel_minimo, p.nome
    `;
    const novosPoderes = await require('../config/database').query(novosPoderesQuery, [classId, nivelAtual, nivelDesejado]);
    
    res.json({
      success: true,
      progressao: {
        classe: classe.nome,
        nivelAtual: parseInt(nivelAtual),
        nivelDesejado: parseInt(nivelDesejado),
        niveisGanhos,
        ganhos: {
          pontosVida: pvGanhos,
          pontosMana: pmGanhos
        },
        novasHabilidades: novasHabilidades.rows,
        novosPoderes: novosPoderes.rows
      }
    });
    
  } catch (error) {
    console.error('Erro ao calcular progressão:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

// ========================================
// ROTA DE DEBUG PARA VERIFICAR PODERES DE CLASSE
// ========================================
router.get('/debug/classe/:classId/poderes', async (req, res) => {
  try {
    const { classId } = req.params;
    
    // Verificar se a classe existe
    const classeQuery = 'SELECT * FROM classes WHERE id = $1';
    const classeResult = await require('../config/database').query(classeQuery, [classId]);
    
    if (classeResult.rows.length === 0) {
      return res.json({
        error: 'Classe não encontrada',
        classId: classId
      });
    }
    
    const classe = classeResult.rows[0];
    
    // Verificar poderes
    const poderesQuery = `
      SELECT 
        p.nome as poder_nome,
        p.tipo,
        cp.nivel_minimo,
        cp.pre_requisitos
      FROM poderes p
      INNER JOIN classe_poderes cp ON p.id = cp.poder_id
      WHERE cp.classe_id = $1
      ORDER BY cp.nivel_minimo, p.nome
    `;
    const poderesResult = await require('../config/database').query(poderesQuery, [classId]);
    
    // NOVO: Verificar perícias
    const periciasQuery = `
      SELECT 
        p.nome as pericia_nome,
        p.categoria,
        p.atributo_chave,
        cp.obrigatoria,
        cp.opcional
      FROM pericias p
      INNER JOIN classe_pericias cp ON p.id = cp.pericia_id
      WHERE cp.classe_id = $1
      ORDER BY cp.obrigatoria DESC, p.nome
    `;
    const periciasResult = await require('../config/database').query(periciasQuery, [classId]);
    
    // Verificar estrutura das tabelas
    const tabelasQuery = `
      SELECT table_name, column_name, data_type
      FROM information_schema.columns
      WHERE table_name IN ('classes', 'poderes', 'classe_poderes', 'pericias', 'classe_pericias')
      ORDER BY table_name, ordinal_position
    `;
    const tabelasResult = await require('../config/database').query(tabelasQuery);
    
    res.json({
      classe: classe,
      totalPoderes: poderesResult.rows.length,
      poderes: poderesResult.rows,
      totalPericias: periciasResult.rows.length,
      pericias: periciasResult.rows,
      estruturaBanco: tabelasResult.rows,
      observacao: 'Sistema completo de poderes e perícias implementado'
    });
    
  } catch (error) {
    res.json({
      error: error.message,
      stack: error.stack
    });
  }
});

// ========================================
// ROTA DE DEBUG PARA VERIFICAR PERÍCIAS
// ========================================
router.get('/debug/pericias/sistema', async (req, res) => {
  try {
    // Verificar estatísticas gerais
    const statsQuery = `
      SELECT 
        'pericias' as tabela,
        COUNT(*) as total
      FROM pericias
      UNION ALL
      SELECT 
        'classe_pericias' as tabela,
        COUNT(*) as total
      FROM classe_pericias
      UNION ALL
      SELECT 
        'personagem_pericias' as tabela,
        COUNT(*) as total
      FROM personagem_pericias
    `;
    const statsResult = await require('../config/database').query(statsQuery);
    
    // Perícias por categoria
    const categoriaQuery = `
      SELECT categoria, COUNT(*) as quantidade
      FROM pericias
      GROUP BY categoria
      ORDER BY quantidade DESC
    `;
    const categoriaResult = await require('../config/database').query(categoriaQuery);
    
    // Perícias por atributo
    const atributoQuery = `
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
    `;
    const atributoResult = await require('../config/database').query(atributoQuery);
    
    // Classes com mais perícias
    const classesQuery = `
      SELECT 
        c.nome as classe,
        COUNT(cp.id) as total_pericias,
        COUNT(CASE WHEN cp.obrigatoria THEN 1 END) as obrigatorias,
        COUNT(CASE WHEN cp.opcional THEN 1 END) as opcionais
      FROM classes c
      LEFT JOIN classe_pericias cp ON c.id = cp.classe_id
      GROUP BY c.id, c.nome
      ORDER BY total_pericias DESC
    `;
    const classesResult = await require('../config/database').query(classesQuery);
    
    res.json({
      success: true,
      sistema: 'Perícias de Tormenta20',
      estatisticas: statsResult.rows,
      periciasPorCategoria: categoriaResult.rows,
      periciasPorAtributo: atributoResult.rows,
      classesComPericias: classesResult.rows,
      observacao: 'Sistema de perícias funcionando corretamente'
    });
    
  } catch (error) {
    console.error('Erro no debug de perícias:', error);
    res.status(500).json({
      success: false,
      error: error.message,
      stack: error.stack
    });
  }
});

module.exports = router;