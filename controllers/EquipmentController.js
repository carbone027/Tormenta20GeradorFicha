const pool = require('../config/database'); 

exports.index = async (req, res) => {
  try {
    const equipamentos = await pool.query(`
      SELECT * FROM equipamentos 
      ORDER BY tipo, categoria, nome
    `);
    
    // Agrupar equipamentos por tipo
    const equipamentosPorTipo = {};
    equipamentos.rows.forEach(item => {
      if (!equipamentosPorTipo[item.tipo]) {
        equipamentosPorTipo[item.tipo] = [];
      }
      equipamentosPorTipo[item.tipo].push(item);
    });
    
    res.render('pages/equipment', {
      title: 'Equipamentos',
      activePage: 'equipment',
      user: req.session.user || null,
      equipamentosPorTipo
    });
  } catch (error) {
    console.error('Erro ao carregar equipamentos:', error);
    res.status(500).render('error', {
      message: 'Erro ao carregar equipamentos',
      error
    });
  }
};