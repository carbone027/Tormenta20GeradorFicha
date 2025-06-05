-- ========================================
-- CONFIGURAR ACESSO DAS CLASSES ÀS MAGIAS
-- Script para configurar quais classes podem lançar quais magias
-- Baseado no arquivo magias.txt
-- ========================================

-- ========================================
-- CONFIGURAÇÃO DAS CLASSES MÁGICAS
-- ========================================

-- Limpar configurações existentes (se necessário)
-- DELETE FROM classe_magias;

-- ========================================
-- ARCANISTA (Arcanas e Universais)
-- 1º círculo: 1º nível
-- 2º círculo: 5º nível  
-- 3º círculo: 9º nível
-- 4º círculo: 13º nível
-- 5º círculo: 17º nível
-- ========================================

DO $$
DECLARE
    arcanista_id INTEGER;
    magia_record RECORD;
BEGIN
    -- Buscar ID do Arcanista
    SELECT id INTO arcanista_id FROM classes WHERE nome = 'Arcanista';
    
    IF arcanista_id IS NOT NULL THEN
        RAISE NOTICE '🔮 Configurando magias para Arcanista (ID: %)', arcanista_id;
        
        -- 1º Círculo - Nível 1
        FOR magia_record IN 
            SELECT id FROM magias WHERE circulo = 1 AND tipo IN ('Arcana', 'Universal')
        LOOP
            INSERT INTO classe_magias (classe_id, magia_id, nivel_minimo)
            VALUES (arcanista_id, magia_record.id, 1)
            ON CONFLICT (classe_id, magia_id) DO NOTHING;
        END LOOP;
        
        -- 2º Círculo - Nível 5
        FOR magia_record IN 
            SELECT id FROM magias WHERE circulo = 2 AND tipo IN ('Arcana', 'Universal')
        LOOP
            INSERT INTO classe_magias (classe_id, magia_id, nivel_minimo)
            VALUES (arcanista_id, magia_record.id, 5)
            ON CONFLICT (classe_id, magia_id) DO NOTHING;
        END LOOP;
        
        -- 3º Círculo - Nível 9
        FOR magia_record IN 
            SELECT id FROM magias WHERE circulo = 3 AND tipo IN ('Arcana', 'Universal')
        LOOP
            INSERT INTO classe_magias (classe_id, magia_id, nivel_minimo)
            VALUES (arcanista_id, magia_record.id, 9)
            ON CONFLICT (classe_id, magia_id) DO NOTHING;
        END LOOP;
        
        -- 4º Círculo - Nível 13
        FOR magia_record IN 
            SELECT id FROM magias WHERE circulo = 4 AND tipo IN ('Arcana', 'Universal')
        LOOP
            INSERT INTO classe_magias (classe_id, magia_id, nivel_minimo)
            VALUES (arcanista_id, magia_record.id, 13)
            ON CONFLICT (classe_id, magia_id) DO NOTHING;
        END LOOP;
        
        -- 5º Círculo - Nível 17
        FOR magia_record IN 
            SELECT id FROM magias WHERE circulo = 5 AND tipo IN ('Arcana', 'Universal')
        LOOP
            INSERT INTO classe_magias (classe_id, magia_id, nivel_minimo)
            VALUES (arcanista_id, magia_record.id, 17)
            ON CONFLICT (classe_id, magia_id) DO NOTHING;
        END LOOP;
        
        RAISE NOTICE '✅ Magias do Arcanista configuradas';
    ELSE
        RAISE NOTICE '⚠️ Classe Arcanista não encontrada';
    END IF;
END $$;

-- ========================================
-- BARDO (Arcanas e Universais)
-- 1º círculo: 1º nível
-- 2º círculo: 6º nível
-- 3º círculo: 10º nível
-- 4º círculo: 14º nível
-- (Não tem 5º círculo)
-- ========================================

DO $$
DECLARE
    bardo_id INTEGER;
    magia_record RECORD;
BEGIN
    -- Buscar ID do Bardo
    SELECT id INTO bardo_id FROM classes WHERE nome = 'Bardo';
    
    IF bardo_id IS NOT NULL THEN
        RAISE NOTICE '🎵 Configurando magias para Bardo (ID: %)', bardo_id;
        
        -- 1º Círculo - Nível 1
        FOR magia_record IN 
            SELECT id FROM magias WHERE circulo = 1 AND tipo IN ('Arcana', 'Universal')
        LOOP
            INSERT INTO classe_magias (classe_id, magia_id, nivel_minimo)
            VALUES (bardo_id, magia_record.id, 1)
            ON CONFLICT (classe_id, magia_id) DO NOTHING;
        END LOOP;
        
        -- 2º Círculo - Nível 6
        FOR magia_record IN 
            SELECT id FROM magias WHERE circulo = 2 AND tipo IN ('Arcana', 'Universal')
        LOOP
            INSERT INTO classe_magias (classe_id, magia_id, nivel_minimo)
            VALUES (bardo_id, magia_record.id, 6)
            ON CONFLICT (classe_id, magia_id) DO NOTHING;
        END LOOP;
        
        -- 3º Círculo - Nível 10
        FOR magia_record IN 
            SELECT id FROM magias WHERE circulo = 3 AND tipo IN ('Arcana', 'Universal')
        LOOP
            INSERT INTO classe_magias (classe_id, magia_id, nivel_minimo)
            VALUES (bardo_id, magia_record.id, 10)
            ON CONFLICT (classe_id, magia_id) DO NOTHING;
        END LOOP;
        
        -- 4º Círculo - Nível 14
        FOR magia_record IN 
            SELECT id FROM magias WHERE circulo = 4 AND tipo IN ('Arcana', 'Universal')
        LOOP
            INSERT INTO classe_magias (classe_id, magia_id, nivel_minimo)
            VALUES (bardo_id, magia_record.id, 14)
            ON CONFLICT (classe_id, magia_id) DO NOTHING;
        END LOOP;
        
        RAISE NOTICE '✅ Magias do Bardo configuradas';
    ELSE
        RAISE NOTICE '⚠️ Classe Bardo não encontrada';
    END IF;
END $$;

-- ========================================
-- CLÉRIGO (Divinas e Universais)
-- 1º círculo: 1º nível
-- 2º círculo: 5º nível
-- 3º círculo: 9º nível
-- 4º círculo: 13º nível
-- 5º círculo: 17º nível
-- ========================================

DO $$
DECLARE
    clerigo_id INTEGER;
    magia_record RECORD;
BEGIN
    -- Buscar ID do Clérigo
    SELECT id INTO clerigo_id FROM classes WHERE nome = 'Clérigo';
    
    IF clerigo_id IS NOT NULL THEN
        RAISE NOTICE '⛪ Configurando magias para Clérigo (ID: %)', clerigo_id;
        
        -- 1º Círculo - Nível 1
        FOR magia_record IN 
            SELECT id FROM magias WHERE circulo = 1 AND tipo IN ('Divina', 'Universal')
        LOOP
            INSERT INTO classe_magias (classe_id, magia_id, nivel_minimo)
            VALUES (clerigo_id, magia_record.id, 1)
            ON CONFLICT (classe_id, magia_id) DO NOTHING;
        END LOOP;
        
        -- 2º Círculo - Nível 5
        FOR magia_record IN 
            SELECT id FROM magias WHERE circulo = 2 AND tipo IN ('Divina', 'Universal')
        LOOP
            INSERT INTO classe_magias (classe_id, magia_id, nivel_minimo)
            VALUES (clerigo_id, magia_record.id, 5)
            ON CONFLICT (classe_id, magia_id) DO NOTHING;
        END LOOP;
        
        -- 3º Círculo - Nível 9
        FOR magia_record IN 
            SELECT id FROM magias WHERE circulo = 3 AND tipo IN ('Divina', 'Universal')
        LOOP
            INSERT INTO classe_magias (classe_id, magia_id, nivel_minimo)
            VALUES (clerigo_id, magia_record.id, 9)
            ON CONFLICT (classe_id, magia_id) DO NOTHING;
        END LOOP;
        
        -- 4º Círculo - Nível 13
        FOR magia_record IN 
            SELECT id FROM magias WHERE circulo = 4 AND tipo IN ('Divina', 'Universal')
        LOOP
            INSERT INTO classe_magias (classe_id, magia_id, nivel_minimo)
            VALUES (clerigo_id, magia_record.id, 13)
            ON CONFLICT (classe_id, magia_id) DO NOTHING;
        END LOOP;
        
        -- 5º Círculo - Nível 17
        FOR magia_record IN 
            SELECT id FROM magias WHERE circulo = 5 AND tipo IN ('Divina', 'Universal')
        LOOP
            INSERT INTO classe_magias (classe_id, magia_id, nivel_minimo)
            VALUES (clerigo_id, magia_record.id, 17)
            ON CONFLICT (classe_id, magia_id) DO NOTHING;
        END LOOP;
        
        RAISE NOTICE '✅ Magias do Clérigo configuradas';
    ELSE
        RAISE NOTICE '⚠️ Classe Clérigo não encontrada';
    END IF;
END $$;

-- ========================================
-- DRUIDA (Divinas e Universais)
-- 1º círculo: 1º nível
-- 2º círculo: 6º nível
-- 3º círculo: 10º nível
-- 4º círculo: 14º nível
-- (Não tem 5º círculo)
-- ========================================

DO $$
DECLARE
    druida_id INTEGER;
    magia_record RECORD;
BEGIN
    -- Buscar ID do Druida
    SELECT id INTO druida_id FROM classes WHERE nome = 'Druida';
    
    IF druida_id IS NOT NULL THEN
        RAISE NOTICE '🌿 Configurando magias para Druida (ID: %)', druida_id;
        
        -- 1º Círculo - Nível 1
        FOR magia_record IN 
            SELECT id FROM magias WHERE circulo = 1 AND tipo IN ('Divina', 'Universal')
        LOOP
            INSERT INTO classe_magias (classe_id, magia_id, nivel_minimo)
            VALUES (druida_id, magia_record.id, 1)
            ON CONFLICT (classe_id, magia_id) DO NOTHING;
        END LOOP;
        
        -- 2º Círculo - Nível 6
        FOR magia_record IN 
            SELECT id FROM magias WHERE circulo = 2 AND tipo IN ('Divina', 'Universal')
        LOOP
            INSERT INTO classe_magias (classe_id, magia_id, nivel_minimo)
            VALUES (druida_id, magia_record.id, 6)
            ON CONFLICT (classe_id, magia_id) DO NOTHING;
        END LOOP;
        
        -- 3º Círculo - Nível 10
        FOR magia_record IN 
            SELECT id FROM magias WHERE circulo = 3 AND tipo IN ('Divina', 'Universal')
        LOOP
            INSERT INTO classe_magias (classe_id, magia_id, nivel_minimo)
            VALUES (druida_id, magia_record.id, 10)
            ON CONFLICT (classe_id, magia_id) DO NOTHING;
        END LOOP;
        
        -- 4º Círculo - Nível 14
        FOR magia_record IN 
            SELECT id FROM magias WHERE circulo = 4 AND tipo IN ('Divina', 'Universal')
        LOOP
            INSERT INTO classe_magias (classe_id, magia_id, nivel_minimo)
            VALUES (druida_id, magia_record.id, 14)
            ON CONFLICT (classe_id, magia_id) DO NOTHING;
        END LOOP;
        
        RAISE NOTICE '✅ Magias do Druida configuradas';
    ELSE
        RAISE NOTICE '⚠️ Classe Druida não encontrada';
    END IF;
END $$;

-- ========================================
-- VERIFICAÇÃO DAS CONFIGURAÇÕES
-- ========================================

-- Verificar quantas magias foram configuradas por classe
SELECT 
    'RESUMO DAS CONFIGURAÇÕES:' as resultado;

SELECT 
    c.nome as classe,
    COUNT(cm.id) as total_magias,
    COUNT(CASE WHEN m.circulo = 1 THEN 1 END) as circulo_1,
    COUNT(CASE WHEN m.circulo = 2 THEN 1 END) as circulo_2,
    COUNT(CASE WHEN m.circulo = 3 THEN 1 END) as circulo_3,
    COUNT(CASE WHEN m.circulo = 4 THEN 1 END) as circulo_4,
    COUNT(CASE WHEN m.circulo = 5 THEN 1 END) as circulo_5
FROM classes c
LEFT JOIN classe_magias cm ON c.id = cm.classe_id
LEFT JOIN magias m ON cm.magia_id = m.id
WHERE c.nome IN ('Arcanista', 'Bardo', 'Clérigo', 'Druida')
GROUP BY c.id, c.nome
ORDER BY c.nome;

-- Verificar distribuição por tipo de magia
SELECT 
    'MAGIAS POR TIPO E CLASSE:' as resultado;

SELECT 
    c.nome as classe,
    m.tipo,
    COUNT(*) as quantidade
FROM classes c
INNER JOIN classe_magias cm ON c.id = cm.classe_id
INNER JOIN magias m ON cm.magia_id = m.id
WHERE c.nome IN ('Arcanista', 'Bardo', 'Clérigo', 'Druida')
GROUP BY c.nome, m.tipo
ORDER BY c.nome, m.tipo;

-- Verificar algumas magias específicas
SELECT 
    'EXEMPLOS DE CONFIGURAÇÃO:' as resultado;

SELECT 
    m.nome as magia,
    m.tipo,
    m.circulo,
    c.nome as classe,
    cm.nivel_minimo
FROM magias m
INNER JOIN classe_magias cm ON m.id = cm.magia_id
INNER JOIN classes c ON cm.classe_id = c.id
WHERE m.nome IN ('Curar Ferimentos', 'Bola de Fogo', 'Luz', 'Dissipar Magia')
  AND c.nome IN ('Arcanista', 'Bardo', 'Clérigo', 'Druida')
ORDER BY m.nome, c.nome;

SELECT 'CONFIGURAÇÃO CONCLUÍDA COM SUCESSO!' as resultado;