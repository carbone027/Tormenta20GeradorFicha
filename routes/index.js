const express = require('express');
const router = express.Router();

// Importar controllers
const homeController = require('../controllers/HomeController');
const authController = require('../controllers/AuthController');
const characterController = require('../controllers/CharacterController');
const raceController = require('../controllers/RaceController');
const classController = require('../controllers/ClassController');
const ClassController = require('../controllers/ClassController'); // Nova versão expandida
const ClassAbilitiesController = require('../controllers/ClassAbilitiesController'); // Novo controlador
const godsController = require('../controllers/GodsController');
const equipmentController = require('../controllers/EquipmentController');
const PowerController = require('../controllers/PowerController');

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
// ROTAS DE API PARA PODERES
// ========================================
router.get('/api/poderes', PowerController.apiGetPowers);
router.get('/api/racas/:raca_id/poderes', characterController.getRacialPowers);

// ========================================
// NOVAS ROTAS PARA PODERES DE CLASSE
// ========================================

// Buscar poderes de uma classe específica (para o sistema de poderes de classe)
router.get('/api/classes/:classId/poderes', async (req, res) => {
  try {
    const { classId } = req.params;
    const { nivel = 20 } = req.query; // Default nível 20 para pegar todos os poderes
    
    console.log(`📡 Requisição de poderes para classe ${classId}, nível máximo ${nivel}`);
    
    // CORREÇÃO: Query sem a coluna cp.automatico
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
    
    // CORREÇÃO: Query para habilidades sem cp.automatico
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
    
    // CORREÇÃO: Query para poderes sem cp.automatico
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
    
    res.json({
      success: true,
      classe,
      habilidades: habilidadesResult.rows,
      poderes: poderesResult.rows
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

// Buscar informações completas de uma classe para criação de personagem
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
    
    // Buscar habilidades disponíveis no nível
    const habilidadesQuery = `
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
    const habilidadesResult = await require('../config/database').query(habilidadesQuery, [id, nivel]);
    
    // Buscar poderes disponíveis no nível
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
    
    res.json({
      success: true,
      classe,
      habilidades: habilidadesResult.rows,
      poderes: poderesResult.rows
    });
    
  } catch (error) {
    console.error('Erro ao buscar informações completas da classe:', error);
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

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
    
    // Validar pré-requisitos gerais (básico)
    if (poder.pre_requisitos) {
      // Implementar validação mais complexa se necessário
      // Por enquanto, retornamos como válido se chegou até aqui
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
    
    // CORREÇÃO: Buscar novas habilidades sem ch.automatica
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
    
    // CORREÇÃO: Buscar novos poderes sem verificar cp.automatico
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
    
    // CORREÇÃO: Verificar poderes sem cp.automatico
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
    
    // Verificar estrutura das tabelas
    const tabelasQuery = `
      SELECT table_name, column_name, data_type
      FROM information_schema.columns
      WHERE table_name IN ('classes', 'poderes', 'classe_poderes')
      ORDER BY table_name, ordinal_position
    `;
    const tabelasResult = await require('../config/database').query(tabelasQuery);
    
    res.json({
      classe: classe,
      totalPoderes: poderesResult.rows.length,
      poderes: poderesResult.rows,
      estruturaBanco: tabelasResult.rows,
      observacao: 'Todas as queries foram corrigidas para não usar cp.automatico'
    });
    
  } catch (error) {
    res.json({
      error: error.message,
      stack: error.stack
    });
  }
});

module.exports = router;