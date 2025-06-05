-- ========================================
-- MAGIAS DE 2º CÍRCULO - TORMENTA20
-- Script para inserir todas as magias de 2º círculo e seus aprimoramentos
-- ========================================

-- ========================================
-- INSERIR MAGIAS DE 2º CÍRCULO
-- ========================================

INSERT INTO magias (nome, tipo, escola, circulo, custo_pm, execucao, alcance, duracao, descricao) VALUES

-- MAGIAS DIVINAS
('Aliado Animal', 'Divina', 'Encantamento', 2, 3, 'Padrão', 'Toque', 'Permanente', 'Cria vínculo mental com animal prestativo, que se torna parceiro veterano.'),
('Círculo da Justiça', 'Divina', 'Abjuração', 2, 3, 'Completa', 'Área', 'Cena', 'Área causa -10 em Acrobacia, Enganação, Furtividade, Ladinagem; impede mentiras deliberadas.'),
('Condição', 'Divina', 'Adivinhação', 2, 3, 'Padrão', 'Toque', 'Cena', 'Monitora posição e status (PV, condições, magias) de até 5 criaturas tocadas.'),
('Conjurar Mortos-Vivos', 'Universal', 'Necromancia', 2, 3, 'Completa', 'Curto', 'Cena', 'Ergue 6 esqueletos capangas que lutam sob seu comando.'),
('Controlar Fogo', 'Divina', 'Evocação', 2, 3, 'Padrão', 'Médio', 'Sustentada', 'Permite criar, moldar, mover ou extinguir chamas; esquentar objetos; ou armas flamejantes.'),
('Controlar Madeira', 'Divina', 'Transmutação', 2, 3, 'Padrão', 'Curto', 'Instantânea', 'Molda, fortalece, repele ou retorce 1 objeto de madeira Grande ou menor.'),
('Enxame de Pestes', 'Divina', 'Convocação', 2, 3, 'Completa', 'Curto', 'Cena', 'Convoca enxame (besouros, ratos, etc.) que causa 2d12 dano de corte/rodada.'),
('Físico Divino', 'Divina', 'Transmutação', 2, 3, 'Padrão', 'Toque', 'Cena', 'Alvo tocado recebe +2 em For, Des ou Con.'),
('Globo da Verdade de Gwen', 'Divina', 'Adivinhação', 2, 3, 'Padrão', 'Pessoal', 'Cena', 'Globo flutuante mostra cena vista até 1 semana atrás por você ou alvo tocado.'),
('Mente Divina', 'Divina', 'Adivinhação', 2, 3, 'Padrão', 'Toque', 'Cena', 'Alvo tocado recebe +2 em Int, Sab ou Car.'),
('Miasma Mefítico', 'Divina', 'Necromancia', 2, 3, 'Padrão', 'Curto', 'Sustentada', 'Nuvem (6m raio) causa 5d6 dano de ácido e enjoo por 1 rodada.'),
('Montaria Arcana', 'Arcana', 'Convocação', 2, 3, 'Padrão', 'Curto', 'Cena', 'Convoca parceiro cavalo de guerra veterano com aparência personalizável.'),
('Oração', 'Divina', 'Encantamento', 2, 3, 'Padrão', 'Curto', 'Sustentada', 'Aliados em alcance curto recebem +2 em perícias/dano; inimigos -2. Sustentada. Comp. Material T$ 25/PM.'),
('Purificação', 'Divina', 'Evocação', 2, 3, 'Padrão', 'Toque', 'Instantânea', 'Remove uma condição (abalado, cego, etc.) do alvo tocado.'),
('Raio Solar', 'Divina', 'Evocação', 2, 3, 'Padrão', 'Longo', 'Instantânea', 'Linha causa 4d8 dano de luz (4d12 em mortos-vivos) e ofusca por 1 rodada.'),
('Rogar Maldição', 'Divina', 'Necromancia', 2, 3, 'Padrão', 'Curto', 'Sustentada', 'Amaldiçoa alvo com Debilidade, Doença, Fraqueza ou Isolamento. Sustentada.'),
('Silêncio', 'Divina', 'Ilusão', 2, 3, 'Padrão', 'Longo', 'Sustentada', 'Esfera (6m raio) impede som e lançamento de magias. Sustentada.'),
('Soco de Arsenal', 'Divina', 'Convocação', 2, 3, 'Padrão', 'Toque', 'Instantânea', 'Soco causa 4d6 + For dano de impacto e empurra alvo 3m.'),
('Tempestade Divina', 'Divina', 'Evocação', 2, 3, 'Completa', 'Longo', 'Sustentada', 'Cria vendaval em cilindro (15m raio/altura). Pode gerar chuva, neve ou granizo. Sustentada.'),
('Vestimenta da Fé', 'Divina', 'Abjuração', 2, 3, 'Padrão', 'Toque', '1 dia', 'Fortalece armadura/escudo (+2 Defesa) ou vestuário (+2 Defesa). Dura 1 dia.'),
('Voz Divina', 'Divina', 'Adivinhação', 2, 3, 'Padrão', 'Pessoal', 'Cena', 'Permite conversar com criaturas de qualquer raça/tipo (animais, construtos, etc.).'),

-- MAGIAS ARCANAS
('Alterar Tamanho', 'Arcana', 'Transmutação', 2, 3, 'Padrão', 'Curto', 'Cena', 'Aumenta ou diminui tamanho de 1 objeto mundano em até 3 categorias; pode mudar consistência.'),
('Amarras Etéreas', 'Arcana', 'Convocação', 2, 3, 'Padrão', 'Curto', 'Cena', 'Três laços de energia prendem (agarrado) o alvo.'),
('Aparência Perfeita', 'Arcana', 'Ilusão', 2, 3, 'Padrão', 'Pessoal', 'Cena', 'Concede aparência idealizada, bônus em Carisma e perícias sociais.'),
('Augúrio', 'Divina', 'Adivinhação', 2, 3, 'Completa', 'Pessoal', 'Instantânea', 'Diz se uma ação futura trará resultados bons, ruins, ambos ou nada.'),
('Bola de Fogo', 'Arcana', 'Evocação', 2, 3, 'Padrão', 'Longo', 'Instantânea', 'Esfera incandescente explode, causando 6d6 dano de fogo em área.'),
('Camuflagem Ilusória', 'Arcana', 'Ilusão', 2, 3, 'Padrão', 'Toque', 'Cena', 'Imagem do alvo fica nublada, concedendo camuflagem leve.'),
('Campo de Força', 'Arcana', 'Abjuração', 2, 3, 'Padrão', 'Pessoal', 'Cena', 'Cria película protetora que concede 30 PV temporários.'),
('Crânio Voador de Vladislav', 'Arcana', 'Necromancia', 2, 3, 'Padrão', 'Longo', 'Instantânea', 'Crânio de energia negativa causa 4d8+4 dano de trevas e abala alvo e inimigos próximos.'),
('Desespero Esmagador', 'Arcana', 'Encantamento', 2, 3, 'Padrão', 'Pessoal', 'Cena', 'Humanoides em cone de 6m ficam fracos e frustrados.'),
('Dissipar Magia', 'Universal', 'Abjuração', 2, 3, 'Padrão', 'Curto', 'Instantânea', 'Encerra magias ativas em alvo/área ou transforma item mágico em mundano temporariamente.'),
('Esculpir Sons', 'Arcana', 'Ilusão', 2, 3, 'Padrão', 'Curto', 'Cena', 'Altera sons emitidos por 1 criatura/objeto (omitir, transformar).'),
('Flecha Ácida', 'Arcana', 'Evocação', 2, 3, 'Padrão', 'Longo', 'Instantânea', 'Projétil causa 4d6 dano de ácido; se falhar na resistência, +2d6 por 2 rodadas. Dobro do dano a objetos.'),
('Invisibilidade', 'Arcana', 'Ilusão', 2, 3, 'Livre', 'Pessoal', '1 rodada', 'Alvo fica invisível por 1 rodada. Termina se atacar ou lançar magia ofensiva.'),
('Ligação Telepática', 'Arcana', 'Adivinhação', 2, 3, 'Padrão', 'Longo', 'Cena', 'Cria elo mental entre 2 criaturas voluntárias (Int 3+) para comunicação à distância.'),
('Localização', 'Arcana', 'Adivinhação', 2, 3, 'Padrão', 'Pessoal', 'Sustentada', 'Encontra criatura/objeto em esfera de 90m de raio. Indica direção e distância.'),
('Marca da Obediência', 'Universal', 'Encantamento', 2, 3, 'Padrão', 'Curto', 'Cena', 'Marca mística no alvo o obriga a seguir uma ordem por uma cena.'),
('Metamorfose', 'Arcana', 'Transmutação', 2, 3, 'Padrão', 'Pessoal', 'Cena', 'Muda sua aparência e forma (incluindo equipamento) para qualquer criatura. +20 em Enganação para disfarce.'),
('Refúgio', 'Arcana', 'Abjuração', 2, 3, 'Completa', 'Curto', 'Cena', 'Cria domo (6m raio) que protege de clima, mas não dano. Concede camuflagem total.'),
('Relâmpago', 'Arcana', 'Evocação', 2, 3, 'Padrão', 'Longo', 'Instantânea', 'Raio causa 6d6 dano de eletricidade em linha.'),
('Runa de Proteção', 'Universal', 'Abjuração', 2, 3, '1 hora', 'Toque', 'Permanente', 'Escreve runa que explode (6d6 dano elemental) ao ser ativada por criatura. Permanente até descarregada. Comp. Mat. T$ 200.'),
('Salto Dimensional', 'Arcana', 'Convocação', 2, 3, 'Padrão', 'Curto', 'Instantânea', 'Teletransporta você para outro lugar em alcance curto.'),
('Servos Invisíveis', 'Arcana', 'Convocação', 2, 3, 'Padrão', 'Curto', 'Cena', 'Cria até 3 servos invisíveis/silenciosos para tarefas simples ou +2 em 1 teste de perícia.'),
('Sopro das Uivantes', 'Arcana', 'Evocação', 2, 3, 'Padrão', 'Pessoal', 'Instantânea', 'Cone de 9m causa 4d6 dano de frio; criaturas M ou menores caem e são empurradas 6m.'),
('Sussurros Insanos', 'Arcana', 'Encantamento', 2, 3, 'Padrão', 'Curto', 'Cena', 'Alvo (humanoide) fica confuso por uma cena.'),
('Toque Vampírico', 'Arcana', 'Necromancia', 2, 3, 'Padrão', 'Toque', 'Instantânea', 'Toque causa 6d6 dano de trevas; recupera PV igual à metade do dano.'),
('Velocidade', 'Arcana', 'Transmutação', 2, 3, 'Padrão', 'Toque', 'Sustentada', 'Alvo ganha ação padrão ou movimento adicional/turno (não para magias/engenhocas). Sustentada.');

-- ========================================
-- INSERIR APRIMORAMENTOS DE 2º CÍRCULO
-- ========================================

-- Função auxiliar para inserir aprimoramentos
CREATE OR REPLACE FUNCTION insert_aprimoramento_2_circulo(
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

-- ALIADO ANIMAL
SELECT insert_aprimoramento_2_circulo('Aliado Animal', 'Mensageiro Animal (Alvo / Duração / Efeito Alterado)', 'Efeito Alterado', 'Muda alvo para 1 animal Minúsculo, duração para 1 semana. Animal leva item/carta a local designado, esperando por criaturas escolhidas.', '+1 PM');
SELECT insert_aprimoramento_2_circulo('Aliado Animal', 'Parceiro Mestre (Nível do Parceiro)', 'Nível', 'Muda o parceiro para mestre. Requer 3º círculo.', '+7 PM', 'Requer 3º círculo');
SELECT insert_aprimoramento_2_circulo('Aliado Animal', 'Parceiros Múltiplos (Alvo)', 'Alvo', 'Muda alvo para 2 animais prestativos. Cada um é parceiro de tipo diferente. Limite de parceiros ainda se aplica. Requer 4º círculo.', '+12 PM', 'Requer 4º círculo');

-- ALTERAR TAMANHO
SELECT insert_aprimoramento_2_circulo('Alterar Tamanho', 'Aumento de Alvos (Alvo)', 'Alvo', 'Aumenta o número de alvos em +1.', '+1 PM');
SELECT insert_aprimoramento_2_circulo('Alterar Tamanho', 'Aumentar Criatura (Alcance / Alvo / Efeito Adicional)', 'Efeito Alterado', 'Muda alcance para toque, alvo 1 criatura. Alvo aumenta 1 categoria de tamanho (equipamento se ajusta), recebe For +2. (Fortitude anula)', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Alterar Tamanho', 'Reduzir Criatura (Alcance / Alvo / Efeito Adicional)', 'Efeito Alterado', 'Muda alcance para toque, alvo 1 criatura. Alvo diminui 1 categoria de tamanho (equipamento se ajusta), recebe Des +2. (Fortitude anula). Requer 3º círculo.', '+3 PM', 'Requer 3º círculo');
SELECT insert_aprimoramento_2_circulo('Alterar Tamanho', 'Encolhimento Permanente (Alcance / Alvo / Duração / Resistência)', 'Efeito Alterado', 'Muda alcance para toque, alvo 1 criatura, duração permanente, Fortitude anula. Alvo e equipamento viram Minúsculos (For -5, desloc. 3m). Requer 4º círculo.', '+7 PM', 'Requer 4º círculo');

-- AMARRAS ETÉREAS
SELECT insert_aprimoramento_2_circulo('Amarras Etéreas', 'Aumento de Alvos (Alvo)', 'Alvo', 'Aumenta o número de alvos em +1.', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Amarras Etéreas', 'Aumento de Laços (Efeito Adicional)', 'Efeito Adicional', 'Aumenta o número de laços em um alvo à sua escolha em +1 (bônus máximo limitado pelo círculo máximo de magia que você pode lançar).', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Amarras Etéreas', 'Laços Energéticos (Efeito Adicional / Dano)', 'Efeito Adicional', 'Cada laço é destruído com 1 ataque; cada laço destruído causa 1d8+1 dano de essência na criatura amarrada. Requer 3º círculo.', '+3 PM', 'Requer 3º círculo');

-- APARÊNCIA PERFEITA
SELECT insert_aprimoramento_2_circulo('Aparência Perfeita', 'Alvo Humanoide (Alcance / Alvo)', 'Alvo', 'Muda o alcance para toque e o alvo para 1 humanoide.', '+1 PM');

-- AUGÚRIO
SELECT insert_aprimoramento_2_circulo('Augúrio', 'Consulta Detalhada (Execução / Efeito Alterado)', 'Efeito Alterado', 'Muda execução para 1 minuto. Pergunta sobre evento até 1 dia no futuro. Resposta pode ser frase, profecia ou enigma. (Falha: sem resposta). Requer 3º círculo.', '+3 PM', 'Requer 3º círculo');
SELECT insert_aprimoramento_2_circulo('Augúrio', 'Interrogatório Divino (Execução / Duração / Efeito Alterado)', 'Efeito Alterado', 'Muda execução para 10 minutos, duração 1 minuto. Pergunta sim/não/não sei (1/rodada). (Falha: "não sei"). Requer 4º círculo.', '+7 PM', 'Requer 4º círculo');
SELECT insert_aprimoramento_2_circulo('Augúrio', 'Chance de Sucesso Aumentada (Probabilidade)', 'Probabilidade', 'Mestre rola 1d12; magia só falha com resultado 1.', '+7 PM');
SELECT insert_aprimoramento_2_circulo('Augúrio', 'Chance de Sucesso Muito Aumentada (Probabilidade)', 'Probabilidade', 'Mestre rola 1d20; magia só falha com resultado 1.', '+12 PM');

-- BOLA DE FOGO
SELECT insert_aprimoramento_2_circulo('Bola de Fogo', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano em +2d6.', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Bola de Fogo', 'Esfera Flamejante (Área / Duração / Efeito Alterado)', 'Efeito Alterado', 'Muda área para esfera flamejante Média, duração para cena. Causa 3d6 dano a criaturas no mesmo espaço. Pode mover esfera (ação de movimento).', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Bola de Fogo', 'Pedra Explosiva (Duração / Efeito Alterado)', 'Efeito Alterado', 'Muda duração para 1 dia ou até descarregada. Cria pequena pedra flamejante, detonável como reação (dano da magia em área). Pode ser arremessada.', '+3 PM');

-- CAMUFLAGEM ILUSÓRIA
SELECT insert_aprimoramento_2_circulo('Camuflagem Ilusória', 'Camuflagem Aprimorada (Duração / Efeito Adicional)', 'Efeito Adicional', 'Muda duração para sustentada. Chance de falha da camuflagem leve aumenta para 50%.', '+3 PM');
SELECT insert_aprimoramento_2_circulo('Camuflagem Ilusória', 'Camuflagem em Massa (Alcance / Alvo)', 'Alvo', 'Muda o alcance para curto e o alvo para criaturas escolhidas. Requer 4º círculo.', '+7 PM', 'Requer 4º círculo');

-- CAMPO DE FORÇA
SELECT insert_aprimoramento_2_circulo('Campo de Força', 'Escudo Protetor (Execução / Duração / Efeito Adicional)', 'Efeito Alterado', 'Muda execução para reação, duração instantânea. Concede RD 30 contra o próximo dano.', '+1 PM');
SELECT insert_aprimoramento_2_circulo('Campo de Força', 'Fortalecimento (PV Temporários / RD)', 'Fortalecimento', 'Muda os PV temporários ou a RD para 50. Requer 3º círculo.', '+3 PM', 'Requer 3º círculo');
SELECT insert_aprimoramento_2_circulo('Campo de Força', 'Fortalecimento Maior (PV Temporários / RD)', 'Fortalecimento', 'Muda os PV temporários ou a RD para 70. Requer 4º círculo.', '+7 PM', 'Requer 4º círculo');

-- CÍRCULO DA JUSTIÇA
SELECT insert_aprimoramento_2_circulo('Círculo da Justiça', 'Ver o Invisível (Execução / Alcance / Alvo / Duração / Efeito Alterado / Resistência)', 'Efeito Alterado', 'Muda execução para padrão, alcance pessoal, alvo você, duração cena, resistência nenhuma. Criaturas/objetos invisíveis em alcance curto se tornam visíveis.', '+1 PM');
SELECT insert_aprimoramento_2_circulo('Círculo da Justiça', 'Penalidade Aumentada (Penalidade)', 'Penalidade', 'Muda penalidade nas perícias para -10 (se passar na resistência) e -20 (se falhar). Requer 4º círculo.', '+3 PM', 'Requer 4º círculo');
SELECT insert_aprimoramento_2_circulo('Círculo da Justiça', 'Duração Permanente (Duração / Comp. Material)', 'Duração', 'Muda duração para permanente, adiciona componente material (balança de prata T$ 5.000).', '+7 PM');

-- CONDIÇÃO
SELECT insert_aprimoramento_2_circulo('Condição', 'Aumento de Alvos (Alvo)', 'Alvo', 'Aumenta o número de alvos em +1.', '+1 PM');
SELECT insert_aprimoramento_2_circulo('Condição', 'Duração Estendida (Duração)', 'Duração', 'Muda a duração para um dia.', '+1 PM');

-- CONJURAR MORTOS-VIVOS
SELECT insert_aprimoramento_2_circulo('Conjurar Mortos-Vivos', 'Aumento de Mortos-Vivos (Quantidade)', 'Quantidade', 'Aumenta o número de mortos-vivos conjurados em +1.', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Conjurar Mortos-Vivos', 'Carniçais (Tipo de Criatura)', 'Tipo', 'Em vez de esqueletos, conjura carniçais (mais fortes, com paralisia). Requer 3º círculo.', '+3 PM', 'Requer 3º círculo');
SELECT insert_aprimoramento_2_circulo('Conjurar Mortos-Vivos', 'Sombras (Tipo de Criatura)', 'Tipo', 'Em vez de esqueletos, conjura sombras (incorpóreas, drenam PM). Requer 4º círculo.', '+7 PM', 'Requer 4º círculo');

-- CONTROLAR FOGO
SELECT insert_aprimoramento_2_circulo('Controlar Fogo', 'Labaredas (Duração / Resistência / Efeito Alterado)', 'Efeito Alterado', 'Muda duração para sustentada, resistência Reflexos reduz à metade. A cada rodada, pode gastar ação de movimento para projetar labareda (4d6 dano de fogo).', '+1 PM');
SELECT insert_aprimoramento_2_circulo('Controlar Fogo', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano em +1d6 (exceto efeito Chamejar).', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Controlar Fogo', 'Destruir Elemental de Fogo (Alvo / Resistência)', 'Efeito Alterado', 'Muda alvo para 1 criatura de fogo/lava/magma, resistência Fortitude parcial. Se falhar, alvo é reduzido a 0 PV; se passar, sofre 5d6 dano.', '+3 PM');

-- CONTROLAR MADEIRA
SELECT insert_aprimoramento_2_circulo('Controlar Madeira', 'Transformação Arbórea (Alcance / Alvo / Duração / Efeito Alterado)', 'Efeito Alterado', 'Muda alcance para pessoal, alvo você, duração 1 dia. Você e seu equipamento se transformam em árvore Grande. (Vontade (CD30) revela).', '+1 PM');
SELECT insert_aprimoramento_2_circulo('Controlar Madeira', 'Espinhos no Solo (Alvo / Área / Duração / Efeito Alterado)', 'Efeito Alterado', 'Muda alvo para área (quadrado 9m), duração cena. Vegetação na área vira terreno difícil e causa 1d6 dano de corte por 1,5m de movimento.', '+3 PM');
SELECT insert_aprimoramento_2_circulo('Controlar Madeira', 'Aumento de Tamanho do Alvo (Alvo)', 'Alvo', 'Muda o tamanho do alvo para Enorme ou menor. Requer 3º círculo.', '+7 PM', 'Requer 3º círculo');

-- CRÂNIO VOADOR DE VLADISLAV
SELECT insert_aprimoramento_2_circulo('Crânio Voador de Vladislav', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano em +1d8+1.', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Crânio Voador de Vladislav', 'Alvos Múltiplos (Alvo)', 'Alvo', 'Aumenta o número de alvos em +1.', '+2 PM');

-- DESESPERO ESMAGADOR
SELECT insert_aprimoramento_2_circulo('Desespero Esmagador', 'Desespero Maior (Efeito Alterado)', 'Efeito Alterado', 'Em vez do normal, condições são debilitado e esmorecido.', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Desespero Esmagador', 'Alvo Universal (Alvo)', 'Alvo', 'Em vez do normal, afeta qualquer tipo de criatura.', '+3 PM');
SELECT insert_aprimoramento_2_circulo('Desespero Esmagador', 'Pranto Desolador (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, criaturas que falhem na resistência ficam pasmas por 1 rodada (1 vez/cena). Requer 3º círculo.', '+3 PM', 'Requer 3º círculo');

-- DISSIPAR MAGIA
SELECT insert_aprimoramento_2_circulo('Dissipar Magia', 'Disjunção (Área / Efeito Alterado)', 'Efeito Alterado', 'Muda área para esfera 9m raio. Magias na área são dissipadas. Itens mágicos viram mundanos por 1 cena (Vontade anula). Requer 5º círculo.', '+12 PM', 'Requer 5º círculo');

-- ENXAME DE PESTES
SELECT insert_aprimoramento_2_circulo('Enxame de Pestes', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano em +1d12.', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Enxame de Pestes', 'Enxame Maior (Resistência / Efeito Alterado / Dano)', 'Efeito Alterado', 'Muda resistência para Reflexos reduz à metade, enxame de criaturas maiores (gatos, kobolds). Causa 3d12 dano (corte, impacto ou perfuração).', '+3 PM');
SELECT insert_aprimoramento_2_circulo('Enxame de Pestes', 'Enxames Múltiplos (Quantidade)', 'Quantidade', 'Aumenta o número de enxames em +1 (não podem ocupar mesmo espaço). Requer 3º círculo.', '+5 PM', 'Requer 3º círculo');

-- ESCULPIR SONS
SELECT insert_aprimoramento_2_circulo('Esculpir Sons', 'Alvos Múltiplos (Alvo)', 'Alvo', 'Aumenta o número de alvos em +1. Todos afetados da mesma forma.', '+2 PM');

-- FÍSICO DIVINO
SELECT insert_aprimoramento_2_circulo('Físico Divino', 'Alvos Múltiplos (Alcance / Alvo)', 'Alvo', 'Muda o alcance para curto e o alvo para criaturas escolhidas.', '+3 PM');
SELECT insert_aprimoramento_2_circulo('Físico Divino', 'Fortalecimento Completo (Efeito Alterado)', 'Efeito Alterado', 'Em vez do normal, o alvo recebe +2 nos três atributos físicos. Requer 3º círculo.', '+3 PM', 'Requer 3º círculo');
SELECT insert_aprimoramento_2_circulo('Físico Divino', 'Fortalecimento Maior (Efeito Alterado)', 'Efeito Alterado', 'Em vez do normal, o alvo recebe +4 no atributo escolhido. Requer 4º círculo.', '+7 PM', 'Requer 4º círculo');

-- FLECHA ÁCIDA
SELECT insert_aprimoramento_2_circulo('Flecha Ácida', 'Corroer Armadura (Efeito Adicional)', 'Efeito Adicional', 'Se alvo com muco ácido usa armadura/escudo, item é corroído (-1 Defesa permanente). Consertável com Ofício.', '+1 PM');
SELECT insert_aprimoramento_2_circulo('Flecha Ácida', 'Aumento Corrosão (Efeito Adicional)', 'Efeito Adicional', 'Aumenta a redução na Defesa em +1.', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Flecha Ácida', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano inicial e o dano por rodada em +1d6.', '+2 PM');

-- GLOBO DA VERDADE DE GWEN
SELECT insert_aprimoramento_2_circulo('Globo da Verdade de Gwen', 'Memória Longa (Tempo)', 'Tempo', 'O globo mostra uma cena vista até um mês atrás.', '+1 PM');
SELECT insert_aprimoramento_2_circulo('Globo da Verdade de Gwen', 'Memória Ancestral (Tempo)', 'Tempo', 'Como acima, mas até um ano atrás.', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Globo da Verdade de Gwen', 'Visão Post Mortem (Alvo)', 'Alvo', 'Ao lançar, pode tocar um cadáver. Globo mostra a última cena vista pela criatura.', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Globo da Verdade de Gwen', 'Globos Múltiplos (Quantidade)', 'Quantidade', 'Muda o efeito para 10 globos. Todos mostram a mesma cena.', '+4 PM');

-- INVISIBILIDADE
SELECT insert_aprimoramento_2_circulo('Invisibilidade', 'Alvo Criatura/Objeto (Execução / Alcance / Alvo)', 'Efeito Alterado', 'Muda execução para padrão, alcance para toque, alvo para 1 criatura ou 1 objeto Grande ou menor.', '+1 PM');
SELECT insert_aprimoramento_2_circulo('Invisibilidade', 'Invisibilidade Duradoura (Duração)', 'Duração', 'Muda a duração para cena. Requer 3º círculo.', '+3 PM', 'Requer 3º círculo');

-- LIGAÇÃO TELEPÁTICA
SELECT insert_aprimoramento_2_circulo('Ligação Telepática', 'Aumento de Alvos (Alvo)', 'Alvo', 'Aumenta o número de alvos em +1.', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Ligação Telepática', 'Sentidos Compartilhados (Alvo / Efeito Adicional)', 'Efeito Adicional', 'Muda alvo para 1 criatura. Vê e ouve pelos sentidos da criatura (ação de movimento). (Vontade suprime por 1h). Requer 3º círculo.', '+3 PM', 'Requer 3º círculo');

-- LOCALIZAÇÃO
SELECT insert_aprimoramento_2_circulo('Localização', 'Truque (Área / Alvo / Efeito Alterado)', 'Truque', 'Muda área para alvo você. Sabe onde fica o norte e recebe +5 em Sobrevivência para se orientar.', 'Custo total: 0 PM');
SELECT insert_aprimoramento_2_circulo('Localização', 'Alcance Estendido (Área)', 'Área', 'Aumenta a área em um fator de 10.', '+5 PM');

-- MARCA DA OBEDIÊNCIA
SELECT insert_aprimoramento_2_circulo('Marca da Obediência', 'Duração Estendida (Duração)', 'Duração', 'Muda a duração para um dia. Se não estiver em combate, criatura só pode fazer teste de Vontade a cada hora. Requer 3º círculo.', '+3 PM', 'Requer 3º círculo');
SELECT insert_aprimoramento_2_circulo('Marca da Obediência', 'Marca Dolorosa (Dano)', 'Dano', 'Sempre que o alvo falhar no teste de Vontade, a marca causa 3d6 pontos de dano psíquico. Requer 3º círculo.', '+3 PM', 'Requer 3º círculo');

-- METAMORFOSE
SELECT insert_aprimoramento_2_circulo('Metamorfose', 'Sentidos Aguçados (Efeito Adicional - Forma)', 'Efeito Adicional', 'A forma escolhida recebe faro, visão na penumbra ou visão no escuro.', '+1 PM');
SELECT insert_aprimoramento_2_circulo('Metamorfose', 'Percepção às Cegas (Efeito Adicional - Forma)', 'Efeito Adicional', 'A forma escolhida recebe percepção às cegas. Requer 3º círculo.', '+3 PM', 'Requer 3º círculo');
SELECT insert_aprimoramento_2_circulo('Metamorfose', 'Alvo Criatura (Alcance / Alvo / Resistência)', 'Alvo', 'Muda alcance para toque, alvo 1 criatura, resistência Vontade anula.', '+3 PM');

-- MIASMA MEFÍTICO
SELECT insert_aprimoramento_2_circulo('Miasma Mefítico', 'Truque (Alcance / Área / Alvo / Duração / Resistência / Efeito Alterado / Comp. Material)', 'Truque', 'Muda alcance para toque, área para alvo 1 criatura (0 PV ou menos), duração instantânea, resistência Fortitude anula, comp. material (pó de ônix T$ 10). Vítima morre, +2 CD magias por 1 dia. (Imune a este truque por 1 dia se passar).', 'Custo total: 0 PM');
SELECT insert_aprimoramento_2_circulo('Miasma Mefítico', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano em +1d6.', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Miasma Mefítico', 'Dano de Trevas (Tipo de Dano)', 'Tipo de Dano', 'Muda o tipo do dano para trevas.', '+3 PM');

-- MENTE DIVINA
SELECT insert_aprimoramento_2_circulo('Mente Divina', 'Alvos Múltiplos (Alcance / Alvo)', 'Alvo', 'Muda o alcance para curto e o alvo para criaturas escolhidas.', '+3 PM');
SELECT insert_aprimoramento_2_circulo('Mente Divina', 'Fortalecimento Mental Completo (Efeito Alterado)', 'Efeito Alterado', 'Em vez do normal, o alvo recebe +2 nos três atributos mentais. Requer 3º círculo.', '+3 PM', 'Requer 3º círculo');

-- MONTARIA ARCANA
SELECT insert_aprimoramento_2_circulo('Montaria Arcana', 'Aura Aterradora (Efeito Adicional)', 'Efeito Adicional', 'Animais em alcance curto da montaria devem passar em Vontade ou ficam abalados (se falhar por 10+, apavorados).', '+1 PM');
SELECT insert_aprimoramento_2_circulo('Montaria Arcana', 'Vínculo Permanente (Duração / Penalidade PM)', 'Duração', 'Muda duração para permanente, adiciona penalidade de -3 PM.', '+3 PM');
SELECT insert_aprimoramento_2_circulo('Montaria Arcana', 'Aumento de Tamanho (Tamanho da Montaria)', 'Tamanho', 'Aumenta o tamanho da montaria em uma categoria (Enorme carrega 2, Colossal 6).', '+3 PM');

-- ORAÇÃO
SELECT insert_aprimoramento_2_circulo('Oração', 'Aumento de Bônus (Bônus)', 'Bônus', 'Aumenta os bônus em +1 (máximo limitado pelo círculo de magia).', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Oração', 'Aumento de Penalidade (Penalidade)', 'Penalidade', 'Aumenta as penalidades em –1 (máximo limitado pelo círculo de magia).', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Oração', 'Alcance Estendido (Alcance)', 'Alcance', 'Muda o alcance para médio. Requer 3º círculo.', '+7 PM', 'Requer 3º círculo');

-- PURIFICAÇÃO
SELECT insert_aprimoramento_2_circulo('Purificação', 'Cura Veneno (Efeito Adicional)', 'Efeito Adicional', 'Também recupera todos os PV perdidos por veneno.', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Purificação', 'Purificação Ampla (Efeito Adicional)', 'Efeito Adicional', 'Em vez de uma, remove todas as condições listadas.', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Purificação', 'Quebrar Maldição (Efeito Adicional)', 'Efeito Adicional', 'Também permite que o alvo solte qualquer item amaldiçoado (não remove a maldição do item).', '+3 PM');

-- RAIO SOLAR
SELECT insert_aprimoramento_2_circulo('Raio Solar', 'Truque (Duração / Resistência / Efeito Alterado)', 'Truque', 'Muda duração para cena, resistência nenhuma. Cria facho de luz que ilumina área. Pode mudar direção (ação livre).', 'Custo total: 0 PM');
SELECT insert_aprimoramento_2_circulo('Raio Solar', 'Aumento de Dano/Cura (Dano / Cura)', 'Dano', 'Aumenta o dano ou cura em +1d8 (ou +1d12 em mortos-vivos).', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Raio Solar', 'Cura Seletiva (Alvo / Efeito Alterado)', 'Efeito Alterado', 'Em vez do normal, criaturas vivas escolhidas na área curam 4d8 PV; o restante sofre dano.', '+3 PM');
SELECT insert_aprimoramento_2_circulo('Raio Solar', 'Cegueira Solar (Efeito Adicional)', 'Efeito Adicional', 'Criaturas que falhem na resistência ficam cegas por 1d4 rodadas.', '+3 PM');

-- REFÚGIO
SELECT insert_aprimoramento_2_circulo('Refúgio', 'Névoa Protetora (Efeito Adicional)', 'Efeito Adicional', 'Limites do domo são envoltos por fumaça escura, bloqueando visão/audição de fora e magias de adivinhação. Dentro se vê/ouve normalmente.', '+1 PM');
SELECT insert_aprimoramento_2_circulo('Refúgio', 'Cabana Confortável (Efeito Alterado)', 'Efeito Alterado', 'Cria cabana para 10 criaturas Médias. Descanso confortável. Paredes (RD 5, 200 PV), porta/janelas (RD 5, 15 PV, Tranca Arcana).', '+3 PM');

-- RELÂMPAGO
SELECT insert_aprimoramento_2_circulo('Relâmpago', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano em +2d6.', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Relâmpago', 'Relâmpagos Múltiplos (Área / Alvo)', 'Efeito Alterado', 'Muda área para alvo (criaturas escolhidas). Dispara vários relâmpagos (6d6 dano cada). Requer 3º círculo.', '+3 PM', 'Requer 3º círculo');

-- ROGAR MALDIÇÃO
SELECT insert_aprimoramento_2_circulo('Rogar Maldição', 'Efeitos Múltiplos (Efeito Adicional)', 'Efeito Adicional', 'Aumenta o número de efeitos que você pode escolher em +1. Requer 3º círculo.', '+3 PM', 'Requer 3º círculo');
SELECT insert_aprimoramento_2_circulo('Rogar Maldição', 'Maldição Permanente (Duração / Resistência)', 'Duração', 'Muda duração para permanente, resistência Fortitude parcial (se passar, efeito por 1 rodada). Requer 4º círculo.', '+7 PM', 'Requer 4º círculo');

-- RUNA DE PROTEÇÃO
SELECT insert_aprimoramento_2_circulo('Runa de Proteção', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano em +2d6.', '+1 PM');
SELECT insert_aprimoramento_2_circulo('Runa de Proteção', 'Runa Pessoal (Alvo / Alcance / Efeito Alterado)', 'Efeito Alterado', 'Muda alvo para "você", alcance "pessoal". Escreve runa no corpo com magia de 1º círculo. Ativa com condição, lança magia como reação. 1 runa/corpo.', '+1 PM');

-- SALTO DIMENSIONAL
SELECT insert_aprimoramento_2_circulo('Salto Dimensional', 'Alcance Médio (Alcance)', 'Alcance', 'Muda o alcance para médio.', '+1 PM');
SELECT insert_aprimoramento_2_circulo('Salto Dimensional', 'Salto em Grupo (Alvo)', 'Alvo', 'Muda alvo para você e uma criatura voluntária. Pode escolher este aprimoramento mais vezes (+1 alvo/vez), tocando todos os alvos.', '+1 PM');
SELECT insert_aprimoramento_2_circulo('Salto Dimensional', 'Esquiva Dimensional (Execução / Efeito Adicional)', 'Efeito Alterado', 'Muda execução para reação. +5 Defesa/Reflexos contra 1 ataque/efeito. Após resolução, salta para espaço adjacente.', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Salto Dimensional', 'Alcance Longo (Alcance)', 'Alcance', 'Muda o alcance para longo.', '+3 PM');

-- SERVOS INVISÍVEIS
SELECT insert_aprimoramento_2_circulo('Servos Invisíveis', 'Aumento de Servos (Quantidade)', 'Quantidade', 'Aumenta o número de servos conjurados em 1.', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Servos Invisíveis', 'Servos Habilidosos (Efeito Adicional)', 'Efeito Adicional', 'Servos passam automaticamente em teste de perícia (CD máx. = seu nível + 2/servo). Tempo da perícia. Requer 3º círculo.', '+3 PM', 'Requer 3º círculo');

-- SILÊNCIO
SELECT insert_aprimoramento_2_circulo('Silêncio', 'Silenciar Objeto (Alvo / Efeito Alterado)', 'Efeito Alterado', 'Muda alvo para 1 objeto. Objeto emana silêncio (3m raio). (Vontade anula se objeto de criatura involuntária).', '+1 PM');
SELECT insert_aprimoramento_2_circulo('Silêncio', 'Bolha Sonora (Duração / Efeito Alterado)', 'Efeito Alterado', 'Muda duração para cena. Nenhum som sai da área, mas dentro se pode falar/ouvir/lançar magias.', '+2 PM');

-- SOCO DE ARSENAL
SELECT insert_aprimoramento_2_circulo('Soco de Arsenal', 'Alcance Estendido (Alcance / Alvo / Duração / Resistência / Efeito Alterado)', 'Efeito Alterado', 'Muda alcance para pessoal, alvo você, duração cena, resistência nenhuma. Seu alcance natural aumenta em 3m.', '+1 PM');
SELECT insert_aprimoramento_2_circulo('Soco de Arsenal', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano em +1d6.', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Soco de Arsenal', 'Empurrão Maior (Efeito Adicional)', 'Efeito Adicional', 'Aumenta o empurrão em +3m.', '+4 PM');
SELECT insert_aprimoramento_2_circulo('Soco de Arsenal', 'Dano de Essência (Tipo de Dano)', 'Tipo de Dano', 'Muda o tipo do dano para essência.', '+5 PM');

-- SOPRO DAS UIVANTES
SELECT insert_aprimoramento_2_circulo('Sopro das Uivantes', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano de frio em +2d6.', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Sopro das Uivantes', 'Tamanho Aumentado (Alvo)', 'Alvo', 'Aumenta o tamanho máximo das criaturas afetadas em uma categoria. Requer 3º círculo.', '+3 PM', 'Requer 3º círculo');

-- SUSSURROS INSANOS
SELECT insert_aprimoramento_2_circulo('Sussurros Insanos', 'Alvos Múltiplos (Alvo)', 'Alvo', 'Aumenta o número de alvos em +1.', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Sussurros Insanos', 'Alvo Criatura (Alvo)', 'Alvo', 'Muda o alvo para 1 criatura.', '+3 PM');
SELECT insert_aprimoramento_2_circulo('Sussurros Insanos', 'Insanidade em Massa (Alvo)', 'Alvo', 'Muda o alvo para criaturas escolhidas. Requer 5º círculo.', '+12 PM', 'Requer 5º círculo');

-- TEMPESTADE DIVINA
SELECT insert_aprimoramento_2_circulo('Tempestade Divina', 'Raios (Efeito Adicional)', 'Efeito Adicional', '1x/rodada (ação padrão), faz raio cair em alvo na área (3d8 dano elétrico, Reflexos reduz à metade).', '+1 PM');
SELECT insert_aprimoramento_2_circulo('Tempestade Divina', 'Aumento Dano Raios (Dano)', 'Dano', 'Aumenta o dano de raios em +1d8.', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Tempestade Divina', 'Chuva Intensa (Efeito Adicional - Chuva)', 'Efeito Adicional', 'Se escolheu chuva: revela criaturas invisíveis; criaturas M ou menores ficam lentas; voadores caem (Atletismo evita).', '+3 PM');
SELECT insert_aprimoramento_2_circulo('Tempestade Divina', 'Granizo Pesado (Efeito Adicional / Dano - Granizo)', 'Efeito Adicional', 'Se escolheu granizo: muda o dano para 2d6 por rodada.', '+3 PM');
SELECT insert_aprimoramento_2_circulo('Tempestade Divina', 'Neve Congelante (Efeito Adicional / Dano - Neve)', 'Efeito Adicional', 'Se escolheu neve: criaturas na área sofrem 2d6 dano de frio no início de seus turnos.', '+3 PM');
SELECT insert_aprimoramento_2_circulo('Tempestade Divina', 'Área Aumentada (Área)', 'Área', 'Muda a área para cilindro com 90m de raio e 90m de altura.', '+3 PM');

-- TOQUE VAMPÍRICO
SELECT insert_aprimoramento_2_circulo('Toque Vampírico', 'Toque Certeiro (Resistência / Ataque Adicional)', 'Ataque Adicional', 'Muda resistência para nenhum. Como parte da execução, faz um ataque corpo a corpo; se acertar, causa dano do ataque e da magia, recupera PV.', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Toque Vampírico', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano em +2d6.', '+2 PM');
SELECT insert_aprimoramento_2_circulo('Toque Vampírico', 'Drenagem Contínua (Alcance / Alvo / Duração / Efeito Alterado)', 'Efeito Alterado', 'Muda alcance pessoal, alvo você, duração cena. 1x/rodada (ação padrão) toca 1 criatura (3d6 dano), recupera metade PV. Requer 3º círculo.', '+2 PM', 'Requer 3º círculo');

-- VELOCIDADE
SELECT insert_aprimoramento_2_circulo('Velocidade', 'Movimento Extra (Duração / Efeito Alterado)', 'Efeito Alterado', 'Muda duração para cena. Ação adicional é apenas de movimento. Só 1 ação adicional/turno de Velocidade.', '+0 PM');
SELECT insert_aprimoramento_2_circulo('Velocidade', 'Velocidade em Massa (Alvo)', 'Alvo', 'Muda o alvo para criaturas escolhidas no alcance. Requer 4º círculo.', '+7 PM', 'Requer 4º círculo');
SELECT insert_aprimoramento_2_circulo('Velocidade', 'Mente Acelerada (Alcance / Alvo / Efeito Adicional)', 'Efeito Adicional', 'Muda alcance pessoal, alvo você. Ação adicional pode ser usada para lançar magias e ativar engenhocas. Requer 4º círculo.', '+7 PM', 'Requer 4º círculo');

-- VESTIMENTA DA FÉ
SELECT insert_aprimoramento_2_circulo('Vestimenta da Fé', 'Proteção Adicional (Efeito Adicional)', 'Efeito Adicional', 'O objeto oferece o mesmo bônus em testes de resistência. Requer 3º círculo.', '+3 PM', 'Requer 3º círculo');
SELECT insert_aprimoramento_2_circulo('Vestimenta da Fé', 'Aumento de Bônus (Bônus)', 'Bônus', 'Aumenta o bônus em +1.', '+4 PM');
SELECT insert_aprimoramento_2_circulo('Vestimenta da Fé', 'Redução de Dano (RD)', 'RD', 'O objeto também oferece redução de dano 5. Requer 4º círculo.', '+7 PM', 'Requer 4º círculo');

-- VOZ DIVINA
SELECT insert_aprimoramento_2_circulo('Voz Divina', 'Falar com os Mortos (Efeito Adicional)', 'Efeito Adicional', 'Concede vida breve a cadáver para responder perguntas (conhecimento limitado, respostas curtas/enigmáticas). 1 vez/corpo. Não funciona se cabeça destruída.', '+1 PM');
SELECT insert_aprimoramento_2_circulo('Voz Divina', 'Falar com Plantas/Rochas (Efeito Adicional)', 'Efeito Adicional', 'Pode falar com plantas (normais/monstruosas) e rochas (percepção limitada, respostas simplórias).', '+1 PM');

-- Remover função auxiliar
DROP FUNCTION insert_aprimoramento_2_circulo(VARCHAR, VARCHAR, VARCHAR, TEXT, VARCHAR, TEXT);

-- ========================================
-- VERIFICAÇÃO FINAL
-- ========================================

SELECT 'MAGIAS DE 2º CÍRCULO INSERIDAS:' as resultado;
SELECT COUNT(*) as total_magias FROM magias WHERE circulo = 2;

SELECT 'APRIMORAMENTOS DE 2º CÍRCULO INSERIDOS:' as resultado;
SELECT COUNT(*) as total_aprimoramentos 
FROM magia_aprimoramentos ma
JOIN magias m ON ma.magia_id = m.id
WHERE m.circulo = 2;

SELECT 'MAGIAS POR TIPO (2º CÍRCULO):' as resultado;
SELECT tipo, COUNT(*) as quantidade 
FROM magias 
WHERE circulo = 2
GROUP BY tipo 
ORDER BY tipo;