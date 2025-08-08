/**
 * 主题管理器 - 处理明暗主题切换 (复制自 privacy_policy_new 并本地化)
 */
class ThemeManager {
  constructor() {
    this.currentTheme = 'light';
    this.storageKey = 'product-info-theme';
    this.themeToggleButton = null;
    this.init();
  }

  init() {
    this.loadStoredTheme();
    this.setupThemeToggle();
    this.detectSystemTheme();
    this.applyTheme();
  }

  loadStoredTheme() {
    const storedTheme = localStorage.getItem(this.storageKey);
    if (storedTheme && (storedTheme === 'light' || storedTheme === 'dark')) {
      this.currentTheme = storedTheme;
    }
  }

  detectSystemTheme() {
    if (!localStorage.getItem(this.storageKey)) {
      if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
        this.currentTheme = 'dark';
      } else {
        this.currentTheme = 'light';
      }
    }
    if (window.matchMedia) {
      const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
      mediaQuery.addEventListener('change', (e) => {
        if (!localStorage.getItem(this.storageKey)) {
          this.currentTheme = e.matches ? 'dark' : 'light';
          this.applyTheme();
        }
      });
    }
  }

  setupThemeToggle() {
    this.themeToggleButton = document.getElementById('theme-toggle');
    if (this.themeToggleButton) {
      this.themeToggleButton.addEventListener('click', () => {
        this.toggleTheme();
      });
    }
  }

  toggleTheme() {
    this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.applyTheme();
    this.saveTheme();
  }

  applyTheme() {
    const body = document.body;
    body.classList.remove('light-theme', 'dark-theme');
    body.classList.add(`${this.currentTheme}-theme`);
    this.updateThemeToggleIcon();
    this.updateThemeColor();
    this.dispatchThemeChangeEvent();
  }

  updateThemeToggleIcon() {
    if (!this.themeToggleButton) return;
    const icon = this.themeToggleButton.querySelector('.material-icons');
    if (icon) {
      icon.textContent = this.currentTheme === 'light' ? 'dark_mode' : 'light_mode';
    }
    const newLabel = this.currentTheme === 'light' ? '切换到暗夜模式' : '切换到日间模式';
    this.themeToggleButton.setAttribute('aria-label', newLabel);
  }

  updateThemeColor() {
    const themeColorMeta = document.querySelector('meta[name="theme-color"]');
    if (themeColorMeta) {
      const color = this.currentTheme === 'light' ? '#36693d' : '#9dd49f';
      themeColorMeta.setAttribute('content', color);
    }
  }

  saveTheme() {
    localStorage.setItem(this.storageKey, this.currentTheme);
  }

  dispatchThemeChangeEvent() {
    const event = new CustomEvent('themechange', { detail: { theme: this.currentTheme } });
    document.dispatchEvent(event);
  }
}

window.themeManager = null;
document.addEventListener('DOMContentLoaded', () => {
  window.themeManager = new ThemeManager();
});


