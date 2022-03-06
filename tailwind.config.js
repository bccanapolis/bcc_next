module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        primary: '#00A599',
        neutral: '#333333'
      },
      fontFamily: {
        poppins: ['"Poppins"', 'sans-serif']
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
          margin: '0 auto',
          padding: '0 1rem',
          '@screen sm': {
            maxWidth: '540px',
            padding: 0
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
    require('@tailwindcss/typography')
  ]
};
