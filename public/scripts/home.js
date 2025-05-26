// Script interativo para a página home - League of Legends - VERSÃO CORRIGIDA
document.addEventListener('DOMContentLoaded', function() {
  console.log('🎮 Inicializando página home do League of Legends...');
  
  // Inicializar apenas funcionalidades essenciais que não causam conflitos de layout
  initializeStatsAnimation();
  initializeTimelineInteractions();
  initializeWorldsCards();
  initializeScrollAnimations();
  initializeInteractiveTooltips();
  initializeKeyboardNavigation();
  
  console.log('✨ Página home inicializada com sucesso!');

  // ========== ANIMAÇÃO DE CONTAGEM NAS ESTATÍSTICAS ==========
  function initializeStatsAnimation() {
    console.log('📊 Inicializando animação das estatísticas...');
    
    const statNumbers = document.querySelectorAll('.stat-number');
    const observerOptions = {
      threshold: 0.5,
      rootMargin: '0px 0px -50px 0px'
    };

    const statsObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.dataset.animated) {
          animateNumber(entry.target);
          entry.target.dataset.animated = 'true';
        }
      });
    }, observerOptions);

    statNumbers.forEach(stat => {
      statsObserver.observe(stat);
      
      // Adicionar efeito de hover
      stat.parentElement.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
        this.style.transition = 'all 0.3s ease';
      });
      
      stat.parentElement.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
      });
    });

    function animateNumber(element) {
      const text = element.textContent;
      const number = parseInt(text.replace(/[^\d]/g, ''));
      const suffix = text.replace(/[\d]/g, '');
      const duration = 2000;
      const steps = 60;
      const increment = number / steps;
      let current = 0;
      let step = 0;

      const timer = setInterval(() => {
        current += increment;
        step++;
        
        if (step >= steps) {
          current = number;
          clearInterval(timer);
          // Efeito de conclusão simples
          element.style.transform = 'scale(1.1)';
          setTimeout(() => {
            element.style.transform = 'scale(1)';
          }, 300);
        }
        
        element.textContent = Math.floor(current) + suffix;
      }, duration / steps);
    }
  }

  // ========== TIMELINE INTERATIVA ==========
  function initializeTimelineInteractions() {
    console.log('📚 Inicializando timeline interativa...');
    
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    timelineItems.forEach((item, index) => {
      // Efeitos de hover melhorados
      item.addEventListener('mouseenter', function() {
        const content = this.querySelector('.timeline-content');
        if (content) {
          content.style.transform = 'translateY(-5px) scale(1.01)';
          content.style.boxShadow = '0 15px 30px rgba(200, 169, 100, 0.3)';
          content.style.transition = 'all 0.3s ease';
        }
        
        // Destacar a data
        const date = this.querySelector('.timeline-date');
        if (date) {
          date.style.transform = 'scale(1.05)';
          date.style.transition = 'all 0.3s ease';
        }
      });
      
      item.addEventListener('mouseleave', function() {
        const content = this.querySelector('.timeline-content');
        if (content) {
          content.style.transform = 'translateY(0) scale(1)';
          content.style.boxShadow = '0 8px 25px rgba(0, 0, 0, 0.2)';
        }
        
        const date = this.querySelector('.timeline-date');
        if (date) {
          date.style.transform = 'scale(1)';
        }
      });
      
      // Click para expandir detalhes
      item.addEventListener('click', function() {
        showTimelineDetails(this, index);
      });
    });

    function showTimelineDetails(item, index) {
      const year = item.querySelector('.timeline-date')?.textContent || 'Ano desconhecido';
      const title = item.querySelector('h4')?.textContent || 'Evento';
      const description = item.querySelector('p')?.textContent || 'Descrição não disponível';
      
      const detailsData = getTimelineDetails(year);
      
      createModal(`
        <div class="timeline-modal">
          <h2>${title}</h2>
          <div class="timeline-year-big" style="font-size: 2rem; color: #C8A964; margin: 1rem 0;">${year}</div>
          <p style="margin-bottom: 2rem; line-height: 1.6;">${description}</p>
          
          ${detailsData.extraInfo ? `
            <div class="extra-info" style="margin-bottom: 1.5rem;">
              <h3 style="color: #C8A964; margin-bottom: 1rem;">📖 Detalhes Adicionais</h3>
              <p style="line-height: 1.6;">${detailsData.extraInfo}</p>
            </div>
          ` : ''}
          
          ${detailsData.keyFigures ? `
            <div class="key-figures" style="margin-bottom: 1.5rem;">
              <h3 style="color: #C8A964; margin-bottom: 1rem;">👥 Figuras Importantes</h3>
              <ul style="list-style: none; padding: 0;">
                ${detailsData.keyFigures.map(figure => `<li style="margin-bottom: 0.5rem; padding-left: 1rem;">• ${figure}</li>`).join('')}
              </ul>
            </div>
          ` : ''}
          
          ${detailsData.impact ? `
            <div class="impact" style="margin-bottom: 2rem;">
              <h3 style="color: #C8A964; margin-bottom: 1rem;">💫 Impacto</h3>
              <p style="line-height: 1.6;">${detailsData.impact}</p>
            </div>
          ` : ''}
          
          <div class="timeline-navigation" style="text-align: center; margin-top: 2rem;">
            <button onclick="navigateTimeline(${index - 1})" ${index === 0 ? 'disabled' : ''} 
                    style="background: #463714; color: #CDBE91; border: none; padding: 0.5rem 1rem; border-radius: 5px; margin: 0 0.5rem; cursor: ${index === 0 ? 'not-allowed' : 'pointer'};">
              ⬅️ Anterior
            </button>
            <button onclick="navigateTimeline(${index + 1})" ${index === timelineItems.length - 1 ? 'disabled' : ''} 
                    style="background: #463714; color: #CDBE91; border: none; padding: 0.5rem 1rem; border-radius: 5px; margin: 0 0.5rem; cursor: ${index === timelineItems.length - 1 ? 'not-allowed' : 'pointer'};">
              Próximo ➡️
            </button>
          </div>
        </div>
      `);
    }

    // Dados adicionais para timeline
    function getTimelineDetails(year) {
      const details = {
        '2005-2006': {
          extraInfo: 'Brandon Beck e Marc Merrill eram estudantes da USC quando fundaram a Riot Games. Eles queriam criar uma empresa focada no jogador, não apenas no lucro.',
          keyFigures: ['Brandon Beck - Co-fundador', 'Marc Merrill - Co-fundador'],
          impact: 'Estabeleceu as bases filosóficas da Riot: "Player Experience First"'
        },
        '2009': {
          extraInfo: 'O jogo foi lançado com apenas 40 campeões. O primeiro campeão pós-lançamento foi Xin Zhao.',
          keyFigures: ['Steve "Guinsoo" Feak', 'Steve "Pendragon" Mescon'],
          impact: 'Revolucionou o modelo de negócio F2P para jogos competitivos'
        },
        '2013': {
          extraInfo: 'Faker tinha apenas 17 anos quando conquistou seu primeiro título mundial. Sua performance contra Ryu no OGN é lendária.',
          keyFigures: ['Lee "Faker" Sang-hyeok', 'Bae "Bang" Jun-sik', 'Lee "Wolf" Jae-wan'],
          impact: 'Estabeleceu a Coreia do Sul como potência dominante nos esports'
        },
        '2018': {
          extraInfo: 'Primeira vitória chinesa quebrou a hegemonia coreana. O evento teve a maior audiência da história dos esports.',
          keyFigures: ['Rookie (Song Eui-jin)', 'TheShy (Kang Seung-lok)', 'Ning (Gao Zhen-Ning)'],
          impact: 'Provou que outras regiões podiam competir com a Coreia do Sul'
        },
        '2023': {
          extraInfo: 'Faker retorna ao topo após 7 anos, provando sua longevidade excepcional no cenário competitivo.',
          keyFigures: ['Lee "Faker" Sang-hyeok', 'Choi "Zeus" Woo-je', 'Lee "Gumayusi" Min-hyeong'],
          impact: 'Consolidou Faker como o GOAT indiscutível do League of Legends'
        }
      };
      
      return details[year] || {};
    }
  }

  // ========== CARDS DOS WORLDS INTERATIVOS ==========
  function initializeWorldsCards() {
    console.log('🏆 Inicializando cards dos Worlds...');
    
    const worldsCards = document.querySelectorAll('.worlds-card');
    
    worldsCards.forEach(card => {
      // Dados dos campeonatos
      const year = card.querySelector('.worlds-year')?.textContent || '';
      const champion = card.querySelector('.worlds-champion')?.textContent || '';
      
      // Hover effects melhorados
      card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-8px) scale(1.02)';
        this.style.transition = 'all 0.3s ease';
        this.style.zIndex = '10';
        
        // Adicionar informações extras no hover
        if (!this.querySelector('.hover-info')) {
          const hoverInfo = document.createElement('div');
          hoverInfo.className = 'hover-info';
          hoverInfo.innerHTML = getWorldsHoverInfo(year);
          hoverInfo.style.cssText = `
            position: absolute;
            bottom: -10px;
            left: 0;
            right: 0;
            background: rgba(200, 169, 100, 0.95);
            color: #0F1B3C;
            padding: 0.8rem;
            border-radius: 0 0 15px 15px;
            font-size: 0.8rem;
            text-align: center;
            animation: slideUpInfo 0.3s ease;
            z-index: 11;
          `;
          this.appendChild(hoverInfo);
        }
      });
      
      card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.zIndex = '1';
        
        const hoverInfo = this.querySelector('.hover-info');
        if (hoverInfo) {
          hoverInfo.remove();
        }
      });
      
      // Click para detalhes completos
      card.addEventListener('click', function() {
        showWorldsDetails(year, champion);
      });
    });

    function getWorldsHoverInfo(year) {
      const hoverData = {
        '2011': '🎮 Primeiro torneio oficial<br>💰 Prize pool: $100,000<br>📍 Local: DreamHack',
        '2013': '👑 Era Faker começa<br>🏟️ Staples Center<br>📺 32M espectadores',
        '2018': '🇨🇳 Primeira vitória chinesa<br>📊 99.6M espectadores<br>🎵 Music: RISE',
        '2023': '🐐 Faker 4º título<br>⏰ 7 anos depois<br>🏆 O maior retorno da história',
        '2024': '👑 Faker pentacampeão<br>🔥 5º título mundial<br>🌟 GOAT absoluto'
      };
      
      return hoverData[year] || `🏆 Campeonato ${year}<br>🌍 Evento histórico<br>⚡ Ano épico`;
    }

    function showWorldsDetails(year, champion) {
      const detailsData = getWorldsFullDetails(year);
      
      createModal(`
        <div class="worlds-modal">
          <h2 style="color: #C8A964; margin-bottom: 1rem;">🏆 World Championship ${year}</h2>
          <div class="champion-highlight" style="font-size: 1.5rem; margin-bottom: 2rem; text-align: center; color: #FFD700;">${champion}</div>
          
          <div class="worlds-details-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(250px, 1fr)); gap: 1.5rem; margin-bottom: 2rem;">
            <div class="detail-section">
              <h3 style="color: #C8A964; margin-bottom: 1rem;">📊 Estatísticas</h3>
              <ul style="list-style: none; padding: 0;">
                <li style="margin-bottom: 0.5rem;">Prize Pool: ${detailsData.prizePool}</li>
                <li style="margin-bottom: 0.5rem;">Espectadores: ${detailsData.viewers}</li>
                <li style="margin-bottom: 0.5rem;">Local: ${detailsData.location}</li>
                <li style="margin-bottom: 0.5rem;">Duração: ${detailsData.duration}</li>
              </ul>
            </div>
            
            <div class="detail-section">
              <h3 style="color: #C8A964; margin-bottom: 1rem;">🎵 Música Tema</h3>
              <p style="margin-bottom: 1rem;">${detailsData.theme}</p>
              <button onclick="playThemeSong('${year}')" style="background: #C8A964; color: #0F1B3C; border: none; padding: 0.5rem 1rem; border-radius: 5px; cursor: pointer;">
                🎵 Ouvir Tema
              </button>
            </div>
            
            <div class="detail-section">
              <h3 style="color: #C8A964; margin-bottom: 1rem;">⚡ Momentos Épicos</h3>
              <ul style="list-style: none; padding: 0;">
                ${detailsData.epicMoments.map(moment => `<li style="margin-bottom: 0.5rem;">• ${moment}</li>`).join('')}
              </ul>
            </div>
            
            <div class="detail-section">
              <h3 style="color: #C8A964; margin-bottom: 1rem;">🌟 Legacy</h3>
              <p style="line-height: 1.6;">${detailsData.legacy}</p>
            </div>
          </div>
        </div>
      `);
    }

    function getWorldsFullDetails(year) {
      const defaultDetails = {
        prizePool: 'Não informado',
        viewers: 'Não informado',
        location: 'Não informado',
        duration: 'Não informado',
        theme: 'Não informado',
        epicMoments: ['Evento histórico'],
        legacy: 'Um marco importante na história do League of Legends'
      };

      const details = {
        '2013': {
          prizePool: '$2,050,000',
          viewers: '32 milhões',
          location: 'Staples Center, Los Angeles',
          duration: '1 mês',
          theme: 'Warriors by Imagine Dragons',
          epicMoments: [
            'Faker vs Ryu - Zed vs Zed outplay',
            'SKT T1 3-0 Royal Club na final',
            'Bengi Perfect Game na jungle'
          ],
          legacy: 'Estabeleceu Faker como o GOAT e os esports como entretenimento mainstream'
        },
        '2018': {
          prizePool: '$6,450,000',
          viewers: '99.6 milhões',
          location: 'Coreia do Sul',
          duration: '1 mês',
          theme: 'RISE by The Glitch Mob, Mako, and The Word Alive',
          epicMoments: [
            'Primeira vitória chinesa',
            'TheShy dominando a top lane',
            'Rookie vs Caps na mid lane'
          ],
          legacy: 'Quebrou a hegemonia coreana e mostrou que outras regiões podiam vencer'
        },
        '2023': {
          prizePool: '$2,225,000',
          viewers: '6.9 milhões (pico)',
          location: 'Coreia do Sul',
          duration: '1 mês',
          theme: 'Gods by NewJeans',
          epicMoments: [
            'Faker conquistando seu 4º título',
            'Zeus se consolidando como melhor top',
            'T1 reverse sweep contra JDG'
          ],
          legacy: 'O retorno épico de Faker após 7 anos consolidou sua posição como GOAT'
        }
      };
      
      return details[year] || defaultDetails;
    }
  }

  // ========== ANIMAÇÕES DE SCROLL ==========
  function initializeScrollAnimations() {
    console.log('📜 Inicializando animações de scroll...');
    
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting && !entry.target.classList.contains('animated')) {
          entry.target.classList.add('animate-in', 'animated');
          
          // Animações específicas por tipo de elemento
          if (entry.target.classList.contains('stat-card')) {
            entry.target.style.animation = 'slideInUp 0.6s ease-out';
          } else if (entry.target.classList.contains('timeline-item')) {
            const isEven = Array.from(entry.target.parentNode.children).indexOf(entry.target) % 2 === 0;
            entry.target.style.animation = `slideIn${isEven ? 'Left' : 'Right'} 0.8s ease-out`;
          } else if (entry.target.classList.contains('worlds-card')) {
            const delay = Array.from(entry.target.parentNode.children).indexOf(entry.target) * 0.1;
            entry.target.style.animationDelay = `${delay}s`;
            entry.target.style.animation = 'slideInUp 0.6s ease-out both';
          }
        }
      });
    }, observerOptions);

    // Observar todos os elementos animáveis
    const animatableElements = document.querySelectorAll(`
      .stat-card, .timeline-item, .worlds-card, .fact-card, 
      .impact-item, .expansion-card, .cta-section
    `);

    animatableElements.forEach(el => scrollObserver.observe(el));
  }

  // ========== TOOLTIPS INTERATIVOS ==========
  function initializeInteractiveTooltips() {
    console.log('💬 Inicializando tooltips interativos...');
    
    // Tooltips para termos específicos
    const tooltipTerms = {
      'Faker': 'Lee "Faker" Sang-hyeok - O maior jogador de League of Legends de todos os tempos, com 5 títulos mundiais.',
      'SKT T1': 'SK Telecom T1 (agora T1) - A organização mais bem-sucedida da história do LoL.',
      'Arcane': 'Série animada da Netflix baseada no universo de League of Legends, ganhadora do Emmy.',
      'Runeterra': 'O mundo mágico onde League of Legends acontece, com várias regiões únicas.',
      'MOBA': 'Multiplayer Online Battle Arena - Gênero de jogo competitivo 5v5.',
      'Worlds': 'Campeonato Mundial de League of Legends, o maior evento de esports do mundo.'
    };

    // Criar tooltips automáticos
    Object.keys(tooltipTerms).forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'gi');
      
      document.querySelectorAll('p, li, h3, h4').forEach(element => {
        if (element.textContent.includes(term) && !element.querySelector('.tooltip-term')) {
          element.innerHTML = element.innerHTML.replace(regex, `
            <span class="tooltip-term" data-tooltip="${tooltipTerms[term]}" 
                  style="color: #C8A964; cursor: help; text-decoration: underline; text-decoration-style: dotted;">$&</span>
          `);
        }
      });
    });

    // Event listeners para tooltips
    document.addEventListener('mouseover', function(e) {
      if (e.target.classList.contains('tooltip-term')) {
        showTooltip(e.target, e.target.dataset.tooltip);
      }
    });

    document.addEventListener('mouseout', function(e) {
      if (e.target.classList.contains('tooltip-term')) {
        hideTooltip();
      }
    });

    function showTooltip(element, text) {
      // Remove tooltip anterior
      hideTooltip();
      
      const tooltip = document.createElement('div');
      tooltip.className = 'interactive-tooltip';
      tooltip.innerHTML = text;
      tooltip.style.cssText = `
        position: absolute;
        background: linear-gradient(145deg, #1e2d50, #2a3f68);
        color: #CDBE91;
        padding: 1rem;
        border-radius: 10px;
        border: 2px solid #C8A964;
        font-size: 0.9rem;
        max-width: 300px;
        z-index: 10000;
        box-shadow: 0 8px 20px rgba(0, 0, 0, 0.3);
        animation: tooltipFadeIn 0.3s ease;
        pointer-events: none;
      `;

      document.body.appendChild(tooltip);

      const rect = element.getBoundingClientRect();
      tooltip.style.left = `${rect.left + window.scrollX}px`;
      tooltip.style.top = `${rect.bottom + window.scrollY + 10}px`;

      // Ajustar posição se sair da tela
      const tooltipRect = tooltip.getBoundingClientRect();
      if (tooltipRect.right > window.innerWidth) {
        tooltip.style.left = `${window.innerWidth - tooltipRect.width - 20}px`;
      }
      if (tooltipRect.bottom > window.innerHeight) {
        tooltip.style.top = `${rect.top + window.scrollY - tooltipRect.height - 10}px`;
      }
    }

    function hideTooltip() {
      const tooltip = document.querySelector('.interactive-tooltip');
      if (tooltip) {
        tooltip.style.animation = 'tooltipFadeOut 0.2s ease';
        setTimeout(() => tooltip.remove(), 200);
      }
    }
  }

  // ========== NAVEGAÇÃO POR TECLADO ==========
  function initializeKeyboardNavigation() {
    console.log('⌨️ Inicializando navegação por teclado...');
    
    document.addEventListener('keydown', function(e) {
      // Pular para seções com números
      if (e.key >= '1' && e.key <= '6') {
        const sectionIndex = parseInt(e.key) - 1;
        const sections = ['.hero-section', '.stats-showcase', '.timeline-section', '.worlds-section', '.universe-expansion', '.cta-section'];
        
        if (sections[sectionIndex]) {
          const section = document.querySelector(sections[sectionIndex]);
          if (section) {
            section.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        }
      }

      // Atalhos especiais
      if (e.key === 'h' && e.ctrlKey) {
        e.preventDefault();
        const heroSection = document.querySelector('.hero-section');
        if (heroSection) {
          heroSection.scrollIntoView({ behavior: 'smooth' });
        }
      }
    });

    // Mostrar atalhos
    const helpButton = document.createElement('button');
    helpButton.innerHTML = '❓';
    helpButton.style.cssText = `
      position: fixed;
      bottom: 20px;
      right: 20px;
      background: rgba(30, 45, 80, 0.9);
      color: #C8A964;
      border: 2px solid #C8A964;
      padding: 0.8rem;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1rem;
      z-index: 1000;
      transition: all 0.3s ease;
      backdrop-filter: blur(5px);
    `;
    
    helpButton.addEventListener('mouseenter', function() {
      this.style.transform = 'scale(1.1)';
      this.style.boxShadow = '0 4px 15px rgba(200, 169, 100, 0.4)';
    });
    
    helpButton.addEventListener('mouseleave', function() {
      this.style.transform = 'scale(1)';
      this.style.boxShadow = 'none';
    });
    
    helpButton.addEventListener('click', function() {
      createModal(`
        <div class="help-modal">
          <h2 style="color: #C8A964; margin-bottom: 1.5rem;">⌨️ Atalhos de Teclado</h2>
          <div class="shortcuts-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 1rem; margin: 1rem 0;">
            <div class="shortcut" style="background: rgba(200, 169, 100, 0.1); padding: 0.8rem; border-radius: 8px; border-left: 3px solid #C8A964;">
              <kbd style="background: #C8A964; color: #0F1B3C; padding: 0.2rem 0.4rem; border-radius: 3px; font-family: monospace; font-weight: bold;">1-6</kbd> - Pular para seção
            </div>
            <div class="shortcut" style="background: rgba(200, 169, 100, 0.1); padding: 0.8rem; border-radius: 8px; border-left: 3px solid #C8A964;">
              <kbd style="background: #C8A964; color: #0F1B3C; padding: 0.2rem 0.4rem; border-radius: 3px; font-family: monospace; font-weight: bold;">Ctrl</kbd> + <kbd style="background: #C8A964; color: #0F1B3C; padding: 0.2rem 0.4rem; border-radius: 3px; font-family: monospace; font-weight: bold;">H</kbd> - Voltar ao topo
            </div>
            <div class="shortcut" style="background: rgba(200, 169, 100, 0.1); padding: 0.8rem; border-radius: 8px; border-left: 3px solid #C8A964;">
              <kbd style="background: #C8A964; color: #0F1B3C; padding: 0.2rem 0.4rem; border-radius: 3px; font-family: monospace; font-weight: bold;">Esc</kbd> - Fechar modais
            </div>
          </div>
          <p style="text-align: center; margin-top: 1.5rem; color: #a09b8c;">🎮 Use esses atalhos para navegar como um verdadeiro invocador!</p>
        </div>
      `);
    });
    
    document.body.appendChild(helpButton);
  }

  // ========== FUNÇÕES UTILITÁRIAS ==========
  function createModal(content) {
    // Remove modal anterior
    const existingModal = document.querySelector('.modal-overlay');
    if (existingModal) {
      existingModal.remove();
    }

    const overlay = document.createElement('div');
    overlay.className = 'modal-overlay';
    overlay.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(15, 27, 60, 0.95);
      display: flex;
      justify-content: center;
      align-items: center;
      z-index: 10002;
      animation: modalFadeIn 0.3s ease;
      backdrop-filter: blur(10px);
    `;

    const modal = document.createElement('div');
    modal.className = 'modal-content';
    modal.style.cssText = `
      background: linear-gradient(145deg, #1e2d50, #2a3f68);
      color: #CDBE91;
      padding: 2rem;
      border-radius: 15px;
      border: 2px solid #C8A964;
      max-width: 90vw;
      max-height: 90vh;
      overflow-y: auto;
      box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);
      position: relative;
      animation: modalSlideIn 0.4s ease;
    `;

    modal.innerHTML = content + `
      <button class="modal-close" onclick="closeModal()" style="
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: #C8A964;
        color: #0F1B3C;
        border: none;
        padding: 0.5rem;
        border-radius: 50%;
        cursor: pointer;
        font-weight: bold;
        width: 30px;
        height: 30px;
        display: flex;
        align-items: center;
        justify-content: center;
        transition: all 0.3s ease;
      ">✕</button>
    `;

    overlay.appendChild(modal);
    document.body.appendChild(overlay);

    // Fechar com clique no overlay
    overlay.addEventListener('click', function(e) {
      if (e.target === overlay) {
        closeModal();
      }
    });

    // Fechar com ESC
    const handleEscape = function(e) {
      if (e.key === 'Escape') {
        closeModal();
        document.removeEventListener('keydown', handleEscape);
      }
    };
    document.addEventListener('keydown', handleEscape);
  }

  // Funções globais para uso em modais
  window.closeModal = function() {
    const modal = document.querySelector('.modal-overlay');
    if (modal) {
      modal.style.animation = 'modalFadeOut 0.3s ease';
      setTimeout(() => modal.remove(), 300);
    }
  };

  window.navigateTimeline = function(index) {
    const timelineItems = document.querySelectorAll('.timeline-item');
    if (timelineItems[index]) {
      closeModal();
      setTimeout(() => {
        timelineItems[index].scrollIntoView({ behavior: 'smooth', block: 'center' });
        timelineItems[index].click();
      }, 300);
    }
  };

  window.playThemeSong = function(year) {
    console.log(`🎵 Tocando tema de ${year}`);
    // Aqui você poderia integrar com uma API de música
    alert(`🎵 Reproduzindo tema do Worlds ${year}!\n\nEm uma implementação real, isso abriria o YouTube ou Spotify.`);
  };

  // ========== CSS ADICIONAL DINÂMICO ==========
  const additionalStyles = document.createElement('style');
  additionalStyles.textContent = `
    @keyframes modalFadeIn {
      from { opacity: 0; }
      to { opacity: 1; }
    }
    
    @keyframes modalFadeOut {
      from { opacity: 1; }
      to { opacity: 0; }
    }
    
    @keyframes modalSlideIn {
      from { transform: translateY(-50px) scale(0.9); }
      to { transform: translateY(0) scale(1); }
    }
    
    @keyframes tooltipFadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes tooltipFadeOut {
      from { opacity: 1; transform: translateY(0); }
      to { opacity: 0; transform: translateY(-10px); }
    }
    
    @keyframes slideInUp {
      from { opacity: 0; transform: translateY(30px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    @keyframes slideInLeft {
      from { opacity: 0; transform: translateX(-50px); }
      to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes slideInRight {
      from { opacity: 0; transform: translateX(50px); }
      to { opacity: 1; transform: translateX(0); }
    }
    
    @keyframes slideUpInfo {
      from { transform: translateY(100%); opacity: 0; }
      to { transform: translateY(0); opacity: 1; }
    }
    
    /* Garantir que não há espaços enormes */
    .content-section {
      margin: 0;
      padding: 0;
    }
    
    .hero-section,
    .stats-showcase,
    .timeline-section,
    .worlds-section,
    .universe-expansion,
    .cultural-impact,
    .fun-facts,
    .cta-section {
      margin-bottom: 4rem;
      clear: both;
    }
    
    /* Evitar conflitos de z-index */
    .modal-overlay {
      z-index: 10002 !important;
    }
    
    .interactive-tooltip {
      z-index: 10000 !important;
    }
    
    /* Responsividade melhorada */
    @media (max-width: 768px) {
      .hero-section h2 {
        font-size: 2rem;
      }
      
      .timeline-section,
      .cultural-impact,
      .cta-section {
        padding: 2rem 1rem;
        margin-bottom: 2rem;
      }
    }
  `;
  
  document.head.appendChild(additionalStyles);
});