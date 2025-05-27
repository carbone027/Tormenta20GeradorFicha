// Script para visualização de personagem
document.addEventListener('DOMContentLoaded', function() {
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
  window.confirmDelete = function() {
    if (deleteModal) {
      deleteModal.style.display = 'block';
    }
  };
  
  window.closeDeleteModal = function() {
    if (deleteModal) {
      deleteModal.style.display = 'none';
    }
  };
  
  // Função para excluir personagem
  window.deleteCharacter = async function() {
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
  window.exportCharacter = function() {
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
    const dataBlob = new Blob([dataStr], {type: 'application/json'});
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `${nome.replace(/[^a-z0-9]/gi, "_")}_tormenta20.json`;
    link.click();
  };
  
  // Função para compartilhar personagem
  window.shareCharacter = function() {
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
  window.addEventListener('click', function(e) {
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
  
  console.log('✅ Script de visualização de personagem carregado');
});