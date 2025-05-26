// Script específico para a página de tipos de dano
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Damage page...');
  
  initializeDamageCards();
  
  console.log('Damage page initialized successfully!');

  function initializeDamageCards() {
    // Damage calculator
    const damageCards = document.querySelectorAll('.damage-card');
    damageCards.forEach(card => {
      card.addEventListener('click', function () {
        const damageType = card.classList[1];
        const existingDemo = card.querySelector('.damage-demo');

        if (!existingDemo) {
          const demo = document.createElement('div');
          demo.className = 'damage-demo';
          demo.style.cssText = `
            margin-top: 1rem;
            padding: 1rem;
            background: rgba(200, 169, 100, 0.1);
            border-radius: 5px;
            font-size: 0.9rem;
          `;

          switch (damageType) {
            case 'physical':
              demo.textContent = '💪 Exemplo: 100 AD - 50 Armadura = ~67 dano';
              break;
            case 'magical':
              demo.textContent = '✨ Exemplo: 100 AP - 40 RM = ~71 dano';
              break;
            case 'true':
              demo.textContent = '⚡ Exemplo: 100 dano verdadeiro = 100 dano';
              break;
          }

          card.appendChild(demo);

          setTimeout(() => {
            if (demo.parentNode) {
              demo.parentNode.removeChild(demo);
            }
          }, 3000);
        }
      });
    });
  }
});