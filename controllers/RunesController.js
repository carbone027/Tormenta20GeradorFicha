const RunePage = require('../models/RunePage');

exports.index = (req, res) => {
  res.render('pages/runes', {
    title: 'Runas',
    activePage: 'runes',
    user: req.session.user || null
  });
};

exports.builder = (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  
  res.render('pages/rune-builder', {
    title: 'Construtor de Runas',
    activePage: 'runeBuilder',
    user: req.session.user
  });
};

exports.myRunes = async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  
  try {
    const runePages = await RunePage.findAllByUser(req.session.user.id);
    
    res.render('pages/my-runes', {
      title: 'Minhas Runas',
      activePage: 'myRunes',
      user: req.session.user,
      runePages
    });
  } catch (error) {
    console.error('Erro ao carregar runas:', error);
    res.status(500).render('error', {
      message: 'Erro ao carregar suas páginas de runas',
      error
    });
  }
};

exports.saveRune = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Não autorizado' });
  }
  
  try {
    const runePage = {
      userId: req.session.user.id,
      ...req.body
    };
    
    const savedPage = await RunePage.create(runePage);
    res.status(201).json(savedPage);
  } catch (error) {
    console.error('Erro ao salvar runa:', error);
    res.status(500).json({ error: 'Erro ao salvar página de runas' });
  }
};

exports.deleteRune = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Não autorizado' });
  }
  
  try {
    const { id } = req.params;
    const deleted = await RunePage.delete(id, req.session.user.id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Página de runas não encontrada' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir runa:', error);
    res.status(500).json({ error: 'Erro ao excluir página de runas' });
  }
};