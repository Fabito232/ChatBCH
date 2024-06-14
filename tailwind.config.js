/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/App.jsx",
    "./src/components/Login.jsx",
    "./src/components/Register.jsx",
  ],
  theme: {
    extend: {
      backgroundImage: {
        'logo': "url('./src/assets/Logo.png')",
      },
      colors: {
        'custom-dark': '#373739',
        'custom-black-light': '#19191a',
        'custom-black': '#020202',
        'custom-blue-light': '#60d4ea',
        'custom-blue-sky': '#9ae5f3',
      },
    },
  },
  plugins: [],
}


