// Script para página de login
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('loginForm');
  const inputs = form.querySelectorAll('input');
  
  // Verificar se os elementos existem
  if (!form) {
    console.log('⚠️ Formulário de login não encontrado');
    return;
  }
  
  // Melhorar UX dos inputs
  inputs.forEach(input => {
    input.addEventListener('focus', function() {
      this.parentNode.classList.add('focused');
      this.style.borderColor = 'var(--accent-gold)';
      this.style.boxShadow = '0 0 0 3px rgba(212, 175, 55, 0.2)';
    });
    
    input.addEventListener('blur', function() {
      if (!this.value) {
        this.parentNode.classList.remove('focused');
      }
      this.style.borderColor = 'var(--border-color)';
      this.style.boxShadow = 'none';
    });
    
    // Se já tem valor, manter focused
    if (input.value) {
      input.parentNode.classList.add('focused');
    }
    
    // Adicionar validação visual em tempo real
    input.addEventListener('input', function() {
      if (this.type === 'text' && this.value.length < 3) {
        this.style.borderColor = '#ff6b6b';
      } else if (this.type === 'password' && this.value.length < 6) {
        this.style.borderColor = '#ff6b6b';
      } else {
        this.style.borderColor = 'var(--accent-gold)';
      }
    });
  });
  
  // Submit do formulário com validação
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Validação básica
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value;
    
    if (!username || !password) {
      showMessage('Por favor, preencha todos os campos.', 'error');
      return;
    }
    
    if (username.length < 3) {
      showMessage('Nome de usuário deve ter pelo menos 3 caracteres.', 'error');
      return;
    }
    
    if (password.length < 6) {
      showMessage('Senha deve ter pelo menos 6 caracteres.', 'error');
      return;
    }
    
    // Feedback visual
    const btn = this.querySelector('.login-btn');
    const originalText = btn.textContent;
    
    btn.textContent = '🔄 Entrando...';
    btn.disabled = true;
    btn.style.opacity = '0.7';
    
    // Log dos dados para debug (sem a senha)
    console.log('Tentativa de login para:', username);
    
    // Simular delay e submeter
    setTimeout(() => {
      this.submit();
    }, 500);
  });
  
  // Enter no password submete o form
  const passwordInput = document.getElementById('password');
  if (passwordInput) {
    passwordInput.addEventListener('keypress', function(e) {
      if (e.key === 'Enter') {
        form.dispatchEvent(new Event('submit'));
      }
    });
  }
  
  // Animação de entrada dos elementos
  const authCard = document.querySelector('.auth-card');
  const systemInfo = document.querySelector('.system-info');
  
  if (authCard) {
    authCard.style.opacity = '0';
    authCard.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      authCard.style.transition = 'all 0.6s ease';
      authCard.style.opacity = '1';
      authCard.style.transform = 'translateY(0)';
    }, 200);
  }
  
  if (systemInfo) {
    systemInfo.style.opacity = '0';
    systemInfo.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      systemInfo.style.transition = 'all 0.6s ease';
      systemInfo.style.opacity = '1';
      systemInfo.style.transform = 'translateY(0)';
    }, 400);
  }
  
  // Função para mostrar mensagens
  function showMessage(message, type = 'info') {
    // Remover mensagens existentes
    const existingMessages = document.querySelectorAll('.dynamic-message');
    existingMessages.forEach(msg => msg.remove());
    
    const messageDiv = document.createElement('div');
    messageDiv.className = `dynamic-message ${type}-message`;
    messageDiv.textContent = `⚠️ ${message}`;
    
    // Inserir antes do formulário
    const authContainer = document.querySelector('.auth-container');
    if (authContainer) {
      authContainer.insertBefore(messageDiv, authContainer.firstChild);
    }
    
    // Animar entrada
    messageDiv.style.opacity = '0';
    messageDiv.style.transform = 'translateY(-20px)';
    setTimeout(() => {
      messageDiv.style.transition = 'all 0.3s ease';
      messageDiv.style.opacity = '1';
      messageDiv.style.transform = 'translateY(0)';
    }, 100);
    
    // Remover após 5 segundos
    setTimeout(() => {
      messageDiv.style.opacity = '0';
      setTimeout(() => messageDiv.remove(), 300);
    }, 5000);
  }
  
  // Efeito de partículas douradas no background (sutil)
  function createParticle() {
    const particle = document.createElement('div');
    particle.style.cssText = `
      position: fixed;
      width: 2px;
      height: 2px;
      background: rgba(212, 175, 55, 0.6);
      border-radius: 50%;
      pointer-events: none;
      z-index: -1;
      animation: float 6s linear infinite;
    `;
    
    particle.style.left = Math.random() * window.innerWidth + 'px';
    particle.style.top = window.innerHeight + 'px';
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 6000);
  }
  
  // Criar partículas ocasionalmente
  setInterval(createParticle, 3000);
  
  // Adicionar estilos de animação
  const style = document.createElement('style');
  style.textContent = `
    @keyframes float {
      to {
        transform: translateY(-${window.innerHeight + 100}px) rotate(360deg);
        opacity: 0;
      }
    }
    
    .dynamic-message {
      background: rgba(220, 53, 69, 0.2);
      border: 2px solid var(--error-red);
      color: #ff6b6b;
      padding: 1rem;
      border-radius: 8px;
      margin-bottom: 1rem;
      text-align: center;
      font-weight: 600;
    }
  `;
  document.head.appendChild(style);
  
  console.log('✅ Script de login carregado');
});