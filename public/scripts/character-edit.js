// Script para edição de personagem - Sistema livre com reset correto de raças + Poderes
document.addEventListener('DOMContentLoaded', function() {
  // Verificar se há dados do personagem disponíveis
  const characterForm = document.getElementById('characterForm');
  if (!characterForm) {
    console.log('❌ Formulário de personagem não encontrado');
    return;
  }

  // Elementos do DOM
  const pontosRestantesEl = document.getElementById('pontosRestantes');
  const atributos = ['forca', 'destreza', 'constituicao', 'inteligencia', 'sabedoria', 'carisma'];
  const racaSelect = document.getElementById('raca_id');
  let poderesRaciaisCarregados = [];
  
  // Esconder/remover o sistema de pontos
  if (pontosRestantesEl && pontosRestantesEl.parentElement) {
    pontosRestantesEl.parentElement.style.display = 'none';
  }
  
  // Função de debug para rastrear valores
  function debugAtributos(momento) {
    console.log(`🔍 Debug [${momento}]:`);
    atributos.forEach(attr => {
      const input = document.getElementById(attr);
      console.log(`  ${attr}: valor=${input.value}, base=${input.dataset.valorBase || 'undefined'}`);
    });
  }
  
  // Salvar valores atuais como base na inicialização
  atributos.forEach(attr => {
    const input = document.getElementById(attr);
    if (!input.dataset.valorBase) {
      input.dataset.valorBase = input.value;
    }
  });
  
  // Função para carregar poderes raciais
  async function carregarPoderesRaciais(racaId) {
    try {
      console.log('📚 Carregando poderes raciais para raça ID:', racaId);
      
      const response = await fetch(`/api/racas/${racaId}/poderes`);
      if (!response.ok) {
        throw new Error('Erro ao carregar poderes raciais');
      }
      
      const data = await response.json();
      if (data.success) {
        poderesRaciaisCarregados = data.poderes || [];
        console.log('✅ Poderes raciais carregados:', poderesRaciaisCarregados.length);
      } else {
        console.warn('⚠️ Nenhum poder racial encontrado');
        poderesRaciaisCarregados = [];
      }
    } catch (error) {
      console.error('❌ Erro ao carregar poderes raciais:', error);
      poderesRaciaisCarregados = [];
    }
  }
  
  // Função para atualizar preview de poderes
  function atualizarPreviewPoderes() {
    const previewPoderes = document.getElementById('previewPoderes');
    const poderesPreview = document.getElementById('poderesPreview');
    
    if (!previewPoderes || !poderesPreview) return;
    
    // Coletar poderes atuais do personagem
    const poderesAtuais = [];
    const poderesCards = document.querySelectorAll('.poder-atual-card');
    
    poderesCards.forEach(card => {
      const nome = card.querySelector('.poder-nome').textContent;
      const fonte = card.querySelector('.poder-fonte').textContent;
      poderesAtuais.push(`${fonte} ${nome}`);
    });
    
    // Coletar poderes selecionados adicionais
    const poderesEscolhidos = [];
    const checkboxes = document.querySelectorAll('input[name="poderes_selecionados"]:checked');
    
    checkboxes.forEach(checkbox => {
      const card = checkbox.closest('.poder-selecao-card');
      if (card) {
        const nome = card.querySelector('.poder-nome').textContent;
        poderesEscolhidos.push(`⚡ ${nome} (Escolhido)`);
      }
    });
    
    // Combinar todos os poderes
    const todosPoderes = [...poderesAtuais, ...poderesEscolhidos];
    
    if (todosPoderes.length > 0) {
      poderesPreview.innerHTML = todosPoderes.map(poder => 
        `<div class="poder-preview-item">${poder}</div>`
      ).join('');
      previewPoderes.style.display = 'block';
    } else {
      previewPoderes.style.display = 'none';
    }
  }
  
  // Atualizar preview e cálculos
  function atualizarCalculos() {
    // Atualizar modificadores
    atributos.forEach(attr => {
      const valor = parseInt(document.getElementById(attr).value);
      const modificador = Math.floor((valor - 10) / 2);
      const bonusElement = document.getElementById('bonus-' + attr);
      if (bonusElement) {
        bonusElement.textContent = modificador >= 0 ? '+' + modificador : modificador;
      }
    });
    
    // SEMPRE permitir alteração dos atributos (sem limitação de pontos)
    atributos.forEach(attr => {
      const input = document.getElementById(attr);
      const btnMinus = input.parentNode.querySelector('.minus');
      const btnPlus = input.parentNode.querySelector('.plus');
      
      const valor = parseInt(input.value);
      
      // Habilitar/desabilitar baseado apenas nos limites mínimo e máximo
      btnMinus.disabled = valor <= 3;  // Mínimo 3
      btnPlus.disabled = valor >= 20;  // Máximo 20
      
      // Remover opacidade que indica desabilitado
      btnMinus.style.opacity = btnMinus.disabled ? '0.5' : '1';
      btnPlus.style.opacity = btnPlus.disabled ? '0.5' : '1';
    });
    
    // Calcular características derivadas automaticamente
    calcularCaracteristicasDerivadas();
    atualizarPreview();
  }
  
  // Calcular PV, PM, CA automaticamente
  function calcularCaracteristicasDerivadas() {
    const classeSelect = document.getElementById('classe_id');
    const constituicao = parseInt(document.getElementById('constituicao').value);
    const destreza = parseInt(document.getElementById('destreza').value);
    const nivel = parseInt(document.getElementById('nivel').value) || 1;
    
    if (classeSelect.selectedOptions.length > 0) {
      const option = classeSelect.selectedOptions[0];
      const vidaBase = parseInt(option.dataset.vida) || 0;
      const manaBase = parseInt(option.dataset.mana) || 0;
      
      // Calcular PV (opcional - só se o usuário quiser auto-cálculo)
      const modCon = Math.floor((constituicao - 10) / 2);
      const pvCalculado = vidaBase + modCon + ((nivel - 1) * (Math.floor(vidaBase / 4) + modCon));
      
      // Não forçar o cálculo, apenas sugerir se for muito baixo
      const pvAtual = parseInt(document.getElementById('pontos_vida').value);
      if (pvAtual === 0 || pvAtual < Math.max(1, pvCalculado)) {
        document.getElementById('pontos_vida').value = Math.max(1, pvCalculado);
      }
      
      // Calcular PM
      if (manaBase > 0) {
        const pmCalculado = manaBase + ((nivel - 1) * Math.floor(manaBase / 4));
        const pmAtual = parseInt(document.getElementById('pontos_mana').value);
        if (pmAtual === 0 || pmAtual < pmCalculado) {
          document.getElementById('pontos_mana').value = pmCalculado;
        }
      }
    }
    
    // Calcular CA base (10 + mod Destreza)
    const modDes = Math.floor((destreza - 10) / 2);
    const caBase = 10 + modDes;
    const caAtual = parseInt(document.getElementById('ca').value);
    
    // Só atualizar se a CA atual é menor que a base
    if (caAtual < caBase) {
      document.getElementById('ca').value = caBase;
    }
  }
  
  // Atualizar preview
  function atualizarPreview() {
    const nome = document.getElementById('nome').value || 'Nome do Personagem';
    const racaSelect = document.getElementById('raca_id');
    const classeSelect = document.getElementById('classe_id');
    const nivel = document.getElementById('nivel').value || 1;
    
    let classeNome = 'Classe';
    let racaNome = 'Raça';
    
    if (classeSelect.selectedOptions.length > 0) {
      classeNome = classeSelect.selectedOptions[0].textContent;
    }
    
    if (racaSelect.selectedOptions.length > 0) {
      racaNome = racaSelect.selectedOptions[0].textContent;
    }
    
    const previewNome = document.getElementById('previewNome');
    const previewClasseRaca = document.getElementById('previewClasseRaca');
    
    if (previewNome) previewNome.textContent = nome;
    if (previewClasseRaca) previewClasseRaca.textContent = `${classeNome} ${racaNome} - Nível ${nivel}`;
    
    // Atualizar atributos no preview
    const attrsPreview = document.getElementById('attrsPreview');
    if (attrsPreview) {
      attrsPreview.innerHTML = '';
      
      atributos.forEach(attr => {
        const valor = document.getElementById(attr).value;
        const bonusElement = document.getElementById('bonus-' + attr);
        const modificador = bonusElement ? bonusElement.textContent : '+0';
        const nome = attr.charAt(0).toUpperCase() + attr.slice(1);
        
        const div = document.createElement('div');
        div.className = 'attr-preview';
        div.innerHTML = `
          <span class="label">${nome}:</span>
          <span class="value">${valor} (${modificador})</span>
        `;
        attrsPreview.appendChild(div);
      });
    }
    
    // Atualizar características derivadas no preview
    const derivadasPreview = document.getElementById('derivadasPreview');
    if (derivadasPreview) {
      derivadasPreview.innerHTML = '';
      
      const derivadas = [
        { label: 'Pontos de Vida', value: document.getElementById('pontos_vida').value },
        { label: 'Pontos de Mana', value: document.getElementById('pontos_mana').value },
        { label: 'Classe de Armadura', value: document.getElementById('ca').value }
      ];
      
      derivadas.forEach(item => {
        const div = document.createElement('div');
        div.className = 'stat-preview';
        div.innerHTML = `
          <span class="label">${item.label}:</span>
          <span class="value">${item.value}</span>
        `;
        derivadasPreview.appendChild(div);
      });
    }
    
    // Atualizar preview de poderes
    atualizarPreviewPoderes();
  }
  
  // Event listeners para atributos (sempre funcionais)
  document.querySelectorAll('.attr-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const attr = this.dataset.attr;
      const input = document.getElementById(attr);
      const valor = parseInt(input.value);
      
      if (this.classList.contains('plus') && valor < 20) {
        input.value = valor + 1;
      } else if (this.classList.contains('minus') && valor > 3) {
        input.value = valor - 1;
      }
      
      atualizarCalculos();
    });
  });
  
  // Event listeners para selects
  document.getElementById('classe_id').addEventListener('change', function() {
    atualizarCalculos();
    
    // Destacar atributo principal
    document.querySelectorAll('.atributo-card').forEach(card => {
      card.classList.remove('principal');
    });
    
    if (this.selectedOptions.length > 0) {
      const atributoPrincipal = this.selectedOptions[0].dataset.atributo;
      if (atributoPrincipal) {
        const card = document.getElementById(atributoPrincipal.toLowerCase()).closest('.atributo-card');
        if (card) card.classList.add('principal');
      }
    }
  });
  
  // Event listener para mudança de raça (com reset correto)
  if (racaSelect) {
    racaSelect.addEventListener('change', function() {
      console.log('🔄 Trocando raça na edição para:', this.selectedOptions[0]?.textContent || 'Nenhuma');
      debugAtributos('Antes do reset na edição');
      
      // Em modo de edição, permitir reset para valores base ou manter valores atuais
      const resposta = confirm('Deseja resetar os atributos para os valores base e aplicar os bônus da nova raça?\n\nSim = Reset e aplicar bônus da nova raça\nNão = Manter valores atuais');
      
      if (resposta) {
        // Reset para valores base
        atributos.forEach(attr => {
          const input = document.getElementById(attr);
          if (input.dataset.valorBase) {
            input.value = parseInt(input.dataset.valorBase);
          }
        });
        debugAtributos('Após reset na edição');
      }
      
      // Carregar poderes raciais da nova raça
      if (this.value) {
        carregarPoderesRaciais(this.value);
      } else {
        poderesRaciaisCarregados = [];
      }
      
      atualizarCalculos();
    });
  }
  
  document.getElementById('nivel').addEventListener('input', atualizarCalculos);
  document.getElementById('nome').addEventListener('input', atualizarPreview);
  
  // Event listeners para características derivadas
  ['pontos_vida', 'pontos_mana', 'ca', 'experiencia'].forEach(campo => {
    const element = document.getElementById(campo);
    if (element) {
      element.addEventListener('input', atualizarPreview);
    }
  });
  
  // Event listeners para seleção de poderes
  document.addEventListener('change', function(e) {
    if (e.target.classList.contains('poder-checkbox')) {
      atualizarPreviewPoderes();
    }
  });
  
  // Reset form
  const resetBtn = document.getElementById('resetForm');
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      if (confirm('Tem certeza que deseja resetar o formulário? Todas as alterações não salvas serão perdidas.')) {
        location.reload();
      }
    });
  }
  
  // Form submission com validação
  characterForm.addEventListener('submit', function(e) {
    // Feedback visual
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '💾 Salvando...';
    submitBtn.disabled = true;
    
    // Permitir o submit normal
    console.log('✅ Formulário sendo enviado');
  });
  
  // Carregar poderes raciais iniciais se raça já estiver selecionada
  if (racaSelect.value) {
    carregarPoderesRaciais(racaSelect.value);
  }
  

// Elementos principais
  const searchInput = document.getElementById('powersSearchInput');
  const searchResults = document.getElementById('powersSearchResults');
  const quickFilterBtns = document.querySelectorAll('.quick-filter-btn');
  const powerCards = document.querySelectorAll('.power-card');
  const powerSections = document.querySelectorAll('.power-type-section');
  const toggleBtns = document.querySelectorAll('.power-type-toggle');
  const checkboxes = document.querySelectorAll('.power-checkbox-filter');
  
  // Função de busca em tempo real
  function initSearch() {
    if (!searchInput) return;
    
    let searchTimeout;
    
    searchInput.addEventListener('input', function() {
      clearTimeout(searchTimeout);
      const query = this.value.toLowerCase().trim();
      
      searchTimeout = setTimeout(() => {
        if (query.length >= 2) {
          performSearch(query);
          showSearchResults(query);
        } else {
          hideSearchResults();
          showAllPowers();
        }
      }, 300);
    });
    
    // Fechar resultados ao clicar fora
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.powers-search-box')) {
        hideSearchResults();
      }
    });
  }
  
  function performSearch(query) {
    let hasResults = false;
    
    powerCards.forEach(card => {
      const checkbox = card.closest('label').querySelector('.power-checkbox-filter');
      const name = checkbox.dataset.name || '';
      const description = checkbox.dataset.description || '';
      const type = checkbox.dataset.type || '';
      
      const matches = name.includes(query) || 
                     description.includes(query) || 
                     type.includes(query);
      
      if (matches) {
        card.closest('label').style.display = 'block';
        card.classList.remove('hidden');
        hasResults = true;
      } else {
        card.closest('label').style.display = 'none';
        card.classList.add('hidden');
      }
    });
    
    // Mostrar/ocultar seções baseado nos resultados
    powerSections.forEach(section => {
      const visibleCards = section.querySelectorAll('.power-card:not(.hidden)');
      section.style.display = visibleCards.length > 0 ? 'block' : 'none';
    });
    
    return hasResults;
  }
  
  function showSearchResults(query) {
    if (!searchResults) return;
    
    const hasResults = performSearch(query);
    
    if (!hasResults) {
      searchResults.innerHTML = `
        <div class="search-result-item">
          <span style="color: var(--text-muted); font-style: italic;">
            🔍 Nenhum poder encontrado para "${query}"
          </span>
        </div>
      `;
      searchResults.classList.add('active');
    } else {
      hideSearchResults();
    }
  }
  
  function hideSearchResults() {
    if (searchResults) {
      searchResults.classList.remove('active');
    }
  }
  
  function showAllPowers() {
    powerCards.forEach(card => {
      card.closest('label').style.display = 'block';
      card.classList.remove('hidden');
    });
    
    powerSections.forEach(section => {
      section.style.display = 'block';
    });
  }
  
  // Filtros rápidos com lógica específica para edição
  function initQuickFilters() {
    quickFilterBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        // Remover active de todos
        quickFilterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        
        const filterType = this.dataset.filter;
        
        // Limpar busca
        if (searchInput) {
          searchInput.value = '';
          hideSearchResults();
        }
        
        // Aplicar filtro
        applyFilter(filterType);
      });
    });
  }
  
  function applyFilter(filterType) {
    powerCards.forEach(card => {
      const checkbox = card.closest('label').querySelector('.power-checkbox-filter');
      const type = checkbox.dataset.type;
      const isSelected = checkbox.checked;
      let show = false;
      
      switch(filterType) {
        case 'all':
          show = true;
          break;
        case 'selected':
          show = isSelected;
          break;
        case 'available':
          show = !isSelected;
          break;
        default:
          show = type === filterType;
      }
      
      if (show) {
        card.closest('label').style.display = 'block';
        card.classList.remove('hidden');
      } else {
        card.closest('label').style.display = 'none';
        card.classList.add('hidden');
      }
    });
    
    // Mostrar/ocultar seções
    powerSections.forEach(section => {
      const visibleCards = section.querySelectorAll('.power-card:not(.hidden)');
      section.style.display = visibleCards.length > 0 ? 'block' : 'none';
    });
  }
  
  // Toggle de seções
  function initToggleButtons() {
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', function() {
        const targetType = this.dataset.target;
        const grid = document.getElementById(`powersGrid-${targetType}`);
        const icon = this.querySelector('.toggle-icon');
        
        if (grid) {
          if (grid.style.display === 'none') {
            grid.style.display = 'grid';
            icon.textContent = '📂';
            grid.parentElement.classList.add('expanding');
          } else {
            grid.style.display = 'none';
            icon.textContent = '📁';
            grid.parentElement.classList.remove('expanding');
          }
        }
      });
    });
  }
  
  // Atualizar visual quando checkbox mudar
  function initCheckboxHandlers() {
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        const card = this.closest('label').querySelector('.power-card');
        const sourceDiv = card.querySelector('.power-card-source');
        const tagsContainer = card.querySelector('.power-tags');
        
        if (this.checked) {
          card.classList.add('selected');
          
          // Adicionar ou atualizar badge de ativo
          if (!sourceDiv) {
            const newSource = document.createElement('div');
            newSource.className = 'power-card-source';
            newSource.textContent = '✅ Ativo';
            card.querySelector('.power-card-header').appendChild(newSource);
          } else {
            sourceDiv.textContent = '✅ Ativo';
          }
          
          // Adicionar tag de ativo
          if (!tagsContainer.querySelector('.power-tag[data-active]')) {
            const activeTag = document.createElement('span');
            activeTag.className = 'power-tag';
            activeTag.setAttribute('data-active', 'true');
            activeTag.style.cssText = 'background: var(--success-green); color: white; border-color: var(--success-green);';
            activeTag.textContent = 'Ativo';
            tagsContainer.insertBefore(activeTag, tagsContainer.firstChild);
          }
        } else {
          card.classList.remove('selected');
          
          // Remover badge de ativo
          if (sourceDiv) {
            sourceDiv.remove();
          }
          
          // Remover tag de ativo
          const activeTag = tagsContainer.querySelector('.power-tag[data-active]');
          if (activeTag) {
            activeTag.remove();
          }
        }
        
        // Atualizar contadores
        updateTypeCounters();
        
        // Atualizar preview (se função existir)
        if (typeof atualizarPreviewPoderes === 'function') {
          atualizarPreviewPoderes();
        }
      });
    });
  }
  
  function updateTypeCounters() {
    powerSections.forEach(section => {
      const type = section.dataset.type;
      const counter = section.querySelector('.power-type-count');
      const checkboxesInSection = section.querySelectorAll('.power-checkbox-filter');
      
      const selectedCount = Array.from(checkboxesInSection).filter(cb => cb.checked).length;
      const totalCount = checkboxesInSection.length;
      
      if (counter) {
        counter.textContent = `(${selectedCount}/${totalCount} selecionados)`;
      }
    });
  }
  
  // Inicializar todas as funcionalidades
  initSearch();
  initQuickFilters();
  initToggleButtons();
  initCheckboxHandlers();
  
  // Atualizar contadores iniciais
  updateTypeCounters();
  
  
  // Inicialização
  atualizarCalculos();
  
  console.log('✅ Sistema de poderes avançado (edição) inicializado');
  console.log('✅ Editor de personagem livre inicializado');
  console.log('🔧 Correção aplicada: Reset opcional ao trocar raças na edição');
  console.log('📋 Funcionalidades: Distribuição livre, sem limitação de pontos');
  console.log('✨ Nova funcionalidade: Poderes raciais e seleção de poderes');
});