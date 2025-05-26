exports.index = (req, res) => {
  res.render('pages/minions', {
    title: 'Minions e Gold',
    activePage: 'minions',
    user: req.session.user || null
  });
};