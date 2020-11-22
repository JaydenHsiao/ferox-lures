module.exports = {
  important: true,
  theme: {
    extend: {
      colors: {
        primary: '#4D65D1',
      },
      margin: {
        96: '24rem',
        128: '32rem',
      },
    },
    container: {
      center: true,
    },
  },
  variants: {
    extend: {
      backgroundColor: ['even'],
      margin: ['even'],
    },
  },
}
