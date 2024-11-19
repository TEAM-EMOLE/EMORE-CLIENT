/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      zIndex: {
        toast: 1000,
        popup: 1000,
        modal: 1000,
        tooltip: 1000,
        header: 4999,
        footer: 4999,
        bottomButton: 5000,
        backdrop: 9999,
      },

      colors: {
        accent: '#3E85FF',
        positive: '#3BD42D',
        error: '#EA4335',

        Gray: {
          0: '#fff',
          100: '#f9f9f9',
          200: '#e8e8e8',
          300: '#dadde0',
          400: '#c9cccf',
          500: '#b7babf',
          600: '#7b8189',
          700: '#4b4e53',
          800: '#1e1e20',
          900: '#000',
        },
      },

      fontSize: {
        10: '11px',
        11: '11px',
        12: '12px',
        14: '14px',
        16: '16px',
        18: '18px',
        20: '20px',
      },

      lineHeight: {
        120: '1.2',
        130: '1.3',
        140: '1.4',
        150: '1.5',
      },

      spacing: {
        headerHeigth: '48px',
      },
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
};
