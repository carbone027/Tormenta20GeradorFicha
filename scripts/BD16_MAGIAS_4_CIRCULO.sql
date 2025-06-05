-- ========================================
-- MAGIAS DE 4º CÍRCULO - TORMENTA20
-- Script para inserir todas as magias de 4º círculo e seus aprimoramentos
-- ========================================

-- ========================================
-- INSERIR MAGIAS DE 4º CÍRCULO
-- ========================================

INSERT INTO magias (nome, tipo, escola, circulo, custo_pm, execucao, alcance, duracao, descricao) VALUES

-- MAGIAS ARCANAS
('Alterar Memória', 'Arcana', 'Encantamento', 4, 10, 'Padrão', 'Toque', 'Instantânea', 'Altera ou apaga memórias da última hora do alvo.'),
('Animar Objetos', 'Arcana', 'Transmutação', 4, 10, 'Padrão', 'Curto', 'Cena', 'Concede vida a objetos, que se tornam parceiros sob seu controle.'),
('Assassino Fantasmagórico', 'Arcana', 'Necromancia', 4, 10, 'Padrão', 'Médio', 'Cena', 'Conjura imagem do maior medo do alvo, que o persegue e pode causar dano de trevas ou PV -1.'),
('Campo Antimagia', 'Arcana', 'Abjuração', 4, 10, 'Padrão', 'Pessoal', 'Sustentada', 'Barreira invisível (3m raio) suprime habilidades mágicas e itens mágicos na área.'),
('Controlar a Gravidade', 'Arcana', 'Transmutação', 4, 10, 'Padrão', 'Médio', 'Sustentada', 'Controla gravidade em cubo de 12m (Aumentar, Inverter ou Reduzir). Sustentada.'),
('Desintegrar', 'Arcana', 'Transmutação', 4, 10, 'Padrão', 'Médio', 'Instantânea', 'Raio esverdeado causa 10d12 dano de essência. Se PV ≤ 0, alvo vira pó.'),
('Duplicata Ilusória', 'Arcana', 'Ilusão', 4, 10, 'Padrão', 'Pessoal', 'Cena', 'Cria cópia ilusória sua, intangível. Pode ver/ouvir por ela. Magias podem se originar dela.'),
('Explosão Caleidoscópica', 'Arcana', 'Ilusão', 4, 10, 'Padrão', 'Curto', 'Instantânea', 'Explosão de luzes/sons (6m raio) causa efeitos baseados no nível/ND do alvo (inconsciente, atordoado, enjoado, desprevenido).'),
('Forma Etérea', 'Arcana', 'Transmutação', 4, 10, 'Completa', 'Pessoal', 'Sustentada', 'Você e seu equipamento se tornam etéreos (invisível, incorpóreo, voo). Sustentada.'),
('Mão Poderosa de Talude', 'Arcana', 'Convocação', 4, 10, 'Padrão', 'Médio', 'Sustentada', 'Cria mão gigante de energia que protege (+5 Defesa vs 1 oponente) ou realiza ações (Agarrar, Esmagar, Empurrar). Sustentada.'),
('Marionete', 'Arcana', 'Encantamento', 4, 10, 'Padrão', 'Curto', 'Sustentada', 'Controla ações físicas do alvo (Fortitude anula a cada turno). Sustentada.'),
('Premonição', 'Divina', 'Adivinhação', 4, 10, 'Padrão', 'Pessoal', 'Cena', '1x/rodada, pode rolar novamente um teste recém realizado (deve aceitar 2º resultado).'),
('Raio Polar', 'Arcana', 'Evocação', 4, 10, 'Padrão', 'Longo', 'Instantânea', 'Raio causa 10d8 dano de frio e paralisa (bloco de gelo). Fortitude parcial (metade dano, lento).'),
('Relâmpago Flamejante de Reynard', 'Arcana', 'Evocação', 4, 10, '2 Rodadas', 'Pessoal', 'Sustentada', 'Mãos em chamas e eletrificadas. Pode disparar bola de fogo (10d6) ou relâmpago (10d6) ou ataque misto (20d12). Sustentada.'),
('Sonho', 'Arcana', 'Adivinhação', 4, 10, '10 Minutos', 'Ilimitado', 'Instantânea', 'Entra nos sonhos de 1 criatura viva para conversar.'),
('Talho Invisível de Edauros', 'Arcana', 'Evocação', 4, 10, 'Padrão', 'Pessoal', 'Instantânea', 'Cone de 9m de lâmina de ar causa 10d8 dano de corte e sangramento. Fortitude parcial.'),

-- MAGIAS DIVINAS
('Círculo da Restauração', 'Divina', 'Evocação', 4, 10, 'Padrão', 'Pessoal', '5 rodadas', 'Círculo de luz (3m raio) cura 3d8+3 PV e 1 PM a criaturas vivas que terminam turno dentro, por 5 rodadas.'),
('Cólera de Azgher', 'Divina', 'Evocação', 4, 10, 'Padrão', 'Longo', 'Instantânea', 'Explosão solar (6m raio) cega por 1d4 rodadas, causa 10d6 dano de fogo (10d8 em mortos-vivos) e deixa em chamas.'),
('Conceder Milagre', 'Divina', 'Encantamento', 4, 10, 'Padrão', 'Toque', 'Até ser usado', 'Alvo tocado pode lançar 1 magia sua (até 2º círculo) uma vez, sem custo de PM para ele. Você sofre -3 PM até ser usada.'),
('Conjurar Elemental', 'Arcana', 'Convocação', 4, 10, 'Completa', 'Curto', 'Cena', 'Transforma porção de elemento em elemental Grande (Ar, Água, Fogo ou Terra) parceiro mestre (Destruidor + 1 outro tipo).'),
('Controlar o Clima', 'Divina', 'Transmutação', 4, 10, 'Completa', 'Pessoal', '4d12 horas', 'Muda o clima em área (2km raio) por 4d12 horas (chuva, neve, ventos, névoas).'),
('Cúpula de Repulsão', 'Divina', 'Abjuração', 4, 10, 'Padrão', 'Pessoal', 'Sustentada', 'Cúpula impede aproximação (<3m) de 1 tipo de criatura/raça (Vontade anula). Sustentada.'),
('Guardião Divino', 'Divina', 'Convocação', 4, 10, 'Padrão', 'Curto', 'Cena', 'Invoca elemental de luz Pequeno (100 pontos de luz) que cura PV ou condições de aliados.'),
('Ligação Sombria', 'Divina', 'Necromancia', 4, 10, 'Padrão', 'Toque', '1 dia', 'Conecta seu corpo ao do alvo (1 dia); se você sofrer dano/condição, alvo pode sofrer também (Fortitude anula).'),
('Manto do Cruzado', 'Divina', 'Evocação', 4, 10, 'Padrão', 'Pessoal', 'Sustentada', 'Invoca manto de energia (Luz ou Trevas) com efeitos de cura/dano e bônus. Sustentada.'),
('Terremoto', 'Divina', 'Evocação', 4, 10, 'Padrão', 'Longo', '1 rodada', 'Tremor de terra (30m raio) por 1 rodada. Efeitos variam com terreno (desabamento, fendas, etc.).'),

-- MAGIAS UNIVERSAIS
('Libertação', 'Universal', 'Abjuração', 4, 10, 'Padrão', 'Toque', 'Cena', 'Alvo fica imune a efeitos de movimento e ignora restrições de deslocamento. Pode usar habilidades de movimento livre com armadura/escudo.'),
('Muralha de Ossos', 'Universal', 'Necromancia', 4, 10, 'Padrão', 'Médio', 'Cena', 'Parede de ossos (15m compr. x 9m alt. x 1,5m esp.) causa 4d8 dano de corte e agarra quem surge nela/adjacente.'),
('Viagem Planar', 'Universal', 'Convocação', 4, 10, 'Completa', 'Toque', 'Instantânea', 'Viaja instantaneamente para outro plano. Comp. Material: bastão de metal precioso (T$ 1.000).'),
('Visão da Verdade', 'Universal', 'Adivinhação', 4, 10, 'Movimento', 'Pessoal', 'Cena', 'Enxerga forma real das coisas (camuflagem, escuridão, ilusão, transmutação).');

-- ========================================
-- INSERIR APRIMORAMENTOS DE 4º CÍRCULO
-- ========================================

-- Função auxiliar para inserir aprimoramentos
CREATE OR REPLACE FUNCTION insert_aprimoramento_4_circulo(
  p_magia_nome VARCHAR,
  p_aprimoramento_nome VARCHAR,
  p_tipo VARCHAR,
  p_descricao TEXT,
  p_custo_pm VARCHAR,
  p_pre_requisitos TEXT DEFAULT NULL
) RETURNS VOID AS $$
BEGIN
  INSERT INTO magia_aprimoramentos (magia_id, nome, tipo, descricao, custo_pm_adicional, pre_requisitos)
  SELECT m.id, p_aprimoramento_nome, p_tipo, p_descricao, p_custo_pm, p_pre_requisitos
  FROM magias m
  WHERE m.nome = p_magia_nome;
END;
$$ LANGUAGE plpgsql;

-- ALTERAR MEMÓRIA
SELECT insert_aprimoramento_4_circulo('Alterar Memória', 'Área de Efeito (Alcance / Alvo / Área)', 'Área', 'Muda o alcance para pessoal e o alvo para área cone de 4,5m.', '+2 PM');
SELECT insert_aprimoramento_4_circulo('Alterar Memória', 'Memória Estendida (Tempo)', 'Tempo', 'Você pode alterar ou apagar as memórias das últimas 24 horas.', '+5 PM');

-- ANIMAR OBJETOS
SELECT insert_aprimoramento_4_circulo('Animar Objetos', 'Duração Permanente (Duração / Comp. Material)', 'Duração', 'Muda a duração para permanente e adiciona componente material (prataria no valor de T$ 1.000). Máximo de objetos animados = metade do seu nível.', '+5 PM');

-- ASSASSINO FANTASMAGÓRICO (sem aprimoramentos listados no CSV)

-- CAMPO ANTIMAGIA (sem aprimoramentos listados no CSV)

-- CÍRCULO DA RESTAURAÇÃO
SELECT insert_aprimoramento_4_circulo('Círculo da Restauração', 'Aumento de Cura (Cura)', 'Cura', 'Aumenta a regeneração de PV em 1d8+1.', '+2 PM');

-- CÓLERA DE AZGHER
SELECT insert_aprimoramento_4_circulo('Cólera de Azgher', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano em +2d6 (+2d8 contra mortos-vivos).', '+2 PM');
SELECT insert_aprimoramento_4_circulo('Cólera de Azgher', 'Aumento de Área (Área)', 'Área', 'Aumenta a área em +6m de raio.', '+2 PM');
SELECT insert_aprimoramento_4_circulo('Cólera de Azgher', 'Dissipar Trevas (Efeito Adicional)', 'Efeito Adicional', 'A luz purificadora dissipa todas as magias de necromancia ativas na área. Requer 5º círculo.', '+5 PM', 'Requer 5º círculo');

-- CONCEDER MILAGRE
SELECT insert_aprimoramento_4_circulo('Conceder Milagre', 'Magia de Círculo Maior (Círculo da Magia Concedida / Penalidade PM)', 'Círculo', 'Muda o círculo da magia concedida para 3º e a penalidade de PM para –6.', '+4 PM');

-- CONJURAR ELEMENTAL
SELECT insert_aprimoramento_4_circulo('Conjurar Elemental', 'Elemental Enorme (Tamanho do Elemental / Tipos de Parceiro)', 'Tamanho', 'O elemental muda para Enorme e recebe dois tipos de parceiro indicados em seu elemento.', '+5 PM');
SELECT insert_aprimoramento_4_circulo('Conjurar Elemental', 'Múltiplos Elementais (Quantidade / Alvo)', 'Quantidade', 'Você convoca um elemental de cada tipo. Pode escolher se cada elemental auxilia você ou um aliado no alcance. Requer 5º círculo.', '+5 PM', 'Requer 5º círculo');

-- CONTROLAR A GRAVIDADE (sem aprimoramentos listados no CSV)

-- CONTROLAR O CLIMA
SELECT insert_aprimoramento_4_circulo('Controlar o Clima', 'Aumento de Área e Duração (Área / Duração - Apenas Druidas)', 'Área', '(Apenas Druidas) Muda o raio da área para 3km e duração para 1d4 dias.', '+1 PM');

-- CÚPULA DE REPULSÃO
SELECT insert_aprimoramento_4_circulo('Cúpula de Repulsão', 'Distância Aumentada (Distância)', 'Distância', 'A cúpula impede criaturas de se aproximarem a menos de 4,5m de você.', '+2 PM');
SELECT insert_aprimoramento_4_circulo('Cúpula de Repulsão', 'Repulsão à Distância (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, criaturas afetadas também precisam fazer teste de Vontade se fizerem ataque ou efeito à distância contra você. Se falharem, efeito é desviado. Requer 5º círculo.', '+5 PM', 'Requer 5º círculo');

-- DESINTEGRAR
SELECT insert_aprimoramento_4_circulo('Desintegrar', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano total em +2d12 e o dano mínimo (se passar na resistência) em +1d12.', '+4 PM');

-- DUPLICATA ILUSÓRIA
SELECT insert_aprimoramento_4_circulo('Duplicata Ilusória', 'Cópia Adicional (Quantidade)', 'Quantidade', 'Cria uma cópia adicional.', '+3 PM');

-- EXPLOSÃO CALEIDOSCÓPICA (sem aprimoramentos listados no CSV)

-- FORMA ETÉREA
SELECT insert_aprimoramento_4_circulo('Forma Etérea', 'Grupo Etéreo (Alcance / Alvo)', 'Alvo', 'Muda o alcance para toque e o alvo para até 5 criaturas voluntárias de mãos dadas. Requer 5º círculo.', '+5 PM', 'Requer 5º círculo');

-- GUARDIÃO DIVINO (sem aprimoramentos listados no CSV)

-- LIBERTAÇÃO
SELECT insert_aprimoramento_4_circulo('Libertação', 'Caminhar Sobre Líquidos (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, o alvo pode caminhar sobre a água ou outros líquidos com seu deslocamento normal (não protege contra efeitos do líquido).', '+2 PM');
SELECT insert_aprimoramento_4_circulo('Libertação', 'Maestria Atlética (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, o alvo pode escolher 20 em todos os testes de Atletismo.', '+2 PM');
SELECT insert_aprimoramento_4_circulo('Libertação', 'Maestria Acrobática (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, o alvo pode escolher 20 em todos os testes de Acrobacia e pode fazer todas as manobras desta perícia mesmo sem treinamento.', '+2 PM');
SELECT insert_aprimoramento_4_circulo('Libertação', 'Libertação em Massa (Alcance / Alvo)', 'Alvo', 'Muda o alcance para curto e o alvo para até 5 criaturas.', '+5 PM');
SELECT insert_aprimoramento_4_circulo('Libertação', 'Dissipar Aprisionamento (Efeito Adicional)', 'Efeito Adicional', 'Pode dissipar Aprisionamento.', '+5 PM');

-- LIGAÇÃO SOMBRIA
SELECT insert_aprimoramento_4_circulo('Ligação Sombria', 'Vínculo Mortal (Efeito Adicional)', 'Efeito Adicional', 'A magia não termina se o alvo chegar a 0 PV (dano da magia pode matá-lo).', '+5 PM');

-- MÃO PODEROSA DE TALUDE
SELECT insert_aprimoramento_4_circulo('Mão Poderosa de Talude', 'Aumento de Dano (Dano - Esmagar)', 'Dano', 'Aumenta o dano em +1d6+5.', '+2 PM');
SELECT insert_aprimoramento_4_circulo('Mão Poderosa de Talude', 'Força Aumentada (Bônus de Manobra)', 'Bônus', 'Muda o bônus adicional em Misticismo para +20. Requer 5º círculo.', '+5 PM', 'Requer 5º círculo');

-- MANTO DO CRUZADO (sem aprimoramentos listados no CSV)

-- MARIONETE (sem aprimoramentos listados no CSV)

-- MURALHA DE OSSOS
SELECT insert_aprimoramento_4_circulo('Muralha de Ossos', 'Aumento de Dimensões (Área)', 'Área', 'Aumenta o comprimento em +15m e a altura em +3m.', '+3 PM');
SELECT insert_aprimoramento_4_circulo('Muralha de Ossos', 'Esqueletos Animados (Efeito Adicional)', 'Efeito Adicional', 'Muro feito de esqueletos animados. Criatura adjacente/escalando deve passar em Reflexos no início do turno ou fica agarrada.', '+5 PM');

-- PREMONIÇÃO
SELECT insert_aprimoramento_4_circulo('Premonição', 'Alterar Destino Alheio (Execução / Alcance / Alvo / Duração / Efeito Alterado)', 'Efeito Alterado', 'Muda execução para reação, alcance curto, alvo 1 criatura, duração instantânea. Obriga criatura a refazer teste (Vontade anula).', '+3 PM');
SELECT insert_aprimoramento_4_circulo('Premonição', 'Duração Estendida (Duração)', 'Duração', 'Muda a duração para um dia.', '+10 PM');

-- RAIO POLAR
SELECT insert_aprimoramento_4_circulo('Raio Polar', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano em +2d8.', '+3 PM');
SELECT insert_aprimoramento_4_circulo('Raio Polar', 'Explosão Polar (Alvo / Área)', 'Área', 'Muda o alvo para área de esfera com 6m de raio. Dispara bola de gelo que explode.', '+5 PM');

-- RELÂMPAGO FLAMEJANTE DE REYNARD
SELECT insert_aprimoramento_4_circulo('Relâmpago Flamejante de Reynard', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano das rajadas em +1d6 e o dano da rajada mista em +2d12.', '+2 PM');

-- SONHO
SELECT insert_aprimoramento_4_circulo('Sonho', 'Pesadelo (Efeito Adicional)', 'Efeito Adicional', 'Transforma sonho em pesadelo. Vítima (Vontade anula) não recupera PV/PM, sofre 1d10 dano de trevas, acorda fatigada. Modificadores no teste baseado no conhecimento do alvo.', '+2 PM');
SELECT insert_aprimoramento_4_circulo('Sonho', 'Sonho Compartilhado (Alvo)', 'Alvo', 'Aumenta o número de alvos em +1. Todos compartilham mesmo sonho/pesadelo.', '+1 PM');

-- TALHO INVISÍVEL DE EDAUROS
SELECT insert_aprimoramento_4_circulo('Talho Invisível de Edauros', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano em +2d8.', '+2 PM');
SELECT insert_aprimoramento_4_circulo('Talho Invisível de Edauros', 'Lâminas Contínuas (Alvo / Duração / Efeito Alterado)', 'Efeito Alterado', 'Muda alvo para você, duração sustentada. 1x/rodada (ação de movimento) dispara lâmina em alvo (alcance médio, 6d8 dano corte, Fortitude reduz à metade).', '+2 PM');

-- TERREMOTO (sem aprimoramentos listados no CSV)

-- VIAGEM PLANAR
SELECT insert_aprimoramento_4_circulo('Viagem Planar', 'Viagem em Grupo (Alvo)', 'Alvo', 'Muda o alvo para até cinco criaturas voluntárias que você esteja tocando.', '+2 PM');

-- VISÃO DA VERDADE
SELECT insert_aprimoramento_4_circulo('Visão da Verdade', 'Alvo Criatura (Alcance / Alvo)', 'Alvo', 'Muda o alcance para toque e o alvo para 1 criatura.', '+1 PM');
SELECT insert_aprimoramento_4_circulo('Visão da Verdade', 'Sentidos Aguçados (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, o alvo recebe +10 em todos os testes de Percepção.', '+1 PM');
SELECT insert_aprimoramento_4_circulo('Visão da Verdade', 'Audição da Verdade (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, o alvo escuta falsidades; ele recebe +10 em todos os testes de Intuição.', '+2 PM');
SELECT insert_aprimoramento_4_circulo('Visão da Verdade', 'Ver Através (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, o alvo enxerga através de paredes e barreiras com 30cm de espessura ou menos (parecem translúcidas).', '+4 PM');

-- Remover função auxiliar
DROP FUNCTION insert_aprimoramento_4_circulo(VARCHAR, VARCHAR, VARCHAR, TEXT, VARCHAR, TEXT);

-- ========================================
-- VERIFICAÇÃO FINAL
-- ========================================

SELECT 'MAGIAS DE 4º CÍRCULO INSERIDAS:' as resultado;
SELECT COUNT(*) as total_magias FROM magias WHERE circulo = 4;

SELECT 'APRIMORAMENTOS DE 4º CÍRCULO INSERIDOS:' as resultado;
SELECT COUNT(*) as total_aprimoramentos 
FROM magia_aprimoramentos ma
JOIN magias m ON ma.magia_id = m.id
WHERE m.circulo = 4;

SELECT 'MAGIAS POR TIPO (4º CÍRCULO):' as resultado;
SELECT tipo, COUNT(*) as quantidade 
FROM magias 
WHERE circulo = 4
GROUP BY tipo 
ORDER BY tipo;