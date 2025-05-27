const pool = require('../config/database'); 

exports.index = async (req, res) => {
  try {
    const deuses = await pool.query('SELECT * FROM deuses ORDER BY nome');
    
    res.render('pages/gods', {
      title: 'Panteão de Arton',
      activePage: 'gods',
      user: req.session.user || null,
      deuses: deuses.rows
    });
  } catch (error) {
    console.error('Erro ao carregar deuses:', error);
    res.status(500).render('error', {
      message: 'Erro ao carregar deuses',
      error
    });
  }
};