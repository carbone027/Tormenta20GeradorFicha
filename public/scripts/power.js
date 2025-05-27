document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.filter-btn');
  const powerCards = document.querySelectorAll('.power-card');
  const powerSections = document.querySelectorAll('.power-section');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', function() {
      // Remover classe active de todos os botões
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Adicionar classe active ao botão clicado
      this.classList.add('active');
      
      // Filtrar poderes
      const tipo = this.dataset.filter;
      
      if (tipo === 'all') {
        // Mostrar todos
        powerCards.forEach(card => {
          card.classList.remove('hidden');
          card.style.animation = 'fadeInUp 0.5s ease-out';
        });
        powerSections.forEach(section => section.style.display = 'block');
      } else {
        // Mostrar apenas do tipo selecionado
        powerSections.forEach(section => {
          if (section.dataset.tipo === tipo) {
            section.style.display = 'block';
          } else {
            section.style.display = 'none';
          }
        });
        
        powerCards.forEach(card => {
          if (card.dataset.tipo === tipo) {
            card.classList.remove('hidden');
            card.style.animation = 'fadeInUp 0.5s ease-out';
          } else {
            card.classList.add('hidden');
          }
        });
      }
    });
  });
  
  console.log('✅ Sistema de filtros de poderes carregado');
});