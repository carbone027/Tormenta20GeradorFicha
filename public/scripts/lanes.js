// Script específico para a página de lanes
document.addEventListener('DOMContentLoaded', function() {
  console.log('Initializing Lanes page...');
  
  initializeLaneInteractions();
  
  console.log('Lanes page initialized successfully!');

  function initializeLaneInteractions() {
    // Lane map interaction
    const lanes = document.querySelectorAll('.lane');
    const colors = {
      'top-lane': '#ff6b35',
      'jungle': '#4ecdc4',
      'mid-lane': '#45b7d1',
      'bot-lane': '#96ceb4'
    };

    lanes.forEach(lane => {
      const laneClass = lane.classList[1];
      const originalColor = colors[laneClass] || '#463714';

      lane.addEventListener('mouseenter', function () {
        lane.style.borderColor = originalColor;
        lane.style.boxShadow = `0 0 15px ${originalColor}40`;
        lane.style.transform = 'scale(1.02)';
      });

      lane.addEventListener('mouseleave', function () {
        lane.style.borderColor = '#463714';
        lane.style.boxShadow = 'none';
        lane.style.transform = 'scale(1)';
      });

      // Adicionar efeito de clique
      lane.addEventListener('click', function () {
        // Mostrar informações adicionais sobre a lane
        showLaneInfo(laneClass, lane);
      });
    });
  }

  function showLaneInfo(laneClass, laneElement) {
    const laneInfo = {
      'top-lane': {
        title: 'Top Lane',
        description: 'Lane solitária onde tankiness e sustain são fundamentais. Foque em farm e escale para o late game.',
        tips: ['Controle as waves de minions', 'Use Teleport estrategicamente', 'Warde o rio para evitar ganks']
      },
      'jungle': {
        title: 'Jungle',
        description: 'Área entre as lanes com monstros neutros. Controle objetivos e ajude todas as lanes.',
        tips: ['Faça clear eficiente dos camps', 'Sempre tenha vision nos objetivos', 'Ganke as lanes que têm setup de CC']
      },
      'mid-lane': {
        title: 'Mid Lane',
        description: 'Lane central com fácil acesso a todas as outras. Ideal para campeões com mobilidade e burst.',
        tips: ['Controle a wave para roamear', 'Warde as entradas da jungle', 'Ajude seu jungler nos objetivos']
      },
      'bot-lane': {
        title: 'Bot Lane',
        description: 'Lane dupla com ADC e Support. Foque no farm e no controle do Dragon.',
        tips: ['Coordene com seu support', 'Controle a vision do Dragon', 'Posicione-se atrás dos minions']
      }
    };

    const info = laneInfo[laneClass];
    if (!info) return;

    // Criar popup com informações
    const popup = document.createElement('div');
    popup.style.cssText = `
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background: #1e2d50;
      color: #CDBE91;
      padding: 2rem;
      border-radius: 15px;
      border: 2px solid #C8A964;
      max-width: 400px;
      width: 90%;
      z-index: 10000;
      box-shadow: 0 10px 30px rgba(0,0,0,0.5);
    `;

    popup.innerHTML = `
      <h3 style="color: #C8A964; margin-bottom: 1rem;">${info.title}</h3>
      <p style="margin-bottom: 1rem;">${info.description}</p>
      <h4 style="color: #C8A964; margin-bottom: 0.5rem;">💡 Dicas:</h4>
      <ul style="margin-bottom: 1.5rem;">
        ${info.tips.map(tip => `<li style="margin-bottom: 0.5rem;">${tip}</li>`).join('')}
      </ul>
      <div style="text-align: center;">
        <button class="close-lane-info" style="
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
    `;

    overlay.appendChild(popup);
    document.body.appendChild(overlay);

    // Fechar popup
    function closePopup() {
      document.body.removeChild(overlay);
    }

    popup.querySelector('.close-lane-info').addEventListener('click', closePopup);
    overlay.addEventListener('click', (e) => {
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
  }
});