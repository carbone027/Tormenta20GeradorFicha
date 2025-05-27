-- Script para criar e popular tabela de poderes Tormenta20

-- Criar tabela de poderes
CREATE TABLE IF NOT EXISTS poderes (
  id SERIAL PRIMARY KEY,
  nome VARCHAR(100) NOT NULL,
  tipo VARCHAR(50) NOT NULL, -- 'racial', 'geral', 'combate', 'destino', 'magia', 'concedido', 'tormenta'
  grupo VARCHAR(50), -- Para agrupar subcategorias
  descricao TEXT NOT NULL,
  pre_requisitos TEXT, -- Ex: "For 1, Estilo de Duas Armas"
  custo_pm INTEGER DEFAULT 0, -- Custo em PM se aplicável
  efeito_especial TEXT, -- Para efeitos marcados com 'e'
  restricoes TEXT, -- Restrições especiais
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Criar tabela de personagem-poderes (many-to-many)
CREATE TABLE IF NOT EXISTS personagem_poderes (
  id SERIAL PRIMARY KEY,
  personagem_id INTEGER REFERENCES personagens(id) ON DELETE CASCADE,
  poder_id INTEGER REFERENCES poderes(id),
  fonte VARCHAR(50), -- 'raca', 'escolha', 'classe', 'origem'
  observacoes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  UNIQUE(personagem_id, poder_id)
);

-- Limpar dados existentes
DELETE FROM poderes;
ALTER SEQUENCE poderes_id_seq RESTART WITH 1;

-- INSERIR PODERES GERAIS - COMBATE
INSERT INTO poderes (nome, tipo, grupo, descricao, pre_requisitos) VALUES
('Acuidade com Arma', 'geral', 'combate', 'Quando usa uma arma corpo a corpo leve ou uma arma de arremesso, você pode usar sua Destreza em vez de Força nos testes de ataque e rolagens de dano.', 'Des 1'),

('Arma Secundária Grande', 'geral', 'combate', 'Você pode empunhar duas armas de uma mão com o poder Estilo de Duas Armas.', 'Estilo de Duas Armas'),

('Arremesso Potente', 'geral', 'combate', 'Quando usa uma arma de arremesso, você pode usar sua Força em vez de Destreza nos testes de ataque. Se você possuir o poder Ataque Poderoso, poderá usá-lo com armas de arremesso.', 'For 1, Estilo de Arremesso'),

('Arremesso Múltiplo', 'geral', 'combate', 'Uma vez por rodada, quando faz um ataque com uma arma de arremesso, você pode gastar 1 PM para fazer um ataque adicional contra o mesmo alvo, arremessando outra arma de arremesso.', 'Des 1, Estilo de Arremesso'),

('Ataque com Escudo', 'geral', 'combate', 'Uma vez por rodada, se estiver empunhando um escudo e fizer a ação agredir, você pode gastar 1 PM para fazer um ataque corpo a corpo extra com o escudo. Este ataque não faz você perder o bônus do escudo na Defesa.', 'Estilo de Arma e Escudo'),

('Ataque Pesado', 'geral', 'combate', 'Quando faz um ataque corpo a corpo com uma arma de duas mãos, você pode pagar 1 PM. Se fizer isso e acertar o ataque, além do dano você faz uma manobra derrubar ou empurrar contra o alvo como uma ação livre.', 'Estilo de Duas Mãos'),

('Ataque Poderoso', 'geral', 'combate', 'Sempre que faz um ataque corpo a corpo, você pode sofrer –2 no teste de ataque para receber +5 na rolagem de dano.', 'For 1'),

('Ataque Preciso', 'geral', 'combate', 'Se estiver empunhando uma arma corpo a corpo em uma das mãos e nada na outra, você recebe +2 na margem de ameaça e +1 no multiplicador de crítico.', 'Estilo de Uma Arma'),

('Bloqueio com Escudo', 'geral', 'combate', 'Quando sofre dano, você pode gastar 1 PM para receber redução de dano igual ao bônus na Defesa que seu escudo fornece contra este dano.', 'Estilo de Arma e Escudo'),

('Carga de Cavalaria', 'geral', 'combate', 'Quando faz uma investida montada, você causa +2d8 pontos de dano. Além disso, pode continuar se movendo depois do ataque.', 'Ginete'),

('Combate Defensivo', 'geral', 'combate', 'Quando usa a ação agredir, você pode usar este poder. Se fizer isso, até seu próximo turno, sofre –2 em todos os testes de ataque, mas recebe +5 na Defesa.', 'Int 1'),

('Derrubar Aprimorado', 'geral', 'combate', 'Você recebe +2 em testes de ataque para derrubar. Quando derruba uma criatura com essa manobra, pode gastar 1 PM para fazer um ataque extra contra ela.', 'Combate Defensivo'),

('Desarmar Aprimorado', 'geral', 'combate', 'Você recebe +2 em testes de ataque para desarmar. Quando desarma uma criatura, pode gastar 1 PM para arremessar a arma dela para longe.', 'Combate Defensivo'),

('Disparo Preciso', 'geral', 'combate', 'Você pode fazer ataques à distância contra oponentes envolvidos em combate corpo a corpo sem sofrer a penalidade de –5 no teste de ataque.', 'Estilo de Disparo ou Estilo de Arremesso'),

('Disparo Rápido', 'geral', 'combate', 'Se estiver empunhando uma arma de disparo que possa recarregar como ação livre e gastar uma ação completa para agredir, pode fazer um ataque adicional com ela.', 'Des 1, Estilo de Disparo'),

('Empunhadura Poderosa', 'geral', 'combate', 'Ao usar uma arma feita para uma categoria de tamanho maior que a sua, a penalidade que você sofre nos testes de ataque diminui para –2.', 'For 3'),

('Encouraçado', 'geral', 'combate', 'Se estiver usando uma armadura pesada, você recebe +2 na Defesa. Esse bônus aumenta em +2 para cada outro poder que você possua que tenha Encouraçado como pré-requisito.', 'Proficiência com armaduras pesadas'),

('Esquiva', 'geral', 'combate', 'Você recebe +2 na Defesa e Reflexos.', 'Des 1'),

('Estilo de Arma e Escudo', 'geral', 'combate', 'Se você estiver usando um escudo, o bônus na Defesa que ele fornece aumenta em +2.', 'Treinado em Luta, proficiência com escudos'),

('Estilo de Arma Longa', 'geral', 'combate', 'Você recebe +2 em testes de ataque com armas alongadas e pode atacar alvos adjacentes com essas armas.', 'For 1, treinado em Luta'),

('Estilo de Arremesso', 'geral', 'combate', 'Você pode sacar armas de arremesso como uma ação livre e recebe +2 nas rolagens de dano com elas.', 'Treinado em Pontaria'),

('Estilo de Disparo', 'geral', 'combate', 'Se estiver usando uma arma de disparo, você soma sua Destreza nas rolagens de dano.', 'Treinado em Pontaria'),

('Estilo de Duas Armas', 'geral', 'combate', 'Se estiver empunhando duas armas (e pelo menos uma delas for leve) e fizer a ação agredir, você pode fazer dois ataques, um com cada arma.', 'Des 2, treinado em Luta'),

('Estilo de Duas Mãos', 'geral', 'combate', 'Se estiver usando uma arma corpo a corpo com as duas mãos, você recebe +5 nas rolagens de dano.', 'For 2, treinado em Luta'),

('Estilo de Uma Arma', 'geral', 'combate', 'Se estiver usando uma arma corpo a corpo em uma das mãos e nada na outra, você recebe +2 na Defesa e nos testes de ataque com essa arma.', 'Treinado em Luta'),

('Estilo Desarmado', 'geral', 'combate', 'Seus ataques desarmados causam 1d6 pontos de dano e podem causar dano letal ou não letal (sem penalidades).', 'Treinado em Luta'),

('Fanático', 'geral', 'combate', 'Seu deslocamento não é reduzido por usar armaduras pesadas.', '12º nível de personagem, Encouraçado'),

('Finta Aprimorada', 'geral', 'combate', 'Você recebe +2 em testes de Enganação para fintar e pode fintar como uma ação de movimento.', 'Treinado em Enganação'),

('Foco em Arma', 'geral', 'combate', 'Escolha uma arma. Você recebe +2 em testes de ataque com essa arma.', 'Proficiência com a arma'),

('Ginete', 'geral', 'combate', 'Você passa automaticamente em testes de Cavalgar para não cair da montaria quando sofre dano. Além disso, não sofre penalidades para atacar à distância ou lançar magias quando montado.', 'Treinado em Cavalgar'),

('Inexpugnável', 'geral', 'combate', 'Se estiver usando uma armadura pesada, você recebe +2 em todos os testes de resistência.', 'Encouraçado, 6º nível de personagem'),

('Mira Apurada', 'geral', 'combate', 'Quando usa a ação mirar, você recebe +2 em testes de ataque e na margem de ameaça com ataques à distância até o fim do turno.', 'Sab 1, Disparo Preciso'),

('Piqueiro', 'geral', 'combate', 'Uma vez por rodada, se estiver empunhando uma arma alongada e um inimigo entrar voluntariamente em seu alcance corpo a corpo, você pode gastar 1 PM para fazer um ataque corpo a corpo contra este oponente.', 'Estilo de Arma Longa'),

('Presença Aterradora', 'geral', 'combate', 'Você pode gastar uma ação padrão e 1 PM para assustar todas as criaturas a sua escolha em alcance curto.', 'Treinado em Intimidação'),

('Proficiência', 'geral', 'combate', 'Escolha uma proficiência: armas marciais, armas de fogo, armaduras pesadas ou escudos. Você recebe essa proficiência.', ''),

('Quebrar Aprimorado', 'geral', 'combate', 'Você recebe +2 em testes de ataque para quebrar. Quando reduz os PV de uma arma para 0 ou menos, você pode gastar 1 PM para realizar um ataque extra contra o usuário dela.', 'Ataque Poderoso'),

('Reflexos de Combate', 'geral', 'combate', 'Você ganha uma ação de movimento extra no seu primeiro turno de cada combate.', 'Des 1'),

('Saque Rápido', 'geral', 'combate', 'Você recebe +2 em Iniciativa e pode sacar ou guardar itens como uma ação livre.', 'Treinado em Iniciativa'),

('Trespassar', 'geral', 'combate', 'Quando você faz um ataque corpo a corpo e reduz os pontos de vida do alvo para 0 ou menos, pode gastar 1 PM para fazer um ataque adicional contra outra criatura dentro do seu alcance.', 'Ataque Poderoso'),

('Vitalidade', 'geral', 'combate', 'Você recebe +1 PV por nível de personagem e +2 em Fortitude.', 'Con 1');

-- INSERIR PODERES GERAIS - DESTINO
INSERT INTO poderes (nome, tipo, grupo, descricao, pre_requisitos) VALUES
('Acrobático', 'geral', 'destino', 'Você pode usar sua Destreza em vez de Força em testes de Atletismo. Além disso, terreno difícil não reduz seu deslocamento nem o impede de realizar investidas.', 'Des 2'),

('Ao Sabor do Destino', 'geral', 'destino', 'Confiando em suas próprias habilidades, você abre mão de usar itens mágicos. Sua autoconfiança fornece diversos benefícios de acordo com seu nível.', '6º nível de personagem'),

('Aparência Inofensiva', 'geral', 'destino', 'A primeira criatura inteligente que atacar você em uma cena deve fazer um teste de Vontade (CD Car). Se falhar, perderá sua ação.', 'Car 1'),

('Atlético', 'geral', 'destino', 'Você recebe +2 em Atletismo e +3m em seu deslocamento.', 'For 2'),

('Atraente', 'geral', 'destino', 'Você recebe +2 em testes de perícias baseadas em Carisma contra criaturas que possam se sentir fisicamente atraídas por você.', 'Car 1'),

('Comandar', 'geral', 'destino', 'Você pode gastar uma ação de movimento e 1 PM para gritar ordens para seus aliados em alcance médio. Eles recebem +1 em testes de perícia até o fim da cena.', 'Car 1'),

('Costas Largas', 'geral', 'destino', 'Seu limite de carga aumenta em 5 espaços e você pode se beneficiar de um item vestido adicional.', 'Con 1, For 1'),

('Foco em Perícia', 'geral', 'destino', 'Escolha uma perícia. Quando faz um teste dessa perícia, você pode gastar 1 PM para rolar dois dados e usar o melhor resultado.', 'Treinado na perícia escolhida'),

('Inventário Organizado', 'geral', 'destino', 'Você soma sua Inteligência no limite de espaços que pode carregar. Para você, itens muito leves ocupam 1/4 de espaço.', 'Int 1'),

('Investigador', 'geral', 'destino', 'Você recebe +2 em Investigação e soma sua Inteligência em Intuição.', 'Int 1'),

('Lobo Solitário', 'geral', 'destino', 'Você recebe +1 em testes de perícia e Defesa se estiver sem nenhum aliado em alcance curto. Você não sofre penalidade por usar Cura em si mesmo.', ''),

('Medicina', 'geral', 'destino', 'Você pode gastar uma ação completa para fazer um teste de Cura (CD 15) em uma criatura. Se você passar, ela recupera 1d6 PV, mais 1d6 para cada 5 pontos pelos quais o resultado exceder a CD.', 'Sab 1, treinado em Cura'),

('Parceiro', 'geral', 'destino', 'Você possui um parceiro animal ou humanoide que o acompanha em aventuras. É um parceiro iniciante de um tipo a sua escolha.', 'Treinado em Adestramento ou Diplomacia, 5º nível de personagem'),

('Sentidos Aguçados', 'geral', 'destino', 'Você recebe +2 em Percepção, não fica desprevenido contra inimigos que não possa ver e sempre que erra um ataque devido a camuflagem, pode rolar mais uma vez o dado da chance de falha.', 'Sab 1, treinado em Percepção'),

('Sortudo', 'geral', 'destino', 'Você pode gastar 3 PM para rolar novamente um teste recém realizado (apenas uma vez por teste).', ''),

('Surto Heroico', 'geral', 'destino', 'Uma vez por rodada, você pode gastar 5 PM para realizar uma ação padrão ou de movimento adicional.', ''),

('Torcida', 'geral', 'destino', 'Você recebe +2 em testes de perícia e Defesa quando tem a torcida a seu favor.', 'Car 1'),

('Treinamento em Perícia', 'geral', 'destino', 'Você se torna treinado em uma perícia a sua escolha.', ''),

('Venefício', 'geral', 'destino', 'Quando usa um veneno, você não corre risco de se envenenar acidentalmente. Além disso, a CD para resistir aos seus venenos aumenta em +2.', 'Treinado em Ofício (alquimista)'),

('Vontade de Ferro', 'geral', 'destino', 'Você recebe +1 PM para cada dois níveis de personagem e +2 em Vontade.', 'Sab 1');

-- INSERIR PODERES GERAIS - MAGIA
INSERT INTO poderes (nome, tipo, grupo, descricao, pre_requisitos) VALUES
('Celebrar Ritual', 'geral', 'magia', 'Você pode lançar magias como rituais. Isso dobra seu limite de PM, mas muda a execução para 1 hora e exige um gasto de T$ 10 por PM gasto.', 'Treinado em Misticismo ou Religião, 8º nível de personagem'),

('Escrever Pergaminho', 'geral', 'magia', 'Você pode usar a perícia Ofício (escriba) para fabricar pergaminhos com magias que conheça.', 'Habilidade de classe Magias, treinado em Ofício (escriba)'),

('Foco em Magia', 'geral', 'magia', 'Escolha uma magia que possa lançar. Seu custo diminui em –1 PM.', 'Lançar magias'),

('Magia Acelerada', 'geral', 'magia', 'Muda a execução da magia para ação livre. Você só pode aplicar este aprimoramento em magias com execução de movimento, padrão ou completa. Custo: +4 PM.', 'Lançar magias de 2º círculo'),

('Magia Ampliada', 'geral', 'magia', 'Aumenta o alcance da magia em um passo ou dobra a área de efeito da magia. Custo: +2 PM.', 'Lançar magias'),

('Magia Discreta', 'geral', 'magia', 'Você lança a magia sem gesticular e falar, usando apenas concentração. Custo: +2 PM.', 'Lançar magias'),

('Magia Ilimitada', 'geral', 'magia', 'Você soma seu atributo-chave no limite de PM que pode gastar numa magia.', 'Lançar magias'),

('Preparar Poção', 'geral', 'magia', 'Você pode usar a perícia Ofício (alquimista) para fabricar poções com magias que conheça de 1º e 2º círculos.', 'Habilidade de classe Magias, treinado em Ofício (alquimista)');

-- PODERES CONCEDIDOS (DIVINOS)
INSERT INTO poderes (nome, tipo, grupo, descricao, pre_requisitos) VALUES
('Afinidade com a Tormenta', 'concedido', 'aharadak', 'Você recebe +10 em testes de resistência contra efeitos da Tormenta, de suas criaturas e de devotos de Aharadak. Além disso, seu primeiro poder da Tormenta não conta para perda de Carisma.', 'Devoto de Aharadak'),

('Almejar o Impossível', 'concedido', 'valkaria', 'Quando faz um teste de perícia, um resultado de 19 ou mais no dado sempre é um sucesso, não importando o valor a ser alcançado.', 'Devoto de Valkaria ou Thwor'),

('Anfíbio', 'concedido', 'oceano', 'Você pode respirar embaixo d''água e adquire deslocamento de natação igual a seu deslocamento terrestre.', 'Devoto do Oceano'),

('Apostar com o Trapaceiro', 'concedido', 'hyninn', 'Quando faz um teste de perícia, você pode gastar 1 PM para apostar com Hyninn. Você e o mestre rolam 1d20, mas o mestre mantém o resultado dele em segredo.', 'Devoto de Hyninn'),

('Armas da Ambição', 'concedido', 'valkaria', 'Você recebe +1 em testes de ataque e na margem de ameaça com armas nas quais é proficiente.', 'Devoto de Valkaria'),

('Arsenal das Profundezas', 'concedido', 'oceano', 'Você recebe +2 nas rolagens de dano com azagaias, lanças e tridentes e seu multiplicador de crítico com essas armas aumenta em +1.', 'Devoto do Oceano'),

('Astúcia da Serpente', 'concedido', 'sszzaas', 'Você recebe +2 em Enganação, Furtividade e Intuição.', 'Devoto de Sszzaas'),

('Ataque Piedoso', 'concedido', 'lena', 'Você pode usar armas corpo a corpo para causar dano não letal sem sofrer a penalidade de –5 no teste de ataque.', 'Devoto de Lena ou Thyatis'),

('Aura de Medo', 'concedido', 'kallyadranoch', 'Você pode gastar 2 PM para gerar uma aura de medo de 9m de raio e duração até o fim da cena. Todos os inimigos que entrem na aura devem fazer um teste de Vontade (CD Car).', 'Devoto de Kallyadranoch'),

('Aura de Paz', 'concedido', 'marah', 'Você pode gastar 2 PM para gerar uma aura de paz com alcance curto e duração de uma cena. Qualquer inimigo dentro da aura que tente fazer uma ação hostil contra você deve fazer um teste de Vontade.', 'Devoto de Marah'),

('Aura Restauradora', 'concedido', 'lena', 'Efeitos de cura usados por você e seus aliados em alcance curto recuperam +1 PV por dado.', 'Devoto de Lena'),

('Bênção do Mana', 'concedido', 'wynna', 'Você recebe +1 PM a cada nível ímpar.', 'Devoto de Wynna'),

('Carícia Sombria', 'concedido', 'tenebra', 'Você pode gastar 1 PM e uma ação padrão para cobrir sua mão com energia negativa e tocar uma criatura em alcance corpo a corpo.', 'Devoto de Tenebra'),

('Centelha Mágica', 'concedido', 'wynna', 'Escolha uma magia arcana ou divina de 1º círculo. Você aprende e pode lançar essa magia.', 'Devoto de Wynna'),

('Coragem Total', 'concedido', 'valkaria', 'Você é imune a efeitos de medo, mágicos ou não.', 'Devoto de Arsenal, Khalmyr, Lin-Wu ou Valkaria'),

('Cura Gentil', 'concedido', 'lena', 'Você soma seu Carisma aos PV restaurados por seus efeitos mágicos de cura.', 'Devoto de Lena'),

('Dom da Esperança', 'concedido', 'marah', 'Você soma sua Sabedoria em seus PV em vez de Constituição, e se torna imune às condições alquebrado, esmorecido e frustrado.', 'Devoto de Marah'),

('Dom da Verdade', 'concedido', 'khalmyr', 'Você pode pagar 2 PM para receber +5 em testes de Intuição, e em testes de Percepção contra Enganação e Furtividade, até o fim da cena.', 'Devoto de Khalmyr'),

('Escamas Dracônicas', 'concedido', 'kallyadranoch', 'Você recebe +2 na Defesa e em Fortitude.', 'Devoto de Kallyadranoch'),

('Espada Justiceira', 'concedido', 'khalmyr', 'Você pode gastar 1 PM para encantar sua espada (ou outra arma corpo a corpo de corte que esteja empunhando). Ela tem seu dano aumentado em um passo até o fim da cena.', 'Devoto de Khalmyr'),

('Fulgor Solar', 'concedido', 'azgher', 'Você recebe redução de frio e trevas 5. Além disso, quando é alvo de um ataque você pode gastar 1 PM para emitir um clarão solar que deixa o atacante ofuscado por uma rodada.', 'Devoto de Azgher'),

('Fúria Divina', 'concedido', 'thwor', 'Você pode gastar 2 PM para invocar uma fúria selvagem, tornando-se temível em combate. Até o fim da cena, você recebe +2 em testes de ataque e rolagens de dano corpo a corpo.', 'Devoto de Thwor'),

('Visão nas Trevas', 'concedido', 'tenebra', 'Você enxerga perfeitamente no escuro, incluindo em magias de escuridão.', 'Devoto de Tenebra');

-- PODERES DA TORMENTA
INSERT INTO poderes (nome, tipo, grupo, descricao, pre_requisitos, restricoes) VALUES
('Anatomia Insana', 'tormenta', 'aberrante', 'Você tem 25% de chance de ignorar o dano adicional de um acerto crítico ou ataque furtivo. A chance aumenta em +25% para cada dois outros poderes da Tormenta que você possui.', '', 'Perda de 1 Carisma'),

('Antenas', 'tormenta', 'aberrante', 'Você recebe +1 em Iniciativa, Percepção e Vontade. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.', '', 'Perda de 1 Carisma'),

('Armamento Aberrante', 'tormenta', 'aberrante', 'Você pode gastar uma ação de movimento e 1 PM para produzir uma versão orgânica de qualquer arma corpo a corpo ou de arremesso com a qual seja proficiente.', 'Um poder da Tormenta', 'Perda de 1 Carisma'),

('Articulações Flexíveis', 'tormenta', 'aberrante', 'Você recebe +1 em Acrobacia, Furtividade e Reflexos. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.', '', 'Perda de 1 Carisma'),

('Asas Insetoides', 'tormenta', 'aberrante', 'Você pode gastar 1 PM para receber deslocamento de voo 9m até o fim do seu turno. O deslocamento aumenta em +1,5m para cada outro poder da Tormenta que você possui.', 'Quatro poderes da Tormenta', 'Perda de 1 Carisma'),

('Carapaça', 'tormenta', 'aberrante', 'Sua pele é recoberta por placas quitinosas. Você recebe +1 na Defesa. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.', '', 'Perda de 1 Carisma'),

('Corpo Aberrante', 'tormenta', 'aberrante', 'Crostas vermelhas em várias partes de seu corpo tornam seus ataques mais perigosos. Seu dano desarmado aumenta em um passo.', 'Um poder da Tormenta', 'Perda de 1 Carisma'),

('Dentes Afiados', 'tormenta', 'aberrante', 'Você recebe uma arma natural de mordida (dano 1d4, crítico x2, corte). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida.', '', 'Perda de 1 Carisma'),

('Desprezar a Realidade', 'tormenta', 'aberrante', 'Você pode gastar 2 PM para ficar no limiar da realidade até o início de seu próximo turno. Nesse estado, você ignora terreno difícil e causa 20% de chance de falha em efeitos usados contra você.', 'Quatro poderes da Tormenta', 'Perda de 1 Carisma'),

('Empunhadura Rubra', 'tormenta', 'aberrante', 'Você pode gastar 1 PM para cobrir suas mãos com uma carapaça rubra. Até o final da cena, você recebe +1 em Luta.', '', 'Perda de 1 Carisma'),

('Fome de Mana', 'tormenta', 'aberrante', 'Quando passa em um teste de resistência para resistir a uma habilidade mágica, você recebe 1 PM temporário cumulativo.', '', 'Perda de 1 Carisma'),

('Mãos Membranosas', 'tormenta', 'aberrante', 'Você recebe +1 em Atletismo, Fortitude e testes de agarrar. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.', '', 'Perda de 1 Carisma'),

('Membros Estendidos', 'tormenta', 'aberrante', 'Seus braços e armas naturais são grotescamente mais longos que o normal, o que aumenta seu alcance natural para ataques corpo a corpo em +1,5m.', '', 'Perda de 1 Carisma'),

('Membros Extras', 'tormenta', 'aberrante', 'Você possui duas armas naturais de patas insetoides que saem de suas costas, ombros ou flancos.', 'Quatro poderes da Tormenta', 'Perda de 1 Carisma'),

('Mente Aberrante', 'tormenta', 'aberrante', 'Você recebe resistência a efeitos mentais +1. Sempre que precisa fazer um teste de Vontade para resistir a uma habilidade, a criatura que usou essa habilidade sofre 1d6 pontos de dano psíquico.', '', 'Perda de 1 Carisma'),

('Olhos Vermelhos', 'tormenta', 'aberrante', 'Você recebe visão no escuro e +1 em Intimidação. Este bônus aumenta em +1 para cada dois outros poderes da Tormenta que você possui.', '', 'Perda de 1 Carisma'),

('Pele Corrompida', 'tormenta', 'aberrante', 'Sua carne foi mesclada à matéria vermelha. Você recebe redução de ácido, eletricidade, fogo, frio, luz e trevas 2.', '', 'Perda de 1 Carisma'),

('Sangue Ácido', 'tormenta', 'aberrante', 'Quando você sofre dano por um ataque corpo a corpo, o atacante sofre 1 ponto de dano de ácido por poder da Tormenta que você possui.', '', 'Perda de 1 Carisma'),

('Visco Rubro', 'tormenta', 'aberrante', 'Você pode gastar 1 PM para expelir um líquido grosso e corrosivo. Até o final da cena, você recebe +1 nas rolagens de dano corpo a corpo.', '', 'Perda de 1 Carisma');

-- PODERES RACIAIS (alguns exemplos principais)
INSERT INTO poderes (nome, tipo, grupo, descricao, pre_requisitos) VALUES
('Versátil', 'racial', 'humano', 'Você se torna treinado em duas perícias a sua escolha. Você pode trocar uma dessas perícias por um poder geral a sua escolha.', 'Raça Humana'),

('Conhecimento das Rochas', 'racial', 'anao', 'Você recebe visão no escuro e +2 em testes de Percepção e Sobrevivência realizados no subterrâneo.', 'Raça Anã'),

('Devagar e Sempre', 'racial', 'anao', 'Seu deslocamento é 6m (em vez de 9m). Porém, seu deslocamento não é reduzido por uso de armadura ou excesso de carga.', 'Raça Anã'),

('Duro como Pedra', 'racial', 'anao', 'Você recebe +3 pontos de vida no 1º nível e +1 por nível seguinte.', 'Raça Anã'),

('Tradição de Heredrimm', 'racial', 'anao', 'Para você, todos os machados, martelos, marretas e picaretas são armas simples. Você recebe +2 em ataques com essas armas.', 'Raça Anã'),

('Graça de Glórienn', 'racial', 'elfo', 'Seu deslocamento é 12m (em vez de 9m).', 'Raça Élfica'),

('Sangue Mágico', 'racial', 'elfo', 'Você recebe +1 ponto de mana por nível.', 'Raça Élfica'),

('Sentidos Élficos', 'racial', 'elfo', 'Você recebe visão na penumbra e +2 em Misticismo e Percepção.', 'Raça Élfica'),

('Amiga das Plantas', 'racial', 'dahllan', 'Você pode lançar a magia Controlar Plantas (atributo-chave Sabedoria).', 'Raça Dahllan'),

('Armadura de Allihanna', 'racial', 'dahllan', 'Você pode gastar uma ação de movimento e 1 PM para transformar sua pele em casca de árvore, recebendo +2 na Defesa até o fim da cena.', 'Raça Dahllan'),

('Empatia Selvagem', 'racial', 'dahllan', 'Você pode se comunicar com animais por meio de linguagem corporal e vocalizações.', 'Raça Dahllan'),

('Engenhoso', 'racial', 'goblin', 'Você não sofre penalidades em testes de perícia por não usar ferramentas. Se usar a ferramenta necessária, recebe +2 no teste de perícia.', 'Raça Goblin'),

('Espelunqueiro', 'racial', 'goblin', 'Você recebe visão no escuro e deslocamento de escalada igual ao seu deslocamento terrestre.', 'Raça Goblin'),

('Peste Esguia', 'racial', 'goblin', 'Seu tamanho é Pequeno, mas seu deslocamento se mantém 9m.', 'Raça Goblin'),

('Rato das Ruas', 'racial', 'goblin', 'Você recebe +2 em Fortitude e sua recuperação de PV e PM nunca é inferior ao seu nível.', 'Raça Goblin');

-- Verificar inserções
SELECT COUNT(*) as total_poderes, tipo, COUNT(*) as por_tipo 
FROM poderes 
GROUP BY tipo;