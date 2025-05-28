-- Script completo para o sistema de classes do Tormenta20
-- Baseado no documento classes.txt

-- ========================================
-- LIMPEZA E PREPARAÇÃO
-- ========================================

-- Remover tabelas relacionadas (se existirem)
DROP TABLE IF EXISTS personagem_poderes_classe CASCADE;
DROP TABLE IF EXISTS classe_habilidades CASCADE;
DROP TABLE IF EXISTS classe_poderes CASCADE;
DROP TABLE IF EXISTS habilidades_classe CASCADE;
DROP TABLE IF EXISTS classes CASCADE;

-- ========================================
-- TABELA PRINCIPAL DE CLASSES
-- ========================================

CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  descricao TEXT NOT NULL,
  atributo_principal VARCHAR(50), -- Ex: "Força", "Inteligência ou Carisma"
  
  -- Pontos de vida e mana
  pv_base INTEGER NOT NULL, -- PV no 1º nível (+ Con)
  pv_por_nivel INTEGER NOT NULL, -- PV ganho por nível (+ Con)
  pm_por_nivel INTEGER NOT NULL, -- PM por nível
  
  -- Perícias
  pericias_obrigatorias TEXT[], -- Perícias que sempre tem
  pericias_opcoes TEXT[], -- Perícias para escolher
  quantidade_pericias_opcoes INTEGER, -- Quantas pode escolher
  
  -- Proficiências
  proficiencias TEXT[], -- Armas e armaduras
  
  -- Habilidade especial no 1º nível
  habilidade_nivel_1 TEXT,
  descricao_habilidade_1 TEXT,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- TABELA DE HABILIDADES DE CLASSE
-- ========================================

CREATE TABLE habilidades_classe (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  descricao TEXT NOT NULL,
  tipo VARCHAR(50), -- 'ativa', 'passiva', 'poder'
  nivel_requerido INTEGER DEFAULT 1,
  progressao TEXT, -- Como a habilidade evolui com o nível
  custo_pm INTEGER DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- TABELA ASSOCIATIVA CLASSE-HABILIDADES
-- ========================================

CREATE TABLE classe_habilidades (
  id SERIAL PRIMARY KEY,
  classe_id INTEGER REFERENCES classes(id) ON DELETE CASCADE,
  habilidade_id INTEGER REFERENCES habilidades_classe(id),
  nivel_obtencao INTEGER NOT NULL,
  automatica BOOLEAN DEFAULT TRUE, -- Se é automática ou opcional
  observacoes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- TABELA DE PODERES DE CLASSE ESPECÍFICOS
-- ========================================

CREATE TABLE classe_poderes (
  id SERIAL PRIMARY KEY,
  classe_id INTEGER REFERENCES classes(id) ON DELETE CASCADE,
  poder_id INTEGER REFERENCES poderes(id),
  nivel_minimo INTEGER DEFAULT 2, -- A partir de que nível pode ser escolhido
  pre_requisitos TEXT, -- Pré-requisitos específicos
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- INSERIR CLASSES PRINCIPAIS
-- ========================================

INSERT INTO classes (
  nome, descricao, atributo_principal, 
  pv_base, pv_por_nivel, pm_por_nivel,
  pericias_obrigatorias, pericias_opcoes, quantidade_pericias_opcoes,
  proficiencias, habilidade_nivel_1, descricao_habilidade_1
) VALUES

-- 1. ARCANISTA
('Arcanista', 
 'O arcanista é o grande mestre da magia. Muitos aventureiros aprendem algum rudimento das artes místicas, mas apenas um arcanista dedicado é capaz de dobrar a própria realidade.',
 'Inteligência ou Carisma',
 8, 2, 6,
 ARRAY['Misticismo', 'Vontade'],
 ARRAY['Conhecimento', 'Diplomacia', 'Enganação', 'Guerra', 'Iniciativa', 'Intimidação', 'Intuição', 'Investigação', 'Nobreza', 'Ofício', 'Percepção'],
 2,
 ARRAY['Nenhuma'],
 'Caminho do Arcanista',
 'Escolha entre Bruxo (foco mágico), Feiticeiro (poder inato) ou Mago (estudo e memorização). Define seu atributo-chave para magias.'
),

-- 2. BÁRBARO
('Bárbaro',
 'O bárbaro é um herói primitivo que ignora as frivolidades da civilização. Um combatente terrível que luta por instinto, confiando em puro frenesi de batalha.',
 'Força',
 24, 6, 3,
 ARRAY['Fortitude', 'Luta'],
 ARRAY['Adestramento', 'Atletismo', 'Cavalgar', 'Iniciativa', 'Intimidação', 'Ofício', 'Percepção', 'Pontaria', 'Sobrevivência', 'Vontade'],
 4,
 ARRAY['Armas marciais', 'Escudos'],
 'Fúria',
 'Você pode gastar 2 PM para invocar uma fúria selvagem, recebendo +2 em testes de ataque e rolagens de dano corpo a corpo.'
),

-- 3. BARDO
('Bardo',
 'Bardos são contadores de histórias e músicos errantes. São versáteis, pessoas do mundo, confortáveis ao lado de reis e de mendigos.',
 'Carisma',
 12, 3, 4,
 ARRAY['Atuação', 'Reflexos'],
 ARRAY['Acrobacia', 'Cavalgar', 'Conhecimento', 'Diplomacia', 'Enganação', 'Furtividade', 'Iniciativa', 'Intuição', 'Investigação', 'Jogatina', 'Ladinagem', 'Luta', 'Misticismo', 'Nobreza', 'Percepção', 'Pontaria', 'Vontade'],
 6,
 ARRAY['Armas marciais'],
 'Inspiração',
 'Você pode gastar uma ação padrão e 2 PM para inspirar aliados, dando +1 em testes de perícia em alcance curto.'
),

-- 4. BUCANEIRO
('Bucaneiro',
 'Bucaneiros são aventureiros que singram as águas deste mundo. Sua irmandade é brutal, mas também utópica, baseada na lealdade acima de tudo.',
 'Destreza',
 16, 4, 3,
 ARRAY['Luta ou Pontaria', 'Reflexos'],
 ARRAY['Acrobacia', 'Atletismo', 'Atuação', 'Enganação', 'Fortitude', 'Furtividade', 'Iniciativa', 'Intimidação', 'Jogatina', 'Luta', 'Ofício', 'Percepção', 'Pilotagem', 'Pontaria'],
 4,
 ARRAY['Armas marciais'],
 'Audácia',
 'Quando faz um teste de perícia, você pode gastar 2 PM para somar seu Carisma no teste.'
),

-- 5. CAÇADOR
('Caçador',
 'O caçador é um especialista em sobrevivência nos terrenos mais selvagens e inóspitos, capaz de obter alimento e achar abrigo em qualquer lugar.',
 'Força ou Destreza',
 16, 4, 4,
 ARRAY['Luta ou Pontaria', 'Sobrevivência'],
 ARRAY['Adestramento', 'Atletismo', 'Cavalgar', 'Cura', 'Fortitude', 'Furtividade', 'Iniciativa', 'Investigação', 'Luta', 'Ofício', 'Percepção', 'Pontaria', 'Reflexos'],
 6,
 ARRAY['Armas marciais', 'Escudos'],
 'Marca da Presa',
 'Você pode gastar uma ação de movimento e 1 PM para analisar uma criatura, recebendo +1d4 nas rolagens de dano contra ela.'
),

-- 6. CAVALEIRO
('Cavaleiro',
 'O cavaleiro é parte de uma longa história de heroísmo. Estes combatentes têm os mesmos ideais e usam as mesmas táticas de seus predecessores.',
 'Força',
 20, 5, 3,
 ARRAY['Fortitude', 'Luta'],
 ARRAY['Adestramento', 'Atletismo', 'Cavalgar', 'Diplomacia', 'Guerra', 'Iniciativa', 'Intimidação', 'Nobreza', 'Percepção', 'Vontade'],
 2,
 ARRAY['Armas marciais', 'Armaduras pesadas', 'Escudos'],
 'Código de Honra',
 'Você não pode atacar um oponente pelas costas, caído, desprevenido ou incapaz de lutar. Violações fazem você perder todos os PM.'
),

-- 7. CLÉRIGO
('Clérigo',
 'Clérigos são sacerdotes cuja devoção é tão poderosa que os torna capazes de realizar milagres.',
 'Sabedoria',
 16, 4, 5,
 ARRAY['Religião', 'Vontade'],
 ARRAY['Conhecimento', 'Cura', 'Diplomacia', 'Fortitude', 'Iniciativa', 'Intuição', 'Luta', 'Misticismo', 'Nobreza', 'Ofício', 'Percepção'],
 2,
 ARRAY['Armaduras pesadas', 'Escudos'],
 'Devoto Fiel',
 'Você se torna devoto de um deus maior, recebendo dois poderes concedidos em vez de apenas um.'
),

-- 8. DRUIDA
('Druida',
 'O druida é um guardião de tudo que é selvagem, vivo e puro, um devoto ligado a uma forma primordial de culto divino.',
 'Sabedoria',
 16, 4, 4,
 ARRAY['Sobrevivência', 'Vontade'],
 ARRAY['Adestramento', 'Atletismo', 'Cavalgar', 'Conhecimento', 'Cura', 'Fortitude', 'Iniciativa', 'Intuição', 'Luta', 'Misticismo', 'Ofício', 'Percepção', 'Religião'],
 4,
 ARRAY['Escudos'],
 'Devoto Fiel',
 'Você se torna devoto de Allihanna, Megalokk ou Oceano, recebendo dois poderes concedidos.'
),

-- 9. GUERREIRO
('Guerreiro',
 'O guerreiro é o mais simples, direto e comum dos aventureiros. Nenhum grupo está completo sem alguém especializado em combate.',
 'Força ou Destreza',
 20, 5, 3,
 ARRAY['Luta ou Pontaria', 'Fortitude'],
 ARRAY['Adestramento', 'Atletismo', 'Cavalgar', 'Guerra', 'Iniciativa', 'Intimidação', 'Luta', 'Ofício', 'Percepção', 'Pontaria', 'Reflexos'],
 2,
 ARRAY['Armas marciais', 'Armaduras pesadas', 'Escudos'],
 'Ataque Especial',
 'Quando faz um ataque, você pode gastar 1 PM para receber +4 no teste de ataque ou na rolagem de dano.'
),

-- 10. INVENTOR
('Inventor',
 'O inventor é um dos mais raros tipos de aventureiros. Confia em si mesmo e olha para o futuro através da ciência.',
 'Inteligência',
 12, 3, 4,
 ARRAY['Ofício', 'Vontade'],
 ARRAY['Conhecimento', 'Cura', 'Diplomacia', 'Fortitude', 'Iniciativa', 'Investigação', 'Luta', 'Misticismo', 'Ofício', 'Pilotagem', 'Percepção', 'Pontaria'],
 4,
 ARRAY['Nenhuma'],
 'Engenhosidade',
 'Quando faz um teste de perícia, você pode gastar 2 PM para somar sua Inteligência no teste.'
),

-- 11. LADINO
('Ladino',
 'O ladino é o mais esperto, discreto, silencioso e malandro de todos os heróis. Usa táticas que muitos consideram desleais.',
 'Destreza',
 12, 3, 4,
 ARRAY['Ladinagem', 'Reflexos'],
 ARRAY['Acrobacia', 'Atletismo', 'Atuação', 'Cavalgar', 'Conhecimento', 'Diplomacia', 'Enganação', 'Furtividade', 'Iniciativa', 'Intimidação', 'Intuição', 'Investigação', 'Jogatina', 'Luta', 'Ofício', 'Percepção', 'Pilotagem', 'Pontaria'],
 8,
 ARRAY['Nenhuma'],
 'Ataque Furtivo',
 'Uma vez por rodada, quando atinge uma criatura desprevenida ou flanqueada, você causa 1d6 pontos de dano extra.'
),

-- 12. LUTADOR
('Lutador',
 'Lutadores são especialistas em todas as formas de combate desarmado, desde simples socos até complexas chaves.',
 'Força',
 20, 5, 3,
 ARRAY['Fortitude', 'Luta'],
 ARRAY['Acrobacia', 'Adestramento', 'Atletismo', 'Enganação', 'Furtividade', 'Iniciativa', 'Intimidação', 'Ofício', 'Percepção', 'Pontaria', 'Reflexos'],
 4,
 ARRAY['Nenhuma'],
 'Briga',
 'Seus ataques desarmados causam 1d6 pontos de dano e podem causar dano letal ou não letal sem penalidades.'
),

-- 13. NOBRE
('Nobre',
 'O aventureiro nobre reconhece o valor de um bom líder e se considera ligado à terra, ao povo, a seus aliados.',
 'Carisma',
 16, 4, 4,
 ARRAY['Diplomacia ou Intimidação', 'Vontade'],
 ARRAY['Adestramento', 'Atuação', 'Cavalgar', 'Conhecimento', 'Diplomacia', 'Enganação', 'Fortitude', 'Guerra', 'Iniciativa', 'Intimidação', 'Intuição', 'Investigação', 'Jogatina', 'Luta', 'Nobreza', 'Ofício', 'Percepção', 'Pontaria'],
 4,
 ARRAY['Armas marciais', 'Armaduras pesadas', 'Escudos'],
 'Autoconfiança',
 'Você pode usar seu Carisma em vez de Destreza na Defesa.'
),

-- 14. PALADINO
('Paladino',
 'O paladino é um soldado a serviço do bem e da justiça. Não há meio-termo: devem defender os inocentes e resistir a tentações.',
 'Força e Carisma',
 20, 5, 3,
 ARRAY['Luta', 'Vontade'],
 ARRAY['Adestramento', 'Atletismo', 'Cavalgar', 'Cura', 'Diplomacia', 'Fortitude', 'Guerra', 'Iniciativa', 'Intuição', 'Nobreza', 'Percepção', 'Religião'],
 2,
 ARRAY['Armas marciais', 'Armaduras pesadas', 'Escudos'],
 'Abençoado',
 'Você soma seu Carisma no seu total de pontos de mana no 1º nível e se torna devoto de um deus bondoso.'
);

-- ========================================
-- INSERIR HABILIDADES DE CLASSE PRINCIPAIS
-- ========================================

INSERT INTO habilidades_classe (nome, descricao, tipo, nivel_requerido, progressao) VALUES

-- HABILIDADES GERAIS DE PROGRESSÃO
('Poder de Classe', 'A partir do 2º nível, e a cada nível seguinte, você escolhe um poder específico da sua classe.', 'poder', 2, 'A cada nível a partir do 2º'),
('Magias', 'Você pode lançar magias. A cada quatro níveis, pode lançar magias de um círculo maior.', 'ativa', 1, '1º círculo no 1º nível, +1 círculo a cada 4 níveis'),

-- HABILIDADES ESPECÍFICAS DO ARCANISTA
('Caminho do Arcanista', 'Escolha entre Bruxo, Feiticeiro ou Mago. Define como você lança magias.', 'passiva', 1, 'Escolha única no 1º nível'),
('Alta Arcana', 'O custo em PM de suas magias arcanas é reduzido à metade.', 'passiva', 20, 'Apenas no 20º nível'),

-- HABILIDADES ESPECÍFICAS DO BÁRBARO
('Fúria', 'Você pode invocar uma fúria selvagem, ganhando bônus em combate.', 'ativa', 1, '+1 no bônus a cada 5 níveis'),
('Instinto Selvagem', 'Você recebe bônus em rolagens de dano, Percepção e Reflexos.', 'passiva', 3, '+1 a cada 6 níveis'),
('Redução de Dano', 'Você ignora parte dos ferimentos graças ao seu vigor.', 'passiva', 5, 'RD 2 no 5º nível, +2 a cada 3 níveis'),
('Fúria Titânica', 'O bônus de Fúria é dobrado.', 'passiva', 20, 'Apenas no 20º nível'),

-- HABILIDADES ESPECÍFICAS DO BARDO
('Inspiração', 'Você pode inspirar aliados com sua arte.', 'ativa', 1, '+1 no bônus a cada 4 níveis'),
('Eclético', 'Você pode gastar 1 PM para ser treinado em uma perícia por um teste.', 'ativa', 2, 'A partir do 2º nível'),
('Artista Completo', 'Você pode usar Inspiração como ação livre e reduz custos de habilidades.', 'passiva', 20, 'Apenas no 20º nível'),

-- HABILIDADES ESPECÍFICAS DO BUCANEIRO
('Audácia', 'Você pode somar Carisma em testes de perícia.', 'ativa', 1, 'Desde o 1º nível'),
('Insolência', 'Você soma Carisma na Defesa.', 'passiva', 1, 'Limitado pelo nível'),
('Evasão', 'Você não sofre dano em alguns efeitos se passar no teste de Reflexos.', 'passiva', 2, 'A partir do 2º nível'),
('Esquiva Sagaz', 'Você recebe bônus na Defesa e Reflexos.', 'passiva', 3, '+1 a cada 4 níveis'),
('Panache', 'Você recupera PM ao fazer críticos ou reduzir inimigos a 0 PV.', 'passiva', 5, 'A partir do 5º nível'),
('Evasão Aprimorada', 'Você sofre apenas metade do dano mesmo se falhar no teste de Reflexos.', 'passiva', 10, 'A partir do 10º nível'),
('Sorte de Nimb', 'Você pode rolar novamente testes, com resultados 11+ sendo considerados 20 natural.', 'ativa', 20, 'Apenas no 20º nível'),

-- HABILIDADES ESPECÍFICAS DO CAÇADOR
('Marca da Presa', 'Você pode analisar uma criatura para causar dano extra contra ela.', 'ativa', 1, 'Dano aumenta a cada 4 níveis'),
('Rastreador', 'Você recebe bônus em Sobrevivência e pode rastrear em velocidade normal.', 'passiva', 1, '+2 em Sobrevivência'),
('Explorador', 'Você escolhe um tipo de terreno e recebe bônus quando estiver nele.', 'passiva', 3, 'Novo terreno ou +2 bônus a cada 4 níveis'),
('Caminho do Explorador', 'Você atravessa terrenos difíceis sem redução de deslocamento.', 'passiva', 5, 'Apenas em terrenos de Explorador'),
('Mestre Caçador', 'Marca da Presa como ação livre e efeitos aprimorados.', 'passiva', 20, 'Apenas no 20º nível'),

-- HABILIDADES ESPECÍFICAS DO CAVALEIRO
('Código de Honra', 'Você deve seguir um código de conduta honoroso.', 'passiva', 1, 'Restrição permanente'),
('Baluarte', 'Você pode gastar PM para receber bônus na Defesa e resistências.', 'ativa', 1, 'Bônus aumenta a cada 4 níveis'),
('Duelo', 'Você pode focar em um oponente específico.', 'ativa', 2, 'Bônus aumenta a cada 5 níveis'),
('Caminho do Cavaleiro', 'Escolha entre Bastião (RD) ou Montaria (cavalo de guerra).', 'passiva', 5, 'Escolha única no 5º nível'),
('Resoluto', 'Você pode refazer testes de resistência contra condições.', 'ativa', 11, 'A partir do 11º nível'),
('Bravura Final', 'Você pode continuar consciente mesmo com 0 PV ou menos.', 'ativa', 20, 'Apenas no 20º nível'),

-- HABILIDADES ESPECÍFICAS DO CLÉRIGO
('Devoto Fiel', 'Você se torna devoto de um deus maior e recebe dois poderes concedidos.', 'passiva', 1, 'Escolha única no 1º nível'),
('Mão da Divindade', 'Você pode lançar três magias divinas quaisquer como ação livre.', 'ativa', 20, 'Apenas no 20º nível'),

-- HABILIDADES ESPECÍFICAS DO DRUIDA
('Devoto Fiel (Druida)', 'Você se torna devoto de Allihanna, Megalokk ou Oceano.', 'passiva', 1, 'Escolha única no 1º nível'),
('Empatia Selvagem', 'Você pode se comunicar com animais.', 'ativa', 1, 'Desde o 1º nível'),
('Caminho dos Ermos', 'Você atravessa terrenos difíceis naturais sem penalidade.', 'passiva', 2, 'Apenas terrenos naturais'),
('Força da Natureza', 'Você reduz custos de magias e aumenta CDs.', 'passiva', 20, 'Bônus dobram em terrenos naturais'),

-- HABILIDADES ESPECÍFICAS DO GUERREIRO
('Ataque Especial', 'Você pode gastar PM para melhorar seus ataques.', 'ativa', 1, 'Custo e bônus aumentam a cada 4 níveis'),
('Durão', 'Você pode gastar PM para reduzir dano à metade.', 'ativa', 3, 'A partir do 3º nível'),
('Ataque Extra', 'Você pode fazer um ataque adicional por rodada.', 'ativa', 6, 'A partir do 6º nível'),
('Campeão', 'Dano de todos os ataques aumenta em um passo e você recupera PM.', 'passiva', 20, 'Apenas no 20º nível'),

-- HABILIDADES ESPECÍFICAS DO INVENTOR
('Engenhosidade', 'Você pode somar Inteligência em testes de perícia.', 'ativa', 1, 'Desde o 1º nível'),
('Protótipo', 'Você começa com um item superior ou itens alquímicos.', 'passiva', 1, 'Apenas no 1º nível'),
('Fabricar Item Superior', 'Você pode fabricar itens superiores.', 'passiva', 2, 'Melhorias aumentam nos níveis 5, 8, 11'),
('Comerciante', 'Você pode vender itens 10% mais caro.', 'passiva', 3, 'A partir do 3º nível'),
('Encontrar Fraqueza', 'Você pode analisar objetos para ignorar RD.', 'ativa', 7, 'A partir do 7º nível'),
('Fabricar Item Mágico', 'Você pode fabricar itens mágicos.', 'passiva', 9, 'Melhores itens nos níveis 13, 17'),
('Olho do Dragão', 'Você pode analisar automaticamente itens mágicos.', 'ativa', 10, 'A partir do 10º nível'),
('Obra-Prima', 'Você fabrica sua obra-prima lendária.', 'passiva', 20, 'Apenas no 20º nível'),

-- HABILIDADES ESPECÍFICAS DO LADINO
('Ataque Furtivo', 'Você causa dano extra contra criaturas desprevenidas.', 'passiva', 1, '+1d6 a cada 2 níveis'),
('Especialista', 'Você pode dobrar bônus de treinamento em perícias escolhidas.', 'ativa', 1, 'Desde o 1º nível'),
('Evasão (Ladino)', 'Você não sofre dano em alguns efeitos se passar no teste.', 'passiva', 2, 'A partir do 2º nível'),
('Esquiva Sobrenatural', 'Você nunca fica surpreendido.', 'passiva', 4, 'A partir do 4º nível'),
('Olhos nas Costas', 'Você não pode ser flanqueado.', 'passiva', 8, 'A partir do 8º nível'),
('Evasão Aprimorada (Ladino)', 'Você sofre apenas metade do dano mesmo se falhar.', 'passiva', 10, 'A partir do 10º nível'),
('A Pessoa Certa para o Trabalho', 'Você recebe +10 em ataques furtivos e perícias de ladino.', 'ativa', 20, 'Apenas no 20º nível'),

-- HABILIDADES ESPECÍFICAS DO LUTADOR
('Briga', 'Seus ataques desarmados causam mais dano.', 'passiva', 1, 'Dano aumenta nos níveis 5, 9, 13, 17'),
('Golpe Relâmpago', 'Você pode fazer um ataque desarmado adicional.', 'ativa', 1, 'Desde o 1º nível'),
('Casca Grossa', 'Você soma Constituição na Defesa.', 'passiva', 3, '+1 adicional a cada 4 níveis'),
('Golpe Cruel', 'Sua margem de ameaça desarmada aumenta.', 'passiva', 5, 'A partir do 5º nível'),
('Golpe Violento', 'Seu multiplicador de crítico desarmado aumenta.', 'passiva', 9, 'A partir do 9º nível'),
('Dono da Rua', 'Dano máximo e ataques múltiplos aprimorados.', 'passiva', 20, 'Apenas no 20º nível'),

-- HABILIDADES ESPECÍFICAS DO NOBRE
('Autoconfiança', 'Você pode usar Carisma em vez de Destreza na Defesa.', 'passiva', 1, 'Desde o 1º nível'),
('Espólio', 'Você recebe um item de até T$ 2.000.', 'passiva', 1, 'Apenas no 1º nível'),
('Orgulho', 'Você pode gastar PM para receber bônus em testes de perícia.', 'ativa', 1, 'Desde o 1º nível'),
('Palavras Afiadas', 'Você pode causar dano psíquico com Diplomacia ou Intimidação.', 'ativa', 2, 'Dano aumenta a cada 4 níveis'),
('Riqueza', 'Você recebe dinheiro periodicamente.', 'passiva', 3, 'A partir do 3º nível'),
('Gritar Ordens', 'Você pode dar bônus em perícias a aliados.', 'ativa', 4, 'A partir do 4º nível'),
('Presença Aristocrática', 'Inimigos podem hesitar em atacá-lo.', 'ativa', 5, 'A partir do 5º nível'),
('Realeza', 'Efeitos de Presença e Palavras Afiadas aprimorados.', 'passiva', 20, 'Apenas no 20º nível'),

-- HABILIDADES ESPECÍFICAS DO PALADINO
('Abençoado', 'Você soma Carisma em PM e se torna devoto.', 'passiva', 1, 'Desde o 1º nível'),
('Código do Herói', 'Você deve manter sua palavra e nunca recusar ajuda a inocentes.', 'passiva', 1, 'Restrição permanente'),
('Golpe Divino', 'Você pode desferir golpes destruidores imbuídos de poder divino.', 'ativa', 1, 'Dano aumenta a cada 4 níveis'),
('Cura pelas Mãos', 'Você pode curar aliados com o toque.', 'ativa', 2, 'Cura aumenta a cada 4 níveis'),
('Aura Sagrada', 'Você pode gerar uma aura que dá bônus em resistências.', 'ativa', 3, 'A partir do 3º nível'),
('Bênção da Justiça', 'Escolha entre Égide Sagrada ou Montaria Sagrada.', 'passiva', 5, 'Escolha única no 5º nível'),
('Vingador Sagrado', 'Você assume forma divina com voo e redução de dano.', 'ativa', 20, 'Apenas no 20º nível');

-- ========================================
-- RELACIONAR CLASSES COM SUAS HABILIDADES
-- ========================================

-- Função para facilitar a inserção de relações classe-habilidade
CREATE OR REPLACE FUNCTION insert_classe_habilidade(
  p_classe_nome VARCHAR,
  p_habilidade_nome VARCHAR,
  p_nivel INTEGER,
  p_automatica BOOLEAN DEFAULT TRUE
) RETURNS VOID AS $$
BEGIN
  INSERT INTO classe_habilidades (classe_id, habilidade_id, nivel_obtencao, automatica)
  SELECT c.id, h.id, p_nivel, p_automatica
  FROM classes c, habilidades_classe h
  WHERE c.nome = p_classe_nome AND h.nome = p_habilidade_nome;
END;
$$ LANGUAGE plpgsql;

-- ARCANISTA
SELECT insert_classe_habilidade('Arcanista', 'Caminho do Arcanista', 1);
SELECT insert_classe_habilidade('Arcanista', 'Magias', 1);
SELECT insert_classe_habilidade('Arcanista', 'Poder de Classe', 2);
SELECT insert_classe_habilidade('Arcanista', 'Alta Arcana', 20);

-- BÁRBARO
SELECT insert_classe_habilidade('Bárbaro', 'Fúria', 1);
SELECT insert_classe_habilidade('Bárbaro', 'Poder de Classe', 2);
SELECT insert_classe_habilidade('Bárbaro', 'Instinto Selvagem', 3);
SELECT insert_classe_habilidade('Bárbaro', 'Redução de Dano', 5);
SELECT insert_classe_habilidade('Bárbaro', 'Fúria Titânica', 20);

-- BARDO
SELECT insert_classe_habilidade('Bardo', 'Inspiração', 1);
SELECT insert_classe_habilidade('Bardo', 'Magias', 1);
SELECT insert_classe_habilidade('Bardo', 'Poder de Classe', 2);
SELECT insert_classe_habilidade('Bardo', 'Eclético', 2);
SELECT insert_classe_habilidade('Bardo', 'Artista Completo', 20);

-- BUCANEIRO
SELECT insert_classe_habilidade('Bucaneiro', 'Audácia', 1);
SELECT insert_classe_habilidade('Bucaneiro', 'Insolência', 1);
SELECT insert_classe_habilidade('Bucaneiro', 'Evasão', 2);
SELECT insert_classe_habilidade('Bucaneiro', 'Poder de Classe', 2);
SELECT insert_classe_habilidade('Bucaneiro', 'Esquiva Sagaz', 3);
SELECT insert_classe_habilidade('Bucaneiro', 'Panache', 5);
SELECT insert_classe_habilidade('Bucaneiro', 'Evasão Aprimorada', 10);
SELECT insert_classe_habilidade('Bucaneiro', 'Sorte de Nimb', 20);

-- CAÇADOR
SELECT insert_classe_habilidade('Caçador', 'Marca da Presa', 1);
SELECT insert_classe_habilidade('Caçador', 'Rastreador', 1);
SELECT insert_classe_habilidade('Caçador', 'Poder de Classe', 2);
SELECT insert_classe_habilidade('Caçador', 'Explorador', 3);
SELECT insert_classe_habilidade('Caçador', 'Caminho do Explorador', 5);
SELECT insert_classe_habilidade('Caçador', 'Mestre Caçador', 20);

-- CAVALEIRO
SELECT insert_classe_habilidade('Cavaleiro', 'Baluarte', 1);
SELECT insert_classe_habilidade('Cavaleiro', 'Código de Honra', 1);
SELECT insert_classe_habilidade('Cavaleiro', 'Duelo', 2);
SELECT insert_classe_habilidade('Cavaleiro', 'Poder de Classe', 2);
SELECT insert_classe_habilidade('Cavaleiro', 'Caminho do Cavaleiro', 5);
SELECT insert_classe_habilidade('Cavaleiro', 'Resoluto', 11);
SELECT insert_classe_habilidade('Cavaleiro', 'Bravura Final', 20);

-- CLÉRIGO
SELECT insert_classe_habilidade('Clérigo', 'Devoto Fiel', 1);
SELECT insert_classe_habilidade('Clérigo', 'Magias', 1);
SELECT insert_classe_habilidade('Clérigo', 'Poder de Classe', 2);
SELECT insert_classe_habilidade('Clérigo', 'Mão da Divindade', 20);

-- DRUIDA
SELECT insert_classe_habilidade('Druida', 'Devoto Fiel (Druida)', 1);
SELECT insert_classe_habilidade('Druida', 'Empatia Selvagem', 1);
SELECT insert_classe_habilidade('Druida', 'Magias', 1);
SELECT insert_classe_habilidade('Druida', 'Caminho dos Ermos', 2);
SELECT insert_classe_habilidade('Druida', 'Poder de Classe', 2);
SELECT insert_classe_habilidade('Druida', 'Força da Natureza', 20);

-- GUERREIRO
SELECT insert_classe_habilidade('Guerreiro', 'Ataque Especial', 1);
SELECT insert_classe_habilidade('Guerreiro', 'Poder de Classe', 2);
SELECT insert_classe_habilidade('Guerreiro', 'Durão', 3);
SELECT insert_classe_habilidade('Guerreiro', 'Ataque Extra', 6);
SELECT insert_classe_habilidade('Guerreiro', 'Campeão', 20);

-- INVENTOR
SELECT insert_classe_habilidade('Inventor', 'Engenhosidade', 1);
SELECT insert_classe_habilidade('Inventor', 'Protótipo', 1);
SELECT insert_classe_habilidade('Inventor', 'Fabricar Item Superior', 2);
SELECT insert_classe_habilidade('Inventor', 'Poder de Classe', 2);
SELECT insert_classe_habilidade('Inventor', 'Comerciante', 3);
SELECT insert_classe_habilidade('Inventor', 'Encontrar Fraqueza', 7);
SELECT insert_classe_habilidade('Inventor', 'Fabricar Item Mágico', 9);
SELECT insert_classe_habilidade('Inventor', 'Olho do Dragão', 10);
SELECT insert_classe_habilidade('Inventor', 'Obra-Prima', 20);

-- LADINO
SELECT insert_classe_habilidade('Ladino', 'Ataque Furtivo', 1);
SELECT insert_classe_habilidade('Ladino', 'Especialista', 1);
SELECT insert_classe_habilidade('Ladino', 'Evasão (Ladino)', 2);
SELECT insert_classe_habilidade('Ladino', 'Poder de Classe', 2);
SELECT insert_classe_habilidade('Ladino', 'Esquiva Sobrenatural', 4);
SELECT insert_classe_habilidade('Ladino', 'Olhos nas Costas', 8);
SELECT insert_classe_habilidade('Ladino', 'Evasão Aprimorada (Ladino)', 10);
SELECT insert_classe_habilidade('Ladino', 'A Pessoa Certa para o Trabalho', 20);

-- LUTADOR
SELECT insert_classe_habilidade('Lutador', 'Briga', 1);
SELECT insert_classe_habilidade('Lutador', 'Golpe Relâmpago', 1);
SELECT insert_classe_habilidade('Lutador', 'Poder de Classe', 2);
SELECT insert_classe_habilidade('Lutador', 'Casca Grossa', 3);
SELECT insert_classe_habilidade('Lutador', 'Golpe Cruel', 5);
SELECT insert_classe_habilidade('Lutador', 'Golpe Violento', 9);
SELECT insert_classe_habilidade('Lutador', 'Dono da Rua', 20);

-- NOBRE
SELECT insert_classe_habilidade('Nobre', 'Autoconfiança', 1);
SELECT insert_classe_habilidade('Nobre', 'Espólio', 1);
SELECT insert_classe_habilidade('Nobre', 'Orgulho', 1);
SELECT insert_classe_habilidade('Nobre', 'Palavras Afiadas', 2);
SELECT insert_classe_habilidade('Nobre', 'Poder de Classe', 2);
SELECT insert_classe_habilidade('Nobre', 'Riqueza', 3);
SELECT insert_classe_habilidade('Nobre', 'Gritar Ordens', 4);
SELECT insert_classe_habilidade('Nobre', 'Presença Aristocrática', 5);
SELECT insert_classe_habilidade('Nobre', 'Realeza', 20);

-- PALADINO
SELECT insert_classe_habilidade('Paladino', 'Abençoado', 1);
SELECT insert_classe_habilidade('Paladino', 'Código do Herói', 1);
SELECT insert_classe_habilidade('Paladino', 'Golpe Divino', 1);
SELECT insert_classe_habilidade('Paladino', 'Cura pelas Mãos', 2);
SELECT insert_classe_habilidade('Paladino', 'Poder de Classe', 2);
SELECT insert_classe_habilidade('Paladino', 'Aura Sagrada', 3);
SELECT insert_classe_habilidade('Paladino', 'Bênção da Justiça', 5);
SELECT insert_classe_habilidade('Paladino', 'Vingador Sagrado', 20);

-- Remover função auxiliar
DROP FUNCTION insert_classe_habilidade(VARCHAR, VARCHAR, INTEGER, BOOLEAN);

-- ========================================
-- ÍNDICES PARA PERFORMANCE
-- ========================================

CREATE INDEX idx_classe_habilidades_classe_id ON classe_habilidades(classe_id);
CREATE INDEX idx_classe_habilidades_nivel ON classe_habilidades(nivel_obtencao);
CREATE INDEX idx_classe_poderes_classe_id ON classe_poderes(classe_id);
CREATE INDEX idx_classe_poderes_nivel ON classe_poderes(nivel_minimo);

-- ========================================
-- VERIFICAÇÕES FINAIS
-- ========================================

-- Verificar inserções
SELECT 'CLASSES INSERIDAS:' as resultado;
SELECT id, nome, atributo_principal, pv_base, pm_por_nivel FROM classes ORDER BY id;

SELECT 'HABILIDADES DE CLASSE INSERIDAS:' as resultado;
SELECT COUNT(*) as total_habilidades FROM habilidades_classe;

SELECT 'RELAÇÕES CLASSE-HABILIDADE INSERIDAS:' as resultado;
SELECT c.nome as classe, COUNT(ch.id) as total_habilidades
FROM classes c
LEFT JOIN classe_habilidades ch ON c.id = ch.classe_id
GROUP BY c.id, c.nome
ORDER BY c.nome;