// Script para página de meus personagens
document.addEventListener('DOMContentLoaded', function() {
  let deleteCharacterId = null;
  
  // Elementos do DOM
  const viewButtons = document.querySelectorAll('.view-btn');
  const charactersContainer = document.getElementById('charactersContainer');
  const deleteButtons = document.querySelectorAll('.delete-btn');
  const deleteModal = document.getElementById('deleteModal');
  const characterToDeleteEl = document.getElementById('characterToDelete');
  const confirmDeleteBtn = document.getElementById('confirmDelete');
  const cancelDeleteBtn = document.getElementById('cancelDelete');
  
  // View toggle functionality
  viewButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      viewButtons.forEach(b => b.classList.remove('active'));
      this.classList.add('active');
      
      const view = this.dataset.view;
      if (view === 'list') {
        charactersContainer.classList.add('list-view');
      } else {
        charactersContainer.classList.remove('list-view');
      }
    });
  });
  
  // Delete functionality
  deleteButtons.forEach(btn => {
    btn.addEventListener('click', function() {
      deleteCharacterId = this.dataset.id;
      const characterName = this.dataset.name;
      characterToDeleteEl.textContent = characterName;
      deleteModal.style.display = 'block';
    });
  });
  
  // Cancel delete
  if (cancelDeleteBtn) {
    cancelDeleteBtn.addEventListener('click', function() {
      deleteModal.style.display = 'none';
      deleteCharacterId = null;
    });
  }
  
  // Confirm delete
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', async function() {
      if (!deleteCharacterId) return;
      
      try {
        const response = await fetch(`/personagens/${deleteCharacterId}`, {
          method: 'DELETE',
          headers: {
            'Content-Type': 'application/json'
          }
        });
        
        if (response.ok) {
          // Remove o card da interface
          const characterCard = document.querySelector(`[data-id="${deleteCharacterId}"]`);
          if (characterCard) {
            characterCard.style.animation = 'fadeOut 0.3s ease-out';
            setTimeout(() => {
              characterCard.remove();
              
              // Verifica se não há mais personagens
              const remainingCards = document.querySelectorAll('.character-card');
              if (remainingCards.length === 0) {
                location.reload(); // Recarrega para mostrar o estado vazio
              } else {
                updateStats(); // Atualiza as estatísticas
              }
            }, 300);
          }
          
          deleteModal.style.display = 'none';
          deleteCharacterId = null;
          
          // Feedback visual
          showNotification('Personagem excluído com sucesso!', 'success');
        } else {
          throw new Error('Erro ao excluir personagem');
        }
      } catch (error) {
        console.error('Erro:', error);
        showNotification('Erro ao excluir personagem. Tente novamente.', 'error');
      }
    });
  }
  
  // Fechar modal clicando fora
  window.addEventListener('click', function(e) {
    if (e.target === deleteModal) {
      deleteModal.style.display = 'none';
      deleteCharacterId = null;
    }
  });
  
  // Função para atualizar estatísticas após exclusão
  function updateStats() {
    const remainingCards = document.querySelectorAll('.character-card');
    const statsCards = document.querySelectorAll('.stat-card .stat-number');
    
    if (statsCards.length >= 4) {
      // Atualizar número total de personagens
      statsCards[0].textContent = remainingCards.length;
      
      // Recalcular níveis totais
      let totalLevels = 0;
      let maxLevel = 1;
      const uniqueClasses = new Set();
      
      remainingCards.forEach(card => {
        // Extrair nível do badge
        const levelBadge = card.querySelector('.level-badge');
        if (levelBadge) {
          const level = parseInt(levelBadge.textContent.replace('Nv. ', '')) || 1;
          totalLevels += level;
          maxLevel = Math.max(maxLevel, level);
        }
        
        // Extrair classe
        const classInfo = card.querySelector('.character-details');
        if (classInfo) {
          const className = classInfo.textContent.split(' ')[0];
          uniqueClasses.add(className);
        }
      });
      
      statsCards[1].textContent = totalLevels;
      statsCards[2].textContent = maxLevel;
      statsCards[3].textContent = uniqueClasses.size;
    }
  }
  
  // Função para mostrar notificações
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
      background: ${type === 'success' ? '#4caf50' : '#f44336'};
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
  
  // Adicionar estilos de animação necessários
  const style = document.createElement('style');
  style.textContent = `
    @keyframes fadeOut {
      from { opacity: 1; transform: scale(1); }
      to { opacity: 0; transform: scale(0.8); }
    }
    
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
  
  console.log('✅ Script de meus personagens carregado');
});