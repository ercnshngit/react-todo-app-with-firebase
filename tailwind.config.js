/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#B5D6D6',
        secondary: '#111',
      },
      fontFamily: {
        'sans': ['Poppins'],
      },
    },
  },
  plugins: [],
}
