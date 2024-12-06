/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,jsx,tsx}',
    './components/**/*.{js,jsx,tsx}',
    './app/**/*.{js,jsx,tsx}',
    './src/**/*.{js,jsx,tsx}'
  ],
  theme: {
    extend: {}
  },
  plugins: [require('tailwindcss-animate'), require('daisyui')]
}
