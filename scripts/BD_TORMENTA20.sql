-- Criação das tabelas para o sistema Tormenta20

-- Tabela de usuários
CREATE TABLE usuarios_tormenta (
  id SERIAL PRIMARY KEY,
  username VARCHAR(50) NOT NULL UNIQUE,
  email VARCHAR(100) NOT NULL UNIQUE,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de raças
CREATE TABLE racas (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  descricao TEXT,
  bonus_atributos JSONB,
  habilidades_raciais TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de classes
CREATE TABLE classes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  descricao TEXT,
  atributo_principal VARCHAR(20),
  pontos_vida_base INTEGER,
  pontos_mana_base INTEGER,
  pericias TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de deuses
CREATE TABLE deuses (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL,
  descricao TEXT,
  dominio VARCHAR(50),
  simbolo VARCHAR(100),
  poderes_concedidos TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela principal de personagens
CREATE TABLE personagens (
  id SERIAL PRIMARY KEY,
  usuario_id INTEGER REFERENCES usuarios_tormenta(id) ON DELETE CASCADE,
  nome VARCHAR(100) NOT NULL,
  raca_id INTEGER REFERENCES racas(id),
  classe_id INTEGER REFERENCES classes(id),
  deus_id INTEGER REFERENCES deuses(id),
  
  -- Atributos básicos
  forca INTEGER DEFAULT 10,
  destreza INTEGER DEFAULT 10,
  constituicao INTEGER DEFAULT 10,
  inteligencia INTEGER DEFAULT 10,
  sabedoria INTEGER DEFAULT 10,
  carisma INTEGER DEFAULT 10,
  
  -- Características derivadas
  pontos_vida INTEGER DEFAULT 0,
  pontos_mana INTEGER DEFAULT 0,
  ca INTEGER DEFAULT 10, -- Classe de Armadura
  nivel INTEGER DEFAULT 1,
  experiencia INTEGER DEFAULT 0,
  
  -- Background e roleplay
  historia_pessoal TEXT,
  personalidade TEXT,
  objetivos TEXT,
  
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de equipamentos
CREATE TABLE equipamentos (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  tipo VARCHAR(50), -- arma, armadura, escudo, acessorio, etc
  categoria VARCHAR(50), -- leve, pesada, marcial, etc
  preco_tibares INTEGER,
  peso DECIMAL(5,2),
  descricao TEXT,
  bonus_ca INTEGER DEFAULT 0,
  dano VARCHAR(20), -- ex: 1d8, 2d6+1
  alcance INTEGER,
  propriedades TEXT[],
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de itens dos personagens
CREATE TABLE personagem_equipamentos (
  id SERIAL PRIMARY KEY,
  personagem_id INTEGER REFERENCES personagens(id) ON DELETE CASCADE,
  equipamento_id INTEGER REFERENCES equipamentos(id),
  quantidade INTEGER DEFAULT 1,
  equipado BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Raças básicas
INSERT INTO racas (nome, descricao, bonus_atributos, habilidades_raciais) VALUES
('Humano', 'Adaptáveis e ambiciosos, os humanos são a raça mais numerosa de Arton.', 
 '{"qualquer": 2}', 
 ARRAY['Versatilidade', 'Perícia Adicional']),
 
('Elfo', 'Seres longevos e mágicos, conectados com a natureza.', 
 '{"destreza": 2, "inteligencia": 1}', 
 ARRAY['Sentidos Élficos', 'Herança Élfica', 'Resistência a Encantos']),
 
('Anão', 'Mestres artesãos e guerreiros resistentes das montanhas.', 
 '{"constituicao": 2, "sabedoria": 1}', 
 ARRAY['Visão no Escuro', 'Resistência Anã', 'Proficiência com Machados']),
 
('Halfling', 'Pequenos e ágeis, conhecidos por sua sorte e bom humor.', 
 '{"destreza": 2, "carisma": 1}', 
 ARRAY['Sorte dos Pequenos', 'Bravura', 'Agilidade Halfling']);

-- Classes básicas
INSERT INTO classes (nome, descricao, atributo_principal, pontos_vida_base, pontos_mana_base, pericias) VALUES
('Guerreiro', 'Mestres em combate corpo a corpo e uso de armas.', 'Força', 20, 0, 
 ARRAY['Luta', 'Fortitude', 'Intimidação', 'Cavalgar']),
 
('Ladino', 'Especialistas em furtividade, agilidade e ataques precisos.', 'Destreza', 16, 0,
 ARRAY['Acrobacia', 'Furtividade', 'Ladinagem', 'Percepção']),
 
('Arcanista', 'Estudiosos da magia arcana e seus mistérios.', 'Inteligência', 12, 20,
 ARRAY['Conhecimento', 'Identificar Magia', 'Ofícios']),
 
('Clérico', 'Servos divinos que canalizam o poder dos deuses.', 'Sabedoria', 16, 16,
 ARRAY['Cura', 'Conhecimento', 'Vontade']),
 
('Bárbaro', 'Guerreiros selvagens que lutam com fúria primitiva.', 'Força', 24, 0,
 ARRAY['Atletismo', 'Intimidação', 'Sobrevivência', 'Percepção']),
 
('Bardo', 'Artistas mágicos que inspiram aliados com música e palavras.', 'Carisma', 14, 18,
 ARRAY['Atuação', 'Conhecimento', 'Diplomacia', 'Enganação']);

-- Deuses principais
INSERT INTO deuses (nome, descricao, dominio, simbolo, poderes_concedidos) VALUES
('Khalmyr', 'O deus da justiça, honra e proteção dos inocentes.', 'Justiça', 'Martelo de Guerra Dourado',
 ARRAY['Proteção Divina', 'Aura de Coragem', 'Golpe Sagrado']),
 
('Valkaria', 'A deusa da guerra, estratégia e coragem em batalha.', 'Guerra', 'Espada Flamejante',
 ARRAY['Fúria Sagrada', 'Bênção de Batalha', 'Liderança']),
 
('Lena', 'A deusa da magia, conhecimento e sabedoria.', 'Magia', 'Livro Aberto com Runa',
 ARRAY['Ampliar Magia', 'Conhecimento Arcano', 'Insight Mágico']),
 
('Marah', 'A deusa da paz, cura e compaixão.', 'Cura', 'Rosa Branca',
 ARRAY['Cura Divina', 'Bênção da Paz', 'Proteção dos Inocentes']),
 
('Nimb', 'O deus da sorte, viagens e aventuras.', 'Sorte', 'Moeda de Ouro',
 ARRAY['Golpe de Sorte', 'Passo Sombrio', 'Bênção do Viajante']),
 
('Wynna', 'A deusa da natureza, animais e druidas.', 'Natureza', 'Árvore Entrelaçada',
 ARRAY['Falar com Animais', 'Crescimento Vegetal', 'Forma Selvagem']);

-- Equipamentos básicos
INSERT INTO equipamentos (nome, tipo, categoria, preco_tibares, peso, descricao, bonus_ca, dano, alcance, propriedades) VALUES
-- Armas
('Espada Longa', 'arma', 'marcial', 200, 1.5, 'Uma espada versátil de lâmina longa.', 0, '1d8', 1, ARRAY['Versátil (1d10)']),
('Adaga', 'arma', 'simples', 20, 0.5, 'Uma lâmina curta e afiada.', 0, '1d4', 1, ARRAY['Arremesso', 'Sutil']),
('Arco Longo', 'arma', 'marcial', 150, 1.0, 'Um arco poderoso para longas distâncias.', 0, '1d8', 150, ARRAY['Duas Mãos', 'Munição']),
('Martelo de Guerra', 'arma', 'marcial', 150, 2.0, 'Um martelo pesado para combate.', 0, '1d8', 1, ARRAY['Versátil (1d10)']),

-- Armaduras
('Armadura de Couro', 'armadura', 'leve', 100, 5.0, 'Proteção básica de couro flexível.', 11, NULL, NULL, ARRAY['Leve']),
('Cota de Malha', 'armadura', 'média', 500, 20.0, 'Armadura de elos metálicos entrelaçados.', 13, NULL, NULL, ARRAY['Média']),
('Armadura de Placas', 'armadura', 'pesada', 1500, 30.0, 'Proteção máxima de placas de metal.', 18, NULL, NULL, ARRAY['Pesada']),

-- Escudos e acessórios
('Escudo', 'escudo', 'defesa', 100, 3.0, 'Proteção adicional para o braço.', 2, NULL, NULL, ARRAY['Escudo']),
('Mochila', 'acessorio', 'equipamento', 20, 2.0, 'Para carregar itens de aventura.', 0, NULL, NULL, ARRAY['Utilitário']),
('Corda (15m)', 'acessorio', 'equipamento', 20, 5.0, 'Corda resistente para escaladas.', 0, NULL, NULL, ARRAY['Utilitário']);
