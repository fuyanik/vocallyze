/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {

      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out forwards',
        fadeOut: 'fadeOut 0.5s ease-in-out',
        leftToRight: 'leftToRighto 0.5s ease-in-out forwards',
      },

      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },

        leftToRighto: {
          '0%': { transform: 'translateX(-160%)' },
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

     
      
    },
  },
  plugins: [],
}
