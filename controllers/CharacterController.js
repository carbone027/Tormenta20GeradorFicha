const Character = require('../models/character');
const PowerController = require('../controllers/PowerController');
const Pericia = require('../models/pericia');
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

    // Buscar perícias organizadas
    const periciasSistema = await Pericia.getOrganizedSkills();

    res.render('pages/character-create', {
      title: 'Criar Personagem',
      activePage: 'createCharacter',
      user: req.session.user,
      racas: racas.rows,
      classes: classes.rows,
      deuses: deuses.rows,
      poderesDisponiveis,
      periciasSistema
    });
  } catch (error) {
    console.error('Erro ao carregar formulário:', error);
    res.status(500).render('error', {
      message: 'Erro ao carregar formulário de criação',
      error
    });
  }
};

const applyClassPowers = async (characterId, classeId, nivel) => {
  try {
    console.log(`🏛️ Aplicando poderes de classe para personagem ${characterId}, classe ${classeId}, nível ${nivel}`);

    // Buscar poderes automáticos da classe para o nível atual
    const poderesClasseQuery = `
      SELECT p.id, p.nome, cp.nivel_minimo
      FROM poderes p
      INNER JOIN classe_poderes cp ON p.id = cp.poder_id
      WHERE cp.classe_id = $1 AND cp.nivel_minimo <= $2
      ORDER BY cp.nivel_minimo, p.nome
    `;

    const result = await pool.query(poderesClasseQuery, [classeId, nivel]);

    if (result.rows.length === 0) {
      console.log('⚠️ Nenhum poder de classe encontrado para esta classe/nível');
      return [];
    }

    console.log(`📚 Encontrados ${result.rows.length} poderes de classe para aplicar`);

    // Aplicar cada poder de classe
    const poderesAplicados = [];
    for (const poder of result.rows) {
      try {
        // Verificar se o poder já existe para evitar duplicatas
        const existeQuery = `
          SELECT id FROM personagem_poderes 
          WHERE personagem_id = $1 AND poder_id = $2
        `;
        const existe = await pool.query(existeQuery, [characterId, poder.id]);

        if (existe.rows.length === 0) {
          // Inserir poder de classe
          const insertQuery = `
            INSERT INTO personagem_poderes (personagem_id, poder_id, fonte, observacoes)
            VALUES ($1, $2, 'classe', $3)
            RETURNING *
          `;

          const insertResult = await pool.query(insertQuery, [
            characterId,
            poder.id,
            `Poder de classe - Nível ${poder.nivel_minimo}+`
          ]);

          poderesAplicados.push(insertResult.rows[0]);
          console.log(`✅ Poder aplicado: ${poder.nome}`);
        } else {
          console.log(`ℹ️ Poder já existe: ${poder.nome}`);
        }
      } catch (error) {
        console.error(`❌ Erro ao aplicar poder ${poder.nome}:`, error.message);
      }
    }

    console.log(`✅ ${poderesAplicados.length} poderes de classe aplicados com sucesso`);
    return poderesAplicados;

  } catch (error) {
    console.error('❌ Erro ao aplicar poderes de classe:', error);
    throw error;
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
    if (!req.body.deus_id || req.body.deus_id === '') {
      throw new Error('Deus patrono é obrigatório - Todo herói de Arton precisa de fé divina!');
    }
    // Aplicar poderes raciais automaticamente se uma raça foi selecionada
    if (character.raca_id) {
      try {
        await PowerController.applyRacialPowers(character.id, character.raca_id);
        console.log('✅ Poderes raciais aplicados automaticamente');
      } catch (powerError) {
        console.log('⚠️ Erro ao aplicar poderes raciais (continuando):', powerError.message);
      }
    }

    // Aplicar poderes de classe automaticamente
    if (character.classe_id && character.nivel) {
      try {
        await applyClassPowers(character.id, character.classe_id, character.nivel);
        console.log('✅ Poderes de classe aplicados automaticamente');
      } catch (powerError) {
        console.log('⚠️ Erro ao aplicar poderes de classe (continuando):', powerError.message);
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

    // Aplicar perícias selecionadas pelo usuário
    if (req.body.pericias_selecionadas) {
      try {
        const periciasSelecionadas = Array.isArray(req.body.pericias_selecionadas)
          ? req.body.pericias_selecionadas
          : [req.body.pericias_selecionadas];

        for (const periciaId of periciasSelecionadas) {
          if (periciaId && !isNaN(periciaId)) {
            await Pericia.addToCharacter(character.id, parseInt(periciaId), true, 'escolha', 'Perícia escolhida na criação');
          }
        }
        console.log('✅ Perícias selecionadas aplicadas');
      } catch (skillError) {
        console.log('⚠️ Erro ao aplicar perícias selecionadas:', skillError.message);
      }
    }

    // Aplicar perícias por bônus de inteligência
    if (character.inteligencia > 10) {
      try {
        const bonusSkills = await Character.calculateBonusSkillsFromIntelligence(character.inteligencia);
        if (bonusSkills > 0 && req.body.pericias_inteligencia) {
          const periciasInteligencia = Array.isArray(req.body.pericias_inteligencia)
            ? req.body.pericias_inteligencia
            : [req.body.pericias_inteligencia];

          // Aplicar apenas a quantidade permitida pelo bônus de inteligência
          const periciasProcessar = periciasInteligencia.slice(0, bonusSkills);
          
          for (const periciaId of periciasProcessar) {
            if (periciaId && !isNaN(periciaId)) {
              await Pericia.addToCharacter(character.id, parseInt(periciaId), true, 'inteligencia', 'Perícia adicional por bônus de Inteligência');
            }
          }
          console.log(`✅ ${periciasProcessar.length} perícias de inteligência aplicadas`);
        }
      } catch (skillError) {
        console.log('⚠️ Erro ao aplicar perícias de inteligência:', skillError.message);
      }
    }

    // Processar poderes de classe selecionados manualmente (se enviados)
    if (req.body.poderes_classe_selecionados) {
      try {
        const poderesClasseSelecionados = Array.isArray(req.body.poderes_classe_selecionados)
          ? req.body.poderes_classe_selecionados
          : [req.body.poderes_classe_selecionados];

        for (const poderId of poderesClasseSelecionados) {
          if (poderId && !isNaN(poderId)) {
            // Verificar se é realmente um poder da classe
            const verificacaoQuery = `
              SELECT p.nome FROM poderes p
              INNER JOIN classe_poderes cp ON p.id = cp.poder_id
              WHERE p.id = $1 AND cp.classe_id = $2
            `;
            const verificacao = await pool.query(verificacaoQuery, [poderId, character.classe_id]);

            if (verificacao.rows.length > 0) {
              await PowerController.addToCharacter(character.id, parseInt(poderId), 'classe', 'Poder de classe selecionado');
            }
          }
        }
        console.log('✅ Poderes de classe selecionados aplicados');
      } catch (powerError) {
        console.log('⚠️ Erro ao aplicar poderes de classe selecionados:', powerError.message);
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
    const characterId = parseInt(req.params.id, 10);
    const character = await Character.findById(characterId);

    if (!character) {
      return res.status(404).render('pages/error', { message: 'Personagem não encontrado' });
    }

    // Carregar poderes incluindo os de classe
    let poderes = [];
    let poderesPorTipo = {};

    try {
      console.log(`🔍 Carregando poderes para personagem ${characterId}`);
      // Buscar poderes já associados
      const poderesQuery = `
        SELECT p.*, pp.fonte, pp.observacoes
        FROM poderes p
        INNER JOIN personagem_poderes pp ON p.id = pp.poder_id
        WHERE pp.personagem_id = $1
        ORDER BY pp.fonte, p.nome
      `;

      const result = await require('../config/database').query(poderesQuery, [characterId]);
      poderes = result.rows;

      // Se não há poderes de classe, buscar e associar automaticamente
      const temPoderesClasse = poderes.some(p => p.fonte === 'classe');

      if (!temPoderesClasse && character.classe_id && character.nivel) {
        console.log('🏛️ Associando poderes de classe automaticamente...');

        // Buscar poderes de classe disponíveis
        const poderesClasseQuery = `
          SELECT p.*, cp.nivel_minimo
          FROM poderes p
          INNER JOIN classe_poderes cp ON p.id = cp.poder_id
          WHERE cp.classe_id = $1 AND cp.nivel_minimo <= $2
          ORDER BY cp.nivel_minimo, p.nome
        `;

        const poderesClasseResult = await require('../config/database').query(poderesClasseQuery, [character.classe_id, character.nivel]);

        // Adicionar à lista com fonte 'classe'
        poderesClasseResult.rows.forEach(poder => {
          poderes.push({
            ...poder,
            fonte: 'classe',
            observacoes: `Poder de classe - Nível ${poder.nivel_minimo}+`
          });
        });
      }

      // Organizar por tipo
      poderes.forEach(poder => {
        const fonte = poder.fonte || 'geral';
        if (!poderesPorTipo[fonte]) {
          poderesPorTipo[fonte] = [];
        }
        poderesPorTipo[fonte].push(poder);
      });

    } catch (error) {
      console.error('❌ Erro ao carregar poderes:', error);
    }

    // Carregar perícias do personagem
    let pericias = [];
    let periciasPorCategoria = {};

    try {
      console.log(`🎯 Carregando perícias para personagem ${characterId}`);
      
      // CORREÇÃO: Buscar perícias do personagem E todas as perícias não-treinadas utilizáveis
      pericias = await Character.getCharacterSkillsComplete(characterId);

      // Organizar por categoria
      pericias.forEach(pericia => {
        const categoria = pericia.categoria || 'geral';
        if (!periciasPorCategoria[categoria]) {
          periciasPorCategoria[categoria] = [];
        }
        periciasPorCategoria[categoria].push(pericia);
      });

      console.log(`✅ ${pericias.length} perícias carregadas (incluindo não-treinadas utilizáveis)`);
    } catch (error) {
      console.error('❌ Erro ao carregar perícias:', error);
    }


    res.render('pages/character-view', {
      character,
      poderes,
      poderesPorTipo,
      pericias,
      periciasPorCategoria,
    });

  } catch (error) {
    console.error('❌ Erro ao visualizar personagem:', error);
    res.status(500).render('pages/error', { message: 'Erro interno do servidor' });
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

        // NOVO: Buscar perícias do personagem e disponíveis
    let periciasPersonagem = [];
    let periciasSistema = {};
    let periciasDaClasse = [];

    try {
      periciasPersonagem = await Character.getCharacterSkills(id);
      periciasSistema = await Pericia.getOrganizedSkills();
      
      // Se o personagem tem classe, buscar perícias da classe
      if (character.classe_id) {
        periciasDaClasse = await Character.getAvailableSkillsForClass(character.classe_id);
      }
    } catch (skillError) {
      console.log('⚠️ Erro ao carregar perícias para edição:', skillError.message);
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
      poderesDisponiveis,
      periciasPersonagem,
      periciasSistema,
      periciasDaClasse
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
    const classeMudou = personagemAtual && personagemAtual.classe_id != req.body.classe_id;
    const nivelMudou = personagemAtual && personagemAtual.nivel != req.body.nivel;
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

    // Se a classe ou nível mudaram, atualizar poderes de classe
    if ((classeMudou || nivelMudou) && req.body.classe_id && req.body.nivel) {
      try {
        // Remover poderes de classe antigos
        await pool.query(`
          DELETE FROM personagem_poderes 
          WHERE personagem_id = $1 AND fonte = 'classe'
        `, [id]);

        // Aplicar novos poderes de classe baseados na nova classe/nível
        await applyClassPowers(id, req.body.classe_id, req.body.nivel);
        console.log('✅ Poderes de classe atualizados devido à mudança de classe/nível');
      } catch (powerError) {
        console.log('⚠️ Erro ao atualizar poderes de classe:', powerError.message);
      }
    }

    // Se a classe mudou, atualizar perícias de classe
    if (classeMudou && req.body.classe_id) {
      try {
        // Remover perícias de classe antigas
        await pool.query(`
          DELETE FROM personagem_pericias 
          WHERE personagem_id = $1 AND origem = 'classe'
        `, [id]);

        // Aplicar novas perícias de classe
        await Character.applyClassSkills(id, req.body.classe_id);
        console.log('✅ Perícias de classe atualizadas devido à mudança de classe');
      } catch (skillError) {
        console.log('⚠️ Erro ao atualizar perícias de classe:', skillError.message);
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

    // NOVO: Atualizar perícias selecionadas
    if (req.body.pericias_selecionadas !== undefined) {
      try {
        // Remover perícias de escolha existentes
        await pool.query(`
          DELETE FROM personagem_pericias 
          WHERE personagem_id = $1 AND origem = 'escolha'
        `, [id]);

        // Adicionar novas perícias selecionadas
        if (req.body.pericias_selecionadas) {
          const periciasSelecionadas = Array.isArray(req.body.pericias_selecionadas)
            ? req.body.pericias_selecionadas
            : [req.body.pericias_selecionadas];

          for (const periciaId of periciasSelecionadas) {
            if (periciaId && !isNaN(periciaId)) {
              await Pericia.addToCharacter(id, parseInt(periciaId), true, 'escolha', 'Perícia escolhida na edição');
            }
          }
        }
        console.log('✅ Perícias selecionadas atualizadas');
      } catch (skillError) {
        console.log('⚠️ Erro ao atualizar perícias selecionadas:', skillError.message);
      }
    }

    // NOVO: Atualizar perícias de inteligência se aplicável
    if (req.body.pericias_inteligencia !== undefined && req.body.inteligencia > 10) {
      try {
        // Remover perícias de inteligência existentes
        await pool.query(`
          DELETE FROM personagem_pericias 
          WHERE personagem_id = $1 AND origem = 'inteligencia'
        `, [id]);

        const bonusSkills = await Character.calculateBonusSkillsFromIntelligence(req.body.inteligencia);
        
        if (bonusSkills > 0 && req.body.pericias_inteligencia) {
          const periciasInteligencia = Array.isArray(req.body.pericias_inteligencia)
            ? req.body.pericias_inteligencia
            : [req.body.pericias_inteligencia];

          // Aplicar apenas a quantidade permitida pelo bônus de inteligência
          const periciasProcessar = periciasInteligencia.slice(0, bonusSkills);
          
          for (const periciaId of periciasProcessar) {
            if (periciaId && !isNaN(periciaId)) {
              await Pericia.addToCharacter(id, parseInt(periciaId), true, 'inteligencia', 'Perícia adicional por bônus de Inteligência');
            }
          }
        }
        console.log('✅ Perícias de inteligência atualizadas');
      } catch (skillError) {
        console.log('⚠️ Erro ao atualizar perícias de inteligência:', skillError.message);
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

// Endpoint para buscar poderes por raça via AJAX
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

// Endpoint para buscar perícias por classe via AJAX
exports.getClassSkills = async (req, res) => {
  try {
    const { classe_id } = req.params;
    const { tipo } = req.query; // 'obrigatorias', 'opcionais', 'todas'

    if (!classe_id || isNaN(classe_id)) {
      return res.status(400).json({ error: 'ID da classe inválido' });
    }

    let pericias;
    switch (tipo) {
      case 'obrigatorias':
        pericias = await Pericia.findMandatoryByClass(classe_id);
        break;
      case 'opcionais':
        pericias = await Pericia.findOptionalByClass(classe_id);
        break;
      default:
        pericias = await Pericia.findByClass(classe_id);
    }

    res.json({ success: true, pericias });
  } catch (error) {
    console.error('Erro ao buscar perícias da classe:', error);
    res.status(500).json({ error: 'Erro ao buscar perícias da classe' });
  }
};

// Endpoint para calcular perícias disponíveis por inteligência
exports.calculateBonusSkills = async (req, res) => {
  try {
    const { inteligencia } = req.params;

    if (!inteligencia || isNaN(inteligencia)) {
      return res.status(400).json({ error: 'Valor de inteligência inválido' });
    }

    const bonusSkills = await Character.calculateBonusSkillsFromIntelligence(parseInt(inteligencia));
    
    res.json({ 
      success: true, 
      bonusSkills,
      inteligencia: parseInt(inteligencia),
      modificador: Math.floor((parseInt(inteligencia) - 10) / 2)
    });
  } catch (error) {
    console.error('Erro ao calcular perícias de inteligência:', error);
    res.status(500).json({ error: 'Erro ao calcular perícias de inteligência' });
  }
};