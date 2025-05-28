-- Script para inserir poderes específicos de cada classe
-- Baseado no documento classes.txt

-- ========================================
-- LIMPAR PODERES DE CLASSE EXISTENTES
-- ========================================

DELETE FROM poderes WHERE tipo IN ('classe_arcanista', 'classe_barbaro', 'classe_bardo', 'classe_bucaneiro', 'classe_cacador', 'classe_cavaleiro', 'classe_clerigo', 'classe_druida', 'classe_guerreiro', 'classe_inventor', 'classe_ladino', 'classe_lutador', 'classe_nobre', 'classe_paladino');

-- ========================================
-- PODERES DO ARCANISTA
-- ========================================

INSERT INTO poderes (nome, tipo, grupo, descricao, pre_requisitos, efeito_especial) VALUES

-- Poderes de Arcanista
('Arcano de Batalha', 'classe_arcanista', 'arcanista', 'Quando lança uma magia, você soma seu atributo-chave na rolagem de dano.', '', ''),
('Caldeirão do Bruxo', 'classe_arcanista', 'arcanista', 'Você pode criar poções, como se tivesse o poder geral Preparar Poção. Se tiver ambos, pode criar poções de até 5º círculo.', 'Bruxo, treinado em Ofício (alquimista)', ''),
('Conhecimento Mágico', 'classe_arcanista', 'arcanista', 'Você aprende duas magias de qualquer círculo que possa lançar. Você pode escolher este poder quantas vezes quiser.', '', ''),
('Contramágica Aprimorada', 'classe_arcanista', 'arcanista', 'Uma vez por rodada, você pode fazer uma contramágica como uma reação.', 'Dissipar Magia', 'Efeito especial'),
('Envolto em Mistério', 'classe_arcanista', 'arcanista', 'Sua aparência sombria permite manipular pessoas supersticiosas. Você recebe +5 em Enganação e Intimidação contra pessoas não treinadas em Conhecimento ou Misticismo.', '', ''),
('Escriba Arcano', 'classe_arcanista', 'arcanista', 'Você pode aprender magias copiando textos de pergaminhos e grimórios. Custa T$ 250 por PM da magia e um dia de trabalho por PM.', 'Mago, treinado em Ofício (escriba)', ''),
('Especialista em Escola', 'classe_arcanista', 'arcanista', 'Escolha uma escola de magia. A CD para resistir a suas magias dessa escola aumenta em +2.', 'Bruxo ou Mago', ''),
('Familiar', 'classe_arcanista', 'arcanista', 'Você possui um animal de estimação mágico que obedece a suas ordens e se comunica telepaticamente em alcance longo.', '', ''),
('Fluxo de Mana', 'classe_arcanista', 'arcanista', 'Você pode manter dois efeitos sustentados ativos simultaneamente com apenas uma ação livre.', '10º nível de arcanista', ''),
('Foco Vital', 'classe_arcanista', 'arcanista', 'Se estiver segurando seu foco e sofrer dano que o levaria a 0 PV ou menos, você fica com 1 PV e o foco absorve o dano excedente.', 'Bruxo', 'Efeito especial'),
('Fortalecimento Arcano', 'classe_arcanista', 'arcanista', 'A CD para resistir a suas magias aumenta em +1. Se puder lançar magias de 4º círculo, aumenta em +2.', '5º nível de arcanista', ''),
('Herança Aprimorada', 'classe_arcanista', 'arcanista', 'Você recebe a herança aprimorada de sua linhagem sobrenatural.', 'Feiticeiro, 6º nível de arcanista', ''),
('Herança Superior', 'classe_arcanista', 'arcanista', 'Você recebe a herança superior de sua linhagem sobrenatural.', 'Herança Aprimorada, 11º nível de arcanista', ''),
('Magia Pungente', 'classe_arcanista', 'arcanista', 'Quando lança uma magia, você pode pagar 1 PM para aumentar em +2 a CD para resistir a ela.', '', ''),
('Mestre em Escola', 'classe_arcanista', 'arcanista', 'Escolha uma escola de magia. O custo para lançar magias dessa escola diminui em –1 PM.', 'Especialista em Escola com a escola escolhida, 8º nível de arcanista', ''),
('Poder Mágico', 'classe_arcanista', 'arcanista', 'Você recebe +1 ponto de mana por nível de arcanista. Quando sobe de nível, os PM aumentam de acordo.', '', ''),
('Raio Arcano', 'classe_arcanista', 'arcanista', 'Você pode gastar uma ação padrão para causar 1d8 pontos de dano de essência num alvo em alcance curto. Aumenta +1d8 por círculo acima do 1º.', '', 'Efeito especial'),
('Raio Elemental', 'classe_arcanista', 'arcanista', 'Quando usa Raio Arcano, você pode pagar 1 PM para que cause dano de ácido, eletricidade, fogo, frio ou trevas, causando condições adicionais.', 'Raio Arcano', 'Efeito especial'),
('Raio Poderoso', 'classe_arcanista', 'arcanista', 'Os dados de dano do seu Raio Arcano aumentam para d12 e o alcance aumenta para médio.', 'Raio Arcano', 'Efeito especial'),
('Tinta do Mago', 'classe_arcanista', 'arcanista', 'Você pode criar pergaminhos, como se tivesse o poder Escrever Pergaminho. Se tiver ambos, o custo é reduzido à metade.', 'Mago, treinado em Ofício (escriba)', '');

-- ========================================
-- PODERES DO BÁRBARO
-- ========================================

INSERT INTO poderes (nome, tipo, grupo, descricao, pre_requisitos, efeito_especial) VALUES

-- Poderes de Bárbaro
('Alma de Bronze', 'classe_barbaro', 'barbaro', 'Quando entra em fúria, você recebe uma quantidade de pontos de vida temporários igual a seu nível + sua Força.', '', ''),
('Brado Assustador', 'classe_barbaro', 'barbaro', 'Você pode gastar uma ação de movimento e 1 PM para soltar um berro feroz. Todos os inimigos em alcance curto ficam vulneráveis até o fim da cena.', 'treinado em Intimidação', 'Medo'),
('Crítico Brutal', 'classe_barbaro', 'barbaro', 'Seu multiplicador de crítico com armas corpo a corpo e de arremesso aumenta em +1.', '6º nível de bárbaro', ''),
('Destruidor', 'classe_barbaro', 'barbaro', 'Quando causa dano com uma arma corpo a corpo de duas mãos, você pode rolar novamente qualquer resultado 1 ou 2 das rolagens de dano da arma.', 'For 1', ''),
('Espírito Inquebrável', 'classe_barbaro', 'barbaro', 'Enquanto está em fúria, você não fica inconsciente por estar com 0 PV ou menos.', 'Alma de Bronze', ''),
('Esquiva Sobrenatural', 'classe_barbaro', 'barbaro', 'Seus instintos são tão apurados que você consegue reagir ao perigo antes que seus sentidos o percebam. Você nunca fica surpreendido.', '', ''),
('Força Indomável', 'classe_barbaro', 'barbaro', 'Você pode gastar 1 PM para somar seu nível em um teste de Força ou Atletismo. Pode usar depois de rolar o dado.', '', ''),
('Frenesi', 'classe_barbaro', 'barbaro', 'Uma vez por rodada, se estiver em fúria e usar a ação agredir para fazer um ataque corpo a corpo ou com arma de arremesso, você pode gastar 2 PM para fazer um ataque adicional.', '', ''),
('Fúria da Savana', 'classe_barbaro', 'barbaro', 'Seu deslocamento aumenta em +3m. Quando usa Fúria, você aplica o bônus em ataque e dano também a armas de arremesso.', '', ''),
('Fúria Raivosa', 'classe_barbaro', 'barbaro', 'Se sua Fúria for terminar por você não ter atacado nem sido alvo de um efeito hostil, você pode pagar 1 PM para continuar em fúria nesta rodada.', '', ''),
('Golpe Poderoso', 'classe_barbaro', 'barbaro', 'Ao acertar um ataque corpo a corpo ou com arma de arremesso, você pode gastar 1 PM para causar um dado extra de dano do mesmo tipo.', '', ''),
('Ímpeto', 'classe_barbaro', 'barbaro', 'Você pode gastar 1 PM para aumentar seu deslocamento em +6m por uma rodada.', '', ''),
('Investida Imprudente', 'classe_barbaro', 'barbaro', 'Quando faz uma investida, você pode aumentar sua penalidade na Defesa para –5 para receber +1d12 na rolagem de dano.', '', ''),
('Pele de Aço', 'classe_barbaro', 'barbaro', 'O bônus de Pele de Ferro aumenta para +8.', 'Pele de Ferro, 8º nível de bárbaro', ''),
('Pele de Ferro', 'classe_barbaro', 'barbaro', 'Você recebe +4 na Defesa, mas apenas se não estiver usando armadura pesada.', '', ''),
('Sangue dos Inimigos', 'classe_barbaro', 'barbaro', 'Enquanto está em fúria, quando faz um acerto crítico ou reduz um inimigo a 0 PV, você recebe um bônus cumulativo de +1 em testes de ataque e rolagens de dano.', '', ''),
('Superstição', 'classe_barbaro', 'barbaro', 'Você odeia magia, o que faz com que seja mais resistente a ela. Você recebe resistência a magia +5.', '', ''),
('Totem Espiritual', 'classe_barbaro', 'barbaro', 'Você soma sua Sabedoria no seu total de pontos de mana. Escolha um animal totêmico e aprenda uma magia específica que pode lançar mesmo em fúria.', 'Sab 1, 4º nível de bárbaro', 'Efeito especial'),
('Vigor Primal', 'classe_barbaro', 'barbaro', 'Você pode gastar uma ação de movimento e PM limitado por sua Constituição. Para cada PM gasto, recupera 1d12 pontos de vida.', '', '');

-- ========================================
-- PODERES DO BARDO
-- ========================================

INSERT INTO poderes (nome, tipo, grupo, descricao, pre_requisitos, efeito_especial) VALUES

-- Poderes de Bardo
('Arte Mágica', 'classe_bardo', 'bardo', 'Enquanto você estiver sob efeito de sua Inspiração, a CD para resistir a suas habilidades de bardo aumenta em +2.', '', ''),
('Aumentar Repertório', 'classe_bardo', 'bardo', 'Você aprende duas magias de qualquer círculo que possa lançar. Elas devem pertencer às escolas que você sabe usar, mas podem ser arcanas ou divinas.', '', ''),
('Dança das Lâminas', 'classe_bardo', 'bardo', 'Quando você lança uma magia com execução de uma ação padrão, pode gastar 1 PM para fazer um ataque corpo a corpo como uma ação livre.', 'Esgrima Mágica, 10º nível de bardo', ''),
('Esgrima Mágica', 'classe_bardo', 'bardo', 'Sua arte mescla esgrima e magia. Se estiver sob efeito de Inspiração, você pode substituir testes de Luta por testes de Atuação para ataques com armas leves ou de uma mão.', '', ''),
('Estrelato', 'classe_bardo', 'bardo', 'Suas apresentações o tornaram famoso. Quando usa Atuação para impressionar, o bônus em perícias baseadas em Carisma aumenta para +5.', '6º nível de bardo', ''),
('Fascinar em Massa', 'classe_bardo', 'bardo', 'Quando usa Música: Balada Fascinante, você pode gastar +2 PM para afetar todas as criaturas a sua escolha no alcance.', 'Música: Balada Fascinante', ''),
('Golpe Elemental', 'classe_bardo', 'bardo', 'Enquanto estiver sob efeito de Inspiração, sempre que acertar um ataque corpo a corpo, pode gastar 1 PM para causar 1d6 de dano extra elemental.', 'Golpe Mágico', 'Efeito especial'),
('Golpe Mágico', 'classe_bardo', 'bardo', 'Enquanto estiver sob efeito de Inspiração, sempre que acertar um ataque corpo a corpo, recebe 2 PM temporários cumulativos.', 'Esgrima Mágica', 'Efeito especial'),
('Inspiração Marcial', 'classe_bardo', 'bardo', 'Quando você usa Inspiração, você e seus aliados aplicam o bônus recebido em rolagens de dano além de testes de perícia.', '', ''),
('Lendas e Histórias', 'classe_bardo', 'bardo', 'Você pode gastar 1 PM para rolar novamente um teste de Conhecimento, Misticismo, Nobreza ou Religião para informação.', 'Int 1', ''),
('Manipular', 'classe_bardo', 'bardo', 'Você pode gastar 1 PM para fazer uma criatura fascinada ficar enfeitiçada até o fim da cena.', 'Música: Balada Fascinante', ''),
('Manipular em Massa', 'classe_bardo', 'bardo', 'Quando usa Manipular, você pode gastar +2 PM para afetar todas as criaturas a sua escolha em alcance curto.', 'Fascinar em Massa, Manipular, 10º nível de bardo', ''),
('Música: Balada Fascinante', 'classe_bardo', 'bardo', 'Faça um teste de Atuação oposto pelo teste de Vontade de uma criatura no alcance. Se passar, ela fica fascinada enquanto você se concentrar.', '', ''),
('Música: Canção Assustadora', 'classe_bardo', 'bardo', 'Faça um teste de Atuação oposto pelos testes de Vontade das criaturas escolhidas. Alvos que falhem ficam abalados até o fim da cena.', '', ''),
('Música: Melodia Curativa', 'classe_bardo', 'bardo', 'Criaturas a sua escolha no alcance recuperam 1d6 PV. Você pode gastar PM extras para aumentar a cura em +1d6 PV por PM.', '', ''),
('Melodia Restauradora', 'classe_bardo', 'bardo', 'Quando usa Música: Melodia Curativa, pode gastar +2 PM para remover uma condição específica das criaturas afetadas.', 'Música: Melodia Curativa', ''),
('Mestre dos Sussurros', 'classe_bardo', 'bardo', 'Você rola dois dados e usa o melhor em testes de Investigação para interrogar ou Enganação para intriga. Pode fazer esses testes em ambientes sociais sem custo.', 'Car 1, treinado em Enganação e Investigação', ''),
('Paródia', 'classe_bardo', 'bardo', 'Uma vez por rodada, quando vê outra criatura lançando uma magia em alcance médio, você pode pagar 1 PM e fazer um teste de Atuação para copiar a magia.', '', 'Efeito especial'),
('Prestidigitação', 'classe_bardo', 'bardo', 'Quando faz uma ação padrão, você pode aproveitar gestos para lançar uma magia como ação livre com um teste de Atuação.', '6º nível de bardo', '');

-- ========================================
-- PODERES DO BUCANEIRO
-- ========================================

INSERT INTO poderes (nome, tipo, grupo, descricao, pre_requisitos, efeito_especial) VALUES

-- Poderes de Bucaneiro
('Abusar dos Fracos', 'classe_bucaneiro', 'bucaneiro', 'Quando ataca uma criatura sob efeito de uma condição de medo, seu dano aumenta em um passo.', 'Flagelo dos Mares', ''),
('Amigos no Porto', 'classe_bucaneiro', 'bucaneiro', 'Quando chega em uma comunidade portuária, você pode fazer um teste de Carisma (CD 10) para encontrar um amigo que pode ajudá-lo.', 'Car 1, 6º nível de bucaneiro', ''),
('Aparar', 'classe_bucaneiro', 'bucaneiro', 'Uma vez por rodada, quando é atingido por um ataque, você pode gastar 1 PM para fazer um teste de ataque. Se for maior que o do oponente, evita o ataque.', 'Esgrimista', ''),
('Apostador', 'classe_bucaneiro', 'bucaneiro', 'Você pode gastar um dia para participar de jogos de azar. Faça um teste de Jogatina contra CD correspondente ao valor apostado.', 'treinado em Jogatina', ''),
('Ataque Acrobático', 'classe_bucaneiro', 'bucaneiro', 'Quando se aproxima de um inimigo com um salto/pirueta e o ataca no mesmo turno, você recebe +2 no teste de ataque e na rolagem de dano.', '', ''),
('Aventureiro Ávido', 'classe_bucaneiro', 'bucaneiro', 'Uma vez por rodada, você pode gastar 5 PM para realizar uma ação padrão ou de movimento adicional.', '', ''),
('Bravata Audaz', 'classe_bucaneiro', 'bucaneiro', 'Você jura fazer uma façanha específica. Se cumprir, seus PM aumentam em +2 por nível até o fim da aventura.', '', ''),
('Bravata Imprudente', 'classe_bucaneiro', 'bucaneiro', 'Na primeira rodada de combate, você pode jurar derrotar inimigos com uma restrição. Se vencer, recebe +2 em ataques e margem de ameaça.', '', ''),
('En Garde', 'classe_bucaneiro', 'bucaneiro', 'Você pode gastar uma ação de movimento e 1 PM para assumir postura de luta, recebendo +2 na margem de ameaça e +2 na Defesa.', 'Esgrimista', ''),
('Esgrimista', 'classe_bucaneiro', 'bucaneiro', 'Quando usa uma arma corpo a corpo leve ou ágil, você soma sua Inteligência nas rolagens de dano (limitado pelo seu nível).', 'Int 1', ''),
('Flagelo dos Mares', 'classe_bucaneiro', 'bucaneiro', 'Você aprende e pode lançar Amedrontar (atributo-chave Carisma). Esta não é uma habilidade mágica.', 'treinado em Intimidação', ''),
('Folião', 'classe_bucaneiro', 'bucaneiro', 'Durante festas, você recebe +2 em testes de perícias de Carisma e a atitude das pessoas melhora em uma categoria.', 'Car 1', ''),
('Grudar o Cano', 'classe_bucaneiro', 'bucaneiro', 'Quando faz um ataque à distância com arma de fogo contra oponente adjacente, não sofre penalidade e aumenta o dano em um passo.', 'treinado em Luta, Pistoleiro', ''),
('Pernas do Mar', 'classe_bucaneiro', 'bucaneiro', 'Você recebe +2 em Acrobacia e Atletismo. Quando está se equilibrando ou escalando, não fica desprevenido e o deslocamento não é reduzido.', '', ''),
('Pistoleiro', 'classe_bucaneiro', 'bucaneiro', 'Você recebe proficiência com armas de fogo e +2 nas rolagens de dano com essas armas.', '', ''),
('Presença Paralisante', 'classe_bucaneiro', 'bucaneiro', 'Você soma seu Carisma em Iniciativa e, se for o primeiro, ganha uma ação padrão extra na primeira rodada.', 'Car 1, 4º nível de bucaneiro', ''),
('Ripostar', 'classe_bucaneiro', 'bucaneiro', 'Quando usa Aparar e evita o ataque, você pode gastar 1 PM para fazer um ataque corpo a corpo imediato contra o inimigo.', 'Aparar, 12º nível de bucaneiro', ''),
('Touché', 'classe_bucaneiro', 'bucaneiro', 'Quando se aproxima de um inimigo e o ataca com arma leve/ágil no mesmo turno, pode gastar 2 PM para aumentar dano em um passo e receber +5 na margem de ameaça.', 'Esgrimista, 10º nível de bucaneiro', '');

-- ========================================
-- PODERES DO CAÇADOR
-- ========================================

INSERT INTO poderes (nome, tipo, grupo, descricao, pre_requisitos, efeito_especial) VALUES

-- Poderes de Caçador
('Ambidestria', 'classe_cacador', 'cacador', 'Se estiver empunhando duas armas (uma leve) e fizer agredir, pode fazer dois ataques, mas sofre –2 em todos os testes até o próximo turno.', 'Des 2', ''),
('Armadilha: Arataca', 'classe_cacador', 'cacador', 'A vítima sofre 2d6 pontos de dano de perfuração e fica agarrada. Pode escapar com ação padrão e teste de Força ou Acrobacia (CD Sab).', '', ''),
('Armadilha: Espinhos', 'classe_cacador', 'cacador', 'A vítima sofre 6d6 pontos de dano de perfuração. Teste de Reflexos (CD Sab) reduz à metade.', '', ''),
('Armadilha: Laço', 'classe_cacador', 'cacador', 'A vítima deve fazer teste de Reflexos (CD Sab). Se passar, fica caída. Se falhar, fica agarrada.', '', ''),
('Armadilha: Rede', 'classe_cacador', 'cacador', 'Todas as criaturas na área ficam enredadas e não podem sair. A área é terreno difícil. Podem se libertar com teste de Força ou Acrobacia (CD 25).', '', ''),
('Armadilheiro', 'classe_cacador', 'cacador', 'A CD para encontrar e resistir às suas armadilhas aumenta em +5 e você soma sua Sabedoria ao dano delas.', 'um poder de armadilha, 5º nível de caçador', ''),
('Arqueiro', 'classe_cacador', 'cacador', 'Se estiver usando uma arma de ataque à distância, você soma sua Sabedoria nas rolagens de dano (limitado pelo nível).', 'Sab 1', ''),
('Bote', 'classe_cacador', 'cacador', 'Se estiver empunhando duas armas e fizer investida, pode pagar 1 PM para fazer um ataque adicional com sua arma secundária.', 'Ambidestria, 6º nível de caçador', ''),
('Camuflagem', 'classe_cacador', 'cacador', 'Você pode gastar 2 PM para se esconder mesmo sem camuflagem ou cobertura disponível.', '6º nível de caçador', ''),
('Chuva de Lâminas', 'classe_cacador', 'cacador', 'Uma vez por rodada, quando usa Ambidestria, pode pagar 2 PM para fazer um ataque adicional com sua arma primária.', 'Des 4, Ambidestria, 12º nível de caçador', ''),
('Companheiro Animal', 'classe_cacador', 'cacador', 'Você recebe um companheiro animal que é um parceiro ajudante, assassino, atirador, combatente, fortão, guardião, perseguidor ou montaria.', 'Car 1, treinado em Adestramento', ''),
('Elo com a Natureza', 'classe_cacador', 'cacador', 'Você soma sua Sabedoria em seu total de PM e aprende Caminhos da Natureza (atributo-chave Sabedoria).', 'Sab 1, 3º nível de caçador', 'Efeito especial'),
('Emboscar', 'classe_cacador', 'cacador', 'Você pode gastar 2 PM para realizar uma ação padrão adicional em seu turno. Só pode usar na primeira rodada de combate.', 'treinado em Furtividade', ''),
('Empatia Selvagem', 'classe_cacador', 'cacador', 'Você pode se comunicar com animais e usar Adestramento para mudar atitude e persuasão com eles.', '', ''),
('Escaramuça', 'classe_cacador', 'cacador', 'Quando se move 6m ou mais, recebe +2 na Defesa e Reflexos e +1d8 nas rolagens de dano até o início do próximo turno.', 'Des 2, 6º nível de caçador', ''),
('Escaramuça Superior', 'classe_cacador', 'cacador', 'Quando usa Escaramuça, os bônus aumentam para +5 na Defesa e Reflexos e +1d12 em rolagens de dano.', 'Escaramuça, 12º nível de caçador', ''),
('Espreitar', 'classe_cacador', 'cacador', 'Quando usa Marca da Presa, recebe +1 em testes de perícia contra a criatura marcada. Dobra com Inimigo.', '', ''),
('Ervas Curativas', 'classe_cacador', 'cacador', 'Você pode gastar uma ação completa e PM (limitado por Sabedoria) para curar 2d6 PV por PM ou remover uma condição envenenado.', '', ''),
('Ímpeto', 'classe_cacador', 'cacador', 'Você pode gastar 1 PM para aumentar seu deslocamento em +6m por uma rodada.', '', ''),
('Inimigo de (Criatura)', 'classe_cacador', 'cacador', 'Escolha um tipo de criatura. Quando usa Marca da Presa contra ela, dobra os dados de bônus no dano. Pode escolher várias vezes.', '', ''),
('Olho do Falcão', 'classe_cacador', 'cacador', 'Você pode usar a habilidade Marca da Presa em criaturas em alcance longo.', '', ''),
('Ponto Fraco', 'classe_cacador', 'cacador', 'Quando usa Marca da Presa, seus ataques contra a criatura marcada recebem +2 na margem de ameaça. Dobra com Inimigo.', '', '');

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

-- Relacionar poderes do Arcanista
SELECT insert_classe_poder('Arcanista', 'Arcano de Batalha');
SELECT insert_classe_poder('Arcanista', 'Caldeirão do Bruxo');
SELECT insert_classe_poder('Arcanista', 'Conhecimento Mágico');
SELECT insert_classe_poder('Arcanista', 'Contramágica Aprimorada');
SELECT insert_classe_poder('Arcanista', 'Envolto em Mistério');
SELECT insert_classe_poder('Arcanista', 'Escriba Arcano');
SELECT insert_classe_poder('Arcanista', 'Especialista em Escola');
SELECT insert_classe_poder('Arcanista', 'Familiar');
SELECT insert_classe_poder('Arcanista', 'Fluxo de Mana', 10);
SELECT insert_classe_poder('Arcanista', 'Foco Vital');
SELECT insert_classe_poder('Arcanista', 'Fortalecimento Arcano', 5);
SELECT insert_classe_poder('Arcanista', 'Herança Aprimorada', 6);
SELECT insert_classe_poder('Arcanista', 'Herança Superior', 11);
SELECT insert_classe_poder('Arcanista', 'Magia Pungente');
SELECT insert_classe_poder('Arcanista', 'Mestre em Escola', 8);
SELECT insert_classe_poder('Arcanista', 'Poder Mágico');
SELECT insert_classe_poder('Arcanista', 'Raio Arcano');
SELECT insert_classe_poder('Arcanista', 'Raio Elemental');
SELECT insert_classe_poder('Arcanista', 'Raio Poderoso');
SELECT insert_classe_poder('Arcanista', 'Tinta do Mago');

-- Relacionar poderes do Bárbaro
SELECT insert_classe_poder('Bárbaro', 'Alma de Bronze');
SELECT insert_classe_poder('Bárbaro', 'Brado Assustador');
SELECT insert_classe_poder('Bárbaro', 'Crítico Brutal', 6);
SELECT insert_classe_poder('Bárbaro', 'Destruidor');
SELECT insert_classe_poder('Bárbaro', 'Espírito Inquebrável');
SELECT insert_classe_poder('Bárbaro', 'Esquiva Sobrenatural');
SELECT insert_classe_poder('Bárbaro', 'Força Indomável');
SELECT insert_classe_poder('Bárbaro', 'Frenesi');
SELECT insert_classe_poder('Bárbaro', 'Fúria da Savana');
SELECT insert_classe_poder('Bárbaro', 'Fúria Raivosa');
SELECT insert_classe_poder('Bárbaro', 'Golpe Poderoso');
SELECT insert_classe_poder('Bárbaro', 'Ímpeto');
SELECT insert_classe_poder('Bárbaro', 'Investida Imprudente');
SELECT insert_classe_poder('Bárbaro', 'Pele de Aço', 8);
SELECT insert_classe_poder('Bárbaro', 'Pele de Ferro');
SELECT insert_classe_poder('Bárbaro', 'Sangue dos Inimigos');
SELECT insert_classe_poder('Bárbaro', 'Superstição');
SELECT insert_classe_poder('Bárbaro', 'Totem Espiritual', 4);
SELECT insert_classe_poder('Bárbaro', 'Vigor Primal');

-- Continue para as outras classes...
-- (Bardo, Bucaneiro, Caçador, etc.)

-- Relacionar poderes do Bardo
SELECT insert_classe_poder('Bardo', 'Arte Mágica');
SELECT insert_classe_poder('Bardo', 'Aumentar Repertório');
SELECT insert_classe_poder('Bardo', 'Dança das Lâminas', 10);
SELECT insert_classe_poder('Bardo', 'Esgrima Mágica');
SELECT insert_classe_poder('Bardo', 'Estrelato', 6);
SELECT insert_classe_poder('Bardo', 'Fascinar em Massa');
SELECT insert_classe_poder('Bardo', 'Golpe Elemental');
SELECT insert_classe_poder('Bardo', 'Golpe Mágico');
SELECT insert_classe_poder('Bardo', 'Inspiração Marcial');
SELECT insert_classe_poder('Bardo', 'Lendas e Histórias');
SELECT insert_classe_poder('Bardo', 'Manipular');
SELECT insert_classe_poder('Bardo', 'Manipular em Massa', 10);
SELECT insert_classe_poder('Bardo', 'Música: Balada Fascinante');
SELECT insert_classe_poder('Bardo', 'Música: Canção Assustadora');
SELECT insert_classe_poder('Bardo', 'Música: Melodia Curativa');
SELECT insert_classe_poder('Bardo', 'Melodia Restauradora');
SELECT insert_classe_poder('Bardo', 'Mestre dos Sussurros');
SELECT insert_classe_poder('Bardo', 'Paródia');
SELECT insert_classe_poder('Bardo', 'Prestidigitação', 6);

-- Relacionar poderes do Bucaneiro
SELECT insert_classe_poder('Bucaneiro', 'Abusar dos Fracos');
SELECT insert_classe_poder('Bucaneiro', 'Amigos no Porto', 6);
SELECT insert_classe_poder('Bucaneiro', 'Aparar');
SELECT insert_classe_poder('Bucaneiro', 'Apostador');
SELECT insert_classe_poder('Bucaneiro', 'Ataque Acrobático');
SELECT insert_classe_poder('Bucaneiro', 'Aventureiro Ávido');
SELECT insert_classe_poder('Bucaneiro', 'Bravata Audaz');
SELECT insert_classe_poder('Bucaneiro', 'Bravata Imprudente');
SELECT insert_classe_poder('Bucaneiro', 'En Garde');
SELECT insert_classe_poder('Bucaneiro', 'Esgrimista');
SELECT insert_classe_poder('Bucaneiro', 'Flagelo dos Mares');
SELECT insert_classe_poder('Bucaneiro', 'Folião');
SELECT insert_classe_poder('Bucaneiro', 'Grudar o Cano');
SELECT insert_classe_poder('Bucaneiro', 'Pernas do Mar');
SELECT insert_classe_poder('Bucaneiro', 'Pistoleiro');
SELECT insert_classe_poder('Bucaneiro', 'Presença Paralisante', 4);
SELECT insert_classe_poder('Bucaneiro', 'Ripostar', 12);
SELECT insert_classe_poder('Bucaneiro', 'Touché', 10);

-- Relacionar poderes do Caçador
SELECT insert_classe_poder('Caçador', 'Ambidestria');
SELECT insert_classe_poder('Caçador', 'Armadilha: Arataca');
SELECT insert_classe_poder('Caçador', 'Armadilha: Espinhos');
SELECT insert_classe_poder('Caçador', 'Armadilha: Laço');
SELECT insert_classe_poder('Caçador', 'Armadilha: Rede');
SELECT insert_classe_poder('Caçador', 'Armadilheiro', 5);
SELECT insert_classe_poder('Caçador', 'Arqueiro');
SELECT insert_classe_poder('Caçador', 'Bote', 6);
SELECT insert_classe_poder('Caçador', 'Camuflagem', 6);
SELECT insert_classe_poder('Caçador', 'Chuva de Lâminas', 12);
SELECT insert_classe_poder('Caçador', 'Companheiro Animal');
SELECT insert_classe_poder('Caçador', 'Elo com a Natureza', 3);
SELECT insert_classe_poder('Caçador', 'Emboscar');
SELECT insert_classe_poder('Caçador', 'Empatia Selvagem');
SELECT insert_classe_poder('Caçador', 'Escaramuça', 6);
SELECT insert_classe_poder('Caçador', 'Escaramuça Superior', 12);
SELECT insert_classe_poder('Caçador', 'Espreitar');
SELECT insert_classe_poder('Caçador', 'Ervas Curativas');
SELECT insert_classe_poder('Caçador', 'Ímpeto');
SELECT insert_classe_poder('Caçador', 'Inimigo de (Criatura)');
SELECT insert_classe_poder('Caçador', 'Olho do Falcão');
SELECT insert_classe_poder('Caçador', 'Ponto Fraco');

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