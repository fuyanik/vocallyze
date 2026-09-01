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
        prim:"#93CEF9",
        second: "#00688F",
        primTrans: "#93CEF990",
        secondTrans: "#00688F90",

        pri: '#000000',
        priTrans: '#666666',

        sec: '#00688F',
        secTrans: '#00688F90',

        black: "#20272C",

        // ── Ported landing design tokens (Navbar / Hero / PanelDemo only) ──
        background: "var(--color-background)",
        foreground: "var(--color-foreground)",
        primary: {
          DEFAULT: "var(--color-primary)",
          light: "var(--color-primary-light)",
          dark: "var(--color-primary-dark)",
        },
        accent: {
          DEFAULT: "var(--color-accent)",
          light: "var(--color-accent-light)",
        },
        surface: {
          DEFAULT: "var(--color-surface)",
          light: "var(--color-surface-light)",
          lighter: "var(--color-surface-lighter)",
        },
        muted: "var(--color-muted)",
        border: "var(--color-border)",
        danger: "var(--color-danger)",
        card: {
          DEFAULT: "var(--color-card)",
          hover: "var(--color-card-hover)",
        },
      },

      animation: {
        fadeIn: 'fadeIn 0.5s ease-in-out forwards',
        fadeInSlow: 'fadeIn 2s ease-in-out forwards',
        fadeOut: 'fadeOut 0.5s ease-in-out',
        leftToRight: 'leftToRighto 0.5s ease forwards',
        rightToLeft: 'rightToLeft 0.5s ease forwards',
        bottomToTop: 'bottomToTop 0.5s ease forwards',
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
        bottomToTop: {
          '0%': { transform: 'translateY(160%)' },
          '100%': { transform: 'translateY(0)' },
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
