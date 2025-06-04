-- ========================================
-- SISTEMA DE MAGIAS - TORMENTA20
-- Script para criar a estrutura das tabelas de magias
-- ========================================

-- ========================================
-- CRIAR TABELAS PRINCIPAIS
-- ========================================

-- Tabela principal de magias
CREATE TABLE IF NOT EXISTS magias (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL UNIQUE,
  tipo VARCHAR(20) NOT NULL, -- 'Arcana', 'Divina', 'Universal'
  escola VARCHAR(30) NOT NULL, -- 'Abjuração', 'Adivinhação', etc.
  circulo INTEGER NOT NULL CHECK (circulo BETWEEN 1 AND 5),
  custo_pm INTEGER NOT NULL DEFAULT 1,
  execucao VARCHAR(50) NOT NULL, -- 'Padrão', 'Movimento', 'Completa', etc.
  alcance VARCHAR(50), -- 'Toque', 'Curto', 'Médio', 'Longo', 'Pessoal'
  duracao VARCHAR(50), -- 'Instantânea', 'Cena', 'Sustentada', etc.
  descricao TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de aprimoramentos das magias
CREATE TABLE IF NOT EXISTS magia_aprimoramentos (
  id SERIAL PRIMARY KEY,
  magia_id INTEGER REFERENCES magias(id) ON DELETE CASCADE,
  nome VARCHAR(100) NOT NULL,
  tipo VARCHAR(50), -- 'Custo Reduzido', 'Efeito Alterado', etc.
  descricao TEXT NOT NULL,
  custo_pm_adicional VARCHAR(20), -- Pode ser '+1 PM', '+2 PM', 'Custo total: 0 PM', etc.
  pre_requisitos TEXT, -- 'Requer 3º círculo', etc.
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabela de relação classe-magia (quais classes podem lançar quais magias e em que nível)
CREATE TABLE IF NOT EXISTS classe_magias (
  id SERIAL PRIMARY KEY,
  classe_id INTEGER REFERENCES classes(id) ON DELETE CASCADE,
  magia_id INTEGER REFERENCES magias(id) ON DELETE CASCADE,
  nivel_minimo INTEGER NOT NULL, -- Nível mínimo da classe para lançar esta magia
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(classe_id, magia_id)
);

-- Tabela de magias conhecidas pelos personagens
CREATE TABLE IF NOT EXISTS personagem_magias (
  id SERIAL PRIMARY KEY,
  personagem_id INTEGER REFERENCES personagens(id) ON DELETE CASCADE,
  magia_id INTEGER REFERENCES magias(id),
  fonte VARCHAR(30) DEFAULT 'escolha', -- 'escolha', 'classe', 'item', 'racial'
  observacoes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(personagem_id, magia_id)
);

-- ========================================
-- ÍNDICES PARA PERFORMANCE
-- ========================================

CREATE INDEX IF NOT EXISTS idx_magias_tipo ON magias(tipo);
CREATE INDEX IF NOT EXISTS idx_magias_escola ON magias(escola);
CREATE INDEX IF NOT EXISTS idx_magias_circulo ON magias(circulo);
CREATE INDEX IF NOT EXISTS idx_magia_aprimoramentos_magia_id ON magia_aprimoramentos(magia_id);
CREATE INDEX IF NOT EXISTS idx_classe_magias_classe_id ON classe_magias(classe_id);
CREATE INDEX IF NOT EXISTS idx_classe_magias_magia_id ON classe_magias(magia_id);
CREATE INDEX IF NOT EXISTS idx_classe_magias_nivel ON classe_magias(nivel_minimo);
CREATE INDEX IF NOT EXISTS idx_personagem_magias_personagem_id ON personagem_magias(personagem_id);

-- ========================================
-- VIEWS ÚTEIS
-- ========================================

-- View para magias disponíveis por classe e nível
CREATE OR REPLACE VIEW v_classe_magias AS
SELECT 
  c.id as classe_id,
  c.nome as classe_nome,
  m.id as magia_id,
  m.nome as magia_nome,
  m.tipo as magia_tipo,
  m.escola,
  m.circulo,
  m.custo_pm,
  m.execucao,
  m.alcance,
  m.duracao,
  cm.nivel_minimo,
  m.descricao
FROM classe_magias cm
JOIN classes c ON cm.classe_id = c.id
JOIN magias m ON cm.magia_id = m.id
ORDER BY c.nome, m.circulo, m.nome;

-- View para magias de personagem com detalhes
CREATE OR REPLACE VIEW v_personagem_magias AS
SELECT 
  p.id as personagem_id,
  p.nome as personagem_nome,
  m.id as magia_id,
  m.nome as magia_nome,
  m.tipo as magia_tipo,
  m.escola,
  m.circulo,
  m.custo_pm,
  m.execucao,
  m.alcance,
  m.duracao,
  pm.fonte,
  pm.observacoes,
  m.descricao
FROM personagem_magias pm
JOIN personagens p ON pm.personagem_id = p.id
JOIN magias m ON pm.magia_id = m.id
ORDER BY p.nome, m.circulo, m.nome;

-- ========================================
-- FUNÇÕES UTILITÁRIAS
-- ========================================

-- Função para verificar se uma classe pode lançar uma magia
CREATE OR REPLACE FUNCTION pode_lancar_magia(
  p_classe_id INTEGER,
  p_magia_id INTEGER,
  p_nivel_personagem INTEGER
) RETURNS BOOLEAN AS $$
DECLARE
  v_nivel_minimo INTEGER;
BEGIN
  SELECT nivel_minimo INTO v_nivel_minimo
  FROM classe_magias
  WHERE classe_id = p_classe_id AND magia_id = p_magia_id;
  
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;
  
  RETURN p_nivel_personagem >= v_nivel_minimo;
END;
$$ LANGUAGE plpgsql;

-- Função para obter magias disponíveis para uma classe em determinado nível
CREATE OR REPLACE FUNCTION get_magias_disponiveis(
  p_classe_id INTEGER,
  p_nivel_personagem INTEGER,
  p_circulo INTEGER DEFAULT NULL
) RETURNS TABLE (
  magia_id INTEGER,
  nome VARCHAR,
  tipo VARCHAR,
  escola VARCHAR,
  circulo INTEGER,
  custo_pm INTEGER,
  execucao VARCHAR,
  nivel_minimo INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT 
    m.id,
    m.nome,
    m.tipo,
    m.escola,
    m.circulo,
    m.custo_pm,
    m.execucao,
    cm.nivel_minimo
  FROM classe_magias cm
  JOIN magias m ON cm.magia_id = m.id
  WHERE cm.classe_id = p_classe_id 
    AND cm.nivel_minimo <= p_nivel_personagem
    AND (p_circulo IS NULL OR m.circulo = p_circulo)
  ORDER BY m.circulo, m.nome;
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- CONFIGURAR ACESSO DAS CLASSES ÀS MAGIAS
-- ========================================

-- Função auxiliar para configurar acesso de classe às magias
CREATE OR REPLACE FUNCTION configurar_classe_magias(
  p_classe_nome VARCHAR,
  p_tipos_permitidos VARCHAR[],  -- Array de tipos: 'Arcana', 'Divina', 'Universal'
  p_niveis_por_circulo INTEGER[] -- Array com níveis: [1º_circulo, 2º_circulo, 3º_circulo, 4º_circulo, 5º_circulo]
) RETURNS INTEGER AS $$
DECLARE
  v_classe_id INTEGER;
  v_magia RECORD;
  v_nivel_minimo INTEGER;
  v_count INTEGER := 0;
BEGIN
  -- Buscar ID da classe
  SELECT id INTO v_classe_id FROM classes WHERE nome = p_classe_nome;
  
  IF NOT FOUND THEN
    RAISE EXCEPTION 'Classe % não encontrada', p_classe_nome;
  END IF;
  
  -- Inserir magias para cada círculo permitido
  FOR v_magia IN 
    SELECT id, tipo, circulo 
    FROM magias 
    WHERE tipo = ANY(p_tipos_permitidos)
      AND circulo <= array_length(p_niveis_por_circulo, 1)
  LOOP
    -- Determinar nível mínimo baseado no círculo
    v_nivel_minimo := p_niveis_por_circulo[v_magia.circulo];
    
    -- Inserir relação classe-magia
    INSERT INTO classe_magias (classe_id, magia_id, nivel_minimo)
    VALUES (v_classe_id, v_magia.id, v_nivel_minimo)
    ON CONFLICT (classe_id, magia_id) DO NOTHING;
    
    v_count := v_count + 1;
  END LOOP;
  
  RETURN v_count;
END;
$$ LANGUAGE plpgsql;

-- ========================================
-- VERIFICAÇÃO INICIAL
-- ========================================

SELECT 'ESTRUTURA DE MAGIAS CRIADA COM SUCESSO!' as resultado;

-- Verificar se as tabelas foram criadas
SELECT 
  'Tabelas criadas:' as info,
  COUNT(*) as total_tabelas
FROM information_schema.tables 
WHERE table_schema = 'public' 
  AND table_name IN ('magias', 'magia_aprimoramentos', 'classe_magias', 'personagem_magias');

-- Verificar se as funções foram criadas
SELECT 
  'Funções criadas:' as info,
  COUNT(*) as total_funcoes
FROM information_schema.routines 
WHERE routine_schema = 'public' 
  AND routine_name IN ('pode_lancar_magia', 'get_magias_disponiveis', 'configurar_classe_magias');