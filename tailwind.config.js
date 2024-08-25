/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      screens: {
        'iphone7': {'max': '375px'},  // iPhone 7 için max genişlik: 375px
      },

      colors: {
        prim:"#83C9B9",
        second: "#5D9695",
        primTrans: "#83C9B990",
        secondTrans: "#5D969590",

        pri: '#000000',
        priTrans: '#666666',

        sec: '#ff4949',
        secTrans: '#ff494990',

        black: "#20272C",
      },

      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out forwards',
        fadeOut: 'fadeOut 0.5s ease-in-out',
        leftToRight: 'leftToRighto 0.5s ease forwards',
        rightToLeft: 'rightToLeft 0.5s ease forwards',
        stretchWidth: 'stretchWidth 0.5s ease forwards',
        visible : 'visible 1.8s ease forwards',
      },

      keyframes: {
        visible: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        stretchWidth: {
          '0%': { width: '0' },
          '100%': { width: '100vw' },
        },
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },

        leftToRighto: {
          '0%': { transform: 'translateX(-160%)' },
          '100%': { transform: 'translateX(0)' },
        },
        rightToLeft: {
          '0%': { transform: 'translateX(160%)' },
          '100%': { transform: 'translateX(0)' },
        },
        fadeOut: {
          '0%': { opacity: 1 },
          '100%': { opacity: 0 },
        },
      
      
      },

      
      fontFamily: {
         product: ['ProductSans-Light'],
      },

      boxShadow: {
        '3xl': '0px 14px 30px rgba(204, 204, 204, 0.32)',
      },

     
      
    },
  },
  plugins: [],
}
