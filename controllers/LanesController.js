exports.index = (req, res) => {
  res.render('pages/lanes', {
    title: 'Lanes',
    activePage: 'lanes',
    user: req.session.user || null
  });
};