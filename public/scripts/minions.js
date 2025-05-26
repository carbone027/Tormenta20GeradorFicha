// Script específico para a página de minions
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Minions page...');
  
  initializeMinionsGold();
  
  console.log('Minions page initialized successfully!');

  function initializeMinionsGold() {
    // Gold counter animation
    const minionCards = document.querySelectorAll('#minions .card, .card');
    minionCards.forEach(card => {
      const goldElements = card.querySelectorAll('li');

      goldElements.forEach(element => {
        element.addEventListener('click', function () {
          const goldMatch = element.textContent.match(/(\d+)/);
          if (goldMatch) {
            const goldValue = goldMatch[1];

            const floatingGold = document.createElement('span');
            floatingGold.textContent = `+${goldValue}g`;
            floatingGold.style.cssText = `
              position: absolute;
              color: #ffed4a;
              font-weight: bold;
              font-size: 1.2rem;
              pointer-events: none;
              animation: floatUp 2s ease forwards;
              z-index: 1000;
            `;

            // Add CSS for the animation if not exists
            if (!document.querySelector('#floating-gold-style')) {
              const style = document.createElement('style');
              style.id = 'floating-gold-style';
              style.textContent = `
                @keyframes floatUp {
                  0% {
                    opacity: 1;
                    transform: translateY(0px);
                  }
                  100% {
                    opacity: 0;
                    transform: translateY(-30px);
                  }
                }
              `;
              document.head.appendChild(style);
            }

            card.style.position = 'relative';
            card.appendChild(floatingGold);

            // Adicionar efeito de som de moeda (opcional)
            playCoinSound();

            setTimeout(() => {
              if (floatingGold.parentNode) {
                floatingGold.parentNode.removeChild(floatingGold);
              }
            }, 2000);
          }
        });

        // Adicionar efeito de hover
        element.addEventListener('mouseenter', function() {
          element.style.cursor = 'pointer';
          element.style.backgroundColor = 'rgba(200, 169, 100, 0.2)';
          element.style.borderRadius = '4px';
          element.style.transition = 'all 0.3s ease';
        });

        element.addEventListener('mouseleave', function() {
          element.style.backgroundColor = 'transparent';
        });
      });
    });

    // Adicionar dicas interativas sobre last hit
    addLastHitTips();
  }

  function playCoinSound() {
    // Criar um som simples de moeda usando Web Audio API
    try {
      const audioContext = new (window.AudioContext || window.webkitAudioContext)();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();
      
      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);
      
      oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
      oscillator.frequency.exponentialRampToValueAtTime(400, audioContext.currentTime + 0.1);
      
      gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);
      
      oscillator.start(audioContext.currentTime);
      oscillator.stop(audioContext.currentTime + 0.3);
    } catch (e) {
      // Fallback silencioso se o áudio não estiver disponível
      console.log('Audio not available');
    }
  }

  function addLastHitTips() {
    // Procurar pelo card de Last Hit
    const cards = document.querySelectorAll('.card');
    cards.forEach(card => {
      const heading = card.querySelector('h3');
      if (heading && heading.textContent.includes('Last Hit')) {
        // Adicionar botão de dica interativa
        const tipButton = document.createElement('button');
        tipButton.textContent = '💡 Dica de Last Hit';
        tipButton.style.cssText = `
          background: #C8A964;
          color: #0F1B3C;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 5px;
          cursor: pointer;
          font-weight: bold;
          margin-top: 1rem;
          width: 100%;
          transition: all 0.3s ease;
        `;

        tipButton.addEventListener('click', function() {
          showLastHitTip();
        });

        tipButton.addEventListener('mouseenter', function() {
          this.style.background = '#E6C579';
          this.style.transform = 'translateY(-2px)';
        });

        tipButton.addEventListener('mouseleave', function() {
          this.style.background = '#C8A964';
          this.style.transform = 'translateY(0)';
        });

        card.appendChild(tipButton);
      }
    });
  }

  function showLastHitTip() {
    const tips = [
      "🎯 Pratique no Training Mode por 10 minutos todos os dias!",
      "⏰ Minions melee morrem em 2 hits da torre, casters em 1 hit",
      "🏹 Use ataques básicos para last hit, habilidades para push",
      "👀 Observe a barra de vida dos minions, não apenas os números",
      "🔄 Pratique com diferentes campeões - cada um tem timing diferente",
      "💪 Meta: 80+ CS em 10 minutos é considerado bom para iniciantes"
    ];

    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    // Criar popup com a dica
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

    const popup = document.createElement('div');
    popup.style.cssText = `
      background: #1e2d50;
      color: #CDBE91;
      padding: 2rem;
      border-radius: 15px;
      border: 2px solid #C8A964;
      max-width: 400px;
      width: 90%;
      text-align: center;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    `;

    popup.innerHTML = `
      <h3 style="color: #C8A964; margin-bottom: 1rem;">💰 Dica de Last Hit</h3>
      <p style="font-size: 1.1rem; margin-bottom: 1.5rem;">${randomTip}</p>
      <button class="close-tip" style="
        background: #C8A964;
        color: #0F1B3C;
        border: none;
        padding: 0.5rem 1rem;
        border-radius: 5px;
        cursor: pointer;
        font-weight: bold;
      ">Entendi!</button>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    function closeTip() {
      document.body.removeChild(overlay);
    }

    popup.querySelector('.close-tip').addEventListener('click', closeTip);
    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        closeTip();
      }
    });

    // Auto close after 5 seconds
    setTimeout(closeTip, 5000);
  }
});