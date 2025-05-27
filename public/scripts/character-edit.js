// Script para edição de personagem com sistema atualizado
document.addEventListener('DOMContentLoaded', function() {
  // Verificar se há dados do personagem disponíveis
  const characterForm = document.getElementById('characterForm');
  if (!characterForm) {
    console.log('❌ Formulário de personagem não encontrado');
    return;
  }

  // Configuração inicial
  let pontosDisponiveis = 27; // Para cálculo de custo
  
  // Sistema de custos atualizado - baseado no valor 10 como padrão
  const custoPorPonto = { 
    8: -2,   // Reduzir de 10 para 8 "devolve" 2 pontos
    9: -1,   // Reduzir de 10 para 9 "devolve" 1 ponto
    10: 0,   // Valor base - sem custo
    11: 1,   // Subir de 10 para 11 custa 1 ponto
    12: 2,   // Subir de 10 para 12 custa 2 pontos
    13: 3,   // Subir de 10 para 13 custa 3 pontos
    14: 5,   // Subir de 10 para 14 custa 5 pontos
    15: 7,   // Subir de 10 para 15 custa 7 pontos
    16: 10,  // Subir de 10 para 16 custa 10 pontos
    17: 13,  // Subir de 10 para 17 custa 13 pontos
    18: 17,  // Subir de 10 para 18 custa 17 pontos
    19: 22,  // Subir de 10 para 19 custa 22 pontos
    20: 28   // Subir de 10 para 20 custa 28 pontos
  };
  
  // Elementos do DOM
  const pontosRestantesEl = document.getElementById('pontosRestantes');
  const atributos = ['forca', 'destreza', 'constituicao', 'inteligencia', 'sabedoria', 'carisma'];
  
  // Calcular pontos iniciais usados baseado nos valores atuais (sem bônus racial)
  function calcularPontosIniciais() {
    let pontosUsados = 0;
    
    // Precisamos "reverter" os bônus raciais para calcular o valor base
    atributos.forEach(attr => {
      const valorAtual = parseInt(document.getElementById(attr).value);
      // Para edição, assumimos que o valor já inclui bônus raciais
      // Seria ideal ter uma forma de distinguir valor base vs valor com bônus
      // Por simplicidade, vamos calcular como se fosse o valor final
      pontosUsados += custoPorPonto[Math.min(20, Math.max(8, valorAtual))] || 0;
    });
    
    pontosDisponiveis = Math.max(0, 27 - pontosUsados);
    pontosRestantesEl.textContent = pontosDisponiveis;
  }
  
  // Atualizar preview e cálculos
  function atualizarCalculos() {
    // Atualizar pontos restantes
    let pontosUsados = 0;
    atributos.forEach(attr => {
      const valor = parseInt(document.getElementById(attr).value);
      const valorSeguro = Math.min(20, Math.max(8, valor));
      pontosUsados += custoPorPonto[valorSeguro] || 0;
      
      // Atualizar modificador
      const modificador = Math.floor((valor - 10) / 2);
      document.getElementById('bonus-' + attr).textContent = modificador >= 0 ? '+' + modificador : modificador;
    });
    
    pontosDisponiveis = Math.max(0, 27 - pontosUsados);
    pontosRestantesEl.textContent = pontosDisponiveis;
    
    // Atualizar botões
    atributos.forEach(attr => {
      const input = document.getElementById(attr);
      const valor = parseInt(input.value);
      const btnMinus = input.parentNode.querySelector('.minus');
      const btnPlus = input.parentNode.querySelector('.plus');
      
      btnMinus.disabled = valor <= 8;
      
      if (valor >= 20) {
        btnPlus.disabled = true;
      } else {
        const custoProximo = (custoPorPonto[Math.min(20, valor + 1)] || 0) - (custoPorPonto[valor] || 0);
        btnPlus.disabled = pontosDisponiveis < custoProximo;
      }
    });
    
    // Calcular características derivadas automaticamente
    calcularCaracteristicasDerivadas();
    atualizarPreview();
  }
  
  // Calcular PV, PM, CA automaticamente
  function calcularCaracteristicasDerivadas() {
    const classeSelect = document.getElementById('classe_id');
    const constituicao = parseInt(document.getElementById('constituicao').value);
    const destreza = parseInt(document.getElementById('destreza').value);
    const nivel = parseInt(document.getElementById('nivel').value) || 1;
    
    if (classeSelect.selectedOptions.length > 0) {
      const option = classeSelect.selectedOptions[0];
      const vidaBase = parseInt(option.dataset.vida) || 0;
      const manaBase = parseInt(option.dataset.mana) || 0;
      
      // Calcular PV (opcional - só se o usuário quiser auto-cálculo)
      const modCon = Math.floor((constituicao - 10) / 2);
      const pvCalculado = vidaBase + modCon + ((nivel - 1) * (Math.floor(vidaBase / 4) + modCon));
      
      // Não forçar o cálculo, apenas sugerir
      const pvAtual = parseInt(document.getElementById('pontos_vida').value);
      if (pvAtual === 0 || pvAtual < pvCalculado) {
        document.getElementById('pontos_vida').value = Math.max(1, pvCalculado);
      }
      
      // Calcular PM
      if (manaBase > 0) {
        const pmCalculado = manaBase + ((nivel - 1) * Math.floor(manaBase / 4));
        const pmAtual = parseInt(document.getElementById('pontos_mana').value);
        if (pmAtual === 0 || pmAtual < pmCalculado) {
          document.getElementById('pontos_mana').value = pmCalculado;
        }
      }
    }
    
    // Calcular CA base (10 + mod Destreza)
    const modDes = Math.floor((destreza - 10) / 2);
    const caBase = 10 + modDes;
    const caAtual = parseInt(document.getElementById('ca').value);
    
    // Só atualizar se a CA atual é menor que a base
    if (caAtual < caBase) {
      document.getElementById('ca').value = caBase;
    }
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
      
      if (this.classList.contains('plus') && valor < 20) {
        const custoProximo = (custoPorPonto[Math.min(20, valor + 1)] || 0) - (custoPorPonto[valor] || 0);
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
  
  // Event listeners para características derivadas
  ['pontos_vida', 'pontos_mana', 'ca', 'experiencia'].forEach(campo => {
    const element = document.getElementById(campo);
    if (element) {
      element.addEventListener('input', atualizarPreview);
    }
  });
  
  // Reset form
  const resetBtn = document.getElementById('resetForm');
  if (resetBtn) {
    resetBtn.addEventListener('click', function() {
      if (confirm('Tem certeza que deseja resetar o formulário? Todas as alterações não salvas serão perdidas.')) {
        location.reload();
      }
    });
  }
  
  // Form submission com validação
  characterForm.addEventListener('submit', function(e) {
    // Verificar se os pontos estão dentro do limite
    if (pontosDisponiveis < 0) {
      e.preventDefault();
      alert('❌ Você excedeu o limite de pontos de atributos! Ajuste os valores antes de salvar.');
      return false;
    }
    
    // Feedback visual
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '💾 Salvando...';
    submitBtn.disabled = true;
    
    // Permitir o submit normal
    console.log('✅ Formulário sendo enviado');
  });
  
  // Inicialização
  calcularPontosIniciais();
  atualizarCalculos();
  
  console.log('✅ Editor de personagem atualizado inicializado (sistema com bônus dobrados)');
});