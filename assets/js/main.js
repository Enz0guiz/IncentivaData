// ===== CONFIGURAÇÃO GLOBAL =====
const AppConfig = {
  theme: {
    key: 'theme',
    dark: 'dark',
    light: 'light'
  },
  user: {
    isLoggedIn: 'isLoggedIn',
    userType: 'userType',
    userName: 'userName',
    userEmail: 'userEmail'
  }
};

// ===== SISTEMA DE TEMA =====
class ThemeManager {
  constructor() {
    this.toggleButton = document.getElementById('toggleTheme');
    this.body = document.body;
    this.init();
  }

  init() {
    this.loadSavedTheme();
    this.setupEventListeners();
  }

  loadSavedTheme() {
    const savedTheme = localStorage.getItem(AppConfig.theme.key);
    if (savedTheme === AppConfig.theme.dark) {
      this.body.classList.add('dark-theme');
      this.toggleButton.textContent = '☀️';
    } else {
      this.body.classList.remove('dark-theme');
      this.toggleButton.textContent = '🌙';
    }
  }

  setupEventListeners() {
    this.toggleButton?.addEventListener('click', () => this.toggleTheme());
  }

  toggleTheme() {
    this.body.classList.toggle('dark-theme');

    if (this.body.classList.contains('dark-theme')) {
      this.toggleButton.textContent = '☀️';
      localStorage.setItem(AppConfig.theme.key, AppConfig.theme.dark);
    } else {
      this.toggleButton.textContent = '🌙';
      localStorage.setItem(AppConfig.theme.key, AppConfig.theme.light);
    }
  }
}

// ===== SISTEMA DE MODAL =====
class ModalManager {
  static openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'block';
    }
  }

  static closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
      modal.style.display = 'none';
    }
  }

  static init() {
    // Fechar modal clicando fora
    window.addEventListener('click', (event) => {
      if (event.target.classList.contains('modal')) {
        event.target.style.display = 'none';
      }
    });
  }
}

// ===== SISTEMA DE AUTENTICAÇÃO =====
class AuthManager {
  static checkLogin() {
    if (!localStorage.getItem(AppConfig.user.isLoggedIn)) {
      window.location.href = 'index.html';
    }
  }

  static handleLogin(email) {
    localStorage.setItem(AppConfig.user.userEmail, email);
    localStorage.setItem(AppConfig.user.isLoggedIn, 'true');

    // Determinar tipo de usuário baseado no email
    if (email.includes('osc') || email.includes('ong')) {
      localStorage.setItem(AppConfig.user.userType, 'osc');
    } else {
      localStorage.setItem(AppConfig.user.userType, 'empresa');
    }

    window.location.href = 'dashboard.html';
  }

  static handleRegister(userType, name, email) {
    localStorage.setItem(AppConfig.user.userType, userType);
    localStorage.setItem(AppConfig.user.userName, name);
    localStorage.setItem(AppConfig.user.userEmail, email);
    localStorage.setItem(AppConfig.user.isLoggedIn, 'true');

    window.location.href = 'dashboard.html';
  }

  static logout() {
    Object.values(AppConfig.user).forEach(key => {
      localStorage.removeItem(key);
    });
    window.location.href = 'index.html';
  }
}

// ===== SISTEMA DE ANIMAÇÕES =====
class AnimationManager {
  static setupScrollAnimations() {
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observar elementos para animação
    const elementsToAnimate = document.querySelectorAll(
      '.news-card, .solution-card, .about-section, .stat-card, .content-card'
    );

    elementsToAnimate.forEach(el => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(30px)';
      el.style.transition = 'all 0.6s ease-out';
      observer.observe(el);
    });
  }

  static animateNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number');

    statNumbers.forEach(stat => {
      const target = parseInt(stat.getAttribute('data-target'));
      const isMonetary = stat.textContent.includes('R$');
      let current = 0;
      const increment = target / 50;

      const timer = setInterval(() => {
        current += increment;

        if (current >= target) {
          current = target;
          clearInterval(timer);
        }

        if (isMonetary) {
          stat.textContent = `R$ ${Math.floor(current)}M`;
        } else {
          stat.textContent = Math.floor(current);
        }
      }, 30);
    });
  }
}

// ===== UTILITÁRIOS =====
class FormUtils {
  static formatPhone(input) {
    input.addEventListener('input', (e) => {
      let value = e.target.value.replace(/\D/g, '');
      if (value.length >= 11) {
        value = value.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
      } else if (value.length >= 7) {
        value = value.replace(/(\d{2})(\d{4})(\d{0,4})/, '($1) $2-$3');
      } else if (value.length >= 3) {
        value = value.replace(/(\d{2})(\d{0,5})/, '($1) $2');
      }
      e.target.value = value;
    });
  }

  static validateForm(form) {
    const inputs = form.querySelectorAll('input[required], select[required]');
    let isValid = true;

    inputs.forEach(input => {
      if (!input.value.trim()) {
        input.style.borderColor = '#ef4444';
        isValid = false;
      } else {
        input.style.borderColor = '';
      }
    });

    return isValid;
  }
}

// ===== Payment Split Simulation =====
class PaymentSimulator {
  static calculateSplit(donationAmount) {
    const companyPays = donationAmount * 1.05;
    const oscReceives = donationAmount;
    return { companyPays, oscReceives };
  }
}

// ===== INICIALIZAÇÃO =====
document.addEventListener('DOMContentLoaded', function() {
  // Inicializar sistemas
  new ThemeManager();
  ModalManager.init();
  AnimationManager.setupScrollAnimations();

  // Configurar animações de números após carregamento
  window.addEventListener('load', () => {
    setTimeout(() => {
      AnimationManager.animateNumbers();
    }, 800);
  });
});

// Funções globais para compatibilidade
function openModal(modalId) {
  ModalManager.openModal(modalId);
}

function closeModal(modalId) {
  ModalManager.closeModal(modalId);
}