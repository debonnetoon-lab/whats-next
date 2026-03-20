module.exports = {
  content: ['./index.html', './src/**/*.{html,js}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['"Playfair Display"', 'serif'],
      },
      colors: {
        base: '#FFFFFF',
        text: '#1A1A1A',
        accent: '#FF0000',
        'accent-soft': '#FFF5F5'
      },
      borderRadius: {
        'pill': '9999px',
        '2xl': '24px',
        '3xl': '32px'
      },
      spacing: {
        '32': '8rem',
        '40': '10rem',
      }
    }
  },
  plugins: []
}
