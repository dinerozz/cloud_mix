/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  mode: "jit",
  theme: {
    fontFamily: {
      'sans': ['ui-sans-serif', 'system-ui'],
      'general': ['Libre Franklin', 'sans-serif'],
    },
    extend: {
  
      colors: {
        'tomato': {
          600: '#dc2626',
        },
        transparent: 'transparent',
        current: 'currentColor',
        'creamy': '#FFF8EE',
        'white': '#ffffff',
        'purple': '#3f3cbb',
        'midnight': '#121063',
        'metal': '#565584',
        'tahiti': '#3ab7bf',
        'silver': '#ecebff',
        'bubble-gum': '#ff77e9',
        'bermuda': '#78dcca',
        'dark-purple': '#5B68CA',
        'light-white': 'rgba(255,255,255,0.17)',
        'gray': '#f3f3f3',
        'gray-light': '#adb5bd',
        'granite-gray': '#5F5F5F',
        'dark-gray': '#A8A8A8',
        'light': '#f7f7fa',
        'red-light': '#DD6662',
        'orange-dark': '#D89D6A',
        'red-salsa': '#D95550',
        'success': '#63b66d',
        'danger': '#d42222',
        'edit': '#575866',
        'black': '#000',
        'solid-gray': '#470000',
        'shadow': 'rgb(0, 0, 0, 0.15)',
        'darker': 'rgb(0, 0, 0, 0.5)',
        'white-gray': '#efefef',
        'minion-yellow': '#D1FFC6',
        primary: "#00040f",
        secondary: "#00f6ff",
        dimWhite: "rgba(255, 255, 255, 0.7)",
        dimBlue: "rgba(9, 151, 124, 0.1)",
        'majorelle-blue': "#545AE8",
        'alice-blue': '#EDF1F5'
      },
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
    },
    screens: {
      xs: "480px",
      ss: "620px",
      sm: "768px",
      md: "1060px",
      lg: "1200px",
      xl: "1700px",
    },
  },
  plugins: [],
};