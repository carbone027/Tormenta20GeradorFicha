exports.index = (req, res) => {
  res.render('pages/home', {
    title: 'Tormenta20 - Sistema de Fichas',
    activePage: 'overview',
    user: req.session.user || null
  });
};