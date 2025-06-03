-- ========================================
-- CORREÇÃO: PERÍCIAS QUE PRECISAM SER TREINADAS
-- ========================================

-- Adicionar coluna para indicar perícias que precisam ser treinadas para serem utilizáveis
ALTER TABLE pericias 
ADD COLUMN IF NOT EXISTS precisa_treino BOOLEAN DEFAULT FALSE;

-- Atualizar perícias que precisam ser treinadas para serem utilizáveis
-- Baseado no arquivo pericias.txt
UPDATE pericias SET precisa_treino = TRUE 
WHERE nome IN (
  'Adestramento',
  'Atuação', 
  'Conhecimento',
  'Guerra',
  'Jogatina',
  'Ladinagem',
  'Misticismo',
  'Nobreza',
  'Ofício',
  'Pilotagem',
  'Religião'
);

-- Todas as outras perícias podem ser usadas sem treinamento (com penalidade)
UPDATE pericias SET precisa_treino = FALSE 
WHERE nome NOT IN (
  'Adestramento',
  'Atuação', 
  'Conhecimento',
  'Guerra',
  'Jogatina',
  'Ladinagem',
  'Misticismo',
  'Nobreza',
  'Ofício',
  'Pilotagem',
  'Religião'
);

