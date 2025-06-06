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
        exibirPericiasOpcionaisClasse(periciasClasseCarregadas); // USAR A NOVA FUNÇÃO
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

  function exibirPericiasOpcionaisClasse(pericias) {
    const classSkillsSection = document.getElementById('classSkillsSection');
    const listaPericias = document.getElementById('classSkillsList');

    if (!classSkillsSection || !listaPericias) return;

    if (pericias && pericias.length > 0) {
      // Separar perícias obrigatórias e opcionais
      const obrigatorias = pericias.filter(p => p.obrigatoria);
      const opcionais = pericias.filter(p => p.opcional && !p.obrigatoria);

      listaPericias.innerHTML = '';

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

      // Exibir perícias opcionais com INPUTS CORRETOS
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
          Você pode escolher essas perícias como parte da sua classe
        </p>
      `;

        const opcionaisGrid = document.createElement('div');
        opcionaisGrid.className = 'optional-skills-grid';

        opcionais.forEach(pericia => {
          const periciaCard = document.createElement('div');
          periciaCard.className = 'optional-skill-card';
          periciaCard.innerHTML = `
          <label class="optional-skill-label">
            <input type="checkbox" name="pericias_selecionadas" value="${pericia.id}" class="optional-skill-checkbox">
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

        // Adicionar event listeners
        const checkboxes = opcionaisGrid.querySelectorAll('.optional-skill-checkbox');
        checkboxes.forEach(checkbox => {
          checkbox.addEventListener('change', function () {
            const card = this.closest('.optional-skill-label');
            if (this.checked) {
              card.classList.add('selected');
            } else {
              card.classList.remove('selected');
            }
            atualizarPreviewPericias();
          });
        });

        opcionaisSection.appendChild(opcionaisGrid);
        listaPericias.appendChild(opcionaisSection);
      }

      classSkillsSection.style.display = 'block';
      atualizarPreviewPericias();
    } else {
      esconderPericiasClasse();
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

  // Variáveis globais para magias
  let magiasDisponiveis = {};
  let magiasClasseCarregadas = [];
  let classeMagica = false;

  // Configurações de classes mágicas baseadas em magias.txt
  const CLASSES_MAGICAS = {
    'arcanista': {
      tipos: ['Arcana', 'Universal'],
      circulos: {
        1: 1,   // 1º círculo: 1º nível
        2: 5,   // 2º círculo: 5º nível
        3: 9,   // 3º círculo: 9º nível
        4: 13,  // 4º círculo: 13º nível
        5: 17   // 5º círculo: 17º nível
      }
    },
    'bardo': {
      tipos: ['Arcana', 'Universal'],
      circulos: {
        1: 1,   // 1º círculo: 1º nível
        2: 6,   // 2º círculo: 6º nível
        3: 10,  // 3º círculo: 10º nível
        4: 14   // 4º círculo: 14º nível (sem 5º círculo)
      }
    },
    'clérigo': {
      tipos: ['Divina', 'Universal'],
      circulos: {
        1: 1,   // 1º círculo: 1º nível
        2: 5,   // 2º círculo: 5º nível
        3: 9,   // 3º círculo: 9º nível
        4: 13,  // 4º círculo: 13º nível
        5: 17   // 5º círculo: 17º nível
      }
    },
    'druida': {
      tipos: ['Divina', 'Universal'],
      circulos: {
        1: 1,   // 1º círculo: 1º nível
        2: 6,   // 2º círculo: 6º nível
        3: 10,  // 3º círculo: 10º nível
        4: 14   // 4º círculo: 14º nível (sem 5º círculo)
      }
    }
  };

  // Verificar se uma classe é mágica
  function isClassMagical(classeNome) {
    if (!classeNome) return false;
    return Object.keys(CLASSES_MAGICAS).includes(classeNome.toLowerCase());
  }

  // Verificar se um círculo está disponível para a classe/nível
  function isCircleAvailable(classeNome, circulo, nivel) {
    if (!classeNome) return false;

    const config = CLASSES_MAGICAS[classeNome.toLowerCase()];
    if (!config) return false;

    const nivelMinimo = config.circulos[circulo];
    if (!nivelMinimo) return false;

    return nivel >= nivelMinimo;
  }

  // Verificar se um tipo de magia está disponível para a classe
  function isSpellTypeAllowed(classeNome, tipoMagia) {
    if (!classeNome) return false;

    const config = CLASSES_MAGICAS[classeNome.toLowerCase()];
    if (!config) return false;

    return config.tipos.includes(tipoMagia);
  }

  // Função principal para verificar capacidade mágica da classe
  async function verificarCapacidadeMagica(classeId, classeNome, nivel) {
    try {
      console.log('🔮 Verificando capacidade mágica:', classeNome, 'nível', nivel);

      const classMagicCheck = document.getElementById('classMagicCheck');
      const magicCheckTitle = document.getElementById('magicCheckTitle');
      const magicCheckDescription = document.getElementById('magicCheckDescription');

      // Mostrar verificação
      if (classMagicCheck) {
        classMagicCheck.style.display = 'block';
        if (magicCheckTitle) magicCheckTitle.textContent = '🔮 Verificando Capacidade Mágica...';
        if (magicCheckDescription) magicCheckDescription.textContent = `Analisando se ${classeNome} pode lançar magias...`;
      }

      // Verificar se é classe mágica localmente primeiro
      classeMagica = isClassMagical(classeNome);

      if (classeMagica) {
        console.log(`✨ ${classeNome} identificada como classe mágica localmente`);

        // Verificar com o servidor
        const response = await fetch(`/api/classes/${classeId}/magica`);
        if (response.ok) {
          const data = await response.json();
          console.log('📡 Resposta do servidor:', data);

          if (data.success && data.isMagical) {
            // Atualizar interface para classe mágica
            if (magicCheckTitle) {
              magicCheckTitle.textContent = '🔮 Classe Mágica Detectada!';
            }
            if (magicCheckDescription) {
              magicCheckDescription.textContent = `${classeNome} pode lançar magias. Carregando magias disponíveis...`;
            }

            // Carregar magias da classe
            await carregarMagiasClasse(classeId, classeNome, nivel);
          } else {
            // Classe não é mágica no servidor
            console.warn(`⚠️ Classe ${classeNome} não é mágica segundo o servidor`);
            classeMagica = false;
            mostrarClasseNaoMagica(classeNome);
          }
        } else {
          console.error('❌ Erro na requisição ao servidor:', response.status);
          // Em caso de erro, tentar carregar mesmo assim
          await carregarMagiasClasse(classeId, classeNome, nivel);
        }
      } else {
        // Classe não é mágica
        console.log(`⚔️ ${classeNome} identificada como classe não-mágica`);
        mostrarClasseNaoMagica(classeNome);
      }

      // Esconder verificação após um tempo
      setTimeout(() => {
        if (classMagicCheck) {
          classMagicCheck.style.display = 'none';
        }
      }, 2000);

    } catch (error) {
      console.error('❌ Erro ao verificar capacidade mágica:', error);
      mostrarClasseNaoMagica(classeNome);
    }
  }

  // Exibir magias automáticas de classe - VERSÃO CORRIGIDA
  function exibirMagiasClasse(magias, classeNome, nivel) {
    console.log('🏛️ Exibindo magias de classe:', magias.length, 'magias para', classeNome);

    const classSpellsSection = document.getElementById('classSpellsSection');
    const classSpellsList = document.getElementById('classSpellsList');

    if (!classSpellsSection || !classSpellsList) {
      console.error('❌ Elementos de exibição de magias de classe não encontrados');
      console.log('- classSpellsSection:', !!classSpellsSection);
      console.log('- classSpellsList:', !!classSpellsList);
      return;
    }

    if (magias && magias.length > 0) {
      console.log('📋 Organizando', magias.length, 'magias por círculo...');

      classSpellsList.innerHTML = '';

      // Organizar por círculo
      const magiasPorCirculo = {};
      magias.forEach(magia => {
        const circulo = magia.circulo || 1;
        if (!magiasPorCirculo[circulo]) {
          magiasPorCirculo[circulo] = [];
        }
        magiasPorCirculo[circulo].push(magia);
      });

      console.log('🔘 Círculos encontrados:', Object.keys(magiasPorCirculo));

      // Criar seções por círculo
      Object.entries(magiasPorCirculo)
        .sort(([a], [b]) => parseInt(a) - parseInt(b))
        .forEach(([circulo, magiasCirculo]) => {
          console.log(`📚 Criando seção para ${circulo}º círculo com ${magiasCirculo.length} magias`);

          const circleSection = document.createElement('div');
          circleSection.className = 'class-spells-circle-section';

          const nivelMinimo = CLASSES_MAGICAS[classeNome.toLowerCase()]?.circulos[circulo] || 1;
          const podeAcessar = nivel >= nivelMinimo;

          circleSection.innerHTML = `
          <h5 class="class-spells-circle-title">
            <span>🔘</span>
            ${circulo}º Círculo
            ${!podeAcessar ? `<span class="level-requirement">⚠️ Requer Nível ${nivelMinimo}</span>` : ''}
            <span style="font-size: 0.8em; color: var(--text-muted);">(${magiasCirculo.length} magias)</span>
          </h5>
        `;

          const spellsGrid = document.createElement('div');
          spellsGrid.className = 'class-spells-grid';
          spellsGrid.style.cssText = `
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
          gap: 1rem;
          margin-top: 1rem;
          ${!podeAcessar ? 'opacity: 0.5;' : ''}
        `;

          magiasCirculo.forEach(magia => {
            const spellCard = document.createElement('div');
            spellCard.className = 'class-spell-card';
            spellCard.style.cssText = `
            background: var(--card-bg);
            border: 2px solid var(--accent-gold);
            border-radius: 8px;
            padding: 1rem;
            transition: all 0.3s ease;
          `;

            spellCard.innerHTML = `
            <div class="power-card-header" style="margin-bottom: 0.8rem;">
              <span class="power-card-icon" style="font-size: 1.5rem; margin-right: 0.5rem;">${getSpellIcon(magia.nome, magia.tipo)}</span>
              <span class="power-card-name" style="font-weight: bold; color: var(--accent-gold);">${magia.nome}</span>
              <span class="power-card-source" style="float: right; background: var(--accent-gold); color: var(--primary-bg); padding: 0.2rem 0.5rem; border-radius: 4px; font-size: 0.8rem;">🔧 Automática</span>
            </div>
            <div class="power-card-content">
              <p class="power-card-type" >${magia.escola || 'N/A'} • ${magia.tipo || 'N/A'}</p>
              <p class="power-card-description" >${magia.descricao || 'Sem descrição disponível'}</p>
              ${magia.custo_pm && magia.custo_pm > 0 ? 
              `<span class="power-detail-label" >💙 </span>
              <span class="power-detail-value">${magia.custo_pm} PM</span>` 
               : ''}
            <div>
              `;
            spellsGrid.appendChild(spellCard);
          });

          circleSection.appendChild(spellsGrid);
          classSpellsList.appendChild(circleSection);
        });

      classSpellsSection.style.display = 'block';
      console.log('✅ Seção de magias de classe exibida com sucesso');
    } else {
      console.log('⚠️ Nenhuma magia de classe para exibir');
      classSpellsSection.style.display = 'none';
    }
  }

  // Exibir seção de seleção de magias - VERSÃO CORRIGIDA
  function exibirSelecaoMagias(classeNome, nivel) {
    console.log('⚡ Exibindo seleção de magias para:', classeNome, 'nível', nivel);

    const spellSelectionSection = document.getElementById('spellSelectionSection');
    const spellSelectionDescription = document.getElementById('spellSelectionDescription');
    const spellCircleFilters = document.getElementById('spellCircleFilters');
    const spellTypeFilters = document.getElementById('spellTypeFilters');

    if (!spellSelectionSection) {
      console.error('❌ Elemento spellSelectionSection não encontrado');
      return;
    }

    const classConfig = CLASSES_MAGICAS[classeNome.toLowerCase()];
    if (!classConfig) {
      console.warn('⚠️ Configuração não encontrada para classe:', classeNome);
      spellSelectionSection.style.display = 'none';
      return;
    }

    console.log('📋 Configuração da classe:', classConfig);

    // Atualizar descrição
    if (spellSelectionDescription) {
      spellSelectionDescription.textContent = `Escolha magias ${classConfig.tipos.join(' e ')} para seu ${classeNome}`;
    }

    // Criar filtros de círculo
    if (spellCircleFilters) {
      let filtersHTML = `
      <button type="button" class="quick-filter-btn active" data-filter="all">
        ✨ Todas
      </button>
    `;

      Object.entries(classConfig.circulos).forEach(([circulo, nivelMinimo]) => {
        const podeAcessar = nivel >= nivelMinimo;
        filtersHTML += `
        <button type="button" class="quick-filter-btn ${!podeAcessar ? 'disabled' : ''}" data-filter="circle-${circulo}" ${!podeAcessar ? 'disabled' : ''}>
          🔘 ${circulo}º Círculo ${!podeAcessar ? `(Nível ${nivelMinimo}+)` : ''}
        </button>
      `;
      });

      spellCircleFilters.innerHTML = filtersHTML;
    }

    // Criar filtros de tipo
    if (spellTypeFilters) {
      const typeFiltersHtml = classConfig.tipos.map(tipo => {
        const icon = tipo === 'Arcana' ? '🔮' : tipo === 'Divina' ? '✨' : '🌟';
        return `
        <button type="button" class="quick-filter-btn" data-filter="type-${tipo.toLowerCase()}">
          ${icon} ${tipo}
        </button>
      `;
      }).join('');

      spellTypeFilters.innerHTML = `
      <button type="button" class="quick-filter-btn active" data-filter="all-types">
        ✨ Todos os Tipos
      </button>
      ${typeFiltersHtml}
    `;
    }

    // Exibir seção vazia por enquanto (magias serão carregadas via AJAX posteriormente)
    const spellsContainer = document.getElementById('spellsCirclesContainer');
    if (spellsContainer) {
      spellsContainer.innerHTML = `
      <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
        <p>🔮 Sistema de seleção de magias será implementado em breve</p>
        <p>Magias de classe automáticas estão funcionando!</p>
      </div>
    `;
    }

    spellSelectionSection.style.display = 'block';
    console.log('✅ Seção de seleção de magias exibida');
  }

  // Mostrar que a classe não é mágica - VERSÃO CORRIGIDA
  function mostrarClasseNaoMagica(classeNome) {
    console.log('⚔️ Exibindo classe não-mágica:', classeNome);

    const nonMagicalClass = document.getElementById('nonMagicalClass');
    const spellsEmptyState = document.getElementById('spellsEmptyState');

    esconderSecoesMagias();

    if (nonMagicalClass) {
      nonMagicalClass.style.display = 'block';
      const description = nonMagicalClass.querySelector('.non-magical-description');
      if (description && classeNome) {
        description.innerHTML = `
        A classe <strong>${classeNome}</strong> não possui acesso a magias.
        <br>
        <strong>Classes Mágicas:</strong> Arcanista, Bardo, Clérigo, Druida
      `;
      }
      console.log('✅ Seção de classe não-mágica exibida');
    } else {
      console.error('❌ Elemento nonMagicalClass não encontrado');
    }

    if (spellsEmptyState) {
      spellsEmptyState.style.display = 'none';
    }
  }

  // Esconder todas as seções de magias - VERSÃO CORRIGIDA
  function esconderSecoesMagias() {
    console.log('🙈 Escondendo todas as seções de magias...');

    const sections = [
      'classMagicCheck',
      'classSpellsSection',
      'spellSelectionSection',
      'nonMagicalClass'
    ];

    sections.forEach(id => {
      const element = document.getElementById(id);
      if (element) {
        element.style.display = 'none';
        console.log(`- ${id}: escondido`);
      } else {
        console.warn(`- ${id}: elemento não encontrado`);
      }
    });
  }

  // Mostrar estado inicial (selecionar classe) - VERSÃO CORRIGIDA
  function mostrarEstadoInicialMagias() {
    console.log('🎬 Mostrando estado inicial de magias...');

    const spellsEmptyState = document.getElementById('spellsEmptyState');

    esconderSecoesMagias();

    if (spellsEmptyState) {
      spellsEmptyState.style.display = 'block';
      console.log('✅ Estado inicial exibido');
    } else {
      console.error('❌ Elemento spellsEmptyState não encontrado');
    }
  }

  // Função para obter ícone de magia - VERSÃO MELHORADA
  function getSpellIcon(nome, tipo) {
    if (!nome) return '✨';

    const nomeL = nome.toLowerCase();

    // Ícones específicos por nome
    if (nomeL.includes('cura') || nomeL.includes('curar')) return '💚';
    if (nomeL.includes('fogo') || nomeL.includes('chama')) return '🔥';
    if (nomeL.includes('gelo') || nomeL.includes('frio')) return '❄️';
    if (nomeL.includes('raio') || nomeL.includes('relâmpago')) return '⚡';
    if (nomeL.includes('luz') || nomeL.includes('brilho')) return '☀️';
    if (nomeL.includes('trevas') || nomeL.includes('sombra')) return '🌑';
    if (nomeL.includes('proteção') || nomeL.includes('escudo')) return '🛡️';
    if (nomeL.includes('ilusão') || nomeL.includes('invisibilidade')) return '👻';
    if (nomeL.includes('voo') || nomeL.includes('voar')) return '🦅';
    if (nomeL.includes('teleporte') || nomeL.includes('portal')) return '🌀';
    if (nomeL.includes('invocação') || nomeL.includes('convocar')) return '👤';
    if (nomeL.includes('detecção') || nomeL.includes('detectar')) return '👁️';
    if (nomeL.includes('transformação') || nomeL.includes('forma')) return '🔄';
    if (nomeL.includes('explosão') || nomeL.includes('área')) return '💥';
    if (nomeL.includes('míssil') || nomeL.includes('projétil')) return '🎯';

    // Ícones por tipo
    switch (tipo) {
      case 'Arcana': return '🔮';
      case 'Divina': return '✨';
      case 'Universal': return '🌟';
      default: return '🔮';
    }
  }

  // FUNÇÃO DE DEBUG MELHORADA
  function debugMagicElements() {
    console.log('🔧 === DEBUG DOS ELEMENTOS DE MAGIA ===');

    const elementos = {
      'classMagicCheck': document.getElementById('classMagicCheck'),
      'magicCheckTitle': document.getElementById('magicCheckTitle'),
      'magicCheckDescription': document.getElementById('magicCheckDescription'),
      'classSpellsSection': document.getElementById('classSpellsSection'),
      'classSpellsList': document.getElementById('classSpellsList'),
      'spellSelectionSection': document.getElementById('spellSelectionSection'),
      'spellSelectionDescription': document.getElementById('spellSelectionDescription'),
      'spellCircleFilters': document.getElementById('spellCircleFilters'),
      'spellTypeFilters': document.getElementById('spellTypeFilters'),
      'spellsCirclesContainer': document.getElementById('spellsCirclesContainer'),
      'nonMagicalClass': document.getElementById('nonMagicalClass'),
      'spellsEmptyState': document.getElementById('spellsEmptyState')
    };

    console.log('📋 Elementos encontrados:');
    Object.entries(elementos).forEach(([nome, elemento]) => {
      console.log(`- ${nome}: ${elemento ? '✅ Existe' : '❌ NÃO EXISTE'}`);
      if (elemento) {
        console.log(`  - Visível: ${elemento.style.display !== 'none'}`);
        console.log(`  - Classes: ${elemento.className}`);
      }
    });

    // Verificar estrutura do HTML
    const magiasSection = document.querySelector('.spells-main-container');
    if (magiasSection) {
      console.log('📄 Estrutura da seção de magias encontrada');
      console.log('- Filhos diretos:', magiasSection.children.length);
    } else {
      console.error('❌ Seção principal de magias (.spells-main-container) NÃO ENCONTRADA!');
    }

    return elementos;
  }

  // Adicionar ao objeto window para debug
  if (typeof window !== 'undefined') {
    window.debugMagicElements = debugMagicElements;
    window.exibirMagiasClasse = exibirMagiasClasse;
    window.mostrarClasseNaoMagica = mostrarClasseNaoMagica;
    window.esconderSecoesMagias = esconderSecoesMagias;
  }

  // Carregar magias de uma classe específica
  async function carregarMagiasClasse(classeId, classeNome, nivel) {
    try {
      console.log('📚 Carregando magias disponíveis para a classe:', classeNome, 'nível', nivel);

      const response = await fetch(`/api/classes/${classeId}/magias?nivel=${nivel}`);
      if (!response.ok) {
        throw new Error(`Erro HTTP: ${response.status}`);
      }

      const data = await response.json();
      console.log('📡 Dados de magias recebidos:', data);

      if (data.success) {
        magiasClasseCarregadas = data.magias || [];

        // IMPORTANTE: Em Tormenta20, classes NÃO têm magias automáticas
        // Todas as magias devem ser escolhidas pelo jogador
        console.log(`✅ ${magiasClasseCarregadas.length} magias DISPONÍVEIS para escolha`);

        // Exibir magias disponíveis para seleção (não automáticas)
        exibirMagiasDisponiveis(magiasClasseCarregadas, classeNome, nivel);

      } else {
        console.warn('⚠️ Nenhuma magia disponível encontrada:', data.error || 'Sem detalhes');
        magiasClasseCarregadas = [];
        mostrarSemMagiasDisponiveis(classeNome, nivel);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar magias da classe:', error);
      magiasClasseCarregadas = [];
      esconderSecoesMagias();
    }
  }

  // NOVA FUNÇÃO: Exibir magias disponíveis para seleção (não automáticas)
  function exibirMagiasDisponiveis(magias, classeNome, nivel) {
    console.log('📋 Exibindo magias disponíveis para seleção:', magias.length, 'magias');

    const spellSelectionSection = document.getElementById('spellSelectionSection');
    const spellSelectionDescription = document.getElementById('spellSelectionDescription');
    const spellsCirclesContainer = document.getElementById('spellsCirclesContainer');

    if (!spellSelectionSection || !spellsCirclesContainer) {
      console.error('❌ Elementos de seleção de magias não encontrados');
      return;
    }

    const classConfig = CLASSES_MAGICAS[classeNome.toLowerCase()];
    if (!classConfig) {
      console.warn('⚠️ Configuração não encontrada para classe:', classeNome);
      spellSelectionSection.style.display = 'none';
      return;
    }

    // Esconder seção de magias automáticas (não existe em T20)
    const classSpellsSection = document.getElementById('classSpellsSection');
    if (classSpellsSection) {
      classSpellsSection.style.display = 'none';
    }

    // Atualizar descrição
    if (spellSelectionDescription) {
      spellSelectionDescription.innerHTML = `
      <strong>Escolha as magias que seu ${classeNome} conhece</strong><br>
      <small>Tipos permitidos: ${classConfig.tipos.join(' e ')} • Nível atual: ${nivel}</small>
    `;
    }

    // Configurar filtros
    configurarFiltrosMagias(classeNome, nivel);

    // Organizar magias por círculo
    const magiasPorCirculo = {};
    magias.forEach(magia => {
      const circulo = magia.circulo || 1;
      if (!magiasPorCirculo[circulo]) {
        magiasPorCirculo[circulo] = [];
      }
      magiasPorCirculo[circulo].push(magia);
    });

    console.log('🔘 Círculos de magias organizados:', Object.keys(magiasPorCirculo));

    // Criar HTML das magias por círculo
    let htmlCirculos = '';

    Object.entries(magiasPorCirculo)
      .sort(([a], [b]) => parseInt(a) - parseInt(b))
      .forEach(([circulo, magiasCirculo]) => {
        const nivelMinimo = classConfig.circulos[circulo] || 1;
        const podeAcessar = nivel >= nivelMinimo;

        htmlCirculos += `
        <div class="spell-circle-section" data-circle="${circulo}">
          <div class="spell-circle-header">
            <h5 class="spell-circle-title">
              <span>🔘</span>
              ${circulo}º Círculo
              ${!podeAcessar ? `<span class="level-requirement">⚠️ Requer Nível ${nivelMinimo}</span>` : ''}
              <span class="circle-count">(${magiasCirculo.length} disponíveis)</span>
            </h5>
            <button type="button" class="spell-circle-toggle" data-target="${circulo}">
              <span class="toggle-icon">📂</span>
            </button>
          </div>

          <div class="spells-selection-grid" id="spellsGrid-${circulo}" ${!podeAcessar ? 'style="opacity: 0.5; pointer-events: none;"' : ''}>
            ${criarCardsSelecaoMagias(magiasCirculo, podeAcessar)}
          </div>
        </div>
      `;
      });

    spellsCirclesContainer.innerHTML = htmlCirculos;

    // Adicionar event listeners para seleção
    adicionarEventListenersMagias();

    spellSelectionSection.style.display = 'block';
    console.log('✅ Magias disponíveis exibidas para seleção');
  }


  // Carregar todas as magias disponíveis do sistema
  async function carregarTodasMagias() {
    try {
      console.log('📖 Carregando todas as magias do sistema...');

      const response = await fetch('/api/magias');
      if (response.ok) {
        const data = await response.json();
        if (data.success) {
          magiasDisponiveis = data.magias || {};
          console.log('✅ Magias do sistema carregadas');
        } else {
          console.warn('⚠️ Falha ao carregar magias do sistema:', data.error);
        }
      } else {
        console.error('❌ Erro na requisição de magias:', response.status);
      }
    } catch (error) {
      console.error('❌ Erro ao carregar magias do sistema:', error);
      magiasDisponiveis = {};
    }
  }

  // Event listener para mudança de classe (para magias) - VERSÃO CORRIGIDA
  function initMagicSystem() {
    console.log('🔮 Inicializando sistema de magias...');

    const classeSelect = document.getElementById('classe_id');
    const nivelInput = document.getElementById('nivel');

    if (classeSelect) {
      // Remover listeners existentes para evitar duplicação
      classeSelect.removeEventListener('change', handleClassChange);
      classeSelect.addEventListener('change', handleClassChange);
    }

    if (nivelInput) {
      // Remover listeners existentes para evitar duplicação
      nivelInput.removeEventListener('change', handleLevelChange);
      nivelInput.addEventListener('change', handleLevelChange);
    }

    // Event listeners para seleção de magias
    document.addEventListener('change', function (e) {
      if (e.target.classList.contains('spell-checkbox') ||
        e.target.name === 'magias_selecionadas') {
        atualizarPreviewMagias();
      }
    });

    // Inicializar estado
    mostrarEstadoInicialMagias();

    console.log('✅ Sistema de magias inicializado');
  }

  // Função separada para handle de mudança de classe
  function handleClassChange() {
    const classeId = this.value;
    const classeNome = this.selectedOptions[0]?.textContent.trim();
    const nivelInput = document.getElementById('nivel');
    const nivel = parseInt(nivelInput?.value || 1);

    console.log('🔄 Classe alterada:', classeNome, 'ID:', classeId, 'Nível:', nivel);

    if (classeId && classeNome) {
      verificarCapacidadeMagica(classeId, classeNome, nivel);
    } else {
      mostrarEstadoInicialMagias();
    }
  }

  // Função separada para handle de mudança de nível
  function handleLevelChange() {
    const classeSelect = document.getElementById('classe_id');
    const classeId = classeSelect?.value;
    const classeNome = classeSelect?.selectedOptions[0]?.textContent.trim();
    const nivel = parseInt(this.value || 1);

    console.log('📊 Nível alterado:', nivel, 'Classe:', classeNome);

    if (classeId && classeNome && classeMagica) {
      verificarCapacidadeMagica(classeId, classeNome, nivel);
    }
  }

  // Garantir inicialização única
  let magicSystemInitialized = false;

  // Inicializar quando o DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function () {
      if (!magicSystemInitialized) {
        initMagicSystem();
        magicSystemInitialized = true;
      }
    });
  } else {
    if (!magicSystemInitialized) {
      initMagicSystem();
      magicSystemInitialized = true;
    }
  }

  // ========================================
  // PREVIEW DE MAGIAS - ADICIONAR AOS SCRIPTS
  // Adicionar estas funções aos character-create.js e character-edit.js
  // ========================================

  // Função para atualizar preview de magias no formulário
  function atualizarPreviewMagias() {
    const previewMagias = document.getElementById('previewMagias');
    const magiasPreview = document.getElementById('magiasPreview');

    if (!previewMagias || !magiasPreview) return;

    console.log('🔮 Atualizando preview de magias...');

    // Coletar magias de classe (automáticas)
    const magiasClasse = [];
    if (magiasClasseCarregadas && magiasClasseCarregadas.length > 0) {
      magiasClasseCarregadas.forEach(magia => {
        magiasClasse.push(`🔧 ${magia.nome} (${magia.circulo}º - Classe)`);
      });
    }

    // Coletar magias selecionadas pelo usuário
    const magiasEscolhidas = [];
    const checkboxes = document.querySelectorAll('input[name="magias_selecionadas"]:checked');
    checkboxes.forEach(checkbox => {
      const card = checkbox.closest('.spell-card, .spell-checkbox-label');
      if (card) {
        const nomeElement = card.querySelector('.spell-card-name, .spell-name');
        const circuloElement = card.querySelector('.spell-tag.circle');
        const nome = nomeElement ? nomeElement.textContent.trim() : 'Magia';
        const circulo = circuloElement ? circuloElement.textContent.trim() : '';
        magiasEscolhidas.push(`⚡ ${nome} ${circulo ? `(${circulo})` : ''} (Escolhida)`);
      }
    });

    // Coletar magias já existentes no personagem (para edição)
    const magiasExistentes = [];
    const existingCards = document.querySelectorAll('.character-spell-card');
    existingCards.forEach(card => {
      const nomeElement = card.querySelector('.character-spell-name, .spell-name');
      const fonteElement = card.querySelector('.spell-badge.source-class, .spell-badge.source-choice');
      if (nomeElement) {
        const nome = nomeElement.textContent.trim();
        const fonte = fonteElement ? (fonteElement.textContent.includes('Classe') ? '⚔️' : '⚡') : '📝';
        magiasExistentes.push(`${fonte} ${nome} (Atual)`);
      }
    });

    // Combinar todas as magias
    const todasMagias = [...magiasExistentes, ...magiasClasse, ...magiasEscolhidas];

    if (todasMagias.length > 0) {
      // Organizar por círculo se possível
      const magiasPorCirculo = {};
      todasMagias.forEach(magia => {
        const circuloMatch = magia.match(/(\d+)º/);
        const circulo = circuloMatch ? circuloMatch[1] : 'Outros';

        if (!magiasPorCirculo[circulo]) {
          magiasPorCirculo[circulo] = [];
        }
        magiasPorCirculo[circulo].push(magia);
      });

      let html = '';

      // Organizar por círculo
      const circulos = Object.keys(magiasPorCirculo).sort((a, b) => {
        if (a === 'Outros') return 1;
        if (b === 'Outros') return -1;
        return parseInt(a) - parseInt(b);
      });

      circulos.forEach(circulo => {
        if (magiasPorCirculo[circulo].length > 0) {
          html += `
          <div class="preview-spell-circle">
            <h6 style="color: var(--accent-gold); margin: 0.8rem 0 0.5rem 0; font-size: 0.9rem;">
              ${circulo !== 'Outros' ? `🔘 ${circulo}º Círculo` : '📝 Outras Magias'}
            </h6>
            <div class="preview-spells-list">
              ${magiasPorCirculo[circulo].map(magia =>
            `<div class="magia-preview-item">${magia}</div>`
          ).join('')}
            </div>
          </div>
        `;
        }
      });

      magiasPreview.innerHTML = html;
      previewMagias.style.display = 'block';
    } else {
      previewMagias.style.display = 'none';
    }

    console.log(`✅ Preview atualizado: ${todasMagias.length} magias`);
  }

  // Função para contar magias por tipo no preview
  function contarMagiasPorTipo() {
    const magiasCards = document.querySelectorAll('input[name="magias_selecionadas"]:checked');
    const contadores = {
      arcana: 0,
      divina: 0,
      universal: 0,
      total: magiasClasseCarregadas.length + magiasCards.length
    };

    // Contar magias de classe
    if (magiasClasseCarregadas) {
      magiasClasseCarregadas.forEach(magia => {
        const tipo = (magia.tipo || '').toLowerCase();
        if (contadores.hasOwnProperty(tipo)) {
          contadores[tipo]++;
        }
      });
    }

    // Contar magias selecionadas
    magiasCards.forEach(checkbox => {
      const tipo = checkbox.dataset.type || '';
      if (contadores.hasOwnProperty(tipo)) {
        contadores[tipo]++;
      }
    });

    return contadores;
  }

  // Função para validar seleção de magias
  function validarSelecaoMagias() {
    console.log('🔍 Validando seleção de magias...');

    const classeSelect = document.getElementById('classe_id');
    const nivelInput = document.getElementById('nivel');

    if (!classeSelect || !nivelInput) {
      console.log('⚠️ Elementos de classe ou nível não encontrados');
      return true;
    }

    const classeNome = classeSelect.selectedOptions[0]?.textContent.trim().toLowerCase();
    const nivel = parseInt(nivelInput.value || 1);

    if (!classeMagica || !classeNome) {
      console.log('✅ Validação dispensada - classe não-mágica');
      return true;
    }

    const classConfig = CLASSES_MAGICAS[classeNome];
    if (!classConfig) {
      console.log('✅ Validação dispensada - configuração de classe não encontrada');
      return true;
    }

    // Verificar magias selecionadas por círculo
    const magiasChecked = document.querySelectorAll('input[name="magias_selecionadas"]:checked');
    let erros = [];

    magiasChecked.forEach(checkbox => {
      const circulo = parseInt(checkbox.dataset.circle || 1);
      const tipo = checkbox.dataset.type || '';
      const nomeCard = checkbox.closest('.spell-card, .spell-checkbox-label');
      const nomeMagia = nomeCard ? nomeCard.querySelector('.spell-card-name, .spell-name')?.textContent : 'Magia';

      // Verificar se o círculo está disponível
      const nivelMinimo = classConfig.circulos[circulo];
      if (!nivelMinimo || nivel < nivelMinimo) {
        erros.push(`${nomeMagia}: Requer nível ${nivelMinimo} para ${circulo}º círculo`);
      }

      // Verificar se o tipo está permitido
      if (!classConfig.tipos.includes(tipo)) {
        erros.push(`${nomeMagia}: Tipo ${tipo} não permitido para ${classeNome}`);
      }
    });

    if (erros.length > 0) {
      console.error('❌ Erros na validação:', erros);
      showSpellNotification(
        `Erros encontrados:\n${erros.join('\n')}`,
        'error'
      );
      return false;
    }

    console.log('✅ Validação de magias passou');
    return true;
  }

  // Função para mostrar notificações sobre magias
  function showSpellNotification(message, type = 'info') {
    console.log(`🔔 Notificação de Magia (${type}): ${message}`);

    // Remover notificação anterior se existir
    const existingNotification = document.querySelector('.spell-notification');
    if (existingNotification) {
      existingNotification.remove();
    }

    const notification = document.createElement('div');
    notification.className = `spell-notification ${type}`;
    notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    padding: 1rem 1.5rem;
    border-radius: 8px;
    color: white;
    font-weight: 600;
    z-index: 1001;
    animation: slideInRight 0.3s ease-out;
    max-width: 350px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.3);
    background: ${type === 'success' ? '#4caf50' : type === 'error' ? '#f44336' : type === 'warning' ? '#ff9800' : '#2196f3'};
  `;

    // Para mensagens longas, usar textarea
    if (message.length > 100) {
      const textarea = document.createElement('div');
      textarea.style.cssText = `
      white-space: pre-line;
      font-size: 0.9rem;
      line-height: 1.4;
    `;
      textarea.textContent = message;
      notification.appendChild(textarea);
    } else {
      notification.textContent = message;
    }

    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOutRight 0.3s ease-out';
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }, 5000);
  }

  // Função para calcular custo total de PM das magias selecionadas
  function calcularCustoTotalMagias() {
    let custoTotal = 0;

    // Somar magias de classe
    if (magiasClasseCarregadas) {
      magiasClasseCarregadas.forEach(magia => {
        custoTotal += parseInt(magia.custo_pm || 0);
      });
    }

    // Somar magias selecionadas
    const magiasChecked = document.querySelectorAll('input[name="magias_selecionadas"]:checked');
    magiasChecked.forEach(checkbox => {
      const card = checkbox.closest('.spell-card, .spell-checkbox-label');
      if (card) {
        const custoElement = card.querySelector('.spell-detail-value');
        if (custoElement) {
          const custoText = custoElement.textContent;
          const custoMatch = custoText.match(/(\d+)\s*PM/);
          if (custoMatch) {
            custoTotal += parseInt(custoMatch[1]);
          }
        }
      }
    });

    return custoTotal;
  }

  // Função para exibir estatísticas de magias no preview
  function exibirEstatisticasMagias() {
    const statsContainer = document.getElementById('spellsStats');
    if (!statsContainer) return;

    const contadores = contarMagiasPorTipo();
    const custoTotal = calcularCustoTotalMagias();
    const pmDisponiveis = parseInt(document.getElementById('pontos_mana')?.value || 0);

    const html = `
    <div class="spells-stats-grid">
      <div class="spell-stat">
        <div class="stat-icon">🔮</div>
        <div class="stat-value">${contadores.total}</div>
        <div class="stat-label">Total</div>
      </div>
      
      ${contadores.arcana > 0 ? `
        <div class="spell-stat">
          <div class="stat-icon">🌟</div>
          <div class="stat-value">${contadores.arcana}</div>
          <div class="stat-label">Arcanas</div>
        </div>
      ` : ''}
      
      ${contadores.divina > 0 ? `
        <div class="spell-stat">
          <div class="stat-icon">✨</div>
          <div class="stat-value">${contadores.divina}</div>
          <div class="stat-label">Divinas</div>
        </div>
      ` : ''}
      
      ${contadores.universal > 0 ? `
        <div class="spell-stat">
          <div class="stat-icon">🌈</div>
          <div class="stat-value">${contadores.universal}</div>
          <div class="stat-label">Universais</div>
        </div>
      ` : ''}
      
      <div class="spell-stat ${custoTotal > pmDisponiveis ? 'insufficient' : 'sufficient'}">
        <div class="stat-icon">💙</div>
        <div class="stat-value">${custoTotal}</div>
        <div class="stat-label">Custo Total PM</div>
      </div>
      
      <div class="spell-stat">
        <div class="stat-icon">⚡</div>
        <div class="stat-value">${pmDisponiveis}</div>
        <div class="stat-label">PM Disponíveis</div>
      </div>
    </div>
  `;

    statsContainer.innerHTML = html;
  }

  // Event listener para atualizar preview quando magias forem selecionadas
  document.addEventListener('change', function (e) {
    if (e.target.classList.contains('spell-checkbox') ||
      e.target.name === 'magias_selecionadas') {

      // Atualizar visual do card
      const card = e.target.closest('.spell-card, .spell-checkbox-label');
      if (card) {
        const spellCard = card.querySelector('.spell-card') || card;
        if (e.target.checked) {
          spellCard.classList.add('selected');

          // Adicionar badge de selecionada se não existir
          if (!spellCard.querySelector('.spell-card-source')) {
            const badge = document.createElement('div');
            badge.className = 'spell-card-source';
            badge.textContent = '✅ Selecionada';
            spellCard.querySelector('.spell-card-header').appendChild(badge);
          }
        } else {
          spellCard.classList.remove('selected');

          // Remover badge
          const badge = spellCard.querySelector('.spell-card-source');
          if (badge) {
            badge.remove();
          }
        }
      }

      // Atualizar preview
      atualizarPreviewMagias();

      // Atualizar estatísticas se a função existir
      if (typeof exibirEstatisticasMagias === 'function') {
        exibirEstatisticasMagias();
      }
    }
  });

  // Validação no submit do formulário
  document.addEventListener('DOMContentLoaded', function () {
    const form = document.getElementById('characterForm');
    if (form) {
      form.addEventListener('submit', function (e) {
        if (!validarSelecaoMagias()) {
          e.preventDefault();
          return false;
        }
      });
    }
  });

  // Adicionar seção de estatísticas ao preview se não existir
  function adicionarSecaoEstatisticasMagias() {
    const previewMagias = document.getElementById('previewMagias');
    if (previewMagias && !document.getElementById('spellsStats')) {
      const statsSection = document.createElement('div');
      statsSection.id = 'spellsStats';
      statsSection.style.cssText = 'margin-top: 1rem; padding-top: 1rem; border-top: 1px solid rgba(212, 175, 55, 0.3);';
      previewMagias.appendChild(statsSection);
    }
  }

  // Inicializar sistema de preview de magias
  function initMagicPreviewSystem() {
    console.log('🔮 Inicializando sistema de preview de magias...');

    adicionarSecaoEstatisticasMagias();

    // Atualizar preview inicial
    atualizarPreviewMagias();

    console.log('✅ Sistema de preview de magias inicializado');
  }

  // Auto-inicializar quando DOM estiver pronto
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initMagicPreviewSystem);
  } else {
    initMagicPreviewSystem();
  }

  // Função de debug para magias (ADICIONAR antes do final do arquivo)
  function debugMagicSystem() {
    console.log('🔧 === DEBUG DO SISTEMA DE MAGIAS ===');

    // Verificar elementos do DOM
    const classeSelect = document.getElementById('classe_id');
    const nivelInput = document.getElementById('nivel');
    const magicSections = {
      classMagicCheck: document.getElementById('classMagicCheck'),
      classSpellsSection: document.getElementById('classSpellsSection'),
      spellSelectionSection: document.getElementById('spellSelectionSection'),
      nonMagicalClass: document.getElementById('nonMagicalClass'),
      spellsEmptyState: document.getElementById('spellsEmptyState')
    };

    console.log('📋 Elementos encontrados:');
    console.log('- Classe Select:', !!classeSelect);
    console.log('- Nível Input:', !!nivelInput);
    console.log('- Seções de Magia:', Object.entries(magicSections).map(([key, el]) => `${key}: ${!!el}`).join(', '));

    if (classeSelect) {
      console.log('🎯 Classe atual:', classeSelect.value, classeSelect.selectedOptions[0]?.textContent);
    }

    if (nivelInput) {
      console.log('📊 Nível atual:', nivelInput.value);
    }

    console.log('🔮 Estado das variáveis:');
    console.log('- classeMagica:', typeof classeMagica !== 'undefined' ? classeMagica : 'undefined');
    console.log('- magiasClasseCarregadas:', typeof magiasClasseCarregadas !== 'undefined' ? magiasClasseCarregadas.length : 'undefined');
    console.log('- magiasDisponiveis:', typeof magiasDisponiveis !== 'undefined' ? Object.keys(magiasDisponiveis).length : 'undefined');
    console.log('- magicSystemInitialized:', typeof magicSystemInitialized !== 'undefined' ? magicSystemInitialized : 'undefined');

    console.log('⚙️ Configurações de classes mágicas:', CLASSES_MAGICAS);

    // Testar conectividade com API
    testMagicAPI();
  }

  // Função para testar conectividade com API
  async function testMagicAPI() {
    console.log('🌐 === TESTE DE CONECTIVIDADE COM API ===');

    try {
      // Testar rota de magias gerais
      console.log('📡 Testando /api/magias...');
      const magiasResponse = await fetch('/api/magias');
      console.log('- Status:', magiasResponse.status);
      if (magiasResponse.ok) {
        const magiasData = await magiasResponse.json();
        console.log('- Sucesso:', magiasData.success);
        console.log('- Total de magias:', magiasData.total || 'N/A');
      } else {
        console.error('- Erro na resposta:', await magiasResponse.text());
      }

      // Testar com uma classe específica (se houver classe selecionada)
      const classeSelect = document.getElementById('classe_id');
      if (classeSelect && classeSelect.value) {
        console.log(`📡 Testando /api/classes/${classeSelect.value}/magica...`);
        const classMagicResponse = await fetch(`/api/classes/${classeSelect.value}/magica`);
        console.log('- Status:', classMagicResponse.status);
        if (classMagicResponse.ok) {
          const classMagicData = await classMagicResponse.json();
          console.log('- Classe é mágica:', classMagicData.isMagical);
          console.log('- Total de magias da classe:', classMagicData.totalMagias);
        }

        console.log(`📡 Testando /api/classes/${classeSelect.value}/magias...`);
        const classSpellsResponse = await fetch(`/api/classes/${classeSelect.value}/magias`);
        console.log('- Status:', classSpellsResponse.status);
        if (classSpellsResponse.ok) {
          const classSpellsData = await classSpellsResponse.json();
          console.log('- Magias da classe encontradas:', classSpellsData.total || 0);
        }
      }

    } catch (error) {
      console.error('❌ Erro nos testes de API:', error);
    }
  }

  // Função para forçar recarga do sistema de magias
  function reloadMagicSystem() {
    console.log('🔄 Forçando recarga do sistema de magias...');

    // Reset das variáveis
    if (typeof classeMagica !== 'undefined') classeMagica = false;
    if (typeof magiasClasseCarregadas !== 'undefined') magiasClasseCarregadas = [];
    if (typeof magiasDisponiveis !== 'undefined') magiasDisponiveis = {};

    // Esconder todas as seções
    esconderSecoesMagias();

    // Mostrar estado inicial
    mostrarEstadoInicialMagias();

    // Reexecutar verificação se há classe selecionada
    const classeSelect = document.getElementById('classe_id');
    if (classeSelect && classeSelect.value) {
      handleClassChange.call(classeSelect);
    }

    console.log('✅ Sistema de magias recarregado');
  }

  // Adicionar funções ao objeto window para debug no console
  if (typeof window !== 'undefined') {
    window.debugMagicSystem = debugMagicSystem;
    window.testMagicAPI = testMagicAPI;
    window.reloadMagicSystem = reloadMagicSystem;

    // Auto-executar debug em modo desenvolvimento
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      setTimeout(() => {
        console.log('🔧 Debug automático ativado. Use debugMagicSystem(), testMagicAPI(), ou reloadMagicSystem() no console.');
      }, 2000);
    }
  }

  // Criar cards de seleção de magias
  function criarCardsSelecaoMagias(magias, podeAcessar) {
    return magias.map(magia => `
    <label class="spell-selection-label power-card class-power-card ${!podeAcessar ? 'disabled' : ''}">
      <input type="checkbox" name="magias_selecionadas" value="${magia.id}" 
             class="spell-selection-checkbox" 
             ${!podeAcessar ? 'disabled' : ''}>
      
      <div class="power-card class-power-card" data-spell-id="${magia.id}">
        <div class="power-card-header">
          <div class="power-card-icon">${getSpellIcon(magia.nome, magia.tipo)}</div>
          <h6 class="power-card-name">${magia.nome}</h6>
          <div class="power-card-sourc">📝 Escolher</div>
        </div>

        <div class="power-card-content">
          <p class="power-card-type">${magia.escola || 'N/A'} • ${magia.tipo || 'N/A'}</p>
          <p class="power-card-description">${magia.descricao || 'Sem descrição disponível'}</p>
          
          <div class="spell-card-details">
            ${magia.custo_pm && magia.custo_pm > 0 ? `
              <div class="power-detail-item">
                <span class="power-detail-label">💙</span>
                <span class="power-detail-value"><strong>Custo:</strong> ${magia.custo_pm} PM</span>
              </div>
            ` : ''}
            
            ${magia.execucao ? `
              <div class="power-detail-item">
                <span class="power-detail-label">⏰</span>
                <span class="power-detail-value"><strong>Execução:</strong> ${magia.execucao}</span>
              </div>
            ` : ''}
            
            ${magia.alcance && magia.alcance !== 'Pessoal' ? `
              <div class="power-detail-item">
                <span class="power-detail-label">🎯</span>
                <span class="power-detail-value"><strong>Alcance:</strong> ${magia.alcance}</span>
              </div>
            ` : ''}
            
            ${magia.duracao && magia.duracao !== 'Instantâneo' ? `
              <div class="power-detail-item">
                <span class="power-detail-label">⏱️</span>
                <span class="power-detail-value"><strong>Duração:</strong> ${magia.duracao}</span>
              </div>
            ` : ''}
          </div>

          <div class="spell-tags">
            <span class="spell-tag circle">${magia.circulo}º Círculo</span>
            <span class="spell-tag type">${magia.tipo}</span>
            ${magia.custo_pm && magia.custo_pm > 0 ? `<span class="spell-tag cost">${magia.custo_pm} PM</span>` : ''}
          </div>
        </div>
      </div>
    </label>
  `).join('');
  }

  // NOVA FUNÇÃO: Configurar filtros de magias
  function configurarFiltrosMagias(classeNome, nivel) {
    const spellCircleFilters = document.getElementById('spellCircleFilters');
    const spellTypeFilters = document.getElementById('spellTypeFilters');

    const classConfig = CLASSES_MAGICAS[classeNome.toLowerCase()];
    if (!classConfig) return;

    // Filtros por círculo
    if (spellCircleFilters) {
      let filtersHTML = `
      <button type="button" class="quick-filter-btn active" data-filter="all">
        ✨ Todas
      </button>
    `;

      Object.entries(classConfig.circulos).forEach(([circulo, nivelMinimo]) => {
        const podeAcessar = nivel >= nivelMinimo;
        filtersHTML += `
        <button type="button" class="quick-filter-btn ${!podeAcessar ? 'disabled' : ''}" 
                data-filter="circle-${circulo}" ${!podeAcessar ? 'disabled' : ''}>
          🔘 ${circulo}º Círculo ${!podeAcessar ? `(Nível ${nivelMinimo}+)` : ''}
        </button>
      `;
      });

      spellCircleFilters.innerHTML = filtersHTML;
    }

    // Filtros por tipo
    if (spellTypeFilters) {
      const typeFiltersHtml = classConfig.tipos.map(tipo => {
        const icon = tipo === 'Arcana' ? '🔮' : tipo === 'Divina' ? '✨' : '🌟';
        return `
        <button type="button" class="quick-filter-btn" data-filter="type-${tipo.toLowerCase()}">
          ${icon} ${tipo}
        </button>
      `;
      }).join('');

      spellTypeFilters.innerHTML = `
      <button type="button" class="quick-filter-btn active" data-filter="all-types">
        ✨ Todos os Tipos
      </button>
      ${typeFiltersHtml}
    `;
    }
  }

  // NOVA FUNÇÃO: Adicionar event listeners para seleção de magias
  function adicionarEventListenersMagias() {
    // Event listeners para checkboxes de seleção
    document.addEventListener('change', function (e) {
      if (e.target.classList.contains('spell-selection-checkbox')) {
        const card = e.target.closest('.spell-selection-card');
        const badge = card.querySelector('.spell-selection-badge');

        if (e.target.checked) {
          card.classList.add('selected');
          badge.textContent = '✅ Selecionada';
          badge.style.background = 'var(--success-green)';
        } else {
          card.classList.remove('selected');
          badge.textContent = '📝 Escolher';
          badge.style.background = '';
        }

        atualizarPreviewMagias();
        atualizarContadorMagias();
      }
    });

    // Event listeners para toggles de círculo
    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('spell-circle-toggle')) {
        const targetCircle = e.target.dataset.target;
        const grid = document.getElementById(`spellsGrid-${targetCircle}`);
        const icon = e.target.querySelector('.toggle-icon');

        if (grid) {
          if (grid.style.display === 'none') {
            grid.style.display = 'grid';
            icon.textContent = '📂';
          } else {
            grid.style.display = 'none';
            icon.textContent = '📁';
          }
        }
      }
    });

    // Event listeners para filtros
    document.addEventListener('click', function (e) {
      if (e.target.classList.contains('quick-filter-btn') && !e.target.disabled) {
        // Remover active dos irmãos
        const parent = e.target.parentElement;
        parent.querySelectorAll('.quick-filter-btn').forEach(btn => {
          btn.classList.remove('active');
        });

        // Adicionar active ao clicado
        e.target.classList.add('active');

        // Aplicar filtro (implementar depois se necessário)
        const filter = e.target.dataset.filter;
        console.log('🎯 Filtro aplicado:', filter);
      }
    });
  }

  // NOVA FUNÇÃO: Atualizar contador de magias selecionadas
  function atualizarContadorMagias() {
    const checkboxes = document.querySelectorAll('.spell-selection-checkbox:checked');
    const totalSelecionadas = checkboxes.length;

    // Atualizar contadores nos títulos de círculo
    document.querySelectorAll('.spell-circle-section').forEach(section => {
      const circulo = section.dataset.circle;
      const checkboxesCirculo = section.querySelectorAll('.spell-selection-checkbox:checked');
      const counter = section.querySelector('.circle-count');
      const total = section.querySelectorAll('.spell-selection-checkbox').length;

      if (counter) {
        counter.textContent = `(${checkboxesCirculo.length}/${total} selecionadas)`;
      }
    });

    console.log(`📊 Total de magias selecionadas: ${totalSelecionadas}`);
  }

  // NOVA FUNÇÃO: Mostrar quando não há magias disponíveis
  function mostrarSemMagiasDisponiveis(classeNome, nivel) {
    const spellSelectionSection = document.getElementById('spellSelectionSection');
    const spellsCirclesContainer = document.getElementById('spellsCirclesContainer');

    if (spellSelectionSection && spellsCirclesContainer) {
      spellsCirclesContainer.innerHTML = `
      <div class="no-spells-available">
        <div class="no-spells-icon">🔮</div>
        <h4 class="no-spells-title">Nenhuma Magia Disponível</h4>
        <p class="no-spells-description">
          Não há magias disponíveis para ${classeNome} no nível ${nivel}.
          <br>
          <small>Magias podem ficar disponíveis em níveis superiores.</small>
        </p>
      </div>
    `;
      spellSelectionSection.style.display = 'block';
    }
  }

  // FUNÇÃO ATUALIZADA: Preview de magias
  function atualizarPreviewMagias() {
    const previewMagias = document.getElementById('previewMagias');
    const magiasPreview = document.getElementById('magiasPreview');

    if (!previewMagias || !magiasPreview) return;

    console.log('🔮 Atualizando preview de magias...');

    // Coletar apenas magias SELECIONADAS pelo usuário
    const magiasEscolhidas = [];
    const checkboxes = document.querySelectorAll('input[name="magias_selecionadas"]:checked');

    checkboxes.forEach(checkbox => {
      const card = checkbox.closest('.spell-selection-card');
      if (card) {
        const nomeElement = card.querySelector('.spell-card-name');
        const circuloElement = card.querySelector('.spell-tag.circle');
        const nome = nomeElement ? nomeElement.textContent.trim() : 'Magia';
        const circulo = circuloElement ? circuloElement.textContent.trim() : '';
        magiasEscolhidas.push(`⚡ ${nome} ${circulo ? `(${circulo})` : ''}`);
      }
    });

    if (magiasEscolhidas.length > 0) {
      // Organizar por círculo se possível
      const magiasPorCirculo = {};
      magiasEscolhidas.forEach(magia => {
        const circuloMatch = magia.match(/(\d+)º/);
        const circulo = circuloMatch ? `${circuloMatch[1]}º Círculo` : 'Outras';

        if (!magiasPorCirculo[circulo]) {
          magiasPorCirculo[circulo] = [];
        }
        magiasPorCirculo[circulo].push(magia);
      });

      let html = `
      <div class="preview-spells-summary">
        <strong>${magiasEscolhidas.length} magia${magiasEscolhidas.length !== 1 ? 's' : ''} selecionada${magiasEscolhidas.length !== 1 ? 's' : ''}</strong>
      </div>
    `;

      Object.entries(magiasPorCirculo).forEach(([circulo, magias]) => {
        html += `
        <div class="preview-spell-circle">
          <h6 style="color: var(--accent-gold); margin: 0.8rem 0 0.5rem 0; font-size: 0.9rem;">
            🔘 ${circulo}
          </h6>
          <div class="preview-spells-list">
            ${magias.map(magia =>
          `<div class="magia-preview-item">${magia}</div>`
        ).join('')}
          </div>
        </div>
      `;
      });

      magiasPreview.innerHTML = html;
      previewMagias.style.display = 'block';
    } else {
      previewMagias.style.display = 'none';
    }

    console.log(`✅ Preview atualizado: ${magiasEscolhidas.length} magias selecionadas`);
  }


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

