document.addEventListener('DOMContentLoaded', function () {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const powerCards = document.querySelectorAll('.power-card');
  const powerSections = document.querySelectorAll('.power-section');

  filterButtons.forEach(button => {
    button.addEventListener('click', function () {
      // Remover classe active de todos os botões
      filterButtons.forEach(btn => btn.classList.remove('active'));

      // Adicionar classe active ao botão clicado
      this.classList.add('active');

      // Filtrar poderes
      const tipo = this.dataset.filter;

      if (tipo === 'all') {
        // Mostrar todos
        powerCards.forEach(card => {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.5s ease-out';
        });
        powerSections.forEach(section => section.style.display = 'block');
      } else {
        // Mostrar apenas do tipo selecionado
        powerSections.forEach(section => {
          if (section.dataset.tipo === tipo) {
            section.style.display = 'block';
          } else {
            section.style.display = 'none';
          }
        });

        powerCards.forEach(card => {
          if (card.dataset.tipo === tipo) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeInUp 0.5s ease-out';
          } else {
            card.classList.add('hidden');
          }
        });
      }
    });
  });

  /**
 * SISTEMA DE PODERES - MÓDULO JAVASCRIPT
 * Gerencia todas as funcionalidades relacionadas aos poderes dos personagens
 * 
 * Funcionalidades:
 * - Busca em tempo real
 * - Filtros rápidos
 * - Toggle de seções
 * - Gerenciamento de seleção
 * - Carregamento de poderes raciais
 * - Animações e efeitos visuais
 */

  class PowersManager {
    constructor(options = {}) {
      this.options = {
        mode: 'create', // 'create', 'edit', 'view'
        enableSearch: true,
        enableFilters: true,
        enableToggle: true,
        enableAnimations: true,
        searchDelay: 300,
        animationDelay: 150,
        ...options
      };

      this.elements = {};
      this.filters = {
        currentFilter: 'all',
        searchQuery: '',
        activeTypes: []
      };

      this.init();
    }

    /**
     * Inicialização principal
     */
    init() {
      this.cacheElements();
      this.bindEvents();
      this.setupInitialState();

      if (this.options.enableAnimations) {
        this.initAnimations();
      }

      console.log(`✅ PowersManager inicializado em modo: ${this.options.mode}`);
    }

    /**
     * Cache dos elementos DOM
     */
    cacheElements() {
      this.elements = {
        // Elementos de busca
        searchInput: document.getElementById('powersSearchInput'),
        searchResults: document.getElementById('powersSearchResults'),

        // Filtros e controles
        quickFilterBtns: document.querySelectorAll('.quick-filter-btn'),
        toggleBtns: document.querySelectorAll('.power-type-toggle'),

        // Poderes e seções
        powerCards: document.querySelectorAll('.power-card, .character-power-card'),
        powerSections: document.querySelectorAll('.power-type-section, .character-power-type-section'),
        checkboxes: document.querySelectorAll('.power-checkbox-filter'),

        // Containers principais
        powersContainer: document.querySelector('.powers-main-container'),
        racialSection: document.getElementById('racialPowersSection'),
        racialList: document.getElementById('racialPowersList'),

        // Campos de formulário
        racaSelect: document.getElementById('raca_id')
      };
    }

    /**
     * Vincula eventos aos elementos
     */
    bindEvents() {
      // Eventos de busca
      if (this.options.enableSearch && this.elements.searchInput) {
        this.setupSearch();
      }

      // Eventos de filtros
      if (this.options.enableFilters && this.elements.quickFilterBtns.length > 0) {
        this.setupFilters();
      }

      // Eventos de toggle
      if (this.options.enableToggle && this.elements.toggleBtns.length > 0) {
        this.setupToggle();
      }

      // Eventos de checkboxes (modos create/edit)
      if ((this.options.mode === 'create' || this.options.mode === 'edit') && this.elements.checkboxes.length > 0) {
        this.setupCheckboxes();
      }

      // Eventos de mudança de raça
      if (this.elements.racaSelect) {
        this.setupRacialPowers();
      }

      // Eventos gerais
      this.setupGeneralEvents();
    }

    /**
     * Configuração inicial do estado
     */
    setupInitialState() {
      // Mostrar todos os poderes inicialmente
      this.showAllPowers();

      // Atualizar contadores
      this.updateCounters();

      // Carregar poderes raciais se já houver raça selecionada
      if (this.elements.racaSelect && this.elements.racaSelect.value) {
        this.loadRacialPowers(this.elements.racaSelect.value);
      }
    }

    /**
     * SISTEMA DE BUSCA
     */
    setupSearch() {
      let searchTimeout;

      this.elements.searchInput.addEventListener('input', (e) => {
        clearTimeout(searchTimeout);
        const query = e.target.value.toLowerCase().trim();

        searchTimeout = setTimeout(() => {
          this.filters.searchQuery = query;

          if (query.length >= 2) {
            this.performSearch(query);
            this.showSearchResults(query);
          } else {
            this.hideSearchResults();
            this.applyCurrentFilters();
          }
        }, this.options.searchDelay);
      });

      // Fechar resultados ao clicar fora
      document.addEventListener('click', (e) => {
        if (!e.target.closest('.powers-search-box')) {
          this.hideSearchResults();
        }
      });

      // Navegação por teclado
      this.elements.searchInput.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          this.clearSearch();
        }
      });
    }

    performSearch(query) {
      let hasResults = false;

      this.elements.powerCards.forEach(card => {
        const isMatch = this.isCardMatch(card, query);

        if (isMatch) {
          this.showCard(card);
          hasResults = true;
        } else {
          this.hideCard(card);
        }
      });

      this.updateSectionVisibility();
      return hasResults;
    }

    isCardMatch(card, query) {
      // Diferentes estratégias de busca baseadas no modo
      if (this.options.mode === 'view') {
        const name = card.querySelector('.character-power-name')?.textContent.toLowerCase() || '';
        const description = card.querySelector('.character-power-description')?.textContent.toLowerCase() || '';
        return name.includes(query) || description.includes(query);
      } else {
        const checkbox = card.closest('label')?.querySelector('.power-checkbox-filter');
        if (!checkbox) return false;

        const name = checkbox.dataset.name || '';
        const description = checkbox.dataset.description || '';
        const type = checkbox.dataset.type || '';

        return name.includes(query) || description.includes(query) || type.includes(query);
      }
    }

    showSearchResults(query) {
      if (!this.elements.searchResults) return;

      const hasResults = this.performSearch(query);

      if (!hasResults) {
        this.elements.searchResults.innerHTML = `
        <div class="search-result-item">
          <span style="color: var(--text-muted); font-style: italic;">
            🔍 Nenhum poder encontrado para "${query}"
          </span>
        </div>
      `;
        this.elements.searchResults.classList.add('active');
      } else {
        this.hideSearchResults();
      }
    }

    hideSearchResults() {
      if (this.elements.searchResults) {
        this.elements.searchResults.classList.remove('active');
      }
    }

    clearSearch() {
      if (this.elements.searchInput) {
        this.elements.searchInput.value = '';
        this.filters.searchQuery = '';
        this.hideSearchResults();
        this.applyCurrentFilters();
      }
    }

    /**
     * SISTEMA DE FILTROS
     */
    setupFilters() {
      this.elements.quickFilterBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();

          // Remover active de todos
          this.elements.quickFilterBtns.forEach(b => b.classList.remove('active'));
          btn.classList.add('active');

          const filterType = btn.dataset.filter;
          this.filters.currentFilter = filterType;

          // Limpar busca ao aplicar filtro
          this.clearSearch();

          // Aplicar filtro
          this.applyFilter(filterType);
        });
      });
    }

    applyFilter(filterType) {
      if (this.options.mode === 'view') {
        this.applyViewFilter(filterType);
      } else {
        this.applyEditFilter(filterType);
      }

      this.updateSectionVisibility();
      this.updateCounters();
    }

    applyViewFilter(filterType) {
      this.elements.powerCards.forEach(card => {
        const cardSource = card.dataset.source;
        const show = filterType === 'all' || cardSource === filterType;

        if (show) {
          this.showCard(card, true);
        } else {
          this.hideCard(card);
        }
      });
    }

    applyEditFilter(filterType) {
      this.elements.powerCards.forEach(card => {
        const checkbox = card.closest('label')?.querySelector('.power-checkbox-filter');
        if (!checkbox) return;

        const type = checkbox.dataset.type;
        const isSelected = checkbox.checked;
        let show = false;

        switch (filterType) {
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
          this.showCard(card);
        } else {
          this.hideCard(card);
        }
      });
    }

    applyCurrentFilters() {
      if (this.filters.searchQuery) {
        this.performSearch(this.filters.searchQuery);
      } else {
        this.applyFilter(this.filters.currentFilter);
      }
    }

    /**
     * SISTEMA DE TOGGLE
     */
    setupToggle() {
      this.elements.toggleBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
          e.preventDefault();

          const targetType = btn.dataset.target;
          const grid = document.getElementById(`powersGrid-${targetType}`);
          const icon = btn.querySelector('.toggle-icon');

          if (grid) {
            const isVisible = grid.style.display !== 'none';

            if (isVisible) {
              this.collapseSection(grid, icon);
            } else {
              this.expandSection(grid, icon);
            }
          }
        });
      });
    }

    expandSection(grid, icon) {
      grid.style.display = this.options.mode === 'view' ? 'block' : 'grid';
      icon.textContent = '📂';

      if (this.options.enableAnimations) {
        grid.parentElement.classList.add('expanding');

        // Animar cards individualmente
        const cards = grid.querySelectorAll('.power-card, .character-power-card');
        cards.forEach((card, index) => {
          if (card.style.display !== 'none') {
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';

            setTimeout(() => {
              card.style.transition = 'all 0.4s ease';
              card.style.opacity = '1';
              card.style.transform = 'translateY(0)';
            }, index * 50);
          }
        });
      }
    }

    collapseSection(grid, icon) {
      grid.style.display = 'none';
      icon.textContent = '📁';
      grid.parentElement.classList.remove('expanding');
    }

    /**
     * SISTEMA DE CHECKBOXES (CREATE/EDIT)
     */
    setupCheckboxes() {
      this.elements.checkboxes.forEach(checkbox => {
        checkbox.addEventListener('change', (e) => {
          this.handleCheckboxChange(e.target);
          this.updatePreview();
          this.updateCounters();
        });
      });
    }

    handleCheckboxChange(checkbox) {
      const card = checkbox.closest('label')?.querySelector('.power-card');
      if (!card) return;

      const isChecked = checkbox.checked;

      // Atualizar visual do card
      if (isChecked) {
        card.classList.add('selected');
        this.addActiveIndicators(card);
      } else {
        card.classList.remove('selected');
        this.removeActiveIndicators(card);
      }

      // Animação de feedback
      if (this.options.enableAnimations) {
        card.style.transform = 'scale(1.05)';
        setTimeout(() => {
          card.style.transform = 'scale(1)';
        }, 200);
      }
    }

    addActiveIndicators(card) {
      // Adicionar badge de ativo
      let sourceDiv = card.querySelector('.power-card-source');
      if (!sourceDiv) {
        sourceDiv = document.createElement('div');
        sourceDiv.className = 'power-card-source';
        card.querySelector('.power-card-header').appendChild(sourceDiv);
      }
      sourceDiv.textContent = '✅ Ativo';

      // Adicionar tag de ativo
      const tagsContainer = card.querySelector('.power-tags');
      if (tagsContainer && !tagsContainer.querySelector('.power-tag[data-active]')) {
        const activeTag = document.createElement('span');
        activeTag.className = 'power-tag';
        activeTag.setAttribute('data-active', 'true');
        activeTag.style.cssText = 'background: var(--success-green); color: white; border-color: var(--success-green);';
        activeTag.textContent = 'Ativo';
        tagsContainer.insertBefore(activeTag, tagsContainer.firstChild);
      }
    }

    removeActiveIndicators(card) {
      // Remover badge de ativo
      const sourceDiv = card.querySelector('.power-card-source');
      if (sourceDiv) {
        sourceDiv.remove();
      }

      // Remover tag de ativo
      const activeTag = card.querySelector('.power-tag[data-active]');
      if (activeTag) {
        activeTag.remove();
      }
    }

    /**
     * SISTEMA DE PODERES RACIAIS
     */
    setupRacialPowers() {
      this.elements.racaSelect.addEventListener('change', (e) => {
        const racaId = e.target.value;
        this.loadRacialPowers(racaId);
      });
    }

    async loadRacialPowers(racaId) {
      if (!racaId || !this.elements.racialSection) return;

      try {
        // Mostrar loading
        this.showRacialLoading();

        const response = await fetch(`/api/racas/${racaId}/poderes`);
        const data = await response.json();

        if (data.success && data.poderes && data.poderes.length > 0) {
          this.displayRacialPowers(data.poderes);
          this.elements.racialSection.style.display = 'block';
        } else {
          this.elements.racialSection.style.display = 'none';
        }
      } catch (error) {
        console.error('Erro ao carregar poderes raciais:', error);
        this.showRacialError();
      }
    }

    showRacialLoading() {
      if (this.elements.racialList) {
        this.elements.racialList.innerHTML = `
        <div class="powers-loading">
          <div class="powers-loading-spinner">⏳</div>
          <p>Carregando poderes raciais...</p>
        </div>
      `;
      }
      if (this.elements.racialSection) {
        this.elements.racialSection.style.display = 'block';
      }
    }

    showRacialError() {
      if (this.elements.racialList) {
        this.elements.racialList.innerHTML = `
        <div class="powers-empty-state">
          <div class="powers-empty-icon">❌</div>
          <h4 class="powers-empty-title">Erro ao Carregar</h4>
          <p class="powers-empty-description">
            Não foi possível carregar os poderes raciais.
          </p>
        </div>
      `;
      }
    }

    displayRacialPowers(poderes) {
      if (!this.elements.racialList) return;

      this.elements.racialList.innerHTML = poderes.map(poder => `
      <div class="racial-power-card">
        <div class="racial-power-badge">🧬 Automático</div>
        <h5 class="racial-power-name">✨ ${poder.nome}</h5>
        <p class="racial-power-description">${poder.descricao}</p>
        ${poder.pre_requisitos ? `
          <div class="power-detail-item" style="margin-top: 0.8rem;">
            <span class="power-detail-label">📋</span>
            <span class="power-detail-value"><strong>Pré-requisitos:</strong> ${poder.pre_requisitos}</span>
          </div>
        ` : ''}
        ${poder.custo_pm && poder.custo_pm > 0 ? `
          <div class="power-detail-item" style="margin-top: 0.5rem;">
            <span class="power-detail-label">💙</span>
            <span class="power-detail-value"><strong>Custo:</strong> ${poder.custo_pm} PM</span>
          </div>
        ` : ''}
      </div>
    `).join('');

      // Animar entrada dos poderes raciais
      if (this.options.enableAnimations) {
        const cards = this.elements.racialList.querySelectorAll('.racial-power-card');
        cards.forEach((card, index) => {
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';

          setTimeout(() => {
            card.style.transition = 'all 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, index * 100);
        });
      }
    }

    /**
     * UTILITÁRIOS DE VISUALIZAÇÃO
     */
    showCard(card, animate = false) {
      const label = card.closest('label');
      const container = label || card;

      container.style.display = 'block';
      card.classList.remove('hidden');

      if (animate && this.options.enableAnimations) {
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        setTimeout(() => {
          card.style.transition = 'all 0.3s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100);
      }
    }

    hideCard(card) {
      const label = card.closest('label');
      const container = label || card;

      container.style.display = 'none';
      card.classList.add('hidden');
    }

    showAllPowers() {
      this.elements.powerCards.forEach(card => {
        this.showCard(card);
      });
      this.updateSectionVisibility();
    }

    updateSectionVisibility() {
      this.elements.powerSections.forEach(section => {
        const visibleCards = section.querySelectorAll('.power-card:not(.hidden), .character-power-card:not(.hidden)');
        section.style.display = visibleCards.length > 0 ? 'block' : 'none';
      });
    }

    /**
     * SISTEMA DE CONTADORES
     */
    updateCounters() {
      this.elements.powerSections.forEach(section => {
        this.updateSectionCounter(section);
      });
    }

    updateSectionCounter(section) {
      const type = section.dataset.type;
      const counter = section.querySelector('.power-type-count');

      if (!counter) return;

      if (this.options.mode === 'edit') {
        const checkboxes = section.querySelectorAll('.power-checkbox-filter');
        const selectedCount = Array.from(checkboxes).filter(cb => cb.checked).length;
        const totalCount = checkboxes.length;
        counter.textContent = `(${selectedCount}/${totalCount} selecionados)`;
      } else if (this.options.mode === 'view') {
        const powers = section.querySelectorAll('.character-power-card');
        const count = powers.length;
        counter.textContent = `(${count} ${count === 1 ? 'poder' : 'poderes'})`;
      } else {
        const powers = section.querySelectorAll('.power-card');
        const count = powers.length;
        counter.textContent = `(${count} disponíveis)`;
      }
    }

    /**
     * SISTEMA DE ANIMAÇÕES
     */
    initAnimations() {
      // Animação de entrada inicial
      this.elements.powerCards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';

        setTimeout(() => {
          card.style.transition = 'all 0.6s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, index * this.options.animationDelay);
      });

      // Efeitos de hover
      this.initHoverEffects();
    }

    initHoverEffects() {
      this.elements.powerCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
          if (this.options.enableAnimations) {
            card.style.transform = 'translateY(-5px) scale(1.02)';
            card.style.boxShadow = '0 8px 20px rgba(212, 175, 55, 0.3)';
          }
        });

        card.addEventListener('mouseleave', () => {
          if (this.options.enableAnimations) {
            card.style.transform = 'translateY(0) scale(1)';
            card.style.boxShadow = 'var(--shadow-md)';
          }
        });
      });
    }

    /**
     * EVENTOS GERAIS
     */
    setupGeneralEvents() {
      // Atalhos de teclado
      document.addEventListener('keydown', (e) => {
        if (e.ctrlKey || e.metaKey) {
          switch (e.key) {
            case 'f':
            case 'F':
              if (this.elements.searchInput) {
                e.preventDefault();
                this.elements.searchInput.focus();
              }
              break;
          }
        }
      });
    }

    /**
     * ATUALIZAÇÃO DE PREVIEW
     */
    updatePreview() {
      // Esta função será sobrescrita ou estendida pelos scripts principais
      if (typeof atualizarPreviewPoderes === 'function') {
        atualizarPreviewPoderes();
      }

      // Dispatch evento customizado para outros scripts
      document.dispatchEvent(new CustomEvent('powersChanged', {
        detail: {
          selectedPowers: this.getSelectedPowers(),
          racialPowers: this.getRacialPowers()
        }
      }));
    }

    /**
     * MÉTODOS UTILITÁRIOS PÚBLICOS
     */
    getSelectedPowers() {
      return Array.from(this.elements.checkboxes)
        .filter(cb => cb.checked)
        .map(cb => ({
          id: cb.value,
          name: cb.closest('label')?.querySelector('.power-card-name')?.textContent,
          type: cb.dataset.type
        }));
    }

    getRacialPowers() {
      const racialCards = document.querySelectorAll('.racial-power-card');
      return Array.from(racialCards).map(card => {
        const name = card.querySelector('.racial-power-name')?.textContent;
        return { name, source: 'racial' };
      });
    }

    selectPower(powerId) {
      const checkbox = document.querySelector(`input[value="${powerId}"]`);
      if (checkbox) {
        checkbox.checked = true;
        this.handleCheckboxChange(checkbox);
      }
    }

    deselectPower(powerId) {
      const checkbox = document.querySelector(`input[value="${powerId}"]`);
      if (checkbox) {
        checkbox.checked = false;
        this.handleCheckboxChange(checkbox);
      }
    }

    togglePower(powerId) {
      const checkbox = document.querySelector(`input[value="${powerId}"]`);
      if (checkbox) {
        checkbox.checked = !checkbox.checked;
        this.handleCheckboxChange(checkbox);
      }
    }

    /**
     * MÉTODO DE LIMPEZA
     */
    destroy() {
      // Remover todos os event listeners e limpar referências
      this.elements = {};
      this.filters = {};
      console.log('PowersManager destruído');
    }
  }

  // Função de inicialização global
  window.initPowersManager = function (options = {}) {
    // Detectar modo automaticamente se não especificado
    if (!options.mode) {
      if (document.querySelector('.character-powers-section')) {
        options.mode = 'view';
      } else if (document.querySelector('form[action*="editar"]')) {
        options.mode = 'edit';
      } else {
        options.mode = 'create';
      }
    }

    return new PowersManager(options);
  };

  // Auto-inicialização quando DOM estiver pronto
  document.addEventListener('DOMContentLoaded', function () {
    // Só inicializar se houver elementos de poderes na página
    if (document.querySelector('.powers-main-container, .character-powers-section')) {
      window.powersManager = window.initPowersManager();
    }
  });

  // Exportar para uso em módulos
  if (typeof module !== 'undefined' && module.exports) {
    module.exports = PowersManager;
  }

  console.log('✅ Sistema de filtros de poderes carregado');
});