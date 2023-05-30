/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      screens: {
        '2xlm': {'max': '1535px'},
        'xlm': {'max': '1279px'},
        'lgm': {'max': '1023px'},
        'mdm': {'max': '767px'},
        'smm': {'max': '639px'},
      },
      colors: {
        maxblack: '#191a1c',
        minblack: '#1f2022',
        ltblack: '#3c3e42',
        lt2black: '#5d6066',
        midnight: '#141617',
        tmax: '#000000',
        tmid: '#000000',
        tmin: '#000000',
      },
    },
  },
  plugins: [],
}

