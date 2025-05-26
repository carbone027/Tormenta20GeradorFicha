// Script específico para a página de runas
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Runes page...');
  
  initializeCollapsibleRunes();
  animateRuneEntrance();
  initializeRuneInteractions();
  
  console.log('Runes page initialized successfully!');

  function initializeCollapsibleRunes() {
    console.log('Inicializando runas colapsáveis');
    const runeHeaders = document.querySelectorAll('.rune-header');

    runeHeaders.forEach(header => {
      header.addEventListener('click', function () {
        console.log('Runa clicada:', header);
        const runeTree = header.parentElement;
        const isExpanded = runeTree.classList.contains('expanded');

        // Colapsar todas as outras runas primeiro
        document.querySelectorAll('.rune-tree').forEach(tree => {
          if (tree !== runeTree) {
            tree.classList.remove('expanded');
          }
        });

        // Toggle da runa clicada
        if (isExpanded) {
          runeTree.classList.remove('expanded');
        } else {
          runeTree.classList.add('expanded');
        }
      });
    });
  }

  function animateRuneEntrance() {
    const runeHeaders = document.querySelectorAll('.rune-header');

    runeHeaders.forEach((header, index) => {
      header.style.opacity = '0';
      header.style.transform = 'translateY(20px)';
      header.style.animation = `slideInUp 0.6s ease forwards`;
      header.style.animationDelay = `${index * 0.1}s`;
    });
  }

  function initializeRuneInteractions() {
    // Enhanced rune interactions
    const runeItems = document.querySelectorAll('.rune-item');
    runeItems.forEach(item => {
      item.addEventListener('click', function () {
        const runeName = item.querySelector('strong').textContent;
        const runeDesc = item.querySelector('p').textContent;
        createRunePopup(runeName, runeDesc);
      });
    });
  }

  function createRunePopup(runeName, runeDesc) {
    // Criar overlay
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 27, 60, 0.8);
      z-index: 9999;
      display: flex;
      justify-content: center;
      align-items: center;
    `;

    // Criar popup
    const popup = document.createElement('div');
    popup.style.cssText = `
      background: #1e2d50;
      color: #CDBE91;
      padding: 2rem;
      border-radius: 15px;
      border: 2px solid #C8A964;
      max-width: 400px;
      width: 90%;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
      position: relative;
    `;

    popup.innerHTML = `
      <h3 style="color: #C8A964; margin-bottom: 1rem;">${runeName}</h3>
      <p style="margin-bottom: 1rem;">${runeDesc}</p>
      <div style="text-align: center;">
        <button class="close-popup-btn" style="
          background: #C8A964;
          color: #0F1B3C;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
        ">Fechar</button>
      </div>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Função para fechar
    function closePopup() {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }

    // Fechar com botão
    const closeBtn = popup.querySelector('.close-popup-btn');
    closeBtn.addEventListener('click', closePopup);

    // Fechar clicando fora
    overlay.addEventListener('click', function (e) {
      if (e.target === overlay) {
        closePopup();
      }
    });

    // Fechar com ESC
    function handleKeydown(e) {
      if (e.key === 'Escape') {
        closePopup();
        document.removeEventListener('keydown', handleKeydown);
      }
    }
    document.addEventListener('keydown', handleKeydown);

    // Auto-remove after 5 seconds
    setTimeout(() => {
      if (overlay.parentNode) {
        overlay.parentNode.removeChild(overlay);
      }
    }, 5000);
  }
});