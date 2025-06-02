/**
 * SISTEMA DE PODERES DE CLASSE - CORRIGIDO
 * Gerencia os poderes específicos de cada classe durante criação/edição
 */

class ClassPowersManager {
  constructor() {
    this.currentClass = null;
    this.classPowers = [];
    this.selectedClassPowers = [];
    this.elements = {};

    this.init();
  }

  /**
   * Inicialização do sistema
   */
  init() {
    console.log('🏛️ Inicializando Sistema de Poderes de Classe');

    this.cacheElements();
    this.bindEvents();
    this.checkInitialClass();
  }

  /**
   * Cache dos elementos DOM
   */
  cacheElements() {
    this.elements = {
      classeSelect: document.getElementById('classe_id'),
      classPowersSection: document.querySelector('.class-powers-section'),
      classPowersList: document.getElementById('classPowersList'),
      classPowersClassName: document.getElementById('classPowersClassName'),
      classPowersPreview: document.querySelector('.class-powers-preview')
    };

    // Criar seção se não existir
    if (!this.elements.classPowersSection) {
      this.createClassPowersSection();
    }
  }

  /**
   * Cria a seção de poderes de classe se não existir
   */
  createClassPowersSection() {
    const powersContainer = document.querySelector('.powers-main-container');
    if (!powersContainer) return;

    const classPowersHTML = `
      <div class="class-powers-section" id="classPowersSection">
        <div class="class-powers-header">
          <h4 class="class-powers-title">
            <span>⚔️</span>
            Poderes de Classe
            <span>⚔️</span>
          </h4>
          <p class="class-powers-description">
            Poderes exclusivos da classe <span class="class-powers-class-name" id="classPowersClassName">selecionada</span>
          </p>
        </div>

        <div id="classPowersList" class="class-powers-list">
          <!-- Preenchido via JavaScript -->
        </div>
      </div>
      
      <div class="class-powers-separator"></div>
    `;

    // Inserir no início do container de poderes
    powersContainer.insertAdjacentHTML('afterbegin', classPowersHTML);

    // Atualizar cache
    this.elements.classPowersSection = document.querySelector('.class-powers-section');
    this.elements.classPowersList = document.getElementById('classPowersList');
    this.elements.classPowersClassName = document.getElementById('classPowersClassName');
  }

  /**
   * Vincula eventos
   */
  bindEvents() {
    if (this.elements.classeSelect) {
      this.elements.classeSelect.addEventListener('change', (e) => {
        this.handleClassChange(e.target.value);
      });
    }
  }

  /**
   * Verifica se há uma classe já selecionada na inicialização
   */
  checkInitialClass() {
    if (this.elements.classeSelect && this.elements.classeSelect.value) {
      this.handleClassChange(this.elements.classeSelect.value);
    }
  }

  /**
   * Manipula mudança de classe
   */
  async handleClassChange(classeId) {
    console.log(`🏛️ Classe alterada para ID: ${classeId}`);

    if (!classeId) {
      this.hideClassPowers();
      return;
    }

    // Obter nome da classe
    const classeOption = this.elements.classeSelect.selectedOptions[0];
    const classeNome = classeOption ? classeOption.textContent : 'Classe';

    this.currentClass = {
      id: classeId,
      nome: classeNome
    };

    // Atualizar UI
    this.updateClassName(classeNome);

    // Carregar poderes da classe
    await this.loadClassPowers(classeId);
  }

  /**
   * Atualiza o nome da classe na UI
   */
  updateClassName(nome) {
    if (this.elements.classPowersClassName) {
      this.elements.classPowersClassName.textContent = nome;
    }

    // Atualizar atributo data-class
    if (this.elements.classPowersSection) {
      this.elements.classPowersSection.setAttribute('data-class', nome);
    }
  }

  /**
   * Carrega poderes da classe via API - CORRIGIDO
   */
  async loadClassPowers(classeId) {
    try {
      console.log(`📡 Carregando poderes da classe ID: ${classeId}`);

      this.showLoading();

      // CORREÇÃO: Usar a rota correta com nível 20 para pegar todos os poderes
      const response = await fetch(`/api/classes/${classeId}/poderes/20`);

      if (!response.ok) {
        // Se a rota não existir, tentar rota alternativa
        console.log('Tentando rota alternativa...');
        const alternativeResponse = await fetch(`/api/classes/${classeId}/completo?nivel=20`);
        
        if (!alternativeResponse.ok) {
          throw new Error(`Erro na requisição: ${response.status}`);
        }
        
        const alternativeData = await alternativeResponse.json();
        if (alternativeData.success && alternativeData.poderes) {
          this.classPowers = alternativeData.poderes;
          this.displayClassPowers();
          this.showClassPowers();
          console.log(`✅ ${this.classPowers.length} poderes de classe carregados (via rota alternativa)`);
          return;
        }
      }

      const data = await response.json();

      if (data.success && data.poderes) {
        this.classPowers = data.poderes;
        this.displayClassPowers();
        this.showClassPowers();

        console.log(`✅ ${this.classPowers.length} poderes de classe carregados`);
      } else {
        console.warn('⚠️ Nenhum poder de classe encontrado');
        this.showEmptyState();
      }
    } catch (error) {
      console.error('❌ Erro ao carregar poderes de classe:', error);
      this.showErrorState();
    }
  }

  /**
   * Exibe estado de carregamento
   */
  showLoading() {
    if (this.elements.classPowersList) {
      this.elements.classPowersList.innerHTML = `
        <div class="class-powers-loading">
          <div class="class-powers-loading-spinner">⚔️</div>
          <p>Carregando poderes de classe...</p>
        </div>
      `;
    }

    this.showClassPowers();
  }

  /**
   * Exibe estado vazio
   */
  showEmptyState() {
    if (this.elements.classPowersList) {
      this.elements.classPowersList.innerHTML = `
        <div class="class-powers-empty-state">
          <div class="class-powers-empty-icon">📜</div>
          <h4 class="class-powers-empty-title">Nenhum Poder de Classe</h4>
          <p class="class-powers-empty-description">
            Esta classe não possui poderes específicos disponíveis no momento.
          </p>
        </div>
      `;
    }

    this.showClassPowers();
  }

  /**
   * Exibe estado de erro - MELHORADO
   */
  showErrorState() {
    if (this.elements.classPowersList) {
      this.elements.classPowersList.innerHTML = `
        <div class="class-powers-empty-state">
          <div class="class-powers-empty-icon">⚠️</div>
          <h4 class="class-powers-empty-title">Poderes em Desenvolvimento</h4>
          <p class="class-powers-empty-description">
            Os poderes específicos desta classe estão sendo implementados. 
            <br>Por enquanto, você pode usar os poderes gerais disponíveis abaixo.
          </p>
        </div>
      `;
    }

    this.showClassPowers();
  }

  /**
   * Exibe os poderes de classe carregados
   */
  displayClassPowers() {
    if (!this.elements.classPowersList || !this.classPowers.length) return;

    const powersHTML = this.classPowers.map(poder => this.renderClassPower(poder)).join('');
    this.elements.classPowersList.innerHTML = powersHTML;

    // Anexar eventos aos poderes renderizados
    this.attachPowerEvents();
  }

  /**
   * Renderiza um poder de classe individual
   */
  renderClassPower(poder) {
    const icon = this.getPowerIcon(poder);
    const levelBadge = poder.nivel_minimo ? `Nível ${poder.nivel_minimo}+` : 'Automático';
    const levelClass = poder.nivel_minimo ? 'level-requirement' : 'automatic';

    return `
      <div class="class-power-card" data-power-id="${poder.id}">
        <div class="class-power-header">
          <h5 class="class-power-name">
            ${icon} ${poder.nome}
          </h5>
          <span class="class-power-level-badge ${levelClass}">
            ${levelBadge}
          </span>
        </div>
        
        <div class="class-power-description">
          ${poder.descricao}
        </div>
        
        ${this.renderPowerDetails(poder)}
        
        <div class="class-power-tags">
          <span class="class-power-tag">Classe</span>
          <span class="class-power-tag ${levelClass}">
            ${levelBadge}
          </span>
          ${poder.custo_pm ? `<span class="class-power-tag">${poder.custo_pm} PM</span>` : ''}
          ${poder.pre_requisitos ? '<span class="class-power-tag">Pré-requisitos</span>' : ''}
        </div>
      </div>
    `;
  }

  /**
   * Renderiza detalhes do poder
   */
  renderPowerDetails(poder) {
    const details = [];

    if (poder.pre_requisitos) {
      details.push({
        label: '📋 Pré-requisitos',
        value: poder.pre_requisitos
      });
    }

    if (poder.custo_pm && poder.custo_pm > 0) {
      details.push({
        label: '💙 Custo',
        value: `${poder.custo_pm} PM`
      });
    }

    if (poder.alcance && poder.alcance !== 'Pessoal') {
      details.push({
        label: '🎯 Alcance',
        value: poder.alcance
      });
    }

    if (poder.duracao && poder.duracao !== 'Instantâneo') {
      details.push({
        label: '⏱️ Duração',
        value: poder.duracao
      });
    }

    if (poder.efeito_especial) {
      details.push({
        label: '⚡ Efeito Especial',
        value: poder.efeito_especial
      });
    }

    if (!details.length) return '';

    return `
      <div class="class-power-details">
        ${details.map(detail => `
          <div class="class-power-detail">
            <div class="class-power-detail-label">${detail.label}</div>
            <p class="class-power-detail-value">${detail.value}</p>
          </div>
        `).join('')}
      </div>
    `;
  }

  /**
   * Gera ícone para o poder baseado no nome/tipo
   */
  getPowerIcon(poder) {
    const nome = poder.nome.toLowerCase();

    // Ícones específicos por palavra-chave
    if (nome.includes('ataque') || nome.includes('golpe')) return '⚔️';
    if (nome.includes('defesa') || nome.includes('proteção')) return '🛡️';
    if (nome.includes('cura') || nome.includes('curar')) return '💚';
    if (nome.includes('fúria') || nome.includes('raiva')) return '😤';
    if (nome.includes('furtividade') || nome.includes('stealth')) return '👤';
    if (nome.includes('magia') || nome.includes('arcano')) return '🔮';
    if (nome.includes('divino') || nome.includes('sagrado')) return '✨';
    if (nome.includes('inspiração') || nome.includes('encorajar')) return '🎵';
    if (nome.includes('movimento') || nome.includes('velocidade')) return '🏃';
    if (nome.includes('resistência') || nome.includes('tolerância')) return '🛡️';

    // Ícone padrão para poderes de classe
    return '⚔️';
  }

  /**
   * Anexa eventos aos poderes renderizados
   */
  attachPowerEvents() {
    const powerCards = this.elements.classPowersList.querySelectorAll('.class-power-card');

    powerCards.forEach(card => {
      card.addEventListener('click', () => {
        this.togglePowerSelection(card);
      });
    });
  }

  /**
   * Alterna seleção de poder (para modos interativos futuros)
   */
  togglePowerSelection(card) {
    const powerId = card.dataset.powerId;
    const isSelected = card.classList.contains('selected');

    if (isSelected) {
      card.classList.remove('selected');
      this.selectedClassPowers = this.selectedClassPowers.filter(id => id !== powerId);
    } else {
      card.classList.add('selected');
      this.selectedClassPowers.push(powerId);
    }

    console.log('🎯 Poderes de classe selecionados:', this.selectedClassPowers);

    // Atualizar preview se existir
    this.updateClassPowersPreview();

    // Disparar evento customizado
    document.dispatchEvent(new CustomEvent('classPowersChanged', {
      detail: {
        selectedPowers: this.selectedClassPowers,
        currentClass: this.currentClass
      }
    }));
  }

  /**
   * Atualiza preview dos poderes de classe selecionados
   */
  updateClassPowersPreview() {
    const previewContainer = document.getElementById('poderesPreview');
    if (!previewContainer) return;

    // Adicionar poderes de classe ao preview
    const classPowersPreview = this.selectedClassPowers.map(id => {
      const poder = this.classPowers.find(p => p.id == id);
      return poder ? `<div class="class-power-preview-item">⚔️ ${poder.nome} (Classe)</div>` : '';
    }).filter(Boolean);

    // Integrar com o sistema de preview existente
    const existingPowers = Array.from(previewContainer.children)
      .filter(child => !child.classList.contains('class-power-preview-item'))
      .map(child => child.outerHTML);

    previewContainer.innerHTML = [...classPowersPreview, ...existingPowers].join('');
  }

  /**
   * Mostra a seção de poderes de classe
   */
  showClassPowers() {
    if (this.elements.classPowersSection) {
      this.elements.classPowersSection.classList.add('visible');
      this.elements.classPowersSection.style.display = 'block';
    }
  }

  /**
   * Oculta a seção de poderes de classe
   */
  hideClassPowers() {
    if (this.elements.classPowersSection) {
      this.elements.classPowersSection.classList.remove('visible');
      this.elements.classPowersSection.style.display = 'none';
    }

    // Limpar seleções
    this.selectedClassPowers = [];
    this.classPowers = [];
    this.currentClass = null;
  }

  /**
   * Obtém poderes de classe selecionados
   */
  getSelectedClassPowers() {
    return {
      classId: this.currentClass?.id,
      className: this.currentClass?.nome,
      selectedPowers: this.selectedClassPowers,
      powers: this.classPowers.filter(p => this.selectedClassPowers.includes(p.id))
    };
  }

  /**
   * Define poderes de classe selecionados (para edição)
   */
  setSelectedClassPowers(powerIds) {
    this.selectedClassPowers = powerIds || [];

    // Atualizar UI
    const powerCards = this.elements.classPowersList.querySelectorAll('.class-power-card');
    powerCards.forEach(card => {
      const powerId = card.dataset.powerId;
      if (this.selectedClassPowers.includes(powerId)) {
        card.classList.add('selected');
      } else {
        card.classList.remove('selected');
      }
    });

    this.updateClassPowersPreview();
  }
}

// Integração com o sistema de poderes existente
document.addEventListener('DOMContentLoaded', function () {
  // Aguardar um pouco para garantir que outros scripts carregaram
  setTimeout(() => {
    window.classPowersManager = new ClassPowersManager();

    // Integrar com o sistema de preview existente
    if (typeof atualizarPreviewPoderes === 'function') {
      const originalUpdatePreview = atualizarPreviewPoderes;

      window.atualizarPreviewPoderes = function () {
        originalUpdatePreview();

        if (window.classPowersManager) {
          window.classPowersManager.updateClassPowersPreview();
        }
      };
    }

    console.log('✅ Sistema de Poderes de Classe integrado e corrigido');
  }, 500);
});

// Evento para reset do formulário
document.addEventListener('DOMContentLoaded', function () {
  const resetBtn = document.getElementById('resetForm');
  if (resetBtn) {
    resetBtn.addEventListener('click', function () {
      setTimeout(() => {
        if (window.classPowersManager) {
          window.classPowersManager.hideClassPowers();
        }
      }, 100);
    });
  }
});

// Função para criar campos hidden com poderes de classe selecionados
function createClassPowerHiddenFields() {
  // Remover campos existentes para evitar duplicatas
  const existingFields = document.querySelectorAll('input[name="poderes_classe_selecionados"]');
  existingFields.forEach(field => field.remove());
  
  // Se não há manager, não fazer nada
  if (!window.classPowersManager) return;
  
  const selectedPowers = window.classPowersManager.getSelectedClassPowers();
  
  if (selectedPowers.selectedPowers && selectedPowers.selectedPowers.length > 0) {
    const form = document.getElementById('characterForm');
    if (!form) return;
    
    console.log('📝 Criando campos hidden para poderes de classe:', selectedPowers.selectedPowers);
    
    // Criar campos hidden para cada poder de classe selecionado
    selectedPowers.selectedPowers.forEach(powerId => {
      const hiddenField = document.createElement('input');
      hiddenField.type = 'hidden';
      hiddenField.name = 'poderes_classe_selecionados';
      hiddenField.value = powerId;
      form.appendChild(hiddenField);
    });
    
    console.log(`✅ ${selectedPowers.selectedPowers.length} poderes de classe adicionados ao formulário`);
  }
}

// Integrar com o evento de submit do formulário
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('characterForm');
  
  if (form) {
    // Interceptar submit do formulário para adicionar poderes de classe
    form.addEventListener('submit', function(e) {
      console.log('📤 Preparando envio do formulário com poderes de classe...');
      
      // Criar campos hidden para poderes de classe antes do envio
      createClassPowerHiddenFields();
      
      // Continuar com o submit normal
      console.log('✅ Formulário pronto para envio com todos os poderes');
    });
  }
});

// Modificar a classe ClassPowersManager para suportar a integração
if (typeof ClassPowersManager !== 'undefined') {
  // Adicionar método para atualizar formulário quando poderes mudam
  const originalTogglePowerSelection = ClassPowersManager.prototype.togglePowerSelection;
  
  ClassPowersManager.prototype.togglePowerSelection = function(card) {
    // Chamar método original
    originalTogglePowerSelection.call(this, card);
    
    // Atualizar campos do formulário automaticamente
    setTimeout(() => {
      createClassPowerHiddenFields();
    }, 100);
  };
}

// Função para debug - verificar se poderes de classe estão sendo enviados
function debugFormData() {
  const form = document.getElementById('characterForm');
  if (!form) return;
  
  const formData = new FormData(form);
  const data = {};
  
  for (let [key, value] of formData.entries()) {
    if (!data[key]) data[key] = [];
    data[key].push(value);
  }
  
  console.log('🔍 Dados do formulário:', data);
  console.log('🔍 Poderes gerais:', data.poderes_selecionados || []);
  console.log('🔍 Poderes de classe:', data.poderes_classe_selecionados || []);
  
  return data;
}

// Adicionar botão de debug em desenvolvimento
if (process.env.NODE_ENV === 'development' || window.location.hostname === 'localhost') {
  setTimeout(() => {
    const form = document.getElementById('characterForm');
    if (form) {
      const debugBtn = document.createElement('button');
      debugBtn.type = 'button';
      debugBtn.textContent = '🔍 Debug Form Data';
      debugBtn.style.cssText = 'margin: 1rem; padding: 0.5rem; background: orange; color: white; border: none; border-radius: 4px;';
      debugBtn.onclick = debugFormData;
      form.appendChild(debugBtn);
    }
  }, 2000);
}

console.log('✅ Integração de poderes de classe com formulário inicializada');

// Exportar para uso global
if (typeof module !== 'undefined' && module.exports) {
  module.exports = ClassPowersManager;
}