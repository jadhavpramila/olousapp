const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  mode:'jit',
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    screens: {
      'xs': '412px',
      ...defaultTheme.screens,
    },
    fontFamily: {
      'body': [ 'Inter', "sans-serif"],
    },
    
    extend: {backgroundImage: {
      'home-default': "url('/src/assets/image2x.png')",
     }},
  },
  variants: {
    extend: {},
  },
  plugins: [],
  important: true,
}
