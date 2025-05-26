exports.index = (req, res) => {
  res.render('pages/champions', {
    title: 'Classes de Campeões',
    activePage: 'champions',
    user: req.session.user || null
  });
};