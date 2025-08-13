/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './*.html',
    './assets/js/**/*.js'
  ],
  theme: {
    container: { center: true, padding: '1rem' },
    // Paleta EXCLUSIVA de marca (reemplaza la default)
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      white: '#ffffff',
      black: '#0b0b0b',
      'brand-dark': '#2a1033',
      'brand-light': '#fff6fb',
      'brand-pink': '#ec6bd9',
      'brand-purple': '#b06af7',
      'brand-gold': '#ffd84d',
      'brand-blue': '#59c0ff'
    },
    extend: {
      fontFamily: {
        display: ["'Poppins'", 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif'],
        body: ["'Inter'", 'system-ui', 'Segoe UI', 'Roboto', 'Helvetica', 'Arial', 'sans-serif']
      },
      boxShadow: {
        soft: '0 10px 30px rgba(42,16,51,.08)'
      }
    }
  },
  plugins: []
};