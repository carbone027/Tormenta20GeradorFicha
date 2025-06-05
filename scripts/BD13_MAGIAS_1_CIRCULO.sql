-- ========================================
-- MAGIAS DE 1º CÍRCULO - TORMENTA20
-- Script para inserir todas as magias de 1º círculo e seus aprimoramentos
-- ========================================

-- ========================================
-- INSERIR MAGIAS DE 1º CÍRCULO
-- ========================================

INSERT INTO magias (nome, tipo, escola, circulo, custo_pm, execucao, alcance, duracao, descricao) VALUES

-- MAGIAS DIVINAS
('Abençoar Alimentos', 'Divina', 'Transmutação', 1, 1, 'Padrão', 'Toque', 'Instantânea', 'Purifica alimento e pode conceder PV ou PM temporários.'),
('Acalmar Animal', 'Divina', 'Encantamento', 1, 1, 'Padrão', 'Curto', 'Cena', 'Torna um animal prestativo e facilita Adestramento/Diplomacia contra ele.'),
('Bênção', 'Divina', 'Encantamento', 1, 1, 'Padrão', 'Curto', 'Cena', 'Aliados recebem +1 em testes de ataque e rolagens de dano. Anula Perdição.'),
('Caminhos da Natureza', 'Divina', 'Convocação', 1, 1, 'Padrão', 'Toque', 'Cena', 'Invoca espíritos da natureza que concedem bônus de deslocamento e ignoram terreno difícil.'),
('Comando', 'Divina', 'Encantamento', 1, 1, 'Padrão', 'Curto', 'Instantânea', 'Força o alvo (humanoide) a obedecer uma ordem simples por 1 rodada.'),
('Consagrar', 'Divina', 'Evocação', 1, 1, 'Padrão', 'Área', 'Cena', 'Abençoa a área, maximizando PV curados por luz e dano de luz em mortos-vivos.'),
('Controlar Plantas', 'Divina', 'Transmutação', 1, 1, 'Padrão', 'Área', 'Cena', 'Vegetação enreda criaturas na área, que se torna terreno difícil.'),
('Criar Elementos', 'Divina', 'Convocação', 1, 1, 'Padrão', 'Curto', 'Cena', 'Cria pequena porção de água (ou gelo), ar, fogo ou terra.'),
('Curar Ferimentos', 'Divina', 'Evocação', 1, 1, 'Padrão', 'Toque', 'Instantânea', 'Toque recupera 2d8+2 PV.'),
('Detectar Ameaças', 'Divina', 'Adivinhação', 1, 1, 'Padrão', 'Pessoal', 'Sustentada', 'Intuição sobre perigos (criaturas hostis, armadilhas) em esfera de 18m de raio.'),
('Despedaçar', 'Divina', 'Evocação', 1, 1, 'Padrão', 'Curto', 'Instantânea', 'Som alto causa 1d8+2 dano de impacto e atordoamento. Dobro do dano a construtos/objetos.'),
('Escudo da Fé', 'Divina', 'Abjuração', 1, 1, 'Reação', 'Curto', '1 turno', 'Alvo recebe +2 na Defesa por 1 turno.'),
('Infligir Ferimentos', 'Divina', 'Necromancia', 1, 1, 'Padrão', 'Toque', 'Instantânea', 'Toque causa 2d8+2 dano de trevas (cura mortos-vivos). Anula Curar Ferimentos.'),
('Orientação', 'Divina', 'Adivinhação', 1, 1, 'Padrão', 'Toque', 'Instantânea', 'Alvo rola dois dados e fica com o melhor no próximo teste de perícia.'),
('Perdição', 'Divina', 'Necromancia', 1, 1, 'Padrão', 'Curto', 'Cena', 'Alvos escolhidos sofrem –1 em ataque e dano. Anula Bênção.'),
('Profanar', 'Divina', 'Necromancia', 1, 1, 'Padrão', 'Área', 'Cena', 'Área é preenchida com energia negativa, maximizando dano de trevas e cura de mortos-vivos.'),
('Proteção Divina', 'Divina', 'Abjuração', 1, 1, 'Padrão', 'Toque', 'Cena', 'Alvo tocado recebe +2 em testes de resistência.'),
('Santuário', 'Divina', 'Abjuração', 1, 1, 'Padrão', 'Toque', 'Cena', 'Inimigos devem passar em Vontade para atacar o alvo. Magia se dissipa se alvo agir hostilmente.'),
('Suporte Ambiental', 'Divina', 'Abjuração', 1, 1, 'Padrão', 'Toque', 'Cena', 'Alvo fica imune a calor/frio extremos, respira na água/ar, não sufoca em fumaça.'),
('Tranquilidade', 'Divina', 'Encantamento', 1, 1, 'Padrão', 'Curto', 'Cena', 'Alvo (animal/humanoide) tem atitude mudada para indiferente, não pode atacar.'),

-- MAGIAS ARCANAS
('Adaga Mental', 'Arcana', 'Encantamento', 1, 1, 'Padrão', 'Curto', 'Instantânea', 'Causa dano psíquico e pode atordoar o alvo.'),
('Alarme', 'Arcana', 'Abjuração', 1, 1, 'Padrão', 'Longo', '8 horas', 'Avisa telepática ou sonoramente quando alguém invade uma área protegida.'),
('Armadura Arcana', 'Arcana', 'Abjuração', 1, 1, 'Padrão', 'Pessoal', 'Cena', 'Cria película protetora invisível, fornecendo +5 na Defesa.'),
('Área Escorregadia', 'Arcana', 'Convocação', 1, 1, 'Padrão', 'Curto', 'Cena', 'Recobre superfície com substância escorregadia, podendo derrubar criaturas.'),
('Concentração de Combate', 'Arcana', 'Adivinhação', 1, 1, 'Livre', 'Pessoal', '1 rodada', 'Ao atacar, rola dois dados e fica com o melhor por 1 rodada.'),
('Conjurar Monstro', 'Arcana', 'Convocação', 1, 1, 'Completa', 'Curto', 'Cena', 'Convoca um monstro Pequeno que ataca seus inimigos.'),
('Criar Ilusão', 'Arcana', 'Ilusão', 1, 1, 'Padrão', 'Médio', 'Cena', 'Cria uma ilusão visual ou sonora simples.'),
('Disfarce Ilusório', 'Arcana', 'Ilusão', 1, 1, 'Padrão', 'Pessoal', 'Cena', 'Muda a aparência do alvo (incluindo equipamento), +10 em Enganação para disfarce.'),
('Enfeitiçar', 'Arcana', 'Encantamento', 1, 1, 'Padrão', 'Curto', 'Cena', 'Alvo (humanoide) fica enfeitiçado e prestativo.'),
('Explosão de Chamas', 'Arcana', 'Evocação', 1, 1, 'Padrão', 'Pessoal', 'Instantânea', 'Cone de 6m causa 2d6 dano de fogo.'),
('Hipnotismo', 'Arcana', 'Encantamento', 1, 1, 'Padrão', 'Curto', 'Variável', 'Alvo (animal/humanoide) fica fascinado por 1d4 rodadas.'),
('Imagem Espelhada', 'Arcana', 'Ilusão', 1, 1, 'Padrão', 'Pessoal', 'Cena', 'Cria 3 cópias ilusórias, concedendo +6 na Defesa; bônus diminui com ataques errados.'),
('Leque Cromático', 'Arcana', 'Ilusão', 1, 1, 'Padrão', 'Pessoal', 'Instantânea', 'Cone de 4,5m de luzes deixa animais/humanoides atordoados por 1 rodada e ofuscados.'),
('Primor Atlético', 'Arcana', 'Transmutação', 1, 1, 'Padrão', 'Toque', 'Cena', 'Alvo recebe +9m deslocamento e +10 em Atletismo.'),
('Queda Suave', 'Arcana', 'Transmutação', 1, 1, 'Reação', 'Curto', 'Até pousar', 'Alvo cai lentamente (18m/rodada), sem dano por queda.'),
('Raio do Enfraquecimento', 'Arcana', 'Necromancia', 1, 1, 'Padrão', 'Curto', 'Cena', 'Raio púrpura deixa alvo fatigado; se passar na resistência, fica vulnerável.'),
('Seta Infalível de Talude', 'Arcana', 'Evocação', 1, 1, 'Padrão', 'Médio', 'Instantânea', 'Dispara 2 setas de energia (1d4+1 dano de essência cada) que acertam automaticamente.'),
('Sono', 'Arcana', 'Encantamento', 1, 1, 'Padrão', 'Curto', 'Variável', 'Alvo (humanoide) fica inconsciente/caído ou exausto/fatigado (em combate).'),
('Teia', 'Arcana', 'Convocação', 1, 1, 'Padrão', 'Curto', 'Cena', 'Cria teias pegajosas em cubo de 6m; criaturas ficam enredadas (Reflexos anula).'),
('Toque Chocante', 'Arcana', 'Evocação', 1, 1, 'Padrão', 'Toque', 'Instantânea', 'Toque causa 2d8+2 dano de eletricidade. Alvo com armadura de metal tem -5 na resistência.'),
('Tranca Arcana', 'Arcana', 'Abjuração', 1, 1, 'Padrão', 'Toque', 'Permanente', 'Tranca objeto (porta, baú), CD para abrir +10. Componente material: chave de bronze T$ 25.'),
('Transmutar Objetos', 'Arcana', 'Transmutação', 1, 1, 'Padrão', 'Toque', 'Cena', 'Transforma matéria bruta em objeto Pequeno ou menor (preço máx. T$ 25) por uma cena.'),
('Vitalidade Fantasma', 'Arcana', 'Necromancia', 1, 1, 'Padrão', 'Pessoal', 'Cena', 'Suga energia da terra, recebendo 2d10 PV temporários por uma cena.'),

-- MAGIAS UNIVERSAIS
('Arma Mágica', 'Universal', 'Transmutação', 1, 1, 'Padrão', 'Toque', 'Cena', 'Arma se torna mágica, recebe bônus em ataque/dano; pode usar atributo-chave na magia.'),
('Armamento da Natureza', 'Universal', 'Transmutação', 1, 1, 'Padrão', 'Toque', 'Cena', 'Fortalece arma primitiva/natural/desarmada, aumentando dano e tornando-a mágica.'),
('Aviso', 'Universal', 'Adivinhação', 1, 1, 'Movimento', 'Longo', 'Instantânea', 'Envia um alerta telepático (Alerta, Mensagem ou Localização) para uma criatura.'),
('Compreensão', 'Universal', 'Adivinhação', 1, 1, 'Padrão', 'Pessoal', 'Cena', 'Entende qualquer escrita/fala, ouve pensamentos de criatura tocada.'),
('Escuridão', 'Universal', 'Necromancia', 1, 1, 'Padrão', 'Curto', 'Cena', 'Objeto emana sombras (6m raio), camuflagem leve. Anula Luz.'),
('Luz', 'Universal', 'Evocação', 1, 1, 'Padrão', 'Curto', 'Cena', 'Objeto ilumina como tocha (6m raio). Anula Escuridão.'),
('Névoa', 'Universal', 'Convocação', 1, 1, 'Padrão', 'Curto', 'Cena', 'Cria nuvem de névoa (6m raio, 6m altura) que obscurece visão.'),
('Resistência a Energia', 'Universal', 'Abjuração', 1, 1, 'Padrão', 'Toque', 'Cena', 'Alvo recebe RD 10 contra um tipo de dano elemental ou energia (luz/trevas).'),
('Visão Mística', 'Universal', 'Adivinhação', 1, 1, 'Padrão', 'Pessoal', 'Cena', 'Olhos brilham azul, enxerga auras mágicas (alcance médio), descobre conjuradores.');

-- ========================================
-- INSERIR APRIMORAMENTOS DE 1º CÍRCULO
-- ========================================

-- Função auxiliar para inserir aprimoramentos
CREATE OR REPLACE FUNCTION insert_aprimoramento_1_circulo(
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

-- ABENÇOAR ALIMENTOS
SELECT insert_aprimoramento_1_circulo('Abençoar Alimentos', 'Truque (Custo Reduzido / Efeito Alterado)', 'Truque', 'Alimento é purificado (não causa nenhum efeito nocivo se estava estragado ou envenenado), mas não fornece bônus ao ser consumido.', 'Custo total: 0 PM');
SELECT insert_aprimoramento_1_circulo('Abençoar Alimentos', 'Aumento de Alvos (Alvo)', 'Aumento', 'Aumenta o número de alvos em +1.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Abençoar Alimentos', 'Criar Água Benta (Efeito Alterado / Duração / Comp. Material)', 'Efeito Alterado', 'Muda a duração para permanente, o alvo para 1 frasco com água e adiciona componente material (pó de prata no valor de T$ 5). Cria um frasco de água benta.', '+1 PM');

-- ACALMAR ANIMAL
SELECT insert_aprimoramento_1_circulo('Acalmar Animal', 'Alcance Médio (Alcance)', 'Alcance', 'Muda o alcance para médio.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Acalmar Animal', 'Alvo Monstro/Espírito (Int 1 ou 2) (Alvo)', 'Alvo', 'Muda o alvo para 1 monstro ou espírito com Inteligência 1 ou 2.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Acalmar Animal', 'Aumento de Alvos (Alvo)', 'Aumento', 'Aumenta o número de alvos em +1.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Acalmar Animal', 'Alvo Monstro/Espírito (Qualquer) (Alvo)', 'Alvo', 'Muda o alvo para 1 monstro ou espírito. Requer 3º círculo.', '+5 PM', 'Requer 3º círculo');

-- ADAGA MENTAL
SELECT insert_aprimoramento_1_circulo('Adaga Mental', 'Discrição e Invisibilidade (Componentes / Efeito Adicional)', 'Efeito Adicional', 'Lança sem gesticular/palavras (pode usar com armadura), adaga invisível. Se alvo falhar na resistência, não percebe a magia.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Adaga Mental', 'Rastreamento Mental (Duração / Efeito Adicional)', 'Efeito Adicional', 'Muda duração para um dia. Adaga "fincada" na mente do alvo permite saber direção e localização dele no mesmo mundo.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Adaga Mental', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano em +1d6.', '+2 PM');

-- ALARME
SELECT insert_aprimoramento_1_circulo('Alarme', 'Proteção Pessoal (Alcance)', 'Alcance', 'Muda o alcance para pessoal. A área é emanada a partir de você.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Alarme', 'Detecção Aprimorada (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, você percebe qualquer efeito de adivinhação na área ou que a atravesse. Pode tentar identificar o usuário.', '+5 PM');
SELECT insert_aprimoramento_1_circulo('Alarme', 'Alarme Atordoante (Duração / Efeito Adicional / Resistência)', 'Efeito Adicional', 'Muda a duração para um dia ou até ser descarregada e resistência para Vontade anula. Intruso que falhar na resistência fica paralisado por 1d4 rodadas. Bônus para rastrear.', '+9 PM');

-- ARMA MÁGICA
SELECT insert_aprimoramento_1_circulo('Arma Mágica', 'Aumento de Bônus (Bônus)', 'Bônus', 'Aumenta o bônus em +1 (bônus máximo limitado pelo círculo máximo de magia que você pode lançar).', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Arma Mágica', 'Dano Elemental (Dano Adicional)', 'Dano Adicional', 'A arma causa +1d6 de dano de ácido, eletricidade, fogo ou frio (escolhido ao lançar). Só pode ser usado uma vez.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Arma Mágica', 'Aumento Dano Elemental (Dano Adicional)', 'Dano Adicional', 'Muda o bônus de dano do aprimoramento acima para +2d6.', '+3 PM');

-- ARMAMENTO DA NATUREZA
SELECT insert_aprimoramento_1_circulo('Armamento da Natureza', 'Bônus de Ataque (Bônus)', 'Bônus', 'Fornece +1 nos testes de ataque com a arma.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Armamento da Natureza', 'Execução Rápida (Execução)', 'Execução', 'Muda a execução para ação de movimento.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Armamento da Natureza', 'Aumento de Bônus de Ataque (Bônus)', 'Bônus', 'Aumenta o bônus nos testes de ataque em +1.', '+3 PM');
SELECT insert_aprimoramento_1_circulo('Armamento da Natureza', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano da arma em mais um passo.', '+5 PM');

-- ARMADURA ARCANA
SELECT insert_aprimoramento_1_circulo('Armadura Arcana', 'Escudo Mágico (Execução / Duração / Efeito Adicional)', 'Efeito Adicional', 'Muda execução para reação, duração para instantânea. Cria escudo mágico que fornece +5 na Defesa contra o próximo ataque.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Armadura Arcana', 'Aumento de Bônus (Bônus)', 'Bônus', 'Aumenta o bônus na Defesa em +1.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Armadura Arcana', 'Duração Estendida (Duração)', 'Duração', 'Muda a duração para um dia.', '+2 PM');

-- ÁREA ESCORREGADIA
SELECT insert_aprimoramento_1_circulo('Área Escorregadia', 'Aumento de Área (Área)', 'Área', 'Aumenta a área em +1 quadrado de 1,5m.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Área Escorregadia', 'Dificuldade Aumentada (CD Acrobacia)', 'CD', 'Muda a CD dos testes de Acrobacia para 15.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Área Escorregadia', 'Dificuldade Muito Aumentada (CD Acrobacia)', 'CD', 'Muda a CD dos testes de Acrobacia para 20.', '+5 PM');

-- AVISO
SELECT insert_aprimoramento_1_circulo('Aviso', 'Alcance Estendido (Alcance)', 'Alcance', 'Aumenta o alcance em um fator de 10.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Aviso', 'Resposta (Efeito Adicional - Mensagem)', 'Efeito Adicional', 'Se escolher mensagem, o alvo pode enviar uma resposta de até 25 palavras até o fim do seu próximo turno.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Aviso', 'Localização Contínua (Duração - Localização)', 'Duração', 'Se escolher localização, muda a duração para cena. O alvo sabe onde você está mesmo que você mude de posição.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Aviso', 'Aumento de Alvos (Alvo)', 'Alvo', 'Aumenta o número de alvos em +1.', '+3 PM');

-- BÊNÇÃO
SELECT insert_aprimoramento_1_circulo('Bênção', 'Preservar Cadáver (Alvo / Duração)', 'Efeito Alterado', 'Muda o alvo para 1 cadáver e a duração para 1 semana. O cadáver não se decompõe nem pode ser transformado em morto-vivo.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Bênção', 'Aumento de Bônus (Bônus)', 'Bônus', 'Aumenta os bônus em +1 (bônus máximo limitado pelo círculo máximo de magia que você pode lançar).', '+2 PM');

-- CAMINHOS DA NATUREZA
SELECT insert_aprimoramento_1_circulo('Caminhos da Natureza', 'Truque (Alcance / Alvo / Efeito Alterado)', 'Truque', 'Muda alcance para pessoal, alvo para você. Recebe +5 em Sobrevivência para se orientar.', 'Custo total: 0 PM');
SELECT insert_aprimoramento_1_circulo('Caminhos da Natureza', 'Rastro Oculto (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, a CD para rastrear os alvos em terreno natural aumenta em +10.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Caminhos da Natureza', 'Aumento Bônus Deslocamento (Bônus)', 'Bônus', 'Aumenta o bônus de deslocamento em +3m.', '+2 PM');

-- COMANDO
SELECT insert_aprimoramento_1_circulo('Comando', 'Alvo Criatura (Alvo)', 'Alvo', 'Muda o alvo para 1 criatura.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Comando', 'Aumento de Alvos (Alvo)', 'Alvo', 'Aumenta a quantidade de alvos em +1.', '+2 PM');

-- COMPREENSÃO
SELECT insert_aprimoramento_1_circulo('Compreensão', 'Alcance Curto (Alcance)', 'Alcance', 'Muda o alcance para curto.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Compreensão', 'Compreensão Ampla (Alcance / Alvo)', 'Alcance', 'Muda o alcance para curto e o alvo para criaturas escolhidas. Entende todas, mas ouve pensamentos de uma por vez.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Compreensão', 'Sondar Mente (Alvo / Efeito Adicional)', 'Efeito Adicional', 'Muda o alvo para 1 criatura. Pode vasculhar pensamentos para extrair informações (Vontade anula). Requer 2º círculo.', '+2 PM', 'Requer 2º círculo');
SELECT insert_aprimoramento_1_circulo('Compreensão', 'Poliglota (Alcance / Alvo / Efeito Adicional)', 'Efeito Adicional', 'Muda o alcance para pessoal, alvo para você. Pode falar, entender e escrever qualquer idioma. Requer 3º círculo.', '+5 PM', 'Requer 3º círculo');

-- CONCENTRAÇÃO DE COMBATE
SELECT insert_aprimoramento_1_circulo('Concentração de Combate', 'Duração Estendida (Execução / Duração)', 'Duração', 'Muda execução para padrão, duração para cena. Requer 2º círculo.', '+2 PM', 'Requer 2º círculo');
SELECT insert_aprimoramento_1_circulo('Concentração de Combate', 'Defesa Intuitiva (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, ao ser atacado, inimigo rola dois dados e usa o pior. Requer 3º círculo.', '+5 PM', 'Requer 3º círculo');
SELECT insert_aprimoramento_1_circulo('Concentração de Combate', 'Aura de Combate (Execução / Alcance / Alvo / Duração)', 'Efeito Alterado', 'Muda execução para padrão, alcance para curto, alvo para criaturas escolhidas, duração para cena. Requer 4º círculo.', '+9 PM', 'Requer 4º círculo');
SELECT insert_aprimoramento_1_circulo('Concentração de Combate', 'Sexto Sentido (Execução / Duração / Efeito Adicional)', 'Efeito Adicional', 'Muda execução para padrão, duração para dia. Imune a surpresa/desprevenido, +10 Defesa/Reflexos. Requer 5º círculo.', '+14 PM', 'Requer 5º círculo');

-- CONJURAR MONSTRO
SELECT insert_aprimoramento_1_circulo('Conjurar Monstro', 'Movimento Especializado (Efeito Adicional - Monstro)', 'Efeito Adicional', 'O monstro ganha deslocamento de escalada ou natação igual ao seu deslocamento terrestre.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Conjurar Monstro', 'Aumento Deslocamento Monstro (Efeito Adicional - Monstro)', 'Efeito Adicional', 'Aumenta o deslocamento do monstro em +3m.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Conjurar Monstro', 'Dano Elemental Monstro (Efeito Adicional - Monstro)', 'Efeito Adicional', 'Muda o tipo de dano do ataque do monstro para ácido, fogo, frio ou eletricidade.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Conjurar Monstro', 'Aumento PV Monstro (Efeito Adicional - Monstro)', 'Efeito Adicional', 'Aumenta os PV do monstro em +10 para cada categoria de tamanho a partir de Pequeno.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Conjurar Monstro', 'Monstro Médio (Efeito Adicional - Monstro)', 'Efeito Adicional', 'Aumenta o tamanho do monstro para Médio (For 4, Des 3, 45 PV, desloc. 12m, dano 2d6+6).', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Conjurar Monstro', 'Resistência Monstro (Efeito Adicional - Monstro)', 'Efeito Adicional', 'O monstro ganha resistência 5 contra dois tipos de dano.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Conjurar Monstro', 'Arma de Sopro (Efeito Adicional - Monstro)', 'Efeito Adicional', 'O monstro ganha uma nova ordem: Arma de Sopro. Para dar essa ordem você gasta 1 PM, e faz o monstro causar o dobro de seu dano de ataque em um cone de 6m a partir de si.', '+4 PM');
SELECT insert_aprimoramento_1_circulo('Conjurar Monstro', 'Monstro Grande (Efeito Adicional - Monstro)', 'Efeito Adicional', 'Aumenta o tamanho do monstro para Grande (For 7, Des 2, 75 PV, desloc. 12m, dano 4d6+10, Alcance 3m). Requer 2º círculo.', '+5 PM', 'Requer 2º círculo');
SELECT insert_aprimoramento_1_circulo('Conjurar Monstro', 'Movimento de Voo (Efeito Adicional - Monstro)', 'Efeito Adicional', 'O monstro ganha deslocamento de voo igual ao dobro do deslocamento.', '+9 PM');
SELECT insert_aprimoramento_1_circulo('Conjurar Monstro', 'Imunidade Monstro (Efeito Adicional - Monstro)', 'Efeito Adicional', 'O monstro ganha imunidade contra dois tipos de dano.', '+9 PM');
SELECT insert_aprimoramento_1_circulo('Conjurar Monstro', 'Monstro Enorme (Efeito Adicional - Monstro)', 'Efeito Adicional', 'Aumenta o tamanho do monstro para Enorme (For 11, Des 1, 110 PV, desloc. 15m, dano 4d8+15, Alcance 4,5m). Requer 4º círculo.', '+9 PM', 'Requer 4º círculo');
SELECT insert_aprimoramento_1_circulo('Conjurar Monstro', 'Monstro Colossal (Efeito Adicional - Monstro)', 'Efeito Adicional', 'Aumenta o tamanho do monstro para Colossal (For 15, Des 0, 180 PV, desloc. 15m, dano 4d12+20, Alcance 9m). Requer 5º círculo.', '+14 PM', 'Requer 5º círculo');

-- CONSAGRAR
SELECT insert_aprimoramento_1_circulo('Consagrar', 'Penalidade Mortos-Vivos (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, mortos-vivos na área sofrem –2 em testes e Defesa.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Consagrar', 'Aumento Penalidade Mortos-Vivos (Efeito Adicional)', 'Efeito Adicional', 'Aumenta as penalidades para mortos-vivos em –1.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Consagrar', 'Duração Permanente (Execução / Duração / Comp. Material)', 'Duração', 'Muda execução para 1 hora, duração para permanente, adiciona componente material (incenso/óleos T$ 1.000). Requer 4º círculo.', '+9 PM', 'Requer 4º círculo');

-- CONTROLAR PLANTAS
SELECT insert_aprimoramento_1_circulo('Controlar Plantas', 'Truque (Área / Alvo / Resistência / Efeito Alterado)', 'Truque', 'Muda área para alvo 1 planta, resistência para nenhuma. Pode mover a planta como se animada (sem dano ou atrapalhar concentração).', 'Custo total: 0 PM');
SELECT insert_aprimoramento_1_circulo('Controlar Plantas', 'Podar Vegetação (Duração / Efeito Alterado)', 'Efeito Alterado', 'Muda duração para instantânea. Plantas diminuem, terreno difícil vira normal, sem camuflagem. Dissipa uso normal de Controlar Plantas.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Controlar Plantas', 'Imobilizar Adicional (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, criaturas que falhem na resistência também ficam imóveis.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Controlar Plantas', 'Comunicação com Plantas (Alcance / Alvo / Resistência / Efeito Adicional)', 'Efeito Adicional', 'Muda alcance para pessoal, alvo para você, resistência para nenhuma. Pode se comunicar com plantas (prestativa). Testes de Diplomacia com plantas. Requer 2º círculo.', '+2 PM', 'Requer 2º círculo');

-- CRIAR ELEMENTOS
SELECT insert_aprimoramento_1_circulo('Criar Elementos', 'Aumento de Quantidade (Efeito Adicional)', 'Efeito Adicional', 'Aumenta a quantidade do elemento em um passo (categoria de tamanho para água/terra, +1 quadrado 1,5m para ar/fogo).', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Criar Elementos', 'Arremessar Elemento (Alvo / Resistência / Efeito Adicional)', 'Efeito Adicional', 'Muda alvo para 1 criatura/objeto, resistência para Reflexos reduz à metade. Arremessa cubo de água/terra (2d4 impacto, dano aumenta com tamanho). Cubo se desfaz.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Criar Elementos', 'Aumento Dano Fogo (Dano Adicional - Fogo)', 'Dano Adicional', 'Se escolheu fogo, aumenta o dano inicial de cada chama em +1d6.', '+1 PM');

-- CRIAR ILUSÃO
SELECT insert_aprimoramento_1_circulo('Criar Ilusão', 'Movimento/Alteração (Duração / Efeito Adicional)', 'Efeito Adicional', 'Muda duração para sustentada. Pode mover imagem ou alterar som levemente (ação livre). Imagem/som persiste 1 rodada após parar de sustentar.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Criar Ilusão', 'Aumento de Efeito (Área)', 'Área', 'Aumenta o efeito da ilusão em +1 cubo de 1,5m.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Criar Ilusão', 'Imagem e Som Combinados (Efeito Adicional)', 'Efeito Adicional', 'Também pode criar ilusões de imagem e sons combinados.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Criar Ilusão', 'Sons Complexos (Efeito Adicional)', 'Efeito Adicional', 'Também pode criar sons complexos (volume de 5 pessoas por cubo). Pode alterar volume ou direção do som (ação livre).', '+1 PM');

-- CURAR FERIMENTOS
SELECT insert_aprimoramento_1_circulo('Curar Ferimentos', 'Truque (Alvo / Efeito Alterado / Resistência)', 'Truque', 'Muda alvo para 1 morto-vivo. Causa 1d8 dano de luz (Vontade reduz à metade).', 'Custo total: 0 PM');
SELECT insert_aprimoramento_1_circulo('Curar Ferimentos', 'Aumento de Cura (Cura)', 'Cura', 'Aumenta a cura em +1d8+1.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Curar Ferimentos', 'Remover Fadiga (Efeito Adicional)', 'Efeito Adicional', 'Também remove uma condição de fadiga do alvo.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Curar Ferimentos', 'Alcance Curto (Alcance)', 'Alcance', 'Muda o alcance para curto.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Curar Ferimentos', 'Cura em Área (Alcance / Alvo)', 'Efeito Alterado', 'Muda o alcance para curto e o alvo para criaturas escolhidas.', '+5 PM');

-- DETECTAR AMEAÇAS
SELECT insert_aprimoramento_1_circulo('Detectar Ameaças', 'Identificar Ameaça (Efeito Adicional)', 'Efeito Adicional', 'Descobre raça/espécie e poder da criatura detectada (aura).', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Detectar Ameaças', 'Sexto Sentido (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, não fica surpreso/desprevenido contra perigos detectados, +5 em testes de resistência contra armadilhas. Requer 2º círculo.', '+2 PM', 'Requer 2º círculo');

-- DESPEDAÇAR
SELECT insert_aprimoramento_1_circulo('Despedaçar', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano em +1d8+2.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Despedaçar', 'Alvo Objeto Médio (Alvo)', 'Alvo', 'Muda o alvo para objeto mundano Médio. Requer 2º círculo.', '+2 PM', 'Requer 2º círculo');

-- DISFARCE ILUSÓRIO
SELECT insert_aprimoramento_1_circulo('Disfarce Ilusório', 'Truque (Alcance / Alvo / Duração / Efeito Alterado)', 'Truque', 'Muda alcance para toque, alvo 1 criatura, duração 1 semana. Pequena alteração na aparência (nariz vermelho, flor na cabeça). Inofensiva, mas persistente.', 'Custo total: 0 PM');
SELECT insert_aprimoramento_1_circulo('Disfarce Ilusório', 'Alvo Objeto (Alcance / Alvo / Efeito Adicional)', 'Efeito Alterado', 'Muda alcance para curto, alvo 1 objeto. +10 em Enganação para falsificação.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Disfarce Ilusório', 'Alvo Criatura (Alcance / Alvo / Resistência)', 'Alvo', 'Muda alcance para curto, alvo 1 criatura. Criatura involuntária pode anular com Vontade.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Disfarce Ilusório', 'Ilusão Completa (Efeito Adicional)', 'Efeito Adicional', 'A ilusão inclui odores e sensações. Bônus em Enganação para disfarce muda para +20.', '+2 PM');

-- ENFEITIÇAR
SELECT insert_aprimoramento_1_circulo('Enfeitiçar', 'Sugestão (Efeito Alterado)', 'Efeito Alterado', 'Sugere uma ação aceitável ao alvo, que ele obedece. Pode ter condição específica. Magia termina após ação.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Enfeitiçar', 'Alvo Espírito/Monstro (Alvo)', 'Alvo', 'Muda o alvo para 1 espírito ou monstro. Requer 3º círculo.', '+5 PM', 'Requer 3º círculo');
SELECT insert_aprimoramento_1_circulo('Enfeitiçar', 'Enfeitiçar em Massa (Alvo)', 'Alvo', 'Afeta todos os alvos válidos dentro do alcance.', '+5 PM');

-- ESCUDO DA FÉ
SELECT insert_aprimoramento_1_circulo('Escudo da Fé', 'Duração Estendida (Execução / Alcance / Duração)', 'Duração', 'Muda execução para padrão, alcance para toque, duração para cena.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Escudo da Fé', 'Camuflagem Leve (Efeito Adicional)', 'Efeito Adicional', 'Também fornece ao alvo camuflagem leve contra ataques à distância.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Escudo da Fé', 'Aumento de Bônus (Bônus)', 'Bônus', 'Aumenta o bônus na Defesa em +1.', '+2 PM');

-- ESCURIDÃO
SELECT insert_aprimoramento_1_circulo('Escuridão', 'Aumento de Área (Área)', 'Área', 'Aumenta a área da escuridão em +1,5m de raio.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Escuridão', 'Escuridão Total (Efeito Alterado)', 'Efeito Alterado', 'Muda o efeito para fornecer camuflagem total por escuridão total. Bloqueia visão na área e através dela.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Escuridão', 'Cegueira (Alvo / Resistência)', 'Efeito Alterado', 'Muda alvo para 1 criatura, resistência para Fortitude parcial. Alvo fica cego pela cena; se passar, cego por 1 rodada. Requer 2º círculo.', '+2 PM', 'Requer 2º círculo');
SELECT insert_aprimoramento_1_circulo('Escuridão', 'Duração Estendida (Duração)', 'Duração', 'Muda a duração para um dia.', '+3 PM');

-- EXPLOSÃO DE CHAMAS
SELECT insert_aprimoramento_1_circulo('Explosão de Chamas', 'Truque (Alcance / Área / Alvo / Resistência / Efeito Alterado)', 'Truque', 'Muda alcance para curto, área para alvo 1 objeto. Pequena explosão acende vela/tocha/fogueira ou item inflamável (RD 0) fica em chamas (Reflexos anula).', 'Custo total: 0 PM');
SELECT insert_aprimoramento_1_circulo('Explosão de Chamas', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano em +1d6.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Explosão de Chamas', 'Em Chamas (Resistência / Efeito Adicional)', 'Efeito Adicional', 'Muda resistência para Reflexos parcial. Se falhar, criatura fica em chamas.', '+1 PM');

-- HIPNOTISMO
SELECT insert_aprimoramento_1_circulo('Hipnotismo', 'Truque (Duração / Efeito Alterado)', 'Truque', 'Muda duração para 1 rodada. Alvo fica pasmo (apenas uma vez por cena).', 'Custo total: 0 PM');
SELECT insert_aprimoramento_1_circulo('Hipnotismo', 'Enganar Resistência (Efeito Adicional)', 'Efeito Adicional', 'Alvos que passem na resistência não sabem que foram vítimas de uma magia.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Hipnotismo', 'Alvos Múltiplos (Alvo)', 'Alvo', 'Muda o alvo para animais ou humanoides escolhidos.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Hipnotismo', 'Duração Sustentada (Duração)', 'Duração', 'Muda a duração para sustentada.', '+2 PM');

-- IMAGEM ESPELHADA
SELECT insert_aprimoramento_1_circulo('Imagem Espelhada', 'Aumento de Cópias (Efeito Adicional / Bônus)', 'Efeito Adicional', 'Aumenta o número de cópias em +1 (e o bônus na Defesa em +2).', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Imagem Espelhada', 'Clarão Destrutivo (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, toda vez que uma cópia é destruída, emite um clarão de luz. Criatura que destruiu a cópia fica ofuscada por 1 rodada. Requer 2º círculo.', '+2 PM', 'Requer 2º círculo');

-- INFLIGIR FERIMENTOS
SELECT insert_aprimoramento_1_circulo('Infligir Ferimentos', 'Fraqueza Adicional (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, se falhar na resistência, o alvo fica fraco pela cena.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Infligir Ferimentos', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano em 1d8+1.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Infligir Ferimentos', 'Toque Certeiro (Resistência / Ataque Adicional)', 'Ataque Adicional', 'Muda resistência para nenhum. Como parte da execução, faz um ataque corpo a corpo; se acertar, causa dano do ataque e da magia.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Infligir Ferimentos', 'Infligir em Massa (Alcance / Alvo)', 'Efeito Alterado', 'Muda o alcance para curto e o alvo para criaturas escolhidas.', '+5 PM');

-- LEQUE CROMÁTICO
SELECT insert_aprimoramento_1_circulo('Leque Cromático', 'Vulnerabilidade Adicional (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, as criaturas afetadas ficam vulneráveis pela cena.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Leque Cromático', 'Alvo Expandido (Alvo)', 'Alvo', 'Também afeta espíritos e monstros na área. Requer 2º círculo.', '+2 PM', 'Requer 2º círculo');

-- LUZ
SELECT insert_aprimoramento_1_circulo('Luz', 'Aumento de Área (Área)', 'Área', 'Aumenta a área iluminada em +3m de raio.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Luz', 'Duração Estendida (Duração)', 'Duração', 'Muda a duração para um dia.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Luz', 'Duração Permanente (Duração / Comp. Material)', 'Duração', 'Muda duração para permanente, adiciona componente material (pó de rubi T$ 50). Não pode ser usado com outros aprimoramentos. Requer 2º círculo.', '+2 PM', 'Requer 2º círculo');

-- NÉVOA
SELECT insert_aprimoramento_1_circulo('Névoa', 'Névoa Aquática (Efeito Adicional)', 'Efeito Adicional', 'A magia também funciona sob a água, criando uma nuvem de tinta.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Névoa', 'Visão Seletiva (Alvo)', 'Efeito Adicional', 'Você pode escolher criaturas no alcance ao lançar a magia; elas enxergam através do efeito. Requer 2º círculo.', '+2 PM', 'Requer 2º círculo');
SELECT insert_aprimoramento_1_circulo('Névoa', 'Névoa Fétida (Efeito Adicional)', 'Efeito Adicional', 'Nuvem tem cheiro horrível. Criaturas dentro ou com faro em alcance curto devem passar em Fortitude ou ficam enjoadas por 1 rodada.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Névoa', 'Névoa Cáustica (Efeito Adicional / Dano)', 'Efeito Adicional', 'Nuvem esverdeada e cáustica. Criaturas dentro sofrem 2d4 dano de ácido no início de seus turnos.', '+2 PM');

-- ORIENTAÇÃO
SELECT insert_aprimoramento_1_circulo('Orientação', 'Orientação Duradoura (Duração / Efeito Alterado)', 'Efeito Alterado', 'Muda duração para cena. Escolha um atributo; alvo rola 2 dados em testes de perícia desse atributo (exceto ataque/resistência). Requer 2º círculo.', '+2 PM', 'Requer 2º círculo');
SELECT insert_aprimoramento_1_circulo('Orientação', 'Orientação Ampla (Efeito Alterado)', 'Efeito Alterado', 'Como acima, mas escolhe entre atributos físicos ou mentais. Requer 3º círculo.', '+5 PM', 'Requer 3º círculo');
SELECT insert_aprimoramento_1_circulo('Orientação', 'Orientação em Massa (Alvo)', 'Alvo', 'Muda o alvo para criaturas escolhidas. Requer 3º círculo.', '+5 PM', 'Requer 3º círculo');

-- PERDIÇÃO
SELECT insert_aprimoramento_1_circulo('Perdição', 'Aumento de Penalidade (Penalidade)', 'Penalidade', 'Aumenta as penalidades em –1 (penalidade máxima limitada pelo círculo máximo de magia que você pode lançar).', '+2 PM');

-- PRIMOR ATLÉTICO
SELECT insert_aprimoramento_1_circulo('Primor Atlético', 'Salto Aprimorado (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, o alvo recebe +20 em testes de Atletismo para saltar (total +30).', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Primor Atlético', 'Escalada Perfeita (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, o alvo pode escalar paredes e tetos sem testes de Atletismo (mãos livres ou uma se parado). Não fica desprevenido.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Primor Atlético', 'Ataque Acrobático (Execução / Alcance / Alvo / Duração / Efeito Adicional)', 'Efeito Alterado', 'Muda execução para movimento, alcance pessoal, alvo você, duração instantânea. Salta até alvo em alcance curto. Próximo ataque corpo a corpo tem bônus de investida e +1 dado de dano.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Primor Atlético', 'Maestria Física (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, ao fazer testes de perícias de For, Des ou Con, alvo rola 2 dados e usa o melhor (não afeta ataque/resistência). Requer 2º círculo.', '+3 PM', 'Requer 2º círculo');

-- PROFANAR
SELECT insert_aprimoramento_1_circulo('Profanar', 'Aura Profana (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, mortos-vivos na área recebem +2 em testes e Defesa.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Profanar', 'Aumento Aura Profana (Efeito Adicional)', 'Efeito Adicional', 'Aumenta os bônus para mortos-vivos em +1.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Profanar', 'Duração Permanente (Execução / Duração / Comp. Material)', 'Duração', 'Muda execução para 1 hora, duração para permanente, adiciona componente material (incenso/óleos T$ 1.000). Requer 4º círculo.', '+9 PM', 'Requer 4º círculo');

-- PROTEÇÃO DIVINA
SELECT insert_aprimoramento_1_circulo('Proteção Divina', 'Aumento de Bônus (Bônus)', 'Bônus', 'Aumenta o bônus concedido em +1.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Proteção Divina', 'Reação Protetora (Execução / Alcance / Duração / Efeito Adicional)', 'Efeito Alterado', 'Muda execução para reação, alcance curto, duração 1 rodada. Alvo recebe +5 no próximo teste de resistência.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Proteção Divina', 'Proteção em Área (Alvo)', 'Alvo', 'Muda alvo para área de esfera com 3m de raio. Todos aliados dentro recebem o bônus. Requer 2º círculo.', '+2 PM', 'Requer 2º círculo');
SELECT insert_aprimoramento_1_circulo('Proteção Divina', 'Imunidade Mental (Efeito Adicional)', 'Efeito Adicional', 'Torna o alvo imune a efeitos mentais e de medo. Requer 3º círculo.', '+5 PM', 'Requer 3º círculo');

-- QUEDA SUAVE
SELECT insert_aprimoramento_1_circulo('Queda Suave', 'Truque (Alvo / Efeito Alterado)', 'Truque', 'Muda alvo para objeto Minúsculo. Pode levitar o alvo até 4,5m em qualquer direção (ação de movimento).', 'Custo total: 0 PM');
SELECT insert_aprimoramento_1_circulo('Queda Suave', 'Alvos Múltiplos (Alvo)', 'Alvo', 'Muda o alvo para até 10 criaturas ou objetos adequados.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Queda Suave', 'Aumento de Tamanho (Alvo)', 'Alvo', 'Aumenta a categoria de tamanho do alvo em uma.', '+2 PM');

-- RAIO DO ENFRAQUECIMENTO
SELECT insert_aprimoramento_1_circulo('Raio do Enfraquecimento', 'Truque (Alcance / Resistência / Efeito Alterado)', 'Truque', 'Muda alcance para toque, resistência Fortitude anula. Mão brilha púrpura; ao tocar, alvo fica fatigado.', 'Custo total: 0 PM');
SELECT insert_aprimoramento_1_circulo('Raio do Enfraquecimento', 'Exaustão (Efeito Alterado)', 'Efeito Alterado', 'Em vez do normal, se falhar na resistência o alvo fica exausto. Se passar, fica fatigado. Requer 2º círculo.', '+2 PM', 'Requer 2º círculo');

-- RESISTÊNCIA A ENERGIA
SELECT insert_aprimoramento_1_circulo('Resistência a Energia', 'Aumento de RD (RD)', 'RD', 'Aumenta a redução de dano em +5.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Resistência a Energia', 'Duração Estendida (Duração)', 'Duração', 'Muda a duração para um dia. Requer 2º círculo.', '+2 PM', 'Requer 2º círculo');
SELECT insert_aprimoramento_1_circulo('Resistência a Energia', 'Alvos Múltiplos (Alcance / Alvo)', 'Alvo', 'Muda o alcance para curto e o alvo para criaturas escolhidas. Requer 3º círculo.', '+5 PM', 'Requer 3º círculo');
SELECT insert_aprimoramento_1_circulo('Resistência a Energia', 'Proteção Ampla (Efeito Alterado)', 'Efeito Alterado', 'Muda o efeito para redução de dano contra todos os tipos listados na magia. Requer 3º círculo.', '+5 PM', 'Requer 3º círculo');

-- SANTUÁRIO
SELECT insert_aprimoramento_1_circulo('Santuário', 'Discrição Animal (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, escolha um tipo de criatura (animal, construto ou morto-vivo). Você não pode ser percebido por criaturas não inteligentes desse tipo.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Santuário', 'Proteção de Área (Efeito Adicional)', 'Efeito Adicional', 'Também protege o alvo contra efeitos de área. Criatura que tente atacar área que inclua o alvo deve fazer Vontade; se falhar, perde a ação.', '+9 PM');

-- SETA INFALÍVEL DE TALUDE
SELECT insert_aprimoramento_1_circulo('Seta Infalível de Talude', 'Lanças de Energia (Dano)', 'Dano', 'Muda setas para lanças de energia que caem do céu (1d8+1 dano de essência cada). Requer 2º círculo.', '+2 PM', 'Requer 2º círculo');
SELECT insert_aprimoramento_1_circulo('Seta Infalível de Talude', 'Três Projéteis (Quantidade)', 'Quantidade', 'Muda o número de setas/lanças para três.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Seta Infalível de Talude', 'Cinco Projéteis (Quantidade)', 'Quantidade', 'Muda o número de setas/lanças para cinco. Requer 2º círculo.', '+4 PM', 'Requer 2º círculo');

-- SONO
SELECT insert_aprimoramento_1_circulo('Sono', 'Exaustão Prolongada (Duração)', 'Duração', 'Alvos que falhem na resistência ficam exaustos por 1d4+1 rodadas, em vez de apenas 1.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Sono', 'Alvo Criatura (Alvo)', 'Alvo', 'Muda o alvo para criatura.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Sono', 'Sono em Massa (Alvo)', 'Alvo', 'Afeta todos os alvos válidos a sua escolha dentro do alcance.', '+5 PM');

-- SUPORTE AMBIENTAL
SELECT insert_aprimoramento_1_circulo('Suporte Ambiental', 'Alvos Múltiplos (Alcance / Alvo)', 'Alvo', 'Muda o alcance para curto e o alvo para criaturas escolhidas.', '+5 PM');

-- TEIA
SELECT insert_aprimoramento_1_circulo('Teia', 'Imobilizar Adicional (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, criaturas que falhem na resistência também ficam imóveis.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Teia', 'Teia Persistente (Efeito Adicional)', 'Efeito Adicional', 'Além do normal, no início de seus turnos a magia afeta novamente qualquer criatura na área (novo teste de Reflexos). Requer 2º círculo.', '+2 PM', 'Requer 2º círculo');
SELECT insert_aprimoramento_1_circulo('Teia', 'Aumento de Área (Área)', 'Área', 'Aumenta a área em +1 cubo de 1,5m.', '+2 PM');

-- TOQUE CHOCANTE
SELECT insert_aprimoramento_1_circulo('Toque Chocante', 'Aumento de Dano (Dano)', 'Dano', 'Aumenta o dano em 1d8+1.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Toque Chocante', 'Toque Certeiro (Resistência / Ataque Adicional)', 'Ataque Adicional', 'Muda resistência para nenhum. Como parte da execução, faz um ataque corpo a corpo; se acertar, causa dano do ataque e da magia.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Toque Chocante', 'Eletrocussão em Área (Alcance / Alvo / Área)', 'Efeito Alterado', 'Muda alcance para pessoal, alvo para área: esfera com 6m de raio. Dispara raios pelas pontas dos dedos que afetam todas as criaturas na área.', '+2 PM');

-- TRANCA ARCANA
SELECT insert_aprimoramento_1_circulo('Tranca Arcana', 'Truque (Alcance / Efeito Alterado)', 'Truque', 'Muda alcance para curto. Abre ou fecha objeto Médio ou menor (não trancado).', 'Custo total: 0 PM');
SELECT insert_aprimoramento_1_circulo('Tranca Arcana', 'Abrir Fechaduras (Alcance / Duração / Efeito Alterado)', 'Efeito Alterado', 'Muda alcance para curto, duração instantânea. Abre portas/baús/janelas trancadas/barradas/protegidas por Tranca Arcana. Afrouxa grilhões, solta correntes.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Tranca Arcana', 'Aumento de Dificuldade (CD)', 'CD', 'Aumenta a CD para abrir o alvo em +5.', '+5 PM');

-- TRANQUILIDADE
SELECT insert_aprimoramento_1_circulo('Tranquilidade', 'Alvo Criatura (Alvo)', 'Alvo', 'Muda o alvo para 1 criatura.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Tranquilidade', 'Aumento de Alvos (Alvo)', 'Alvo', 'Aumenta o número de alvos em +1.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Tranquilidade', 'Tranquilidade em Massa (Alcance / Alvo)', 'Alvo', 'Muda o alcance para médio e o alvo para criaturas escolhidas. Requer 3º círculo.', '+5 PM', 'Requer 3º círculo');

-- TRANSMUTAR OBJETOS
SELECT insert_aprimoramento_1_circulo('Transmutar Objetos', 'Truque (Alvo / Duração / Efeito Alterado)', 'Truque', 'Muda alvo para objeto Minúsculo, duração instantânea. Altera propriedades (cor, limpeza), aquece/esfria/tempera, cura 1 PV do objeto. 1 vez/dia por objeto.', 'Custo total: 0 PM');
SELECT insert_aprimoramento_1_circulo('Transmutar Objetos', 'Curar Construto (Alcance / Alvo / Duração / Efeito Alterado)', 'Efeito Alterado', 'Muda alcance para toque, alvo 1 construto, duração instantânea. Cura 2d8 PV do alvo. Pode gastar +2 PM para +1d8 cura.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Transmutar Objetos', 'Aumento de Tamanho (Tamanho do Objeto)', 'Tamanho', 'Aumenta o limite de tamanho do objeto em uma categoria.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Transmutar Objetos', 'Aumento de Preço (Preço do Objeto)', 'Preço', 'Aumenta o preço máximo do objeto criado em x10 (ex: +3 PM por T$ 250).', '+3 PM por x10');

-- VISÃO MÍSTICA
SELECT insert_aprimoramento_1_circulo('Visão Mística', 'Visão no Escuro (Efeito Adicional)', 'Efeito Adicional', 'Recebe visão no escuro.', '+1 PM');
SELECT insert_aprimoramento_1_circulo('Visão Mística', 'Duração Estendida (Duração)', 'Duração', 'Muda a duração para um dia.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Visão Mística', 'Ver o Invisível (Efeito Adicional)', 'Efeito Adicional', 'Também pode enxergar objetos e criaturas invisíveis (formas translúcidas).', '+2 PM');

-- VITALIDADE FANTASMA
SELECT insert_aprimoramento_1_circulo('Vitalidade Fantasma', 'Aumento de PV Temporários (PV Temporários / Dano)', 'PV Temporários', 'Aumenta os PV temporários em +1d10. Se magia causa dano, aumenta dano em +1d10.', '+2 PM');
SELECT insert_aprimoramento_1_circulo('Vitalidade Fantasma', 'Drenar Vida em Área (Alvo / Área / Resistência / Efeito Adicional)', 'Efeito Alterado', 'Muda alvo para área: esfera 6m raio (você no centro), resistência Fortitude reduz à metade. Suga energia de criaturas vivas (1d10 dano de trevas), recebe PV temp. igual dano total. Requer 2º círculo.', '+5 PM', 'Requer 2º círculo');

-- Remover função auxiliar
DROP FUNCTION insert_aprimoramento_1_circulo(VARCHAR, VARCHAR, VARCHAR, TEXT, VARCHAR, TEXT);

-- ========================================
-- VERIFICAÇÃO FINAL
-- ========================================

SELECT 'MAGIAS DE 1º CÍRCULO INSERIDAS:' as resultado;
SELECT COUNT(*) as total_magias FROM magias WHERE circulo = 1;

SELECT 'APRIMORAMENTOS DE 1º CÍRCULO INSERIDOS:' as resultado;
SELECT COUNT(*) as total_aprimoramentos 
FROM magia_aprimoramentos ma
JOIN magias m ON ma.magia_id = m.id
WHERE m.circulo = 1;

SELECT 'MAGIAS POR TIPO (1º CÍRCULO):' as resultado;
SELECT tipo, COUNT(*) as quantidade 
FROM magias 
WHERE circulo = 1
GROUP BY tipo 
ORDER BY tipo;