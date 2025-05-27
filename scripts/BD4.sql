-- Inserir poderes raciais completos baseados no documento de raças

-- PODERES RACIAIS - HUMANO
INSERT INTO poderes (nome, tipo, grupo, descricao, pre_requisitos) VALUES
('Versatilidade Humana', 'racial', 'humano', 'Você se torna treinado em duas perícias a sua escolha (não precisam ser da sua classe). Você pode trocar uma dessas perícias por um poder geral a sua escolha.', 'Raça Humana'),

-- PODERES RACIAIS - ANÃO
('Conhecimento das Rochas', 'racial', 'anao', 'Você recebe visão no escuro e +2 em testes de Percepção e Sobrevivência realizados no subterrâneo.', 'Raça Anã'),
('Devagar e Sempre', 'racial', 'anao', 'Seu deslocamento é 6m (em vez de 9m). Porém, seu deslocamento não é reduzido por uso de armadura ou excesso de carga.', 'Raça Anã'),
('Duro como Pedra', 'racial', 'anao', 'Você recebe +3 pontos de vida no 1º nível e +1 por nível seguinte.', 'Raça Anã'),
('Tradição de Heredrimm', 'racial', 'anao', 'Para você, todos os machados, martelos, marretas e picaretas são armas simples. Você recebe +2 em ataques com essas armas.', 'Raça Anã'),

-- PODERES RACIAIS - DAHLLAN
('Amiga das Plantas', 'racial', 'dahllan', 'Você pode lançar a magia Controlar Plantas (atributo-chave Sabedoria). Caso aprenda novamente essa magia, seu custo diminui em –1 PM.', 'Raça Dahllan'),
('Armadura de Allihanna', 'racial', 'dahllan', 'Você pode gastar uma ação de movimento e 1 PM para transformar sua pele em casca de árvore, recebendo +2 na Defesa até o fim da cena.', 'Raça Dahllan'),
('Empatia Selvagem', 'racial', 'dahllan', 'Você pode se comunicar com animais por meio de linguagem corporal e vocalizações. Você pode usar Adestramento para mudar atitude e persuasão com animais. Caso receba esta habilidade novamente, recebe +2 em Adestramento.', 'Raça Dahllan'),

-- PODERES RACIAIS - ELFO
('Graça de Glórienn', 'racial', 'elfo', 'Seu deslocamento é 12m (em vez de 9m).', 'Raça Élfica'),
('Sangue Mágico', 'racial', 'elfo', 'Você recebe +1 ponto de mana por nível.', 'Raça Élfica'),
('Sentidos Élficos', 'racial', 'elfo', 'Você recebe visão na penumbra e +2 em Misticismo e Percepção.', 'Raça Élfica'),

-- PODERES RACIAIS - GOBLIN
('Engenhoso', 'racial', 'goblin', 'Você não sofre penalidades em testes de perícia por não usar ferramentas. Se usar a ferramenta necessária, recebe +2 no teste de perícia.', 'Raça Goblin'),
('Espelunqueiro', 'racial', 'goblin', 'Você recebe visão no escuro e deslocamento de escalada igual ao seu deslocamento terrestre.', 'Raça Goblin'),
('Peste Esguia', 'racial', 'goblin', 'Seu tamanho é Pequeno, mas seu deslocamento se mantém 9m. Apesar de pequenos, goblins são rápidos.', 'Raça Goblin'),
('Rato das Ruas', 'racial', 'goblin', 'Você recebe +2 em Fortitude e sua recuperação de PV e PM nunca é inferior ao seu nível.', 'Raça Goblin'),

-- PODERES RACIAIS - LEFOU
('Cria da Tormenta', 'racial', 'lefou', 'Você é uma criatura do tipo monstro e recebe +5 em testes de resistência contra efeitos causados por lefeu e pela Tormenta.', 'Raça Lefou'),
('Deformidade', 'racial', 'lefou', 'Todo lefou possui defeitos físicos que, embora desagradáveis, conferem certas vantagens. Você recebe +2 em duas perícias a sua escolha. Cada um desses bônus conta como um poder da Tormenta (exceto para perda de Carisma). Você pode trocar um desses bônus por um poder da Tormenta a sua escolha (ele também não conta para perda de Carisma).', 'Raça Lefou'),

-- PODERES RACIAIS - MINOTAURO
('Chifres', 'racial', 'minotauro', 'Você possui uma arma natural de chifres (dano 1d6, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com os chifres.', 'Raça Minotauro'),
('Couro Rígido', 'racial', 'minotauro', 'Sua pele é dura como a de um touro. Você recebe +1 na Defesa.', 'Raça Minotauro'),
('Faro', 'racial', 'minotauro', 'Você tem olfato apurado. Contra inimigos em alcance curto que não possa ver, você não fica desprevenido e camuflagem total lhe causa apenas 20% de chance de falha.', 'Raça Minotauro'),

-- PODERES RACIAIS - QAREEN
('Desejos', 'racial', 'qareen', 'Se lançar uma magia que alguém tenha pedido desde seu último turno, o custo da magia diminui em –1 PM. Fazer um desejo ao qareen é uma ação livre.', 'Raça Qareen'),
('Resistência Elemental', 'racial', 'qareen', 'Conforme sua ascendência, você recebe redução 10 a um tipo de dano. Escolha uma: frio (qareen da água), eletricidade (do ar), fogo (do fogo), ácido (da terra), luz (da luz) ou trevas (qareen das trevas).', 'Raça Qareen'),
('Tatuagem Mística', 'racial', 'qareen', 'Você pode lançar uma magia de 1º círculo a sua escolha (atributo-chave Carisma). Caso aprenda novamente essa magia, seu custo diminui em –1 PM.', 'Raça Qareen'),

-- PODERES RACIAIS - GOLEM
('Chassi', 'racial', 'golem', 'Seu corpo artificial é resistente, mas rígido. Seu deslocamento é 6m, mas não é reduzido por uso de armadura ou excesso de carga. Você recebe +2 na Defesa, mas possui penalidade de armadura –2. Você leva um dia para vestir ou remover uma armadura. Por ser acoplada, sua armadura não conta no limite de itens que você pode usar.', 'Raça Golem'),
('Criatura Artificial', 'racial', 'golem', 'Você é uma criatura do tipo construto. Recebe visão no escuro e imunidade a efeitos de cansaço, metabólicos e de veneno. Além disso, não precisa respirar, alimentar-se ou dormir, mas não se beneficia de cura mundana e de itens da categoria alimentação. Você precisa ficar inerte por oito horas por dia para recarregar sua fonte de energia.', 'Raça Golem'),
('Propósito de Criação', 'racial', 'golem', 'Você foi construído "pronto" para um propósito específico e não teve uma infância. Você não tem direito a escolher uma origem, mas recebe um poder geral a sua escolha.', 'Raça Golem'),
('Fonte Elemental', 'racial', 'golem', 'Você possui um espírito elemental preso em seu corpo. Escolha entre água (frio), ar (eletricidade), fogo (fogo) e terra (ácido). Você é imune a dano desse tipo. Se fosse sofrer dano mágico desse tipo, em vez disso cura PV em quantidade igual à metade do dano.', 'Raça Golem'),

-- PODERES RACIAIS - HYNNE
('Arremessador', 'racial', 'hynne', 'Quando faz um ataque à distância com uma funda ou uma arma de arremesso, seu dano aumenta em um passo.', 'Raça Hynne'),
('Pequeno e Rechonchudo', 'racial', 'hynne', 'Seu tamanho é Pequeno e seu deslocamento é 6m. Você recebe +2 em Enganação e pode usar Destreza como atributo-chave de Atletismo (em vez de Força).', 'Raça Hynne'),
('Sorte Salvadora', 'racial', 'hynne', 'Quando faz um teste de resistência, você pode gastar 1 PM para rolar este teste novamente.', 'Raça Hynne'),

-- PODERES RACIAIS - KLIREN
('Híbrido', 'racial', 'kliren', 'Sua natureza multifacetada fez com que você aprendesse conhecimentos variados. Você se torna treinado em uma perícia a sua escolha (não precisa ser da sua classe).', 'Raça Kliren'),
('Engenhosidade', 'racial', 'kliren', 'Quando faz um teste de perícia, você pode gastar 2 PM para somar sua Inteligência no teste. Você não pode usar esta habilidade em testes de ataque. Caso receba esta habilidade novamente, seu custo é reduzido em –1 PM.', 'Raça Kliren'),
('Ossos Frágeis', 'racial', 'kliren', 'Você sofre 1 ponto de dano adicional por dado de dano de impacto. Por exemplo, se for atingido por uma clava (dano 1d6), sofre 1d6+1 pontos de dano.', 'Raça Kliren'),
('Vanguardista', 'racial', 'kliren', 'Você recebe proficiência em armas de fogo e +2 em Ofício (um qualquer, a sua escolha).', 'Raça Kliren'),

-- PODERES RACIAIS - MEDUSA
('Cria de Megalokk', 'racial', 'medusa', 'Você é uma criatura do tipo monstro e recebe visão no escuro.', 'Raça Medusa'),
('Natureza Venenosa', 'racial', 'medusa', 'Você recebe resistência a veneno +5 e pode gastar uma ação de movimento e 1 PM para envenenar uma arma que esteja usando. A arma causa perda de 1d12 pontos de vida. O veneno dura até você acertar um ataque ou até o fim da cena (o que acontecer primeiro).', 'Raça Medusa'),
('Olhar Atordoante', 'racial', 'medusa', 'Você pode gastar uma ação de movimento e 1 PM para forçar uma criatura em alcance curto a fazer um teste de Fortitude (CD Car). Se a criatura falhar, fica atordoada por uma rodada (apenas uma vez por cena).', 'Raça Medusa'),

-- PODERES RACIAIS - OSTEON
('Armadura Óssea', 'racial', 'osteon', 'Você recebe redução de corte, frio e perfuração 5.', 'Raça Osteon'),
('Memória Póstuma', 'racial', 'osteon', 'Você se torna treinado em uma perícia (não precisa ser da sua classe) ou recebe um poder geral a sua escolha. Como alternativa, você pode ser um osteon de outra raça humanoide que não humano. Neste caso, você ganha uma habilidade dessa raça a sua escolha.', 'Raça Osteon'),
('Natureza Esquelética', 'racial', 'osteon', 'Você é uma criatura do tipo morto-vivo. Recebe visão no escuro e imunidade a efeitos de cansaço, metabólicos, de trevas e de veneno. Além disso, não precisa respirar, alimentar-se ou dormir. Efeitos mágicos de cura de luz causam dano a você e você não se beneficia de itens da categoria alimentação, mas dano de trevas recupera seus PV.', 'Raça Osteon'),
('Preço da Não Vida', 'racial', 'osteon', 'Você precisa passar oito horas sob a luz de estrelas ou no subterrâneo. Se fizer isso, recupera PV e PM por descanso em condições normais. Caso contrário, sofre os efeitos de fome.', 'Raça Osteon'),

-- PODERES RACIAIS - SEREIA/TRITÃO
('Canção dos Mares', 'racial', 'sereia', 'Você pode lançar duas das magias a seguir: Amedrontar, Comando, Despedaçar, Enfeitiçar, Hipnotismo ou Sono (atributo-chave Carisma). Caso aprenda novamente uma dessas magias, seu custo diminui em –1 PM.', 'Raça Sereia/Tritão'),
('Mestre do Tridente', 'racial', 'sereia', 'Para você, o tridente é uma arma simples. Além disso, você recebe +2 em rolagens de dano com azagaias, lanças e tridentes.', 'Raça Sereia/Tritão'),
('Transformação Anfíbia', 'racial', 'sereia', 'Você pode respirar debaixo da água e possui uma cauda que fornece deslocamento de natação 12m. Quando fora da água, sua cauda desaparece e dá lugar a pernas (deslocamento 9m). Se permanecer mais de um dia sem contato com água, você não recupera PM com descanso até voltar para a água.', 'Raça Sereia/Tritão'),

-- PODERES RACIAIS - SÍLFIDE
('Asas de Borboleta', 'racial', 'silfide', 'Seu tamanho é Minúsculo. Você pode pairar a 1,5m do chão com deslocamento 9m. Isso permite que você ignore terreno difícil e o torna imune a dano por queda (a menos que esteja inconsciente). Você pode gastar 1 PM por rodada para voar com deslocamento de 12m.', 'Raça Sílfide'),
('Espírito da Natureza', 'racial', 'silfide', 'Você é uma criatura do tipo espírito, recebe visão na penumbra e pode falar com animais livremente.', 'Raça Sílfide'),
('Magia das Fadas', 'racial', 'silfide', 'Você pode lançar duas das magias a seguir (atributo-chave Carisma): Criar Ilusão, Enfeitiçar, Luz (como uma magia arcana) e Sono. Caso aprenda novamente uma dessas magias, seu custo diminui em –1 PM.', 'Raça Sílfide'),

-- PODERES RACIAIS - SURAGGEL (AGGELUS)
('Herança Divina (Aggelus)', 'racial', 'suraggel_aggelus', 'Você possui a essência divina correndo em suas veias, conectando-o aos planos celestiais.', 'Raça Suraggel (Aggelus)'),
('Luz Sagrada', 'racial', 'suraggel_aggelus', 'Você recebe +2 em Diplomacia e Intuição. Além disso, pode lançar Luz (como uma magia divina; atributo-chave Carisma). Caso aprenda novamente essa magia, seu custo diminui em –1 PM.', 'Raça Suraggel (Aggelus)'),

-- PODERES RACIAIS - SURAGGEL (SULFURE)
('Herança Divina (Sulfure)', 'racial', 'suraggel_sulfure', 'Você possui a essência abissal correndo em suas veias, conectando-o aos planos infernais.', 'Raça Suraggel (Sulfure)'),
('Sombras Profanas', 'racial', 'suraggel_sulfure', 'Você recebe +2 em Enganação e Furtividade. Além disso, pode lançar Escuridão (como uma magia divina; atributo-chave Inteligência). Caso aprenda novamente essa magia, seu custo diminui em –1 PM.', 'Raça Suraggel (Sulfure)'),

-- PODERES RACIAIS - TROG
('Mau Cheiro', 'racial', 'trog', 'Você pode gastar uma ação padrão e 2 PM para expelir um gás fétido. Todas as criaturas (exceto trogs) em alcance curto devem passar em um teste de Fortitude contra veneno (CD Con) ou ficarão enjoadas durante 1d6 rodadas. Uma criatura que passe no teste de resistência fica imune a esta habilidade por um dia.', 'Raça Trog'),
('Mordida', 'racial', 'trog', 'Você possui uma arma natural de mordida (dano 1d6, crítico x2, perfuração). Uma vez por rodada, quando usa a ação agredir para atacar com outra arma, pode gastar 1 PM para fazer um ataque corpo a corpo extra com a mordida.', 'Raça Trog'),
('Reptiliano', 'racial', 'trog', 'Você é uma criatura do tipo monstro e recebe visão no escuro, +1 na Defesa e, se estiver sem armadura ou roupas pesadas, +5 em Furtividade.', 'Raça Trog');

-- Criar relacionamentos entre raças e seus poderes (tabela auxiliar)
CREATE TABLE IF NOT EXISTS raca_poderes (
  id SERIAL PRIMARY KEY,
  raca_id INTEGER REFERENCES racas(id),
  poder_id INTEGER REFERENCES poderes(id),
  automatico BOOLEAN DEFAULT TRUE, -- Se o poder é automaticamente concedido
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Inserir relacionamentos raça-poderes
-- Nota: Aqui você precisaria mapear os IDs das raças com os IDs dos poderes
-- Como exemplo, vou mostrar como seria para alguns casos:

-- Humano (assumindo raca_id = 1)
INSERT INTO raca_poderes (raca_id, poder_id, automatico) 
SELECT 1, id, true FROM poderes WHERE nome = 'Versatilidade Humana';

-- Anão (assumindo raca_id = 2)
INSERT INTO raca_poderes (raca_id, poder_id, automatico) 
SELECT 2, id, true FROM poderes WHERE grupo = 'anao';

INSERT INTO raca_poderes (raca_id, poder_id, automatico) 
SELECT 3, id, true FROM poderes WHERE grupo = 'dahllan';

-- Elfo (assumindo raca_id = 3)
INSERT INTO raca_poderes (raca_id, poder_id, automatico) 
SELECT 4, id, true FROM poderes WHERE grupo = 'elfo';

INSERT INTO raca_poderes (raca_id, poder_id, automatico) 
SELECT 5, id, true FROM poderes WHERE grupo = 'goblin';

INSERT INTO raca_poderes (raca_id, poder_id, automatico) 
SELECT 6, id, true FROM poderes WHERE grupo = 'lefou';

INSERT INTO raca_poderes (raca_id, poder_id, automatico) 
SELECT 7, id, true FROM poderes WHERE grupo = 'minotauro';

INSERT INTO raca_poderes (raca_id, poder_id, automatico) 
SELECT 8, id, true FROM poderes WHERE grupo = 'qareen';

INSERT INTO raca_poderes (raca_id, poder_id, automatico) 
SELECT 9, id, true FROM poderes WHERE grupo = 'golem';

INSERT INTO raca_poderes (raca_id, poder_id, automatico) 
SELECT 10, id, true FROM poderes WHERE grupo = 'hynne';

INSERT INTO raca_poderes (raca_id, poder_id, automatico) 
SELECT 11, id, true FROM poderes WHERE grupo = 'kliren';

INSERT INTO raca_poderes (raca_id, poder_id, automatico) 
SELECT 12, id, true FROM poderes WHERE grupo = 'medusa';

INSERT INTO raca_poderes (raca_id, poder_id, automatico) 
SELECT 13, id, true FROM poderes WHERE grupo = 'osteon';

INSERT INTO raca_poderes (raca_id, poder_id, automatico) 
SELECT 14, id, true FROM poderes WHERE grupo = 'sereia';

INSERT INTO raca_poderes (raca_id, poder_id, automatico) 
SELECT 15, id, true FROM poderes WHERE grupo = 'silfide';

INSERT INTO raca_poderes (raca_id, poder_id, automatico) 
SELECT 16, id, true FROM poderes WHERE grupo = 'suraggel_aggelus';

INSERT INTO raca_poderes (raca_id, poder_id, automatico) 
SELECT 17, id, true FROM poderes WHERE grupo = 'suraggel_sulfure';

INSERT INTO raca_poderes (raca_id, poder_id, automatico) 
SELECT 18, id, true FROM poderes WHERE grupo = 'trog';

-- Verificar inserções
SELECT COUNT(*) as total_poderes_raciais FROM poderes WHERE tipo = 'racial';