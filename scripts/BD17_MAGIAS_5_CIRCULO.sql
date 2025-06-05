-- ========================================
-- MAGIAS DE 5º CÍRCULO - TORMENTA20
-- Script para inserir todas as magias de 5º círculo e seus aprimoramentos
-- ========================================

-- ========================================
-- INSERIR MAGIAS DE 5º CÍRCULO
-- ========================================

INSERT INTO magias (nome, tipo, escola, circulo, custo_pm, execucao, alcance, duracao, descricao) VALUES

-- MAGIAS ARCANAS
('Alterar Destino', 'Arcana', 'Adivinhação', 5, 15, 'Reação', 'Pessoal', 'Instantânea', 'Permite rolar novamente um teste de resistência seu com +10 ou um inimigo refazer um ataque contra você com -10.'),
('Aprisionamento', 'Arcana', 'Abjuração', 5, 15, 'Completa', 'Curto', 'Permanente', 'Cria prisão mágica (Acorrentamento, Contenção Mínima, Prisão Dimensional, Sepultamento ou Sono Eterno). Componente material T$ 1.000.'),
('Barragem Elemental de Vectorius', 'Arcana', 'Evocação', 5, 15, 'Padrão', 'Longo', 'Instantânea', 'Cria 4 esferas (ácido, eletricidade, fogo, frio) que explodem (12m raio) causando 6d6 dano do tipo e efeitos adicionais.'),
('Controlar o Tempo', 'Arcana', 'Transmutação', 5, 15, 'Padrão', 'Pessoal', 'Especial', 'Permite Congelar o tempo (3 rodadas para você), Saltar no tempo (você e até 5 outros, 1-24h para o futuro) ou Voltar no tempo (desfaz ações da rodada anterior).'),
('Deflagração de Mana', 'Arcana', 'Evocação', 5, 15, 'Completa', 'Pessoal', 'Instantânea', 'Explosão (15m raio) causa 150 dano de essência; itens mágicos viram mundanos (Fortitude parcial). Você não é afetado.'),
('Desejo', 'Arcana', 'Transmutação', 5, 15, 'Completa', 'Ilimitado', 'Instantânea', 'Altera a realidade: dissipa magia (até 4º círculo), transporta (até 10 criaturas), refaz teste recente. Com sacrifício de 2 PM: cria item mundano (até T$ 30.000), duplica magia (até 4º círculo), +1 atributo (1x/atributo).'),
('Engenho de Mana', 'Arcana', 'Abjuração', 5, 15, 'Padrão', 'Pessoal', 'Sustentada', 'Cria disco de energia flutuante que faz contramágica automática e absorve PM para seu uso. Sustentada.'),
('Legião', 'Arcana', 'Encantamento', 5, 15, 'Padrão', 'Médio', 'Sustentada', 'Domina mente de até 10 criaturas, que obedecem cegamente (exceto suicídio). Vontade anula a cada turno. Sustentada.'),
('Mata-Dragão', 'Arcana', 'Evocação', 5, 15, '2 Rodadas', 'Pessoal', 'Instantânea', 'Rajada de energia em cone de 30m causa 20d12 dano de essência. Se rolar "12" no dado de dano, causa +1d12.'),
('Possessão', 'Arcana', 'Encantamento', 5, 15, 'Padrão', 'Curto', '1 dia', 'Transfere sua consciência para corpo do alvo (Vontade anula), controlando-o. Seu corpo fica inconsciente. Dura 1 dia.'),
('Réquiem', 'Arcana', 'Ilusão', 5, 15, 'Padrão', 'Médio', 'Sustentada', 'Alvos ficam presos em realidade ilusória que se repete (Vontade anula). A cada turno, Vontade ou repete ações com -5 cumulativo. Sustentada.'),
('Semiplano', 'Arcana', 'Convocação', 5, 15, 'Completa', 'Pessoal', '1 dia', 'Cria dimensão particular (30m de lado) por 1 dia. Pode entrar/sair (ação padrão, 10 PM + 1 PM/criatura ou PM/objeto).'),
('Sombra Assassina', 'Arcana', 'Ilusão', 5, 15, 'Padrão', 'Médio', 'Até destruída', 'Cria duplicata ilusória sombria do alvo que o ataca com as mesmas estatísticas e rolagens. Desaparece se alvo passar em Vontade ou PV da sombra = 0.'),

-- MAGIAS DIVINAS
('Aura Divina', 'Divina', 'Abjuração', 5, 15, 'Padrão', 'Pessoal', 'Cena', 'Você e aliados devotos na aura (9m raio) ficam imunes a encantamento, +10 Defesa/resistência. Outros aliados +5. Inimigos podem ficar esmorecidos/debilitados/lentos.'),
('Fúria do Panteão', 'Divina', 'Evocação', 5, 15, 'Completa', 'Longo', 'Sustentada', 'Cria nuvem de tempestade (cubo 90m) com efeitos destrutivos (Nevasca, Raios, Siroco, Trovões) 1x/turno. Sustentada.'),
('Intervenção Divina', 'Divina', 'Convocação', 5, 15, 'Completa', 'Ilimitado', 'Instantânea', 'Pede à divindade para interceder: cura PV/condições (até 10 criaturas), dissipa magia (até 4º círculo). Com sacrifício de 2 PM: cria item mundano (até T$ 30.000), duplica magia (até 4º círculo), protege cidade, ressuscita criatura recém-morta, ou outro efeito (mestre decide).'),
('Lágrimas de Wynna', 'Divina', 'Abjuração', 5, 15, 'Padrão', 'Curto', 'Cena', 'Alvo perde habilidade de lançar magias arcanas até fim da cena (Vontade parcial: 1 rodada).'),
('Reanimação Impura', 'Divina', 'Necromancia', 5, 15, 'Completa', 'Toque', 'Permanente', 'Reanima criatura morta recentemente como zumbi sob seu comando. Tipo muda para morto-vivo, mantém memórias/habilidades.'),
('Segunda Chance', 'Divina', 'Evocação', 5, 15, 'Padrão', 'Toque', 'Instantânea', 'Alvo tocado recupera 200 PV e se cura de diversas condições.'),

-- MAGIAS UNIVERSAIS
('Buraco Negro', 'Universal', 'Convocação', 5, 15, 'Completa', 'Longo', '3 rodadas', 'Cria vácuo que suga criaturas e objetos (alcance longo) por 3 rodadas (Fortitude evita). Quem terminar turno no buraco é sugado.'),
('Chuva de Meteoros', 'Arcana', 'Convocação', 5, 15, 'Completa', 'Longo', 'Instantânea', 'Meteoros causam 15d6 impacto + 15d6 fogo em área (quadrado 18m), deixam caídos e agarrados. Só a céu aberto.'),
('Invulnerabilidade', 'Universal', 'Abjuração', 5, 15, 'Padrão', 'Pessoal', 'Cena', 'Cria barreira que concede imunidade a efeitos mentais OU físicos (incluindo várias condições).'),
('Palavra Primordial', 'Universal', 'Encantamento', 5, 15, 'Padrão', 'Curto', 'Instantânea', 'Pronuncia palavra da Criação causando Atordoar, Cegar ou Matar em 1 criatura com menos níveis que você.'),
('Projetar Consciência', 'Universal', 'Adivinhação', 5, 15, 'Padrão', 'Ilimitado', 'Sustentada', 'Consciência viaja para local/criatura conhecida (mesmo plano). Forma fantasmagórica invisível/incorpórea, voo 18m. Sustentada.'),
('Roubar a Alma', 'Universal', 'Necromancia', 5, 15, 'Padrão', 'Curto', 'Permanente', 'Arranca alma da vítima (Vontade parcial: abalado) e a prende em objeto (custo T$ 1.000/nível ou ND). Corpo fica inerte. Custo Adicional: sacrifício 1 PM.'),
('Toque da Morte', 'Universal', 'Necromancia', 5, 15, 'Padrão', 'Toque', 'Instantânea', 'Mão causa 10d8+10 dano de trevas. Se alvo < metade PV, Fortitude ou PV = -10.');

-- ========================================
-- INSERIR APRIMORAMENTOS DE 5º CÍRCULO
-- ========================================

-- Função auxiliar para inserir aprimoramentos
CREATE OR REPLACE FUNCTION insert_aprimoramento_5_circulo(
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

-- ALTERAR DESTINO (sem aprimoramentos listados no CSV)

-- APRISIONAMENTO (sem aprimoramentos listados no CSV)

-- AURA DIVINA
SELECT insert_aprimoramento_5_circulo('Aura Divina', 'Aumento de Bônus (Bônus)', 'Bônus', 'Aumenta os bônus na Defesa e em testes de resistência em +1.', '+2 PM');

-- BARRAGEM ELEMENTAL DE VECTORIUS
SELECT insert_aprimoramento_5_circulo('Barragem Elemental de Vectorius', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano de cada esfera em +2d6.', '+5 PM');
SELECT insert_aprimoramento_5_circulo('Barragem Elemental de Vectorius', 'Dano de Essência (Tipo de Dano)', 'Tipo de Dano', 'Muda o tipo de dano de todas as esferas para essência (mantém efeitos adicionais).', '+5 PM');

-- BURACO NEGRO
SELECT insert_aprimoramento_5_circulo('Buraco Negro', 'Imunidade Pessoal (Alvo)', 'Alvo', 'Você não é afetado pela magia.', '+5 PM');

-- CHUVA DE METEOROS
SELECT insert_aprimoramento_5_circulo('Chuva de Meteoros', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano em +2d6 de impacto e +2d6 de fogo.', '+2 PM');

-- CONTROLAR O TEMPO (sem aprimoramentos listados no CSV)

-- DEFLAGRAÇÃO DE MANA
SELECT insert_aprimoramento_5_circulo('Deflagração de Mana', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano em 10.', '+1 PM');
SELECT insert_aprimoramento_5_circulo('Deflagração de Mana', 'Seletividade (Alvo)', 'Alvo', 'Afeta apenas criaturas à sua escolha.', '+5 PM');

-- DESEJO (sem aprimoramentos listados no CSV)

-- ENGENHO DE MANA
SELECT insert_aprimoramento_5_circulo('Engenho de Mana', 'Acompanhar Conjurador (Efeito Alterado)', 'Efeito Alterado', 'Em vez de flutuar no ponto, o disco flutua atrás de você, mantendo-se adjacente.', '+1 PM');
SELECT insert_aprimoramento_5_circulo('Engenho de Mana', 'Duração Estendida (Duração)', 'Duração', 'Muda a duração para um dia.', '+4 PM');

-- FÚRIA DO PANTEÃO (sem aprimoramentos listados no CSV)

-- INTERVENÇÃO DIVINA (sem aprimoramentos listados no CSV)

-- INVULNERABILIDADE
SELECT insert_aprimoramento_5_circulo('Invulnerabilidade', 'Alvo Criatura (Alcance / Alvo)', 'Alvo', 'Muda o alcance para curto e o alvo para 1 criatura.', '+5 PM');

-- LÁGRIMAS DE WYNNA
SELECT insert_aprimoramento_5_circulo('Lágrimas de Wynna', 'Área de Supressão (Área / Alvo)', 'Área', 'Muda a área para esfera com 6m de raio e o alvo para criaturas escolhidas.', '+2 PM');
SELECT insert_aprimoramento_5_circulo('Lágrimas de Wynna', 'Supressão Permanente (Execução / Custo Adicional)', 'Execução', 'Muda execução para 1 dia, adiciona custo (sacrifício 1 PM). Alvo (Vontade anula) perde permanentemente hab. de lançar magias arcanas. Só poder mortal não reverte.', '+5 PM');

-- LEGIÃO
SELECT insert_aprimoramento_5_circulo('Legião', 'Aumento de Alvos (Alvo)', 'Alvo', 'Aumenta o número de alvos em +1.', '+1 PM');

-- MATA-DRAGÃO
SELECT insert_aprimoramento_5_circulo('Mata-Dragão', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano em 1d12.', '+1 PM');

-- PALAVRA PRIMORDIAL (sem aprimoramentos listados no CSV)

-- POSSESSÃO
SELECT insert_aprimoramento_5_circulo('Possessão', 'Absorver Habilidades (Efeito Adicional)', 'Efeito Adicional', 'Você ganha acesso às habilidades de raça e classe da criatura.', '+5 PM');
SELECT insert_aprimoramento_5_circulo('Possessão', 'Salto de Consciência (Efeito Adicional)', 'Efeito Adicional', 'Pode "saltar" de uma criatura possuída para outra (alcance curto, Vontade anula). Alvo anterior recobra consciência.', '+5 PM');
SELECT insert_aprimoramento_5_circulo('Possessão', 'Possessão Permanente (Duração / Efeito Alterado)', 'Duração', 'Muda duração para permanente, mas destrói seu corpo original. Criatura possuída testa Vontade/dia para retomar corpo. Se corpo morrer, pode tentar possuir outro (alcance curto).', '+5 PM');

-- PROJETAR CONSCIÊNCIA
SELECT insert_aprimoramento_5_circulo('Projetar Consciência', 'Lançar Magias à Distância (Efeito Adicional)', 'Efeito Adicional', 'Projeção pode lançar magias (sem comp. material, não sustentadas), afetando criaturas corpóreas.', '+10 PM');

-- REANIMAÇÃO IMPURA (sem aprimoramentos listados no CSV)

-- RÉQUIEM (sem aprimoramentos listados no CSV)

-- ROUBAR A ALMA
SELECT insert_aprimoramento_5_circulo('Roubar a Alma', 'Repositório de Mana (Efeito Adicional)', 'Efeito Adicional', 'O objeto que abriga a alma detém os mesmos PM totais que o alvo. Pode usar esses PM para lançar magias. Objeto recupera PM normalmente.', '+5 PM');
SELECT insert_aprimoramento_5_circulo('Roubar a Alma', 'Tomar Controle (Efeito Adicional)', 'Efeito Adicional', 'Como uma reação ao lançar esta magia, você possui o corpo sem alma do alvo, como na magia Possessão.', '+10 PM');

-- SEGUNDA CHANCE
SELECT insert_aprimoramento_5_circulo('Segunda Chance', 'Aumento de Cura (Cura)', 'Cura', 'Aumenta a cura em +20 PV.', '+1 PM');
SELECT insert_aprimoramento_5_circulo('Segunda Chance', 'Cura em Massa (Alcance / Alvo)', 'Alvo', 'Muda o alcance para curto e o alvo para até 5 criaturas.', '+2 PM');
SELECT insert_aprimoramento_5_circulo('Segunda Chance', 'Ressurreição Imediata (Alvo / Efeito Adicional)', 'Efeito Adicional', 'Muda o alvo para uma criatura que tenha morrido há até uma rodada. Esta magia pode curá-la (volta com 1 PV).', '+5 PM');

-- SEMIPLANO
SELECT insert_aprimoramento_5_circulo('Semiplano', 'Labirinto Dimensional (Alvo / Efeito Alterado)', 'Efeito Alterado', 'Cria semiplano labiríntico e expulsa 1 criatura para ele. Vítima testa Investigação/Sobrevivência para escapar.', '+2 PM');
SELECT insert_aprimoramento_5_circulo('Semiplano', 'Semiplano Permanente (Duração / Comp. Material)', 'Duração', 'Muda duração para permanente, adiciona comp. material (maquete T$ 5.000). Pode aumentar dimensões (+30m/lado) com novos lançamentos.', '+5 PM');

-- SOMBRA ASSASSINA
SELECT insert_aprimoramento_5_circulo('Sombra Assassina', 'Sombras Múltiplas (Alvo)', 'Alvo', 'Muda o alvo para criaturas escolhidas na área.', '+10 PM');

-- TOQUE DA MORTE
SELECT insert_aprimoramento_5_circulo('Toque da Morte', 'Alcance Curto (Alcance)', 'Alcance', 'Muda o alcance para curto. Dispara raio púrpura.', '+2 PM');
SELECT insert_aprimoramento_5_circulo('Toque da Morte', 'Morte em Massa (Alcance / Alvo)', 'Alvo', 'Muda o alcance para curto e o alvo para inimigos no alcance. Dispara raios púrpuras.', '+10 PM');

-- Remover função auxiliar
DROP FUNCTION insert_aprimoramento_5_circulo(VARCHAR, VARCHAR, VARCHAR, TEXT, VARCHAR, TEXT);

-- ========================================
-- VERIFICAÇÃO FINAL
-- ========================================

SELECT 'MAGIAS DE 5º CÍRCULO INSERIDAS:' as resultado;
SELECT COUNT(*) as total_magias FROM magias WHERE circulo = 5;

SELECT 'APRIMORAMENTOS DE 5º CÍRCULO INSERIDOS:' as resultado;
SELECT COUNT(*) as total_aprimoramentos 
FROM magia_aprimoramentos ma
JOIN magias m ON ma.magia_id = m.id
WHERE m.circulo = 5;

SELECT 'MAGIAS POR TIPO (5º CÍRCULO):' as resultado;
SELECT tipo, COUNT(*) as quantidade 
FROM magias 
WHERE circulo = 5
GROUP BY tipo 
ORDER BY tipo;