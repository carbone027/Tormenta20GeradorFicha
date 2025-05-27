// Script para página de equipamentos
document.addEventListener('DOMContentLoaded', function() {
  // Elementos dos filtros
  const tipoFilter = document.getElementById('tipoFilter');
  const categoriaFilter = document.getElementById('categoriaFilter');
  const searchFilter = document.getElementById('searchFilter');
  const clearFiltersBtn = document.getElementById('clearFilters');
  
  // Elementos dos equipamentos
  const equipmentCards = document.querySelectorAll('.equipment-card');
  const equipmentSections = document.querySelectorAll('.equipment-section');
  
  // Verificar se os elementos existem
  if (!tipoFilter || !categoriaFilter || !searchFilter) {
    console.log('⚠️ Alguns elementos de filtro não foram encontrados');
    return;
  }
  
  // Função para filtrar equipamentos
  function filterEquipments() {
    const tipoValue = tipoFilter.value;
    const categoriaValue = categoriaFilter.value;
    const searchValue = searchFilter.value.toLowerCase();
    
    let visibleSections = new Set();
    
    equipmentCards.forEach(card => {
      const cardTipo = card.dataset.tipo;
      const cardCategoria = card.dataset.categoria;
      const cardNome = card.dataset.nome;
      
      let shouldShow = true;
      
      // Filtro por tipo
      if (tipoValue !== 'all' && cardTipo !== tipoValue) {
        shouldShow = false;
      }
      
      // Filtro por categoria
      if (categoriaValue !== 'all' && cardCategoria !== categoriaValue) {
        shouldShow = false;
      }
      
      // Filtro por busca
      if (searchValue && !cardNome.includes(searchValue)) {
        shouldShow = false;
      }
      
      if (shouldShow) {
        card.classList.remove('hidden');
        visibleSections.add(cardTipo);
        
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
      }
    });
    
    // Mostrar/ocultar seções baseado nos itens visíveis
    equipmentSections.forEach(section => {
      const sectionTipo = section.dataset.tipo;
      if (visibleSections.has(sectionTipo)) {
        section.classList.remove('hidden');
      } else {
        section.classList.add('hidden');
      }
    });
    
    // Atualizar contadores
    updateItemCounts();
  }
  
  // Função para atualizar contadores de itens
  function updateItemCounts() {
    equipmentSections.forEach(section => {
      const visibleCards = section.querySelectorAll('.equipment-card:not(.hidden)');
      const countElement = section.querySelector('.items-count');
      if (countElement) {
        countElement.textContent = `(${visibleCards.length} itens)`;
      }
    });
  }
  
  // Event listeners para filtros
  tipoFilter.addEventListener('change', filterEquipments);
  categoriaFilter.addEventListener('change', filterEquipments);
  searchFilter.addEventListener('input', filterEquipments);
  
  // Limpar filtros
  if (clearFiltersBtn) {
    clearFiltersBtn.addEventListener('click', function() {
      tipoFilter.value = 'all';
      categoriaFilter.value = 'all';
      searchFilter.value = '';
      
      equipmentCards.forEach(card => {
        card.classList.remove('hidden');
        card.style.transition = 'all 0.3s ease';
        card.style.opacity = '1';
        card.style.transform = 'translateY(0)';
      });
      
      equipmentSections.forEach(section => {
        section.classList.remove('hidden');
      });
      
      updateItemCounts();
    });
  }
  
  // Melhorar UX dos filtros
  [tipoFilter, categoriaFilter, searchFilter].forEach(filter => {
    filter.addEventListener('focus', function() {
      this.style.borderColor = 'var(--accent-gold)';
    });
    
    filter.addEventListener('blur', function() {
      this.style.borderColor = 'var(--border-color)';
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
  
  // Animações de entrada iniciais
  equipmentCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    
    setTimeout(() => {
      card.style.transition = 'all 0.5s ease';
      card.style.opacity = '1';
      card.style.transform = 'translateY(0)';
    }, index * 50); // Delay escalonado para efeito cascata
  });
  
  // Hover effects para cards de equipamento
  equipmentCards.forEach(card => {
    card.addEventListener('mouseenter', function() {
      this.style.transform = 'translateY(-5px)';
    });
    
    card.addEventListener('mouseleave', function() {
      if (!this.classList.contains('hidden')) {
        this.style.transform = 'translateY(0)';
      }
    });
  });
  
  // Inicialização
  updateItemCounts();
  
  console.log('✅ Script de equipamentos carregado');
});