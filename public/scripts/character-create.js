// Script atualizado para criação de personagem - Sistema livre de distribuição + Poderes
// Remove limitação de pontos e permite ajustes livres dos atributos + integração com poderes
document.addEventListener('DOMContentLoaded', function () {
  let bonusRacialAplicado = false;
  let bonusLivresDisponiveis = 0;
  let bonusLivresUsados = 0;
  let poderesRaciaisCarregados = [];

  // Elementos do DOM
  const pontosRestantesEl = document.getElementById('pontosRestantes');
  const atributos = ['forca', 'destreza', 'constituicao', 'inteligencia', 'sabedoria', 'carisma'];
  const racaSelect = document.getElementById('raca_id');

  const CARACTERISTICAS_CLASSES = {
    'arcanista': {
      pv_inicial: 8,
      pv_por_nivel: 2,
      pm_por_nivel: 6
    },
    'bárbaro': {
      pv_inicial: 24,
      pv_por_nivel: 6,
      pm_por_nivel: 3
    },
    'barbaro': { // Alias sem acento
      pv_inicial: 24,
      pv_por_nivel: 6,
      pm_por_nivel: 3
    },
    'bardo': {
      pv_inicial: 12,
      pv_por_nivel: 3,
      pm_por_nivel: 4
    },
    'bucaneiro': {
      pv_inicial: 16,
      pv_por_nivel: 4,
      pm_por_nivel: 3
    },
    'caçador': {
      pv_inicial: 16,
      pv_por_nivel: 4,
      pm_por_nivel: 3
    },
    'cacador': { // Alias sem acento
      pv_inicial: 16,
      pv_por_nivel: 4,
      pm_por_nivel: 3
    },
    'cavaleiro': {
      pv_inicial: 20,
      pv_por_nivel: 5,
      pm_por_nivel: 3
    },
    'clérigo': {
      pv_inicial: 16,
      pv_por_nivel: 4,
      pm_por_nivel: 5
    },
    'clerigo': { // Alias sem acento
      pv_inicial: 16,
      pv_por_nivel: 4,
      pm_por_nivel: 5
    },
    'druida': {
      pv_inicial: 16,
      pv_por_nivel: 4,
      pm_por_nivel: 4
    },
    'guerreiro': {
      pv_inicial: 20,
      pv_por_nivel: 5,
      pm_por_nivel: 3
    },
    'inventor': {
      pv_inicial: 12,
      pv_por_nivel: 3,
      pm_por_nivel: 4
    },
    'ladino': {
      pv_inicial: 12,
      pv_por_nivel: 3,
      pm_por_nivel: 4
    },
    'lutador': {
      pv_inicial: 20,
      pv_por_nivel: 5,
      pm_por_nivel: 3
    },
    'nobre': {
      pv_inicial: 16,
      pv_por_nivel: 4,
      pm_por_nivel: 4
    },
    'paladino': {
      pv_inicial: 20,
      pv_por_nivel: 5,
      pm_por_nivel: 3
    }
  };

  // Esconder/remover o sistema de pontos
  if (pontosRestantesEl && pontosRestantesEl.parentElement) {
    pontosRestantesEl.parentElement.style.display = 'none';
  }

  // Função de debug para rastrear valores
  function debugAtributos(momento) {
    console.log(`🔍 Debug [${momento}]:`);
    atributos.forEach(attr => {
      const input = document.getElementById(attr);
      console.log(`  ${attr}: valor=${input.value}, base=${input.dataset.valorBase || 'undefined'}`);
    });
  }

  // Função para carregar poderes raciais
  async function carregarPoderesRaciais(racaId) {
    try {
      console.log('📚 Carregando poderes raciais para raça ID:', racaId);

      const response = await fetch(`/api/racas/${racaId}/poderes`);
      if (!response.ok) {
        throw new Error('Erro ao carregar poderes raciais');
      }

      const data = await response.json();
      if (data.success) {
        poderesRaciaisCarregados = data.poderes || [];
        exibirPoderesRaciais(poderesRaciaisCarregados);
        console.log('✅ Poderes raciais carregados:', poderesRaciaisCarregados.length);
      } else {
        console.warn('⚠️ Nenhum poder racial encontrado');
        poderesRaciaisCarregados = [];
        esconderPoderesRaciais();
      }
    } catch (error) {
      console.error('❌ Erro ao carregar poderes raciais:', error);
      poderesRaciaisCarregados = [];
      esconderPoderesRaciais();
    }
  }

  // Função para exibir poderes raciais
  function exibirPoderesRaciais(poderes) {
    const secaoPoderes = document.querySelector('.poderes-raciais-section');
    const listaPoderes = document.getElementById('poderesRaciaisLista');

    if (!secaoPoderes || !listaPoderes) return;

    if (poderes && poderes.length > 0) {
      listaPoderes.innerHTML = '';

      poderes.forEach(poder => {
        const poderCard = document.createElement('div');
        poderCard.className = 'poder-racial-card';
        poderCard.innerHTML = `
          <div class="poder-racial-header">
            <span class="poder-nome">✨ ${poder.nome}</span>
            <span class="poder-automatico">🧬 Automático</span>
          </div>
          <p class="poder-descricao">${poder.descricao}</p>
          ${poder.pre_requisitos ? `<p class="poder-requisitos">📋 <strong>Pré-requisitos:</strong> ${poder.pre_requisitos}</p>` : ''}
          ${poder.custo_pm && poder.custo_pm > 0 ? `<p class="poder-custo">💙 <strong>Custo:</strong> ${poder.custo_pm} PM</p>` : ''}
        `;
        listaPoderes.appendChild(poderCard);
      });

      secaoPoderes.style.display = 'block';
      atualizarPreviewPoderes();
    } else {
      esconderPoderesRaciais();
    }
  }

  // Função para esconder poderes raciais
  function esconderPoderesRaciais() {
    const secaoPoderes = document.querySelector('.poderes-raciais-section');
    if (secaoPoderes) {
      secaoPoderes.style.display = 'none';
    }
    atualizarPreviewPoderes();
  }

  // Função para atualizar preview de poderes
  function atualizarPreviewPoderes() {
    const previewPoderes = document.getElementById('previewPoderes');
    const poderesPreview = document.getElementById('poderesPreview');

    if (!previewPoderes || !poderesPreview) return;

    // Coletar poderes selecionados
    const poderesEscolhidos = [];
    const checkboxes = document.querySelectorAll('input[name="poderes_selecionados"]:checked');

    checkboxes.forEach(checkbox => {
      const card = checkbox.closest('.poder-selecao-card');
      if (card) {
        const nome = card.querySelector('.poder-nome').textContent;
        poderesEscolhidos.push(nome);
      }
    });

    // Combinar poderes raciais e escolhidos
    const todosPoderes = [];

    if (poderesRaciaisCarregados.length > 0) {
      poderesRaciaisCarregados.forEach(poder => {
        todosPoderes.push(`🧬 ${poder.nome} (Racial)`);
      });
    }

    poderesEscolhidos.forEach(nome => {
      todosPoderes.push(`⚡ ${nome} (Escolhido)`);
    });

    if (todosPoderes.length > 0) {
      poderesPreview.innerHTML = todosPoderes.map(poder =>
        `<div class="poder-preview-item">${poder}</div>`
      ).join('');
      previewPoderes.style.display = 'block';
    } else {
      previewPoderes.style.display = 'none';
    }
  }

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
        <br><strong>⚡ Bônus Dobrado:</strong> Os valores raciais são aplicados em dobro!
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
        💡 Nota: Os bônus são aplicados automaticamente. Você pode ajustar os valores manualmente depois.
      </p>
    `;

    racaCard.appendChild(bonusInterface);

    // Event listeners para os checkboxes
    const checkboxes = bonusInterface.querySelectorAll('input[type="checkbox"]');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function () {
        aplicarBonusLivres();
      });
    });
  }

  // Dobrar os modificadores raciais
  function dobrarModificadores(bonus) {
    const bonusdobrado = {};

    for (const [atributo, valor] of Object.entries(bonus)) {
      if (atributo === 'livre') {
        bonusdobrado[atributo] = valor; // Número de bônus livres não dobra
      } else {
        bonusdobrado[atributo] = valor * 2; // Dobrar o modificador
      }
    }

    return bonusdobrado;
  }

  // Aplicar bônus raciais automáticos
  function aplicarBonusRacial() {
    if (!racaSelect.value) return;

    const option = racaSelect.selectedOptions[0];
    const bonusData = option.dataset.bonus;

    if (!bonusData) return;

    try {
      const bonusOriginal = JSON.parse(bonusData);
      const bonus = dobrarModificadores(bonusOriginal); // Dobrar os modificadores

      console.log('Bônus original:', bonusOriginal);
      console.log('Bônus dobrado aplicado:', bonus);

      // Garantir que todos os atributos tenham valores base definidos
      atributos.forEach(attr => {
        const input = document.getElementById(attr);
        if (!input.dataset.valorBase) {
          input.dataset.valorBase = input.value;
        }
      });

      // Verificar se tem bônus livre
      if (bonus.livre) {
        bonusLivresDisponiveis = bonus.livre;
        bonusLivresUsados = 0;
        criarInterfaceBonusLivres();
        document.getElementById('bonus-livres-interface').style.display = 'block';
        document.getElementById('bonus-disponiveis').textContent = bonusLivresDisponiveis;
        document.getElementById('bonus-restantes').textContent = bonusLivresDisponiveis;

        // Aplicar apenas as penalidades fixas se houver
        Object.entries(bonus).forEach(([atributo, valor]) => {
          if (atributo !== 'livre' && valor < 0) {
            const input = document.getElementById(atributo);
            if (input) {
              const valorBase = parseInt(input.dataset.valorBase);
              const novoValor = valorBase + valor;
              input.value = Math.max(3, novoValor); // Mínimo 3
              console.log(`Aplicando penalidade dobrada: ${atributo} ${valor} = ${input.value}`);
            }
          }
        });
      } else {
        // Aplicar bônus fixos dobrados diretamente nos valores base
        Object.entries(bonus).forEach(([atributo, valor]) => {
          const input = document.getElementById(atributo);
          if (input) {
            const valorBase = parseInt(input.dataset.valorBase);
            const novoValor = valorBase + valor;
            input.value = Math.max(3, Math.min(20, novoValor)); // Min 3, Max 20
            console.log(`Aplicando bônus dobrado: ${atributo} ${valor > 0 ? '+' : ''}${valor} = ${input.value}`);
          }
        });

        // Esconder interface de bônus livres
        const bonusInterface = document.getElementById('bonus-livres-interface');
        if (bonusInterface) {
          bonusInterface.style.display = 'none';
        }
      }

      bonusRacialAplicado = true;
      atualizarCalculos();

    } catch (error) {
      console.error('Erro ao aplicar bônus racial:', error);
    }
  }

  // Aplicar bônus livres escolhidos (dobrados)
  function aplicarBonusLivres() {
    const checkboxes = document.querySelectorAll('input[name="bonus-livre"]:checked');
    const racaOption = racaSelect.selectedOptions[0];
    const bonusDataOriginal = JSON.parse(racaOption.dataset.bonus || '{}');
    const bonusData = dobrarModificadores(bonusDataOriginal);

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

    // Resetar TODOS os atributos para valores base primeiro
    atributos.forEach(attr => {
      const input = document.getElementById(attr);
      const valorBase = parseInt(input.dataset.valorBase || 10);
      input.value = valorBase;
    });

    // Reaplicar penalidades fixas (dobradas) se houver
    Object.entries(bonusData).forEach(([atributo, valor]) => {
      if (atributo !== 'livre' && valor < 0) {
        const input = document.getElementById(atributo);
        if (input) {
          const valorBase = parseInt(input.dataset.valorBase);
          const novoValor = valorBase + valor;
          input.value = Math.max(3, novoValor);
        }
      }
    });

    // Aplicar bônus escolhidos (+2 para cada bônus livre, dobrado de +1)
    checkboxes.forEach(checkbox => {
      const atributo = checkbox.value;
      const input = document.getElementById(atributo);
      if (input) {
        const valorAtual = parseInt(input.value);
        const novoValor = valorAtual + 2; // +2 (dobrado do +1 original)
        input.value = Math.min(20, novoValor);
      }
    });

    bonusLivresUsados = checkboxes.length;
    document.getElementById('bonus-restantes').textContent = bonusLivresDisponiveis - bonusLivresUsados;

    atualizarCalculos();
  }

  // Atualizar preview e cálculos
  function atualizarCalculos() {
    // Atualizar modificadores
    atributos.forEach(attr => {
      const valor = parseInt(document.getElementById(attr).value);
      const modificador = Math.floor((valor - 10) / 2);
      const bonusElement = document.getElementById('bonus-' + attr);
      if (bonusElement) {
        bonusElement.textContent = modificador >= 0 ? '+' + modificador : modificador;
      }
    });

    // SEMPRE permitir alteração dos atributos (não travar os botões)
    atributos.forEach(attr => {
      const input = document.getElementById(attr);
      const btnMinus = input.parentNode.querySelector('.minus');
      const btnPlus = input.parentNode.querySelector('.plus');

      const valor = parseInt(input.value);

      // Habilitar/desabilitar baseado apenas nos limites mínimo e máximo
      btnMinus.disabled = valor <= 3;  // Mínimo 3
      btnPlus.disabled = valor >= 20;  // Máximo 20

      // Remover opacidade que indica desabilitado
      btnMinus.style.opacity = btnMinus.disabled ? '0.5' : '1';
      btnPlus.style.opacity = btnPlus.disabled ? '0.5' : '1';
    });

    // Calcular características derivadas
    calcularCaracteristicasDerivadas();
    atualizarPreview();
  }

  // Calcular PV, PM, CA
  function calcularCaracteristicasDerivadas() {
    try {
      console.log('🧮 Calculando características derivadas (CORRIGIDO)...');

      const classeSelect = document.getElementById('classe_id');
      const constituicao = parseInt(document.getElementById('constituicao').value) || 10;
      const destreza = parseInt(document.getElementById('destreza').value) || 10;
      const nivel = parseInt(document.getElementById('nivel').value) || 1;

      console.log(`Dados para cálculo: CON=${constituicao}, DES=${destreza}, Nível=${nivel}`);

      // Verificar se uma classe está selecionada
      if (!classeSelect.value || classeSelect.selectedOptions.length === 0) {
        console.log('⚠️ Nenhuma classe selecionada, usando valores padrão');

        // Valores padrão quando não há classe
        const modCon = Math.floor((constituicao - 10) / 2);
        const modDes = Math.floor((destreza - 10) / 2);

        document.getElementById('pontos_vida').value = Math.max(1, 8 + modCon);
        document.getElementById('pontos_mana').value = 0;
        document.getElementById('ca').value = 10 + modDes;
        return;
      }

      const option = classeSelect.selectedOptions[0];
      const classeNome = option.textContent.toLowerCase().trim();

      console.log(`Classe selecionada: "${classeNome}"`);

      // Buscar características da classe no mapeamento
      const caracteristicasClasse = CARACTERISTICAS_CLASSES[classeNome];

      if (!caracteristicasClasse) {
        console.warn(`⚠️ Características não encontradas para a classe "${classeNome}"`);
        console.log('Classes disponíveis:', Object.keys(CARACTERISTICAS_CLASSES));

        // Fallback para valores padrão
        const modCon = Math.floor((constituicao - 10) / 2);
        const modDes = Math.floor((destreza - 10) / 2);

        document.getElementById('pontos_vida').value = Math.max(1, 12 + modCon);
        document.getElementById('pontos_mana').value = 12;
        document.getElementById('ca').value = 10 + modDes;
        return;
      }

      console.log(`Características da classe encontradas:`, caracteristicasClasse);

      // Calcular modificador de Constituição
      const modCon = Math.floor((constituicao - 10) / 2);
      const modDes = Math.floor((destreza - 10) / 2);

      // ============================================
      // CÁLCULO CORRETO DOS PONTOS DE VIDA
      // ============================================
      // Fórmula: PV iniciais + mod CON + ((nível - 1) × (PV por nível + mod CON))
      const pvIniciais = caracteristicasClasse.pv_inicial + modCon;
      const pvPorNivel = caracteristicasClasse.pv_por_nivel + modCon;
      const pvTotal = pvIniciais + ((nivel - 1) * pvPorNivel);
      const pvFinal = Math.max(1, pvTotal);

      console.log(`Cálculo PV: ${caracteristicasClasse.pv_inicial} + ${modCon} + ((${nivel} - 1) × (${caracteristicasClasse.pv_por_nivel} + ${modCon})) = ${pvFinal}`);

      // ============================================
      // CÁLCULO CORRETO DOS PONTOS DE MANA
      // ============================================
      // Fórmula: PM por nível × nível atual
      const pmTotal = caracteristicasClasse.pm_por_nivel * nivel;

      console.log(`Cálculo PM: ${caracteristicasClasse.pm_por_nivel} × ${nivel} = ${pmTotal}`);

      // ============================================
      // CÁLCULO DA CLASSE DE ARMADURA
      // ============================================
      // Fórmula: 10 + modificador de Destreza
      const caFinal = 10 + modDes;

      console.log(`Cálculo CA: 10 + ${modDes} = ${caFinal}`);

      // Atualizar os campos no formulário
      document.getElementById('pontos_vida').value = pvFinal;
      document.getElementById('pontos_mana').value = pmTotal;
      document.getElementById('ca').value = caFinal;

      console.log(`✅ Características calculadas: PV=${pvFinal}, PM=${pmTotal}, CA=${caFinal}`);

    } catch (error) {
      console.error('❌ Erro ao calcular características derivadas:', error);

      // Valores de fallback em caso de erro
      const constituicao = parseInt(document.getElementById('constituicao').value) || 10;
      const destreza = parseInt(document.getElementById('destreza').value) || 10;
      const modCon = Math.floor((constituicao - 10) / 2);
      const modDes = Math.floor((destreza - 10) / 2);

      document.getElementById('pontos_vida').value = Math.max(1, 8 + modCon);
      document.getElementById('pontos_mana').value = 0;
      document.getElementById('ca').value = 10 + modDes;
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

    const previewNome = document.getElementById('previewNome');
    const previewClasseRaca = document.getElementById('previewClasseRaca');

    if (previewNome) previewNome.textContent = nome;
    if (previewClasseRaca) previewClasseRaca.textContent = `${classeNome} ${racaNome} - Nível ${nivel}`;

    // Atualizar atributos no preview
    const attrsPreview = document.getElementById('attrsPreview');
    if (attrsPreview) {
      attrsPreview.innerHTML = '';

      atributos.forEach(attr => {
        const valor = document.getElementById(attr).value;
        const bonusElement = document.getElementById('bonus-' + attr);
        const modificador = bonusElement ? bonusElement.textContent : '+0';
        const nome = attr.charAt(0).toUpperCase() + attr.slice(1);

        const div = document.createElement('div');
        div.className = 'attr-preview';
        div.innerHTML = `
          <span class="label">${nome}:</span>
          <span class="value">${valor} (${modificador})</span>
        `;
        attrsPreview.appendChild(div);
      });
    }

    // Atualizar características derivadas no preview
    const derivadasPreview = document.getElementById('derivadasPreview');
    if (derivadasPreview) {
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

    // Atualizar preview de poderes
    atualizarPreviewPoderes();
  }

  // Event listeners para atributos (sempre funcionais)
  document.querySelectorAll('.attr-btn').forEach(btn => {
    btn.addEventListener('click', function () {
      const attr = this.dataset.attr;
      const input = document.getElementById(attr);
      const valor = parseInt(input.value);

      if (this.classList.contains('plus') && valor < 20) {
        input.value = valor + 1;
      } else if (this.classList.contains('minus') && valor > 3) {
        input.value = valor - 1;
      }

      // Atualizar valor base quando não há raça selecionada ou quando ajustando manualmente
      if (!racaSelect.value || !bonusRacialAplicado) {
        input.dataset.valorBase = input.value;
      }

      atualizarCalculos();
    });
  });

  // Event listener para mudança de raça
  racaSelect.addEventListener('change', function () {
    console.log('🔄 Trocando raça para:', this.selectedOptions[0]?.textContent || 'Nenhuma');
    debugAtributos('Antes do reset');

    bonusRacialAplicado = false;
    bonusLivresDisponiveis = 0;
    bonusLivresUsados = 0;
    poderesRaciaisCarregados = [];

    // RESETAR todos os atributos para valores base antes de aplicar nova raça
    atributos.forEach(attr => {
      const input = document.getElementById(attr);
      // Se não há valor base definido, assumir o valor atual como base
      if (!input.dataset.valorBase) {
        input.dataset.valorBase = input.value;
      }
      // Resetar para o valor base (sem bônus raciais)
      input.value = parseInt(input.dataset.valorBase);
    });

    debugAtributos('Após reset');

    // Esconder interface de bônus livres
    const bonusInterface = document.getElementById('bonus-livres-interface');
    if (bonusInterface) {
      bonusInterface.style.display = 'none';
    }

    // Aplicar novos bônus da raça selecionada
    if (this.value) {
      setTimeout(() => {
        aplicarBonusRacial();
        carregarPoderesRaciais(this.value);
        debugAtributos('Após aplicar bônus');
      }, 100);
    } else {
      // Se nenhuma raça selecionada, apenas atualizar cálculos
      esconderPoderesRaciais();
      atualizarCalculos();
    }
  });

  // Event listeners para outros campos
  document.getElementById('classe_id').addEventListener('change', function () {
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

  // Event listeners para seleção de poderes
  document.addEventListener('change', function (e) {
    if (e.target.classList.contains('poder-checkbox')) {
      atualizarPreviewPoderes();
    }
  });

  // Reset form
  const resetBtn = document.getElementById('resetForm');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      if (confirm('Tem certeza que deseja resetar o formulário? Todos os dados serão perdidos.')) {
        document.getElementById('characterForm').reset();
        bonusRacialAplicado = false;
        bonusLivresDisponiveis = 0;
        bonusLivresUsados = 0;
        poderesRaciaisCarregados = [];

        atributos.forEach(attr => {
          const input = document.getElementById(attr);
          input.value = 10; // Iniciar em 10
          input.dataset.valorBase = 10;
        });

        // Esconder interface de bônus livres
        const bonusInterface = document.getElementById('bonus-livres-interface');
        if (bonusInterface) {
          bonusInterface.remove();
        }

        // Esconder poderes raciais
        esconderPoderesRaciais();

        atualizarCalculos();
      }
    });
  }

  // Inicializar valores base em 10
  atributos.forEach(attr => {
    const input = document.getElementById(attr);
    input.value = 10; // Iniciar em 10
    input.dataset.valorBase = 10;
  });

  // Inicializar
  atualizarCalculos();

  // Elementos principais
  const searchInput = document.getElementById('powersSearchInput');
  const searchResults = document.getElementById('powersSearchResults');
  const quickFilterBtns = document.querySelectorAll('.quick-filter-btn');
  const powerCards = document.querySelectorAll('.power-card');
  const powerSections = document.querySelectorAll('.power-type-section');
  const toggleBtns = document.querySelectorAll('.power-type-toggle');
  const checkboxes = document.querySelectorAll('.power-checkbox-filter');

  // Função de busca em tempo real
  function initSearch() {
    if (!searchInput) return;

    let searchTimeout;

    searchInput.addEventListener('input', function () {
      clearTimeout(searchTimeout);
      const query = this.value.toLowerCase().trim();

      searchTimeout = setTimeout(() => {
        if (query.length >= 2) {
          performSearch(query);
          showSearchResults(query);
        } else {
          hideSearchResults();
          showAllPowers();
        }
      }, 300);
    });

    // Fechar resultados ao clicar fora
    document.addEventListener('click', function (e) {
      if (!e.target.closest('.powers-search-box')) {
        hideSearchResults();
      }
    });
  }

  function performSearch(query) {
    let hasResults = false;

    powerCards.forEach(card => {
      const checkbox = card.closest('label').querySelector('.power-checkbox-filter');
      const name = checkbox.dataset.name || '';
      const description = checkbox.dataset.description || '';
      const type = checkbox.dataset.type || '';

      const matches = name.includes(query) ||
        description.includes(query) ||
        type.includes(query);

      if (matches) {
        card.closest('label').style.display = 'block';
        card.classList.remove('hidden');
        hasResults = true;
      } else {
        card.closest('label').style.display = 'none';
        card.classList.add('hidden');
      }
    });

    // Mostrar/ocultar seções baseado nos resultados
    powerSections.forEach(section => {
      const visibleCards = section.querySelectorAll('.power-card:not(.hidden)');
      section.style.display = visibleCards.length > 0 ? 'block' : 'none';
    });

    return hasResults;
  }

  function showSearchResults(query) {
    if (!searchResults) return;

    // Aqui você poderia implementar uma lista de sugestões
    // Por simplicidade, apenas mostramos se há resultados
    const hasResults = performSearch(query);

    if (!hasResults) {
      searchResults.innerHTML = `
        <div class="search-result-item">
          <span style="color: var(--text-muted); font-style: italic;">
            🔍 Nenhum poder encontrado para "${query}"
          </span>
        </div>
      `;
      searchResults.classList.add('active');
    } else {
      hideSearchResults();
    }
  }

  function hideSearchResults() {
    if (searchResults) {
      searchResults.classList.remove('active');
    }
  }

  function showAllPowers() {
    powerCards.forEach(card => {
      card.closest('label').style.display = 'block';
      card.classList.remove('hidden');
    });

    powerSections.forEach(section => {
      section.style.display = 'block';
    });
  }

  // Filtros rápidos
  function initQuickFilters() {
    quickFilterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        // Remover active de todos
        quickFilterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filterType = this.dataset.filter;

        // Limpar busca
        if (searchInput) {
          searchInput.value = '';
          hideSearchResults();
        }

        // Aplicar filtro
        if (filterType === 'all') {
          showAllPowers();
        } else {
          powerSections.forEach(section => {
            if (section.dataset.type === filterType) {
              section.style.display = 'block';
              section.querySelectorAll('.power-card').forEach(card => {
                card.closest('label').style.display = 'block';
                card.classList.remove('hidden');
              });
            } else {
              section.style.display = 'none';
            }
          });
        }
      });
    });
  }

  // Toggle de seções
  function initToggleButtons() {
    toggleBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const targetType = this.dataset.target;
        const grid = document.getElementById(`powersGrid-${targetType}`);
        const icon = this.querySelector('.toggle-icon');

        if (grid) {
          if (grid.style.display === 'none') {
            grid.style.display = 'grid';
            icon.textContent = '📂';
            grid.parentElement.classList.add('expanding');
          } else {
            grid.style.display = 'none';
            icon.textContent = '📁';
            grid.parentElement.classList.remove('expanding');
          }
        }
      });
    });
  }

  // Carregar poderes raciais via AJAX
  function loadRacialPowers(racaId) {
    const racialSection = document.getElementById('racialPowersSection');
    const racialList = document.getElementById('racialPowersList');

    if (!racaId) {
      racialSection.style.display = 'none';
      return;
    }

    // Mostrar loading
    racialList.innerHTML = `
      <div class="powers-loading">
        <div class="powers-loading-spinner">⏳</div>
        <p>Carregando poderes raciais...</p>
      </div>
    `;
    racialSection.style.display = 'block';

    fetch(`/api/racas/${racaId}/poderes`)
      .then(response => response.json())
      .then(data => {
        if (data.success && data.poderes.length > 0) {
          displayRacialPowers(data.poderes);
        } else {
          racialSection.style.display = 'none';
        }
      })
      .catch(error => {
        console.error('Erro ao carregar poderes raciais:', error);
        racialList.innerHTML = `
          <div class="powers-empty-state">
            <div class="powers-empty-icon">❌</div>
            <h4 class="powers-empty-title">Erro ao Carregar</h4>
            <p class="powers-empty-description">
              Não foi possível carregar os poderes raciais.
            </p>
          </div>
        `;
      });
  }

  function displayRacialPowers(poderes) {
    const racialList = document.getElementById('racialPowersList');

    racialList.innerHTML = poderes.map(poder => `
      <div class="racial-power-card">
        <div class="racial-power-badge">🧬 Automático</div>
        <h5 class="racial-power-name">✨ ${poder.nome}</h5>
        <p class="racial-power-description">${poder.descricao}</p>
        ${poder.pre_requisitos ? `
          <div class="power-detail-item" style="margin-top: 0.8rem;">
            <span class="power-detail-label">📋</span>
            <span class="power-detail-value"><strong>Pré-requisitos:</strong> ${poder.pre_requisitos}</span>
          </div>
        ` : ''}
        ${poder.custo_pm && poder.custo_pm > 0 ? `
          <div class="power-detail-item" style="margin-top: 0.5rem;">
            <span class="power-detail-label">💙</span>
            <span class="power-detail-value"><strong>Custo:</strong> ${poder.custo_pm} PM</span>
          </div>
        ` : ''}
      </div>
    `).join('');
  }

  // Atualizar preview quando poderes forem selecionados
  function updatePowersPreview() {
    // Esta função será chamada pelo script principal do character-create
    // para atualizar o preview dos poderes selecionados
    const selectedPowers = [];

    // Poderes raciais
    const racialCards = document.querySelectorAll('.racial-power-card');
    racialCards.forEach(card => {
      const name = card.querySelector('.racial-power-name').textContent;
      selectedPowers.push(`🧬 ${name} (Racial)`);
    });

    // Poderes selecionados
    checkboxes.forEach(checkbox => {
      if (checkbox.checked) {
        const card = checkbox.closest('label').querySelector('.power-card');
        const name = card.querySelector('.power-card-name').textContent;
        selectedPowers.push(`⚡ ${name} (Escolhido)`);
      }
    });

    // Atualizar preview (esta função deve existir no script principal)
    if (typeof atualizarPreviewPoderes === 'function') {
      atualizarPreviewPoderes();
    }
  }

  // Event listener para mudança de raça - Poderes
  if (racaSelect) {
    racaSelect.addEventListener('change', function () {
      loadRacialPowers(this.value);
    });

    // Carregar poderes da raça já selecionada (se houver)
    if (racaSelect.value) {
      loadRacialPowers(racaSelect.value);
    }
  }

  // Event listeners para checkboxes
  checkboxes.forEach(checkbox => {
    checkbox.addEventListener('change', updatePowersPreview);
  });

  // Variáveis globais para perícias
  let periciasSelecionadas = [];
  let periciasClasseCarregadas = [];
  let bonusPericiasPorInteligencia = 0;

  // Função para carregar perícias da classe
  async function carregarPericiasClasse(classeId) {
    try {
      console.log('📚 Carregando perícias de classe para ID:', classeId);

      const response = await fetch(`/api/classes/${classeId}/pericias?tipo=todas`);
      if (!response.ok) {
        throw new Error('Erro ao carregar perícias de classe');
      }

      const data = await response.json();
      if (data.success) {
        periciasClasseCarregadas = data.pericias || [];
        exibirPericiasClasse(periciasClasseCarregadas);
        console.log('✅ Perícias de classe carregadas:', periciasClasseCarregadas.length);
      } else {
        console.warn('⚠️ Nenhuma perícia de classe encontrada');
        periciasClasseCarregadas = [];
        esconderPericiasClasse();
      }
    } catch (error) {
      console.error('❌ Erro ao carregar perícias de classe:', error);
      periciasClasseCarregadas = [];
      esconderPericiasClasse();
    }
  }

  // Função para exibir perícias de classe
  function exibirPericiasClasse(pericias) {
    const secaoPericias = document.getElementById('classSkillsSection');
    const listaPericias = document.getElementById('classSkillsList');

    if (!secaoPericias || !listaPericias) return;

    if (pericias && pericias.length > 0) {
      listaPericias.innerHTML = '';

      // Separar perícias obrigatórias e opcionais
      const obrigatorias = pericias.filter(p => p.obrigatoria);
      const opcionais = pericias.filter(p => p.opcional && !p.obrigatoria);

      // Exibir perícias obrigatórias
      if (obrigatorias.length > 0) {
        const obrigatoriasSection = document.createElement('div');
        obrigatoriasSection.className = 'mandatory-skills-section';
        obrigatoriasSection.innerHTML = `
        <h5 class="mandatory-skills-title">
          <span>⚔️</span>
          Perícias Obrigatórias
          <span class="skills-count">(${obrigatorias.length})</span>
        </h5>
        <p class="mandatory-skills-description">
          Estas perícias são aplicadas automaticamente pela sua classe
        </p>
      `;

        const obrigatoriasGrid = document.createElement('div');
        obrigatoriasGrid.className = 'mandatory-skills-grid';

        obrigatorias.forEach(pericia => {
          const periciaCard = document.createElement('div');
          periciaCard.className = 'mandatory-skill-card';
          periciaCard.innerHTML = `
          <div class="mandatory-skill-header">
            <span class="skill-icon">${getSkillIcon(pericia.nome)}</span>
            <span class="skill-name">${pericia.nome}</span>
            <span class="skill-auto">🔧 Automática</span>
          </div>
          <p class="skill-attribute">
            ${getAttributeIcon(pericia.atributo_chave)} ${getAttributeName(pericia.atributo_chave)}
          </p>
          ${pericia.descricao ? `<p class="skill-description">${pericia.descricao}</p>` : ''}
        `;
          obrigatoriasGrid.appendChild(periciaCard);
        });

        obrigatoriasSection.appendChild(obrigatoriasGrid);
        listaPericias.appendChild(obrigatoriasSection);
      }

      // Exibir perícias opcionais
      if (opcionais.length > 0) {
        const opcionaisSection = document.createElement('div');
        opcionaisSection.className = 'optional-skills-section';
        opcionaisSection.innerHTML = `
        <h5 class="optional-skills-title">
          <span>📚</span>
          Perícias Opcionais da Classe
          <span class="skills-count">(${opcionais.length} disponíveis)</span>
        </h5>
        <p class="optional-skills-description">
          Você pode escolher essas perícias como opcionais ou por bônus de inteligência
        </p>
      `;

        const opcionaisGrid = document.createElement('div');
        opcionaisGrid.className = 'optional-skills-grid';

        opcionais.forEach(pericia => {
          const periciaCard = document.createElement('div');
          periciaCard.className = 'optional-skill-card';
          periciaCard.innerHTML = `
          <label class="optional-skill-label">
            <input type="checkbox" name="pericias_opcionais" value="${pericia.id}" class="optional-skill-checkbox">
            <div class="optional-skill-content">
              <div class="optional-skill-header">
                <span class="skill-icon">${getSkillIcon(pericia.nome)}</span>
                <span class="skill-name">${pericia.nome}</span>
              </div>
              <p class="skill-attribute">
                ${getAttributeIcon(pericia.atributo_chave)} ${getAttributeName(pericia.atributo_chave)}
              </p>
              ${pericia.descricao ? `<p class="skill-description">${pericia.descricao}</p>` : ''}
            </div>
          </label>
        `;
          opcionaisGrid.appendChild(periciaCard);
        });

        opcionaisSection.appendChild(opcionaisGrid);
        listaPericias.appendChild(opcionaisSection);
      }

      secaoPericias.style.display = 'block';
      atualizarPreviewPericias();
    } else {
      esconderPericiasClasse();
    }
  }

  // Função para esconder perícias de classe
  function esconderPericiasClasse() {
    const secaoPericias = document.getElementById('classSkillsSection');
    if (secaoPericias) {
      secaoPericias.style.display = 'none';
    }
    atualizarPreviewPericias();
  }

  // Função para calcular e exibir perícias por inteligência
  function calcularPericiasInteligencia() {
    const inteligencia = parseInt(document.getElementById('inteligencia').value) || 10;
    const modificador = Math.floor((inteligencia - 10) / 2);
    bonusPericiasPorInteligencia = Math.max(0, modificador);

    const secaoPericias = document.getElementById('intelligenceSkillsSection');
    const contadorElement = document.getElementById('bonusSkillsCount');
    const gridElement = document.getElementById('intelligenceSkillsGrid');

    if (!secaoPericias || !contadorElement || !gridElement) return;

    if (bonusPericiasPorInteligencia > 0) {
      contadorElement.textContent = bonusPericiasPorInteligencia;
      secaoPericias.style.display = 'block';

      // Carregar todas as perícias disponíveis
      fetch('/api/pericias')
        .then(response => response.json())
        .then(data => {
          if (data.success) {
            exibirPericiasInteligencia(data.pericias);
          }
        })
        .catch(error => {
          console.error('Erro ao carregar perícias para inteligência:', error);
        });
    } else {
      secaoPericias.style.display = 'none';
    }
  }

  // Função para exibir perícias disponíveis por inteligência
  function exibirPericiasInteligencia(pericias) {
    const gridElement = document.getElementById('intelligenceSkillsGrid');
    if (!gridElement) return;

    gridElement.innerHTML = '';

    pericias.forEach(pericia => {
      const periciaCard = document.createElement('div');
      periciaCard.className = 'intelligence-skill-card';
      periciaCard.innerHTML = `
      <label class="intelligence-skill-label">
        <input type="checkbox" name="pericias_inteligencia" value="${pericia.id}" class="intelligence-skill-checkbox">
        <div class="intelligence-skill-content">
          <div class="intelligence-skill-header">
            <span class="skill-icon">${getSkillIcon(pericia.nome)}</span>
            <span class="skill-name">${pericia.nome}</span>
          </div>
          <p class="skill-attribute">
            ${getAttributeIcon(pericia.atributo_chave)} ${getAttributeName(pericia.atributo_chave)}
          </p>
          <p class="skill-category">${pericia.categoria}</p>
        </div>
      </label>
    `;
      gridElement.appendChild(periciaCard);
    });

    // Adicionar event listeners para limite de seleção
    const checkboxes = gridElement.querySelectorAll('.intelligence-skill-checkbox');
    checkboxes.forEach(checkbox => {
      checkbox.addEventListener('change', function () {
        const selecionados = Array.from(checkboxes).filter(cb => cb.checked);

        if (selecionados.length > bonusPericiasPorInteligencia) {
          this.checked = false;
          alert(`Você pode escolher apenas ${bonusPericiasPorInteligencia} perícia(s) por bônus de Inteligência!`);
        }

        atualizarPreviewPericias();
      });
    });
  }

  // Função para obter ícone da perícia
  function getSkillIcon(nome) {
    const nomeL = nome.toLowerCase();

    if (nomeL.includes('acrobacia')) return '🤸';
    if (nomeL.includes('atletismo')) return '💪';
    if (nomeL.includes('cavalgar')) return '🐎';
    if (nomeL.includes('furtividade')) return '👤';
    if (nomeL.includes('iniciativa')) return '⚡';
    if (nomeL.includes('ladinagem')) return '🔓';
    if (nomeL.includes('luta')) return '👊';
    if (nomeL.includes('pilotagem')) return '🚗';
    if (nomeL.includes('pontaria')) return '🏹';
    if (nomeL.includes('reflexos')) return '🤺';
    if (nomeL.includes('conhecimento')) return '📚';
    if (nomeL.includes('guerra')) return '⚔️';
    if (nomeL.includes('investigação')) return '🔍';
    if (nomeL.includes('misticismo')) return '🔮';
    if (nomeL.includes('nobreza')) return '👑';
    if (nomeL.includes('ofício')) return '🔨';
    if (nomeL.includes('religião')) return '🙏';
    if (nomeL.includes('adestramento')) return '🐕';
    if (nomeL.includes('atuação')) return '🎭';
    if (nomeL.includes('diplomacia')) return '🤝';
    if (nomeL.includes('enganação')) return '🎭';
    if (nomeL.includes('intimidação')) return '😠';
    if (nomeL.includes('jogatina')) return '🎲';
    if (nomeL.includes('cura')) return '💚';
    if (nomeL.includes('intuição')) return '💡';
    if (nomeL.includes('percepção')) return '👁️';
    if (nomeL.includes('sobrevivência')) return '🏕️';
    if (nomeL.includes('fortitude')) return '🛡️';
    if (nomeL.includes('vontade')) return '🧠';

    return '🎯';
  }

  // Função para obter ícone do atributo
  function getAttributeIcon(atributo) {
    switch (atributo) {
      case 'for': return '💪';
      case 'des': return '🏃';
      case 'con': return '❤️';
      case 'int': return '🧠';
      case 'sab': return '🧙';
      case 'car': return '😎';
      default: return '🎯';
    }
  }

  // Função para obter nome do atributo
  function getAttributeName(atributo) {
    switch (atributo) {
      case 'for': return 'Força';
      case 'des': return 'Destreza';
      case 'con': return 'Constituição';
      case 'int': return 'Inteligência';
      case 'sab': return 'Sabedoria';
      case 'car': return 'Carisma';
      default: return atributo;
    }
  }

  // Função para atualizar preview de perícias
  function atualizarPreviewPericias() {
    const previewPericias = document.getElementById('previewPericias');
    const periciasPreview = document.getElementById('periciasPreview');

    if (!previewPericias || !periciasPreview) return;

    // Coletar perícias obrigatórias
    const periciasObrigatorias = [];
    periciasClasseCarregadas.filter(p => p.obrigatoria).forEach(pericia => {
      periciasObrigatorias.push(`⚔️ ${pericia.nome} (Classe)`);
    });

    // Coletar perícias opcionais selecionadas
    const periciasOpcionais = [];
    const checkboxesOpcionais = document.querySelectorAll('input[name="pericias_opcionais"]:checked');
    checkboxesOpcionais.forEach(checkbox => {
      const nome = checkbox.closest('.optional-skill-card').querySelector('.skill-name').textContent;
      periciasOpcionais.push(`📚 ${nome} (Opcional)`);
    });

    // Coletar perícias por inteligência
    const periciasInteligencia = [];
    const checkboxesInt = document.querySelectorAll('input[name="pericias_inteligencia"]:checked');
    checkboxesInt.forEach(checkbox => {
      const nome = checkbox.closest('.intelligence-skill-card').querySelector('.skill-name').textContent;
      periciasInteligencia.push(`🧠 ${nome} (Inteligência)`);
    });

    // Combinar todas as perícias
    const todasPericias = [...periciasObrigatorias, ...periciasOpcionais, ...periciasInteligencia];

    if (todasPericias.length > 0) {
      periciasPreview.innerHTML = todasPericias.map(pericia =>
        `<div class="pericia-preview-item">${pericia}</div>`
      ).join('');
      previewPericias.style.display = 'block';
    } else {
      previewPericias.style.display = 'none';
    }
  }

  // Função para busca de perícias
  function initSkillsSearch() {
    const searchInput = document.getElementById('skillsSearchInput');
    const skillCards = document.querySelectorAll('.skill-info-card');
    const skillSections = document.querySelectorAll('.skill-category-section');

    if (!searchInput) return;

    let searchTimeout;

    searchInput.addEventListener('input', function () {
      clearTimeout(searchTimeout);
      const query = this.value.toLowerCase().trim();

      searchTimeout = setTimeout(() => {
        if (query.length >= 2) {
          performSkillsSearch(query);
        } else {
          showAllSkills();
        }
      }, 300);
    });

    function performSkillsSearch(query) {
      let hasResults = false;

      skillCards.forEach(card => {
        const name = card.querySelector('.skill-card-name').textContent.toLowerCase();
        const attribute = card.querySelector('.skill-card-attribute').textContent.toLowerCase();
        const description = card.querySelector('.skill-card-description')?.textContent.toLowerCase() || '';

        const matches = name.includes(query) || attribute.includes(query) || description.includes(query);

        if (matches) {
          card.style.display = 'block';
          hasResults = true;
        } else {
          card.style.display = 'none';
        }
      });

      // Mostrar/ocultar seções baseado nos resultados
      skillSections.forEach(section => {
        const visibleCards = section.querySelectorAll('.skill-info-card:not([style*="display: none"])');
        section.style.display = visibleCards.length > 0 ? 'block' : 'none';
      });
    }

    function showAllSkills() {
      skillCards.forEach(card => {
        card.style.display = 'block';
      });

      skillSections.forEach(section => {
        section.style.display = 'block';
      });
    }
  }

  // Função para filtros rápidos por atributo
  function initSkillsQuickFilters() {
    const quickFilterBtns = document.querySelectorAll('.quick-filter-btn');
    const skillCards = document.querySelectorAll('.skill-info-card');
    const skillSections = document.querySelectorAll('.skill-category-section');

    quickFilterBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        // Remover active de todos
        quickFilterBtns.forEach(b => b.classList.remove('active'));
        this.classList.add('active');

        const filterAttribute = this.dataset.filter;

        // Aplicar filtro
        if (filterAttribute === 'all') {
          skillCards.forEach(card => {
            card.style.display = 'block';
          });
          skillSections.forEach(section => {
            section.style.display = 'block';
          });
        } else {
          skillCards.forEach(card => {
            const cardAttribute = card.dataset.attribute;
            if (cardAttribute === filterAttribute) {
              card.style.display = 'block';
            } else {
              card.style.display = 'none';
            }
          });

          // Mostrar/ocultar seções
          skillSections.forEach(section => {
            const visibleCards = section.querySelectorAll('.skill-info-card:not([style*="display: none"])');
            section.style.display = visibleCards.length > 0 ? 'block' : 'none';
          });
        }
      });
    });
  }

  // Função para toggle de seções de perícias
  function initSkillsToggleButtons() {
    const toggleBtns = document.querySelectorAll('.skill-category-toggle');

    toggleBtns.forEach(btn => {
      btn.addEventListener('click', function () {
        const targetCategory = this.dataset.target;
        const grid = document.getElementById(`skillsGrid-${targetCategory}`);
        const icon = this.querySelector('.toggle-icon');

        if (grid) {
          if (grid.style.display === 'none') {
            grid.style.display = 'grid';
            icon.textContent = '📂';
          } else {
            grid.style.display = 'none';
            icon.textContent = '📁';
          }
        }
      });
    });
  }

  // Event listeners para mudança de classe
  document.getElementById('classe_id').addEventListener('change', function () {
    if (this.value) {
      carregarPericiasClasse(this.value);
    } else {
      esconderPericiasClasse();
    }
  });

  // Event listeners para mudança de inteligência
  document.getElementById('inteligencia').addEventListener('change', calcularPericiasInteligencia);

  // Event listeners para perícias selecionadas
  document.addEventListener('change', function (e) {
    if (e.target.classList.contains('optional-skill-checkbox') ||
      e.target.classList.contains('intelligence-skill-checkbox')) {
      atualizarPreviewPericias();
    }
  });


  // Inicializar todas as funcionalidades
  initSearch();
  initQuickFilters();
  initToggleButtons();
  initSkillsSearch();
  initSkillsQuickFilters();
  initSkillsToggleButtons();

  // Calcular perícias de inteligência inicial
  calcularPericiasInteligencia();

  console.log('✅ Sistema de perícias inicializado');
  console.log('✅ Sistema de poderes avançado inicializado');
  console.log('✅ Sistema de criação livre inicializado');
  console.log('🔧 Correção aplicada: Reset automático ao trocar raças');
  console.log('📋 Funcionalidades: Distribuição livre, bônus raciais dobrados, reset correto');
  console.log('✨ Nova funcionalidade: Poderes raciais automáticos');
});

