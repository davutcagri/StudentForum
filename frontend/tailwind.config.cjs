/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#CC2222',
          dark: '#A31A1A',
          light: '#E03333',
        },
      },
    },
  },
  plugins: [],
}
