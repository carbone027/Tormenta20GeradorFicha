// Script para criação de personagem
document.addEventListener('DOMContentLoaded', function() {
  let pontosDisponiveis = 27;
  const custoPorPonto = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };
  
  // Elementos do DOM
  const pontosRestantesEl = document.getElementById('pontosRestantes');
  const atributos = ['forca', 'destreza', 'constituicao', 'inteligencia', 'sabedoria', 'carisma'];
  
  // Atualizar preview e cálculos
  function atualizarCalculos() {
    // Atualizar pontos restantes
    let pontosUsados = 0;
    atributos.forEach(attr => {
      const valor = parseInt(document.getElementById(attr).value);
      pontosUsados += custoPorPonto[valor];
      
      // Atualizar modificador
      const modificador = Math.floor((valor - 10) / 2);
      document.getElementById('bonus-' + attr).textContent = modificador >= 0 ? '+' + modificador : modificador;
    });
    
    pontosDisponiveis = 27 - pontosUsados;
    pontosRestantesEl.textContent = pontosDisponiveis;
    
    // Atualizar botões
    atributos.forEach(attr => {
      const input = document.getElementById(attr);
      const valor = parseInt(input.value);
      const btnMinus = input.parentNode.querySelector('.minus');
      const btnPlus = input.parentNode.querySelector('.plus');
      
      btnMinus.disabled = valor <= 8;
      
      if (valor >= 15) {
        btnPlus.disabled = true;
      } else {
        const custoProximo = custoPorPonto[valor + 1] - custoPorPonto[valor];
        btnPlus.disabled = pontosDisponiveis < custoProximo;
      }
    });
    
    // Calcular características derivadas
    calcularCaracteristicasDerivadas();
    atualizarPreview();
  }
  
  // Calcular PV, PM, CA
  function calcularCaracteristicasDerivadas() {
    const classeSelect = document.getElementById('classe_id');
    const constituicao = parseInt(document.getElementById('constituicao').value);
    const destreza = parseInt(document.getElementById('destreza').value);
    const nivel = parseInt(document.getElementById('nivel').value) || 1;
    
    if (classeSelect.selectedOptions.length > 0) {
      const option = classeSelect.selectedOptions[0];
      const vidaBase = parseInt(option.dataset.vida) || 0;
      const manaBase = parseInt(option.dataset.mana) || 0;
      
      // Calcular PV
      const modCon = Math.floor((constituicao - 10) / 2);
      const pv = vidaBase + modCon + ((nivel - 1) * (Math.floor(vidaBase / 4) + modCon));
      document.getElementById('pontos_vida').value = Math.max(1, pv);
      
      // Calcular PM
      if (manaBase > 0) {
        const pm = manaBase + ((nivel - 1) * Math.floor(manaBase / 4));
        document.getElementById('pontos_mana').value = pm;
      } else {
        document.getElementById('pontos_mana').value = 0;
      }
    }
    
    // Calcular CA
    const modDes = Math.floor((destreza - 10) / 2);
    document.getElementById('ca').value = 10 + modDes;
  }
  
  // Atualizar preview
  function atualizarPreview() {
    const nome = document.getElementById('nome').value || 'Nome do Personagem';
    const racaSelect = document.getElementById('raca_id');
    const classeSelect = document.getElementById('classe_id');
    const nivel = document.getElementById('nivel').value || 1;
    
    let classeNome = 'Classe';
    let racaNome = 'Raça';
    
    if (classeSelect.selectedOptions.length > 0) {
      classeNome = classeSelect.selectedOptions[0].textContent;
    }
    
    if (racaSelect.selectedOptions.length > 0) {
      racaNome = racaSelect.selectedOptions[0].textContent;
    }
    
    document.getElementById('previewNome').textContent = nome;
    document.getElementById('previewClasseRaca').textContent = `${classeNome} ${racaNome} - Nível ${nivel}`;
    
    // Atualizar atributos no preview
    const attrsPreview = document.getElementById('attrsPreview');
    attrsPreview.innerHTML = '';
    
    atributos.forEach(attr => {
      const valor = document.getElementById(attr).value;
      const modificador = document.getElementById('bonus-' + attr).textContent;
      const nome = attr.charAt(0).toUpperCase() + attr.slice(1);
      
      const div = document.createElement('div');
      div.className = 'attr-preview';
      div.innerHTML = `
        <span class="label">${nome}:</span>
        <span class="value">${valor} (${modificador})</span>
      `;
      attrsPreview.appendChild(div);
    });
    
    // Atualizar características derivadas no preview
    const derivadasPreview = document.getElementById('derivadasPreview');
    derivadasPreview.innerHTML = '';
    
    const derivadas = [
      { label: 'Pontos de Vida', value: document.getElementById('pontos_vida').value },
      { label: 'Pontos de Mana', value: document.getElementById('pontos_mana').value },
      { label: 'Classe de Armadura', value: document.getElementById('ca').value }
    ];
    
    derivadas.forEach(item => {
      const div = document.createElement('div');
      div.className = 'stat-preview';
      div.innerHTML = `
        <span class="label">${item.label}:</span>
        <span class="value">${item.value}</span>
      `;
      derivadasPreview.appendChild(div);
    });
  }
  
  // Event listeners para atributos
  document.querySelectorAll('.attr-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      const attr = this.dataset.attr;
      const input = document.getElementById(attr);
      const valor = parseInt(input.value);
      
      if (this.classList.contains('plus') && valor < 15) {
        const custoProximo = custoPorPonto[valor + 1] - custoPorPonto[valor];
        if (pontosDisponiveis >= custoProximo) {
          input.value = valor + 1;
        }
      } else if (this.classList.contains('minus') && valor > 8) {
        input.value = valor - 1;
      }
      
      atualizarCalculos();
    });
  });
  
  // Event listeners para selects
  document.getElementById('classe_id').addEventListener('change', function() {
    atualizarCalculos();
    
    // Destacar atributo principal
    document.querySelectorAll('.atributo-card').forEach(card => {
      card.classList.remove('principal');
    });
    
    if (this.selectedOptions.length > 0) {
      const atributoPrincipal = this.selectedOptions[0].dataset.atributo;
      if (atributoPrincipal) {
        const card = document.getElementById(atributoPrincipal.toLowerCase()).closest('.atributo-card');
        if (card) card.classList.add('principal');
      }
    }
  });
  
  document.getElementById('raca_id').addEventListener('change', atualizarCalculos);
  document.getElementById('nivel').addEventListener('input', atualizarCalculos);
  document.getElementById('nome').addEventListener('input', atualizarPreview);
  
  // Reset form
  document.getElementById('resetForm').addEventListener('click', function() {
    if (confirm('Tem certeza que deseja resetar o formulário? Todos os dados serão perdidos.')) {
      document.getElementById('characterForm').reset();
      atributos.forEach(attr => {
        document.getElementById(attr).value = 8;
      });
      atualizarCalculos();
    }
  });
  
  // Inicializar
  atualizarCalculos();
});