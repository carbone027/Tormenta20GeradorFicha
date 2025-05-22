// Base de dados completa do sistema Tormenta20
const T20Data = {
    races: {
        humano: {
            name: "Humano",
            attributeBonus: { any: 2 },
            size: "Médio",
            displacement: 9,
            traits: [
                "Versátil: +1 perícia treinada adicional",
                "Ambição: +2 em testes de perícia (1x por cena)",
                "Potencial Humano: Recebe um poder geral adicional no 1º nível"
            ],
            languages: ["Comum"],
            bonusSkills: 1
        },
        anao: {
            name: "Anão",
            attributeBonus: { constitution: 2, wisdom: 1 },
            size: "Médio",
            displacement: 6,
            traits: [
                "Tradição: Conhecimento e Ofício são perícias de classe",
                "Teimosia: +2 em testes de Vontade",
                "Conhecimento das Pedras: +2 em Percepção para armadilhas e passagens secretas"
            ],
            languages: ["Comum", "Anão"],
            resistance: ["veneno"],
            skillBonuses: { "Vontade": 2, "Percepção": 2 }
        },
        elfo: {
            name: "Elfo",
            attributeBonus: { dexterity: 2, intelligence: 1 },
            size: "Médio",
            displacement: 9,
            traits: [
                "Sentidos Aguçados: +2 em testes de Percepção",
                "Herança Mágica: Pode lançar magias arcanas de 1º círculo",
                "Transe: Só precisa meditar 4 horas para descansar"
            ],
            languages: ["Comum", "Élfico"],
            vision: "penumbra",
            skillBonuses: { "Percepção": 2 }
        },
        halfling: {
            name: "Halfling",
            attributeBonus: { dexterity: 2, charisma: 1 },
            size: "Pequeno",
            displacement: 6,
            traits: [
                "Sortudo: Role novamente 1s naturais",
                "Pés Ligeiros: +2 em testes de Furtividade",
                "Coragem: +2 em testes de resistência contra medo"
            ],
            languages: ["Comum", "Halfling"],
            skillBonuses: { "Furtividade": 2 }
        },
        goblin: {
            name: "Goblin",
            attributeBonus: { dexterity: 2, intelligence: 1 },
            size: "Pequeno",
            displacement: 6,
            traits: [
                "Engenhosidade: +2 em testes de Reflexos e Máquinas",
                "Peste: +2 em testes de Enganação e Furtividade",
                "Instinto de Sobrevivência: +1 em CA quando adjacente a aliados"
            ],
            languages: ["Comum", "Goblin"],
            skillBonuses: { "Reflexos": 2, "Máquinas": 2, "Enganação": 2, "Furtividade": 2 }
        },
        minotauro: {
            name: "Minotauro",
            attributeBonus: { strength: 2, constitution: 1 },
            size: "Médio",
            displacement: 9,
            traits: [
                "Ataque com Chifres: 1d6 de dano",
                "Coração Bravo: +2 em testes contra medo",
                "Faro: +2 em testes de Percepção para rastrear"
            ],
            languages: ["Comum", "Minotauro"],
            skillBonuses: { "Percepção": 2 }
        },
        qareen: {
            name: "Qareen",
            attributeBonus: { intelligence: 2, charisma: 1 },
            size: "Médio",
            displacement: 9,
            traits: [
                "Herança Elemental: Resistência a um tipo de dano elemental",
                "Rajada Elemental: Ataque à distância elemental",
                "Levitação: Pode levitar por curtos períodos"
            ],
            languages: ["Comum", "Qareen"]
        },
        lefou: {
            name: "Lefou",
            attributeBonus: { constitution: 2, wisdom: -2, any: 1 },
            size: "Médio",
            displacement: 9,
            traits: [
                "Cicatrização: Regenera 1 PV por dia",
                "Fortitude Amaldiçoada: +2 em Fortitude",
                "Maldição Menor: Sofre uma maldição menor aleatória"
            ],
            languages: ["Comum"],
            skillBonuses: { "Fortitude": 2 }
        },
        medusa: {
            name: "Medusa",
            attributeBonus: { dexterity: 2, charisma: 1, constitution: -2 },
            size: "Médio",
            displacement: 9,
            traits: [
                "Olhar Petrificante: Pode petrificar inimigos",
                "Cabelos de Serpente: Ataque adicional com serpentes",
                "Resistência à Petrificação: +4 contra petrificação"
            ],
            languages: ["Comum", "Medusa"]
        },
        osteon: {
            name: "Osteon",
            attributeBonus: { dexterity: 2, intelligence: 1, constitution: -2 },
            size: "Médio",
            displacement: 9,
            traits: [
                "Morto-Vivo: Imune a venenos e doenças",
                "Esquelético: +2 em Furtividade",
                "Memórias Fragmentadas: +2 em uma perícia de Conhecimento"
            ],
            languages: ["Comum"],
            skillBonuses: { "Furtividade": 2, "Conhecimento": 2 }
        },
        sereia: {
            name: "Sereia/Tritão",
            attributeBonus: { charisma: 2, wisdom: 1, constitution: -2 },
            size: "Médio",
            displacement: 6,
            traits: [
                "Anfíbio: Pode respirar ar e água",
                "Natação: Velocidade de natação 12m",
                "Canto Hipnótico: Pode encantar com o canto"
            ],
            languages: ["Comum", "Aquan"]
        },
        suraggel: {
            name: "Suraggel",
            attributeBonus: { wisdom: 2, charisma: 1, strength: -2 },
            size: "Médio",
            displacement: 9,
            traits: [
                "Asas: Pode voar por curtos períodos",
                "Toque Curativo: Pode curar com toque",
                "Resistência Celestial: Resistência a energia negativa"
            ],
            languages: ["Comum", "Celestial"]
        },
        trog: {
            name: "Trog",
            attributeBonus: { strength: 2, constitution: 1, dexterity: -2 },
            size: "Médio",
            displacement: 9,
            traits: [
                "Pele Rochosa: +2 na Defesa",
                "Força Bruta: +2 em testes de quebrar objetos",
                "Resistência Elemental: Resistência a ácido"
            ],
            languages: ["Comum", "Terran"],
            defenseBonus: 2
        },
        kliren: {
            name: "Kliren",
            attributeBonus: { dexterity: 2, wisdom: 1, charisma: -2 },
            size: "Médio",
            displacement: 9,
            traits: [
                "Teleporte Sombrio: Teleporte através de sombras",
                "Furtividade Sombria: +4 em Furtividade na escuridão",
                "Resistência às Trevas: Resistência a energia negativa"
            ],
            languages: ["Comum", "Sombrio"],
            skillBonuses: { "Furtividade": 4 }
        },
        aggelus: {
            name: "Aggelus",
            attributeBonus: { wisdom: 2, charisma: 1, constitution: -2 },
            size: "Médio",
            displacement: 9,
            traits: [
                "Voo: Pode voar com velocidade igual ao deslocamento",
                "Luz Sagrada: Pode criar luz como magia",
                "Aura de Proteção: +1 em testes de resistência para aliados próximos"
            ],
            languages: ["Comum", "Celestial"]
        },
        golem: {
            name: "Golem",
            attributeBonus: { strength: 4, constitution: 2, intelligence: -2, wisdom: -2, charisma: -4 },
            size: "Médio",
            displacement: 6,
            traits: [
                "Construto: Imune a venenos, doenças e efeitos mentais",
                "Armadura Natural: +2 na Defesa",
                "Resistência Física: Resistência a dano físico 5"
            ],
            languages: ["Comum"],
            defenseBonus: 2
        },
        sprite: {
            name: "Sprite",
            attributeBonus: { dexterity: 4, charisma: 2, strength: -2, constitution: -2 },
            size: "Pequeno",
            displacement: 6,
            traits: [
                "Voo: Pode voar com velocidade igual ao deslocamento",
                "Magia Feérica: Pode lançar magias de ilusão como truques",
                "Diminuto: +4 em testes de Furtividade"
            ],
            languages: ["Comum", "Silvestre"],
            skillBonuses: { "Furtividade": 4 }
        },
        dahllan: {
            name: "Dahllan",
            attributeBonus: { wisdom: 2, constitution: 1, intelligence: -2 },
            size: "Médio",
            displacement: 9,
            traits: [
                "Empatia Selvagem: +2 em testes de Adestramento",
                "Rastreamento: +2 em testes de Sobrevivência",
                "Sentidos Aguçados: +2 em Percepção"
            ],
            languages: ["Comum", "Silvestre"],
            skillBonuses: { "Adestramento": 2, "Sobrevivência": 2, "Percepção": 2 }
        },
        kreen: {
            name: "Kreen",
            attributeBonus: { dexterity: 2, constitution: 1, charisma: -2 },
            size: "Médio",
            displacement: 12,
            traits: [
                "Salto: +4 em testes de Atletismo para saltar",
                "Mordida Venenosa: Ataque natural com veneno",
                "Camuflagem: +4 em Furtividade em terreno natural"
            ],
            languages: ["Comum", "Kreen"],
            skillBonuses: { "Atletismo": 4, "Furtividade": 4 }
        },
        moreau: {
            name: "Moreau",
            attributeBonus: { any: 1 }, // Varia por animal base
            size: "Médio",
            displacement: 9,
            traits: [
                "Herança Animal: Características baseadas no animal base",
                "Instintos Selvagens: +2 em Intuição",
                "Forma Híbrida: Combinação de humano e animal"
            ],
            languages: ["Comum"],
            skillBonuses: { "Intuição": 2 }
        },
        nagah: {
            name: "Nagah",
            attributeBonus: { intelligence: 2, wisdom: 1, dexterity: -2 },
            size: "Médio",
            displacement: 6,
            traits: [
                "Cauda Serpentina: Ataque adicional com cauda",
                "Veneno: Pode produzir veneno",
                "Hipnose: Pode hipnotizar com o olhar"
            ],
            languages: ["Comum", "Dracônico"]
        },
        vor: {
            name: "Vor",
            attributeBonus: { constitution: 2, strength: 1, dexterity: -2 },
            size: "Médio",
            displacement: 6,
            traits: [
                "Casco Resistente: +1 na Defesa",
                "Teimosia: +2 em testes de Vontade",
                "Força Bruta: +2 em testes de força"
            ],
            languages: ["Comum", "Vor"],
            defenseBonus: 1,
            skillBonuses: { "Vontade": 2 }
        },
        bugbear: {
            name: "Bugbear",
            attributeBonus: { strength: 2, dexterity: 1, intelligence: -2 },
            size: "Médio",
            displacement: 9,
            traits: [
                "Alcance Longo: +1,5m de alcance em ataques corpo a corpo",
                "Furtividade Surpresa: +2 em Furtividade",
                "Força Selvagem: +2 em testes de Intimidação"
            ],
            languages: ["Comum", "Goblin"],
            skillBonuses: { "Furtividade": 2, "Intimidação": 2 }
        },
        "meio-elfo": {
            name: "Meio-Elfo",
            attributeBonus: { any: 2, any2: 1 },
            size: "Médio",
            displacement: 9,
            traits: [
                "Versátil: +1 perícia treinada adicional",
                "Herança Élfica: Alguns traços élficos",
                "Adaptável: +2 em testes sociais"
            ],
            languages: ["Comum", "Élfico"]
        },
        "meio-orc": {
            name: "Meio-Orc",
            attributeBonus: { strength: 2, constitution: 1, intelligence: -2 },
            size: "Médio",
            displacement: 9,
            traits: [
                "Fúria Orc: +2 em ataques corpo a corpo quando ferido",
                "Resistência: +2 em Fortitude",
                "Força Brutal: +2 em testes de Intimidação"
            ],
            languages: ["Comum", "Orc"],
            skillBonuses: { "Fortitude": 2, "Intimidação": 2 }
        }
    },

    classes: {
        arcanista: {
            name: "Arcanista",
            hitDie: 4,
            manaDie: 6,
            primaryStat: "intelligence",
            skillsAvailable: ["Conhecimento", "Investigação", "Misticismo", "Vontade"],
            proficiencies: ["Armas simples", "Armaduras leves"],
            spellcaster: true,
            spellType: "arcana",
            paths: ["bruxo", "feiticeiro", "mago"]
        },
        barbaro: {
            name: "Bárbaro",
            hitDie: 12,
            manaDie: 2,
            primaryStat: "strength",
            skillsAvailable: ["Atletismo", "Fortitude", "Intimidação", "Luta", "Sobrevivência"],
            proficiencies: ["Armas simples", "Armas marciais", "Escudos", "Armaduras leves"],
            spellcaster: false
        },
        bardo: {
            name: "Bardo",
            hitDie: 6,
            manaDie: 4,
            primaryStat: "charisma",
            skillsAvailable: ["Atuação", "Enganação", "Conhecimento", "Misticismo"],
            proficiencies: ["Armas simples", "Armaduras leves"],
            spellcaster: true,
            spellType: "arcana"
        },
        bucaneiro: {
            name: "Bucaneiro",
            hitDie: 8,
            manaDie: 4,
            primaryStat: "dexterity",
            skillsAvailable: ["Acrobacia", "Atletismo", "Enganação", "Intimidação", "Pontaria"],
            proficiencies: ["Armas simples", "Armas de fogo", "Armaduras leves"],
            spellcaster: false
        },
        cavaleiro: {
            name: "Cavaleiro",
            hitDie: 10,
            manaDie: 3,
            primaryStat: "strength",
            skillsAvailable: ["Cavalgar", "Adestramento", "Luta", "Nobreza"],
            proficiencies: ["Todas as armas", "Todos os escudos", "Todas as armaduras"],
            spellcaster: false
        },
        clerigo: {
            name: "Clérigo",
            hitDie: 6,
            manaDie: 4,
            primaryStat: "wisdom",
            skillsAvailable: ["Cura", "Conhecimento", "Religião", "Vontade"],
            proficiencies: ["Armas simples", "Armaduras leves", "Escudos leves"],
            spellcaster: true,
            spellType: "divina",
            mustBeDevout: true
        },
        druida: {
            name: "Druida",
            hitDie: 8,
            manaDie: 4,
            primaryStat: "wisdom",
            skillsAvailable: ["Cura", "Conhecimento", "Sobrevivência", "Adestramento"],
            proficiencies: ["Armas simples", "Armaduras leves"],
            spellcaster: true,
            spellType: "divina",
            mustBeDevout: true
        },
        guerreiro: {
            name: "Guerreiro",
            hitDie: 10,
            manaDie: 2,
            primaryStat: "strength",
            skillsAvailable: ["Cavalgar", "Intimidação", "Luta", "Ofício", "Pontaria"],
            proficiencies: ["Todas as armas", "Todos os escudos", "Todas as armaduras"],
            spellcaster: false
        },
        inventor: {
            name: "Inventor",
            hitDie: 6,
            manaDie: 4,
            primaryStat: "intelligence",
            skillsAvailable: ["Conhecimento", "Máquinas", "Ofício", "Investigação"],
            proficiencies: ["Armas simples", "Armas de fogo", "Armaduras leves"],
            spellcaster: false
        },
        ladino: {
            name: "Ladino",
            hitDie: 6,
            manaDie: 4,
            primaryStat: "dexterity",
            skillsAvailable: ["Acrobacia", "Enganação", "Furtividade", "Ladinagem", "Reflexos"],
            proficiencies: ["Armas simples", "Armaduras leves"],
            spellcaster: false
        },
        lutador: {
            name: "Lutador",
            hitDie: 10,
            manaDie: 3,
            primaryStat: "strength",
            skillsAvailable: ["Acrobacia", "Atletismo", "Fortitude", "Luta"],
            proficiencies: ["Armas simples", "Armas marciais", "Armaduras leves"],
            spellcaster: false
        },
        nobre: {
            name: "Nobre",
            hitDie: 6,
            manaDie: 4,
            primaryStat: "charisma",
            skillsAvailable: ["Diplomacia", "Enganação", "Intimidação", "Nobreza"],
            proficiencies: ["Armas simples", "Armaduras leves"],
            spellcaster: false
        },
        paladino: {
            name: "Paladino",
            hitDie: 10,
            manaDie: 3,
            primaryStat: "charisma",
            skillsAvailable: ["Cura", "Diplomacia", "Luta", "Religião"],
            proficiencies: ["Todas as armas", "Todos os escudos", "Todas as armaduras"],
            spellcaster: true,
            spellType: "divina",
            mustBeDevout: true
        },
        ranger: {
            name: "Ranger",
            hitDie: 8,
            manaDie: 4,
            primaryStat: "wisdom",
            skillsAvailable: ["Adestramento", "Percepção", "Pontaria", "Sobrevivência"],
            proficiencies: ["Armas simples", "Armas marciais", "Armaduras leves"],
            spellcaster: false
        }
    },

    arcanistPaths: {
        bruxo: {
            name: "Bruxo",
            primaryStat: "intelligence",
            description: "Lança magias através de um foco mágico",
            spellsKnown: "Aprende 1 magia por nível",
            features: [
                "Foco Arcano: Necessário para lançar magias",
                "Conjuração espontânea",
                "Foco tem PV = metade dos seus PV"
            ]
        },
        feiticeiro: {
            name: "Feiticeiro",
            primaryStat: "charisma",
            description: "Poder inato no sangue, herança sobrenatural",
            spellsKnown: "Aprende 1 magia em níveis ímpares",
            features: [
                "Linhagem sobrenatural",
                "Conjuração espontânea",
                "Sem necessidade de foco ou memorização"
            ],
            lineages: ["draconica", "rubia", "feerica"]
        },
        mago: {
            name: "Mago",
            primaryStat: "intelligence",
            description: "Estudioso das artes arcanas",
            spellsKnown: "Aprende 2 magias por nível + magias extras",
            features: [
                "Memorização de magias",
                "Magias extras por círculo",
                "Pode aprender magias de pergaminhos"
            ]
        }
    },

    sorcererLineages: {
        draconica: {
            name: "Dracônica",
            description: "Descendente de dragões",
            basicHeritage: "Resistência a dano 5 (ácido, eletricidade, frio ou fogo) + Carisma em PV iniciais",
            improvedHeritage: "Garras e presas (1d6 de dano)",
            superiorHeritage: "Sopro dracônico (3d6 de dano, CD baseada em Carisma)"
        },
        rubia: {
            name: "Rúbia",
            description: "Tocado pela Tormenta",
            basicHeritage: "Pode usar poderes da Tormenta + resistência à Tormenta",
            improvedHeritage: "Mutações rubras menores",
            superiorHeritage: "Transformação parcial em lefeu"
        },
        feerica: {
            name: "Feérica",
            description: "Descendente de fadas",
            basicHeritage: "Pode lançar magias de encantamento como truques",
            improvedHeritage: "Glamour sobrenatural (+2 em testes sociais)",
            superiorHeritage: "Teleporte curto (3/dia)"
        }
    },

    deities: {
        khalmyr: {
            name: "Khalmyr",
            title: "Deus da Justiça",
            alignment: "Leal e Bom",
            devotees: ["Humanos", "Clérigos", "Paladinos"],
            powers: ["Coragem Total", "Escudo Mágico", "Espada Justiceira"],
            restrictions: ["Nunca mentir", "Sempre ajudar inocentes", "Nunca fugir de combate justo"]
        },
        wynna: {
            name: "Wynna",
            title: "Deusa da Magia",
            alignment: "Neutro",
            devotees: ["Humanos", "Clérigos", "Arcanistas"],
            powers: ["Aumento de Mana", "Detectar Magia", "Escola Mágica"],
            restrictions: ["Nunca destruir conhecimento mágico", "Sempre buscar novos feitiços"]
        },
        allihanna: {
            name: "Allihanna",
            title: "Deusa da Natureza",
            alignment: "Neutro e Bom",
            devotees: ["Humanos", "Clérigos", "Druidas", "Rangers"],
            powers: ["Empatia Selvagem", "Rastreamento", "Crescimento Vegetal"],
            restrictions: ["Proteger a natureza", "Nunca usar itens de origem civilizada desnecessariamente"]
        },
        valkaria: {
            name: "Valkaria",
            title: "Deusa da Humanidade",
            alignment: "Leal e Bom",
            devotees: ["Humanos", "Clérigos", "Paladinos"],
            powers: ["Bênção", "Coragem", "Liderança"],
            restrictions: ["Proteger humanos", "Lutar contra tirania"]
        },
        arsenal: {
            name: "Arsenal",
            title: "Deus da Guerra",
            alignment: "Leal e Neutro",
            devotees: ["Humanos", "Guerreiros", "Paladinos"],
            powers: ["Armamentos", "Tática", "Fortaleza"],
            restrictions: ["Honrar oponentes dignos", "Nunca atacar covardemente"]
        },
        aharadak: {
            name: "Aharadak",
            title: "Deus da Tormenta",
            alignment: "Caótico e Mau",
            devotees: ["Qualquer (raramente)", "Lefeu"],
            powers: ["Afinidade com a Tormenta", "Percepção Temporal", "Rejeição Divina"],
            restrictions: ["Espalhar a corrupção da Tormenta", "Aceitar mutações rubras"]
        }
    },

    origins: {
        acolito: {
            name: "Acólito",
            description: "Criado em templo ou ordem religiosa",
            items: ["Símbolo sagrado", "Traje de sacerdote"],
            benefits: ["Cura", "Religião", "Vontade", "Medicina", "Membro da Igreja", "Vontade de Ferro"],
            uniquePower: "Membro da Igreja: Hospedagem em templos"
        },
        artesao: {
            name: "Artesão",
            description: "Trabalhador especializado em um ofício",
            items: ["Ferramentas de artesão", "Kit de trabalho"],
            benefits: ["Ofício", "Percepção", "Medicina", "Construir Item Superior"],
            uniquePower: "Perito: +2 em testes de Ofício"
        },
        criminoso: {
            name: "Criminoso",
            description: "Vida nas ruas, fora da lei",
            items: ["Lockpicks", "Adaga"],
            benefits: ["Enganação", "Furtividade", "Ladinagem", "Aparência Inofensiva"],
            uniquePower: "Contatos Criminosos: Informações no submundo"
        },
        estudioso: {
            name: "Estudioso",
            description: "Dedicou a vida ao conhecimento",
            items: ["Livros", "Tinta e pergaminho"],
            benefits: ["Conhecimento", "Investigação", "Nobreza", "Identificar Item Mágico"],
            uniquePower: "Erudição: +2 em testes de Conhecimento"
        },
        militar: {
            name: "Militar",
            description: "Serviu nas forças armadas",
            items: ["Uniforme", "Insígnia militar"],
            benefits: ["Guerra", "Intimidação", "Pontaria", "Comandar"],
            uniquePower: "Veterano: +2 em testes de Guerra"
        },
        nobre: {
            name: "Nobre",
            description: "Nasceu em família aristocrata",
            items: ["Roupas finas", "Anel de sinete"],
            benefits: ["Diplomacia", "Nobreza", "Intimidação", "Recursos"],
            uniquePower: "Linhagem: Acesso a corte nobre"
        }
    },

    skills: [
        { name: "Acrobacia", attribute: "dexterity" },
        { name: "Adestramento", attribute: "charisma" },
        { name: "Atletismo", attribute: "strength" },
        { name: "Atuação", attribute: "charisma" },
        { name: "Cavalgar", attribute: "dexterity" },
        { name: "Conhecimento", attribute: "intelligence" },
        { name: "Cura", attribute: "wisdom" },
        { name: "Diplomacia", attribute: "charisma" },
        { name: "Enganação", attribute: "charisma" },
        { name: "Furtividade", attribute: "dexterity" },
        { name: "Guerra", attribute: "intelligence" },
        { name: "Intimidação", attribute: "charisma" },
        { name: "Intuição", attribute: "wisdom" },
        { name: "Investigação", attribute: "intelligence" },
        { name: "Jogatina", attribute: "charisma" },
        { name: "Ladinagem", attribute: "dexterity" },
        { name: "Luta", attribute: "strength" },
        { name: "Máquinas", attribute: "intelligence" },
        { name: "Misticismo", attribute: "intelligence" },
        { name: "Navegação", attribute: "wisdom" },
        { name: "Nobreza", attribute: "intelligence" },
        { name: "Ofício", attribute: "intelligence" },
        { name: "Percepção", attribute: "wisdom" },
        { name: "Pilotagem", attribute: "dexterity" },
        { name: "Pontaria", attribute: "dexterity" },
        { name: "Religião", attribute: "wisdom" },
        { name: "Sobrevivência", attribute: "wisdom" },
        { name: "Fortitude", attribute: "constitution" },
        { name: "Reflexos", attribute: "dexterity" },
        { name: "Vontade", attribute: "wisdom" }
    ],

    spells: {
        1: [
            // Magias Arcanas de 1º Círculo
            { name: "Alarm", cost: 1, school: "abjuração", type: "arcana" },
            { name: "Ataque Certeiro", cost: 1, school: "transmutação", type: "arcana" },
            { name: "Camuflagem Ilusória", cost: 1, school: "ilusão", type: "arcana" },
            { name: "Compreender Idiomas", cost: 1, school: "adivinhação", type: "arcana" },
            { name: "Concentração de Combate", cost: 1, school: "transmutação", type: "arcana" },
            { name: "Conjurar Monstro I", cost: 1, school: "conjuração", type: "arcana" },
            { name: "Controlar Plantas", cost: 1, school: "transmutação", type: "arcana" },
            { name: "Curar Ferimentos Leves", cost: 1, school: "evocação", type: "arcana" },
            { name: "Detectar Magia", cost: 1, school: "adivinhação", type: "arcana" },
            { name: "Detectar Mortos-Vivos", cost: 1, school: "adivinhação", type: "arcana" },
            { name: "Disco Flutuante", cost: 1, school: "evocação", type: "arcana" },
            { name: "Escudo Arcano", cost: 1, school: "abjuração", type: "arcana" },
            { name: "Hipnotismo", cost: 1, school: "encantamento", type: "arcana" },
            { name: "Identificação", cost: 1, school: "adivinhação", type: "arcana" },
            { name: "Imagem Espelhada", cost: 1, school: "ilusão", type: "arcana" },
            { name: "Luz", cost: 1, school: "evocação", type: "arcana" },
            { name: "Mãos Mágicas", cost: 1, school: "transmutação", type: "arcana" },
            { name: "Mísseis Mágicos", cost: 1, school: "evocação", type: "arcana" },
            { name: "Passo Sombrio", cost: 1, school: "conjuração", type: "arcana" },
            { name: "Primeiros Socorros", cost: 1, school: "evocação", type: "arcana" },
            { name: "Proteção Contra o Mal", cost: 1, school: "abjuração", type: "arcana" },
            { name: "Queda Suave", cost: 1, school: "transmutação", type: "arcana" },
            { name: "Raio Elétrico", cost: 1, school: "evocação", type: "arcana" },
            { name: "Salto", cost: 1, school: "transmutação", type: "arcana" },
            { name: "Servo Invisível", cost: 1, school: "conjuração", type: "arcana" },
            { name: "Sono", cost: 1, school: "encantamento", type: "arcana" },
            { name: "Toque Chocante", cost: 1, school: "evocação", type: "arcana" },
            { name: "Toque do Medo", cost: 1, school: "necromancia", type: "arcana" },
            { name: "Ventriloquismo", cost: 1, school: "ilusão", type: "arcana" },

            // Magias Divinas de 1º Círculo
            { name: "Abençoar", cost: 1, school: "encantamento", type: "divina" },
            { name: "Arma Mágica", cost: 1, school: "transmutação", type: "divina" },
            { name: "Comando", cost: 1, school: "encantamento", type: "divina" },
            { name: "Curar Ferimentos", cost: 1, school: "evocação", type: "divina" },
            { name: "Detectar o Mal", cost: 1, school: "adivinhação", type: "divina" },
            { name: "Escudo da Fé", cost: 1, school: "abjuração", type: "divina" },
            { name: "Favor Divino", cost: 1, school: "evocação", type: "divina" },
            { name: "Perdição", cost: 1, school: "necromancia", type: "divina" },
            { name: "Proteção", cost: 1, school: "abjuração", type: "divina" },
            { name: "Purificar Alimentos", cost: 1, school: "transmutação", type: "divina" },
            { name: "Remover Medo", cost: 1, school: "abjuração", type: "divina" },
            { name: "Santuário", cost: 1, school: "abjuração", type: "divina" }
        ],
        2: [
            // Magias Arcanas de 2º Círculo
            { name: "Bola de Fogo Menor", cost: 3, school: "evocação", type: "arcana" },
            { name: "Camuflagem", cost: 3, school: "ilusão", type: "arcana" },
            { name: "Cone Colorido", cost: 3, school: "ilusão", type: "arcana" },
            { name: "Conjurar Monstro II", cost: 3, school: "conjuração", type: "arcana" },
            { name: "Controlar Plantas", cost: 3, school: "transmutação", type: "arcana" },
            { name: "Criar Ilusão", cost: 3, school: "ilusão", type: "arcana" },
            { name: "Curar Ferimentos Moderados", cost: 3, school: "evocação", type: "arcana" },
            { name: "Detectar Pensamentos", cost: 3, school: "adivinhação", type: "arcana" },
            { name: "Despedaçar", cost: 3, school: "evocação", type: "arcana" },
            { name: "Escuridão", cost: 3, school: "evocação", type: "arcana" },
            { name: "Força do Touro", cost: 3, school: "transmutação", type: "arcana" },
            { name: "Imobilizar Pessoa", cost: 3, school: "encantamento", type: "arcana" },
            { name: "Invisibilidade", cost: 3, school: "ilusão", type: "arcana" },
            { name: "Levitação", cost: 3, school: "transmutação", type: "arcana" },
            { name: "Localizar Objeto", cost: 3, school: "adivinhação", type: "arcana" },
            { name: "Passo das Sombras", cost: 3, school: "conjuração", type: "arcana" },
            { name: "Porta Dimensional", cost: 3, school: "conjuração", type: "arcana" },
            { name: "Raio Desintegrador", cost: 3, school: "evocação", type: "arcana" },
            { name: "Resistência a Elementos", cost: 3, school: "abjuração", type: "arcana" },
            { name: "Sono Profundo", cost: 3, school: "encantamento", type: "arcana" },
            { name: "Sugestão", cost: 3, school: "encantamento", type: "arcana" },
            { name: "Teia", cost: 3, school: "conjuração", type: "arcana" },
            { name: "Terreno Ilusório", cost: 3, school: "ilusão", type: "arcana" },
            { name: "Velocidade", cost: 3, school: "transmutação", type: "arcana" },

            // Magias Divinas de 2º Círculo
            { name: "Ajuda", cost: 3, school: "encantamento", type: "divina" },
            { name: "Cura Moderada", cost: 3, school: "evocação", type: "divina" },
            { name: "Detectar Armadilhas", cost: 3, school: "adivinhação", type: "divina" },
            { name: "Força Espiritual", cost: 3, school: "evocação", type: "divina" },
            { name: "Localizar Pessoa", cost: 3, school: "adivinhação", type: "divina" },
            { name: "Prece", cost: 3, school: "encantamento", type: "divina" },
            { name: "Remover Paralisia", cost: 3, school: "abjuração", type: "divina" },
            { name: "Resistência a Elementos", cost: 3, school: "abjuração", type: "divina" },
            { name: "Retardar Veneno", cost: 3, school: "conjuração", type: "divina" },
            { name: "Silêncio", cost: 3, school: "ilusão", type: "divina" },
            { name: "Zona de Verdade", cost: 3, school: "encantamento", type: "divina" }
        ],
        3: [
            // Magias Arcanas de 3º Círculo
            { name: "Bola de Fogo", cost: 6, school: "evocação", type: "arcana" },
            { name: "Clarividência", cost: 6, school: "adivinhação", type: "arcana" },
            { name: "Conjurar Monstro III", cost: 6, school: "conjuração", type: "arcana" },
            { name: "Curar Ferimentos Graves", cost: 6, school: "evocação", type: "arcana" },
            { name: "Dissipar Magia", cost: 6, school: "abjuração", type: "arcana" },
            { name: "Explosão de Chamas", cost: 6, school: "evocação", type: "arcana" },
            { name: "Forma Gasosa", cost: 6, school: "transmutação", type: "arcana" },
            { name: "Haste", cost: 6, school: "transmutação", type: "arcana" },
            { name: "Invisibilidade em Massa", cost: 6, school: "ilusão", type: "arcana" },
            { name: "Lentidão", cost: 6, school: "transmutação", type: "arcana" },
            { name: "Montaria Aérea", cost: 6, school: "conjuração", type: "arcana" },
            { name: "Paralisia", cost: 6, school: "encantamento", type: "arcana" },
            { name: "Proteção contra Elementos", cost: 6, school: "abjuração", type: "arcana" },
            { name: "Relâmpago", cost: 6, school: "evocação", type: "arcana" },
            { name: "Respirar na Água", cost: 6, school: "transmutação", type: "arcana" },
            { name: "Sugestão em Massa", cost: 6, school: "encantamento", type: "arcana" },
            { name: "Teleporte", cost: 6, school: "conjuração", type: "arcana" },
            { name: "Voo", cost: 6, school: "transmutação", type: "arcana" },

            // Magias Divinas de 3º Círculo
            { name: "Cura Grave", cost: 6, school: "evocação", type: "divina" },
            { name: "Detectar Mentiras", cost: 6, school: "adivinhação", type: "divina" },
            { name: "Luz do Dia", cost: 6, school: "evocação", type: "divina" },
            { name: "Prece em Massa", cost: 6, school: "encantamento", type: "divina" },
            { name: "Remover Doença", cost: 6, school: "conjuração", type: "divina" },
            { name: "Remover Maldição", cost: 6, school: "abjuração", type: "divina" },
            { name: "Santuário em Massa", cost: 6, school: "abjuração", type: "divina" },
            { name: "Sopro Divino", cost: 6, school: "evocação", type: "divina" }
        ],
        4: [
            // Magias Arcanas de 4º Círculo
            { name: "Conjurar Monstro IV", cost: 10, school: "conjuração", type: "arcana" },
            { name: "Curar Ferimentos Críticos", cost: 10, school: "evocação", type: "arcana" },
            { name: "Dimensional Anchor", cost: 10, school: "abjuração", type: "arcana" },
            { name: "Enfeitiçar Monstros", cost: 10, school: "encantamento", type: "arcana" },
            { name: "Esfera Resiliente", cost: 10, school: "abjuração", type: "arcana" },
            { name: "Forma Etérea", cost: 10, school: "transmutação", type: "arcana" },
            { name: "Ilusão Persistente", cost: 10, school: "ilusão", type: "arcana" },
            { name: "Invocar Elemental", cost: 10, school: "conjuração", type: "arcana" },
            { name: "Localizar Criatura", cost: 10, school: "adivinhação", type: "arcana" },
            { name: "Muralha de Fogo", cost: 10, school: "evocação", type: "arcana" },
            { name: "Muralha de Gelo", cost: 10, school: "evocação", type: "arcana" },
            { name: "Polimorfismo", cost: 10, school: "transmutação", type: "arcana" },
            { name: "Proteção contra a Morte", cost: 10, school: "necromancia", type: "arcana" },
            { name: "Tempestade de Gelo", cost: 10, school: "evocação", type: "arcana" },
            { name: "Terreno Alucinatório", cost: 10, school: "ilusão", type: "arcana" },

            // Magias Divinas de 4º Círculo
            { name: "Cura Crítica", cost: 10, school: "evocação", type: "divina" },
            { name: "Discernir Mentiras", cost: 10, school: "adivinhação", type: "divina" },
            { name: "Divindade", cost: 10, school: "transmutação", type: "divina" },
            { name: "Imunidade a Magia", cost: 10, school: "abjuração", type: "divina" },
            { name: "Liberdade de Movimento", cost: 10, school: "abjuração", type: "divina" },
            { name: "Neutralizar Veneno", cost: 10, school: "conjuração", type: "divina" },
            { name: "Restauração", cost: 10, school: "conjuração", type: "divina" }
        ],
        5: [
            // Magias Arcanas de 5º Círculo
            { name: "Conjurar Monstro V", cost: 15, school: "conjuração", type: "arcana" },
            { name: "Cura Plena", cost: 15, school: "evocação", type: "arcana" },
            { name: "Desintegração", cost: 15, school: "transmutação", type: "arcana" },
            { name: "Dominar Pessoa", cost: 15, school: "encantamento", type: "arcana" },
            { name: "Força Mágica", cost: 15, school: "evocação", type: "arcana" },
            { name: "Ilusão Programada", cost: 15, school: "ilusão", type: "arcana" },
            { name: "Invocar Dragão", cost: 15, school: "conjuração", type: "arcana" },
            { name: "Muro de Energia", cost: 15, school: "evocação", type: "arcana" },
            { name: "Parar o Tempo", cost: 15, school: "transmutação", type: "arcana" },
            { name: "Permanência", cost: 15, school: "transmutação", type: "arcana" },
            { name: "Teletransporte em Massa", cost: 15, school: "conjuração", type: "arcana" },
            { name: "Transformação", cost: 15, school: "transmutação", type: "arcana" },

            // Magias Divinas de 5º Círculo
            { name: "Ataque Divino", cost: 15, school: "evocação", type: "divina" },
            { name: "Curar em Massa", cost: 15, school: "evocação", type: "divina" },
            { name: "Ressurreição", cost: 15, school: "conjuração", type: "divina" },
            { name: "Restauração Maior", cost: 15, school: "conjuração", type: "divina" },
            { name: "Sopro dos Deuses", cost: 15, school: "evocação", type: "divina" }
        ]
    }
};

// Estado do personagem
let character = {
    name: "",
    level: 1,
    race: "",
    class: "",
    arcanistPath: "",
    sorcererLineage: "",
    origin: "",
    deity: "",
    attributes: {
        strength: 10,
        dexterity: 10,
        constitution: 10,
        intelligence: 10,
        wisdom: 10,
        charisma: 10
    },
    trainedSkills: [],
    knownSpells: []
};

// Funções utilitárias
function getModifier(score) {
    return Math.floor((score - 10) / 2);
}

function getTrainingBonus(level) {
    if (level >= 15) return 6;
    if (level >= 8) return 4;
    return 2;
}

function calculateAttributeTotal(attributeName) {
    let total = character.attributes[attributeName];
    
    // Aplicar bônus/penalidades raciais
    if (character.race && T20Data.races[character.race]) {
        const raceData = T20Data.races[character.race];
        const bonus = raceData.attributeBonus;
        
        if (bonus[attributeName]) {
            total += bonus[attributeName];
        }
        
        // Para bônus "any", aplicar no atributo principal da classe
        if (bonus.any && character.class) {
            let primaryStat = T20Data.classes[character.class].primaryStat;
            if (character.class === "arcanista" && character.arcanistPath) {
                primaryStat = T20Data.arcanistPaths[character.arcanistPath].primaryStat;
            }
            if (attributeName === primaryStat) {
                total += bonus.any;
            }
        }
        
        // Para meio-elfo com dois bônus "any"
        if (bonus.any2 && character.race === "meio-elfo") {
            // Segundo maior atributo
            const sortedAttrs = Object.entries(character.attributes)
                .sort(([,a], [,b]) => b - a);
            if (attributeName === sortedAttrs[1][0]) {
                total += bonus.any2;
            }
        }
    }
    
    return total;
}

function calculatePointCost(currentValue, newValue) {
    const costs = {
        8: -2, 9: -1, 10: 0, 11: 1, 12: 2, 13: 3,
        14: 5, 15: 7, 16: 10, 17: 13, 18: 17
    };
    return costs[newValue] - costs[currentValue];
}

function getRemainingPoints() {
    const basePoints = 800;
    let usedPoints = 0;
    
    Object.keys(character.attributes).forEach(attr => {
        const cost = calculatePointCost(10, character.attributes[attr]);
        usedPoints += cost;
    });
    
    return basePoints - usedPoints;
}

function calculateSkillBonus(skillName, isTrained = false) {
    const skill = T20Data.skills.find(s => s.name === skillName);
    if (!skill) return 0;
    
    const attributeTotal = calculateAttributeTotal(skill.attribute);
    const attributeBonus = getModifier(attributeTotal);
    const halfLevel = Math.floor(character.level / 2);
    const trainingBonus = isTrained ? getTrainingBonus(character.level) : 0;
    
    let totalBonus = halfLevel + attributeBonus + trainingBonus;
    
    // Bônus raciais específicos
    if (character.race && T20Data.races[character.race] && T20Data.races[character.race].skillBonuses) {
        const skillBonus = T20Data.races[character.race].skillBonuses[skillName];
        if (skillBonus) {
            totalBonus += skillBonus;
        }
    }
    
    return totalBonus;
}

function calculateHitPoints() {
    if (!character.class) return 0;
    
    const classData = T20Data.classes[character.class];
    const constitutionTotal = calculateAttributeTotal('constitution');
    const constitutionMod = getModifier(constitutionTotal);
    
    let baseHP = classData.hitDie + constitutionMod;
    
    // Bônus especial para linhagem dracônica
    if (character.arcanistPath === 'feiticeiro' && character.sorcererLineage === 'draconica') {
        const charismaTotal = calculateAttributeTotal('charisma');
        const charismaMod = getModifier(charismaTotal);
        baseHP += charismaMod;
    }
    
    const levelHP = (character.level - 1) * (Math.floor(classData.hitDie / 2) + 1 + constitutionMod);
    
    return Math.max(1, baseHP + levelHP);
}

function calculateManaPoints() {
    if (!character.class) return 0;
    
    const classData = T20Data.classes[character.class];
    let keyAttributeName = classData.primaryStat;
    
    if (character.class === "arcanista" && character.arcanistPath) {
        keyAttributeName = T20Data.arcanistPaths[character.arcanistPath].primaryStat;
    }
    
    const keyAttributeTotal = calculateAttributeTotal(keyAttributeName);
    const keyAttributeMod = getModifier(keyAttributeTotal);
    
    const baseMana = classData.manaDie + keyAttributeMod;
    const levelMana = (character.level - 1) * (Math.floor(classData.manaDie / 2) + 1);
    
    return Math.max(0, baseMana + levelMana);
}

function calculateDefense() {
    const dexterityTotal = calculateAttributeTotal('dexterity');
    const dexterityMod = getModifier(dexterityTotal);
    let defense = 10 + dexterityMod;
    
    // Bônus racial de defesa
    if (character.race && T20Data.races[character.race] && T20Data.races[character.race].defenseBonus) {
        defense += T20Data.races[character.race].defenseBonus;
    }
    
    return defense;
}

// Event Listeners
document.addEventListener('DOMContentLoaded', function() {
    setupEventListeners();
    initializeSkills();
    updateCharacterSheet();
});

function setupEventListeners() {
    // Atributos
    ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].forEach(attr => {
        document.getElementById(attr).addEventListener('input', function() {
            const newValue = parseInt(this.value);
            const pointCost = calculatePointCost(character.attributes[attr], newValue);
            const remainingPoints = getRemainingPoints();
            
            if (remainingPoints - pointCost >= 0) {
                character.attributes[attr] = newValue;
                updateAttributeDisplay();
                updateCharacterSheet();
            } else {
                this.value = character.attributes[attr];
                alert('Pontos insuficientes para essa mudança!');
            }
        });
    });

    // Informações básicas
    document.getElementById('characterName').addEventListener('input', function() {
        character.name = this.value;
        updateCharacterSheet();
    });

    document.getElementById('level').addEventListener('change', function() {
        character.level = parseInt(this.value);
        updateCharacterSheet();
    });

    // Raça
    document.getElementById('race').addEventListener('change', function() {
        character.race = this.value;
        updateRaceDetails();
        updateAttributeDisplay();
        updateCharacterSheet();
    });

    // Classe
    document.getElementById('class').addEventListener('change', function() {
        character.class = this.value;
        updateClassDetails();
        updateAttributeDisplay();
        updateCharacterSheet();
    });

    // Caminho do Arcanista
    document.getElementById('arcanistPathSelect').addEventListener('change', function() {
        character.arcanistPath = this.value;
        updateArcanistPathDetails();
        updateAttributeDisplay();
        updateCharacterSheet();
    });

    // Linhagem do Feiticeiro
    document.getElementById('sorcererLineageSelect').addEventListener('change', function() {
        character.sorcererLineage = this.value;
        updateSorcererLineageDetails();
        updateCharacterSheet();
    });

    // Origem
    document.getElementById('origin').addEventListener('change', function() {
        character.origin = this.value;
        updateOriginDetails();
        updateCharacterSheet();
    });

    // Deus
    document.getElementById('deity').addEventListener('change', function() {
        character.deity = this.value;
        updateDeityDetails();
        updateCharacterSheet();
    });
}

function updateAttributeDisplay() {
    ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].forEach(attr => {
        const base = character.attributes[attr];
        const total = calculateAttributeTotal(attr);
        const modifier = getModifier(total);
        
        // Atualizar valores na tela
        document.getElementById(attr + 'Base').textContent = `Base: ${base}`;
        document.getElementById(attr + 'Final').textContent = `Total: ${total}`;
        document.getElementById(attr + 'Mod').textContent = modifier >= 0 ? `+${modifier}` : `${modifier}`;
        
        // Indicar visualmente bônus/penalidades raciais
        const attributeDiv = document.getElementById(attr).parentElement;
        attributeDiv.classList.remove('racial-bonus', 'racial-penalty');
        
        if (total > base) {
            attributeDiv.classList.add('racial-bonus');
        } else if (total < base) {
            attributeDiv.classList.add('racial-penalty');
        }
    });
    
    // Atualizar pontos restantes
    const remainingPoints = getRemainingPoints();
    const pointsElement = document.getElementById('pointsRemaining');
    pointsElement.textContent = remainingPoints;
    
    const pointsContainer = pointsElement.parentElement;
    pointsContainer.classList.remove('negative', 'zero', 'positive');
    
    if (remainingPoints < 0) {
        pointsContainer.classList.add('negative');
    } else if (remainingPoints === 0) {
        pointsContainer.classList.add('zero');
    } else {
        pointsContainer.classList.add('positive');
    }
}

function updateRaceDetails() {
    const detailsPanel = document.getElementById('raceDetails');
    
    if (!character.race) {
        detailsPanel.innerHTML = '';
        return;
    }
    
    const raceData = T20Data.races[character.race];
    if (!raceData) return;
    
    let bonusText = "";
    const bonus = raceData.attributeBonus;
    Object.entries(bonus).forEach(([attr, value]) => {
        if (attr === 'any') {
            bonusText += `+${value} em qualquer atributo, `;
        } else if (attr === 'any2') {
            bonusText += `+${value} em outro atributo, `;
        } else if (value > 0) {
            bonusText += `+${value} ${attr}, `;
        } else if (value < 0) {
            bonusText += `${value} ${attr}, `;
        }
    });
    bonusText = bonusText.slice(0, -2); // Remove a última vírgula
    
    detailsPanel.innerHTML = `
        <h4>${raceData.name}</h4>
        <p><strong>Tamanho:</strong> ${raceData.size}</p>
        <p><strong>Deslocamento:</strong> ${raceData.displacement}m</p>
        <p><strong>Modificadores:</strong> ${bonusText}</p>
        <p><strong>Idiomas:</strong> ${raceData.languages.join(', ')}</p>
        <h5>Características Raciais:</h5>
        <ul>
            ${raceData.traits.map(trait => `<li>${trait}</li>`).join('')}
        </ul>
    `;
}

function updateClassDetails() {
    const detailsPanel = document.getElementById('classDetails');
    const arcanistPath = document.getElementById('arcanistPath');
    
    if (!character.class) {
        detailsPanel.innerHTML = '';
        arcanistPath.style.display = 'none';
        return;
    }
    
    const classData = T20Data.classes[character.class];
    if (!classData) return;
    
    detailsPanel.innerHTML = `
        <h4>${classData.name}</h4>
        <p><strong>Dado de Vida:</strong> d${classData.hitDie}</p>
        <p><strong>Dado de Mana:</strong> d${classData.manaDie}</p>
        <p><strong>Perícias de Classe:</strong> ${classData.skillsAvailable.join(', ')}</p>
        <p><strong>Proficiências:</strong> ${classData.proficiencies.join(', ')}</p>
        ${classData.spellcaster ? `<p><strong>Conjurador:</strong> Magias ${classData.spellType}s</p>` : ''}
    `;
    
    // Mostrar seção de caminho do arcanista se necessário
    if (character.class === 'arcanista') {
        arcanistPath.style.display = 'block';
    } else {
        arcanistPath.style.display = 'none';
        character.arcanistPath = '';
        character.sorcererLineage = '';
    }
    
    updateSpellsSection();
}

function updateArcanistPathDetails() {
    const detailsPanel = document.getElementById('arcanistPathDetails');
    const sorcererLineage = document.getElementById('sorcererLineage');
    
    if (!character.arcanistPath) {
        detailsPanel.innerHTML = '';
        sorcererLineage.style.display = 'none';
        return;
    }
    
    const pathData = T20Data.arcanistPaths[character.arcanistPath];
    if (!pathData) return;
    
    let attrName = 'Inteligência';
    if (pathData.primaryStat === 'charisma') attrName = 'Carisma';
    if (pathData.primaryStat === 'wisdom') attrName = 'Sabedoria';
    
    detailsPanel.innerHTML = `
        <h4>${pathData.name}</h4>
        <p>${pathData.description}</p>
        <p><strong>Atributo-chave:</strong> ${attrName}</p>
        <p><strong>Magias:</strong> ${pathData.spellsKnown}</p>
        <h5>Características:</h5>
        <ul>
            ${pathData.features.map(feature => `<li>${feature}</li>`).join('')}
        </ul>
    `;
    
    // Mostrar linhagem para feiticeiro
    if (character.arcanistPath === 'feiticeiro') {
        sorcererLineage.style.display = 'block';
    } else {
        sorcererLineage.style.display = 'none';
        character.sorcererLineage = '';
    }
    
    updateSpellsSection();
}

function updateSorcererLineageDetails() {
    const detailsPanel = document.getElementById('sorcererLineageDetails');
    
    if (!character.sorcererLineage) {
        detailsPanel.innerHTML = '';
        return;
    }
    
    const lineageData = T20Data.sorcererLineages[character.sorcererLineage];
    if (!lineageData) return;
    
    detailsPanel.innerHTML = `
        <h4>Linhagem ${lineageData.name}</h4>
        <p>${lineageData.description}</p>
        <p><strong>Herança Básica:</strong> ${lineageData.basicHeritage}</p>
        <p><strong>Herança Aprimorada (6º nível):</strong> ${lineageData.improvedHeritage}</p>
        <p><strong>Herança Superior (11º nível):</strong> ${lineageData.superiorHeritage}</p>
    `;
}

function updateOriginDetails() {
    const detailsPanel = document.getElementById('originDetails');
    
    if (!character.origin) {
        detailsPanel.innerHTML = '';
        return;
    }
    
    const originData = T20Data.origins[character.origin];
    if (!originData) return;
    
    detailsPanel.innerHTML = `
        <h4>${originData.name}</h4>
        <p>${originData.description}</p>
        <p><strong>Itens:</strong> ${originData.items.join(', ')}</p>
        <p><strong>Benefícios disponíveis:</strong> ${originData.benefits.join(', ')}</p>
        <p><strong>Poder único:</strong> ${originData.uniquePower}</p>
    `;
}

function updateDeityDetails() {
    const detailsPanel = document.getElementById('deityDetails');
    
    if (!character.deity) {
        detailsPanel.innerHTML = '';
        return;
    }
    
    const deityData = T20Data.deities[character.deity];
    if (!deityData) return;
    
    detailsPanel.innerHTML = `
        <h4>${deityData.name} - ${deityData.title}</h4>
        <p><strong>Alinhamento:</strong> ${deityData.alignment}</p>
        <p><strong>Devotos:</strong> ${deityData.devotees.join(', ')}</p>
        <h5>Poderes Concedidos:</h5>
        <ul>
            ${deityData.powers.map(power => `<li>${power}</li>`).join('')}
        </ul>
        <h5>Obrigações & Restrições:</h5>
        <ul>
            ${deityData.restrictions.map(restriction => `<li>${restriction}</li>`).join('')}
        </ul>
    `;
}

function initializeSkills() {
    const skillsList = document.getElementById('skillsList');
    
    T20Data.skills.forEach(skill => {
        const skillItem = document.createElement('div');
        skillItem.className = 'skill-item';
        skillItem.innerHTML = `
            <span class="skill-name">${skill.name}</span>
            <span class="skill-bonus" id="skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}">+0</span>
        `;
        skillsList.appendChild(skillItem);
    });
}

function updateSkills() {
    // Determinar perícias treinadas baseado na classe e origem
    const trainedSkills = [];
    
    // Perícias da classe
    if (character.class && T20Data.classes[character.class]) {
        const classData = T20Data.classes[character.class];
        trainedSkills.push(...classData.skillsAvailable.slice(0, 2));
    }
    
    // Perícias da origem
    if (character.origin && T20Data.origins[character.origin]) {
        const originData = T20Data.origins[character.origin];
        const originSkills = originData.benefits.filter(benefit => 
            T20Data.skills.some(skill => skill.name === benefit)
        ).slice(0, 2);
        trainedSkills.push(...originSkills);
    }
    
    character.trainedSkills = [...new Set(trainedSkills)];
    
    // Atualizar display das perícias
    T20Data.skills.forEach(skill => {
        const isTrained = character.trainedSkills.includes(skill.name);
        const bonus = calculateSkillBonus(skill.name, isTrained);
        const bonusElement = document.getElementById(`skill-${skill.name.toLowerCase().replace(/\s+/g, '-')}`);
        
        if (bonusElement) {
            bonusElement.textContent = bonus >= 0 ? `+${bonus}` : `${bonus}`;
            bonusElement.className = isTrained ? 'skill-bonus skill-trained' : 'skill-bonus skill-untrained';
        }
    });
}

function updateSpellsSection() {
    const spellsSection = document.getElementById('spellsSection');
    const spellsContent = document.getElementById('spellsContent');
    
    if (!character.class) {
        spellsSection.style.display = 'none';
        return;
    }
    
    const classData = T20Data.classes[character.class];
    if (!classData.spellcaster) {
        spellsSection.style.display = 'none';
        return;
    }
    
    spellsSection.style.display = 'block';
    
    // Determinar círculos disponíveis e tipo de magia
    const maxCircle = Math.min(5, Math.floor((character.level + 3) / 4));
    const spellType = classData.spellType;
    const spellsKnown = getSpellsKnownCount();
    
    let spellsHtml = `<p><strong>Magias conhecidas:</strong> ${character.knownSpells.length}/${spellsKnown}</p>`;
    spellsHtml += `<p><strong>Tipo de Magia:</strong> ${spellType === 'arcana' ? 'Arcana' : 'Divina'}</p>`;
    
    for (let circle = 1; circle <= maxCircle; circle++) {
        const knownInCircle = character.knownSpells.filter(spell => 
            T20Data.spells[circle] && T20Data.spells[circle].some(s => s.name === spell)
        ).length;
        
        // Filtrar magias por tipo
        const availableSpells = T20Data.spells[circle].filter(spell => spell.type === spellType);
        
        spellsHtml += `
            <div class="spell-circle">
                <h3>${circle}º Círculo (Custo: ${getSpellCost(circle)} PM) - Conhecidas: ${knownInCircle}</h3>
                <div class="spells-list">
                    ${availableSpells.map(spell => {
                        const isKnown = character.knownSpells.includes(spell.name);
                        return `<div class="spell-item ${isKnown ? 'selected' : ''}" 
                                     data-spell="${spell.name}" 
                                     data-circle="${circle}"
                                     onclick="toggleSpell('${spell.name}', ${circle})">
                            <strong>${spell.name}</strong><br>
                            <small>Escola: ${spell.school}</small>
                            ${isKnown ? '<br><em>✓ Conhecida</em>' : ''}
                        </div>`;
                    }).join('')}
                </div>
            </div>
        `;
    }
    
    spellsContent.innerHTML = spellsHtml;
}

function getSpellsKnownCount() {
    if (!character.class) return 0;
    
    if (character.class === 'arcanista' && character.arcanistPath) {
        if (character.arcanistPath === 'mago') {
            return character.level * 2 + Math.floor((character.level + 3) / 4);
        } else if (character.arcanistPath === 'bruxo') {
            return character.level;
        } else if (character.arcanistPath === 'feiticeiro') {
            return Math.ceil(character.level / 2);
        }
    }
    
    // Para outras classes conjuradoras
    if (character.class === 'bardo') return Math.ceil(character.level * 0.75);
    if (character.class === 'clerigo' || character.class === 'druida') return character.level + 2;
    if (character.class === 'paladino') return Math.ceil(character.level / 2);
    
    return character.level;
}

function toggleSpell(spellName, circle) {
    const spellsKnown = getSpellsKnownCount();
    const spellIndex = character.knownSpells.indexOf(spellName);
    
    if (spellIndex > -1) {
        character.knownSpells.splice(spellIndex, 1);
    } else {
        if (character.knownSpells.length < spellsKnown) {
            const maxCircle = Math.min(5, Math.floor((character.level + 3) / 4));
            if (circle <= maxCircle) {
                character.knownSpells.push(spellName);
            } else {
                alert(`Você ainda não pode aprender magias de ${circle}º círculo!`);
                return;
            }
        } else {
            alert(`Você já conhece o máximo de magias (${spellsKnown})!`);
            return;
        }
    }
    
    updateSpellsSection();
    updateCharacterSummary();
}

function getSpellCost(circle) {
    const costs = { 1: 1, 2: 3, 3: 6, 4: 10, 5: 15 };
    return costs[circle] || 0;
}

function updateCalculatedStats() {
    document.getElementById('hitPoints').textContent = calculateHitPoints();
    document.getElementById('manaPoints').textContent = calculateManaPoints();
    document.getElementById('defense').textContent = calculateDefense();
    
    const fightBonus = calculateSkillBonus('Luta', character.trainedSkills.includes('Luta'));
    const shootingBonus = calculateSkillBonus('Pontaria', character.trainedSkills.includes('Pontaria'));
    const fortitudeBonus = calculateSkillBonus('Fortitude', character.trainedSkills.includes('Fortitude'));
    const reflexesBonus = calculateSkillBonus('Reflexos', character.trainedSkills.includes('Reflexos'));
    const willBonus = calculateSkillBonus('Vontade', character.trainedSkills.includes('Vontade'));
    
    document.getElementById('fightSkill').textContent = fightBonus >= 0 ? `+${fightBonus}` : `${fightBonus}`;
    document.getElementById('shootingSkill').textContent = shootingBonus >= 0 ? `+${shootingBonus}` : `${shootingBonus}`;
    document.getElementById('fortitudeSkill').textContent = fortitudeBonus >= 0 ? `+${fortitudeBonus}` : `${fortitudeBonus}`;
    document.getElementById('reflexesSkill').textContent = reflexesBonus >= 0 ? `+${reflexesBonus}` : `${reflexesBonus}`;
    document.getElementById('willSkill').textContent = willBonus >= 0 ? `+${willBonus}` : `${willBonus}`;
}

function updateCharacterSummary() {
    const summaryElement = document.getElementById('characterSummary');
    
    if (!character.name && !character.race && !character.class) {
        summaryElement.innerHTML = '<p>Configure seu personagem nas seções acima para ver o resumo completo.</p>';
        return;
    }
    
    let summary = `<h4>${character.name || 'Sem nome'}</h4>`;
    
    if (character.race) {
        const raceData = T20Data.races[character.race];
        summary += `<p><strong>Raça:</strong> ${raceData ? raceData.name : character.race}</p>`;
    }
    
    if (character.class) {
        const classData = T20Data.classes[character.class];
        summary += `<p><strong>Classe:</strong> ${classData ? classData.name : character.class}`;
        
        if (character.arcanistPath) {
            const pathData = T20Data.arcanistPaths[character.arcanistPath];
            summary += ` (${pathData ? pathData.name : character.arcanistPath})`;
            
            if (character.sorcererLineage) {
                const lineageData = T20Data.sorcererLineages[character.sorcererLineage];
                summary += ` - Linhagem ${lineageData ? lineageData.name : character.sorcererLineage}`;
            }
        }
        summary += `</p>`;
    }
    
    summary += `<p><strong>Nível:</strong> ${character.level}</p>`;
    
    if (character.origin) {
        const originData = T20Data.origins[character.origin];
        summary += `<p><strong>Origem:</strong> ${originData ? originData.name : character.origin}</p>`;
    }
    
    if (character.deity) {
        const deityData = T20Data.deities[character.deity];
        summary += `<p><strong>Devoção:</strong> ${deityData ? deityData.name : character.deity}</p>`;
    }
    
    // Mostrar atributos com totais
    summary += `<h5>Atributos:</h5><p>`;
    const attributes = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
    const attributeNames = ['For', 'Des', 'Con', 'Int', 'Sab', 'Car'];
    
    attributes.forEach((attr, index) => {
        const total = calculateAttributeTotal(attr);
        const modifier = getModifier(total);
        const modifierStr = modifier >= 0 ? `+${modifier}` : `${modifier}`;
        
        summary += `${attributeNames[index]} ${total} (${modifierStr})`;
        if (index < attributes.length - 1) summary += ', ';
    });
    summary += `</p>`;
    
    if (character.trainedSkills.length > 0) {
        summary += `<h5>Perícias Treinadas:</h5><p>${character.trainedSkills.join(', ')}</p>`;
    }
    
    summary += `<h5>Estatísticas:</h5>`;
    summary += `<p><strong>PV:</strong> ${calculateHitPoints()}, <strong>PM:</strong> ${calculateManaPoints()}, <strong>Defesa:</strong> ${calculateDefense()}</p>`;
    
    if (character.knownSpells.length > 0) {
        summary += `<h5>Magias Conhecidas (${character.knownSpells.length}):</h5>`;
        summary += `<p>${character.knownSpells.join(', ')}</p>`;
    }
    
    // Mostrar características raciais importantes
    if (character.race && T20Data.races[character.race]) {
        const raceData = T20Data.races[character.race];
        summary += `<h5>Características Especiais:</h5>`;
        summary += `<ul>`;
        raceData.traits.forEach(trait => {
            summary += `<li>${trait}</li>`;
        });
        summary += `</ul>`;
    }
    
    summaryElement.innerHTML = summary;
}

function updateCharacterSheet() {
    updateAttributeDisplay();
    updateSkills();
    updateCalculatedStats();
    updateCharacterSummary();
}