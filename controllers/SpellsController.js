exports.index = (req, res) => {
  res.render('pages/spells', {
    title: 'Feitiços',
    activePage: 'spells',
    user: req.session.user || null
  });
};