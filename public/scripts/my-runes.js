document.addEventListener('DOMContentLoaded', function() {
  // Corrigir caminhos das imagens das árvores de runas
  const treeImages = document.querySelectorAll('.tree-icon');
  treeImages.forEach(img => {
    // Verificar se o src está correto
    const currentSrc = img.src;
    if (!currentSrc.includes('/assets/runes/')) {
      const alt = img.alt;
      const treeMap = {
        'precisao': 'precision',
        'dominacao': 'domination', 
        'feiticaria': 'sorcery',
        'determinacao': 'resolve',
        'inspiracao': 'inspiration'
      };
      
      const treeName = treeMap[alt] || alt;
      img.src = `/assets/runes/${treeName}.png`;
      
      // Fallback se a imagem não carregar
      img.onerror = function() {
        this.src = '/assets/runes/placeholder.png';
      };
    }
  });

  // Corrigir caminhos das imagens das runas
  const runeImages = document.querySelectorAll('.rune-icon');
  runeImages.forEach(img => {
    img.onerror = function() {
      this.src = '/assets/runes/placeholder.png';
    };
  });

  // Corrigir caminhos das imagens dos fragmentos
  const shardImages = document.querySelectorAll('.shard-icon');
  shardImages.forEach(img => {
    img.onerror = function() {
      this.src = '/assets/shards/placeholder.png';
    };
  });

  // Gerenciar exclusão de páginas de runas
  const deleteButtons = document.querySelectorAll('.delete-rune-btn');
  
  deleteButtons.forEach(button => {
    button.addEventListener('click', async function(e) {
      e.preventDefault();
      e.stopPropagation(); // Prevenir bubbling
      
      const runePageId = this.getAttribute('data-id');
      const runePageCard = this.closest('.rune-page-card');
      const runePageName = runePageCard.querySelector('h3').textContent;
      
      // Confirmação com estilo melhorado
      const confirmDelete = confirm(`🗑️ Excluir Página de Runas\n\n` +
        `Tem certeza que deseja excluir "${runePageName}"?\n\n` +
        `⚠️ Esta ação não pode ser desfeita!`);
      
      if (!confirmDelete) {
        return;
      }
      
      try {
        // Adicionar estado de loading
        this.disabled = true;
        this.innerHTML = '⏳';
        this.style.opacity = '0.6';
        
        // Adicionar efeito de saída no card
        runePageCard.style.transition = 'all 0.5s ease';
        runePageCard.style.transform = 'scale(0.95)';
        runePageCard.style.opacity = '0.7';
        
        const response = await fetch(`/runes/${runePageId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          // Animação de saída melhorada
          runePageCard.style.transform = 'scale(0.8) translateY(-20px)';
          runePageCard.style.opacity = '0';
          
          setTimeout(() => {
            runePageCard.remove();
            
            // Verificar se não há mais páginas
            const remainingPages = document.querySelectorAll('.rune-page-card');
            if (remainingPages.length === 0) {
              showEmptyState();
            }
          }, 500);
          
          // Mostrar mensagem de sucesso
          showMessage('✅ Página de runas excluída com sucesso!', 'success');
          
        } else {
          const error = await response.json();
          throw new Error(error.error || 'Erro ao excluir página de runas');
        }
        
      } catch (error) {
        console.error('Erro ao excluir página de runas:', error);
        
        // Restaurar botão e card
        this.disabled = false;
        this.innerHTML = '🗑️';
        this.style.opacity = '1';
        runePageCard.style.transform = 'scale(1)';
        runePageCard.style.opacity = '1';
        
        // Mostrar mensagem de erro
        showMessage(`❌ Erro ao excluir página de runas: ${error.message}`, 'error');
      }
    });
  });
  
  // Função para mostrar estado vazio
  function showEmptyState() {
    const grid = document.querySelector('.rune-pages-grid');
    if (grid) {
      grid.innerHTML = `
        <div class="empty-rune-pages">
          <div class="card">
            <h3>📝 Nenhuma página de runas encontrada</h3>
            <p>Você ainda não criou nenhuma página de runas. Comece criando uma nova página personalizada!</p>
            <a href="/runes/builder" class="nav-btn">✨ Criar Primeira Página</a>
          </div>
        </div>
      `;
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
    message.innerHTML = text;
    
    // Estilos da mensagem
    message.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      padding: 1rem 1.5rem;
      border-radius: 12px;
      color: white;
      font-weight: bold;
      z-index: 10000;
      max-width: 400px;
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.3);
      animation: slideInRight 0.4s ease-out;
      backdrop-filter: blur(10px);
    `;
    
    // Cores baseadas no tipo
    switch (type) {
      case 'success':
        message.style.background = 'linear-gradient(145deg, #28a745, #20c997)';
        break;
      case 'error':
        message.style.background = 'linear-gradient(145deg, #dc3545, #e74c3c)';
        break;
      default:
        message.style.background = 'linear-gradient(145deg, #007bff, #0056b3)';
    }
    
    document.body.appendChild(message);
    
    // Remover após 4 segundos
    setTimeout(() => {
      if (message.parentNode) {
        message.style.animation = 'slideOutRight 0.4s ease-in';
        setTimeout(() => {
          if (message.parentNode) {
            message.remove();
          }
        }, 400);
      }
    }, 4000);
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
    
    .rune-page-card {
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
    }
    
    .rune-page-card:hover {
      transform: translateY(-5px);
    }
    
    .delete-rune-btn:disabled {
      cursor: not-allowed;
      opacity: 0.6;
    }
    
    /* Efeitos de hover melhorados para os elementos das runas */
    .tree-icon,
    .rune-icon,
    .shard-icon {
      transition: all 0.3s ease;
    }
    
    .keystone-rune:hover,
    .minor-rune:hover,
    .shard-item:hover {
      cursor: pointer;
    }
    
    /* Animação de pulse para a keystone */
    .keystone-rune {
      position: relative;
    }
    
    .keystone-rune::after {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      width: 80px;
      height: 80px;
      background: radial-gradient(circle, rgba(200, 169, 100, 0.3), transparent);
      border-radius: 50%;
      transform: translate(-50%, -50%) scale(0);
      transition: transform 0.3s ease;
      z-index: -1;
    }
    
    .keystone-rune:hover::after {
      transform: translate(-50%, -50%) scale(1);
    }
    
    /* Efeito de brilho nas bordas dos cards */
    .rune-page-card::before {
      content: '';
      position: absolute;
      top: -2px;
      left: -2px;
      right: -2px;
      bottom: -2px;
      background: linear-gradient(45deg, transparent, #C8A964, transparent, #C8A964, transparent);
      background-size: 400%;
      border-radius: 15px;
      z-index: -1;
      opacity: 0;
      animation: border-flow 3s linear infinite;
      transition: opacity 0.3s ease;
    }
    
    .rune-page-card:hover::before {
      opacity: 0.8;
    }
    
    @keyframes border-flow {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
  `;
  
  document.head.appendChild(style);
  
  // Melhorar visualização das runas com tooltips
  enhanceRuneDisplay();
  
  function enhanceRuneDisplay() {
    const runePageCards = document.querySelectorAll('.rune-page-card');
    
    runePageCards.forEach(card => {
      // Adicionar tooltips para runas
      const runeElements = card.querySelectorAll('.minor-rune, .keystone-rune, .shard-item');
      
      runeElements.forEach(element => {
        element.addEventListener('mouseenter', function(e) {
          const runeName = this.querySelector('.rune-name, .keystone-name, span')?.textContent;
          if (runeName) {
            showTooltip(e, runeName);
          }
        });
        
        element.addEventListener('mouseleave', hideTooltip);
      });
      
      // Efeito de entrada escalonado
      const animatedElements = card.querySelectorAll('.tree-icon, .keystone-icon, .rune-icon, .shard-icon');
      animatedElements.forEach((element, index) => {
        element.style.animationDelay = `${index * 0.1}s`;
        element.style.animation = 'fadeInScale 0.6s ease forwards';
      });
    });
  }
  
  // Função para mostrar tooltip
  function showTooltip(e, content) {
    hideTooltip(); // Remove tooltip anterior
    
    const tooltip = document.createElement('div');
    tooltip.className = 'rune-tooltip';
    tooltip.textContent = content;
    tooltip.style.cssText = `
      position: absolute;
      background: linear-gradient(145deg, #1e2d50, #2a3f68);
      color: #CDBE91;
      padding: 0.8rem 1rem;
      border-radius: 8px;
      border: 1px solid #C8A964;
      font-size: 0.9rem;
      max-width: 200px;
      z-index: 1000;
      pointer-events: none;
      box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
      backdrop-filter: blur(5px);
      animation: tooltipFadeIn 0.2s ease;
    `;

    document.body.appendChild(tooltip);

    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.bottom + window.scrollY + 8}px`;
    
    // Ajustar posição se sair da tela
    const tooltipRect = tooltip.getBoundingClientRect();
    if (tooltipRect.right > window.innerWidth) {
      tooltip.style.left = `${window.innerWidth - tooltipRect.width - 10}px`;
    }
  }

  // Função para esconder tooltip
  function hideTooltip() {
    const tooltip = document.querySelector('.rune-tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  }

  // Adicionar mais animações CSS
  const additionalStyle = document.createElement('style');
  additionalStyle.textContent = `
    @keyframes tooltipFadeIn {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeInScale {
      from {
        opacity: 0;
        transform: scale(0.8);
      }
      to {
        opacity: 1;
        transform: scale(1);
      }
    }
  `;
  
  document.head.appendChild(additionalStyle);
  
  // Função para atualizar timestamps com formato mais amigável
  function updateTimestamps() {
    const timestamps = document.querySelectorAll('.created-at');
    
    timestamps.forEach(timestamp => {
      const dateText = timestamp.textContent.replace('📅 ', '');
      const date = new Date(dateText.split('/').reverse().join('-')); // Converter DD/MM/AAAA para AAAA-MM-DD
      
      if (!isNaN(date.getTime())) {
        const now = new Date();
        const diffTime = Math.abs(now - date);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        
        let relativeTime = '';
        if (diffDays === 1) {
          relativeTime = ' • Ontem';
        } else if (diffDays < 7) {
          relativeTime = ` • ${diffDays} dias atrás`;
        } else if (diffDays < 30) {
          const weeks = Math.floor(diffDays / 7);
          relativeTime = ` • ${weeks} semana${weeks > 1 ? 's' : ''} atrás`;
        } else if (diffDays < 365) {
          const months = Math.floor(diffDays / 30);
          relativeTime = ` • ${months} ${months === 1 ? 'mês' : 'meses'} atrás`;
        }
        
        timestamp.innerHTML = `📅 ${date.toLocaleDateString('pt-BR')}${relativeTime}`;
      }
    });
  }
  
  // Executar atualização de timestamps
  updateTimestamps();
  
  // Adicionar funcionalidade de busca se houver muitas páginas
  const runePages = document.querySelectorAll('.rune-page-card');
  if (runePages.length > 4) {
    addSearchFunctionality();
  }
  
  function addSearchFunctionality() {
    const actionsDiv = document.querySelector('.my-runes-actions');
    if (actionsDiv) {
      const searchContainer = document.createElement('div');
      searchContainer.style.marginTop = '1rem';
      searchContainer.innerHTML = `
        <input 
          type="text" 
          id="rune-search" 
          placeholder="🔍 Buscar páginas de runas..." 
          style="
            width: 100%;
            max-width: 400px;
            padding: 1rem 1.2rem;
            border-radius: 25px;
            border: 2px solid #463714;
            background: linear-gradient(145deg, rgba(30, 45, 80, 0.8), rgba(70, 55, 20, 0.2));
            color: #CDBE91;
            margin-bottom: 1rem;
            font-size: 1rem;
            transition: all 0.3s ease;
            backdrop-filter: blur(5px);
          "
        >
      `;
      
      actionsDiv.appendChild(searchContainer);
      
      const searchInput = document.getElementById('rune-search');
      
      // Adicionar efeitos de foco
      searchInput.addEventListener('focus', function() {
        this.style.borderColor = '#C8A964';
        this.style.boxShadow = '0 0 20px rgba(200, 169, 100, 0.4)';
        this.style.transform = 'translateY(-2px)';
      });
      
      searchInput.addEventListener('blur', function() {
        this.style.borderColor = '#463714';
        this.style.boxShadow = 'none';
        this.style.transform = 'translateY(0)';
      });
      
      searchInput.addEventListener('input', function() {
        const searchTerm = this.value.toLowerCase();
        
        runePages.forEach(card => {
          const title = card.querySelector('h3').textContent.toLowerCase();
          const treeNames = card.querySelectorAll('.tree-name');
          const runeNames = card.querySelectorAll('.rune-name, .keystone-name');
          
          let shouldShow = title.includes(searchTerm);
          
          // Buscar também nos nomes das árvores e runas
          treeNames.forEach(tree => {
            if (tree.textContent.toLowerCase().includes(searchTerm)) {
              shouldShow = true;
            }
          });
          
          runeNames.forEach(rune => {
            if (rune.textContent.toLowerCase().includes(searchTerm)) {
              shouldShow = true;
            }
          });
          
          if (shouldShow) {
            card.style.display = 'block';
            card.style.opacity = '1';
            card.style.transform = 'scale(1)';
          } else {
            card.style.display = 'none';
            card.style.opacity = '0.5';
            card.style.transform = 'scale(0.95)';
          }
        });
      });
    }
  }
});