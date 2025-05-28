-- Script para corrigir os tipos de poderes no banco de dados
-- O problema é que os poderes estão como tipo 'geral' com grupos diferentes
-- mas os filtros buscam por tipo específico

-- Atualizar poderes de combate
UPDATE poderes 
SET tipo = 'combate' 
WHERE grupo = 'combate' AND tipo = 'geral';

-- Atualizar poderes de destino  
UPDATE poderes 
SET tipo = 'destino' 
WHERE grupo = 'destino' AND tipo = 'geral';

-- Atualizar poderes de magia
UPDATE poderes 
SET tipo = 'magia' 
WHERE grupo = 'magia' AND tipo = 'geral';

-- Verificar as mudanças
SELECT tipo, COUNT(*) as quantidade 
FROM poderes 
GROUP BY tipo 
ORDER BY tipo;

-- Mostrar alguns exemplos de cada tipo
SELECT tipo, nome, grupo 
FROM poderes 
WHERE tipo IN ('combate', 'destino', 'magia') 
ORDER BY tipo, nome 
LIMIT 10;