module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      padding: '1rem',
      center: true
    },
    extend: {
      colors: {
        primary: '#00A599',
        neutral: '#333333'
      },
      fontFamily: {
        poppins: ['Poppins', 'sans-serif']
      }
    }
  },
  corePlugins: {
    container: false
  },
  plugins: [
    function({ addComponents }) {
      addComponents({
        '.container': {
          maxWidth: '100%',
          padding: '1rem',
          margin: '0 auto',
          '@screen sm': {
            maxWidth: '540px'
          },
          '@screen md': {
            maxWidth: '720px'
          },
          '@screen lg': {
            maxWidth: '960px'
          },
          '@screen xl': {
            maxWidth: '1140px'
          },
          '@screen 2xl': {
            maxWidth: '1320px'
          }
        }
      });
    },
    require('@tailwindcss/typography'), require('flowbite/plugin')
  ]
};
