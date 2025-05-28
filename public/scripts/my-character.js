// Script corrigido para página de meus personagens
document.addEventListener('DOMContentLoaded', function() {
  let deleteCharacterId = null;
  
  console.log('🚀 Inicializando página Meus Personagens...');
  
  // Elementos do DOM
  const viewButtons = document.querySelectorAll('.view-btn');
  const charactersContainer = document.getElementById('charactersContainer');
  const deleteButtons = document.querySelectorAll('.delete-btn');
  const deleteModal = document.getElementById('deleteModal');
  const characterToDeleteEl = document.getElementById('characterToDelete');
  const confirmDeleteBtn = document.getElementById('confirmDelete');
  const cancelDeleteBtn = document.getElementById('cancelDelete');
  
  console.log(`🔍 Elementos encontrados:
    - Botões delete: ${deleteButtons.length}
    - Modal: ${deleteModal ? 'Encontrado' : 'NÃO ENCONTRADO'}
    - Botão confirmar: ${confirmDeleteBtn ? 'Encontrado' : 'NÃO ENCONTRADO'}
    - Botão cancelar: ${cancelDeleteBtn ? 'Encontrado' : 'NÃO ENCONTRADO'}
  `);
  
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
  
  // CORREÇÃO: Melhor seleção dos botões de delete
  function attachDeleteListeners() {
    // Usar seletor mais específico
    const deleteButtons = document.querySelectorAll('button.delete-btn, .delete-btn');
    
    console.log(`🗑️ Anexando listeners para ${deleteButtons.length} botões de delete`);
    
    deleteButtons.forEach((btn, index) => {
      const characterId = btn.dataset.id || btn.getAttribute('data-id');
      const characterName = btn.dataset.name || btn.getAttribute('data-name');
      
      console.log(`Botão ${index + 1}: ID=${characterId}, Nome=${characterName}`);
      
      // Remover listeners existentes para evitar duplicação
      btn.removeEventListener('click', handleDeleteClick);
      
      // Adicionar novo listener
      btn.addEventListener('click', handleDeleteClick);
      
      // Função para lidar com o clique
      function handleDeleteClick(e) {
        e.preventDefault();
        e.stopPropagation();
        
        console.log(`🗑️ Clique no delete - ID: ${characterId}, Nome: ${characterName}`);
        
        if (!characterId) {
          console.error('❌ ID do personagem não encontrado!');
          alert('Erro: ID do personagem não encontrado.');
          return;
        }
        
        if (!deleteModal) {
          console.error('❌ Modal de confirmação não encontrado!');
          alert('Erro: Modal de confirmação não encontrado.');
          return;
        }
        
        // Definir ID para exclusão
        deleteCharacterId = characterId;
        
        // Atualizar texto do modal
        if (characterToDeleteEl) {
          characterToDeleteEl.textContent = characterName || 'Personagem';
        }
        
        // Mostrar modal
        deleteModal.style.display = 'block';
        console.log('✅ Modal aberto para exclusão');
      }
    });
  }
  
  // Anexar listeners inicialmente
  attachDeleteListeners();
  
  // CORREÇÃO: Função para cancelar exclusão
  function cancelDelete() {
    console.log('❌ Exclusão cancelada');
    if (deleteModal) {
      deleteModal.style.display = 'none';
    }
    deleteCharacterId = null;
  }
  
  // CORREÇÃO: Função para confirmar exclusão
  async function confirmDelete() {
    console.log(`🗑️ Confirmando exclusão do personagem ID: ${deleteCharacterId}`);
    
    if (!deleteCharacterId) {
      console.error('❌ Nenhum personagem selecionado para exclusão');
      alert('Erro: Nenhum personagem selecionado.');
      return;
    }
    
    try {
      // Desabilitar botão durante requisição
      if (confirmDeleteBtn) {
        confirmDeleteBtn.disabled = true;
        confirmDeleteBtn.textContent = '🔄 Excluindo...';
      }
      
      console.log(`📡 Enviando requisição DELETE para /personagens/${deleteCharacterId}`);
      
      const response = await fetch(`/personagens/${deleteCharacterId}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        }
      });
      
      console.log(`📡 Resposta recebida: ${response.status} ${response.statusText}`);
      
      if (response.ok) {
        console.log('✅ Personagem excluído com sucesso');
        
        // Encontrar e remover o card da interface
        const characterCard = document.querySelector(`[data-id="${deleteCharacterId}"]`) || 
                              document.querySelector(`.character-card[data-id="${deleteCharacterId}"]`);
        
        if (characterCard) {
          console.log('🎨 Removendo card da interface');
          characterCard.style.animation = 'fadeOut 0.3s ease-out';
          
          setTimeout(() => {
            characterCard.remove();
            
            // Verificar se não há mais personagens
            const remainingCards = document.querySelectorAll('.character-card');
            console.log(`📊 Cards restantes: ${remainingCards.length}`);
            
            if (remainingCards.length === 0) {
              console.log('🔄 Sem personagens restantes, recarregando página');
              location.reload(); // Recarrega para mostrar o estado vazio
            } else {
              updateStats(); // Atualiza as estatísticas
            }
          }, 300);
        } else {
          console.warn('⚠️ Card do personagem não encontrado, recarregando página');
          location.reload();
        }
        
        // Fechar modal
        if (deleteModal) {
          deleteModal.style.display = 'none';
        }
        deleteCharacterId = null;
        
        // Feedback visual
        showNotification('Personagem excluído com sucesso!', 'success');
        
      } else {
        throw new Error(`Erro HTTP: ${response.status} ${response.statusText}`);
      }
    } catch (error) {
      console.error('❌ Erro ao excluir personagem:', error);
      showNotification('Erro ao excluir personagem. Tente novamente.', 'error');
    } finally {
      // Reabilitar botão
      if (confirmDeleteBtn) {
        confirmDeleteBtn.disabled = false;
        confirmDeleteBtn.textContent = '🗑️ Excluir Personagem';
      }
    }
  }
  
  // Event listeners para os botões do modal
  if (cancelDeleteBtn) {
    cancelDeleteBtn.addEventListener('click', cancelDelete);
    console.log('✅ Listener do botão cancelar anexado');
  } else {
    console.error('❌ Botão cancelar não encontrado');
  }
  
  if (confirmDeleteBtn) {
    confirmDeleteBtn.addEventListener('click', confirmDelete);
    console.log('✅ Listener do botão confirmar anexado');
  } else {
    console.error('❌ Botão confirmar não encontrado');
  }
  
  // Fechar modal clicando fora
  window.addEventListener('click', function(e) {
    if (e.target === deleteModal) {
      console.log('🖱️ Clique fora do modal, fechando');
      cancelDelete();
    }
  });
  
  // Fechar modal com ESC
  document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && deleteModal && deleteModal.style.display === 'block') {
      console.log('⌨️ ESC pressionado, fechando modal');
      cancelDelete();
    }
  });
  
  // Função para atualizar estatísticas após exclusão
  function updateStats() {
    console.log('📊 Atualizando estatísticas');
    
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
          const level = parseInt(levelBadge.textContent.replace(/[^\d]/g, '')) || 1;
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
      
      console.log(`📊 Stats atualizadas: ${remainingCards.length} personagens, ${totalLevels} níveis totais, ${maxLevel} nível máximo, ${uniqueClasses.size} classes`);
    }
  }
  
  // Função para mostrar notificações
  function showNotification(message, type = 'info') {
    console.log(`🔔 Notificação (${type}): ${message}`);
    
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
      box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    `;
    
    document.body.appendChild(notification);
    
    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 3000);
  }
  
  // CORREÇÃO: Re-anexar listeners se novos cards forem adicionados dinamicamente
  const observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if (mutation.type === 'childList') {
        const addedNodes = Array.from(mutation.addedNodes);
        const hasCharacterCards = addedNodes.some(node => 
          node.nodeType === 1 && 
          (node.classList?.contains('character-card') || node.querySelector?.('.character-card'))
        );
        
        if (hasCharacterCards) {
          console.log('🔄 Novos cards detectados, re-anexando listeners');
          setTimeout(attachDeleteListeners, 100);
        }
      }
    });
  });
  
  if (charactersContainer) {
    observer.observe(charactersContainer, { childList: true, subtree: true });
  }
  
  // Adicionar estilos de animação necessários se não existirem
  if (!document.querySelector('#myCharactersStyles')) {
    const style = document.createElement('style');
    style.id = 'myCharactersStyles';
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
      
      .notification {
        user-select: none;
        pointer-events: none;
      }
    `;
    document.head.appendChild(style);
  }
  
  console.log('✅ Script de meus personagens carregado e configurado');
});