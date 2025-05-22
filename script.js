// Base de dados do sistema Tormenta20
const T20Data = {
    races: {
        humano: {
            name: "Humano",
            attributeBonus: { any: 2 }, // +2 em qualquer atributo
            size: "Médio",
            displacement: 9,
            traits: [
                "Versátil: +1 perícia treinada adicional",
                "Ambição: +2 em testes de perícia (1x por cena)",
                "Potencial Humano: Recebe um poder geral adicional no 1º nível"
            ],
            skillBonus: 1,
            languages: ["Comum"]
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
            resistance: "veneno"
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
            vision: "penumbra"
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
            languages: ["Comum", "Halfling"]
        },
        goblin: {
            name: "Goblin",
            attributeBonus: { dexterity: 2, intelligence: 1 },
            size: "Pequeno",
            displacement: 6,
            traits: [
                "Engenhosidade: +2 em testes de Reflexos e Máquinas",
                "Peste: +2 em testes de Enganação e Furtividade",
                "Survival Instinct: +1 em CA quando adjacente a aliados"
            ],
            languages: ["Comum", "Goblin"]
        }
        // Mais raças podem ser adicionadas aqui
    },

    classes: {
        arcanista: {
            name: "Arcanista",
            hitDie: 4,
            manaDie: 6,
            primaryStat: "intelligence", // Varia por caminho
            skillsAvailable: ["Conhecimento", "Investigação", "Misticismo", "Vontade"],
            proficiencies: ["Armas simples", "Armaduras leves"],
            spellcaster: true,
            spellType: "arcana",
            paths: ["bruxo", "feiticeiro", "mago"]
        },
        guerreiro: {
            name: "Guerreiro",
            hitDie: 10,
            manaDie: 2,
            primaryStat: "strength",
            skillsAvailable: ["Cavalgar", "Intimidação", "Luta", "Ofício", "Pontaria"],
            proficiencies: ["Todas as armas", "Todos os escudos", "Todas as armaduras"]
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
        barbaro: {
            name: "Bárbaro",
            hitDie: 12,
            manaDie: 2,
            primaryStat: "strength",
            skillsAvailable: ["Atletismo", "Fortitude", "Intimidação", "Luta", "Sobrevivência"],
            proficiencies: ["Armas simples", "Armas marciais", "Escudos", "Armaduras leves"]
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
        }
        // Mais classes podem ser adicionadas
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
        }
        // Mais deuses podem ser adicionados
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
        }
        // Mais origens podem ser adicionadas
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
            { name: "Ataque Certeiro", cost: 1, school: "transmutação" },
            { name: "Compreender Idiomas", cost: 1, school: "adivinhação" },
            { name: "Curar Ferimentos", cost: 1, school: "cura" },
            { name: "Detectar Magia", cost: 1, school: "adivinhação" },
            { name: "Luz", cost: 1, school: "evocação" },
            { name: "Mísseis Mágicos", cost: 1, school: "evocação" },
            { name: "Primeiros Socorros", cost: 1, school: "cura" },
            { name: "Proteção", cost: 1, school: "abjuração" },
            { name: "Raio Elétrico", cost: 1, school: "evocação" },
            { name: "Sono", cost: 1, school: "encantamento" }
        ],
        2: [
            { name: "Bola de Fogo Menor", cost: 3, school: "evocação" },
            { name: "Camuflagem", cost: 3, school: "ilusão" },
            { name: "Cura Moderada", cost: 3, school: "cura" },
            { name: "Força do Touro", cost: 3, school: "transmutação" },
            { name: "Invisibilidade", cost: 3, school: "ilusão" },
            { name: "Levitação", cost: 3, school: "transmutação" },
            { name: "Raio Desintegrador", cost: 3, school: "evocação" },
            { name: "Terreno Ilusório", cost: 3, school: "ilusão" }
        ],
        3: [
            { name: "Bola de Fogo", cost: 6, school: "evocação" },
            { name: "Cura Grave", cost: 6, school: "cura" },
            { name: "Dissipar Magia", cost: 6, school: "abjuração" },
            { name: "Relâmpago", cost: 6, school: "evocação" },
            { name: "Teleporte", cost: 6, school: "conjuração" },
            { name: "Voo", cost: 6, school: "transmutação" }
        ],
        4: [
            { name: "Cura Crítica", cost: 10, school: "cura" },
            { name: "Invocar Elemental", cost: 10, school: "conjuração" },
            { name: "Muralha de Fogo", cost: 10, school: "evocação" },
            { name: "Polimorfismo", cost: 10, school: "transmutação" }
        ],
        5: [
            { name: "Cura Plena", cost: 15, school: "cura" },
            { name: "Desintegração", cost: 15, school: "evocação" },
            { name: "Invocar Dragão", cost: 15, school: "conjuração" },
            { name: "Parar o Tempo", cost: 15, school: "transmutação" }
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

function calculateAttributeTotal(baseScore, attributeName) {
    let total = baseScore;
    
    // Aplicar bônus racial
    if (character.race && T20Data.races[character.race]) {
        const raceData = T20Data.races[character.race];
        if (raceData.attributeBonus[attributeName]) {
            total += raceData.attributeBonus[attributeName];
        } else if (raceData.attributeBonus.any && !character.attributeBonusApplied) {
            // Para raças com bônus "any", aplicar no atributo principal da classe
            if (character.class && T20Data.classes[character.class]) {
                let primaryStat = T20Data.classes[character.class].primaryStat;
                
                // Ajustar para arcanista baseado no caminho
                if (character.class === "arcanista" && character.arcanistPath) {
                    primaryStat = T20Data.arcanistPaths[character.arcanistPath].primaryStat;
                }
                
                if (attributeName === primaryStat) {
                    total += raceData.attributeBonus.any;
                    character.attributeBonusApplied = true;
                }
            }
        }
    }
    
    return total;
}

function calculatePointCost(currentValue, newValue) {
    // Sistema de pontos do T20: custo progressivo
    const costs = {
        8: -2, 9: -1, 10: 0, 11: 1, 12: 2, 13: 3,
        14: 5, 15: 7, 16: 10, 17: 13, 18: 17
    };
    
    return costs[newValue] - costs[currentValue];
}

function getRemainingPoints() {
    const basePoints = 27;
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
    
    const attributeTotal = calculateAttributeTotal(character.attributes[skill.attribute], skill.attribute);
    const attributeBonus = getModifier(attributeTotal);
    const halfLevel = Math.floor(character.level / 2);
    const trainingBonus = isTrained ? getTrainingBonus(character.level) : 0;
    
    let totalBonus = halfLevel + attributeBonus + trainingBonus;
    
    // Bônus raciais específicos
    if (character.race && T20Data.races[character.race]) {
        const raceData = T20Data.races[character.race];
        
        // Anão: +2 em Vontade
        if (raceData.name === "Anão" && skillName === "Vontade") {
            totalBonus += 2;
        }
        
        // Elfo: +2 em Percepção
        if (raceData.name === "Elfo" && skillName === "Percepção") {
            totalBonus += 2;
        }
        
        // Halfling: +2 em Furtividade
        if (raceData.name === "Halfling" && skillName === "Furtividade") {
            totalBonus += 2;
        }
        
        // Goblin: +2 em Reflexos e Máquinas
        if (raceData.name === "Goblin" && (skillName === "Reflexos" || skillName === "Máquinas")) {
            totalBonus += 2;
        }
        
        // Minotauro: +2 contra medo (Vontade), +2 em Percepção para rastrear
        if (raceData.name === "Minotauro" && skillName === "Percepção") {
            totalBonus += 2; // Faro
        }
    }
    
    return totalBonus;
}

function calculateHitPoints() {
    if (!character.class) return 0;
    
    const classData = T20Data.classes[character.class];
    const constitutionMod = getModifier(character.attributes.constitution);
    const baseHP = classData.hitDie + constitutionMod;
    const levelHP = (character.level - 1) * (Math.floor(classData.hitDie / 2) + 1 + constitutionMod);
    
    return baseHP + levelHP;
}

function calculateManaPoints() {
    if (!character.class) return 0;
    
    const classData = T20Data.classes[character.class];
    let keyAttribute = character.attributes[classData.primaryStat];
    
    // Ajustar atributo-chave para arcanista baseado no caminho
    if (character.class === "arcanista" && character.arcanistPath) {
        const pathData = T20Data.arcanistPaths[character.arcanistPath];
        keyAttribute = character.attributes[pathData.primaryStat];
    }
    
    const keyAttributeMod = getModifier(keyAttribute);
    const baseMana = classData.manaDie + keyAttributeMod;
    const levelMana = (character.level - 1) * (Math.floor(classData.manaDie / 2) + 1);
    
    return Math.max(0, baseMana + levelMana);
}

function calculateDefense() {
    const dexterityMod = getModifier(character.attributes.dexterity);
    return 10 + dexterityMod; // Base + Dex modifier
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
            
            // Verificar se tem pontos suficientes
            if (remainingPoints - pointCost >= 0) {
                character.attributes[attr] = newValue;
                updateModifiers();
                updatePointsDisplay();
                updateCharacterSheet();
            } else {
                // Reverter se não tiver pontos suficientes
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
        character.attributeBonusApplied = false; // Reset bônus racial
        updateRaceDetails();
        updateModifiers(); // Recalcular com bônus racial
        updateCharacterSheet();
    });

    // Classe
    document.getElementById('class').addEventListener('change', function() {
        character.class = this.value;
        character.attributeBonusApplied = false; // Reset para reaplicar bônus racial
        updateClassDetails();
        updateModifiers(); // Recalcular modificadores
        updateCharacterSheet();
    });

    // Caminho do Arcanista
    document.getElementById('arcanistPathSelect').addEventListener('change', function() {
        character.arcanistPath = this.value;
        character.attributeBonusApplied = false; // Reset para reaplicar bônus racial
        updateArcanistPathDetails();
        updateModifiers(); // Recalcular com novo atributo-chave
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

function updateModifiers() {
    ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'].forEach(attr => {
        const total = calculateAttributeTotal(character.attributes[attr], attr);
        const modifier = getModifier(total);
        const modifierElement = document.getElementById(attr + 'Mod');
        modifierElement.textContent = modifier >= 0 ? `+${modifier}` : `${modifier}`;
        
        // Mostrar valor total se diferente do base
        const inputElement = document.getElementById(attr);
        if (total !== character.attributes[attr]) {
            inputElement.style.color = '#90ee90'; // Verde para indicar bônus
            inputElement.title = `Base: ${character.attributes[attr]}, Total: ${total}`;
        } else {
            inputElement.style.color = '#ffffff';
            inputElement.title = '';
        }
    });
}

function updatePointsDisplay() {
    const remainingPoints = getRemainingPoints();
    document.getElementById('pointsRemaining').textContent = remainingPoints;
    
    // Mudar cor baseado nos pontos restantes
    const pointsElement = document.getElementById('pointsRemaining');
    if (remainingPoints < 0) {
        pointsElement.style.color = '#ff6b6b'; // Vermelho se negativo
    } else if (remainingPoints === 0) {
        pointsElement.style.color = '#90ee90'; // Verde se exato
    } else {
        pointsElement.style.color = '#ffd700'; // Dourado se tem pontos
    }
}

function updateRaceDetails() {
    const raceSelect = document.getElementById('race');
    const detailsPanel = document.getElementById('raceDetails');
    
    if (!character.race) {
        detailsPanel.innerHTML = '';
        return;
    }
    
    const raceData = T20Data.races[character.race];
    if (!raceData) return;
    
    detailsPanel.innerHTML = `
        <h4>${raceData.name}</h4>
        <p><strong>Tamanho:</strong> ${raceData.size}</p>
        <p><strong>Deslocamento:</strong> ${raceData.displacement}m</p>
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
    
    detailsPanel.innerHTML = `
        <h4>${pathData.name}</h4>
        <p>${pathData.description}</p>
        <p><strong>Atributo-chave:</strong> ${pathData.primaryStat === 'intelligence' ? 'Inteligência' : 
                                             pathData.primaryStat === 'charisma' ? 'Carisma' : 'Sabedoria'}</p>
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
        // Em T20, você escolhe algumas perícias da lista da classe para treinar
        // Por simplicidade, vamos treinar as 2-3 primeiras
        trainedSkills.push(...classData.skillsAvailable.slice(0, 2));
    }
    
    // Perícias da origem
    if (character.origin && T20Data.origins[character.origin]) {
        const originData = T20Data.origins[character.origin];
        // As duas primeiras opções dos benefícios são geralmente perícias
        const originSkills = originData.benefits.filter(benefit => 
            T20Data.skills.some(skill => skill.name === benefit)
        ).slice(0, 2);
        trainedSkills.push(...originSkills);
    }
    
    character.trainedSkills = [...new Set(trainedSkills)]; // Remove duplicatas
    
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
    
    // Determinar círculos de magia disponíveis
    const maxCircle = Math.min(5, Math.floor((character.level + 3) / 4));
    
    // Calcular quantas magias o personagem pode conhecer
    let spellsKnown = getSpellsKnownCount();
    
    let spellsHtml = `<p><strong>Magias conhecidas:</strong> ${character.knownSpells.length}/${spellsKnown}</p>`;
    spellsHtml += '<p>Círculos de magia disponíveis:</p>';
    
    for (let circle = 1; circle <= maxCircle; circle++) {
        const knownInCircle = character.knownSpells.filter(spell => 
            T20Data.spells[circle] && T20Data.spells[circle].some(s => s.name === spell)
        ).length;
        
        spellsHtml += `
            <div class="spell-circle">
                <h3>${circle}º Círculo (Custo: ${getSpellCost(circle)} PM) - Conhecidas: ${knownInCircle}</h3>
                <div class="spells-list">
                    ${T20Data.spells[circle].map(spell => {
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
    if (!character.class || !character.arcanistPath) return 0;
    
    const pathData = T20Data.arcanistPaths[character.arcanistPath];
    
    if (character.arcanistPath === 'mago') {
        // Mago conhece 2 magias por nível + extras por círculo
        return character.level * 2 + Math.floor((character.level + 3) / 4);
    } else if (character.arcanistPath === 'bruxo') {
        // Bruxo conhece 1 magia por nível
        return character.level;
    } else if (character.arcanistPath === 'feiticeiro') {
        // Feiticeiro conhece 1 magia em níveis ímpares
        return Math.ceil(character.level / 2);
    }
    
    return character.level; // Default para outras classes
}

function toggleSpell(spellName, circle) {
    const spellsKnown = getSpellsKnownCount();
    const spellIndex = character.knownSpells.indexOf(spellName);
    
    if (spellIndex > -1) {
        // Remover magia
        character.knownSpells.splice(spellIndex, 1);
    } else {
        // Adicionar magia se não exceder o limite
        if (character.knownSpells.length < spellsKnown) {
            // Verificar se pode aprender magia deste círculo
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
    // Pontos de Vida
    document.getElementById('hitPoints').textContent = calculateHitPoints();
    
    // Pontos de Mana
    document.getElementById('manaPoints').textContent = calculateManaPoints();
    
    // Defesa
    document.getElementById('defense').textContent = calculateDefense();
    
    // Perícias de combate/resistência
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
    
    // Mostrar atributos com totais (incluindo bônus raciais)
    summary += `<h5>Atributos:</h5><p>`;
    const attributes = ['strength', 'dexterity', 'constitution', 'intelligence', 'wisdom', 'charisma'];
    const attributeNames = ['For', 'Des', 'Con', 'Int', 'Sab', 'Car'];
    
    attributes.forEach((attr, index) => {
        const base = character.attributes[attr];
        const total = calculateAttributeTotal(base, attr);
        const modifier = getModifier(total);
        const modifierStr = modifier >= 0 ? `+${modifier}` : `${modifier}`;
        
        if (total !== base) {
            summary += `${attributeNames[index]} ${total} (${modifierStr})`;
        } else {
            summary += `${attributeNames[index]} ${base} (${modifierStr})`;
        }
        
        if (index < attributes.length - 1) summary += ', ';
    });
    summary += `</p>`;
    
    if (character.trainedSkills.length > 0) {
        summary += `<h5>Perícias Treinadas:</h5><p>${character.trainedSkills.join(', ')}</p>`;
    }
    
    // Mostrar estatísticas importantes
    summary += `<h5>Estatísticas:</h5>`;
    summary += `<p><strong>PV:</strong> ${calculateHitPoints()}, <strong>PM:</strong> ${calculateManaPoints()}, <strong>Defesa:</strong> ${calculateDefense()}</p>`;
    
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
    updateModifiers();
    updateSkills();
    updateCalculatedStats();
    updateCharacterSummary();
}