/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      keyframes: {
        gradient: {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
      animation: {
        gradient: 'gradient 5s ease infinite',
      },
      fontFamily: {
        raleway: ['"Raleway"', 'system-ui', 'sans-serif'],
        'dm-sans': ['"DM Sans"', 'system-ui', 'sans-serif'],
      },
      colors: {
        secondary: {
          50: '#F4F1FA', // -> 0.5
          100: '#EAE3F5', // -> 1
          150: '#DFD6F0', // -> 1.5
          200: '#D5C8EB', // -> 2
          300: '#BFACE1', // -> 3
          400: '#AA91D7', // -> 4
          500: '#9575CD', // -> 5
          600: '#795FA8', // -> 6
          700: '#5E4983', // -> 7
          800: '#42335D', // -> 8
          900: '#271D38', // -> 9
          950: '#191226', // -> 9.5
          1000: '#0B0713', // -> 10
          DEFAULT: '#9575CD', // -> 5
        },
      },
    },
  },
  plugins: [],
};
