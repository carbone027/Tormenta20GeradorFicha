document.addEventListener('DOMContentLoaded', function () {
  const runeForm = document.getElementById('runeForm');
  const primaryTreeInputs = document.querySelectorAll('input[name="primaryTree"]');
  const keystoneContainer = document.getElementById('keystone-container');
  const primarySlot1Container = document.getElementById('primary-slot1-container');
  const primarySlot2Container = document.getElementById('primary-slot2-container');
  const primarySlot3Container = document.getElementById('primary-slot3-container');
  const secondaryTreeOptions = document.getElementById('secondary-tree-options');
  const secondarySlotsContainer = document.getElementById('secondary-slots-container');
  const runePreviewContent = document.getElementById('rune-preview-content');

  // Dados das runas atualizados
  const runeData = {
    precisao: {
      name: 'Precisão',
      keystones: [
        { id: 'press_the_attack', name: 'Pressione o Ataque' },
        { id: 'lethal_tempo', name: 'Ritmo Fatal' },
        { id: 'fleet_footwork', name: 'Agilidade nos Pés' },
        { id: 'conqueror', name: 'Conquistador' }
      ],
      slot1: [
        { id: 'absorb_life', name: 'Absorsão Vital' },
        { id: 'triumph', name: 'Triunfo' },
        { id: 'presence_of_mind', name: 'Presença de Espírito' }
      ],
      slot2: [
        { id: 'legend_alacrity', name: 'Lenda: Espontaneidade' },
        { id: 'legend_haste', name: 'Lenda: Aceleração' },
        { id: 'legend_bloodline', name: 'Lenda: Linhagem' }
      ],
      slot3: [
        { id: 'coup_de_grace', name: 'Golpe de Misericórdia' },
        { id: 'cut_down', name: 'Dilacerar' },
        { id: 'last_stand', name: 'Até a morte' }
      ]
    },
    dominacao: {
      name: 'Dominação',
      keystones: [
        { id: 'electrocute', name: 'Eletrocutar' },
        { id: 'dark_harvest', name: 'Colheita Sombria' },
        { id: 'hail_of_blades', name: 'Chuva de Laminas' }
      ],
      slot1: [
        { id: 'cheap_shot', name: 'Golpe Desleal' },
        { id: 'taste_of_blood', name: 'Gosto de Sangue' },
        { id: 'sudden_impact', name: 'Impacto Repentino' }
      ],
      slot2: [
        { id: 'sixth_sense', name: 'Sexto Sentido' },
        { id: 'grisly_mementos', name: 'Lembrança Aterrorizante' },
        { id: 'deep_ward', name: 'Sentinela Profunda' }
      ],
      slot3: [
        { id: 'treasure_hunter', name: 'Caçador de Tesouros' },
        { id: 'relentless_hunter', name: 'Caçador Incansável' },
        { id: 'ultimate_hunter', name: 'Caçador Supremo' }
      ]
    },
    feiticaria: {
      name: 'Feitiçaria',
      keystones: [
        { id: 'arcane_comet', name: 'Cometa Arcano' },
        { id: 'summon_aery', name: 'Invocar Aery' },
        { id: 'phase_rush', name: 'Ímpeto Gradual' }
      ],
      slot1: [
        { id: 'axiom_arc', name: 'Arcanista do Axioma' },
        { id: 'manaflow_band', name: 'Faixa de Fluxo de Mana' },
        { id: 'nimbus_cloak', name: 'Manto de Nimbus' }
      ],
      slot2: [
        { id: 'transcendence', name: 'Transcendência' },
        { id: 'celerity', name: 'Celeridade' },
        { id: 'absolute_focus', name: 'Foco Absoluto' }
      ],
      slot3: [
        { id: 'scorch', name: 'Chamuscar' },
        { id: 'waterwalking', name: 'Caminhar Sobre Águas' },
        { id: 'gathering_storm', name: 'Tempestade Crescente' }
      ]
    },
    determinacao: {
      name: 'Determinação',
      keystones: [
        { id: 'grasp_of_the_undying', name: 'Aperto dos Mortos-vivos' },
        { id: 'aftershock', name: 'Pós-Choque' },
        { id: 'guardian', name: 'Guardião' }
      ],
      slot1: [
        { id: 'demolish', name: 'Demolir' },
        { id: 'font_of_life', name: 'Fonte da Vida' },
        { id: 'shield_bash', name: 'Golpe de Escudo' }
      ],
      slot2: [
        { id: 'conditioning', name: 'Condicionamento' },
        { id: 'second_wind', name: 'Ventos Revigorantes' },
        { id: 'bone_plating', name: 'Osso Revestido' }
      ],
      slot3: [
        { id: 'overgrowth', name: 'Crescimento Excessivo' },
        { id: 'revitalize', name: 'Revitalizar' },
        { id: 'unflinching', name: 'Inabalável' }
      ]
    },
    inspiracao: {
      name: 'Inspiração',
      keystones: [
        { id: 'glacial_augment', name: 'Aprimoramento Glacial' },
        { id: 'unsealed_spellbook', name: 'Livro de Feitiços Deslacrado' },
        { id: 'first_strike', name: 'Primeiro Ataque' }
      ],
      slot1: [
        { id: 'hextech_flashtraption', name: 'Flashtração Hextec' },
        { id: 'magical_footwear', name: 'Calçados Mágicos' },
        { id: 'cash_back', name: 'Reembolso' }
      ],
      slot2: [
        { id: 'triple_tonic', name: 'Tônico Triplo' },
        { id: 'time_warp_tonic', name: 'Tônico de Distorção no Tempo' },
        { id: 'biscuit_delivery', name: 'Entrega de Biscoitos' }
      ],
      slot3: [
        { id: 'cosmic_insight', name: 'Perspicácia Cósmica' },
        { id: 'approach_velocity', name: 'Velocidade de Aproximação' },
        { id: 'jack_of_all_trades', name: 'Quebra-Galho' }
      ]
    }
  };

  // Dados dos Stat Shards corretos
  const shardData = {
    slot1: [ // Offense
      { id: 'adaptive_force', name: 'Força Adaptativa', desc: '+5.4 AD ou +9 AP' },
      { id: 'attack_speed', name: 'Velocidade de Ataque', desc: '+10% Velocidade de Ataque' },
      { id: 'ability_haste', name: 'Aceleração de Habilidade', desc: '+8 Aceleração de Habilidade' }
    ],
    slot2: [ // Flex
      { id: 'adaptive_force', name: 'Força Adaptativa', desc: '+5.4 AD ou +9 AP' },
      { id: 'movement_speed', name: 'Velocidade de Movimento', desc: '+2% de Velocidade de Movimento Bonus' },
      { id: 'health_bonus', name: 'Vida Escalável', desc: '+10-180 Vida (baseado no nível)' }
    ],
    slot3: [ // Defense
      { id: 'health', name: 'Vida', desc: '+15-140 Vida (baseado no nível)' },
      { id: 'tenacity', name: 'Tenacidade', desc: '+10% Tenacidade e resistencia a slow' },
      { id: 'health_bonus', name: 'Vida Escalável', desc: '+10-180 Vida (baseado no nível)' }
    ]
  };

  // Event listeners para seleção de árvore primária
  primaryTreeInputs.forEach(input => {
    input.addEventListener('change', handlePrimaryTreeChange);
  });

  // Form submission
  runeForm.addEventListener('submit', handleFormSubmit);

  // Handler para mudança na árvore primária
  function handlePrimaryTreeChange(e) {
    const selectedTree = e.target.value;
    updateKeystoneOptions(selectedTree);
    updatePrimarySlotOptions(selectedTree);
    updateSecondaryTreeOptions(selectedTree);
    updateRunePreview();
  }

  // Atualizar opções de keystone baseado na árvore selecionada
  function updateKeystoneOptions(treeId) {
    const keystoneOptions = document.getElementById('keystone-options');
    keystoneOptions.innerHTML = '';

    const tree = runeData[treeId];
    if (!tree) return;

    tree.keystones.forEach(keystone => {
      const option = document.createElement('div');
      option.className = 'rune-option';
      option.innerHTML = `
        <input type="radio" id="keystone-${keystone.id}" name="primaryKeystone" value="${keystone.id}" required>
        <label for="keystone-${keystone.id}">
          <img src="/assets/runes/${treeId}/${keystone.id}.png" alt="${keystone.name}" onerror="this.src='/assets/runes/placeholder.png'">
          <span>${keystone.name}</span>
        </label>
      `;
      keystoneOptions.appendChild(option);
    });

    // Add event listeners to new radio buttons
    document.querySelectorAll('input[name="primaryKeystone"]').forEach(input => {
      input.addEventListener('change', updateRunePreview);
    });

    keystoneContainer.style.display = 'block';
  }

  // Atualizar opções de slots primários baseado na árvore selecionada
  function updatePrimarySlotOptions(treeId) {
    const tree = runeData[treeId];
    if (!tree) return;

    updateSlotOptions('primary-slot1-options', tree.slot1, 'primarySlot1', treeId);
    updateSlotOptions('primary-slot2-options', tree.slot2, 'primarySlot2', treeId);
    updateSlotOptions('primary-slot3-options', tree.slot3, 'primarySlot3', treeId);

    primarySlot1Container.style.display = 'block';
    primarySlot2Container.style.display = 'block';
    primarySlot3Container.style.display = 'block';
  }

  function updateSlotOptions(containerId, options, fieldName, treeId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    options.forEach(option => {
      const element = document.createElement('div');
      element.className = 'rune-option';
      element.innerHTML = `
        <input type="radio" id="${fieldName}-${option.id}" name="${fieldName}" value="${option.id}" required>
        <label for="${fieldName}-${option.id}">
          <img src="/assets/runes/${treeId}/${option.id}.png" alt="${option.name}" onerror="this.src='/assets/runes/placeholder.png'">
          <span>${option.name}</span>
        </label>
      `;
      container.appendChild(element);
    });

    // Add event listeners to new radio buttons
    document.querySelectorAll(`input[name="${fieldName}"]`).forEach(input => {
      input.addEventListener('change', updateRunePreview);
    });
  }

  // Mapeamento dos nomes das árvores para os arquivos de imagem
  const treeImageMap = {
    'precisao': 'precision',
    'dominacao': 'domination', 
    'feiticaria': 'sorcery',
    'determinacao': 'resolve',
    'inspiracao': 'inspiration'
  };

  // Atualizar opções de árvore secundária (excluindo a primária)
  function updateSecondaryTreeOptions(primaryTreeId) {
    secondaryTreeOptions.innerHTML = '';

    Object.keys(runeData).forEach(treeId => {
      if (treeId !== primaryTreeId) {
        const tree = runeData[treeId];
        const option = document.createElement('div');
        option.className = 'tree-option';
        
        // Usar o mapeamento correto para a imagem
        const imageFileName = treeImageMap[treeId] || treeId;
        const imagePath = `/assets/runes/${imageFileName}.png`;
        
        console.log(`Árvore secundária: ${treeId} -> imagem: ${imagePath}`); // Debug
        
        option.innerHTML = `
          <input type="radio" id="secondary-${treeId}" name="secondaryTree" value="${treeId}" required>
          <label for="secondary-${treeId}">
            <img src="${imagePath}" alt="${tree.name}" onerror="console.log('Erro ao carregar árvore:', this.src); this.src='/assets/runes/placeholder.png'">
            <span>${tree.name}</span>
          </label>
        `;
        secondaryTreeOptions.appendChild(option);
      }
    });

    // Add event listeners to new radio buttons
    document.querySelectorAll('input[name="secondaryTree"]').forEach(input => {
      input.addEventListener('change', handleSecondaryTreeChange);
    });
  }

  // Handler para mudança na árvore secundária
  function handleSecondaryTreeChange(e) {
    const selectedTree = e.target.value;
    updateSecondarySlotsOptions(selectedTree);
    updateRunePreview();
  }

  // Atualizar slots secundários com checkboxes
  function updateSecondarySlotsOptions(treeId) {
    const tree = runeData[treeId];
    if (!tree) return;

    const container = document.getElementById('secondary-slots-options');
    container.innerHTML = '';

    // Limpar seleções anteriores
    clearSecondarySelections();

    // Criar containers para cada slot da árvore secundária
    ['slot1', 'slot2', 'slot3'].forEach((slotKey, slotIndex) => {
      const slotNumber = slotIndex + 1;
      const slotContainer = document.createElement('div');
      slotContainer.className = 'secondary-slot-group';
      slotContainer.innerHTML = `
        <h5>Linha ${slotNumber}</h5>
        <div class="secondary-slot-options" id="secondary-${slotKey}-options"></div>
      `;
      container.appendChild(slotContainer);

      // Popular as opções de cada slot
      const slotOptions = tree[slotKey];
      const slotOptionsContainer = slotContainer.querySelector(`#secondary-${slotKey}-options`);
      
      slotOptions.forEach(option => {
        const element = document.createElement('div');
        element.className = 'rune-option';
        const imagePath = `/assets/runes/${treeId}/${option.id}.png`;
        console.log('Caminho da imagem secundária:', imagePath); // Debug
        
        element.innerHTML = `
          <input type="checkbox" id="secondary-${slotKey}-${option.id}" name="secondarySlot" value="${option.id}" class="secondary-slot-checkbox" data-slot="${slotKey}" data-tree="${treeId}">
          <label for="secondary-${slotKey}-${option.id}">
            <img src="${imagePath}" alt="${option.name}" onerror="console.log('Erro ao carregar:', this.src); this.src='/assets/runes/placeholder.png'">
            <span>${option.name}</span>
          </label>
        `;
        slotOptionsContainer.appendChild(element);
      });
    });

    // Adicionar lógica para permitir apenas 2 seleções de slots diferentes
    const secondaryCheckboxes = document.querySelectorAll('.secondary-slot-checkbox');
    secondaryCheckboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        handleSecondarySlotSelection();
        updateRunePreview();
      });
    });

    secondarySlotsContainer.style.display = 'block';
  }

  // Limpar seleções secundárias anteriores
  function clearSecondarySelections() {
    document.querySelectorAll('.secondary-slot-checkbox').forEach(checkbox => {
      checkbox.checked = false;
      checkbox.disabled = false;
      checkbox.parentElement.style.opacity = '1';
      checkbox.parentElement.style.pointerEvents = 'auto';
    });
  }

  // Gerenciar seleção de runas secundárias (2 de slots diferentes) - CORRIGIDO
  function handleSecondarySlotSelection() {
    const selectedCheckboxes = document.querySelectorAll('.secondary-slot-checkbox:checked');
    const selectedSlots = Array.from(selectedCheckboxes).map(checkbox => checkbox.dataset.slot);
    const uniqueSlots = new Set(selectedSlots);
    
    console.log('Seleções secundárias:', selectedSlots); // Debug
    console.log('Slots únicos:', uniqueSlots); // Debug
    
    // Se já temos 2 seleções de slots únicos
    if (selectedCheckboxes.length === 2 && uniqueSlots.size === 2) {
      // Desabilitar todos os checkboxes que não estão selecionados
      document.querySelectorAll('.secondary-slot-checkbox').forEach(checkbox => {
        if (!checkbox.checked) {
          checkbox.disabled = true;
          checkbox.parentElement.style.opacity = '0.5';
          checkbox.parentElement.style.pointerEvents = 'none';
        }
      });
    } else if (selectedCheckboxes.length === 2 && uniqueSlots.size === 1) {
      // Se temos 2 seleções do mesmo slot, desmarcar a última
      const lastChecked = selectedCheckboxes[selectedCheckboxes.length - 1];
      lastChecked.checked = false;
      showMessage('Você deve selecionar runas de slots diferentes!', 'warning');
    } else if (selectedCheckboxes.length > 2) {
      // Se temos mais de 2 seleções, desmarcar a última
      const lastChecked = selectedCheckboxes[selectedCheckboxes.length - 1];
      lastChecked.checked = false;
      showMessage('Você pode selecionar apenas 2 runas secundárias!', 'warning');
    } else {
      // Se temos menos de 2 seleções ou slots únicos, reabilitar baseado na lógica
      document.querySelectorAll('.secondary-slot-checkbox').forEach(checkbox => {
        const currentSelectedSlots = Array.from(document.querySelectorAll('.secondary-slot-checkbox:checked')).map(cb => cb.dataset.slot);
        const currentUniqueSlots = new Set(currentSelectedSlots);
        
        // Se não há seleções ou há apenas 1 seleção
        if (currentSelectedSlots.length === 0) {
          // Habilitar todos
          checkbox.disabled = false;
          checkbox.parentElement.style.opacity = '1';
          checkbox.parentElement.style.pointerEvents = 'auto';
        } else if (currentSelectedSlots.length === 1) {
          // Se há 1 seleção, desabilitar apenas o mesmo slot
          if (!checkbox.checked && currentSelectedSlots.includes(checkbox.dataset.slot)) {
            checkbox.disabled = true;
            checkbox.parentElement.style.opacity = '0.5';
            checkbox.parentElement.style.pointerEvents = 'none';
          } else {
            checkbox.disabled = false;
            checkbox.parentElement.style.opacity = '1';
            checkbox.parentElement.style.pointerEvents = 'auto';
          }
        }
      });
    }
  }

  // Função para mostrar mensagens
  function showMessage(text, type = 'info') {
    // Remove mensagem anterior se existir
    const existingMessage = document.querySelector('.message-notification');
    if (existingMessage) {
      existingMessage.remove();
    }
    
    const message = document.createElement('div');
    message.className = `message-notification ${type}`;
    message.textContent = text;
    
    // Estilos da mensagem
    message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      color: white;
      font-weight: bold;
      z-index: 10000;
      max-width: 400px;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      animation: slideInRight 0.3s ease-out;
    `;
    
    // Cores baseadas no tipo
    switch (type) {
      case 'success':
        message.style.backgroundColor = '#28a745';
        break;
      case 'error':
        message.style.backgroundColor = '#dc3545';
        break;
      case 'warning':
        message.style.backgroundColor = '#ffc107';
        message.style.color = '#212529';
        break;
      default:
        message.style.backgroundColor = '#007bff';
    }
    
    document.body.appendChild(message);
    
    // Remover após 3 segundos
    setTimeout(() => {
      if (message.parentNode) {
        message.style.animation = 'slideOutRight 0.3s ease-in';
        setTimeout(() => {
          if (message.parentNode) {
            message.remove();
          }
        }, 300);
      }
    }, 3000);
  }

  // Update rune preview
  function updateRunePreview() {
    const primaryTree = document.querySelector('input[name="primaryTree"]:checked')?.value;
    const keystone = document.querySelector('input[name="primaryKeystone"]:checked')?.value;
    const primarySlot1 = document.querySelector('input[name="primarySlot1"]:checked')?.value;
    const primarySlot2 = document.querySelector('input[name="primarySlot2"]:checked')?.value;
    const primarySlot3 = document.querySelector('input[name="primarySlot3"]:checked')?.value;
    const secondaryTree = document.querySelector('input[name="secondaryTree"]:checked')?.value;

    const secondarySlots = Array.from(document.querySelectorAll('.secondary-slot-checkbox:checked')).map(cb => ({
      value: cb.value,
      slot: cb.dataset.slot,
      tree: cb.dataset.tree
    }));

    if (!primaryTree) {
      runePreviewContent.innerHTML = '<p class="empty-state">Selecione as runas para visualizar</p>';
      return;
    }

    // Build preview HTML
    let previewHTML = '<div class="rune-page-preview">';

    // Primary tree
    if (primaryTree && runeData[primaryTree]) {
      previewHTML += `
        <div class="preview-tree">
          <div class="preview-tree-header">
            <img src="/assets/runes/${treeImageMap[primaryTree]}.png" alt="${runeData[primaryTree].name}" class="preview-tree-icon">
            <h4>${runeData[primaryTree].name} (Primária)</h4>
          </div>
      `;

      if (keystone) {
        const keystoneObj = runeData[primaryTree].keystones.find(k => k.id === keystone);
        if (keystoneObj) {
          previewHTML += `
            <div class="preview-rune">
              <img src="/assets/runes/${primaryTree}/${keystone}.png" alt="${keystoneObj.name}">
              <span>${keystoneObj.name}</span>
            </div>
          `;
        }
      }

      [primarySlot1, primarySlot2, primarySlot3].forEach((slot, index) => {
        if (slot) {
          const slotKey = `slot${index + 1}`;
          const slotObj = runeData[primaryTree][slotKey]?.find(r => r.id === slot);
          if (slotObj) {
            previewHTML += `
              <div class="preview-rune">
                <img src="/assets/runes/${primaryTree}/${slot}.png" alt="${slotObj.name}">
                <span>${slotObj.name}</span>
              </div>
            `;
          }
        }
      });

      previewHTML += '</div>';
    }

    // Secondary tree
    if (secondaryTree && runeData[secondaryTree]) {
      previewHTML += `
        <div class="preview-tree">
          <div class="preview-tree-header">
            <img src="/assets/runes/${treeImageMap[secondaryTree]}.png" alt="${runeData[secondaryTree].name}" class="preview-tree-icon">
            <h4>${runeData[secondaryTree].name} (Secundária)</h4>
          </div>
      `;

      secondarySlots.forEach(({value, slot, tree}) => {
        const slotObj = runeData[tree][slot]?.find(r => r.id === value);
        if (slotObj) {
          const imagePathSecondary = `/assets/runes/${tree}/${value}.png`;
          console.log('Preview - Caminho da imagem secundária:', imagePathSecondary); // Debug
          
          previewHTML += `
            <div class="preview-rune">
              <img src="${imagePathSecondary}" alt="${slotObj.name}" onerror="console.log('Erro no preview secundário:', this.src); this.src='/assets/runes/placeholder.png'">
              <span>${slotObj.name}</span>
            </div>
          `;
        }
      });

      previewHTML += '</div>';
    }

    // Stat shards
    const shard1 = document.querySelector('input[name="shard1"]:checked')?.value;
    const shard2 = document.querySelector('input[name="shard2"]:checked')?.value;
    const shard3 = document.querySelector('input[name="shard3"]:checked')?.value;

    if (shard1 || shard2 || shard3) {
      previewHTML += `
        <div class="preview-shards">
          <h4>Fragmentos Estatísticos</h4>
      `;

      [shard1, shard2, shard3].forEach((shard, index) => {
        if (shard) {
          const slotKey = `slot${index + 1}`;
          const shardObj = shardData[slotKey]?.find(s => s.id === shard);
          if (shardObj) {
            const shardImagePath = `/assets/shards/${shard}.png`;
            console.log('Caminho da imagem do shard:', shardImagePath); // Debug
            
            previewHTML += `
              <div class="preview-shard">
                <img src="${shardImagePath}" alt="${shardObj.name}" onerror="console.log('Erro ao carregar shard:', this.src); this.src='/assets/shards/placeholder.png'">
                <span>${shardObj.name}</span>
              </div>
            `;
          }
        }
      });

      previewHTML += '</div>';
    }

    previewHTML += '</div>';
    runePreviewContent.innerHTML = previewHTML;
  }

  // Handle form submission
  async function handleFormSubmit(e) {
    e.preventDefault();

    // Validar seleções de runas secundárias
    const secondarySlots = document.querySelectorAll('.secondary-slot-checkbox:checked');
    if (secondarySlots.length !== 2) {
      showMessage('Selecione exatamente 2 runas secundárias de slots diferentes!', 'warning');
      return;
    }

    // Verificar se as runas secundárias são de slots diferentes
    const selectedSlots = Array.from(secondarySlots).map(checkbox => checkbox.dataset.slot);
    if (new Set(selectedSlots).size !== 2) {
      showMessage('As runas secundárias devem ser de slots diferentes!', 'warning');
      return;
    }

    // Preparar dados do formulário
    const secondarySelections = Array.from(secondarySlots);
    
    const formData = {
      name: document.getElementById('runeName').value,
      primaryTree: document.querySelector('input[name="primaryTree"]:checked').value,
      primaryKeystone: document.querySelector('input[name="primaryKeystone"]:checked').value,
      primarySlot1: document.querySelector('input[name="primarySlot1"]:checked').value,
      primarySlot2: document.querySelector('input[name="primarySlot2"]:checked').value,
      primarySlot3: document.querySelector('input[name="primarySlot3"]:checked').value,
      secondaryTree: document.querySelector('input[name="secondaryTree"]:checked').value,
      secondarySlot1: secondarySelections[0].value,
      secondarySlot2: secondarySelections[1].value,
      shard1: document.querySelector('input[name="shard1"]:checked').value,
      shard2: document.querySelector('input[name="shard2"]:checked').value,
      shard3: document.querySelector('input[name="shard3"]:checked').value,
    };

    console.log('Dados do formulário:', formData); // Debug

    // Adicionar estado de loading no botão
    const submitButton = document.querySelector('.save-rune-btn');
    const originalText = submitButton.textContent;
    submitButton.textContent = 'Salvando...';
    submitButton.disabled = true;
    submitButton.classList.add('loading');

    try {
      const response = await fetch('/runes/save', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        const result = await response.json();
        console.log('Runa salva com sucesso:', result);
        showMessage('Página de runas salva com sucesso!', 'success');
        // Redirecionamento
        setTimeout(() => {
          window.location.replace('/runes/my-runes');
        }, 1500);
      } else {
        const error = await response.json();
        showMessage(`Erro ao salvar página de runas: ${error.error}`, 'error');
      }
    } catch (error) {
      console.error('Erro ao salvar página de runas:', error);
      showMessage('Erro ao salvar página de runas. Tente novamente mais tarde.', 'error');
    } finally {
      // Restaurar botão
      submitButton.textContent = originalText;
      submitButton.disabled = false;
      submitButton.classList.remove('loading');
    }
  }

  // Adicionar animações CSS
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from {
        opacity: 0;
        transform: translateX(300px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes slideOutRight {
      from {
        opacity: 1;
        transform: translateX(0);
      }
      to {
        opacity: 0;
        transform: translateX(300px);
      }
    }
  `;
  
  document.head.appendChild(style);
});