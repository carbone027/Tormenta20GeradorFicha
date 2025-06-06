// Script para visualização de personagem
document.addEventListener('DOMContentLoaded', function () {
  // Verificar se existe um personagem carregado
  const characterSheet = document.querySelector('.character-sheet');
  if (!characterSheet) {
    console.log('❌ Ficha de personagem não encontrada');
    return;
  }

  // Elementos do modal
  const deleteModal = document.getElementById('deleteModal');
  const confirmDeleteBtn = document.getElementById('confirmDelete');
  const cancelDeleteBtn = document.getElementById('cancelDelete');

  // Funções do modal
  window.confirmDelete = function () {
    if (deleteModal) {
      deleteModal.style.display = 'block';
    }
  };

  window.closeDeleteModal = function () {
    if (deleteModal) {
      deleteModal.style.display = 'none';
    }
  };

  // Função para excluir personagem
  window.deleteCharacter = async function () {
    // Obter o ID do personagem da URL
    const pathParts = window.location.pathname.split('/');
    const characterId = pathParts[pathParts.length - 1];

    if (!characterId || isNaN(characterId)) {
      console.error('ID do personagem não encontrado na URL');
      alert('Erro: Não foi possível identificar o personagem.');
      return;
    }

    try {
      const response = await fetch(`/personagens/${characterId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        // Redirect para a lista de personagens
        window.location.href = '/personagens';
      } else {
        throw new Error('Erro ao excluir personagem');
      }
    } catch (error) {
      console.error('Erro:', error);
      alert('Erro ao excluir personagem. Tente novamente.');
    }
  };

  // Função para exportar personagem
  window.exportCharacter = function () {
    // Coletar dados do personagem da página
    const nome = document.querySelector('.character-name')?.textContent || 'Personagem';
    const classeRaca = document.querySelector('.character-class-race')?.textContent || '';
    const nivel = document.querySelector('.level-badge')?.textContent?.replace('Nível ', '') || '1';

    // Coletar atributos
    const atributos = {};
    const atributosCards = document.querySelectorAll('.attribute-card');
    atributosCards.forEach(card => {
      const nomeAttr = card.querySelector('.attr-name')?.textContent;
      const valorAttr = card.querySelector('.attr-value')?.textContent;
      if (nomeAttr && valorAttr) {
        atributos[nomeAttr.toLowerCase()] = valorAttr;
      }
    });

    // Coletar características vitais
    const caracteristicas = {};
    const vitalItems = document.querySelectorAll('.vital-item');
    vitalItems.forEach(item => {
      const label = item.querySelector('.vital-label')?.textContent;
      const value = item.querySelector('.vital-value')?.textContent;
      if (label && value) {
        caracteristicas[label.toLowerCase().replace(/\s+/g, '')] = value;
      }
    });

    const characterData = {
      nome: nome,
      detalhes: classeRaca,
      nivel: nivel,
      atributos: atributos,
      caracteristicas: caracteristicas,
      exportadoEm: new Date().toISOString()
    };

    const dataStr = JSON.stringify(characterData, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });

    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `${nome.replace(/[^a-z0-9]/gi, "_")}_tormenta20.json`;
    link.click();
  };

  // Função para compartilhar personagem
  window.shareCharacter = function () {
    const nome = document.querySelector('.character-name')?.textContent || 'Personagem';

    if (navigator.share) {
      navigator.share({
        title: `${nome} - Tormenta20`,
        text: 'Confira meu personagem de Tormenta20!',
        url: window.location.href
      }).catch(err => {
        console.log('Erro ao compartilhar:', err);
        fallbackShare();
      });
    } else {
      fallbackShare();
    }

    function fallbackShare() {
      // Fallback para copiar URL
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href).then(() => {
          showNotification('Link copiado para a área de transferência!', 'success');
        }).catch(() => {
          showFallbackShare();
        });
      } else {
        showFallbackShare();
      }
    }

    function showFallbackShare() {
      const url = window.location.href;
      prompt('Copie o link abaixo para compartilhar:', url);
    }
  };

  // Event listener para cancelar exclusão
  if (cancelDeleteBtn) {
    cancelDeleteBtn.addEventListener('click', closeDeleteModal);
  }

  // Event listener para confirmar exclusão
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', deleteCharacter);
  }

  // Fechar modal clicando fora
  window.addEventListener('click', function (e) {
    if (e.target === deleteModal) {
      closeDeleteModal();
    }
  });

  // Função utilitária para mostrar notificações
  function showNotification(message, type = 'info') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.textContent = message;
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      color: white;
      font-weight: 600;
      z-index: 1001;
      animation: slideInRight 0.3s ease-out;
      background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : '#2196f3'};
    `;

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }

  // Animações de entrada para os cards
  const cards = document.querySelectorAll('.attribute-card, .vital-item, .background-card');
  cards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';

    setTimeout(() => {
      card.style.transition = 'all 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 100);
  });

  // Adicionar estilos de animação
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideInRight {
      from { transform: translateX(100%); opacity: 0; }
      to { transform: translateX(0); opacity: 1; }
    }
    
    @keyframes slideOutRight {
      from { transform: translateX(0); opacity: 1; }
      to { transform: translateX(100%); opacity: 0; }
    }
  `;
  document.head.appendChild(style);

  // Elementos principais
  const quickFilterBtns = document.querySelectorAll('.quick-filter-btn');
  const powerCards = document.querySelectorAll('.character-power-card');
  const powerSections = document.querySelectorAll('.character-power-type-section');
  const toggleBtns = document.querySelectorAll('.power-type-toggle');

  // Filtros rápidos para visualização
  function initQuickFilters() {
    quickFilterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        // Remover active de todos
        quickFilterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filterSource = this.dataset.filter;
        applySourceFilter(filterSource);
      });
    });
  }

  function applySourceFilter(filterSource) {
    powerCards.forEach(card => {
      const cardSource = card.dataset.source;

      if (filterSource === 'all' || cardSource === filterSource) {
        card.style.display = 'block';
        card.classList.remove('hidden');

        // Animação de entrada
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        setTimeout(() => {
          card.style.transition = 'all 0.3s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100);
      } else {
        card.style.display = 'none';
        card.classList.add('hidden');
      }
    });

    // Mostrar/ocultar seções baseado nos cards visíveis
    powerSections.forEach(section => {
      const visibleCards = section.querySelectorAll('.character-power-card:not(.hidden)');
      section.style.display = visibleCards.length > 0 ? 'block' : 'none';
    });
  }

  // Toggle de seções
  function initToggleButtons() {
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const targetType = this.dataset.target;
        const grid = document.getElementById(`powersGrid-${targetType}`);
        const icon = this.querySelector('.toggle-icon');

        if (grid) {
          if (grid.style.display === 'none') {
            grid.style.display = 'block';
            icon.textContent = '📂';

            // Animar cards ao expandir
            const cards = grid.querySelectorAll('.character-power-card');
            cards.forEach((card, index) => {
              card.style.opacity = '0';
              card.style.transform = 'translateY(20px)';
              setTimeout(() => {
                card.style.transition = 'all 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, index * 100);
            });
          } else {
            grid.style.display = 'none';
            icon.textContent = '📁';
          }
        }
      });
    });
  }

  // Animações de entrada inicial
  function initEntryAnimations() {
    powerCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';

      setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 150);
    });
  }

  // Hover effects para melhor UX
  function initHoverEffects() {
    powerCards.forEach(card => {
      card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-5px) scale(1.02)';
        this.style.boxShadow = '0 8px 20px rgba(212, 175, 55, 0.3)';
      });

      card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'var(--shadow-md)';
      });
    });
  }

  // Funcionalidade de imprimir apenas poderes
  function initPrintPowers() {
    // Adicionar botão de imprimir poderes na seção
    const powersSection = document.querySelector('.character-powers-section');
    if (powersSection && powerCards.length > 0) {
      const printBtn = document.createElement('button');
      printBtn.className = 'btn btn-secondary';
      printBtn.style.cssText = 'margin: 1rem auto; display: block;';
      printBtn.innerHTML = '🖨️ Imprimir Apenas Poderes';

      printBtn.addEventListener('click', function () {
        // Criar janela de impressão apenas com os poderes
        const printContent = powersSection.cloneNode(true);
        const printWindow = window.open('', '_blank');

        printWindow.document.write(`
          <html>
            <head>
              <title>Poderes - ${document.title}</title>
              <link rel="stylesheet" href="/stylesheet/style.css">
              <link rel="stylesheet" href="/stylesheet/powers.css">
              <style>
                body { padding: 2rem; }
                .quick-filter-btn, .power-type-toggle { display: none; }
                .character-power-card { break-inside: avoid; margin-bottom: 1rem; }
                @media print {
                  .quick-filter-btn, .power-type-toggle { display: none !important; }
                }
              </style>
            </head>
            <body>
              ${printContent.outerHTML}
            </body>
          </html>
        `);

        printWindow.document.close();
        printWindow.focus();
        setTimeout(() => {
          printWindow.print();
          printWindow.close();
        }, 500);
      });

      powersSection.appendChild(printBtn);
    }
  }

  // Animação de entrada para os cards de poderes de classe
  const classPowerCards = document.querySelectorAll('.class-power-card');

  classPowerCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';

    setTimeout(() => {
      card.style.transition = 'all 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 150);
  });

  // ========================================
  // SISTEMA DE MAGIAS - VISUALIZAÇÃO
  // Adicionar ao arquivo character-view.js
  // ========================================

  // Inicializar sistema de magias na visualização
  function initSpellsViewSystem() {
    console.log('🔮 Inicializando sistema de visualização de magias...');

    // Elementos principais de magias
    const spellCards = document.querySelectorAll('.character-spell-card');
    const spellFilters = document.querySelectorAll('.spells-filters .quick-filter-btn');
    const spellCircleSections = document.querySelectorAll('.spell-circle-section');
    const spellCircleToggles = document.querySelectorAll('.spell-circle-toggle');

    // Inicializar filtros de magias
    initSpellFilters();

    // Inicializar toggles de círculos
    initSpellCircleToggles();

    // Inicializar animações de entrada
    initSpellEntryAnimations();

    // Inicializar hover effects
    initSpellHoverEffects();

    // Inicializar funcionalidade de impressão de magias
    initPrintSpells();

    console.log('✅ Sistema de visualização de magias inicializado');
  }

  // Filtros para magias na visualização
  function initSpellFilters() {
    const filterBtns = document.querySelectorAll('.spells-filters .quick-filter-btn');
    const spellCards = document.querySelectorAll('.character-spell-card');

    filterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        // Remover active de todos
        filterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filterType = this.dataset.filter;
        applySpellFilter(filterType, spellCards);
      });
    });
  }

  // Aplicar filtro nas magias
  function applySpellFilter(filterType, spellCards) {
    spellCards.forEach(card => {
      const spellType = card.dataset.type || '';
      const spellCircle = card.dataset.circle || '';
      const spellSchool = card.dataset.school || '';

      let show = false;

      switch (filterType) {
        case 'all':
          show = true;
          break;
        case 'arcana':
          show = spellType === 'arcana';
          break;
        case 'divina':
          show = spellType === 'divina';
          break;
        case 'universal':
          show = spellType === 'universal';
          break;
        case 'circle-1':
          show = spellCircle === '1';
          break;
        case 'circle-2':
          show = spellCircle === '2';
          break;
        case 'circle-3':
          show = spellCircle === '3';
          break;
        case 'circle-4':
          show = spellCircle === '4';
          break;
        case 'circle-5':
          show = spellCircle === '5';
          break;
        default:
          show = true;
      }

      if (show) {
        card.style.display = 'block';
        card.classList.remove('hidden');

        // Animação de entrada
        card.style.opacity = '0';
        card.style.transform = 'translateY(10px)';
        setTimeout(() => {
          card.style.transition = 'all 0.3s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100);
      } else {
        card.style.display = 'none';
        card.classList.add('hidden');
      }
    });

    // Mostrar/ocultar seções baseado nos cards visíveis
    const spellSections = document.querySelectorAll('.spell-circle-section');
    spellSections.forEach(section => {
      const visibleCards = section.querySelectorAll('.character-spell-card:not(.hidden)');
      section.style.display = visibleCards.length > 0 ? 'block' : 'none';
    });
  }

  // Toggle de círculos de magias
  function initSpellCircleToggles() {
    const toggleBtns = document.querySelectorAll('.spell-circle-toggle');

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const targetCircle = this.dataset.target;
        const grid = document.getElementById(`spellsGrid-${targetCircle}`);
        const icon = this.querySelector('.toggle-icon');

        if (grid) {
          if (grid.style.display === 'none') {
            grid.style.display = 'grid';
            icon.textContent = '📂';

            // Animar cards ao expandir
            const cards = grid.querySelectorAll('.character-spell-card');
            cards.forEach((card, index) => {
              card.style.opacity = '0';
              card.style.transform = 'translateY(20px)';
              setTimeout(() => {
                card.style.transition = 'all 0.4s ease';
                card.style.opacity = '1';
                card.style.transform = 'translateY(0)';
              }, index * 100);
            });
          } else {
            grid.style.display = 'none';
            icon.textContent = '📁';
          }
        }
      });
    });
  }

  // Animações de entrada inicial para magias
  function initSpellEntryAnimations() {
    const spellCards = document.querySelectorAll('.character-spell-card');

    spellCards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(30px)';

      setTimeout(() => {
        card.style.transition = 'all 0.6s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      }, index * 150);
    });
  }

  // Hover effects para melhor UX
  function initSpellHoverEffects() {
    const spellCards = document.querySelectorAll('.character-spell-card');

    spellCards.forEach(card => {
      card.addEventListener('mouseenter', function () {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.boxShadow = '0 12px 25px rgba(212, 175, 55, 0.4)';

        // Adicionar efeito de brilho nas tags
        const tags = this.querySelectorAll('.spell-tag');
        tags.forEach(tag => {
          tag.style.boxShadow = '0 0 8px rgba(212, 175, 55, 0.3)';
        });
      });

      card.addEventListener('mouseleave', function () {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'var(--shadow-md)';

        // Remover efeito de brilho nas tags
        const tags = this.querySelectorAll('.spell-tag');
        tags.forEach(tag => {
          tag.style.boxShadow = 'none';
        });
      });
    });
  }

  // Funcionalidade de imprimir apenas magias
  function initPrintSpells() {
    const spellsSection = document.querySelector('.character-spells-section');
    if (spellsSection) {
      const spellCards = spellsSection.querySelectorAll('.character-spell-card');

      if (spellCards.length > 0) {
        const printBtn = document.createElement('button');
        printBtn.className = 'btn btn-secondary';
        printBtn.style.cssText = 'margin: 1rem auto; display: block;';
        printBtn.innerHTML = '🖨️ Imprimir Apenas Magias';

        printBtn.addEventListener('click', function () {
          // Criar janela de impressão apenas com as magias
          const printContent = spellsSection.cloneNode(true);

          // Remover elementos desnecessários para impressão
          const filtersToRemove = printContent.querySelectorAll('.spells-filters, .spell-circle-toggle');
          filtersToRemove.forEach(element => element.remove());

          const printWindow = window.open('', '_blank');

          printWindow.document.write(`
          <html>
            <head>
              <title>Magias - ${document.title}</title>
              <link rel="stylesheet" href="/stylesheet/style.css">
              <style>
                body { 
                  padding: 2rem; 
                  background: white; 
                  color: black; 
                }
                .character-spell-card { 
                  break-inside: avoid; 
                  margin-bottom: 1rem; 
                  border-color: #333 !important;
                  background: white !important;
                }
                .spell-circle-toggle { 
                  display: none !important; 
                }
                .spells-filters { 
                  display: none !important; 
                }
                .spell-tag {
                  background: #f0f0f0 !important;
                  color: #333 !important;
                  border-color: #999 !important;
                }
                h3, h4, h5 {
                  color: #333 !important;
                }
                .spell-name {
                  color: #000 !important;
                }
                @media print {
                  .spells-filters, .spell-circle-toggle { 
                    display: none !important; 
                  }
                  .character-spell-card {
                    border: 1px solid #333 !important;
                    background: white !important;
                  }
                }
              </style>
            </head>
            <body>
              ${printContent.outerHTML}
            </body>
          </html>
        `);

          printWindow.document.close();
          printWindow.focus();
          setTimeout(() => {
            printWindow.print();
            printWindow.close();
          }, 500);
        });

        spellsSection.appendChild(printBtn);
      }
    }
  }

  // Funcionalidade para expandir/recolher descrições longas
  function initSpellDescriptionToggles() {
    const spellDescriptions = document.querySelectorAll('.spell-card-description');

    spellDescriptions.forEach(description => {
      const text = description.textContent;

      // Se a descrição for muito longa, criar toggle
      if (text.length > 150) {
        const shortText = text.substring(0, 150) + '...';
        const fullText = text;

        description.innerHTML = `
        <span class="description-text">${shortText}</span>
        <button class="description-toggle" style="
          background: none; 
          border: none; 
          color: var(--accent-gold); 
          cursor: pointer; 
          font-size: 0.9rem;
          margin-left: 0.5rem;
        ">
          Ver mais
        </button>
      `;

        const toggle = description.querySelector('.description-toggle');
        const textSpan = description.querySelector('.description-text');
        let expanded = false;

        toggle.addEventListener('click', function (e) {
          e.stopPropagation();

          if (expanded) {
            textSpan.textContent = shortText;
            toggle.textContent = 'Ver mais';
            expanded = false;
          } else {
            textSpan.textContent = fullText;
            toggle.textContent = 'Ver menos';
            expanded = true;
          }
        });
      }
    });
  }

  // Funcionalidade de busca de magias na visualização
  function initSpellSearch() {
    // Se houver uma barra de busca na visualização
    const searchInput = document.getElementById('spellsViewSearch');
    if (!searchInput) return;

    const spellCards = document.querySelectorAll('.character-spell-card');
    let searchTimeout;

    searchInput.addEventListener('input', function () {
      clearTimeout(searchTimeout);
      const query = this.value.toLowerCase().trim();

      searchTimeout = setTimeout(() => {
        spellCards.forEach(card => {
          const spellName = card.querySelector('.spell-name')?.textContent.toLowerCase() || '';
          const spellDescription = card.querySelector('.spell-card-description')?.textContent.toLowerCase() || '';
          const spellSchool = card.dataset.school || '';
          const spellType = card.dataset.type || '';

          const matches = spellName.includes(query) ||
            spellDescription.includes(query) ||
            spellSchool.includes(query) ||
            spellType.includes(query);

          if (matches || query === '') {
            card.style.display = 'block';
            card.classList.remove('search-hidden');
          } else {
            card.style.display = 'none';
            card.classList.add('search-hidden');
          }
        });

        // Atualizar visibilidade das seções
        const spellSections = document.querySelectorAll('.spell-circle-section');
        spellSections.forEach(section => {
          const visibleCards = section.querySelectorAll('.character-spell-card:not(.search-hidden)');
          section.style.display = visibleCards.length > 0 ? 'block' : 'none';
        });
      }, 300);
    });
  }

  // Tooltip com informações adicionais da magia
  function initSpellTooltips() {
    const spellCards = document.querySelectorAll('.character-spell-card');

    spellCards.forEach(card => {
      card.addEventListener('mouseenter', function (e) {
        const spellName = this.querySelector('.spell-name')?.textContent;
        const spellCost = this.querySelector('.cost-value')?.textContent;
        const spellType = this.dataset.type;

        if (spellName) {
          // Criar tooltip simples
          const tooltip = document.createElement('div');
          tooltip.className = 'spell-tooltip';
          tooltip.style.cssText = `
          position: absolute;
          background: rgba(25, 28, 60, 0.95);
          border: 2px solid var(--accent-gold);
          border-radius: 8px;
          padding: 0.8rem;
          color: var(--text-light);
          font-size: 0.9rem;
          z-index: 1000;
          max-width: 250px;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
          pointer-events: none;
        `;

          tooltip.innerHTML = `
          <strong>${spellName}</strong><br>
          <span style="color: var(--text-muted);">
            Tipo: ${spellType} • Custo: ${spellCost || '0'} PM
          </span>
        `;

          document.body.appendChild(tooltip);

          // Posicionar tooltip
          const rect = this.getBoundingClientRect();
          tooltip.style.left = (rect.left + rect.width + 10) + 'px';
          tooltip.style.top = rect.top + 'px';

          // Remover tooltip ao sair
          this.addEventListener('mouseleave', function () {
            if (tooltip.parentNode) {
              tooltip.remove();
            }
          }, { once: true });
        }
      });
    });
  }

  // ========================================
  // SISTEMA INTERATIVO DE VIDA E MANA
  // Arquivo: public/scripts/interactive-vitals.js
  // ========================================

  class InteractiveVitals {
    constructor() {
      this.initialized = false;
      this.vitals = new Map(); // Armazenar estado dos vitais
      this.init();
    }

    init() {
      if (this.initialized) return;

      console.log('❤️ Inicializando sistema interativo de vida e mana...');

      // Aguardar DOM estar pronto
      if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => this.setup());
      } else {
        this.setup();
      }

      this.initialized = true;
    }

    setup() {
      this.convertExistingVitals();
      this.createQuickActionModal();
      console.log('✅ Sistema interativo de vida e mana inicializado');
    }

    // Converter elementos vitais existentes
    convertExistingVitals() {
      const vitalItems = document.querySelectorAll('.vital-item');

      vitalItems.forEach(item => {
        const label = item.querySelector('.vital-label, .vital-item h4, .vital-item p')?.textContent?.toLowerCase() || '';

        if (label.includes('vida') || label.includes('pv') || label.includes('pontos de vida')) {
          this.convertToInteractiveHealth(item);
        } else if (label.includes('mana') || label.includes('pm') || label.includes('pontos de mana')) {
          this.convertToInteractiveMana(item);
        }
      });
    }

    // Converter elemento de vida em interativo
    convertToInteractiveHealth(vitalItem) {
      const valueElement = vitalItem.querySelector('.vital-value, .stat-value');
      if (!valueElement) return;

      const maxHealth = parseInt(valueElement.textContent) || 20;
      const vitalId = 'health_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

      const vitalData = {
        id: vitalId,
        type: 'health',
        current: maxHealth,
        max: maxHealth,
        min: Math.floor(-maxHealth / 2)
      };

      this.vitals.set(vitalId, vitalData);

      // Adicionar classes e data attributes
      vitalItem.classList.add('interactive', 'pv');
      vitalItem.dataset.vitalId = vitalId;

      // Criar nova estrutura
      vitalItem.innerHTML = this.createHealthStructure(vitalData);

      // Configurar controles
      this.setupHealthControls(vitalItem, vitalData);
      this.updateHealthDisplay(vitalItem, vitalData);
    }

    // Converter elemento de mana em interativo
    convertToInteractiveMana(vitalItem) {
      const valueElement = vitalItem.querySelector('.vital-value, .stat-value');
      if (!valueElement) return;

      const maxMana = parseInt(valueElement.textContent) || 10;
      const vitalId = 'mana_' + Date.now() + '_' + Math.random().toString(36).substr(2, 9);

      const vitalData = {
        id: vitalId,
        type: 'mana',
        current: maxMana,
        max: maxMana,
        min: 0
      };

      this.vitals.set(vitalId, vitalData);

      // Adicionar classes e data attributes
      vitalItem.classList.add('interactive', 'pm');
      vitalItem.dataset.vitalId = vitalId;

      // Criar nova estrutura
      vitalItem.innerHTML = this.createManaStructure(vitalData);

      // Configurar controles
      this.setupManaControls(vitalItem, vitalData);
      this.updateManaDisplay(vitalItem, vitalData);
    }

    // Criar estrutura HTML para vida
    createHealthStructure(vitalData) {
      const { current, max } = vitalData;
      const status = this.getHealthStatus(current, max);

      return `
      <div class="vital-interactive-header">
        <div class="vital-label-icon">
          <div class="vital-icon">❤️</div>
          <h4 class="vital-label">Pontos de Vida</h4>
        </div>
        <div class="vital-status">${status}</div>
      </div>

      <div class="vital-controls">
        <button type="button" class="vital-btn decrease" data-action="decrease" title="Diminuir vida">
          <span>−</span>
        </button>

        <div class="vital-value-display">
          <div class="vital-current-value">${current}</div>
          <div class="vital-max-value">/ ${max}</div>
        </div>

        <button type="button" class="vital-btn increase" data-action="increase" title="Aumentar vida">
          <span>+</span>
        </button>
      </div>

      <div class="vital-progress">
        <div class="vital-progress-bar"></div>
      </div>

      <div class="vital-quick-actions">
        <button type="button" class="quick-action-btn heal" data-action="heal" title="Curar quantidade específica">
          💚 Curar
        </button>
        <button type="button" class="quick-action-btn damage" data-action="damage" title="Causar dano específico">
          💔 Dano
        </button>
        <button type="button" class="quick-action-btn" data-action="full-heal" title="Restaurar vida completamente">
          ✨ Cura Total
        </button>
        <button type="button" class="quick-action-btn" data-action="reset" title="Voltar ao máximo">
          🔄 Reset
        </button>
      </div>

      <div class="vital-change-notification"></div>
    `;
    }

    // Criar estrutura HTML para mana
    createManaStructure(vitalData) {
      const { current, max } = vitalData;
      const status = this.getManaStatus(current, max);

      return `
      <div class="vital-interactive-header">
        <div class="vital-label-icon">
          <div class="vital-icon">🔵</div>
          <h4 class="vital-label">Pontos de Mana</h4>
        </div>
        <div class="vital-status">${status}</div>
      </div>

      <div class="vital-controls">
        <button type="button" class="vital-btn decrease" data-action="decrease" title="Diminuir mana">
          <span>−</span>
        </button>

        <div class="vital-value-display">
          <div class="vital-current-value">${current}</div>
          <div class="vital-max-value">/ ${max}</div>
        </div>

        <button type="button" class="vital-btn increase" data-action="increase" title="Aumentar mana">
          <span>+</span>
        </button>
      </div>

      <div class="vital-progress">
        <div class="vital-progress-bar"></div>
      </div>

      <div class="vital-quick-actions">
        <button type="button" class="quick-action-btn restore" data-action="restore" title="Restaurar quantidade específica">
          💙 Restaurar
        </button>
        <button type="button" class="quick-action-btn drain" data-action="drain" title="Gastar quantidade específica">
          🟣 Gastar
        </button>
        <button type="button" class="quick-action-btn" data-action="full-restore" title="Restaurar mana completamente">
          ✨ Restaurar Total
        </button>
        <button type="button" class="quick-action-btn" data-action="reset" title="Voltar ao máximo">
          🔄 Reset
        </button>
      </div>

      <div class="vital-change-notification"></div>
    `;
    }

    // Configurar controles de vida
    setupHealthControls(vitalItem, vitalData) {
      const decreaseBtn = vitalItem.querySelector('.vital-btn.decrease');
      const increaseBtn = vitalItem.querySelector('.vital-btn.increase');
      const quickActionBtns = vitalItem.querySelectorAll('.quick-action-btn');

      // Botão de diminuir
      decreaseBtn?.addEventListener('click', () => {
        this.changeHealth(vitalData.id, -1);
        this.updateHealthDisplay(vitalItem, vitalData);
        this.showChangeNotification(vitalItem, -1);
      });

      // Botão de aumentar
      increaseBtn?.addEventListener('click', () => {
        this.changeHealth(vitalData.id, 1);
        this.updateHealthDisplay(vitalItem, vitalData);
        this.showChangeNotification(vitalItem, 1);
      });

      // Quick actions
      quickActionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.handleHealthQuickAction(btn.dataset.action, vitalData, vitalItem);
        });
      });
    }

    // Configurar controles de mana
    setupManaControls(vitalItem, vitalData) {
      const decreaseBtn = vitalItem.querySelector('.vital-btn.decrease');
      const increaseBtn = vitalItem.querySelector('.vital-btn.increase');
      const quickActionBtns = vitalItem.querySelectorAll('.quick-action-btn');

      // Botão de diminuir
      decreaseBtn?.addEventListener('click', () => {
        this.changeMana(vitalData.id, -1);
        this.updateManaDisplay(vitalItem, vitalData);
        this.showChangeNotification(vitalItem, -1);
      });

      // Botão de aumentar
      increaseBtn?.addEventListener('click', () => {
        this.changeMana(vitalData.id, 1);
        this.updateManaDisplay(vitalItem, vitalData);
        this.showChangeNotification(vitalItem, 1);
      });

      // Quick actions
      quickActionBtns.forEach(btn => {
        btn.addEventListener('click', () => {
          this.handleManaQuickAction(btn.dataset.action, vitalData, vitalItem);
        });
      });
    }

    // Gerenciar quick actions de vida
    handleHealthQuickAction(action, vitalData, vitalItem) {
      switch (action) {
        case 'heal':
          this.showQuickActionModal('Quantidade de Cura', 'Quanto de vida deseja restaurar?', (amount) => {
            const change = this.changeHealth(vitalData.id, amount);
            this.updateHealthDisplay(vitalItem, vitalData);
            if (change > 0) this.showChangeNotification(vitalItem, change);
          });
          break;

        case 'damage':
          this.showQuickActionModal('Quantidade de Dano', 'Quanto de dano foi recebido?', (amount) => {
            const change = this.changeHealth(vitalData.id, -amount);
            this.updateHealthDisplay(vitalItem, vitalData);
            if (change < 0) this.showChangeNotification(vitalItem, change);
          });
          break;

        case 'full-heal':
          const healChange = vitalData.max - vitalData.current;
          this.setHealth(vitalData.id, vitalData.max);
          this.updateHealthDisplay(vitalItem, vitalData);
          if (healChange > 0) this.showChangeNotification(vitalItem, healChange);
          break;

        case 'reset':
          const resetChange = vitalData.max - vitalData.current;
          this.setHealth(vitalData.id, vitalData.max);
          this.updateHealthDisplay(vitalItem, vitalData);
          if (resetChange !== 0) this.showChangeNotification(vitalItem, resetChange);
          break;
      }
    }

    // Gerenciar quick actions de mana
    handleManaQuickAction(action, vitalData, vitalItem) {
      switch (action) {
        case 'restore':
          this.showQuickActionModal('Restaurar Mana', 'Quanto de mana deseja restaurar?', (amount) => {
            const change = this.changeMana(vitalData.id, amount);
            this.updateManaDisplay(vitalItem, vitalData);
            if (change > 0) this.showChangeNotification(vitalItem, change);
          });
          break;

        case 'drain':
          this.showQuickActionModal('Gastar Mana', 'Quanto de mana foi gasta?', (amount) => {
            const change = this.changeMana(vitalData.id, -amount);
            this.updateManaDisplay(vitalItem, vitalData);
            if (change < 0) this.showChangeNotification(vitalItem, change);
          });
          break;

        case 'full-restore':
          const restoreChange = vitalData.max - vitalData.current;
          this.setMana(vitalData.id, vitalData.max);
          this.updateManaDisplay(vitalItem, vitalData);
          if (restoreChange > 0) this.showChangeNotification(vitalItem, restoreChange);
          break;

        case 'reset':
          const resetChange = vitalData.max - vitalData.current;
          this.setMana(vitalData.id, vitalData.max);
          this.updateManaDisplay(vitalItem, vitalData);
          if (resetChange !== 0) this.showChangeNotification(vitalItem, resetChange);
          break;
      }
    }

    // Alterar vida
    changeHealth(vitalId, amount) {
      const vitalData = this.vitals.get(vitalId);
      if (!vitalData) return 0;

      const oldValue = vitalData.current;
      vitalData.current = Math.max(vitalData.min, Math.min(vitalData.max, vitalData.current + amount));

      return vitalData.current - oldValue;
    }

    // Definir vida
    setHealth(vitalId, value) {
      const vitalData = this.vitals.get(vitalId);
      if (!vitalData) return;

      vitalData.current = Math.max(vitalData.min, Math.min(vitalData.max, value));
    }

    // Alterar mana
    changeMana(vitalId, amount) {
      const vitalData = this.vitals.get(vitalId);
      if (!vitalData) return 0;

      const oldValue = vitalData.current;
      vitalData.current = Math.max(vitalData.min, Math.min(vitalData.max, vitalData.current + amount));

      return vitalData.current - oldValue;
    }

    // Definir mana
    setMana(vitalId, value) {
      const vitalData = this.vitals.get(vitalId);
      if (!vitalData) return;

      vitalData.current = Math.max(vitalData.min, Math.min(vitalData.max, value));
    }

    // Atualizar display da vida
    updateHealthDisplay(vitalItem, vitalData) {
      const { current, max } = vitalData;

      // Atualizar valores
      const currentValueEl = vitalItem.querySelector('.vital-current-value');
      const statusEl = vitalItem.querySelector('.vital-status');
      const progressBar = vitalItem.querySelector('.vital-progress-bar');

      if (currentValueEl) currentValueEl.textContent = current;

      const status = this.getHealthStatus(current, max);
      if (statusEl) statusEl.textContent = status;

      // Atualizar classes de estado
      vitalItem.classList.remove('healthy', 'injured', 'critical', 'unconscious');
      if (current >= max * 0.75) {
        vitalItem.classList.add('healthy');
      } else if (current >= max * 0.25) {
        vitalItem.classList.add('injured');
      } else if (current > 0) {
        vitalItem.classList.add('critical');
      } else {
        vitalItem.classList.add('unconscious');
      }

      // Atualizar barra de progresso
      if (progressBar) {
        progressBar.style.width = this.getProgressWidth(current, max, vitalData.min) + '%';
      }

      // Atualizar botões
      this.updateVitalButtons(vitalItem, vitalData);
    }

    // Atualizar display da mana
    updateManaDisplay(vitalItem, vitalData) {
      const { current, max } = vitalData;

      // Atualizar valores
      const currentValueEl = vitalItem.querySelector('.vital-current-value');
      const statusEl = vitalItem.querySelector('.vital-status');
      const progressBar = vitalItem.querySelector('.vital-progress-bar');

      if (currentValueEl) currentValueEl.textContent = current;

      const status = this.getManaStatus(current, max);
      if (statusEl) statusEl.textContent = status;

      // Atualizar classes de estado
      vitalItem.classList.remove('full', 'medium', 'low', 'empty');
      if (current >= max * 0.75) {
        vitalItem.classList.add('full');
      } else if (current >= max * 0.25) {
        vitalItem.classList.add('medium');
      } else if (current > 0) {
        vitalItem.classList.add('low');
      } else {
        vitalItem.classList.add('empty');
      }

      // Atualizar barra de progresso
      if (progressBar) {
        progressBar.style.width = this.getProgressWidth(current, max, 0) + '%';
      }

      // Atualizar botões
      this.updateVitalButtons(vitalItem, vitalData);
    }

    // Atualizar estado dos botões
    updateVitalButtons(vitalItem, vitalData) {
      const decreaseBtn = vitalItem.querySelector('.vital-btn.decrease');
      const increaseBtn = vitalItem.querySelector('.vital-btn.increase');

      if (decreaseBtn) {
        decreaseBtn.disabled = vitalData.current <= vitalData.min;
      }
      if (increaseBtn) {
        increaseBtn.disabled = vitalData.current >= vitalData.max;
      }
    }

    // Obter status da vida
    getHealthStatus(current, max) {
      if (current <= 0) return 'Inconsciente';

      const percentage = (current / max) * 100;
      if (percentage >= 75) return 'Saudável';
      if (percentage >= 50) return 'Ferido Leve';
      if (percentage >= 25) return 'Ferido';
      return 'Crítico';
    }

    // Obter status da mana
    getManaStatus(current, max) {
      if (current === 0) return 'Esgotado';
      if (max === 0) return 'Sem Mana';

      const percentage = (current / max) * 100;
      if (percentage >= 75) return 'Pleno';
      if (percentage >= 50) return 'Moderado';
      if (percentage >= 25) return 'Baixo';
      return 'Crítico';
    }

    // Calcular largura da barra de progresso
    getProgressWidth(current, max, min) {
      if (max === 0) return 0;

      if (current < 0) {
        // Para valores negativos, mostrar proporção do negativo
        const totalRange = max - min;
        const currentFromMin = current - min;
        return Math.max(0, Math.min(100, (currentFromMin / totalRange) * 100));
      } else {
        // Para valores positivos, proporção normal
        return Math.min(100, (current / max) * 100);
      }
    }

    // Mostrar notificação de mudança
    showChangeNotification(vitalItem, change) {
      if (change === 0) return;

      const notification = vitalItem.querySelector('.vital-change-notification');
      if (!notification) return;

      const prefix = change > 0 ? '+' : '';
      notification.textContent = `${prefix}${change}`;
      notification.className = `vital-change-notification show ${change > 0 ? 'positive' : 'negative'}`;

      // Remover após animação
      setTimeout(() => {
        notification.classList.remove('show');
      }, 2000);
    }

    // Criar modal para quick actions
    createQuickActionModal() {
      if (document.getElementById('quickActionModal')) return;

      const modal = document.createElement('div');
      modal.id = 'quickActionModal';
      modal.className = 'quick-action-modal';
      modal.innerHTML = `
      <div class="quick-action-content">
        <h4 id="quickActionTitle">Ação Rápida</h4>
        <p id="quickActionDescription">Digite o valor:</p>
        <input type="number" id="quickActionInput" class="quick-action-input" 
               placeholder="Digite o valor..." min="1" value="1">
        <div class="quick-action-buttons">
          <button type="button" class="btn btn-secondary" id="quickActionCancel">Cancelar</button>
          <button type="button" class="btn" id="quickActionConfirm">Aplicar</button>
        </div>
      </div>
    `;
      document.body.appendChild(modal);

      // Event listeners globais do modal
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          modal.classList.remove('active');
        }
      });

      document.getElementById('quickActionCancel').addEventListener('click', () => {
        modal.classList.remove('active');
      });

      // ESC para fechar
      document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
          modal.classList.remove('active');
        }
      });
    }

    // Mostrar modal de quick action
    showQuickActionModal(title, description, callback) {
      const modal = document.getElementById('quickActionModal');
      if (!modal) return;

      // Configurar conteúdo
      document.getElementById('quickActionTitle').textContent = title;
      document.getElementById('quickActionDescription').textContent = description;

      const input = document.getElementById('quickActionInput');
      input.value = 1;
      input.focus();
      input.select();

      // Remover listeners antigos do botão confirmar
      const confirmBtn = document.getElementById('quickActionConfirm');
      const newConfirmBtn = confirmBtn.cloneNode(true);
      confirmBtn.parentNode.replaceChild(newConfirmBtn, confirmBtn);

      // Função para processar
      const processAction = () => {
        const value = parseInt(input.value) || 0;
        if (value > 0) {
          callback(value);
          modal.classList.remove('active');
        }
      };

      // Novo listener do botão confirmar
      newConfirmBtn.addEventListener('click', processAction);

      // Enter para confirmar
      const inputKeyHandler = (e) => {
        if (e.key === 'Enter') {
          processAction();
          input.removeEventListener('keypress', inputKeyHandler);
        }
      };
      input.addEventListener('keypress', inputKeyHandler);

      // Mostrar modal
      modal.classList.add('active');
    }

    // Método público para obter estado de um vital
    getVitalState(vitalId) {
      return this.vitals.get(vitalId);
    }

    // Método público para obter todos os vitais
    getAllVitals() {
      return Array.from(this.vitals.values());
    }

    // Método público para resetar todos os vitais
    resetAllVitals() {
      this.vitals.forEach((vitalData, vitalId) => {
        if (vitalData.type === 'health') {
          this.setHealth(vitalId, vitalData.max);
        } else if (vitalData.type === 'mana') {
          this.setMana(vitalId, vitalData.max);
        }

        const vitalItem = document.querySelector(`[data-vital-id="${vitalId}"]`);
        if (vitalItem) {
          if (vitalData.type === 'health') {
            this.updateHealthDisplay(vitalItem, vitalData);
          } else {
            this.updateManaDisplay(vitalItem, vitalData);
          }
        }
      });

      console.log('🔄 Todos os vitais foram resetados');
    }
  }

  // Inicializar automaticamente
  const interactiveVitals = new InteractiveVitals();

  // Disponibilizar globalmente para debug
  window.InteractiveVitals = InteractiveVitals;
  window.interactiveVitals = interactiveVitals;

  // Adicionar ao sistema principal de character-view
  document.addEventListener('DOMContentLoaded', function () {
    // ... código existente ...

    // Inicializar sistema de magias
    initSpellsViewSystem();
    initSpellDescriptionToggles();
    initSpellSearch();
    initSpellTooltips();

    console.log('✅ Sistema completo de visualização de magias carregado');
  });

  // Inicializar todas as funcionalidades
  initQuickFilters();
  initToggleButtons();
  initEntryAnimations();
  initHoverEffects();
  initPrintPowers();

  console.log('✅ Sistema de visualização de poderes inicializado');
  console.log('⚔️ Seção de poderes de classe carregada:', classPowerCards.length, 'poderes');

  console.log('✅ Script de visualização de personagem carregado');
});