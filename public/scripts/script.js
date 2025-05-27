// Script para página de registro
document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('registerForm');
  const passwordInput = document.getElementById('password');
  const confirmPasswordInput = document.getElementById('confirmPassword');
  const submitBtn = document.querySelector('.register-btn');
  const termsCheckbox = document.getElementById('acceptTerms');
  
  // Verificar se os elementos existem
  if (!form || !passwordInput || !confirmPasswordInput || !submitBtn || !termsCheckbox) {
    console.log('⚠️ Alguns elementos do formulário não foram encontrados');
    return;
  }
  
  // Password strength checker
  function checkPasswordStrength(password) {
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    if (!strengthBar || !strengthText) return 0;
    
    if (password.length === 0) {
      strengthBar.className = 'strength-bar';
      strengthText.textContent = 'Digite uma senha';
      strengthText.className = 'strength-text';
      return 0;
    }
    
    let score = 0;
    const checks = {
      length: password.length >= 8,
      lowercase: /[a-z]/.test(password),
      uppercase: /[A-Z]/.test(password),
      numbers: /\d/.test(password),
      special: /[!@#$%^&*(),.?":{}|<>]/.test(password)
    };
    
    score = Object.values(checks).filter(Boolean).length;
    
    if (score <= 1) {
      strengthBar.className = 'strength-bar weak';
      strengthText.textContent = 'Muito fraca';
      strengthText.className = 'strength-text weak';
      return 1;
    } else if (score <= 2) {
      strengthBar.className = 'strength-bar fair';
      strengthText.textContent = 'Fraca';
      strengthText.className = 'strength-text fair';
      return 2;
    } else if (score <= 3) {
      strengthBar.className = 'strength-bar good';
      strengthText.textContent = 'Boa';
      strengthText.className = 'strength-text good';
      return 3;
    } else {
      strengthBar.className = 'strength-bar strong';
      strengthText.textContent = 'Forte';
      strengthText.className = 'strength-text strong';
      return 4;
    }
  }
  
  // Password match checker
  function checkPasswordMatch() {
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const matchIndicator = document.getElementById('passwordMatch');
    
    if (!matchIndicator) return false;
    
    if (confirmPassword.length === 0) {
      matchIndicator.textContent = '';
      matchIndicator.className = 'password-match';
      return false;
    }
    
    if (password === confirmPassword) {
      matchIndicator.textContent = '✅ Senhas coincidem';
      matchIndicator.className = 'password-match match';
      return true;
    } else {
      matchIndicator.textContent = '❌ Senhas não coincidem';
      matchIndicator.className = 'password-match no-match';
      return false;
    }
  }
  
  // Validate form
  function validateForm() {
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = passwordInput.value;
    const confirmPassword = confirmPasswordInput.value;
    const termsAccepted = termsCheckbox.checked;
    
    const isValid = 
      username.length >= 3 &&
      email.includes('@') &&
      password.length >= 6 &&
      password === confirmPassword &&
      termsAccepted;
    
    submitBtn.disabled = !isValid;
    
    // Feedback visual do botão
    if (isValid) {
      submitBtn.style.opacity = '1';
      submitBtn.style.cursor = 'pointer';
    } else {
      submitBtn.style.opacity = '0.6';
      submitBtn.style.cursor = 'not-allowed';
    }
  }
  
  // Event listeners
  passwordInput.addEventListener('input', function() {
    checkPasswordStrength(this.value);
    checkPasswordMatch();
    validateForm();
  });
  
  confirmPasswordInput.addEventListener('input', function() {
    checkPasswordMatch();
    validateForm();
  });
  
  document.getElementById('username').addEventListener('input', validateForm);
  document.getElementById('email').addEventListener('input', validateForm);
  termsCheckbox.addEventListener('change', validateForm);
  
  // Input focus effects
  const inputs = form.querySelectorAll('input[type="text"], input[type="email"], input[type="password"]');
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
    
    // Validação visual em tempo real
    input.addEventListener('input', function() {
      let isValid = true;
      
      if (this.type === 'text' && this.name === 'username') {
        isValid = this.value.length >= 3;
      } else if (this.type === 'email') {
        isValid = this.value.includes('@') && this.value.includes('.');
      } else if (this.type === 'password') {
        isValid = this.value.length >= 6;
      }
      
      if (this.value.length > 0) {
        this.style.borderColor = isValid ? 'var(--accent-gold)' : '#ff6b6b';
      }
    });
  });
  
  // Form submission
  form.addEventListener('submit', function(e) {
    e.preventDefault();
    
    if (submitBtn.disabled) {
      showMessage('Por favor, complete todos os campos corretamente.', 'error');
      return;
    }
    
    // Visual feedback
    const originalText = submitBtn.textContent;
    submitBtn.textContent = '🔄 Criando conta...';
    submitBtn.disabled = true;
    
    // Log data for debugging (sem senhas)
    const formData = new FormData(form);
    const data = {};
    formData.forEach((value, key) => {
      if (key !== 'password' && key !== 'confirmPassword') {
        data[key] = value;
      }
    });
    console.log('Dados de registro:', data);
    
    // Submit after delay
    setTimeout(() => {
      this.submit();
    }, 800);
  });
  
  // Animações de entrada
  const authCard = document.querySelector('.auth-card');
  const benefitsInfo = document.querySelector('.benefits-info');
  
  if (authCard) {
    authCard.style.opacity = '0';
    authCard.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      authCard.style.transition = 'all 0.6s ease';
      authCard.style.opacity = '1';
      authCard.style.transform = 'translateY(0)';
    }, 200);
  }
  
  if (benefitsInfo) {
    benefitsInfo.style.opacity = '0';
    benefitsInfo.style.transform = 'translateY(30px)';
    
    setTimeout(() => {
      benefitsInfo.style.transition = 'all 0.6s ease';
      benefitsInfo.style.opacity = '1';
      benefitsInfo.style.transform = 'translateY(0)';
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
  
  // Adicionar estilos necessários
  const style = document.createElement('style');
  style.textContent = `
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
  
  // Initialize validation
  validateForm();
  
  console.log('✅ Script de registro carregado');
});