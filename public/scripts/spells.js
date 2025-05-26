// Script específico para a página de feitiços
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Spells page...');
  
  initializeSpellAnimations();
  
  console.log('Spells page initialized successfully!');

  // Mapa de efeitos sonoros dos feitiços
  const spellSounds = {
    flash: 'assets/sounds/flash.mp3',
    ignite: 'assets/sounds/ignite.mp3',
    heal: 'assets/sounds/heal.mp3',
    teleport: 'assets/sounds/teleport.mp3',
    barrier: 'assets/sounds/barrier.mp3',
    exhaust: 'assets/sounds/exhaust.mp3',
    cleanse: 'assets/sounds/cleanse.mp3',
    ghost: 'assets/sounds/ghost.mp3',
    smite: 'assets/sounds/smite.mp3'
  };

  function initializeSpellAnimations() {
    const spellCards = document.querySelectorAll('.spell-card');
    const activeSpells = new Set(); // Para rastrear feitiços em cooldown

    spellCards.forEach(card => {
      card.addEventListener('click', function (event) {
        const spellName = card.getAttribute('data-spell');
        const spellColor = card.getAttribute('data-color');
        const cooldownElement = card.querySelector('.cooldown');
        const originalText = cooldownElement.textContent;

        // Evitar clicks múltiplos enquanto em cooldown
        if (activeSpells.has(spellName)) {
          return;
        }

        // Adicionar feitiço ao conjunto de ativos
        activeSpells.add(spellName);

        // Criar efeito de ondulação
        createRippleEffect(event, card);

        // Tocar efeito sonoro
        playSpellSound(spellName);

        // Aplicar efeitos visuais
        card.style.setProperty('--glow-color', spellColor);
        card.classList.add('glowing', 'pulsing', 'active');

        // Efeito de pulso na imagem
        const spellIcon = card.querySelector('.spell-icon');
        spellIcon.style.boxShadow = `0 0 30px ${spellColor}`;

        // Mudar texto para "Ativado!"
        cooldownElement.textContent = 'Ativado!';

        // Extrair número do cooldown do texto original
        const cooldownMatch = originalText.match(/(\d+)s/);
        let cooldownSeconds = cooldownMatch ? parseInt(cooldownMatch[1]) : 5;

        // Animação de countdown
        let countdown = cooldownSeconds;

        const countdownInterval = setInterval(() => {
          countdown--;
          if (countdown > 0) {
            cooldownElement.textContent = `${countdown}s`;
          } else {
            // Limpar efeitos após término do cooldown
            clearInterval(countdownInterval);

            // Remover classes de efeito
            card.classList.remove('glowing', 'pulsing', 'active');
            spellIcon.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)';
            cooldownElement.textContent = originalText;

            // Remover feitiço do conjunto de ativos
            activeSpells.delete(spellName);

            // Efeito visual de "pronto para usar"
            card.style.animation = 'spell-ready 0.5s ease';
            setTimeout(() => {
              card.style.animation = '';
            }, 500);
          }
        }, 1000);
      });

      // Hover effect adicional
      card.addEventListener('mouseenter', function () {
        if (!activeSpells.has(card.getAttribute('data-spell'))) {
          const spellColor = card.getAttribute('data-color');
          const spellIcon = card.querySelector('.spell-icon');
          spellIcon.style.boxShadow = `0 0 15px ${spellColor}`;
        }
      });

      card.addEventListener('mouseleave', function () {
        if (!activeSpells.has(card.getAttribute('data-spell'))) {
          const spellIcon = card.querySelector('.spell-icon');
          spellIcon.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.4)';
        }
      });
    });
  }

  function createRippleEffect(event, element) {
    const ripple = document.createElement('span');
    const rect = element.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = event.clientX - rect.left - size / 2;
    const y = event.clientY - rect.top - size / 2;

    ripple.classList.add('ripple');
    ripple.style.width = ripple.style.height = size + 'px';
    ripple.style.left = x + 'px';
    ripple.style.top = y + 'px';

    element.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }

  function playSpellSound(spellName) {
    const audio = new Audio(spellSounds[spellName]);
    audio.volume = 0.5; // Volume 50%
    audio.play().catch(e => {
      console.log('Não foi possível reproduzir o som:', e);
    });
  }

  // Adicionar CSS para animações se não existir
  if (!document.querySelector('#spell-animations-css')) {
    const spellAnimationsStyle = document.createElement('style');
    spellAnimationsStyle.id = 'spell-animations-css';
    spellAnimationsStyle.textContent = `
      @keyframes spell-ready {
        0% { border-color: #463714; }
        50% { 
          border-color: #C8A964; 
          box-shadow: 0 0 20px rgba(200, 169, 100, 0.5);
        }
        100% { border-color: #463714; }
      }

      @keyframes border-glow {
        0% { background-position: 0% 50%; }
        50% { background-position: 100% 50%; }
        100% { background-position: 0% 50%; }
      }

      .spell-card.glowing::before {
        content: '';
        position: absolute;
        top: -4px;
        left: -4px;
        right: -4px;
        bottom: -4px;
        border-radius: 15px;
        border: 2px solid transparent;
        background: linear-gradient(45deg, transparent, transparent, transparent, var(--glow-color, #C8A964), transparent, transparent, transparent);
        background-size: 400%;
        animation: border-glow 2s linear infinite;
        z-index: -1;
        opacity: 0.8;
      }

      .spell-card.pulsing .spell-icon {
        animation: pulse 0.5s ease-in-out;
      }

      @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.15); }
        100% { transform: scale(1); }
      }

      .spell-card.active .cooldown {
        background-color: #C8A964;
        color: #0F1B3C;
        animation: cooldown-flash 0.5s ease;
      }

      @keyframes cooldown-flash {
        0% { transform: scale(1); background-color: #C8A964; }
        50% { transform: scale(1.1); background-color: #ffffff; }
        100% { transform: scale(1); background-color: #C8A964; }
      }

      .spell-card .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-effect 0.6s ease-out;
      }

      @keyframes ripple-effect {
        to {
          transform: scale(4);
          opacity: 0;
        }
      }
    `;
    
    document.head.appendChild(spellAnimationsStyle);
  }
});