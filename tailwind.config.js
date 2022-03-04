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
        neutral: '#02041e'
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
            maxWidth: '600px'
          },
          '@screen md': {
            maxWidth: '700px'
          },
          '@screen lg': {
            maxWidth: '800px'
          },
          '@screen xl': {
            maxWidth: '900px'
          },
          '@screen 2xl': {
            maxWidth: '1280px'
          }
        }
      });
    },
    require('@tailwindcss/typography'), require('flowbite/plugin')
  ]
};
