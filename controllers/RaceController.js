const pool = require('../config/database');

exports.index = async (req, res) => {
  try {
    const racas = await pool.query('SELECT * FROM racas ORDER BY nome');
    
    res.render('pages/races', {
      title: 'Raças de Arton',
      activePage: 'races',
      user: req.session.user || null,
      racas: racas.rows
    });
  } catch (error) {
    console.error('Erro ao carregar raças:', error);
    res.status(500).render('error', {
      message: 'Erro ao carregar raças',
      error
    });
  }
};