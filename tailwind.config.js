/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#e8edf5',
          100: '#c5d0e6',
          200: '#9db1d4',
          300: '#7492c2',
          400: '#567ab5',
          500: '#3863a8',
          600: '#2f559a',
          700: '#244589',
          800: '#1b3a6b',
          900: '#112448',
        },
        teal: {
          50: '#e3f5f3',
          100: '#b9e5e1',
          200: '#8dd4ce',
          300: '#5fc3bb',
          400: '#3db6ac',
          500: '#2a9d8f',
          600: '#238f82',
          700: '#197e72',
          800: '#0f6d62',
          900: '#014f44',
        },
        amber: {
          50: '#fdf8e9',
          100: '#f9edc5',
          200: '#f5e19e',
          300: '#f1d577',
          400: '#edcb58',
          500: '#e9c46a',
          600: '#d4a832',
          700: '#b58b1e',
          800: '#956f0e',
          900: '#704f00',
        },
        charcoal: {
          DEFAULT: '#2C2C2C',
        },
      },
      backgroundColor: {
        'light-grey': '#F7F9FB',
      },
      textColor: {
        charcoal: '#2C2C2C',
      },
      fontFamily: {
        serif: ['Merriweather', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fadeIn 0.5s ease-in-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
};
