exports.index = async (req, res) => {
  try {
    const classes = await pool.query('SELECT * FROM classes ORDER BY nome');
    
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
      error
    });
  }
};