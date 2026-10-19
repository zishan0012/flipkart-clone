/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        fkBlue: {
          DEFAULT: '#2874f0',
          dark: '#1259c7',
          light: '#eaf1fc'
        },
        fkOrange: {
          DEFAULT: '#fb641b',
          hover: '#e25512'
        },
        fkYellow: {
          DEFAULT: '#ff9f00',
          hover: '#e08c00',
          plus: '#ffe500'
        },
        fkGreen: {
          DEFAULT: '#388e3c',
          light: '#e8f5e9'
        },
        fkBg: '#f1f3f6',
        fkCard: '#ffffff',
        fkText: {
          primary: '#212121',
          secondary: '#878787',
          muted: '#9e9e9e'
        },
        fkBorder: '#f0f0f0',
        fkDivider: '#e0e0e0'
      },
      fontFamily: {
        roboto: ['Roboto', 'Arial', 'sans-serif'],
      },
      boxShadow: {
        fkCard: '0 1px 2px 0 rgba(0,0,0,0.2)',
        fkDropdown: '0 4px 16px 0 rgba(0,0,0,0.2)',
        fkHeader: '0 1px 1px 0 rgba(0,0,0,.16)',
        fkModal: '0 24px 38px 3px rgba(0,0,0,0.14), 0 9px 46px 8px rgba(0,0,0,0.12), 0 11px 15px -7px rgba(0,0,0,0.2)'
      },
      borderRadius: {
        fk: '2px',
        fkLg: '4px'
      }
    },
  },
  plugins: [],
}
