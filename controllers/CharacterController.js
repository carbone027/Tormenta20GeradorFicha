const Character = require('../models/character');
const PowerController = require('../controllers/PowerController');
const pool = require('../config/database');
const express = require('express');
const app = express();
const methodOverride = require('method-override');
app.use(methodOverride('_method'));

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
    // Buscar raças, classes, deuses e poderes disponíveis
    const racas = await pool.query('SELECT * FROM racas ORDER BY nome');
    const classes = await pool.query('SELECT * FROM classes ORDER BY nome');
    const deuses = await pool.query('SELECT * FROM deuses ORDER BY nome');
    
    // Buscar poderes disponíveis para seleção (não raciais)
    const poderesDisponiveis = await PowerController.getAvailablePowers();
    
    res.render('pages/character-create', {
      title: 'Criar Personagem',
      activePage: 'createCharacter',
      user: req.session.user,
      racas: racas.rows,
      classes: classes.rows,
      deuses: deuses.rows,
      poderesDisponiveis
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
    
    // Criar o personagem
    const character = await Character.create(characterData);
    console.log('✅ Personagem criado:', character.nome);
    
    // Aplicar poderes raciais automaticamente se uma raça foi selecionada
    if (character.raca_id) {
      try {
        await PowerController.applyRacialPowers(character.id, character.raca_id);
        console.log('✅ Poderes raciais aplicados automaticamente');
      } catch (powerError) {
        console.log('⚠️ Erro ao aplicar poderes raciais (continuando):', powerError.message);
      }
    }
    
    // Aplicar poderes selecionados pelo usuário
    if (req.body.poderes_selecionados) {
      try {
        const poderesSelecionados = Array.isArray(req.body.poderes_selecionados) 
          ? req.body.poderes_selecionados 
          : [req.body.poderes_selecionados];
        
        for (const poderId of poderesSelecionados) {
          if (poderId && !isNaN(poderId)) {
            await PowerController.addToCharacter(character.id, parseInt(poderId), 'escolha', 'Poder escolhido na criação');
          }
        }
        console.log('✅ Poderes selecionados aplicados');
      } catch (powerError) {
        console.log('⚠️ Erro ao aplicar poderes selecionados:', powerError.message);
      }
    }
    
    res.redirect(`/personagens/${character.id}`);
  } catch (error) {
    console.error('Erro ao criar personagem:', error);
    res.status(500).json({ error: 'Erro ao criar personagem: ' + error.message });
  }
};

exports.view = async (req, res) => {
  try {
    const { id } = req.params;
    console.log('🔍 Buscando personagem com ID:', id);
    
    const character = await Character.findById(id);
    console.log('📋 Personagem encontrado:', character ? 'SIM' : 'NÃO');
    
    if (!character) {
      console.log('❌ Personagem não encontrado');
      return res.status(404).render('error', {
        message: 'Personagem não encontrado',
        error: { status: 404 },
        user: req.session.user
      });
    }
    
    // Buscar poderes do personagem
    let poderes = [];
    try {
      poderes = await PowerController.getCharacterPowers(id);
      console.log('✨ Poderes carregados:', poderes.length);
    } catch (powerError) {
      console.log('⚠️ Erro ao carregar poderes do personagem:', powerError.message);
    }
    
    // Agrupar poderes por tipo
    const poderesPorTipo = {};
    poderes.forEach(poder => {
      if (!poderesPorTipo[poder.tipo]) {
        poderesPorTipo[poder.tipo] = [];
      }
      poderesPorTipo[poder.tipo].push(poder);
    });
    
    console.log('✅ Renderizando template com personagem:', character.nome);
    
    res.render('pages/character-view', {
      title: `${character.nome} - Ficha`,
      activePage: 'characterView',
      user: req.session.user,
      character: character,
      poderes: poderes,
      poderesPorTipo: poderesPorTipo
    });
  } catch (error) {
    console.error('💥 Erro ao visualizar personagem:', error);
    res.status(500).render('error', {
      message: 'Erro ao carregar personagem',
      error,
      user: req.session.user
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
    
    // Buscar dados para o formulário
    const racas = await pool.query('SELECT * FROM racas ORDER BY nome');
    const classes = await pool.query('SELECT * FROM classes ORDER BY nome');
    const deuses = await pool.query('SELECT * FROM deuses ORDER BY nome');
    
    // Buscar poderes do personagem
    let poderesPersonagem = [];
    let poderesDisponiveis = {};
    
    try {
      poderesPersonagem = await PowerController.getCharacterPowers(id);
      poderesDisponiveis = await PowerController.getAvailablePowers();
    } catch (powerError) {
      console.log('⚠️ Erro ao carregar poderes para edição:', powerError.message);
    }
    
    res.render('pages/character-edit', {
      title: `Editar ${character.nome}`,
      activePage: 'editCharacter',
      user: req.session.user,
      character,
      racas: racas.rows,
      classes: classes.rows,
      deuses: deuses.rows,
      poderesPersonagem,
      poderesDisponiveis
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
    console.log('📝 Atualizando personagem ID:', id);
    console.log('📊 Dados recebidos:', req.body);
    
    // Verificar se a raça mudou
    const personagemAtual = await Character.findById(id, req.session.user.id);
    const racaMudou = personagemAtual && personagemAtual.raca_id != req.body.raca_id;
    
    // Atualizar dados básicos do personagem
    const updated = await Character.update(id, req.session.user.id, req.body);
    
    if (!updated) {
      return res.status(404).render('error', {
        message: 'Personagem não encontrado',
        error: { status: 404 },
        user: req.session.user
      });
    }
    
    // Se a raça mudou, atualizar poderes raciais
    if (racaMudou && req.body.raca_id) {
      try {
        // Remover poderes raciais antigos
        await pool.query(`
          DELETE FROM personagem_poderes 
          WHERE personagem_id = $1 AND fonte = 'raca'
        `, [id]);
        
        // Aplicar novos poderes raciais
        await PowerController.applyRacialPowers(id, req.body.raca_id);
        console.log('✅ Poderes raciais atualizados devido à mudança de raça');
      } catch (powerError) {
        console.log('⚠️ Erro ao atualizar poderes raciais:', powerError.message);
      }
    }
    
    // Atualizar poderes selecionados
    if (req.body.poderes_selecionados !== undefined) {
      try {
        // Remover poderes de escolha existentes
        await pool.query(`
          DELETE FROM personagem_poderes 
          WHERE personagem_id = $1 AND fonte = 'escolha'
        `, [id]);
        
        // Adicionar novos poderes selecionados
        if (req.body.poderes_selecionados) {
          const poderesSelecionados = Array.isArray(req.body.poderes_selecionados) 
            ? req.body.poderes_selecionados 
            : [req.body.poderes_selecionados];
          
          for (const poderId of poderesSelecionados) {
            if (poderId && !isNaN(poderId)) {
              await PowerController.addToCharacter(id, parseInt(poderId), 'escolha', 'Poder escolhido na edição');
            }
          }
        }
        console.log('✅ Poderes selecionados atualizados');
      } catch (powerError) {
        console.log('⚠️ Erro ao atualizar poderes selecionados:', powerError.message);
      }
    }
    
    console.log('✅ Personagem atualizado com sucesso');
    res.redirect(`/personagens/${id}`);
  } catch (error) {
    console.error('💥 Erro ao atualizar personagem:', error);
    res.status(500).render('error', {
      message: 'Erro ao atualizar personagem',
      error,
      user: req.session.user
    });
  }
};

exports.delete = async (req, res) => {
  if (!req.session.user) {
    return res.status(401).json({ error: 'Não autorizado' });
  }
  
  try {
    const { id } = req.params;
    
    // Os poderes do personagem serão removidos automaticamente devido ao CASCADE
    const deleted = await Character.delete(id, req.session.user.id);
    
    if (!deleted) {
      return res.status(404).json({ error: 'Personagem não encontrado' });
    }
    
    console.log('✅ Personagem e seus poderes removidos com sucesso');
    res.json({ success: true });
  } catch (error) {
    console.error('Erro ao excluir personagem:', error);
    res.status(500).json({ error: 'Erro ao excluir personagem' });
  }
};

// Novo endpoint para buscar poderes por raça via AJAX
exports.getRacialPowers = async (req, res) => {
  try {
    const { raca_id } = req.params;
    
    if (!raca_id || isNaN(raca_id)) {
      return res.status(400).json({ error: 'ID da raça inválido' });
    }
    
    const poderes = await PowerController.getByRace(raca_id);
    res.json({ success: true, poderes });
  } catch (error) {
    console.error('Erro ao buscar poderes raciais:', error);
    res.status(500).json({ error: 'Erro ao buscar poderes raciais' });
  }
};