// Script principal com funcionalidades globais - VERSÃO DEFENSIVA
document.addEventListener('DOMContentLoaded', function () {
  console.log('DOM loaded, initializing global features...');

  // Verificar se estamos em uma página que precisa das funcionalidades globais
  const isAuthPage = window.location.pathname.includes('/login') || 
                     window.location.pathname.includes('/register');
  
  if (isAuthPage) {
    console.log('Auth page detected, skipping most global features...');
    // Apenas funcionalidades essenciais para páginas de auth
    initializeAuthPageFeatures();
    return;
  }

  // Funcionalidades completas para páginas principais
  initializeGlobalAnimations();
  initializeNavigation();
  initializeProgressTracker();
  initializeKeyboardNavigation();
  initializeKonamiCode();
  initializeMusicToggle();
  initializeAutoAdvance();
  initializeQuiz();
  initializeTooltipSystem();

  console.log('Global features initialized successfully!');

  // Funcionalidades mínimas para páginas de autenticação
  function initializeAuthPageFeatures() {
    // Apenas o Konami code para diversão
    initializeKonamiCode();
    
    // Melhorar UX dos formulários de auth
    enhanceAuthForms();
  }

  function enhanceAuthForms() {
    const authForms = document.querySelectorAll('.auth-form');
    authForms.forEach(form => {
      // Adicionar indicador de loading nos botões de submit
      form.addEventListener('submit', function() {
        const submitButton = form.querySelector('button[type="submit"]');
        if (submitButton) {
          submitButton.style.opacity = '0.7';
          submitButton.textContent = submitButton.textContent.includes('Login') ? 'Entrando...' : 'Registrando...';
          submitButton.disabled = true;
        }
      });

      // Melhorar feedback visual dos inputs
      const inputs = form.querySelectorAll('input');
      inputs.forEach(input => {
        input.addEventListener('focus', function() {
          this.style.borderColor = '#C8A964';
          this.style.boxShadow = '0 0 10px rgba(200, 169, 100, 0.3)';
        });

        input.addEventListener('blur', function() {
          this.style.borderColor = '#463714';
          this.style.boxShadow = 'none';
        });
      });
    });
  }

  // Funcionalidades globais (apenas para páginas principais)
  function initializeGlobalAnimations() {
    const cards = document.querySelectorAll('.card, .spell-card, .damage-card, .champion-class, .lane');
    cards.forEach((card, index) => {
      card.style.animationDelay = `${index * 0.1}s`;
    });
  }

  function initializeNavigation() {
    // Verificar se elementos de navegação existem
    const navButtons = document.querySelectorAll('.nav-btn');
    const contentSections = document.querySelectorAll('.content-section');

    if (navButtons.length === 0 || contentSections.length === 0) {
      console.log('Navigation elements not found, skipping navigation init');
      return;
    }

    console.log(`Found ${navButtons.length} nav buttons and ${contentSections.length} sections`);

    // Navigation functionality
    function showSection(sectionId) {
      console.log(`Showing section: ${sectionId}`);

      // Hide all sections
      contentSections.forEach(section => {
        section.classList.remove('active');
      });

      // Show selected section
      const targetSection = document.getElementById(sectionId);
      if (targetSection) {
        targetSection.classList.add('active');
      }

      // Update nav buttons
      navButtons.forEach(btn => {
        btn.classList.remove('active');
      });

      // Set active nav button
      const activeBtn = document.querySelector(`[data-section="${sectionId}"]`);
      if (activeBtn) {
        activeBtn.classList.add('active');
      }
    }

    // Add click listeners to navigation buttons
    navButtons.forEach((button, index) => {
      // Verificar se o botão tem data-section antes de adicionar listener
      const sectionId = button.getAttribute('data-section');
      if (!sectionId) return;

      button.addEventListener('click', function (e) {
        e.preventDefault();
        console.log(`Button clicked, section: ${sectionId}`);
        showSection(sectionId);
      });

      // Also add keyboard support
      button.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          showSection(sectionId);
        }
      });
    });
  }

  function initializeProgressTracker() {
    // Verificar se temos navegação antes de criar progress bar
    const navButtons = document.querySelectorAll('.nav-btn');
    if (navButtons.length === 0) return;

    // Progress tracker
    const progressBar = document.createElement('div');
    progressBar.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      height: 4px;
      background: linear-gradient(90deg, #C8A964, #463714);
      transition: width 0.3s ease;
      z-index: 1000;
      width: 0%;
    `;
    document.body.appendChild(progressBar);

    function updateProgress() {
      const activeIndex = Array.from(navButtons).findIndex(btn => btn.classList.contains('active'));
      const progress = ((activeIndex + 1) / navButtons.length) * 100;
      progressBar.style.width = `${progress}%`;
    }

    // Update progress when navigation changes
    navButtons.forEach(button => {
      button.addEventListener('click', updateProgress);
    });

    // Initial progress update
    updateProgress();
  }

  function initializeKeyboardNavigation() {
    // Keyboard navigation
    document.addEventListener('keydown', function (e) {
      if (e.altKey) {
        const navButtons = document.querySelectorAll('.nav-btn');
        if (navButtons.length === 0) return;

        const currentActive = document.querySelector('.nav-btn.active');
        const currentIndex = Array.from(navButtons).indexOf(currentActive);
        let nextIndex = currentIndex;

        switch (e.key) {
          case 'ArrowLeft':
            nextIndex = currentIndex > 0 ? currentIndex - 1 : navButtons.length - 1;
            break;
          case 'ArrowRight':
            nextIndex = currentIndex < navButtons.length - 1 ? currentIndex + 1 : 0;
            break;
        }

        if (nextIndex !== currentIndex && navButtons[nextIndex]) {
          const targetSection = navButtons[nextIndex].getAttribute('data-section');
          if (targetSection) {
            showSection(targetSection);
          }
        }
      }
    });
  }

  function initializeKonamiCode() {
    let konamiCode = [];
    const requiredCode = [
      'ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown',
      'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight'
    ];

    document.addEventListener('keydown', function (e) {
      konamiCode.push(e.code);
      konamiCode = konamiCode.slice(-8);

      if (JSON.stringify(konamiCode) === JSON.stringify(requiredCode)) {
        showEasterEgg();
      }
    });

    function showEasterEgg() {
      // Aplicar filtro
      document.body.style.filter = 'hue-rotate(180deg)';

      // Criar overlay
      const overlay = document.createElement('div');
      overlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(15, 27, 60, 0.9);
        z-index: 10000;
        display: flex;
        justify-content: center;
        align-items: center;
      `;

      // Criar popup
      const celebration = document.createElement('div');
      celebration.style.cssText = `
        background: linear-gradient(45deg, #C8A964, #463714);
        color: #CDBE91;
        padding: 3rem;
        border-radius: 20px;
        font-size: 2rem;
        font-weight: bold;
        text-align: center;
        border: 3px solid #CDBE91;
        box-shadow: 0 0 30px rgba(200, 169, 100, 0.5);
        animation: bounce 0.5s ease infinite alternate;
      `;
      celebration.innerHTML = '🎉 EASTER EGG ENCONTRADO! 🎉<br><br>Você é um verdadeiro invocador!';

      overlay.appendChild(celebration);
      document.body.appendChild(overlay);

      // Adicionar CSS da animação
      const style = document.createElement('style');
      style.textContent = `
        @keyframes bounce {
          0% { transform: scale(1); }
          100% { transform: scale(1.1); }
        }
      `;
      document.head.appendChild(style);

      // Limpar após 3 segundos
      setTimeout(() => {
        document.body.style.filter = 'none';
        if (overlay.parentNode) {
          document.body.removeChild(overlay);
        }
        if (style.parentNode) {
          document.head.removeChild(style);
        }
      }, 3000);
    }
  }

  function initializeMusicToggle() {
    // Music toggle
    const musicToggle = document.createElement('button');
    musicToggle.innerHTML = '🎵';
    musicToggle.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: transparent;
      color: #C8A964;
      border: 2px solid #C8A964;
      padding: 0.5rem;
      border-radius: 50%;
      cursor: pointer;
      font-size: 1.2rem;
      transition: all 0.3s ease;
      z-index: 1000;
    `;

    let isMuted = true;
    musicToggle.addEventListener('click', function () {
      isMuted = !isMuted;
      musicToggle.innerHTML = isMuted ? '🎵' : '🔇';
      musicToggle.title = isMuted ? 'Ativar som ambiente' : 'Desativar som ambiente';
    });

    document.body.appendChild(musicToggle);
  }

  function initializeAutoAdvance() {
    // Verificar se temos navegação
    const navButtons = document.querySelectorAll('.nav-btn');
    if (navButtons.length === 0) return;

    let autoAdvance = false;
    let autoAdvanceInterval;

    function toggleAutoAdvance() {
      autoAdvance = !autoAdvance;

      if (autoAdvance) {
        let currentIndex = Array.from(navButtons).findIndex(btn => btn.classList.contains('active'));
        autoAdvanceInterval = setInterval(() => {
          currentIndex = (currentIndex + 1) % navButtons.length;
          const targetSection = navButtons[currentIndex].getAttribute('data-section');
          if (targetSection) {
            showSection(targetSection);
            smoothScrollToSection(targetSection);
          }
        }, 5000);
      } else {
        clearInterval(autoAdvanceInterval);
      }
    }

    function smoothScrollToSection(sectionId) {
      const section = document.getElementById(sectionId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }

    // Auto-advance button
    const autoButton = document.createElement('button');
    autoButton.innerHTML = '⏯️ Auto';
    autoButton.style.cssText = `
      position: fixed;
      bottom: 140px;
      right: 20px;
      background: #463714;
      color: #CDBE91;
      border: none;
      padding: 0.7rem 1rem;
      border-radius: 20px;
      cursor: pointer;
      font-weight: bold;
      z-index: 1000;
      transition: all 0.3s ease;
    `;

    autoButton.addEventListener('click', function () {
      toggleAutoAdvance();
      autoButton.style.background = autoAdvance ? '#C8A964' : '#463714';
      autoButton.style.color = autoAdvance ? '#0F1B3C' : '#CDBE91';
    });

    document.body.appendChild(autoButton);
  }

  function initializeQuiz() {
    // Quiz functionality
    const quizQuestions = [
      {
        question: "Qual feitiço tem o menor cooldown?",
        options: ["Flash", "Ignite", "Heal", "Teleport"],
        correct: 1
      },
      {
        question: "Quantos tipos de dano existem no LoL?",
        options: ["2", "3", "4", "5"],
        correct: 1
      },
      {
        question: "Qual lane fica no meio do mapa?",
        options: ["Top", "Mid", "Bot", "Jungle"],
        correct: 1
      }
    ];

    let currentQuiz = 0;
    let score = 0;

    // Create quiz button
    const quizBtn = document.createElement('button');
    quizBtn.textContent = '🧠 Teste seus conhecimentos!';
    quizBtn.style.cssText = `
      position: fixed;
      bottom: 80px;
      right: 20px;
      background: #C8A964;
      color: #0F1B3C;
      border: none;
      padding: 1rem 1.5rem;
      border-radius: 25px;
      font-weight: bold;
      cursor: pointer;
      z-index: 1000;
      transition: all 0.3s ease;
    `;

    quizBtn.addEventListener('click', startQuiz);
    document.body.appendChild(quizBtn);

    function startQuiz() {
      currentQuiz = 0;
      score = 0;
      showQuestion();
    }

    function showQuestion() {
      if (currentQuiz >= quizQuestions.length) {
        showResults();
        return;
      }

      const question = quizQuestions[currentQuiz];
      const quizOverlay = document.createElement('div');
      quizOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(15, 27, 60, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
      `;

      const quizBox = document.createElement('div');
      quizBox.style.cssText = `
        background: #1e2d50;
        color: #CDBE91;
        padding: 2rem;
        border-radius: 15px;
        max-width: 500px;
        width: 90%;
        text-align: center;
        border: 2px solid #C8A964;
      `;

      quizBox.innerHTML = `
        <h3 style="color: #C8A964; margin-bottom: 1rem;">Pergunta ${currentQuiz + 1}/${quizQuestions.length}</h3>
        <p style="font-size: 1.2rem; margin-bottom: 2rem;">${question.question}</p>
        <div class="quiz-options"></div>
      `;

      const optionsContainer = quizBox.querySelector('.quiz-options');
      question.options.forEach((option, index) => {
        const button = document.createElement('button');
        button.textContent = option;
        button.style.cssText = `
          display: block;
          width: 100%;
          padding: 1rem;
          margin: 0.5rem 0;
          background: #463714;
          color: #CDBE91;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 1rem;
          transition: all 0.3s ease;
        `;

        button.addEventListener('click', function () {
          if (index === question.correct) {
            score++;
            button.style.background = '#28a745';
          } else {
            button.style.background = '#dc3545';
            optionsContainer.children[question.correct].style.background = '#28a745';
          }

          setTimeout(() => {
            document.body.removeChild(quizOverlay);
            currentQuiz++;
            showQuestion();
          }, 1500);
        });

        optionsContainer.appendChild(button);
      });

      quizOverlay.appendChild(quizBox);
      document.body.appendChild(quizOverlay);
    }

    function showResults() {
      const percentage = (score / quizQuestions.length) * 100;
      let message = '';

      if (percentage >= 80) {
        message = 'Excelente! Você está pronto para o Rift! 🏆';
      } else if (percentage >= 60) {
        message = 'Bem! Continue estudando e você chegará lá! 📚';
      } else {
        message = 'Precisa estudar mais! Revise o guia novamente! 🤔';
      }

      const resultOverlay = document.createElement('div');
      resultOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(15, 27, 60, 0.95);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 10000;
      `;

      const resultBox = document.createElement('div');
      resultBox.style.cssText = `
        background: #1e2d50;
        color: #CDBE91;
        padding: 2rem;
        border-radius: 15px;
        max-width: 400px;
        width: 90%;
        text-align: center;
        border: 2px solid #C8A964;
      `;

      resultBox.innerHTML = `
        <h3 style="color: #C8A964; margin-bottom: 1rem;">Resultado Final</h3>
        <p style="font-size: 2rem; margin: 1rem 0;">${score}/${quizQuestions.length}</p>
        <p style="font-size: 1.2rem; margin-bottom: 2rem;">${percentage.toFixed(0)}%</p>
        <p style="margin-bottom: 2rem;">${message}</p>
        <button style="background: #C8A964; color: #0F1B3C; border: none; padding: 1rem 2rem; border-radius: 8px; cursor: pointer; font-weight: bold;">
          Tentar Novamente
        </button>
      `;

      resultBox.querySelector('button').addEventListener('click', function () {
        document.body.removeChild(resultOverlay);
      });

      resultOverlay.appendChild(resultBox);
      document.body.appendChild(resultOverlay);
    }
  }

  function initializeTooltipSystem() {
    // Tooltip system global
    const tooltips = {
      'AD': 'Attack Damage - Atributo que aumenta o dano dos ataques básicos e algumas habilidades',
      'AP': 'Ability Power - Atributo que aumenta o dano das habilidades mágicas',
      'Flash': 'O feitiço mais importante! Sempre tenha Flash disponível para escapar ou iniciar',
      'Last Hit': 'Dar o golpe final no minion para receber ouro. Pratique muito!'
    };

    const tooltip = document.createElement('div');
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
      opacity: 0;
      pointer-events: none;
      transition: opacity 0.2s ease;
    `;
    document.body.appendChild(tooltip);

    // Add tooltips to text
    Object.keys(tooltips).forEach(term => {
      const regex = new RegExp(`\\b${term}\\b`, 'g');
      document.querySelectorAll('p, li').forEach(element => {
        if (element.textContent && element.textContent.includes(term) && !element.querySelector('.tooltip-trigger')) {
          element.innerHTML = element.innerHTML.replace(regex, `<span class="tooltip-trigger" data-tooltip="${tooltips[term]}">${term}</span>`);
        }
      });
    });

    // Tooltip event listeners
    document.addEventListener('mouseover', function (e) {
      if (e.target.classList.contains('tooltip-trigger')) {
        const tooltipText = e.target.getAttribute('data-tooltip');
        tooltip.textContent = tooltipText;
        tooltip.style.opacity = '1';

        const rect = e.target.getBoundingClientRect();
        tooltip.style.left = `${rect.left + window.scrollX}px`;
        tooltip.style.top = `${rect.bottom + window.scrollY + 5}px`;
      }
    });

    document.addEventListener('mouseout', function (e) {
      if (e.target.classList.contains('tooltip-trigger')) {
        tooltip.style.opacity = '0';
      }
    });
  }
});