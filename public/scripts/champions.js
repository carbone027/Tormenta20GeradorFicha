// Script específico para a página de campeões
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Champions page...');
  
  initializeChampionClasses();
  initializeChampionTooltips();
  animateChampionCards();
  
  console.log('Champions page initialized successfully!');

  function initializeChampionClasses() {
    console.log('Inicializando classes de campeões');
    const championClasses = document.querySelectorAll('.champion-class.clickable');

    championClasses.forEach(championClass => {
      championClass.addEventListener('click', function () {
        console.log('Classe de campeão clicada:', championClass);
        const isExpanded = championClass.classList.contains('expanded');

        // Colapsar todas as outras classes primeiro
        championClasses.forEach(otherClass => {
          if (otherClass !== championClass) {
            otherClass.classList.remove('expanded');
          }
        });

        // Toggle da classe clicada
        if (isExpanded) {
          championClass.classList.remove('expanded');
        } else {
          championClass.classList.add('expanded');
          // Smooth scroll para o card expandido após a animação
          setTimeout(() => {
            championClass.scrollIntoView({
              behavior: 'smooth',
              block: 'start',
              inline: 'nearest'
            });
          }, 300);
        }
      });

      // Prevenir que cliques nos elementos expandidos fechem o card
      const expandedContent = championClass.querySelector('.expanded-content');
      if (expandedContent) {
        expandedContent.addEventListener('click', function (e) {
          e.stopPropagation();
        });
      }
    });
  }

  function initializeChampionTooltips() {
    // Tooltips para campeões
    const championItems = document.querySelectorAll('.champion-item');
    championItems.forEach(item => {
      item.addEventListener('mouseenter', function (e) {
        const championName = item.querySelector('span').textContent;
        showTooltip(e, `${championName} - Clique para mais informações`);
      });

      item.addEventListener('mouseleave', hideTooltip);

      // Adicionar funcionalidade de clique nos campeões
      item.addEventListener('click', function () {
        const championName = item.querySelector('span').textContent;
        showChampionInfo(championName);
      });
    });

    // Tooltips para itens
    const items = document.querySelectorAll('.item');
    items.forEach(item => {
      item.addEventListener('mouseenter', function (e) {
        const itemName = item.querySelector('span').textContent;
        const itemDescription = getItemDescription(itemName);
        showTooltip(e, `${itemName}<br>${itemDescription}`);
      });

      item.addEventListener('mouseleave', hideTooltip);
    });
  }

  function showTooltip(e, content) {
    // Remove tooltip anterior se existir
    hideTooltip();
    
    const tooltip = document.createElement('div');
    tooltip.className = 'champion-tooltip';
    tooltip.innerHTML = content;
    tooltip.style.cssText = `
      position: absolute;
      background: #1e2d50;
      color: #CDBE91;
      padding: 0.5rem;
      border-radius: 5px;
      border: 1px solid #C8A964;
      font-size: 0.8rem;
      max-width: 200px;
      z-index: 1000;
      pointer-events: none;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    `;

    document.body.appendChild(tooltip);

    const rect = e.target.getBoundingClientRect();
    tooltip.style.left = `${rect.left + window.scrollX}px`;
    tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
  }

  function hideTooltip() {
    const tooltip = document.querySelector('.champion-tooltip');
    if (tooltip) {
      tooltip.remove();
    }
  }

  function showChampionInfo(championName) {
    const overlay = document.createElement('div');
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 27, 60, 0.9);
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
      max-width: 500px;
      width: 90%;
      text-align: center;
    `;

    popup.innerHTML = `
      <h3 style="color: #C8A964; margin-bottom: 1rem; font-size: 1.5rem;">${championName}</h3>
      <p style="margin-bottom: 1.5rem;">Para mais informações detalhadas sobre este campeão, visite:</p>
      <a href="https://leagueoflegends.fandom.com/wiki/${championName}" 
         target="_blank" 
         style="color: #C8A964; text-decoration: underline; margin-bottom: 1.5rem; display: block;">
        Ver no Wiki do LoL
      </a>
      <button onclick="this.parentElement.parentElement.remove()" 
              style="background: #C8A964; color: #0F1B3C; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer; font-weight: bold;">
        Fechar
      </button>
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    overlay.addEventListener('click', (e) => {
      if (e.target === overlay) {
        overlay.remove();
      }
    });
  }

  function getItemDescription(itemName) {
    const itemDescriptions = {
      'Sunfire Aegis': 'Dano de queimadura em área',
      'Kaenic Rookern': 'Escudo mágico e alta resistência mágica',
      'Thornmail': 'Reflete dano e aplica Grievous Wounds',
      'Randuin\'s Omen': 'Reduz dano crítico e velocidade de ataque',
      'Spirit Visage': 'Aumenta cura e oferece resistência mágica',
      'Warmog\'s Armor': 'Regeneração massiva de vida',
      'Sundered Sky': 'Crítico garantido e cura baseada em vida faltante',
      'Black Cleaver': 'Redução de armadura e aceleração',
      'Sterak\'s Gage': 'Escudo quando com pouca vida',
      'Death\'s Dance': 'Converte dano em DoT',
      'Hullbreaker': 'Dano massivo em estruturas',
      'Maw of Malmortius': 'Escudo contra dano mágico',
      'Eclipse': 'Penetração e escudo',
      'Youmuu\'s Ghostblade': 'Letalidade e velocidade de movimento',
      'Serpent\'s Fang': 'Quebra escudos',
      'Edge of Night': 'Escudo contra habilidades',
      'Axiom Arc': 'Reduz cooldown da ultimate',
      'The Collector': 'Executa inimigos com pouca vida',
      'Kraken Slayer': 'Dano verdadeiro a cada 3 ataques',
      'Infinity Edge': 'Aumenta dano crítico',
      'Lord Dominik\'s': 'Penetração de armadura',
      'Bloodthirster': 'Roubo de vida e escudo',
      'Phantom Dancer': 'Velocidade de movimento e critical',
      'Quicksilver Sash': 'Remove debuffs',
      'Luden\'s Companion': 'Dano extra em habilidades',
      'Malignance': 'Reduz resistência mágica',
      'Rod of Ages': 'Escala com o tempo',
      'Zhonya\'s Hourglass': 'Invulnerabilidade temporária',
      'Shadowflame': 'Penetração mágica contra escudos',
      'Rylai\'s Crystal': 'Aplica slow em habilidades',
      'Moonstone Renewer': 'Cura escalante em team fights',
      'Locket of Solari': 'Escudo da equipe',
      'Redemption': 'Cura em área',
      'Staff of Water': 'Ability Power e cura para aliados',
      'Mikael\'s Blessing': 'Remove debuffs e cura',
      'Wardstone': 'Mais wards e stats extras'
    };

    return itemDescriptions[itemName] || 'Item poderoso do League of Legends';
  }

  function animateChampionCards() {
    const cards = document.querySelectorAll('.champion-class');
    cards.forEach((card, index) => {
      card.style.opacity = '0';
      card.style.transform = 'translateY(20px)';
      card.style.animation = `slideInUp 0.6s ease forwards`;
      card.style.animationDelay = `${index * 0.1}s`;
    });
  }
});