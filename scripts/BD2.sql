-- Script para atualizar todas as raças do Tormenta 20
-- Primeiro, limpar raças existentes
DELETE FROM racas;

-- Resetar a sequência do ID
ALTER SEQUENCE racas_id_seq RESTART WITH 1;

-- RAÇAS PRINCIPAIS (mais numerosas)
INSERT INTO racas (nome, descricao, bonus_atributos, habilidades_raciais) VALUES

-- 1. Humano
('Humano', 
 'Humanos são como uma praga: espalham-se por todo o mundo de Arton. Não interessa onde você olhe ou por onde passe, sempre haverá algum humano se metendo onde não deve. Aos quinze anos já se consideram adultos. São considerados os escolhidos dos deuses, aqueles que governam o mundo. Em sua variedade e adaptabilidade, são encontrados em quase todos os pontos do continente.',
 '{"livre": 3}',
 ARRAY['Versátil', 'Ambição de Valkaria']),

-- 2. Anão
('Anão',
 'Não existe nada mais confiável em Arton que um anão. São troncudos, maciços, resistentes como os pedaços de minério pelos quais são apaixonados. A justiça é muito importante para os anões — tão importante quanto suas longas e vastas barbas. A pátria dos anões, Doherimm, é guardada a sete chaves.',
 '{"constituicao": 2, "sabedoria": 1, "destreza": -1}',
 ARRAY['Conhecimento das Rochas', 'Devagar e Sempre', 'Duro como Pedra', 'Tradição de Heredrimm']),

-- 3. Dahllan
('Dahllan',
 'Houve época em que meias-dríades eram muito raras. Recentemente, jovens meias-dríades começaram a surgir no Reinado. Por não serem necessariamente filhas de dríades, receberam outro nome: Dahllan. Parte humanas, parte fadas, são uma raça de mulheres com a seiva de árvores correndo nas veias.',
 '{"sabedoria": 2, "destreza": 1, "inteligencia": -1}',
 ARRAY['Amiga das Plantas', 'Armadura de Allihanna', 'Empatia Selvagem']),

-- 4. Elfo
('Elfo',
 'Os elfos vieram de longe há muito tempo. São belos e esguios, de cabelos e olhos de cores variadas. Lenórienn caiu, vítima da Aliança Negra dos goblinoides. Com a morte de Tauron e livres dos desígnios de uma divindade mesquinha, os elfos têm pela primeira vez um futuro em branco à frente.',
 '{"inteligencia": 2, "destreza": 1, "constituicao": -1}',
 ARRAY['Graça de Glórienn', 'Sangue Mágico', 'Sentidos Élficos']),

-- 5. Goblin
('Goblin',
 'Goblins sempre existirão. Pequenos, de pele rugosa verde, marrom ou amarela, orelhas longas e nariz pontudo, vivem nas frestas do mundo civilizado. O que define os goblins é perseverança e inventividade. Criam engenhocas que desafiam a lógica.',
 '{"destreza": 2, "inteligencia": 1, "carisma": -1}',
 ARRAY['Engenhoso', 'Espelunqueiro', 'Peste Esguia', 'Rato das Ruas']),

-- 6. Lefou
('Lefou',
 'Com a influência macabra da Tormenta permeando cada vez mais o mundo, surgiram os lefou. Estes meios-demônios de aparência grotesca passaram a nascer em famílias de outras raças. Entre os que escapam, muitos escolhem abraçar o mal, enquanto outros decidem combatê-lo.',
 '{"livre": 3, "carisma": -1}',
 ARRAY['Cria da Tormenta', 'Deformidade']),

-- 7. Minotauro
('Minotauro',
 'Povo guerreiro, orgulhoso e poderoso, criadores de uma civilização avançada. Em seus tempos áureos, tomaram grande parte de Arton. Hoje, após a morte de sua divindade e a decadência de seu Império, os minotauros lutam para recuperar a glória perdida.',
 '{"forca": 2, "constituicao": 1, "sabedoria": -1}',
 ARRAY['Chifres', 'Couro Rígido', 'Faro', 'Medo de Altura']),

-- 8. Qareen
('Qareen',
 'Descendentes de poderosos gênios, os qareen são otimistas, generosos e prestativos, sempre ansiosos por ajudar. Consideram-se abençoados pela Deusa da Magia, exibindo como evidência a marca de Wynna em seus corpos. Sua magia é mais poderosa quando usada para realizar desejos de outros.',
 '{"carisma": 2, "inteligencia": 1, "sabedoria": -1}',
 ARRAY['Desejos', 'Resistência Elemental', 'Tatuagem Mística']),

-- RAÇAS EXTRAS (mais raras)

-- 9. Golem
('Golem',
 'Construtos sem vida, criados não pelos deuses, mas por mortais. São movidos por forças vivas — espíritos elementais selvagens, capturados e lacrados por meios mágicos em corpos de pedra e metal. Muitos demonstram alta inteligência, personalidade e iniciativa.',
 '{"forca": 2, "constituicao": 1, "carisma": -1}',
 ARRAY['Chassi', 'Criatura Artificial', 'Propósito de Criação', 'Fonte Elemental']),

-- 10. Hynne
('Hynne',
 'Também conhecidos como halflings ou "pequeninos", os hynne são apreciadores de boa comida e casas aconchegantes. Quando decidem sair pelo mundo, recorrem à agilidade e encanto naturais para ludibriar os inimigos. Foram acolhidos pelas Repúblicas Livres de Sambúrdia.',
 '{"destreza": 2, "carisma": 1, "forca": -1}',
 ARRAY['Arremessador', 'Pequeno e Rechonchudo', 'Sorte Salvadora']),

-- 11. Kliren
('Kliren',
 'Visitantes de outro mundo que seriam uma combinação entre humanos e gnomos. Somam a alta inteligência gnômica e a curiosidade humana, resultando em seres de extrema engenhosidade, criatividade e talento com aparatos mecânicos.',
 '{"inteligencia": 2, "carisma": 1, "forca": -1}',
 ARRAY['Híbrido', 'Engenhosidade', 'Ossos Frágeis', 'Vanguardista']),

-- 12. Medusa
('Medusa',
 'Criaturas reclusas famosas por transformar suas vítimas em pedra com um simples olhar. Jovens medusas por vezes rejeitam a solidão e crueldade racial, aventurando-se no Reinado. Conseguem se fazer passar por mulheres humanas, quando escondem o cabelo feito de serpentes.',
 '{"destreza": 2, "carisma": 1}',
 ARRAY['Cria de Megalokk', 'Natureza Venenosa', 'Olhar Atordoante']),

-- 13. Osteon
('Osteon',
 'Esqueletos que demonstram a inteligência e a consciência das raças vivas, sendo capazes de adotar quaisquer de suas profissões e devoções. Alguns atribuem seu surgimento à queda de Ragnar; outros dizem ser consequência da ascensão de Ferren Asloth como um poderoso lich.',
 '{"livre": 3, "constituicao": -1}',
 ARRAY['Armadura Óssea', 'Memória Póstuma', 'Natureza Esquelética', 'Preço da Não Vida']),

-- 14. Sereia/Tritão
('Sereia/Tritão',
 'Sereias (femininas) e tritões (masculinos) de torso humanoide e corpo de peixe podem adotar forma bípede para caminhar em terras emersas. Têm feito isso com cada vez mais frequência, enxergando Arton como um mundo misterioso, exótico, cheio de oportunidades.',
 '{"livre": 3}',
 ARRAY['Canção dos Mares', 'Mestre do Tridente', 'Transformação Anfíbia']),

-- 15. Sílfide
('Sílfide',
 'As mais numerosas fadas em Arton. Criaturinhas esvoaçantes, com suas delicadas asas de inseto e grandes olhos escuros. Curiosas e brincalhonas, parecem sempre à procura de alguma diversão. Gostam de usar magias e ilusões para pregar peças.',
 '{"carisma": 2, "destreza": 1, "forca": -2}',
 ARRAY['Asas de Borboleta', 'Espírito da Natureza', 'Magia das Fadas']),

-- 16. Suraggel (Aggelus)
('Suraggel (Aggelus)',
 'Descendentes de extraplanares divinos com traços angelicais. Orientados para seu lado celestial, são conhecidos como aggelus. Sua natureza combina com a ascendência celestial, lembrando habitantes dos Mundos dos Deuses.',
 '{"sabedoria": 2, "carisma": 1}',
 ARRAY['Herança Divina', 'Luz Sagrada']),

-- 17. Suraggel (Sulfure)
('Suraggel (Sulfure)',
 'Descendentes de extraplanares divinos com traços demoníacos. Orientados para o lado abissal, são chamados sulfure. Podem ser surpreendentes e contraditórios - não se espante ao conhecer um sulfure paladino.',
 '{"destreza": 2, "inteligencia": 1}',
 ARRAY['Herança Divina', 'Sombras Profanas']),

-- 18. Trog
('Trog',
 'Trogloditas são homens-lagarto primitivos e subterrâneos que odeiam todos os outros seres. Uns poucos divergem da crueldade e selvageria inerentes à raça. Abandonam a tribo ou são expulsos, escolhendo caminhos surpreendentes.',
 '{"constituicao": 2, "forca": 1, "inteligencia": -1}',
 ARRAY['Mau Cheiro', 'Mordida', 'Reptiliano', 'Sangue Frio']);

-- Verificar inserção
SELECT COUNT(*) as total_racas FROM racas;