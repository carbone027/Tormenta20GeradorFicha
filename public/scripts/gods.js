// Script para página de deuses
document.addEventListener('DOMContentLoaded', function() {
  // Elementos dos filtros
  const filterButtons = document.querySelectorAll('.filter-btn');
  const deusCards = document.querySelectorAll('.deus-card');
  
  // Verificar se os elementos existem
  if (!filterButtons.length || !deusCards.length) {
    console.log('⚠️ Elementos de filtro ou cards não encontrados');
    return;
  }
  
  // Função de filtro
  function filterDeuses(domain) {
    deusCards.forEach(card => {
      if (domain === 'all' || card.dataset.dominio === domain) {
        card.classList.remove('hidden');
        // Animação de entrada
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        setTimeout(() => {
          card.style.transition = 'all 0.3s ease';
          card.style.opacity = '1';
          card.style.transform = 'translateY(0)';
        }, 100);
      } else {
        card.classList.add('hidden');
        card.style.opacity = '0';
        card.style.transform = 'translateY(-20px)';
      }
    });
  }
  
  // Event listeners para botões de filtro
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remover classe active de todos os botões
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Adicionar classe active ao botão clicado
      this.classList.add('active');
      
      // Filtrar deuses
      const domain = this.dataset.filter;
      filterDeuses(domain);
      
      // Feedback visual
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = 'scale(1)';
      }, 150);
    });
  });
  
  // Hover effects para botões de filtro
  filterButtons.forEach(button => {
    button.addEventListener('mouseenter', function() {
      if (!this.classList.contains('active')) {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 4px 8px rgba(0, 0, 0, 0.3)';
      }
    });
    
    button.addEventListener('mouseleave', function() {
      if (!this.classList.contains('active')) {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = 'none';
      }
    });
  });
  
  // Animação inicial dos cards
  deusCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.6s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 150); // Delay maior para efeito mais dramático
  });
  
  // Hover effects para cards de deuses
  deusCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-8px) scale(1.02)';
      this.style.boxShadow = '0 8px 16px rgba(212, 175, 55, 0.3)';
    });
    
    card.addEventListener('mouseleave', function() {
      if (!this.classList.contains('hidden')) {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = 'var(--shadow-md)';
      }
    });
  });
  
  // Scroll suave para seções
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
  
  // Efeito de revelação ao scroll
  function revealOnScroll() {
    const elements = document.querySelectorAll('.guide-step, .tip-card, .relationship-group');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = '1';
        element.style.transform = 'translateY(0)';
      }
    });
  }
  
  // Configurar elementos para animação de scroll
  const scrollElements = document.querySelectorAll('.guide-step, .tip-card, .relationship-group');
  scrollElements.forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(30px)';
    element.style.transition = 'all 0.6s ease';
  });
  
  // Event listener para scroll
  window.addEventListener('scroll', revealOnScroll);
  
  // Revelar elementos já visíveis na inicialização
  revealOnScroll();
  
  // Adicionar efeitos especiais nos símbolos dos deuses
  const symbolIcons = document.querySelectorAll('.symbol-icon');
  symbolIcons.forEach(icon => {
    icon.addEventListener('mouseenter', function() {
      this.style.transform = 'rotate(15deg) scale(1.2)';
      this.style.textShadow = '0 0 10px rgba(212, 175, 55, 0.8)';
    });
    
    icon.addEventListener('mouseleave', function() {
      this.style.transform = 'rotate(0deg) scale(1)';
      this.style.textShadow = 'none';
    });
  });
  
  console.log('✅ Script de deuses carregado');
});