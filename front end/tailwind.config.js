module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
      fontFamily: {
      'sans' : ['Space Grotesk', 'sans-serif']
    },
    extend: {
      spacing: {
        '-4': '-16px', // add a custom negative value of -4rem
      },
    },

  },
  plugins: [],
};
