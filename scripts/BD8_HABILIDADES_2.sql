-- Script para inserir poderes específicos de cada classe
-- Baseado no documento classes.txt

-- ========================================
-- PODERES DO CAVALEIRO
-- ========================================

INSERT INTO poderes (nome, tipo, grupo, descricao, pre_requisitos, efeito_especial) VALUES

-- Poderes de Cavaleiro
('Armadura da Honra', 'classe_cavaleiro', 'cavaleiro', 'No início de cada cena, você recebe uma quantidade de pontos de vida temporários igual a seu nível + seu Carisma.', '', ''),
('Autoridade Feudal', 'classe_cavaleiro', 'cavaleiro', 'Você pode gastar uma hora e 2 PM para conclamar o povo a ajudá-lo. Essas pessoas contam como um parceiro iniciante até o fim da aventura.', '6º nível de cavaleiro', ''),
('Desprezar os Covardes', 'classe_cavaleiro', 'cavaleiro', 'Você recebe redução de dano 5 se estiver caído, desprevenido ou flanqueado.', '', ''),
('Escudeiro', 'classe_cavaleiro', 'cavaleiro', 'Você recebe os serviços de um escudeiro. Suas armas fornecem +1 em rolagens de dano e sua armadura concede +1 na Defesa.', '', ''),
('Especialização em Armadura', 'classe_cavaleiro', 'cavaleiro', 'Se estiver usando armadura pesada, você recebe redução de dano 5 (cumulativa com a RD de Bastião).', '12º nível de cavaleiro', ''),
('Estandarte', 'classe_cavaleiro', 'cavaleiro', 'No início de cada cena, você e aliados que vejam seu estandarte recebem PM temporários igual ao seu Carisma.', 'Título, 14º nível de cavaleiro', ''),
('Etiqueta', 'classe_cavaleiro', 'cavaleiro', 'Você recebe +2 Diplomacia ou Nobreza e pode gastar 1 PM para rolar novamente um teste dessas perícias.', '', ''),
('Investida Destruidora', 'classe_cavaleiro', 'cavaleiro', 'Quando faz investida, pode gastar 2 PM para causar +2d8 pontos de dano. Deve usar antes de rolar o ataque.', '', ''),
('Montaria Corajosa', 'classe_cavaleiro', 'cavaleiro', 'Sua montaria concede +1d6 em rolagens de dano corpo a corpo (cumulativo com qualquer bônus que ela já forneça).', 'Montaria', ''),
('Pajem', 'classe_cavaleiro', 'cavaleiro', 'Você recebe +2 em Diplomacia e sua condição de descanso é uma categoria acima do padrão. O pajem pode executar pequenas tarefas.', '', ''),
('Postura: Aríete Implacável', 'classe_cavaleiro', 'cavaleiro', 'Você aumenta o bônus de ataque em investidas em +2. Se fizer investida contra construto ou objeto, causa +2d8 de dano.', '', ''),
('Postura: Castigo de Ferro', 'classe_cavaleiro', 'cavaleiro', 'Sempre que um aliado adjacente sofrer um ataque corpo a corpo, você pode gastar 1 PM para fazer um ataque na criatura que o atacou.', '', ''),
('Postura: Foco de Batalha', 'classe_cavaleiro', 'cavaleiro', 'Sempre que um inimigo atacá-lo, você recebe 1 PM temporário (cumulativos, máximo igual ao seu nível por cena).', '', ''),
('Postura: Muralha Intransponível', 'classe_cavaleiro', 'cavaleiro', 'Você recebe +1 na Defesa e Reflexos. Quando sofre efeito que permite Reflexos para reduzir dano à metade, não sofre dano se passar.', '', ''),
('Postura: Provocação Petulante', 'classe_cavaleiro', 'cavaleiro', 'Inimigos que iniciarem seus turnos em alcance curto devem fazer teste de Vontade (CD Car) ou suas ações hostis devem ter você como alvo.', '', ''),
('Postura: Torre Inabalável', 'classe_cavaleiro', 'cavaleiro', 'Você fica imune a tentativas de tirá-lo do lugar, soma Constituição na Defesa e pode substituir Reflexos e Vontade por Fortitude.', '', ''),
('Solidez', 'classe_cavaleiro', 'cavaleiro', 'Se estiver usando um escudo, você soma o bônus na Defesa recebido pelo escudo em testes de resistência.', '', ''),
('Título', 'classe_cavaleiro', 'cavaleiro', 'Você adquire um título de nobreza. No início de cada aventura recebe 20 TO por nível ou a ajuda de um parceiro veterano.', 'Autoridade Feudal, 10º nível de cavaleiro', ''),
('Torre Armada', 'classe_cavaleiro', 'cavaleiro', 'Quando um inimigo erra um ataque contra você, pode gastar 1 PM para receber +5 em rolagens de dano contra esse inimigo até o fim do próximo turno.', '', '');

-- ========================================
-- PODERES DO CLÉRIGO
-- ========================================

INSERT INTO poderes (nome, tipo, grupo, descricao, pre_requisitos, efeito_especial) VALUES

-- Poderes de Clérigo
('Abençoar Arma', 'classe_clerigo', 'clerigo', 'Você pode gastar uma ação de movimento e 3 PM para infundir a arma preferida de sua divindade com poder divino. A arma emite luz e tem dano aumentado em um passo.', '', 'Efeito especial'),
('Autoridade Eclesiástica', 'classe_clerigo', 'clerigo', 'Você possui uma posição formal em uma igreja. Recebe +5 em Diplomacia ou Intimidação com devotos e paga metade do preço de itens alquímicos em templos.', '5º nível de clérigo, devoto de um deus maior', ''),
('Canalizar Energia Positiva/Negativa', 'classe_clerigo', 'clerigo', 'Você pode gastar uma ação padrão e PM para liberar uma onda de luz ou trevas que afeta criaturas em alcance curto. Para cada PM gasto, cura ou causa 1d6 pontos.', '', 'Efeito especial'),
('Canalizar Amplo', 'classe_clerigo', 'clerigo', 'Quando usa Canalizar Energia, pode gastar +2 PM para aumentar o alcance para médio.', 'Canalizar Energia Positiva ou Negativa', ''),
('Comunhão Vital', 'classe_clerigo', 'clerigo', 'Quando lança uma magia que cure uma criatura, pode pagar +2 PM para que outra criatura em alcance curto recupere metade dos PV da cura original.', '', 'Efeito especial'),
('Conhecimento Mágico', 'classe_clerigo', 'clerigo', 'Você aprende duas magias divinas de qualquer círculo que possa lançar. Você pode escolher este poder quantas vezes quiser.', '', ''),
('Expulsar/Comandar Mortos-Vivos', 'classe_clerigo', 'clerigo', 'Você pode gastar uma ação padrão e 3 PM para expulsar ou comandar todos os mortos-vivos em alcance curto. Efeitos variam por inteligência.', 'Canalizar Energia Positiva ou Negativa', 'Efeito especial'),
('Liturgia Mágica', 'classe_clerigo', 'clerigo', 'Você pode gastar uma ação de movimento para executar uma breve liturgia. A CD da sua próxima habilidade de clérigo aumenta em +2.', '', ''),
('Magia Sagrada/Profana', 'classe_clerigo', 'clerigo', 'Quando lança uma magia divina que causa dano, pode gastar +1 PM para mudar o tipo de dano para luz ou trevas.', '', ''),
('Mestre Celebrante', 'classe_clerigo', 'clerigo', 'O número de pessoas que você afeta com uma missa aumenta em dez vezes e os benefícios dobram.', 'qualquer poder de Missa, 12º nível de clérigo', ''),
('Missa: Bênção da Vida', 'classe_clerigo', 'clerigo', 'Os participantes recebem pontos de vida temporários igual ao seu nível + sua Sabedoria.', '', ''),
('Missa: Chamado às Armas', 'classe_clerigo', 'clerigo', 'Os participantes recebem +1 em testes de ataque e rolagens de dano.', '', ''),
('Missa: Elevação do Espírito', 'classe_clerigo', 'clerigo', 'Os participantes recebem pontos de mana temporários igual a sua Sabedoria.', '', ''),
('Missa: Escudo Divino', 'classe_clerigo', 'clerigo', 'Os participantes recebem +1 na Defesa e testes de resistência.', '', ''),
('Missa: Superar as Limitações', 'classe_clerigo', 'clerigo', 'Cada participante recebe +1d6 num único teste a sua escolha e pode usá-lo mesmo após rolar o dado.', '', ''),
('Prece de Combate', 'classe_clerigo', 'clerigo', 'Quando lança uma magia divina com tempo de conjuração de uma ação padrão em si mesmo, pode gastar +2 PM para lançá-la como ação de movimento.', '', ''),
('Símbolo Sagrado Energizado', 'classe_clerigo', 'clerigo', 'Você pode gastar uma ação de movimento e 1 PM para energizar seu símbolo sagrado. Enquanto empunhá-lo, o custo de suas magias divinas diminui em 1 PM.', '', 'Efeito especial');

-- ========================================
-- PODERES DO DRUIDA
-- ========================================

INSERT INTO poderes (nome, tipo, grupo, descricao, pre_requisitos, efeito_especial) VALUES

-- Poderes de Druida
('Aspecto do Inverno', 'classe_druida', 'druida', 'Você aprende uma magia de convocação ou evocação de qualquer círculo. Recebe redução de frio 5 e suas magias de frio causam +1 ponto de dano por dado.', '', ''),
('Aspecto do Outono', 'classe_druida', 'druida', 'Você aprende uma magia de necromancia de qualquer círculo. Pode gastar 1 PM para impor penalidade de –2 nos testes de resistência de inimigos em alcance curto.', '', ''),
('Aspecto da Primavera', 'classe_druida', 'druida', 'Você aprende uma magia de encantamento ou ilusão de qualquer círculo. Escolha magias igual ao seu Carisma que terão custo reduzido em −1 PM.', '', ''),
('Aspecto do Verão', 'classe_druida', 'druida', 'Você aprende uma magia de transmutação de qualquer círculo. Pode gastar 1 PM para cobrir uma arma com chamas (+1d6 fogo, +1 PM temporário por acerto).', '', 'Efeito especial'),
('Companheiro Animal', 'classe_druida', 'druida', 'Você recebe um companheiro animal. Pode escolher este poder várias vezes para companheiros diferentes.', 'Car 1, treinado em Adestramento', ''),
('Companheiro Animal Aprimorado', 'classe_druida', 'druida', 'Escolha um de seus companheiros animais. Ele recebe um segundo tipo, ganhando os bônus adicionais.', 'Companheiro Animal, 6º nível de druida', ''),
('Companheiro Animal Lendário', 'classe_druida', 'druida', 'Escolha um de seus companheiros animais. Esse animal passa a dobrar os bônus concedidos de seu tipo original.', 'Companheiro Animal, 18º nível de druida', ''),
('Companheiro Animal Mágico', 'classe_druida', 'druida', 'Escolha um de seus companheiros animais. Ele recebe um segundo tipo entre adepto, destruidor, magivocador ou médico.', 'Companheiro Animal, 8º nível de druida', ''),
('Coração da Selva', 'classe_druida', 'druida', 'A CD para resistir a seus efeitos de veneno aumenta em +2 e estes efeitos causam +1 de perda de vida por dado.', '', ''),
('Espírito dos Equinócios', 'classe_druida', 'druida', 'Você pode gastar 4 PM para ficar em equilíbrio com o mundo. Até o final da cena, quando rola um dado, pode rolar novamente qualquer resultado 1.', 'Aspecto da Primavera, Aspecto do Outono, 10º nível de druida', 'Efeito especial'),
('Espírito dos Solstícios', 'classe_druida', 'druida', 'Quando lança uma magia, pode gastar +4 PM para maximizar os efeitos numéricos variáveis dela (sem rolar dados).', 'Aspecto do Inverno, Aspecto do Verão, 10º nível de druida', ''),
('Força dos Penhascos', 'classe_druida', 'druida', 'Você recebe +2 em Fortitude. Quando sofre dano em contato com solo/pedra, pode gastar PM (limitado por Sabedoria) para reduzir o dano em 10 por PM.', '4º nível de druida', ''),
('Forma Primal', 'classe_druida', 'druida', 'Quando usa Forma Selvagem, pode se transformar em uma fera primal, recebendo benefícios de dois tipos de animais.', '18º nível de druida', ''),
('Forma Selvagem', 'classe_druida', 'druida', 'Você pode se transformar em animais: Ágil, Feroz, Resistente, Sorrateira ou Veloz. Cada forma tem benefícios específicos.', '', 'Efeito especial'),
('Forma Selvagem Aprimorada', 'classe_druida', 'druida', 'Quando usa Forma Selvagem, pode gastar 6 PM ao todo para assumir uma forma aprimorada com benefícios maiores.', 'Forma Selvagem, 6º nível de druida', 'Efeito especial'),
('Forma Selvagem Superior', 'classe_druida', 'druida', 'Quando usa Forma Selvagem, pode gastar 10 PM ao todo para assumir uma forma superior com benefícios máximos.', 'Forma Selvagem Aprimorada, 12º nível de druida', 'Efeito especial'),
('Liberdade da Pradaria', 'classe_druida', 'druida', 'Você recebe +2 em Reflexos. Se estiver ao ar livre, sempre que lança uma magia, pode gastar 1 PM para aumentar o alcance dela em um passo.', '', ''),
('Magia Natural', 'classe_druida', 'druida', 'Em forma selvagem, você pode lançar magias e empunhar catalisadores e esotéricos.', 'Forma Selvagem', ''),
('Presas Afiadas', 'classe_druida', 'druida', 'A margem de ameaça de suas armas naturais aumenta em +2.', '', ''),
('Segredos da Natureza', 'classe_druida', 'druida', 'Você aprende duas magias de qualquer círculo que possa lançar. Devem pertencer às escolas que você sabe usar. Pode escolher várias vezes.', '', ''),
('Tranquilidade dos Lagos', 'classe_druida', 'druida', 'Você recebe +2 em Vontade. Se estiver portando água, uma vez por rodada, pode pagar 1 PM para refazer um teste de resistência.', '', '');

-- ========================================
-- PODERES DO GUERREIRO
-- ========================================

INSERT INTO poderes (nome, tipo, grupo, descricao, pre_requisitos, efeito_especial) VALUES

-- Poderes de Guerreiro
('Ambidestria', 'classe_guerreiro', 'guerreiro', 'Se estiver empunhando duas armas (uma leve) e fizer agredir, pode fazer dois ataques, mas sofre –2 em todos os testes até o próximo turno.', 'Des 2', ''),
('Arqueiro', 'classe_guerreiro', 'guerreiro', 'Se estiver usando uma arma de ataque à distância, você soma sua Sabedoria em rolagens de dano (limitado pelo nível).', 'Sab 1', ''),
('Ataque Reflexo', 'classe_guerreiro', 'guerreiro', 'Se um alvo em alcance ficar desprevenido ou se mover para fora do seu alcance, pode gastar 1 PM para fazer um ataque contra esse alvo.', 'Des 1', ''),
('Bater e Correr', 'classe_guerreiro', 'guerreiro', 'Quando faz investida, pode continuar se movendo após o ataque. Se gastar 2 PM, pode fazer investida sobre terreno difícil sem penalidade na Defesa.', '', ''),
('Destruidor', 'classe_guerreiro', 'guerreiro', 'Quando causa dano com uma arma corpo a corpo de duas mãos, pode rolar novamente qualquer resultado 1 ou 2 da rolagem de dano da arma.', 'For 1', ''),
('Esgrimista', 'classe_guerreiro', 'guerreiro', 'Quando usa uma arma corpo a corpo leve ou ágil, você soma sua Inteligência em rolagens de dano (limitado pelo nível).', 'Int 1', ''),
('Especialização em Arma', 'classe_guerreiro', 'guerreiro', 'Escolha uma arma. Você recebe +2 em rolagens de dano com essa arma. Pode escolher várias vezes para armas diferentes.', '', ''),
('Especialização em Armadura', 'classe_guerreiro', 'guerreiro', 'Você recebe redução de dano 5 se estiver usando uma armadura pesada.', '12º nível de guerreiro', ''),
('Golpe de Raspão', 'classe_guerreiro', 'guerreiro', 'Uma vez por rodada, quando erra um ataque, pode gastar 2 PM para causar metade do dano (ignorando efeitos que se aplicariam caso acertasse).', '', ''),
('Golpe Demolidor', 'classe_guerreiro', 'guerreiro', 'Quando usa a manobra quebrar ou ataca um objeto, pode gastar 2 PM para ignorar a redução de dano dele.', '', ''),
('Golpe Pessoal', 'classe_guerreiro', 'guerreiro', 'Você constrói uma técnica única escolhendo efeitos de uma lista. Cada efeito tem um custo em PM. Só pode ser usado com uma arma específica.', '5º nível de guerreiro', ''),
('Ímpeto', 'classe_guerreiro', 'guerreiro', 'Você pode gastar 1 PM para aumentar seu deslocamento em +6m por uma rodada.', '', ''),
('Mestre em Arma', 'classe_guerreiro', 'guerreiro', 'Escolha uma arma. Com ela, seu dano aumenta um passo e pode gastar 2 PM para rolar novamente um teste de ataque.', 'Especialização em Arma com a arma escolhida, 12º nível de guerreiro', ''),
('Planejamento Marcial', 'classe_guerreiro', 'guerreiro', 'Uma vez por dia, pode gastar uma hora e 3 PM para escolher um poder de guerreiro ou combate cujos pré-requisitos cumpra até o próximo dia.', 'treinado em Guerra, 10º nível de guerreiro', ''),
('Romper Resistências', 'classe_guerreiro', 'guerreiro', 'Quando faz um Ataque Especial, pode gastar 1 PM adicional para ignorar 10 pontos de redução de dano.', '', ''),
('Solidez', 'classe_guerreiro', 'guerreiro', 'Se estiver usando um escudo, você aplica o bônus na Defesa recebido pelo escudo em testes de resistência.', '', ''),
('Tornado de Dor', 'classe_guerreiro', 'guerreiro', 'Você pode gastar uma ação padrão e 2 PM para fazer um ataque contra cada inimigo em seu alcance com bônus cumulativo de +2 para cada acerto.', '6º nível de guerreiro', ''),
('Valentão', 'classe_guerreiro', 'guerreiro', 'Você recebe +2 em testes de ataque e rolagens de dano contra oponentes caídos, desprevenidos, flanqueados ou indefesos.', '', '');

-- ========================================
-- PODERES DO INVENTOR
-- ========================================

INSERT INTO poderes (nome, tipo, grupo, descricao, pre_requisitos, efeito_especial) VALUES

-- Poderes de Inventor
('Agite Antes de Usar', 'classe_inventor', 'inventor', 'Quando usa um preparado alquímico que cause dano, pode gastar PM (limitado por Inteligência) para causar dados extras de dano do mesmo tipo.', 'treinado em Ofício (alquimista)', ''),
('Ajuste de Mira', 'classe_inventor', 'inventor', 'Você pode gastar uma ação padrão e PM (limitado por Inteligência) para aprimorar uma arma de ataque à distância, recebendo +1 em rolagens de dano por PM.', 'Balística', ''),
('Alquimista de Batalha', 'classe_inventor', 'inventor', 'Quando usa um preparado alquímico ou poção que cause dano, você soma sua Inteligência na rolagem de dano.', 'Alquimista Iniciado', ''),
('Alquimista Iniciado', 'classe_inventor', 'inventor', 'Você recebe um livro de fórmulas e pode fabricar poções com fórmulas de 1º e 2º círculos.', 'Int 1, Sab 1, treinado em Ofício (alquimista)', ''),
('Armeiro', 'classe_inventor', 'inventor', 'Você recebe proficiência com armas marciais corpo a corpo. Quando empunha uma arma corpo a corpo, pode usar Inteligência em vez de Força nos testes de ataque e rolagens de dano.', 'treinado em Luta e Ofício (armeiro)', ''),
('Ativação Rápida', 'classe_inventor', 'inventor', 'Ao ativar uma engenhoca com ação padrão, pode pagar 2 PM para ativá-la com ação de movimento.', 'Engenhoqueiro, 7º nível de inventor', ''),
('Autômato', 'classe_inventor', 'inventor', 'Você fabrica um autômato que é um parceiro iniciante de um tipo a sua escolha. Evolui para veterano no 7º nível e mestre no 15º.', 'Engenhoqueiro', ''),
('Autômato Prototipado', 'classe_inventor', 'inventor', 'Você pode gastar uma ação padrão e 2 PM para ativar uma melhoria experimental em seu autômato. Role 1d6 para o resultado.', 'Autômato', ''),
('Balística', 'classe_inventor', 'inventor', 'Você recebe proficiência com armas marciais de ataque à distância ou armas de fogo. Pode usar Inteligência em vez de Destreza nos testes de ataque.', 'treinado em Pontaria e Ofício (armeiro)', ''),
('Blindagem', 'classe_inventor', 'inventor', 'Você pode usar sua Inteligência na Defesa quando usa armadura pesada. Não pode somar Destreza neste caso.', 'Couraceiro, 8º nível de inventor', ''),
('Cano Raiado', 'classe_inventor', 'inventor', 'Quando usa uma arma de disparo feita por você mesmo, ela recebe +1 na margem de ameaça.', 'Balística, 5º nível de inventor', ''),
('Catalisador Instável', 'classe_inventor', 'inventor', 'Você pode gastar uma ação completa e 3 PM para fabricar um preparado alquímico instantaneamente. Custo reduzido à metade, mas dura só até o fim da cena.', 'Alquimista Iniciado', ''),
('Chutes e Palavrões', 'classe_inventor', 'inventor', 'Uma vez por rodada, pode pagar 1 PM para repetir um teste de Ofício (engenhoqueiro) para ativar uma engenhoca.', 'Engenhoqueiro', ''),
('Conhecimento de Fórmulas', 'classe_inventor', 'inventor', 'Você aprende três fórmulas de quaisquer círculos que possa aprender. Pode escolher este poder quantas vezes quiser.', 'Alquimista Iniciado', ''),
('Couraceiro', 'classe_inventor', 'inventor', 'Você recebe proficiência com armaduras pesadas e escudos. Quando usa armadura, pode usar Inteligência em vez de Destreza na Defesa.', 'treinado em Ofício (armeiro)', ''),
('Engenhoqueiro', 'classe_inventor', 'inventor', 'Você pode fabricar engenhocas que simulam efeitos de magias. Cada engenhoca ocupa 1 espaço e pode ser ativada com testes de Ofício.', 'Int 3, treinado em Ofício (engenhoqueiro)', ''),
('Farmacêutico', 'classe_inventor', 'inventor', 'Quando usa um item alquímico que cure pontos de vida, pode gastar PM (limitado por Inteligência) para curar dados extras do mesmo tipo.', 'Sab 1, treinado em Ofício (alquimista)', ''),
('Ferreiro', 'classe_inventor', 'inventor', 'Quando usa uma arma corpo a corpo feita por você mesmo, o dano dela aumenta em um passo.', 'Armeiro, 5º nível de inventor', ''),
('Granadeiro', 'classe_inventor', 'inventor', 'Você pode arremessar itens alquímicos e poções em alcance médio. Pode usar Inteligência em vez de Destreza para calcular a CD de resistência.', 'Alquimista de Batalha', ''),
('Homúnculo', 'classe_inventor', 'inventor', 'Você possui um homúnculo Minúsculo que é um parceiro ajudante iniciante. Pode perder 1d6 PV para ele se tornar também guardião até o fim da cena.', 'Alquimista Iniciado', ''),
('Invenção Potente', 'classe_inventor', 'inventor', 'Quando usa um item ou engenhoca fabricado por você, pode pagar 1 PM para aumentar em +2 a CD para resistir a ele.', '', ''),
('Maestria em Perícia', 'classe_inventor', 'inventor', 'Escolha perícias treinadas igual a sua Inteligência. Com essas perícias, pode gastar 1 PM para escolher 10 em qualquer situação.', '', ''),
('Manutenção Eficiente', 'classe_inventor', 'inventor', 'A quantidade de engenhocas que você pode manter aumenta em +3. Cada engenhoca passa a ocupar meio espaço.', 'Engenhoqueiro, 5º nível de inventor', ''),
('Mestre Alquimista', 'classe_inventor', 'inventor', 'Você pode fabricar poções com fórmulas de qualquer círculo.', 'Int 3, Sab 3, Alquimista Iniciado, 10º nível de inventor', ''),
('Mestre Cuca', 'classe_inventor', 'inventor', 'Todas as comidas que você cozinha têm seu bônus numérico aumentado em +1.', 'treinado em Ofício (cozinheiro)', ''),
('Mistura Fervilhante', 'classe_inventor', 'inventor', 'Quando usa um item alquímico ou poção, pode gastar 2 PM para dobrar a área de efeito dele.', 'Alquimista Iniciado, 5º nível de inventor', ''),
('Oficina de Campo', 'classe_inventor', 'inventor', 'Você pode gastar uma hora e 2 PM para fazer manutenção no equipamento do grupo. Armas recebem +1 em ataques, armaduras +1 na Defesa por um dia.', 'treinado em Ofício (armeiro)', ''),
('Pedra de Amolar', 'classe_inventor', 'inventor', 'Você pode gastar uma ação de movimento e PM (limitado por Inteligência) para aprimorar uma arma corpo a corpo, recebendo +1 em rolagens de dano por PM.', 'Armeiro', ''),
('Síntese Rápida', 'classe_inventor', 'inventor', 'Quando fabrica um item alquímico ou poção, pode fabricar o dobro de doses no mesmo tempo (pagando o custo de cada uma).', 'Alquimista Iniciado', '');

-- ========================================
-- PODERES DO LADINO
-- ========================================

INSERT INTO poderes (nome, tipo, grupo, descricao, pre_requisitos, efeito_especial) VALUES

-- Poderes de Ladino
('Assassinar', 'classe_ladino', 'ladino', 'Você pode gastar uma ação de movimento e 3 PM para analisar uma criatura. Até o fim do próximo turno, seu primeiro Ataque Furtivo contra ela tem os dados de dano extras dobrados.', '5º nível de ladino', ''),
('Contatos no Submundo', 'classe_ladino', 'ladino', 'Quando chega em uma comunidade, pode fazer um teste de Carisma (CD 10) para encontrar contatos, recebendo +5 em Investigação e 20% de desconto em itens.', '', ''),
('Emboscar', 'classe_ladino', 'ladino', 'Na primeira rodada de cada combate, pode gastar 2 PM para executar uma ação padrão adicional em seu turno.', 'treinado em Furtividade', ''),
('Escapista', 'classe_ladino', 'ladino', 'Você recebe +5 em testes de Acrobacia para escapar, passar por espaço apertado e passar por inimigo e em testes para resistir a efeitos de movimento.', '', ''),
('Fuga Formidável', 'classe_ladino', 'ladino', 'Você pode gastar uma ação completa e 1 PM para analisar o lugar e receber +3m em deslocamento, +5 em Acrobacia e Atletismo e ignora terreno difícil.', 'Int 1', ''),
('Gatuno', 'classe_ladino', 'ladino', 'Você recebe +2 em Atletismo. Quando escala, não fica desprevenido e avança seu deslocamento normal em vez de metade.', '', ''),
('Ladrão Arcano', 'classe_ladino', 'ladino', 'Quando causa dano com ataque furtivo em uma criatura capaz de lançar magias, pode "roubar" uma magia que já a tenha visto lançar (até 4º círculo).', 'Roubo de Mana, 13º nível de ladino', 'Efeito especial'),
('Mão na Boca', 'classe_ladino', 'ladino', 'Você recebe +2 em testes de agarrar. Quando acerta um ataque furtivo contra uma criatura desprevenida, pode fazer um teste de agarrar como ação livre.', 'treinado em Luta', ''),
('Mãos Rápidas', 'classe_ladino', 'ladino', 'Uma vez por rodada, ao fazer um teste de Ladinagem para certas ações, pode pagar 1 PM para fazê-lo como ação livre.', 'Des 2, treinado em Ladinagem', ''),
('Mente Criminosa', 'classe_ladino', 'ladino', 'Você soma sua Inteligência em Ladinagem e Furtividade.', 'Int 1', ''),
('Oportunismo', 'classe_ladino', 'ladino', 'Uma vez por rodada, quando um inimigo adjacente sofre dano de um aliado, pode gastar 2 PM para fazer um ataque corpo a corpo contra este inimigo.', '6º nível de ladino', ''),
('Rolamento Defensivo', 'classe_ladino', 'ladino', 'Sempre que sofre dano, pode gastar 2 PM para reduzir esse dano à metade. Após usar este poder, você fica caído.', 'treinado em Reflexos', ''),
('Roubo de Mana', 'classe_ladino', 'ladino', 'Quando causa dano com ataque furtivo, para cada 1d6 de dano furtivo, recebe 1 PM temporário e a criatura perde 1 PM. Só uma vez por cena por criatura.', 'Truque Mágico, 7º nível de ladino', 'Efeito especial'),
('Saqueador de Tumbas', 'classe_ladino', 'ladino', 'Você recebe +5 em testes de Investigação para encontrar armadilhas e em testes de resistência contra elas. Gasta uma ação padrão para desabilitar mecanismos.', '', ''),
('Sombra', 'classe_ladino', 'ladino', 'Você recebe +2 em Furtividade, não sofre penalidade por se mover no deslocamento normal e reduz a penalidade por atacar para –10.', 'treinado em Furtividade', ''),
('Truque Mágico', 'classe_ladino', 'ladino', 'Você aprende e pode lançar uma magia arcana de 1º círculo a sua escolha (atributo-chave Inteligência). Pode escolher este poder quantas vezes quiser.', 'Int 1', 'Efeito especial'),
('Velocidade Ladina', 'classe_ladino', 'ladino', 'Uma vez por rodada, pode gastar 2 PM para realizar uma ação de movimento adicional em seu turno.', 'Des 2, treinado em Iniciativa', ''),
('Veneno Persistente', 'classe_ladino', 'ladino', 'Quando aplica uma dose de veneno a uma arma, este veneno dura por três ataques em vez de apenas um.', 'Veneno Potente, 8º nível de ladino', ''),
('Veneno Potente', 'classe_ladino', 'ladino', 'A CD para resistir aos venenos que você usa aumenta em +5.', 'treinado em Ofício (alquimista)', '');

-- ========================================
-- PODERES DO LUTADOR
-- ========================================

INSERT INTO poderes (nome, tipo, grupo, descricao, pre_requisitos, efeito_especial) VALUES

-- Poderes de Lutador
('Arma Improvisada', 'classe_lutador', 'lutador', 'Para você, atacar com armas improvisadas conta como ataque desarmado, mas o dano aumenta em um passo. Pode procurar armas improvisadas com teste de Percepção.', '', ''),
('Até Acertar', 'classe_lutador', 'lutador', 'Se você errar um ataque desarmado, recebe um bônus cumulativo de +2 em testes de ataque e rolagens de dano desarmado contra o mesmo oponente até acertar.', '', ''),
('Braços Calejados', 'classe_lutador', 'lutador', 'Se você não estiver usando armadura, soma sua Força na Defesa, limitado pelo seu nível.', '', ''),
('Cabeçada', 'classe_lutador', 'lutador', 'Quando faz um ataque desarmado, pode gastar 2 PM para deixar o oponente desprevenido contra este ataque. Só uma vez por cena contra o mesmo alvo.', '', ''),
('Chave', 'classe_lutador', 'lutador', 'Se estiver agarrando uma criatura e fizer um teste de manobra para causar dano, o dano desarmado aumenta em um passo.', 'Int 1, Lutador de Chão, 4º nível de lutador', ''),
('Confiança dos Ringues', 'classe_lutador', 'lutador', 'Quando um inimigo erra um ataque corpo a corpo contra você, recebe 2 PM temporários (cumulativos, máximo igual ao nível por cena).', '8º nível de lutador', ''),
('Convencido', 'classe_lutador', 'lutador', 'Acostumado a contar apenas com seus músculos, você recebe resistência a medo e mental +5.', '', ''),
('Golpe Baixo', 'classe_lutador', 'lutador', 'Quando faz um ataque desarmado, pode gastar 2 PM. Se acertar, o oponente deve fazer teste de Fortitude (CD For) ou fica atordoado por uma rodada (só uma vez por cena).', '', ''),
('Golpe Imprudente', 'classe_lutador', 'lutador', 'Quando usa Golpe Relâmpago, pode atacar impulsivamente. Seus ataques desarmados recebem um dado extra de dano, mas sofre –5 na Defesa até o próximo turno.', '', ''),
('Imobilização', 'classe_lutador', 'lutador', 'Se estiver agarrando uma criatura, pode gastar uma ação completa para imobilizá-la. Ela fica indefesa e não pode realizar nenhuma ação, exceto tentar se soltar.', 'Chave, 8º nível de lutador', ''),
('Língua dos Becos', 'classe_lutador', 'lutador', 'Você pode pagar 1 PM para usar sua Força no lugar de Carisma em um teste de perícia baseada em Carisma.', 'For 1, treinado em Intimidação', ''),
('Lutador de Chão', 'classe_lutador', 'lutador', 'Você recebe +2 em testes de ataque para agarrar e derrubar. Quando agarra uma criatura, pode gastar 1 PM para fazer uma manobra derrubar contra ela como ação livre.', '', ''),
('Nome na Arena', 'classe_lutador', 'lutador', 'Você pode gastar uma ação completa para fazer um teste de Luta (CD 10) e impressionar os presentes, recebendo bônus em perícias baseadas em Carisma.', '11º nível de lutador', ''),
('Punhos de Adamante', 'classe_lutador', 'lutador', 'Seus ataques desarmados ignoram 10 pontos de redução de dano do alvo, se houver.', '8º nível de lutador', ''),
('Rasteira', 'classe_lutador', 'lutador', 'Quando faz um ataque desarmado contra uma criatura até uma categoria de tamanho maior, pode gastar 2 PM. Se acertar, a criatura fica caída.', '', ''),
('Sarado', 'classe_lutador', 'lutador', 'Você soma sua Força no seu total de pontos de vida e em Fortitude. Pode usar Força em vez de Carisma em Diplomacia com pessoas atraídas por físicos definidos.', 'For 3', ''),
('Sequência Destruidora', 'classe_lutador', 'lutador', 'No início do turno, pode gastar 2 PM para dizer um número (mínimo 2). Se acertar essa quantidade de ataques, o último recebe +4 na rolagem de dano por ataque feito.', 'Trocação, 12º nível de lutador', ''),
('Trincado', 'classe_lutador', 'lutador', 'Seu corpo se tornou uma máquina. Você soma sua Constituição nas rolagens de dano desarmado.', 'Con 3, Sarado, 10º nível de lutador', ''),
('Trocação', 'classe_lutador', 'lutador', 'Ao acertar um ataque desarmado, pode fazer outro ataque contra o mesmo alvo, pagando PM igual à quantidade de ataques já realizados no turno.', '6º nível de lutador', ''),
('Trocação Tumultuosa', 'classe_lutador', 'lutador', 'Quando usa a ação agredir para fazer um ataque desarmado, pode gastar 2 PM para atingir todas as criaturas adjacentes — incluindo aliados!', 'Trocação, 8º nível de lutador', ''),
('Valentão', 'classe_lutador', 'lutador', 'Você recebe +2 em testes de ataque e rolagens de dano contra oponentes caídos, desprevenidos, flanqueados ou indefesos.', '', ''),
('Voadora', 'classe_lutador', 'lutador', 'Quando faz uma investida desarmada, pode gastar 2 PM para receber +1d6 no dano para cada 3m que se deslocar, limitado pelo seu nível.', '', '');

-- ========================================
-- PODERES DO NOBRE
-- ========================================

INSERT INTO poderes (nome, tipo, grupo, descricao, pre_requisitos, efeito_especial) VALUES

-- Poderes de Nobre
('Armadura Brilhante', 'classe_nobre', 'nobre', 'Você pode usar seu Carisma na Defesa quando usa armadura pesada. Não pode somar Destreza neste caso.', '8º nível de nobre', ''),
('Autoridade Feudal', 'classe_nobre', 'nobre', 'Você pode gastar uma hora e 2 PM para conclamar o povo a ajudá-lo. Essas pessoas contam como um parceiro iniciante até o fim da aventura.', '6º nível de nobre', ''),
('Educação Privilegiada', 'classe_nobre', 'nobre', 'Você se torna treinado em duas perícias de nobre a sua escolha.', '', ''),
('Estrategista', 'classe_nobre', 'nobre', 'Você pode direcionar aliados em alcance curto. Gaste uma ação padrão e 1 PM por aliado. No próximo turno dele, ele ganha uma ação de movimento.', 'Int 1, treinado em Guerra, 6º nível de nobre', ''),
('Favor', 'classe_nobre', 'nobre', 'Você pode usar sua influência para pedir favores a pessoas poderosas. Gasta 5 PM e uma hora, funcionando como persuasão de Diplomacia para favores mais caros.', '', ''),
('General', 'classe_nobre', 'nobre', 'Quando usa Estrategista, aliados direcionados recebem 1d4 PM temporários que duram até o fim do turno (não podem ser usados em efeitos que concedam PM).', 'Estrategista, 12º nível de nobre', ''),
('Grito Tirânico', 'classe_nobre', 'nobre', 'Você pode usar Palavras Afiadas como ação completa. Se fizer isso, os dados de dano aumentam para d8 e você atinge todos os inimigos em alcance curto.', '8º nível de nobre', ''),
('Inspirar Confiança', 'classe_nobre', 'nobre', 'Quando um aliado em alcance curto faz um teste, você pode gastar 2 PM para fazer com que ele possa rolar esse teste novamente.', '', ''),
('Inspirar Glória', 'classe_nobre', 'nobre', 'Uma vez por rodada, pode gastar 5 PM para fazer um aliado em alcance curto ganhar uma ação padrão adicional no próximo turno. Só uma vez por cena em cada aliado.', 'Inspirar Confiança, 8º nível de nobre', ''),
('Jogo da Corte', 'classe_nobre', 'nobre', 'Você pode gastar 1 PM para rolar novamente um teste recém realizado de Diplomacia, Intuição ou Nobreza.', '', ''),
('Liderar pelo Exemplo', 'classe_nobre', 'nobre', 'Você pode gastar 2 PM para servir de inspiração. Até o início do próximo turno, quando passar em um teste de perícia, aliados em alcance curto podem usar seu resultado.', '6º nível de nobre', ''),
('Língua de Ouro', 'classe_nobre', 'nobre', 'Você pode gastar uma ação padrão e 4 PM para gerar o efeito da magia Enfeitiçar com vários aprimoramentos (CD Car). Não é uma habilidade mágica.', 'Língua de Prata, 8º nível de nobre', ''),
('Língua de Prata', 'classe_nobre', 'nobre', 'Quando faz um teste de perícia baseada em Carisma, pode gastar 2 PM para receber um bônus no teste igual a metade do seu nível.', '', ''),
('Língua Rápida', 'classe_nobre', 'nobre', 'Quando faz um teste de Diplomacia para mudar atitude como ação completa, sofre penalidade de –5 em vez de –10.', '', ''),
('Presença Majestosa', 'classe_nobre', 'nobre', 'Sua Presença Aristocrática passa a funcionar contra qualquer criatura com Inteligência e pode usá-la mais de uma vez contra a mesma criatura na mesma cena.', '16º nível de nobre', ''),
('Título', 'classe_nobre', 'nobre', 'Você adquire um título de nobreza. No início de cada aventura recebe 20 TO por nível de nobre ou a ajuda de um parceiro veterano.', 'Autoridade Feudal, 10º nível de nobre', ''),
('Voz Poderosa', 'classe_nobre', 'nobre', 'Você recebe +2 em Diplomacia e Intimidação. Suas habilidades de nobre com alcance curto passam para alcance médio.', '', '');

-- ========================================
-- PODERES DO PALADINO
-- ========================================

INSERT INTO poderes (nome, tipo, grupo, descricao, pre_requisitos, efeito_especial) VALUES

-- Poderes de Paladino
('Arma Sagrada', 'classe_paladino', 'paladino', 'Quando usa Golpe Divino para atacar com a arma preferida de sua divindade, o dado de dano que você rola por Golpe Divino aumenta para d12.', 'devoto de uma divindade (exceto Lena e Marah)', 'Efeito especial'),
('Aura Antimagia', 'classe_paladino', 'paladino', 'Enquanto sua aura estiver ativa, você e os aliados dentro dela podem rolar novamente qualquer teste de resistência contra magia.', '14° nível de paladino', 'Efeito especial'),
('Aura Ardente', 'classe_paladino', 'paladino', 'Enquanto sua aura estiver ativa, no início de cada turno, espíritos e mortos-vivos escolhidos dentro dela sofrem dano de luz igual a 5 + seu Carisma.', '10° nível de paladino', 'Efeito especial'),
('Aura de Cura', 'classe_paladino', 'paladino', 'Enquanto sua aura estiver ativa, no início de seus turnos, você e aliados escolhidos dentro dela curam PV igual a 5 + seu Carisma.', '6° nível de paladino', 'Efeito especial'),
('Aura de Invencibilidade', 'classe_paladino', 'paladino', 'Enquanto sua aura estiver ativa, você ignora o primeiro dano que sofrer na cena. O mesmo se aplica a seus aliados dentro da aura.', '18° nível de paladino', 'Efeito especial'),
('Aura Poderosa', 'classe_paladino', 'paladino', 'O raio da sua aura aumenta para 30m.', '6° nível de paladino', 'Efeito especial'),
('Fulgor Divino', 'classe_paladino', 'paladino', 'Quando usa Golpe Divino, todos os inimigos em alcance curto ficam ofuscados até o início do seu próximo turno.', '', 'Efeito especial'),
('Julgamento: Arrependimento', 'classe_paladino', 'paladino', 'Você pode gastar 2 PM para marcar um inimigo. Na próxima vez que ele acertar um ataque em você ou aliados, deve fazer teste de Vontade (CD Car) ou fica atordoado no próximo turno.', '', ''),
('Julgamento: Autoridade', 'classe_paladino', 'paladino', 'Você pode gastar 1 PM para comandar uma criatura em alcance curto. Faça teste de Diplomacia oposto por Vontade. Se vencer, ela obedece a um comando simples.', '', ''),
('Julgamento: Coragem', 'classe_paladino', 'paladino', 'Você pode gastar 2 PM para inspirar coragem em uma criatura em alcance curto. Ela fica imune a efeitos de medo e recebe +2 em ataques contra o inimigo com maior ND.', '', ''),
('Julgamento: Iluminação', 'classe_paladino', 'paladino', 'Você pode marcar um inimigo em alcance curto. Quando acerta um ataque corpo a corpo nesse inimigo, recebe 2 PM temporários. Só uma vez por cena.', '', ''),
('Julgamento: Justiça', 'classe_paladino', 'paladino', 'Você pode gastar 2 PM para marcar um inimigo. Na próxima vez que ele causar dano em você ou aliados, deve fazer teste de Vontade (CD Car) ou sofre dano de luz igual à metade do dano causado.', '', ''),
('Julgamento: Libertação', 'classe_paladino', 'paladino', 'Você pode gastar 5 PM para cancelar uma condição negativa qualquer que esteja afetando uma criatura em alcance curto.', '', ''),
('Julgamento: Salvação', 'classe_paladino', 'paladino', 'Você pode gastar 2 PM para marcar um inimigo em alcance curto. Até o fim da cena, quando acerta um ataque corpo a corpo nesse inimigo, recupera 5 pontos de vida.', '', ''),
('Julgamento: Vindicação', 'classe_paladino', 'paladino', 'Você pode gastar 2 PM para marcar um inimigo que tenha causado dano a você ou aliados. Recebe +1 em ataques e +1d8 em dano contra ele, mas sofre –5 em ataques contra outros alvos.', '', ''),
('Julgamento: Zelo', 'classe_paladino', 'paladino', 'Você pode gastar 1 PM para marcar um alvo em alcance longo. Pelo restante da cena, sempre que se mover na direção desse alvo, você se move com o dobro de seu deslocamento.', '', ''),
('Orar', 'classe_paladino', 'paladino', 'Você aprende e pode lançar uma magia divina de 1º círculo a sua escolha. Seu atributo-chave para esta magia é Sabedoria. Pode escolher este poder quantas vezes quiser.', '', 'Efeito especial'),
('Virtude: Caridade', 'classe_paladino', 'paladino', 'O custo de suas habilidades de paladino que tenham um aliado como alvo é reduzido em –1 PM.', '', ''),
('Virtude: Castidade', 'classe_paladino', 'paladino', 'Você se torna imune a efeitos de encantamento e recebe +5 em testes de Intuição para perceber blefes.', '', ''),
('Virtude: Compaixão', 'classe_paladino', 'paladino', 'Você pode usar Cura pelas Mãos em alcance curto e, para cada PM gasto, cura 2d6+1 (em vez de 1d8+1).', '', ''),
('Virtude: Humildade', 'classe_paladino', 'paladino', 'Na primeira rodada de um combate, pode gastar uma ação completa para rezar e receber PM temporários igual ao seu Carisma (duram até o fim da cena).', '', ''),
('Virtude: Temperança', 'classe_paladino', 'paladino', 'Quando ingere um alimento, item alquímico ou poção, você consome apenas metade do item. Cada item desses rende duas "doses" para você.', '', '');

-- ========================================
-- RELACIONAR PODERES COM CLASSES
-- ========================================

-- Função auxiliar para facilitar as inserções
CREATE OR REPLACE FUNCTION insert_classe_poder(
  p_classe_nome VARCHAR,
  p_poder_nome VARCHAR,
  p_nivel_minimo INTEGER DEFAULT 2,
  p_pre_requisitos TEXT DEFAULT ''
) RETURNS VOID AS $$
BEGIN
  INSERT INTO classe_poderes (classe_id, poder_id, nivel_minimo, pre_requisitos)
  SELECT c.id, p.id, p_nivel_minimo, p_pre_requisitos
  FROM classes c, poderes p
  WHERE c.nome = p_classe_nome AND p.nome = p_poder_nome;
END;
$$ LANGUAGE plpgsql;

-- Relacionar poderes do Cavaleiro
SELECT insert_classe_poder('Cavaleiro', 'Armadura da Honra');
SELECT insert_classe_poder('Cavaleiro', 'Autoridade Feudal', 6);
SELECT insert_classe_poder('Cavaleiro', 'Desprezar os Covardes');
SELECT insert_classe_poder('Cavaleiro', 'Escudeiro');
SELECT insert_classe_poder('Cavaleiro', 'Especialização em Armadura', 12);
SELECT insert_classe_poder('Cavaleiro', 'Estandarte', 14);
SELECT insert_classe_poder('Cavaleiro', 'Etiqueta');
SELECT insert_classe_poder('Cavaleiro', 'Investida Destruidora');
SELECT insert_classe_poder('Cavaleiro', 'Montaria Corajosa');
SELECT insert_classe_poder('Cavaleiro', 'Pajem');
SELECT insert_classe_poder('Cavaleiro', 'Postura: Aríete Implacável');
SELECT insert_classe_poder('Cavaleiro', 'Postura: Castigo de Ferro');
SELECT insert_classe_poder('Cavaleiro', 'Postura: Foco de Batalha');
SELECT insert_classe_poder('Cavaleiro', 'Postura: Muralha Intransponível');
SELECT insert_classe_poder('Cavaleiro', 'Postura: Provocação Petulante');
SELECT insert_classe_poder('Cavaleiro', 'Postura: Torre Inabalável');
SELECT insert_classe_poder('Cavaleiro', 'Solidez');
SELECT insert_classe_poder('Cavaleiro', 'Título', 10);
SELECT insert_classe_poder('Cavaleiro', 'Torre Armada');

-- Relacionar poderes do Clérigo
SELECT insert_classe_poder('Clérigo', 'Abençoar Arma');
SELECT insert_classe_poder('Clérigo', 'Autoridade Eclesiástica', 5);
SELECT insert_classe_poder('Clérigo', 'Canalizar Energia Positiva/Negativa');
SELECT insert_classe_poder('Clérigo', 'Canalizar Amplo');
SELECT insert_classe_poder('Clérigo', 'Comunhão Vital');
SELECT insert_classe_poder('Clérigo', 'Conhecimento Mágico');
SELECT insert_classe_poder('Clérigo', 'Expulsar/Comandar Mortos-Vivos');
SELECT insert_classe_poder('Clérigo', 'Liturgia Mágica');
SELECT insert_classe_poder('Clérigo', 'Magia Sagrada/Profana');
SELECT insert_classe_poder('Clérigo', 'Mestre Celebrante', 12);
SELECT insert_classe_poder('Clérigo', 'Missa: Bênção da Vida');
SELECT insert_classe_poder('Clérigo', 'Missa: Chamado às Armas');
SELECT insert_classe_poder('Clérigo', 'Missa: Elevação do Espírito');
SELECT insert_classe_poder('Clérigo', 'Missa: Escudo Divino');
SELECT insert_classe_poder('Clérigo', 'Missa: Superar as Limitações');
SELECT insert_classe_poder('Clérigo', 'Prece de Combate');
SELECT insert_classe_poder('Clérigo', 'Símbolo Sagrado Energizado');

-- Relacionar poderes do Druida
SELECT insert_classe_poder('Druida', 'Aspecto do Inverno');
SELECT insert_classe_poder('Druida', 'Aspecto do Outono');
SELECT insert_classe_poder('Druida', 'Aspecto da Primavera');
SELECT insert_classe_poder('Druida', 'Aspecto do Verão');
SELECT insert_classe_poder('Druida', 'Companheiro Animal');
SELECT insert_classe_poder('Druida', 'Companheiro Animal Aprimorado', 6);
SELECT insert_classe_poder('Druida', 'Companheiro Animal Lendário', 18);
SELECT insert_classe_poder('Druida', 'Companheiro Animal Mágico', 8);
SELECT insert_classe_poder('Druida', 'Coração da Selva');
SELECT insert_classe_poder('Druida', 'Espírito dos Equinócios', 10);
SELECT insert_classe_poder('Druida', 'Espírito dos Solstícios', 10);
SELECT insert_classe_poder('Druida', 'Força dos Penhascos', 4);
SELECT insert_classe_poder('Druida', 'Forma Primal', 18);
SELECT insert_classe_poder('Druida', 'Forma Selvagem');
SELECT insert_classe_poder('Druida', 'Forma Selvagem Aprimorada', 6);
SELECT insert_classe_poder('Druida', 'Forma Selvagem Superior', 12);
SELECT insert_classe_poder('Druida', 'Liberdade da Pradaria');
SELECT insert_classe_poder('Druida', 'Magia Natural');
SELECT insert_classe_poder('Druida', 'Presas Afiadas');
SELECT insert_classe_poder('Druida', 'Segredos da Natureza');
SELECT insert_classe_poder('Druida', 'Tranquilidade dos Lagos');

-- Relacionar poderes do Guerreiro
SELECT insert_classe_poder('Guerreiro', 'Ambidestria');
SELECT insert_classe_poder('Guerreiro', 'Arqueiro');
SELECT insert_classe_poder('Guerreiro', 'Ataque Reflexo');
SELECT insert_classe_poder('Guerreiro', 'Bater e Correr');
SELECT insert_classe_poder('Guerreiro', 'Destruidor');
SELECT insert_classe_poder('Guerreiro', 'Esgrimista');
SELECT insert_classe_poder('Guerreiro', 'Especialização em Arma');
SELECT insert_classe_poder('Guerreiro', 'Especialização em Armadura', 12);
SELECT insert_classe_poder('Guerreiro', 'Golpe de Raspão');
SELECT insert_classe_poder('Guerreiro', 'Golpe Demolidor');
SELECT insert_classe_poder('Guerreiro', 'Golpe Pessoal', 5);
SELECT insert_classe_poder('Guerreiro', 'Ímpeto');
SELECT insert_classe_poder('Guerreiro', 'Mestre em Arma', 12);
SELECT insert_classe_poder('Guerreiro', 'Planejamento Marcial', 10);
SELECT insert_classe_poder('Guerreiro', 'Romper Resistências');
SELECT insert_classe_poder('Guerreiro', 'Solidez');
SELECT insert_classe_poder('Guerreiro', 'Tornado de Dor', 6);
SELECT insert_classe_poder('Guerreiro', 'Valentão');

-- Relacionar poderes do Inventor
SELECT insert_classe_poder('Inventor', 'Agite Antes de Usar');
SELECT insert_classe_poder('Inventor', 'Ajuste de Mira');
SELECT insert_classe_poder('Inventor', 'Alquimista de Batalha');
SELECT insert_classe_poder('Inventor', 'Alquimista Iniciado');
SELECT insert_classe_poder('Inventor', 'Armeiro');
SELECT insert_classe_poder('Inventor', 'Ativação Rápida', 7);
SELECT insert_classe_poder('Inventor', 'Autômato');
SELECT insert_classe_poder('Inventor', 'Autômato Prototipado');
SELECT insert_classe_poder('Inventor', 'Balística');
SELECT insert_classe_poder('Inventor', 'Blindagem', 8);
SELECT insert_classe_poder('Inventor', 'Cano Raiado', 5);
SELECT insert_classe_poder('Inventor', 'Catalisador Instável');
SELECT insert_classe_poder('Inventor', 'Chutes e Palavrões');
SELECT insert_classe_poder('Inventor', 'Conhecimento de Fórmulas');
SELECT insert_classe_poder('Inventor', 'Couraceiro');
SELECT insert_classe_poder('Inventor', 'Engenhoqueiro');
SELECT insert_classe_poder('Inventor', 'Farmacêutico');
SELECT insert_classe_poder('Inventor', 'Ferreiro', 5);
SELECT insert_classe_poder('Inventor', 'Granadeiro');
SELECT insert_classe_poder('Inventor', 'Homúnculo');
SELECT insert_classe_poder('Inventor', 'Invenção Potente');
SELECT insert_classe_poder('Inventor', 'Maestria em Perícia');
SELECT insert_classe_poder('Inventor', 'Manutenção Eficiente', 5);
SELECT insert_classe_poder('Inventor', 'Mestre Alquimista', 10);
SELECT insert_classe_poder('Inventor', 'Mestre Cuca');
SELECT insert_classe_poder('Inventor', 'Mistura Fervilhante', 5);
SELECT insert_classe_poder('Inventor', 'Oficina de Campo');
SELECT insert_classe_poder('Inventor', 'Pedra de Amolar');
SELECT insert_classe_poder('Inventor', 'Síntese Rápida');

-- Relacionar poderes do Ladino
SELECT insert_classe_poder('Ladino', 'Assassinar', 5);
SELECT insert_classe_poder('Ladino', 'Contatos no Submundo');
SELECT insert_classe_poder('Ladino', 'Emboscar');
SELECT insert_classe_poder('Ladino', 'Escapista');
SELECT insert_classe_poder('Ladino', 'Fuga Formidável');
SELECT insert_classe_poder('Ladino', 'Gatuno');
SELECT insert_classe_poder('Ladino', 'Ladrão Arcano', 13);
SELECT insert_classe_poder('Ladino', 'Mão na Boca');
SELECT insert_classe_poder('Ladino', 'Mãos Rápidas');
SELECT insert_classe_poder('Ladino', 'Mente Criminosa');
SELECT insert_classe_poder('Ladino', 'Oportunismo', 6);
SELECT insert_classe_poder('Ladino', 'Rolamento Defensivo');
SELECT insert_classe_poder('Ladino', 'Roubo de Mana', 7);
SELECT insert_classe_poder('Ladino', 'Saqueador de Tumbas');
SELECT insert_classe_poder('Ladino', 'Sombra');
SELECT insert_classe_poder('Ladino', 'Truque Mágico');
SELECT insert_classe_poder('Ladino', 'Velocidade Ladina');
SELECT insert_classe_poder('Ladino', 'Veneno Persistente', 8);
SELECT insert_classe_poder('Ladino', 'Veneno Potente');

-- Relacionar poderes do Lutador
SELECT insert_classe_poder('Lutador', 'Arma Improvisada');
SELECT insert_classe_poder('Lutador', 'Até Acertar');
SELECT insert_classe_poder('Lutador', 'Braços Calejados');
SELECT insert_classe_poder('Lutador', 'Cabeçada');
SELECT insert_classe_poder('Lutador', 'Chave', 4);
SELECT insert_classe_poder('Lutador', 'Confiança dos Ringues', 8);
SELECT insert_classe_poder('Lutador', 'Convencido');
SELECT insert_classe_poder('Lutador', 'Golpe Baixo');
SELECT insert_classe_poder('Lutador', 'Golpe Imprudente');
SELECT insert_classe_poder('Lutador', 'Imobilização', 8);
SELECT insert_classe_poder('Lutador', 'Língua dos Becos');
SELECT insert_classe_poder('Lutador', 'Lutador de Chão');
SELECT insert_classe_poder('Lutador', 'Nome na Arena', 11);
SELECT insert_classe_poder('Lutador', 'Punhos de Adamante', 8);
SELECT insert_classe_poder('Lutador', 'Rasteira');
SELECT insert_classe_poder('Lutador', 'Sarado');
SELECT insert_classe_poder('Lutador', 'Sequência Destruidora', 12);
SELECT insert_classe_poder('Lutador', 'Trincado', 10);
SELECT insert_classe_poder('Lutador', 'Trocação', 6);
SELECT insert_classe_poder('Lutador', 'Trocação Tumultuosa', 8);
SELECT insert_classe_poder('Lutador', 'Valentão');
SELECT insert_classe_poder('Lutador', 'Voadora');

-- Relacionar poderes do Nobre
SELECT insert_classe_poder('Nobre', 'Armadura Brilhante', 8);
SELECT insert_classe_poder('Nobre', 'Autoridade Feudal', 6);
SELECT insert_classe_poder('Nobre', 'Educação Privilegiada');
SELECT insert_classe_poder('Nobre', 'Estrategista', 6);
SELECT insert_classe_poder('Nobre', 'Favor');
SELECT insert_classe_poder('Nobre', 'General', 12);
SELECT insert_classe_poder('Nobre', 'Grito Tirânico', 8);
SELECT insert_classe_poder('Nobre', 'Inspirar Confiança');
SELECT insert_classe_poder('Nobre', 'Inspirar Glória', 8);
SELECT insert_classe_poder('Nobre', 'Jogo da Corte');
SELECT insert_classe_poder('Nobre', 'Liderar pelo Exemplo', 6);
SELECT insert_classe_poder('Nobre', 'Língua de Ouro', 8);
SELECT insert_classe_poder('Nobre', 'Língua de Prata');
SELECT insert_classe_poder('Nobre', 'Língua Rápida');
SELECT insert_classe_poder('Nobre', 'Presença Majestosa', 16);
SELECT insert_classe_poder('Nobre', 'Título', 10);
SELECT insert_classe_poder('Nobre', 'Voz Poderosa');

-- Relacionar poderes do Paladino
SELECT insert_classe_poder('Paladino', 'Arma Sagrada');
SELECT insert_classe_poder('Paladino', 'Aura Antimagia', 14);
SELECT insert_classe_poder('Paladino', 'Aura Ardente', 10);
SELECT insert_classe_poder('Paladino', 'Aura de Cura', 6);
SELECT insert_classe_poder('Paladino', 'Aura de Invencibilidade', 18);
SELECT insert_classe_poder('Paladino', 'Aura Poderosa', 6);
SELECT insert_classe_poder('Paladino', 'Fulgor Divino');
SELECT insert_classe_poder('Paladino', 'Julgamento: Arrependimento');
SELECT insert_classe_poder('Paladino', 'Julgamento: Autoridade');
SELECT insert_classe_poder('Paladino', 'Julgamento: Coragem');
SELECT insert_classe_poder('Paladino', 'Julgamento: Iluminação');
SELECT insert_classe_poder('Paladino', 'Julgamento: Justiça');
SELECT insert_classe_poder('Paladino', 'Julgamento: Libertação');
SELECT insert_classe_poder('Paladino', 'Julgamento: Salvação');
SELECT insert_classe_poder('Paladino', 'Julgamento: Vindicação');
SELECT insert_classe_poder('Paladino', 'Julgamento: Zelo');
SELECT insert_classe_poder('Paladino', 'Orar');
SELECT insert_classe_poder('Paladino', 'Virtude: Caridade');
SELECT insert_classe_poder('Paladino', 'Virtude: Castidade');
SELECT insert_classe_poder('Paladino', 'Virtude: Compaixão');
SELECT insert_classe_poder('Paladino', 'Virtude: Humildade');
SELECT insert_classe_poder('Paladino', 'Virtude: Temperança');

-- Remover função auxiliar
DROP FUNCTION insert_classe_poder(VARCHAR, VARCHAR, INTEGER, TEXT);

-- ========================================
-- VERIFICAÇÕES FINAIS
-- ========================================

SELECT 'PODERES DE CLASSE INSERIDOS POR TIPO:' as resultado;
SELECT tipo, COUNT(*) as total 
FROM poderes 
WHERE tipo LIKE 'classe_%' 
GROUP BY tipo 
ORDER BY tipo;

SELECT 'RELACIONAMENTOS CLASSE-PODERES:' as resultado;
SELECT c.nome as classe, COUNT(cp.id) as total_poderes
FROM classes c
LEFT JOIN classe_poderes cp ON c.id = cp.classe_id
GROUP BY c.id, c.nome
ORDER BY c.nome;