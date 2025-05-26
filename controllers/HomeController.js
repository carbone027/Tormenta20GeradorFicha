exports.index = (req, res) => {
  res.render('pages/home', {
    title: 'Página Inicial',
    activePage: 'overview',
    user: req.session.user || null
  });
};