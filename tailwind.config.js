/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#DB2777', // Dark Pink (pink-600)
        secondary: '#BE185D', // Deep Rose / Magenta (pink-700)
        accent: '#F43F5E', // Rose Pink (rose-500)
      }
    },
  },
  plugins: [],
}
