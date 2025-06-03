-- Atualizar view para incluir informação sobre treino necessário
CREATE OR REPLACE VIEW v_personagem_pericias AS
SELECT 
  pp.personagem_id,
  pp.pericia_id,
  p.nome as pericia_nome,
  p.atributo_chave,
  p.categoria,
  p.precisa_treino,
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
  END as bonus_treinamento,
  -- Verificar se a perícia pode ser usada
  CASE 
    WHEN p.precisa_treino = TRUE AND pp.treinado = FALSE THEN FALSE
    ELSE TRUE
  END as pode_usar
FROM personagem_pericias pp
JOIN pericias p ON pp.pericia_id = p.id
JOIN personagens per ON pp.personagem_id = per.id;

-- Função para verificar se personagem pode usar uma perícia
CREATE OR REPLACE FUNCTION pode_usar_pericia(
  p_personagem_id INTEGER,
  p_pericia_id INTEGER
) RETURNS BOOLEAN AS $$
DECLARE
  v_pericia RECORD;
  v_personagem_pericia RECORD;
BEGIN
  -- Buscar informações da perícia
  SELECT * INTO v_pericia FROM pericias WHERE id = p_pericia_id;
  
  IF NOT FOUND THEN
    RETURN FALSE;
  END IF;
  
  -- Se a perícia não precisa de treino, pode usar sempre
  IF v_pericia.precisa_treino = FALSE THEN
    RETURN TRUE;
  END IF;
  
  -- Se precisa de treino, verificar se personagem tem treinamento
  SELECT * INTO v_personagem_pericia 
  FROM personagem_pericias 
  WHERE personagem_id = p_personagem_id AND pericia_id = p_pericia_id;
  
  IF FOUND AND v_personagem_pericia.treinado = TRUE THEN
    RETURN TRUE;
  ELSE
    RETURN FALSE;
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Verificar as atualizações
SELECT 'PERÍCIAS QUE PRECISAM DE TREINO:' as resultado;
SELECT nome, categoria, atributo_chave, precisa_treino
FROM pericias 
WHERE precisa_treino = TRUE
ORDER BY categoria, nome;

SELECT 'PERÍCIAS QUE NÃO PRECISAM DE TREINO:' as resultado;
SELECT nome, categoria, atributo_chave, precisa_treino
FROM pericias 
WHERE precisa_treino = FALSE
ORDER BY categoria, nome;