const Character = require('../models/character');
const pool = require('../config/database');

exports.myCharacters = async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  
  try {
    const characters = await Character.findAllByUser(req.session.user.id);
    
    res.render('pages/my-characters', {
      title: 'Meus Personagens',
      activePage: 'myCharacters',
      user: req.session.user,
      characters
    });
  } catch (error) {
    console.error('Erro ao carregar personagens:', error);
    res.status(500).render('error', {
      message: 'Erro ao carregar seus personagens',
      error
    });
  }
};

exports.createForm = async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  
  try {
    // Buscar raças, classes e deuses disponíveis
    const racas = await pool.query('SELECT * FROM racas ORDER BY nome');
    const classes = await pool.query('SELECT * FROM classes ORDER BY nome');
    const deuses = await pool.query('SELECT * FROM deuses ORDER BY nome');
    
    res.render('pages/character-create', {
      title: 'Criar Personagem',
      activePage: 'createCharacter',
      user: req.session.user,
      racas: racas.rows,
      classes: classes.rows,
      deuses: deuses.rows
    });
  } catch (error) {
    console.error('Erro ao carregar formulário:', error);
    res.status(500).render('error', {
      message: 'Erro ao carregar formulário de criação',
      error
    });
  }
};

exports.create = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Não autorizado' });
  }
  
  try {
    const characterData = {
      usuario_id: req.session.user.id,
      ...req.body
    };
    
    const character = await Character.create(characterData);
    res.redirect(`/personagens/${character.id}`);
  } catch (error) {
    console.error('Erro ao criar personagem:', error);
    res.status(500).json({ error: 'Erro ao criar personagem' });
  }
};

exports.view = async (req, res) => {
  try {
    const { id } = req.params;
    const character = await Character.findById(id);
    
    if (!character) {
      return res.status(404).render('error', {
        message: 'Personagem não encontrado',
        error: { status: 404 }
      });
    }
    
    res.render('pages/character-view', {
      title: `${character.nome} - Ficha`,
      activePage: 'characterView',
      user: req.session.user,
      characters: [character]
    });
  } catch (error) {
    console.error('Erro ao visualizar personagem:', error);
    res.status(500).render('error', {
      message: 'Erro ao carregar personagem',
      error
    });
  }
};

exports.editForm = async (req, res) => {
  if (!req.session.user) {
    return res.redirect('/login');
  }
  
  try {
    const { id } = req.params;
    const character = await Character.findById(id, req.session.user.id);
    
    if (!character) {
      return res.status(404).render('error', {
        message: 'Personagem não encontrado',
        error: { status: 404 }
      });
    }
    
    const racas = await pool.query('SELECT * FROM racas ORDER BY nome');
    const classes = await pool.query('SELECT * FROM classes ORDER BY nome');
    const deuses = await pool.query('SELECT * FROM deuses ORDER BY nome');
    
    res.render('pages/character-edit', {
      title: `Editar ${character.nome}`,
      activePage: 'editCharacter',
      user: req.session.user,
      character,
      racas: racas.rows,
      classes: classes.rows,
      deuses: deuses.rows
    });
  } catch (error) {
    console.error('Erro ao carregar formulário de edição:', error);
    res.status(500).render('error', {
      message: 'Erro ao carregar formulário',
      error
    });
  }
};

exports.update = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Não autorizado' });
  }
  
  try {
    const { id } = req.params;
    const updated = await Character.update(id, req.session.user.id, req.body);
    
    if (!updated) {
      return res.status(404).json({ error: 'Personagem não encontrado' });
    }
    
    res.redirect(`/personagens/${id}`);
  } catch (error) {
    console.error('Erro ao atualizar personagem:', error);
    res.status(500).json({ error: 'Erro ao atualizar personagem' });
  }
};

exports.delete = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Não autorizado' });
  }
  
  try {
    const { id } = req.params;
    const deleted = await Character.delete(id, req.session.user.id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Personagem não encontrado' });
    }
    
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir personagem:', error);
    res.status(500).json({ error: 'Erro ao excluir personagem' });
  }
};