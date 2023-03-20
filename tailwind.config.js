/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        custompurple: '#9a86f3',
        contactBg:'#0d0d30'
      },
    },
  },
  plugins: [],
}