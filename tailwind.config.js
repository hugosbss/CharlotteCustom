module.exports = {
  content: ['./*.html','./src/js/*.js',
    './docs/*.html'],
  darkMode: 'class', // or 'media' or false
  theme: {
    extend: {
      colors: {
        gray: {
          50:  '#f9f9f9',
          100: '#efefef',
          200:  '#cccccc',
          300:  '#b6b6b6',
          400:  '#d9d9d9',
          500:  '#a8a9ad',
          600:  '#686465',
          700:  '#4d4948',
          800:  '#323232',
          900:  '#1c1c1c'
        },
        blue: {
          400:  '#e00486',
          500:  '#e00486',
          700:  '#e00486'
        },
      }
    },
    fontFamily: {
      sans: ['Roboto Slab', 'serif']
    },
  },
  variants: {
    extend: {
       backgroundOpacity: ['dark']
    }
  },
  plugins: [],
}
