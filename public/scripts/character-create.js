// Script para criação de personagem com todas as raças Tormenta20
document.addEventListener('DOMContentLoaded', function() {
  let pontosDisponiveis = 27;
  let bonusRacialAplicado = false;
  let bonusLivresDisponiveis = 0;
  let bonusLivresUsados = 0;
  const custoPorPonto = { 8: 0, 9: 1, 10: 2, 11: 3, 12: 4, 13: 5, 14: 7, 15: 9 };
  
  // Elementos do DOM
  const pontosRestantesEl = document.getElementById('pontosRestantes');
  const atributos = ['forca', 'destreza', 'constituicao', 'inteligencia', 'sabedoria', 'carisma'];
  const racaSelect = document.getElementById('raca_id');
  
  // Criar interface para bônus raciais livres
  function criarInterfaceBonusLivres() {
    let existingInterface = document.getElementById('bonus-livres-interface');
    if (existingInterface) {
      existingInterface.remove();
    }
    
    const racaCard = racaSelect.closest('.form-group');
    const bonusInterface = document.createElement('div');
    bonusInterface.id = 'bonus-livres-interface';
    bonusInterface.className = 'bonus-livres-interface';
    bonusInterface.style.cssText = `
      background: rgba(212, 175, 55, 0.1);
      border: 2px solid var(--accent-gold);
      border-radius: 8px;
      padding: 1rem;
      margin-top: 1rem;
      display: none;
    `;
    
    bonusInterface.innerHTML = `
      <h4 style="color: var(--accent-gold); margin-bottom: 1rem;">
        ✨ Escolha seus Bônus Raciais
      </h4>
      <p style="margin-bottom: 1rem; color: var(--text-muted);">
        Sua raça permite escolher <span id="bonus-disponiveis">0</span> atributos para receber bônus.
        <br><span id="bonus-restantes">0</span> bônus restantes.
      </p>
      <div class="bonus-livres-grid" style="display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 0.5rem;">
        ${atributos.map(attr => `
          <label class="bonus-livre-option" style="
            display: flex; 
            align-items: center; 
            gap: 0.5rem; 
            padding: 0.5rem; 
            background: var(--secondary-bg); 
            border-radius: 4px;
            cursor: pointer;
          ">
            <input type="checkbox" name="bonus-livre" value="${attr}" style="margin: 0;">
            <span>${attr.charAt(0).toUpperCase() + attr.slice(1)}</span>
          </label>
        `).join('')}
      </div>
      <p style="margin-top: 0.5rem; font-size: 0.85rem; color: var(--text-muted); font-style: italic;">
        💡 Nota: Algumas raças têm restrições específicas nos bônus livres.
      </p>
    `;
    
    racaCard.appendChild(bonusInterface);
    
    // Event listeners para os checkboxes
    const checkboxes = bonusInterface.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function() {
        aplicarBonusLivres();
      });
    });
  }
  
  // Aplicar bônus raciais automáticos
  function aplicarBonusRacial() {
    if (!racaSelect.value) return;
    
    const option = racaSelect.selectedOptions[0];
    const bonusData = option.dataset.bonus;
    
    if (!bonusData) return;
    
    try {
      const bonus = JSON.parse(bonusData);
      console.log('Aplicando bônus racial:', bonus);
      
      // Resetar valores base
      atributos.forEach(attr => {
        const input = document.getElementById(attr);
        input.dataset.valorBase = input.dataset.valorBase || input.value;
        input.value = parseInt(input.dataset.valorBase);
      });
      
      // Verificar se tem bônus livre
      if (bonus.livre) {
        bonusLivresDisponiveis = bonus.livre;
        bonusLivresUsados = 0;
        criarInterfaceBonusLivres();
        document.getElementById('bonus-livres-interface').style.display = 'block';
        document.getElementById('bonus-disponiveis').textContent = bonusLivresDisponiveis;
        document.getElementById('bonus-restantes').textContent = bonusLivresDisponiveis;
        
        // Aplicar penalidades se houver
        Object.entries(bonus).forEach(([atributo, valor]) => {
          if (atributo !== 'livre' && valor < 0) {
            const input = document.getElementById(atributo);
            if (input) {
              const novoValor = parseInt(input.value) + valor;
              input.value = Math.max(3, novoValor); // Mínimo 3
              console.log(`Aplicando penalidade: ${atributo} ${valor} = ${input.value}`);
            }
          }
        });
      } else {
        // Bônus fixos
        Object.entries(bonus).forEach(([atributo, valor]) => {
          const input = document.getElementById(atributo);
          if (input) {
            const novoValor = parseInt(input.value) + valor;
            input.value = Math.max(3, Math.min(18, novoValor));
            console.log(`Aplicando bônus: ${atributo} ${valor > 0 ? '+' : ''}${valor} = ${input.value}`);
          }
        });
        
        // Esconder interface de bônus livres
        const bonusInterface = document.getElementById('bonus-livres-interface');
        if (bonusInterface) {
          bonusInterface.style.display = 'none';
        }
      }
      
      bonusRacialAplicado = true;
      recalcularPontos();
      atualizarCalculos();
      
    } catch (error) {
      console.error('Erro ao aplicar bônus racial:', error);
    }
  }
  
  // Aplicar bônus livres escolhidos
  function aplicarBonusLivres() {
    const checkboxes = document.querySelectorAll('input[name="bonus-livre"]:checked');
    const racaOption = racaSelect.selectedOptions[0];
    const bonusData = JSON.parse(racaOption.dataset.bonus || '{}');
    
    // Verificar limites
    let bonusPermitidos = bonusLivresDisponiveis;
    
    // Verificar restrições específicas da raça
    if (racaOption.textContent.includes('Lefou')) {
      // Lefou: qualquer atributo exceto Carisma
      const charismaCheckbox = document.querySelector('input[name="bonus-livre"][value="carisma"]');
      if (charismaCheckbox) {
        charismaCheckbox.disabled = true;
        charismaCheckbox.parentElement.style.opacity = '0.5';
      }
    } else if (racaOption.textContent.includes('Osteon')) {
      // Osteon: qualquer atributo exceto Constituição
      const constituicaoCheckbox = document.querySelector('input[name="bonus-livre"][value="constituicao"]');
      if (constituicaoCheckbox) {
        constituicaoCheckbox.disabled = true;
        constituicaoCheckbox.parentElement.style.opacity = '0.5';
      }
    }
    
    if (checkboxes.length > bonusPermitidos) {
      // Desmarcar o último marcado
      checkboxes[checkboxes.length - 1].checked = false;
      alert(`Você pode escolher apenas ${bonusPermitidos} atributo(s) para receber bônus!`);
      return;
    }
    
    // Resetar valores para valores base
    atributos.forEach(attr => {
      const input = document.getElementById(attr);
      input.value = parseInt(input.dataset.valorBase || 10);
    });
    
    // Reaplicar penalidades fixas
    Object.entries(bonusData).forEach(([atributo, valor]) => {
      if (atributo !== 'livre' && valor < 0) {
        const input = document.getElementById(atributo);
        if (input) {
          const novoValor = parseInt(input.value) + valor;
          input.value = Math.max(3, novoValor);
        }
      }
    });
    
    // Aplicar bônus escolhidos
    checkboxes.forEach(checkbox => {
      const atributo = checkbox.value;
      const input = document.getElementById(atributo);
      if (input) {
        const novoValor = parseInt(input.value) + 1; // +1 para cada bônus livre
        input.value = Math.min(18, novoValor);
      }
    });
    
    bonusLivresUsados = checkboxes.length;
    document.getElementById('bonus-restantes').textContent = bonusLivresDisponiveis - bonusLivresUsados;
    
    recalcularPontos();
    atualizarCalculos();
  }
  
  // Recalcular pontos usados considerando valores atuais
  function recalcularPontos() {
    let pontosUsados = 0;
    atributos.forEach(attr => {
      const valorBase = parseInt(document.getElementById(attr).dataset.valorBase || 8);
      pontosUsados += custoPorPonto[valorBase] || 0;
    });
    
    pontosDisponiveis = 27 - pontosUsados;
    pontosRestantesEl.textContent = pontosDisponiveis;
  }
  
  // Atualizar preview e cálculos
  function atualizarCalculos() {
    // Atualizar modificadores
    atributos.forEach(attr => {
      const valor = parseInt(document.getElementById(attr).value);
      const modificador = Math.floor((valor - 10) / 2);
      document.getElementById('bonus-' + attr).textContent = modificador >= 0 ? '+' + modificador : modificador;
    });
    
    // Atualizar botões apenas para valores base
    if (!bonusRacialAplicado) {
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
    } else {
      // Desabilitar botões quando bônus racial aplicado
      document.querySelectorAll('.attr-btn').forEach(btn => {
        btn.disabled = true;
        btn.style.opacity = '0.5';
      });
    }
    
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
  
  // Event listeners para atributos (apenas para valores base)
  document.querySelectorAll('.attr-btn').forEach(btn => {
    btn.addEventListener('click', function() {
      if (bonusRacialAplicado) return; // Não permitir mudanças após aplicar bônus racial
      
      const attr = this.dataset.attr;
      const input = document.getElementById(attr);
      const valor = parseInt(input.value);
      
      if (this.classList.contains('plus') && valor < 15) {
        const custoProximo = custoPorPonto[valor + 1] - custoPorPonto[valor];
        if (pontosDisponiveis >= custoProximo) {
          input.value = valor + 1;
          input.dataset.valorBase = input.value;
        }
      } else if (this.classList.contains('minus') && valor > 8) {
        input.value = valor - 1;
        input.dataset.valorBase = input.value;
      }
      
      atualizarCalculos();
    });
  });
  
  // Event listener para mudança de raça
  racaSelect.addEventListener('change', function() {
    bonusRacialAplicado = false;
    bonusLivresDisponiveis = 0;
    bonusLivresUsados = 0;
    
    // Resetar para valores base
    atributos.forEach(attr => {
      const input = document.getElementById(attr);
      if (input.dataset.valorBase) {
        input.value = input.dataset.valorBase;
      }
    });
    
    // Reabilitar botões
    document.querySelectorAll('.attr-btn').forEach(btn => {
      btn.disabled = false;
      btn.style.opacity = '1';
    });
    
    // Esconder interface de bônus livres
    const bonusInterface = document.getElementById('bonus-livres-interface');
    if (bonusInterface) {
      bonusInterface.style.display = 'none';
    }
    
    // Aplicar novos bônus
    if (this.value) {
      setTimeout(aplicarBonusRacial, 100);
    }
    
    atualizarCalculos();
  });
  
  // Event listeners para outros campos
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
  
  document.getElementById('nivel').addEventListener('input', atualizarCalculos);
  document.getElementById('nome').addEventListener('input', atualizarPreview);
  
  // Reset form
  document.getElementById('resetForm').addEventListener('click', function() {
    if (confirm('Tem certeza que deseja resetar o formulário? Todos os dados serão perdidos.')) {
      document.getElementById('characterForm').reset();
      bonusRacialAplicado = false;
      bonusLivresDisponiveis = 0;
      bonusLivresUsados = 0;
      
      atributos.forEach(attr => {
        const input = document.getElementById(attr);
        input.value = 8;
        input.dataset.valorBase = 8;
      });
      
      // Esconder interface de bônus livres
      const bonusInterface = document.getElementById('bonus-livres-interface');
      if (bonusInterface) {
        bonusInterface.remove();
      }
      
      // Reabilitar botões
      document.querySelectorAll('.attr-btn').forEach(btn => {
        btn.disabled = false;
        btn.style.opacity = '1';
      });
      
      atualizarCalculos();
    }
  });
  
  // Inicializar valores base
  atributos.forEach(attr => {
    const input = document.getElementById(attr);
    input.dataset.valorBase = input.value;
  });
  
  // Inicializar
  atualizarCalculos();
  
  console.log('✅ Sistema de criação com todas as raças inicializado');
});