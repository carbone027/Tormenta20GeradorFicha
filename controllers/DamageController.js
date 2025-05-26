exports.index = (req, res) => {
  res.render('pages/damage', {
    title: 'Tipos de Dano',
    activePage: 'damage',
    user: req.session.user || null
  });
};