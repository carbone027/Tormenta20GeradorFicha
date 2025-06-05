-- ========================================
-- MAGIAS DE 3º CÍRCULO - TORMENTA20
-- Script para inserir todas as magias de 3º círculo e seus aprimoramentos
-- ========================================

-- ========================================
-- INSERIR MAGIAS DE 3º CÍRCULO
-- ========================================

INSERT INTO magias (nome, tipo, escola, circulo, custo_pm, execucao, alcance, duracao, descricao) VALUES

-- MAGIAS ARCANAS
('Âncora Dimensional', 'Arcana', 'Abjuração', 3, 6, 'Padrão', 'Curto', 'Cena', 'Impede movimento planar do alvo (teletransporte, viagens astrais, incorpóreo).'),
('Enxame Rubro de Ichabod', 'Arcana', 'Convocação', 3, 6, 'Padrão', 'Curto', 'Sustentada', 'Invoca enxame Grande de demônios da Tormenta (4d12 dano de ácido/rodada). Sustentada.'),
('Erupção Glacial', 'Arcana', 'Evocação', 3, 6, 'Padrão', 'Longo', 'Instantânea', 'Estacas de gelo causam 4d6 corte + 4d6 frio e derrubam alvos em área.'),
('Ferver Sangue', 'Arcana', 'Necromancia', 3, 6, 'Padrão', 'Curto', 'Sustentada', 'Sangue do alvo ferve (4d8 dano de fogo/rodada, enjoado). Sustentada.'),
('Globo de Invulnerabilidade', 'Arcana', 'Abjuração', 3, 6, 'Padrão', 'Pessoal', 'Sustentada', 'Esfera (3m raio) protege contra magias de 2º círculo ou menor. Sustentada.'),
('Ilusão Lacerante', 'Arcana', 'Ilusão', 3, 6, 'Padrão', 'Curto', 'Sustentada', 'Cria ilusão de perigo mortal (cubo 9m) que causa 3d6 dano psíquico não letal. Sustentada.'),
('Lança Ígnea de Aleph', 'Arcana', 'Evocação', 3, 6, 'Padrão', 'Longo', 'Instantânea', 'Projétil de magma causa 4d6 fogo + 4d6 perfuração e deixa em chamas (2d6/rodada). Respingos atingem adjacentes.'),
('Manto de Sombras', 'Universal', 'Ilusão', 3, 6, 'Padrão', 'Pessoal', 'Sustentada', 'Cobre-se com manto de energia sombria, tornando-se incorpóreo e podendo teletransportar-se entre sombras. Sustentada.'),
('Miragem', 'Arcana', 'Ilusão', 3, 6, 'Padrão', 'Longo', '1 dia', 'Altera terreno em área (cubo 90m), incluindo sons e cheiros, por 1 dia.'),
('Muralha Elemental', 'Arcana', 'Evocação', 3, 6, 'Padrão', 'Médio', 'Cena', 'Cria muralha de Fogo (dano ao cruzar e proximidade) ou Gelo (bloqueia, RD, PV).'),
('Pele de Pedra', 'Universal', 'Transmutação', 3, 6, 'Padrão', 'Pessoal', 'Cena', 'Pele endurece, concedendo RD 5.'),
('Telecinesia', 'Arcana', 'Transmutação', 3, 6, 'Padrão', 'Médio', 'Sustentada', 'Move objetos/criaturas (Força Contínua) ou arremessa objetos (Empurrão Violento).'),
('Teletransporte', 'Arcana', 'Convocação', 3, 6, 'Padrão', 'Pessoal', 'Instantânea', 'Transporta até 5 criaturas voluntárias para local até 1.000km (teste de Misticismo).'),
('Tentáculos de Trevas', 'Arcana', 'Necromancia', 3, 6, 'Padrão', 'Curto', 'Sustentada', 'Tentáculos de treva em área (6m raio) agarram (teste Misticismo) e causam 4d6 dano de trevas.'),
('Transformação de Guerra', 'Arcana', 'Transmutação', 3, 6, 'Padrão', 'Pessoal', 'Sustentada', 'Ganha +6 Defesa/ataque/dano corpo a corpo, 30 PV temp. Não pode lançar magias. Proficiente em todas as armas. Sustentada.'),
('Voo', 'Arcana', 'Transmutação', 3, 6, 'Padrão', 'Pessoal', 'Cena', 'Concede deslocamento de voo 12m.'),

-- MAGIAS DIVINAS
('Anular a Luz', 'Divina', 'Necromancia', 3, 6, 'Padrão', 'Curto', 'Instantânea', 'Onda de escuridão dissipa magias (até 3º círculo), protege aliados (+4 Defesa), enjoa inimigos. Anula Dispersar as Trevas.'),
('Banimento', 'Divina', 'Abjuração', 3, 6, '1d3+1 Rodadas', 'Curto', 'Instantânea', 'Expulsa criatura não nativa para seu plano ou destrói morto-vivo (0 PV).'),
('Coluna de Chamas', 'Divina', 'Evocação', 3, 6, 'Padrão', 'Longo', 'Instantânea', 'Pilar de fogo sagrado (3m raio, 30m altura) causa 6d6 fogo + 6d6 luz.'),
('Comunhão com a Natureza', 'Divina', 'Adivinhação', 3, 6, 'Completa', 'Pessoal', 'Instantânea', 'Obtém informações e intuições sobre a região (1 dia de viagem), recebe 6d4 dados de auxílio para testes de perícia.'),
('Controlar Água', 'Divina', 'Transmutação', 3, 6, 'Padrão', 'Longo', 'Sustentada', 'Controla água em área (30m raio): Congelar, Derreter, Enchente, Evaporar, Partir.'),
('Controlar Terra', 'Divina', 'Transmutação', 3, 6, 'Padrão', 'Curto', 'Instantânea', 'Manipula terra/pedra/lama/argila/areia (9 cubos de 1,5m): Amolecer, Modelar, Solidificar.'),
('Despertar Consciência', 'Divina', 'Encantamento', 3, 6, 'Completa', 'Toque', 'Cena', 'Animal/planta tocado se torna parceiro veterano inteligente (Int -1, fala).'),
('Dispersar as Trevas', 'Divina', 'Evocação', 3, 6, 'Padrão', 'Curto', 'Instantânea', 'Luz dissipa magias (até 3º círculo), protege aliados (+4 Resist., RD 10 trevas), cega inimigos. Anula Anular a Luz.'),
('Heroísmo', 'Divina', 'Encantamento', 3, 6, 'Padrão', 'Toque', 'Cena', 'Alvo tocado fica imune a medo, ganha 40 PV temporários e +4 em ataque/dano contra inimigo mais forte.'),
('Missão Divina', 'Divina', 'Encantamento', 3, 6, 'Padrão', 'Curto', '1 semana', 'Obriga alvo a cumprir tarefa por 1 semana; se recusar, sofre penalidades cumulativas (-2/dia em testes).'),
('Poeira da Podridão', 'Divina', 'Necromancia', 3, 6, 'Padrão', 'Curto', 'Sustentada', 'Nuvem (6m raio) causa 2d8+8 dano de trevas/rodada e impede cura de PV se falhar em Fortitude.'),
('Potência Divina', 'Divina', 'Transmutação', 3, 6, 'Padrão', 'Pessoal', 'Sustentada', 'Aumenta tamanho, For +4, RD 10. Não pode lançar magias. Sustentada.'),
('Proteção contra Magia', 'Divina', 'Abjuração', 3, 6, 'Padrão', 'Toque', 'Cena', 'Alvo tocado recebe +5 em testes de resistência contra magias.'),
('Servo Divino', 'Divina', 'Convocação', 3, 6, 'Padrão', 'Curto', '1 hora', 'Invoca espírito para realizar tarefa (até 1h). Comp. Material: T$ 100.'),
('Sopro da Salvação', 'Divina', 'Evocação', 3, 6, 'Padrão', 'Pessoal', 'Instantânea', 'Cone de 9m de poeira reluzente cura aliados (2d8+4 PV) e remove 1 condição.'),
('Viagem Arbórea', 'Divina', 'Convocação', 3, 6, 'Completa', 'Toque', 'Instantânea', 'Entra em árvore adjacente; pode sair dela ou de qualquer outra árvore a até 1km (ação de movimento).'),

-- MAGIAS UNIVERSAIS
('Convocação Instantânea', 'Arcana', 'Convocação', 3, 6, 'Padrão', 'Ilimitado', 'Instantânea', 'Invoca 1 objeto (até 2 espaços) previamente marcado com runa (T$ 5) para sua mão, de qualquer lugar.'),
('Dificultar Detecção', 'Arcana', 'Abjuração', 3, 6, 'Padrão', 'Toque', 'Cena', 'Alvo (criatura/objeto) fica oculto contra detecção mágica (Vontade do conjurador anula).'),
('Imobilizar', 'Universal', 'Encantamento', 3, 6, 'Padrão', 'Curto', 'Cena', 'Alvo (humanoide/animal) fica paralisado; se passar na resistência, lento.'),
('Lendas e Histórias', 'Universal', 'Adivinhação', 3, 6, 'Padrão', 'Toque', 'Sustentada', 'Descobre informações sobre criatura/objeto/local tocado (habilidades, estatísticas, magias ativas). Sustentada.'),
('Selo de Mana', 'Universal', 'Encantamento', 3, 6, 'Padrão', 'Toque', 'Cena', 'Selo mágico na pele do alvo; se usar ação com PM, deve passar em Vontade ou ação falha (PM gastos).'),
('Servo Morto-Vivo', 'Universal', 'Necromancia', 3, 6, 'Completa', 'Toque', 'Permanente', 'Transforma cadáver (humanoide/animal/monstro) em esqueleto/zumbi parceiro iniciante. Comp. Material: ônix negro T$ 100.'),
('Vidência', 'Universal', 'Adivinhação', 3, 6, 'Completa', 'Ilimitado', 'Sustentada', 'Vê e ouve criatura escolhida e arredores (6m) através de superfície reflexiva. Sustentada.'),

-- MAGIAS ARCANAS ESPECIAIS
('Contato Extraplanar', 'Arcana', 'Adivinhação', 3, 6, 'Completa', 'Pessoal', 'Instantânea', 'Contata seres extraplanares, recebe 6d6 dados de auxílio para testes de perícia; rolar "6" suga 1 PM.');

-- ========================================
-- INSERIR APRIMORAMENTOS DE 3º CÍRCULO
-- ========================================

-- Função auxiliar para inserir aprimoramentos
CREATE OR REPLACE FUNCTION insert_aprimoramento_3_circulo(
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

-- ÂNCORA DIMENSIONAL
SELECT insert_aprimoramento_3_circulo('Âncora Dimensional', 'Área de Ancoragem (Alcance / Área / Alvo)', 'Área', 'Muda o alcance para médio, a área para esfera com 3m de raio e o alvo para criaturas escolhidas.', '+2 PM');
SELECT insert_aprimoramento_3_circulo('Âncora Dimensional', 'Fio de Energia (Efeito Alterado)', 'Efeito Alterado', 'Em vez do normal, cria fio de energia que prende o alvo a um ponto no espaço (até 3m). Fio tem 20 PV, RD 20 (pode ser dissipado por efeitos de libertação).', '+2 PM');
SELECT insert_aprimoramento_3_circulo('Âncora Dimensional', 'Corrente de Energia (Efeito Alterado - Fio)', 'Efeito Alterado', 'Como o Fio de Energia, mas cria uma corrente com 20 PV e RD 40.', '+4 PM');
SELECT insert_aprimoramento_3_circulo('Âncora Dimensional', 'Bloqueio de Área (Alvo / Área / Duração / Comp. Material)', 'Efeito Alterado', 'Muda alvo para área de cubo de 9m, duração permanente, adiciona comp. material (chave de esmeralda T$ 2.000). Nenhum movimento planar pode entrar/sair da área.', '+4 PM');
SELECT insert_aprimoramento_3_circulo('Âncora Dimensional', 'Ancoragem em Massa (Alcance / Área / Alvo / Efeito Alterado - Fio)', 'Efeito Alterado', 'Muda alcance para médio, área esfera 3m raio, alvo criaturas escolhidas. Cria Fio de Energia que prende todos os alvos ao centro da área.', '+9 PM');

-- ANULAR A LUZ
SELECT insert_aprimoramento_3_circulo('Anular a Luz', 'Aumento de Bônus Defesa (Bônus)', 'Bônus', 'Aumenta o bônus na Defesa em +1.', '+2 PM');
SELECT insert_aprimoramento_3_circulo('Anular a Luz', 'Dissipar Magia Aprimorado (Efeito Alterado)', 'Efeito Alterado', 'Muda as magias dissipadas para até 4º círculo. Requer 4º círculo.', '+4 PM', 'Requer 4º círculo');
SELECT insert_aprimoramento_3_circulo('Anular a Luz', 'Dissipar Magia Superior (Efeito Alterado)', 'Efeito Alterado', 'Muda as magias dissipadas para até 5º círculo. Requer 5º círculo.', '+9 PM', 'Requer 5º círculo');

-- BANIMENTO
SELECT insert_aprimoramento_3_circulo('Banimento', 'Sem Resistência (Resistência / Efeito Alterado)', 'Efeito Alterado', 'Muda resistência para nenhum. Em vez do normal, devolve automaticamente criatura conjurada para seu plano de origem.', '+0 PM');

-- COLUNA DE CHAMAS
SELECT insert_aprimoramento_3_circulo('Coluna de Chamas', 'Aumento Dano de Fogo (Dano)', 'Dano', 'Aumenta o dano de fogo em +1d6.', '+1 PM');
SELECT insert_aprimoramento_3_circulo('Coluna de Chamas', 'Aumento Dano de Luz (Dano)', 'Dano', 'Aumenta o dano de luz em +1d6.', '+1 PM');

-- COMUNHÃO COM A NATUREZA
SELECT insert_aprimoramento_3_circulo('Comunhão com a Natureza', 'Investigação Natural (Execução / Duração / Efeito Alterado)', 'Efeito Alterado', 'Muda execução para 1 minuto, duração instantânea. Descobre 1d4+1 informações (terreno, animais, vegetais, etc.) em região natural.', '+1 PM');
SELECT insert_aprimoramento_3_circulo('Comunhão com a Natureza', 'Aumento de Dados de Auxílio (Quantidade)', 'Quantidade', 'Aumenta o número de dados de auxílio em +2.', '+3 PM');
SELECT insert_aprimoramento_3_circulo('Comunhão com a Natureza', 'Dados de Auxílio Aprimorados (Tipo de Dado)', 'Tipo de Dado', 'Muda o tipo dos dados de auxílio para d6.', '+4 PM');
SELECT insert_aprimoramento_3_circulo('Comunhão com a Natureza', 'Dados de Auxílio Superiores (Tipo de Dado)', 'Tipo de Dado', 'Muda o tipo dos dados de auxílio para d8.', '+8 PM');

-- CONTATO EXTRAPLANAR
SELECT insert_aprimoramento_3_circulo('Contato Extraplanar', 'Aumento de Dados de Auxílio (Quantidade)', 'Quantidade', 'Aumenta o número de dados de auxílio em +1.', '+2 PM');
SELECT insert_aprimoramento_3_circulo('Contato Extraplanar', 'Dados de Auxílio Superiores (Tipo de Dado / Custo Adicional)', 'Tipo de Dado', 'Muda dados para d12. Rolar "12" suga 2 PM. Requer 4º círculo.', '+8 PM', 'Requer 4º círculo');

-- CONTROLAR ÁGUA
SELECT insert_aprimoramento_3_circulo('Controlar Água', 'Aumento de Dano (Dano - Evaporar)', 'Dano', 'Aumenta o dano em +2d8 (efeito Evaporar).', '+2 PM');

-- CONTROLAR TERRA
SELECT insert_aprimoramento_3_circulo('Controlar Terra', 'Aumento de Cubos (Área)', 'Área', 'Aumenta o número de cubos de 1,5m em +2.', '+1 PM');
SELECT insert_aprimoramento_3_circulo('Controlar Terra', 'Fusão com a Terra (Alcance / Alvo / Duração / Efeito Alterado)', 'Efeito Alterado', 'Muda alcance para pessoal, alvo você, duração 1 dia. Funde-se a superfície de pedra/terra/etc. Pode sair (ação livre). Se objeto destruído, sofre 10d6 dano.', '+1 PM');

-- CONVOCAÇÃO INSTANTÂNEA
SELECT insert_aprimoramento_3_circulo('Convocação Instantânea', 'Envio de Retorno (Efeito Adicional)', 'Efeito Adicional', 'Até 1h após lançar, pode gastar ação de movimento para enviar o objeto de volta ao local original.', '+1 PM');
SELECT insert_aprimoramento_3_circulo('Convocação Instantânea', 'Baú Extradimensional (Alvo / Duração / Efeito Alterado / Penalidade PM / Comp. Material)', 'Efeito Alterado', 'Muda alvo para 1 baú Médio, duração permanente, adiciona penalidade de -1 PM. Esconde baú (até 20 espaços) no Éter. Invoca/envia de volta (ação padrão). Comp. Material: baú (T$ 1.000) e miniatura (T$ 100).', '+1 PM');
SELECT insert_aprimoramento_3_circulo('Convocação Instantânea', 'Aumento de Alvos (Alvo)', 'Alvo', 'Aumenta o número de alvos em +1.', '+2 PM');
SELECT insert_aprimoramento_3_circulo('Convocação Instantânea', 'Alvo Maior (Alvo)', 'Alvo', 'Muda o alvo para 1 objeto de até 10 espaços. Objeto grande surge adjacente.', '+2 PM');

-- DESPERTAR CONSCIÊNCIA
SELECT insert_aprimoramento_3_circulo('Despertar Consciência', 'Animar Estátua (Alvo / Efeito Alterado)', 'Efeito Alterado', 'Muda alvo para 1 escultura mundana inanimada. Alvo ganha características de construto.', '+4 PM');
SELECT insert_aprimoramento_3_circulo('Despertar Consciência', 'Vínculo Permanente (Duração / Penalidade PM)', 'Duração', 'Muda duração para permanente, adiciona penalidade de -3 PM.', '+4 PM');

-- DIFICULTAR DETECÇÃO
SELECT insert_aprimoramento_3_circulo('Dificultar Detecção', 'Proteção de Área (Alvo / Área)', 'Efeito Alterado', 'Muda o alvo para área de cubo de 9m. Qualquer criatura/objeto na área recebe o efeito.', '+4 PM');
SELECT insert_aprimoramento_3_circulo('Dificultar Detecção', 'Duração Estendida (Duração)', 'Duração', 'Muda a duração para 1 semana.', '+4 PM');

-- DISPERSAR AS TREVAS
SELECT insert_aprimoramento_3_circulo('Dispersar as Trevas', 'Aumento de Bônus Resistência (Bônus)', 'Bônus', 'Aumenta o bônus nas resistências em +1.', '+2 PM');
SELECT insert_aprimoramento_3_circulo('Dispersar as Trevas', 'Proteção Individual (Alcance / Alvo / Duração / Efeito Alterado)', 'Efeito Alterado', 'Muda alcance para toque, alvo 1 criatura, duração cena. Alvo fica imune a efeitos de trevas.', '+4 PM');
SELECT insert_aprimoramento_3_circulo('Dispersar as Trevas', 'Dissipar Magia Aprimorado (Efeito Alterado)', 'Efeito Alterado', 'Muda o círculo máximo de magias dissipadas para 4º. Requer 4º círculo.', '+4 PM', 'Requer 4º círculo');

-- ENXAME RUBRO DE ICHABOD
SELECT insert_aprimoramento_3_circulo('Enxame Rubro de Ichabod', 'Agarrar (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, criatura que falhar no Reflexos fica agarrada. Pode se libertar (ação padrão, Acrobacia/Atletismo). Se mover enxame, criatura fica livre.', '+1 PM');
SELECT insert_aprimoramento_3_circulo('Enxame Rubro de Ichabod', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano em +1d12.', '+2 PM');
SELECT insert_aprimoramento_3_circulo('Enxame Rubro de Ichabod', 'Dano de Trevas (Tipo de Dano)', 'Tipo de Dano', 'Muda o dano para trevas.', '+2 PM');
SELECT insert_aprimoramento_3_circulo('Enxame Rubro de Ichabod', 'Enxame Enorme (Tamanho da Área)', 'Tamanho', 'O enxame vira Enorme (quadrado de 6m de lado).', '+3 PM');
SELECT insert_aprimoramento_3_circulo('Enxame Rubro de Ichabod', 'Enxame Voador (Movimento)', 'Movimento', 'O enxame ganha deslocamento de voo 18m e passa a ocupar um cubo.', '+3 PM');

-- ERUPÇÃO GLACIAL
SELECT insert_aprimoramento_3_circulo('Erupção Glacial', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano de frio em +2d6 e o dano de corte em +2d6.', '+3 PM');
SELECT insert_aprimoramento_3_circulo('Erupção Glacial', 'Tempestade de Granizo (Área / Duração / Efeito Alterado)', 'Efeito Alterado', 'Muda área para cilindro (6m raio/altura), duração sustentada. Causa 3d6 impacto + 3d6 frio/rodada (sem resistência). Camuflagem leve, piso escorregadio. Requer 4º círculo.', '+4 PM', 'Requer 4º círculo');

-- FERVER SANGUE
SELECT insert_aprimoramento_3_circulo('Ferver Sangue', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano em +1d8.', '+2 PM');
SELECT insert_aprimoramento_3_circulo('Ferver Sangue', 'Múltiplas Vítimas (Alvo)', 'Alvo', 'Muda alvo para criaturas escolhidas. Requer 5º círculo.', '+9 PM', 'Requer 5º círculo');

-- GLOBO DE INVULNERABILIDADE
SELECT insert_aprimoramento_3_circulo('Globo de Invulnerabilidade', 'Proteção Aprimorada (Efeito Alterado)', 'Efeito Alterado', 'Muda o efeito para afetar magias de até 3º círculo. Requer 4º círculo.', '+4 PM', 'Requer 4º círculo');
SELECT insert_aprimoramento_3_circulo('Globo de Invulnerabilidade', 'Proteção Superior (Efeito Alterado)', 'Efeito Alterado', 'Muda o efeito para afetar magias de até 4º círculo. Requer 5º círculo.', '+9 PM', 'Requer 5º círculo');

-- HEROÍSMO
SELECT insert_aprimoramento_3_circulo('Heroísmo', 'Aumento de Bônus (Bônus)', 'Bônus', 'Muda o bônus para +6.', '+2 PM');

-- ILUSÃO LACERANTE
SELECT insert_aprimoramento_3_circulo('Ilusão Lacerante', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano em +2d6.', '+3 PM');
SELECT insert_aprimoramento_3_circulo('Ilusão Lacerante', 'Ilusão Expansiva (Área)', 'Área', 'Muda a área para um cubo de 90m. Requer 4º círculo.', '+4 PM', 'Requer 4º círculo');

-- IMOBILIZAR
SELECT insert_aprimoramento_3_circulo('Imobilizar', 'Alvo Espírito (Alvo)', 'Alvo', 'Muda o alvo para 1 espírito.', '+1 PM');
SELECT insert_aprimoramento_3_circulo('Imobilizar', 'Alvos Múltiplos (Alvo)', 'Alvo', 'Aumenta o número de alvos em +1.', '+2 PM');
SELECT insert_aprimoramento_3_circulo('Imobilizar', 'Alvo Universal (Alvo)', 'Alvo', 'Muda o alvo para 1 criatura. Requer 4º círculo.', '+3 PM', 'Requer 4º círculo');

-- LANÇA ÍGNEA DE ALEPH
SELECT insert_aprimoramento_3_circulo('Lança Ígnea de Aleph', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano inicial em +2d6 e o dano do efeito em chamas em +1d6.', '+3 PM');
SELECT insert_aprimoramento_3_circulo('Lança Ígnea de Aleph', 'Dardos de Lava (Duração / Efeito Alterado)', 'Efeito Alterado', 'Muda duração para cena ou até descarregada. Cria 4 dardos de lava flutuantes. 1x/rodada (ação livre), dispara dardo com efeito normal da magia. Requer 4º círculo.', '+4 PM', 'Requer 4º círculo');

-- LENDAS E HISTÓRIAS
SELECT insert_aprimoramento_3_circulo('Lendas e Histórias', 'Vidência Remota (Execução / Alcance / Comp. Material)', 'Efeito Alterado', 'Muda execução para 1 dia, alcance ilimitado, adiciona comp. material (cuba de ouro com água e ingredientes T$ 1.000). Requer informação sobre o alvo.', '+4 PM');

-- MANTO DE SOMBRAS
SELECT insert_aprimoramento_3_circulo('Manto de Sombras', 'Alvo Criatura (Alcance / Alvo)', 'Alvo', 'Muda o alcance para toque e o alvo para 1 criatura. Requer 4º círculo.', '+4 PM', 'Requer 4º círculo');

-- MIRAGEM
SELECT insert_aprimoramento_3_circulo('Miragem', 'Alterar Aparência de Criaturas (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, pode alterar a aparência de criaturas escolhidas na área, como Disfarce Ilusório.', '+4 PM');
SELECT insert_aprimoramento_3_circulo('Miragem', 'Duração Permanente (Duração / Comp. Material)', 'Duração', 'Muda duração para permanente, adiciona comp. material (pó de diamante T$ 1.000). Requer 4º círculo.', '+9 PM', 'Requer 4º círculo');

-- MISSÃO DIVINA
SELECT insert_aprimoramento_3_circulo('Missão Divina', 'Marca da Transgressão (Alcance / Duração / Efeito Alterado / Penalidade PM)', 'Efeito Alterado', 'Muda alcance para toque, duração permanente, -1 PM. Inscreve marca na pele do alvo, ativada por ação específica (crime, etc.). Marca causa -2 cumulativo em testes. Purificação remove.', '+2 PM');
SELECT insert_aprimoramento_3_circulo('Missão Divina', 'Duração Estendida (Duração)', 'Duração', 'Aumenta a duração para 1 ano ou até ser descarregada.', '+4 PM');

-- MURALHA ELEMENTAL
SELECT insert_aprimoramento_3_circulo('Muralha Elemental', 'Aumento de Dano (Dano - Fogo)', 'Dano', 'Aumenta o dano por atravessar a muralha de fogo em +2d6.', '+2 PM');
SELECT insert_aprimoramento_3_circulo('Muralha Elemental', 'Aumento de Dimensões (Área)', 'Área', 'Aumenta o comprimento em +15m e altura em +3m (máx. 60m comprimento, 9m altura).', '+2 PM');
SELECT insert_aprimoramento_3_circulo('Muralha Elemental', 'Muralha de Essência (Duração / Efeito Alterado)', 'Efeito Alterado', 'Muda duração para sustentada, nova escolha Essência. Muralha invisível e indestrutível, bloqueia movimento (exceto teleporte) e dano, mas não magias de alvo/área. Requer 4º círculo.', '+4 PM', 'Requer 4º círculo');

-- PELE DE PEDRA
SELECT insert_aprimoramento_3_circulo('Pele de Pedra', 'Alvo Criatura (Alcance / Alvo)', 'Alvo', 'Muda o alcance para toque e o alvo para 1 criatura.', '+1 PM');
SELECT insert_aprimoramento_3_circulo('Pele de Pedra', 'Duração Estendida (Duração)', 'Duração', 'Muda a duração para um dia.', '+4 PM');
SELECT insert_aprimoramento_3_circulo('Pele de Pedra', 'Pele de Aço (RD)', 'RD', 'Sua pele ganha aspecto e dureza de aço. RD 10. Requer 4º círculo.', '+4 PM', 'Requer 4º círculo');
SELECT insert_aprimoramento_3_circulo('Pele de Pedra', 'Petrificação (Alcance / Alvo / Duração / Resistência / Efeito Alterado)', 'Efeito Alterado', 'Muda alcance para toque, alvo 1 criatura, duração 1d4 rodadas, Fortitude anula. Alvo e equipamento viram estátua inerte (RD 8). Requer 4º círculo.', '+4 PM', 'Requer 4º círculo');

-- POEIRA DA PODRIDÃO
SELECT insert_aprimoramento_3_circulo('Poeira da Podridão', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano em 1d8+4.', '+2 PM');

-- POTÊNCIA DIVINA
SELECT insert_aprimoramento_3_circulo('Potência Divina', 'Aumento Bônus Força (Bônus)', 'Bônus', 'Aumenta o bônus de Força em +1.', '+2 PM');
SELECT insert_aprimoramento_3_circulo('Potência Divina', 'Aumento RD (RD)', 'RD', 'Aumenta a RD em +5.', '+5 PM');
SELECT insert_aprimoramento_3_circulo('Potência Divina', 'Compartilhar Poder (Alcance / Alvo)', 'Alvo', 'Muda o alcance para toque e o alvo para 1 criatura. Magia falha se você e o alvo não forem devotos da mesma divindade.', '+2 PM');

-- PROTEÇÃO CONTRA MAGIA
SELECT insert_aprimoramento_3_circulo('Proteção contra Magia', 'Proteção Aprimorada (Bônus)', 'Bônus', 'Muda o bônus para +10. Requer 4º círculo.', '+4 PM', 'Requer 4º círculo');
SELECT insert_aprimoramento_3_circulo('Proteção contra Magia', 'Imunidade a Escola (Efeito Alterado)', 'Efeito Alterado', 'Em vez do normal, o alvo fica imune a uma escola de magia à sua escolha. Requer 4º Círculo.', '+4 PM', 'Requer 4º círculo');
SELECT insert_aprimoramento_3_circulo('Proteção contra Magia', 'Imunidade a Escolas Múltiplas (Efeito Alterado)', 'Efeito Alterado', 'Em vez do normal, o alvo fica imune a duas escolas de magia à sua escolha. Requer 5º Círculo.', '+9 PM', 'Requer 5º círculo');

-- SELO DE MANA
SELECT insert_aprimoramento_3_circulo('Selo de Mana', 'Selar Múltiplos Alvos (Alcance / Alvo)', 'Alvo', 'Muda o alcance para curto e o alvo para criaturas escolhidas dentro do alcance. Requer 4º círculo.', '+4 PM', 'Requer 4º círculo');

-- SERVO DIVINO
SELECT insert_aprimoramento_3_circulo('Servo Divino', 'Tarefa Prolongada (Duração / Comp. Material)', 'Duração', 'Muda duração para 1 dia. Tarefa até 1 dia. Custo do pagamento aumenta para T$ 500.', '+4 PM');
SELECT insert_aprimoramento_3_circulo('Servo Divino', 'Tarefa Extensa (Duração / Comp. Material)', 'Duração', 'Muda duração para 1 semana. Tarefa até 1 semana. Custo do pagamento aumenta para T$ 1.000.', '+9 PM');

-- SERVO MORTO-VIVO
SELECT insert_aprimoramento_3_circulo('Servo Morto-Vivo', 'Carniçal (Comp. Material / Tipo de Criatura / Nível do Parceiro)', 'Tipo', 'Muda comp. material para pó de ônix negro (T$ 500). Cria carniçal (parceiro veterano).', '+3 PM');
SELECT insert_aprimoramento_3_circulo('Servo Morto-Vivo', 'Sombra (Comp. Material / Tipo de Criatura / Nível do Parceiro)', 'Tipo', 'Muda comp. material para pó de ônix negro (T$ 500). Cria sombra (parceiro veterano).', '+3 PM');
SELECT insert_aprimoramento_3_circulo('Servo Morto-Vivo', 'Múmia (Comp. Material / Tipo de Criatura / Nível do Parceiro)', 'Tipo', 'Muda comp. material para ferramentas de embalsamar (T$ 1.000). Cria múmia (parceiro mestre). Requer 4º círculo.', '+7 PM', 'Requer 4º círculo');

-- SOPRO DA SALVAÇÃO
SELECT insert_aprimoramento_3_circulo('Sopro da Salvação', 'Aumento de Cura (Cura)', 'Cura', 'Aumenta a cura em +1d8+2.', '+2 PM');
SELECT insert_aprimoramento_3_circulo('Sopro da Salvação', 'Reverter Ferimentos Graves (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, se um aliado estiver com PV negativos, seus PV são levados a 0 e então a cura é aplicada.', '+4 PM');
SELECT insert_aprimoramento_3_circulo('Sopro da Salvação', 'Purificação Ampla (Efeito Adicional)', 'Efeito Adicional', 'Remove todas as condições listadas, em vez de apenas uma.', '+4 PM');

-- TELECINESIA
SELECT insert_aprimoramento_3_circulo('Telecinesia', 'Aumento de Tamanho/Peso (Alvo / Efeito Adicional)', 'Efeito Adicional', 'Aumenta o tamanho máximo da criatura em uma categoria ou dobra a quantidade de espaços do objeto.', '+3 PM');

-- TELETRANSPORTE
SELECT insert_aprimoramento_3_circulo('Teletransporte', 'Aumento de Alvos (Alvo)', 'Alvo', 'Aumenta o número de alvos em +5.', '+2 PM');
SELECT insert_aprimoramento_3_circulo('Teletransporte', 'Santuário (Efeito Alterado)', 'Efeito Alterado', 'Teletransporta para santuário pessoal (local familiar preparado, T$ 1.000). Sem limite de distância ou teste, mesmo plano. 1 santuário/vez.', '+2 PM');
SELECT insert_aprimoramento_3_circulo('Teletransporte', 'Círculo de Teletransporte (Execução / Duração / Penalidade PM / Efeito Alterado)', 'Efeito Alterado', 'Muda execução para completa, duração cena, -1 PM. Cria círculo 1,5m que transporta quem pisar para destino escolhido (conhecido, qualquer mundo, sem teste). Requer 5º círculo.', '+9 PM', 'Requer 5º círculo');

-- TENTÁCULOS DE TREVAS
SELECT insert_aprimoramento_3_circulo('Tentáculos de Trevas', 'Aumento de Área (Área)', 'Área', 'Aumenta o raio da área em +3m.', '+2 PM');
SELECT insert_aprimoramento_3_circulo('Tentáculos de Trevas', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano dos tentáculos em +2d6.', '+2 PM');

-- TRANSFORMAÇÃO DE GUERRA
SELECT insert_aprimoramento_3_circulo('Transformação de Guerra', 'Aumento de Bônus e PV (Bônus / PV Temporários)', 'Bônus', 'Aumenta os bônus na Defesa, ataque e dano em +1, e os PV temporários em +10.', '+2 PM');
SELECT insert_aprimoramento_3_circulo('Transformação de Guerra', 'Forma Metálica (Comp. Material / Efeito Adicional)', 'Efeito Adicional', 'Adiciona comp. material (barra de adamante T$ 100). Ganha RD 10 e imunidade a atordoamento, cansaço, encantamento, metabolismo, trevas, veneno; não precisa respirar.', '+2 PM');

-- VIAGEM ARBÓREA
SELECT insert_aprimoramento_3_circulo('Viagem Arbórea', 'Teletransporte em Grupo (Alcance / Alvo / Duração / Efeito Alterado)', 'Efeito Alterado', 'Muda alcance para toque, alvo até 5 criaturas, duração instantânea. Alvos entram em planta Média+ e saem em outra similar até 100km (direção/distância aprox.).', '+2 PM');

-- VIDÊNCIA (sem aprimoramentos listados no CSV)

-- VOO
SELECT insert_aprimoramento_3_circulo('Voo', 'Alvo Criatura (Alcance / Alvo)', 'Alvo', 'Muda o alcance para toque e o alvo para 1 criatura.', '+1 PM');
SELECT insert_aprimoramento_3_circulo('Voo', 'Duração Estendida (Duração)', 'Duração', 'Muda a duração para um dia. Requer 4º círculo.', '+4 PM', 'Requer 4º círculo');
SELECT insert_aprimoramento_3_circulo('Voo', 'Voo em Massa (Alcance / Alvo)', 'Alvo', 'Muda o alcance para curto e o alvo para até 10 criaturas. Requer 4º círculo.', '+4 PM', 'Requer 4º círculo');

-- Remover função auxiliar
DROP FUNCTION insert_aprimoramento_3_circulo(VARCHAR, VARCHAR, VARCHAR, TEXT, VARCHAR, TEXT);

-- ========================================
-- VERIFICAÇÃO FINAL
-- ========================================

SELECT 'MAGIAS DE 3º CÍRCULO INSERIDAS:' as resultado;
SELECT COUNT(*) as total_magias FROM magias WHERE circulo = 3;

SELECT 'APRIMORAMENTOS DE 3º CÍRCULO INSERIDOS:' as resultado;
SELECT COUNT(*) as total_aprimoramentos 
FROM magia_aprimoramentos ma
JOIN magias m ON ma.magia_id = m.id
WHERE m.circulo = 3;

SELECT 'MAGIAS POR TIPO (3º CÍRCULO):' as resultado;
SELECT tipo, COUNT(*) as quantidade 
FROM magias 
WHERE circulo = 3
GROUP BY tipo 
ORDER BY tipo;