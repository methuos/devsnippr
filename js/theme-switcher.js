// theme-switcher.js - Dark/Light Mode Toggle Functionality

class ThemeSwitcher {
  constructor() {
    this.currentTheme = this.getStoredTheme() || this.getPreferredTheme();
    this.init();
  }

  init() {
    // Apply the current theme
    this.setTheme(this.currentTheme);
    
    // Create and insert the theme toggle button
    this.createThemeToggle();
    
    // Listen for system theme changes
    this.watchSystemTheme();
  }

  getStoredTheme() {
    return localStorage.getItem('theme');
  }

  getPreferredTheme() {
    // Always prefer dark mode by default
    return 'dark';
  }

  setTheme(theme) {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
    this.currentTheme = theme;
    this.updateToggleButton();
  }

  toggleTheme() {
    const newTheme = this.currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
    
    // Add a subtle animation class for smooth transition
    document.body.style.transition = 'background-color 0.3s ease';
    setTimeout(() => {
      document.body.style.transition = '';
    }, 300);
  }

createThemeToggle() {
    // Use the existing button if present
    let toggle = document.getElementById('theme-toggle');
    if (!toggle) {
        toggle = document.createElement('button');
        toggle.className = 'theme-toggle';
        toggle.setAttribute('aria-label', 'Toggle dark/light mode');
        toggle.setAttribute('title', 'Toggle theme');
        toggle.innerHTML = `
          <span class="theme-toggle-icon sun-icon">☀️</span>
          <span class="theme-toggle-icon moon-icon">🌙</span>
          <span class="theme-toggle-text"></span>
        `;
        // Insert as before
        const navActions = document.querySelector('.nav-actions');
        if (navActions) navActions.appendChild(toggle);
    }
    toggle.addEventListener('click', () => this.toggleTheme());
}

 updateToggleButton() {
    const toggle = document.getElementById('theme-toggle') || document.querySelector('.theme-toggle');
    if (toggle) {
        const isDark = this.currentTheme === 'dark';
        // Update text for text switch
        const textSpan = toggle.querySelector('.theme-toggle-text');
        if (textSpan) {
            textSpan.textContent = isDark ? 'Light Mode' : 'Dark Mode';
        }
        toggle.setAttribute('aria-label', `Switch to ${isDark ? 'light' : 'dark'} mode`);
        toggle.setAttribute('title', `Switch to ${isDark ? 'light' : 'dark'} theme`);
    }
}

  watchSystemTheme() {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    mediaQuery.addEventListener('change', (e) => {
      // Only auto-switch if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        this.setTheme(e.matches ? 'dark' : 'light');
      }
    });
  }

  // Method to manually reset to system preference
  resetToSystemTheme() {
    localStorage.removeItem('theme');
    this.currentTheme = this.getPreferredTheme();
    this.setTheme(this.currentTheme);
  }
}

// Initialize theme switcher when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  window.themeSwitcher = new ThemeSwitcher();
});

// Also initialize immediately if DOM is already loaded
if (document.readyState === 'loading') {
  // DOM is still loading
} else {
  // DOM is already loaded
  window.themeSwitcher = new ThemeSwitcher();
}

// Expose theme switcher for manual control
window.toggleTheme = () => {
  if (window.themeSwitcher) {
    window.themeSwitcher.toggleTheme();
  }
};

window.resetTheme = () => {
  if (window.themeSwitcher) {
    window.themeSwitcher.resetToSystemTheme();
  }
};