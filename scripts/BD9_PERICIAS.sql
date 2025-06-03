-- ========================================
-- SISTEMA DE PERÍCIAS - TORMENTA20
-- Baseado no arquivo pericias.txt
-- ========================================

-- ========================================
-- CRIAR TABELAS
-- ========================================

-- Tabela principal de perícias
CREATE TABLE IF NOT EXISTS pericias (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(50) NOT NULL UNIQUE,
  atributo_chave VARCHAR(3) NOT NULL, -- 'for', 'des', 'con', 'int', 'sab', 'car'
  descricao TEXT,
  categoria VARCHAR(30) DEFAULT 'geral', -- 'geral', 'social', 'conhecimento', 'física', etc.
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de perícias de personagem
CREATE TABLE IF NOT EXISTS personagem_pericias (
  id SERIAL PRIMARY KEY,
  personagem_id INTEGER REFERENCES personagens(id) ON DELETE CASCADE,
  pericia_id INTEGER REFERENCES pericias(id),
  treinado BOOLEAN DEFAULT FALSE,
  especialista BOOLEAN DEFAULT FALSE, -- Para ladinos
  origem VARCHAR(20) DEFAULT 'classe', -- 'classe', 'raca', 'escolha', 'inteligencia'
  observacoes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(personagem_id, pericia_id)
);

-- Tabela de perícias de classe (automáticas e opcionais)
CREATE TABLE IF NOT EXISTS classe_pericias (
  id SERIAL PRIMARY KEY,
  classe_id INTEGER REFERENCES classes(id) ON DELETE CASCADE,
  pericia_id INTEGER REFERENCES pericias(id),
  obrigatoria BOOLEAN DEFAULT FALSE, -- Se é automática da classe
  opcional BOOLEAN DEFAULT TRUE, -- Se pode ser escolhida como opcional
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(classe_id, pericia_id)
);

-- ========================================
-- INSERIR PERÍCIAS PRINCIPAIS
-- ========================================

INSERT INTO pericias (nome, atributo_chave, categoria, descricao) VALUES
-- Perícias Físicas
('Acrobacia', 'des', 'física', 'Equilibrio, escapar de amarras, manobras acrobáticas.'),
('Atletismo', 'for', 'física', 'Corrida, salto, escalada, natação, força bruta.'),
('Cavalgar', 'des', 'física', 'Montar e controlar animais, combate montado.'),
('Furtividade', 'des', 'física', 'Mover-se silenciosamente, esconder-se, não ser detectado.'),
('Iniciativa', 'des', 'física', 'Velocidade de reação, rapidez para agir primeiro.'),
('Ladinagem', 'des', 'física', 'Abrir fechaduras, desabilitar armadilhas, furtar objetos.'),
('Luta', 'for', 'combate', 'Combate corpo a corpo, manobras de combate, agarrar.'),
('Pilotagem', 'des', 'física', 'Dirigir veículos, navegar embarcações, pilotar.'),
('Pontaria', 'des', 'combate', 'Ataques à distância, precisão com projéteis.'),
('Reflexos', 'des', 'resistência', 'Reações rápidas, esquivar de perigos.'),

-- Perícias Mentais/Conhecimento
('Conhecimento', 'int', 'conhecimento', 'Informações gerais, história, geografia, natureza.'),
('Guerra', 'int', 'conhecimento', 'Táticas militares, estratégia, conhecimento bélico.'),
('Investigação', 'int', 'conhecimento', 'Buscar pistas, deduzir, resolver mistérios.'),
('Misticismo', 'int', 'conhecimento', 'Conhecimento sobre magia, criaturas místicas, planos.'),
('Nobreza', 'int', 'conhecimento', 'Etiqueta, heráldica, política, conhecimento aristocrático.'),
('Ofício', 'int', 'conhecimento', 'Habilidades artesanais, profissões, criar itens.'),
('Religião', 'sab', 'conhecimento', 'Conhecimento sobre deuses, rituais, filosofia divina.'),

-- Perícias Sociais
('Adestramento', 'car', 'social', 'Treinar animais, comandar companheiros animais.'),
('Atuação', 'car', 'social', 'Performance artística, disfarce, entretenimento.'),
('Diplomacia', 'car', 'social', 'Negociação, persuasão, melhorar atitudes.'),
('Enganação', 'car', 'social', 'Mentir, blefar, convencer com falsidades.'),
('Intimidação', 'car', 'social', 'Ameaçar, causar medo, coagir.'),
('Jogatina', 'car', 'social', 'Jogos de azar, apostas, burlar em jogos.'),

-- Perícias de Percepção/Intuição
('Cura', 'sab', 'medicina', 'Primeiros socorros, diagnóstico, medicina.'),
('Intuição', 'sab', 'percepção', 'Ler intenções, detectar mentiras, pressentimentos.'),
('Percepção', 'sab', 'percepção', 'Observar detalhes, notar perigos, encontrar objetos.'),
('Sobrevivência', 'sab', 'percepção', 'Rastreamento, orientação, vida selvagem.'),

-- Perícias de Resistência
('Fortitude', 'con', 'resistência', 'Resistir a doenças, venenos, condições adversas.'),
('Vontade', 'sab', 'resistência', 'Resistir a efeitos mentais, manter concentração.');

-- ========================================
-- INSERIR PERÍCIAS DE CLASSE
-- ========================================

-- Função auxiliar para inserir perícias de classe
CREATE OR REPLACE FUNCTION insert_classe_pericia(
  p_classe_nome VARCHAR,
  p_pericia_nome VARCHAR,
  p_obrigatoria BOOLEAN DEFAULT FALSE,
  p_opcional BOOLEAN DEFAULT TRUE
) RETURNS VOID AS $$
BEGIN
  INSERT INTO classe_pericias (classe_id, pericia_id, obrigatoria, opcional)
  SELECT c.id, p.id, p_obrigatoria, p_opcional
  FROM classes c, pericias p
  WHERE c.nome = p_classe_nome AND p.nome = p_pericia_nome
  ON CONFLICT (classe_id, pericia_id) DO NOTHING;
END;
$$ LANGUAGE plpgsql;

-- ARCANISTA: Misticismo e Vontade obrigatórias + 2 opcionais
SELECT insert_classe_pericia('Arcanista', 'Misticismo', true, true);
SELECT insert_classe_pericia('Arcanista', 'Vontade', true, true);
SELECT insert_classe_pericia('Arcanista', 'Conhecimento', false, true);
SELECT insert_classe_pericia('Arcanista', 'Diplomacia', false, true);
SELECT insert_classe_pericia('Arcanista', 'Enganação', false, true);
SELECT insert_classe_pericia('Arcanista', 'Guerra', false, true);
SELECT insert_classe_pericia('Arcanista', 'Iniciativa', false, true);
SELECT insert_classe_pericia('Arcanista', 'Intimidação', false, true);
SELECT insert_classe_pericia('Arcanista', 'Intuição', false, true);
SELECT insert_classe_pericia('Arcanista', 'Investigação', false, true);
SELECT insert_classe_pericia('Arcanista', 'Nobreza', false, true);
SELECT insert_classe_pericia('Arcanista', 'Ofício', false, true);
SELECT insert_classe_pericia('Arcanista', 'Percepção', false, true);

-- BÁRBARO: Fortitude e Luta obrigatórias + 4 opcionais
SELECT insert_classe_pericia('Bárbaro', 'Fortitude', true, true);
SELECT insert_classe_pericia('Bárbaro', 'Luta', true, true);
SELECT insert_classe_pericia('Bárbaro', 'Adestramento', false, true);
SELECT insert_classe_pericia('Bárbaro', 'Atletismo', false, true);
SELECT insert_classe_pericia('Bárbaro', 'Cavalgar', false, true);
SELECT insert_classe_pericia('Bárbaro', 'Iniciativa', false, true);
SELECT insert_classe_pericia('Bárbaro', 'Intimidação', false, true);
SELECT insert_classe_pericia('Bárbaro', 'Ofício', false, true);
SELECT insert_classe_pericia('Bárbaro', 'Percepção', false, true);
SELECT insert_classe_pericia('Bárbaro', 'Pontaria', false, true);
SELECT insert_classe_pericia('Bárbaro', 'Sobrevivência', false, true);
SELECT insert_classe_pericia('Bárbaro', 'Vontade', false, true);

-- BARDO: Atuação e Reflexos obrigatórias + 6 opcionais
SELECT insert_classe_pericia('Bardo', 'Atuação', true, true);
SELECT insert_classe_pericia('Bardo', 'Reflexos', true, true);
SELECT insert_classe_pericia('Bardo', 'Acrobacia', false, true);
SELECT insert_classe_pericia('Bardo', 'Cavalgar', false, true);
SELECT insert_classe_pericia('Bardo', 'Conhecimento', false, true);
SELECT insert_classe_pericia('Bardo', 'Diplomacia', false, true);
SELECT insert_classe_pericia('Bardo', 'Enganação', false, true);
SELECT insert_classe_pericia('Bardo', 'Furtividade', false, true);
SELECT insert_classe_pericia('Bardo', 'Iniciativa', false, true);
SELECT insert_classe_pericia('Bardo', 'Intuição', false, true);
SELECT insert_classe_pericia('Bardo', 'Investigação', false, true);
SELECT insert_classe_pericia('Bardo', 'Jogatina', false, true);
SELECT insert_classe_pericia('Bardo', 'Ladinagem', false, true);
SELECT insert_classe_pericia('Bardo', 'Luta', false, true);
SELECT insert_classe_pericia('Bardo', 'Misticismo', false, true);
SELECT insert_classe_pericia('Bardo', 'Nobreza', false, true);
SELECT insert_classe_pericia('Bardo', 'Percepção', false, true);
SELECT insert_classe_pericia('Bardo', 'Pontaria', false, true);
SELECT insert_classe_pericia('Bardo', 'Vontade', false, true);

-- BUCANEIRO: Luta/Pontaria + Reflexos + 4 opcionais
SELECT insert_classe_pericia('Bucaneiro', 'Luta', false, true);
SELECT insert_classe_pericia('Bucaneiro', 'Pontaria', false, true);
SELECT insert_classe_pericia('Bucaneiro', 'Reflexos', true, true);
SELECT insert_classe_pericia('Bucaneiro', 'Acrobacia', false, true);
SELECT insert_classe_pericia('Bucaneiro', 'Atletismo', false, true);
SELECT insert_classe_pericia('Bucaneiro', 'Atuação', false, true);
SELECT insert_classe_pericia('Bucaneiro', 'Enganação', false, true);
SELECT insert_classe_pericia('Bucaneiro', 'Fortitude', false, true);
SELECT insert_classe_pericia('Bucaneiro', 'Furtividade', false, true);
SELECT insert_classe_pericia('Bucaneiro', 'Iniciativa', false, true);
SELECT insert_classe_pericia('Bucaneiro', 'Intimidação', false, true);
SELECT insert_classe_pericia('Bucaneiro', 'Jogatina', false, true);
SELECT insert_classe_pericia('Bucaneiro', 'Ofício', false, true);
SELECT insert_classe_pericia('Bucaneiro', 'Percepção', false, true);
SELECT insert_classe_pericia('Bucaneiro', 'Pilotagem', false, true);

-- CAÇADOR: Luta/Pontaria + Sobrevivência + 4/6 opcionais
SELECT insert_classe_pericia('Caçador', 'Luta', false, true);
SELECT insert_classe_pericia('Caçador', 'Pontaria', false, true);
SELECT insert_classe_pericia('Caçador', 'Sobrevivência', true, true);
SELECT insert_classe_pericia('Caçador', 'Adestramento', false, true);
SELECT insert_classe_pericia('Caçador', 'Atletismo', false, true);
SELECT insert_classe_pericia('Caçador', 'Cavalgar', false, true);
SELECT insert_classe_pericia('Caçador', 'Cura', false, true);
SELECT insert_classe_pericia('Caçador', 'Fortitude', false, true);
SELECT insert_classe_pericia('Caçador', 'Furtividade', false, true);
SELECT insert_classe_pericia('Caçador', 'Iniciativa', false, true);
SELECT insert_classe_pericia('Caçador', 'Investigação', false, true);
SELECT insert_classe_pericia('Caçador', 'Ofício', false, true);
SELECT insert_classe_pericia('Caçador', 'Percepção', false, true);
SELECT insert_classe_pericia('Caçador', 'Reflexos', false, true);

-- CAVALEIRO: Fortitude e Luta obrigatórias + 2 opcionais
SELECT insert_classe_pericia('Cavaleiro', 'Fortitude', true, true);
SELECT insert_classe_pericia('Cavaleiro', 'Luta', true, true);
SELECT insert_classe_pericia('Cavaleiro', 'Adestramento', false, true);
SELECT insert_classe_pericia('Cavaleiro', 'Atletismo', false, true);
SELECT insert_classe_pericia('Cavaleiro', 'Cavalgar', false, true);
SELECT insert_classe_pericia('Cavaleiro', 'Diplomacia', false, true);
SELECT insert_classe_pericia('Cavaleiro', 'Guerra', false, true);
SELECT insert_classe_pericia('Cavaleiro', 'Iniciativa', false, true);
SELECT insert_classe_pericia('Cavaleiro', 'Intimidação', false, true);
SELECT insert_classe_pericia('Cavaleiro', 'Nobreza', false, true);
SELECT insert_classe_pericia('Cavaleiro', 'Percepção', false, true);
SELECT insert_classe_pericia('Cavaleiro', 'Vontade', false, true);

-- CLÉRIGO: Religião e Vontade obrigatórias + 2 opcionais
SELECT insert_classe_pericia('Clérigo', 'Religião', true, true);
SELECT insert_classe_pericia('Clérigo', 'Vontade', true, true);
SELECT insert_classe_pericia('Clérigo', 'Conhecimento', false, true);
SELECT insert_classe_pericia('Clérigo', 'Cura', false, true);
SELECT insert_classe_pericia('Clérigo', 'Diplomacia', false, true);
SELECT insert_classe_pericia('Clérigo', 'Fortitude', false, true);
SELECT insert_classe_pericia('Clérigo', 'Iniciativa', false, true);
SELECT insert_classe_pericia('Clérigo', 'Intuição', false, true);
SELECT insert_classe_pericia('Clérigo', 'Luta', false, true);
SELECT insert_classe_pericia('Clérigo', 'Misticismo', false, true);
SELECT insert_classe_pericia('Clérigo', 'Nobreza', false, true);
SELECT insert_classe_pericia('Clérigo', 'Ofício', false, true);
SELECT insert_classe_pericia('Clérigo', 'Percepção', false, true);

-- DRUIDA: Sobrevivência e Vontade obrigatórias + 4 opcionais
SELECT insert_classe_pericia('Druida', 'Sobrevivência', true, true);
SELECT insert_classe_pericia('Druida', 'Vontade', true, true);
SELECT insert_classe_pericia('Druida', 'Adestramento', false, true);
SELECT insert_classe_pericia('Druida', 'Atletismo', false, true);
SELECT insert_classe_pericia('Druida', 'Cavalgar', false, true);
SELECT insert_classe_pericia('Druida', 'Conhecimento', false, true);
SELECT insert_classe_pericia('Druida', 'Cura', false, true);
SELECT insert_classe_pericia('Druida', 'Fortitude', false, true);
SELECT insert_classe_pericia('Druida', 'Iniciativa', false, true);
SELECT insert_classe_pericia('Druida', 'Intuição', false, true);
SELECT insert_classe_pericia('Druida', 'Luta', false, true);
SELECT insert_classe_pericia('Druida', 'Misticismo', false, true);
SELECT insert_classe_pericia('Druida', 'Ofício', false, true);
SELECT insert_classe_pericia('Druida', 'Percepção', false, true);
SELECT insert_classe_pericia('Druida', 'Religião', false, true);

-- GUERREIRO: Luta/Pontaria + Fortitude + 2 opcionais
SELECT insert_classe_pericia('Guerreiro', 'Luta', false, true);
SELECT insert_classe_pericia('Guerreiro', 'Pontaria', false, true);
SELECT insert_classe_pericia('Guerreiro', 'Fortitude', true, true);
SELECT insert_classe_pericia('Guerreiro', 'Adestramento', false, true);
SELECT insert_classe_pericia('Guerreiro', 'Atletismo', false, true);
SELECT insert_classe_pericia('Guerreiro', 'Cavalgar', false, true);
SELECT insert_classe_pericia('Guerreiro', 'Guerra', false, true);
SELECT insert_classe_pericia('Guerreiro', 'Iniciativa', false, true);
SELECT insert_classe_pericia('Guerreiro', 'Intimidação', false, true);
SELECT insert_classe_pericia('Guerreiro', 'Ofício', false, true);
SELECT insert_classe_pericia('Guerreiro', 'Percepção', false, true);
SELECT insert_classe_pericia('Guerreiro', 'Reflexos', false, true);

-- INVENTOR: Ofício e Vontade obrigatórias + 4 opcionais
SELECT insert_classe_pericia('Inventor', 'Ofício', true, true);
SELECT insert_classe_pericia('Inventor', 'Vontade', true, true);
SELECT insert_classe_pericia('Inventor', 'Conhecimento', false, true);
SELECT insert_classe_pericia('Inventor', 'Cura', false, true);
SELECT insert_classe_pericia('Inventor', 'Diplomacia', false, true);
SELECT insert_classe_pericia('Inventor', 'Fortitude', false, true);
SELECT insert_classe_pericia('Inventor', 'Iniciativa', false, true);
SELECT insert_classe_pericia('Inventor', 'Investigação', false, true);
SELECT insert_classe_pericia('Inventor', 'Luta', false, true);
SELECT insert_classe_pericia('Inventor', 'Misticismo', false, true);
SELECT insert_classe_pericia('Inventor', 'Percepção', false, true);
SELECT insert_classe_pericia('Inventor', 'Pilotagem', false, true);
SELECT insert_classe_pericia('Inventor', 'Pontaria', false, true);

-- LADINO: Ladinagem e Reflexos obrigatórias + 8 opcionais
SELECT insert_classe_pericia('Ladino', 'Ladinagem', true, true);
SELECT insert_classe_pericia('Ladino', 'Reflexos', true, true);
SELECT insert_classe_pericia('Ladino', 'Acrobacia', false, true);
SELECT insert_classe_pericia('Ladino', 'Atletismo', false, true);
SELECT insert_classe_pericia('Ladino', 'Atuação', false, true);
SELECT insert_classe_pericia('Ladino', 'Cavalgar', false, true);
SELECT insert_classe_pericia('Ladino', 'Conhecimento', false, true);
SELECT insert_classe_pericia('Ladino', 'Diplomacia', false, true);
SELECT insert_classe_pericia('Ladino', 'Enganação', false, true);
SELECT insert_classe_pericia('Ladino', 'Furtividade', false, true);
SELECT insert_classe_pericia('Ladino', 'Iniciativa', false, true);
SELECT insert_classe_pericia('Ladino', 'Intimidação', false, true);
SELECT insert_classe_pericia('Ladino', 'Intuição', false, true);
SELECT insert_classe_pericia('Ladino', 'Investigação', false, true);
SELECT insert_classe_pericia('Ladino', 'Jogatina', false, true);
SELECT insert_classe_pericia('Ladino', 'Luta', false, true);
SELECT insert_classe_pericia('Ladino', 'Ofício', false, true);
SELECT insert_classe_pericia('Ladino', 'Percepção', false, true);
SELECT insert_classe_pericia('Ladino', 'Pilotagem', false, true);
SELECT insert_classe_pericia('Ladino', 'Pontaria', false, true);

-- LUTADOR: Fortitude e Luta obrigatórias + 4 opcionais
SELECT insert_classe_pericia('Lutador', 'Fortitude', true, true);
SELECT insert_classe_pericia('Lutador', 'Luta', true, true);
SELECT insert_classe_pericia('Lutador', 'Acrobacia', false, true);
SELECT insert_classe_pericia('Lutador', 'Adestramento', false, true);
SELECT insert_classe_pericia('Lutador', 'Atletismo', false, true);
SELECT insert_classe_pericia('Lutador', 'Enganação', false, true);
SELECT insert_classe_pericia('Lutador', 'Furtividade', false, true);
SELECT insert_classe_pericia('Lutador', 'Iniciativa', false, true);
SELECT insert_classe_pericia('Lutador', 'Intimidação', false, true);
SELECT insert_classe_pericia('Lutador', 'Ofício', false, true);
SELECT insert_classe_pericia('Lutador', 'Percepção', false, true);
SELECT insert_classe_pericia('Lutador', 'Pontaria', false, true);
SELECT insert_classe_pericia('Lutador', 'Reflexos', false, true);

-- NOBRE: Diplomacia/Intimidação + Vontade + 4 opcionais
SELECT insert_classe_pericia('Nobre', 'Diplomacia', false, true);
SELECT insert_classe_pericia('Nobre', 'Intimidação', false, true);
SELECT insert_classe_pericia('Nobre', 'Vontade', true, true);
SELECT insert_classe_pericia('Nobre', 'Adestramento', false, true);
SELECT insert_classe_pericia('Nobre', 'Atuação', false, true);
SELECT insert_classe_pericia('Nobre', 'Cavalgar', false, true);
SELECT insert_classe_pericia('Nobre', 'Conhecimento', false, true);
SELECT insert_classe_pericia('Nobre', 'Enganação', false, true);
SELECT insert_classe_pericia('Nobre', 'Fortitude', false, true);
SELECT insert_classe_pericia('Nobre', 'Guerra', false, true);
SELECT insert_classe_pericia('Nobre', 'Iniciativa', false, true);
SELECT insert_classe_pericia('Nobre', 'Intuição', false, true);
SELECT insert_classe_pericia('Nobre', 'Investigação', false, true);
SELECT insert_classe_pericia('Nobre', 'Jogatina', false, true);
SELECT insert_classe_pericia('Nobre', 'Luta', false, true);
SELECT insert_classe_pericia('Nobre', 'Nobreza', false, true);
SELECT insert_classe_pericia('Nobre', 'Ofício', false, true);
SELECT insert_classe_pericia('Nobre', 'Percepção', false, true);
SELECT insert_classe_pericia('Nobre', 'Pontaria', false, true);

-- PALADINO: Luta e Vontade obrigatórias + 2 opcionais
SELECT insert_classe_pericia('Paladino', 'Luta', true, true);
SELECT insert_classe_pericia('Paladino', 'Vontade', true, true);
SELECT insert_classe_pericia('Paladino', 'Adestramento', false, true);
SELECT insert_classe_pericia('Paladino', 'Atletismo', false, true);
SELECT insert_classe_pericia('Paladino', 'Cavalgar', false, true);
SELECT insert_classe_pericia('Paladino', 'Cura', false, true);
SELECT insert_classe_pericia('Paladino', 'Diplomacia', false, true);
SELECT insert_classe_pericia('Paladino', 'Fortitude', false, true);
SELECT insert_classe_pericia('Paladino', 'Guerra', false, true);
SELECT insert_classe_pericia('Paladino', 'Iniciativa', false, true);
SELECT insert_classe_pericia('Paladino', 'Intuição', false, true);
SELECT insert_classe_pericia('Paladino', 'Nobreza', false, true);
SELECT insert_classe_pericia('Paladino', 'Percepção', false, true);
SELECT insert_classe_pericia('Paladino', 'Religião', false, true);

-- Remover função auxiliar
DROP FUNCTION insert_classe_pericia(VARCHAR, VARCHAR, BOOLEAN, BOOLEAN);

-- ========================================
-- INDICES PARA PERFORMANCE
-- ========================================

CREATE INDEX IF NOT EXISTS idx_personagem_pericias_personagem_id ON personagem_pericias(personagem_id);
CREATE INDEX IF NOT EXISTS idx_personagem_pericias_pericia_id ON personagem_pericias(pericia_id);
CREATE INDEX IF NOT EXISTS idx_personagem_pericias_treinado ON personagem_pericias(treinado);
CREATE INDEX IF NOT EXISTS idx_classe_pericias_classe_id ON classe_pericias(classe_id);
CREATE INDEX IF NOT EXISTS idx_classe_pericias_obrigatoria ON classe_pericias(obrigatoria);
CREATE INDEX IF NOT EXISTS idx_pericias_categoria ON pericias(categoria);
CREATE INDEX IF NOT EXISTS idx_pericias_atributo_chave ON pericias(atributo_chave);

-- ========================================
-- VIEWS ÚTEIS
-- ========================================

-- View para facilitar consultas de perícias de personagem
CREATE OR REPLACE VIEW v_personagem_pericias AS
SELECT 
  pp.personagem_id,
  pp.pericia_id,
  p.nome as pericia_nome,
  p.atributo_chave,
  p.categoria,
  pp.treinado,
  pp.especialista,
  pp.origem,
  pp.observacoes,
  per.nome as personagem_nome,
  per.nivel,
  -- Calcular bônus baseado no nível e atributo
  CASE p.atributo_chave
    WHEN 'for' THEN (per.forca - 10) / 2
    WHEN 'des' THEN (per.destreza - 10) / 2
    WHEN 'con' THEN (per.constituicao - 10) / 2
    WHEN 'int' THEN (per.inteligencia - 10) / 2
    WHEN 'sab' THEN (per.sabedoria - 10) / 2
    WHEN 'car' THEN (per.carisma - 10) / 2
    ELSE 0
  END as bonus_atributo,
  -- Bonus de nível (metade do nível)
  per.nivel / 2 as bonus_nivel,
  -- Bonus de treinamento
  CASE 
    WHEN NOT pp.treinado THEN 0
    WHEN per.nivel BETWEEN 1 AND 6 THEN 2
    WHEN per.nivel BETWEEN 7 AND 14 THEN 4
    WHEN per.nivel >= 15 THEN 6
    ELSE 0
  END as bonus_treinamento
FROM personagem_pericias pp
JOIN pericias p ON pp.pericia_id = p.id
JOIN personagens per ON pp.personagem_id = per.id;

-- View para perícias disponíveis por classe
CREATE OR REPLACE VIEW v_classe_pericias AS
SELECT 
  c.id as classe_id,
  c.nome as classe_nome,
  p.id as pericia_id,
  p.nome as pericia_nome,
  p.atributo_chave,
  p.categoria,
  cp.obrigatoria,
  cp.opcional
FROM classe_pericias cp
JOIN classes c ON cp.classe_id = c.id
JOIN pericias p ON cp.pericia_id = p.id
ORDER BY c.nome, cp.obrigatoria DESC, p.nome;

-- ========================================
-- FUNÇÕES UTILITÁRIAS
-- ========================================

-- Função para calcular bônus total de perícia
CREATE OR REPLACE FUNCTION calcular_bonus_pericia(
  p_personagem_id INTEGER,
  p_pericia_id INTEGER
) RETURNS INTEGER AS $$
DECLARE
  v_bonus INTEGER := 0;
  v_pericia RECORD;
BEGIN
  SELECT * INTO v_pericia FROM v_personagem_pericias 
  WHERE personagem_id = p_personagem_id AND pericia_id = p_pericia_id;
  
  IF FOUND THEN
    v_bonus := v_pericia.bonus_nivel + v_pericia.bonus_atributo + v_pericia.bonus_treinamento;
    
    -- Bonus adicional para especialista (Ladino)
    IF v_pericia.especialista THEN
      v_bonus := v_bonus + v_pericia.bonus_treinamento;
    END IF;
  END IF;
  
  RETURN v_bonus;
END;
$$ LANGUAGE plpgsql;

-- Função para aplicar perícias automáticas de classe
CREATE OR REPLACE FUNCTION aplicar_pericias_classe(
  p_personagem_id INTEGER,
  p_classe_id INTEGER
) RETURNS INTEGER AS $$
DECLARE
  v_count INTEGER := 0;
  v_pericia RECORD;
BEGIN
  -- Aplicar perícias obrigatórias da classe
  FOR v_pericia IN 
    SELECT cp.pericia_id 
    FROM classe_pericias cp 
    WHERE cp.classe_id = p_classe_id AND cp.obrigatoria = true
  LOOP
    INSERT INTO personagem_pericias (personagem_id, pericia_id, treinado, origem)
    VALUES (p_personagem_id, v_pericia.pericia_id, true, 'classe')
    ON CONFLICT (personagem_id, pericia_id) 
    DO UPDATE SET treinado = true, origem = 'classe';
    
    v_count := v_count + 1;
  END LOOP;
  
  RETURN v_count;
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- VERIFICAÇÕES FINAIS
-- ========================================

SELECT 'PERÍCIAS INSERIDAS:' as resultado;
SELECT COUNT(*) as total_pericias FROM pericias;

SELECT 'PERÍCIAS POR CATEGORIA:' as resultado;
SELECT categoria, COUNT(*) as quantidade 
FROM pericias 
GROUP BY categoria 
ORDER BY categoria;

SELECT 'PERÍCIAS POR ATRIBUTO:' as resultado;
SELECT 
  CASE atributo_chave
    WHEN 'for' THEN 'Força'
    WHEN 'des' THEN 'Destreza'
    WHEN 'con' THEN 'Constituição'
    WHEN 'int' THEN 'Inteligência'
    WHEN 'sab' THEN 'Sabedoria'
    WHEN 'car' THEN 'Carisma'
    ELSE atributo_chave
  END as atributo,
  COUNT(*) as quantidade
FROM pericias 
GROUP BY atributo_chave 
ORDER BY quantidade DESC;

SELECT 'CLASSES COM PERÍCIAS CONFIGURADAS:' as resultado;
SELECT c.nome as classe, COUNT(cp.id) as total_pericias,
       COUNT(CASE WHEN cp.obrigatoria THEN 1 END) as obrigatorias,
       COUNT(CASE WHEN cp.opcional THEN 1 END) as opcionais
FROM classes c
LEFT JOIN classe_pericias cp ON c.id = cp.classe_id
GROUP BY c.id, c.nome
ORDER BY c.nome;