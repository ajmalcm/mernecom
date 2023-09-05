/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily:{
        'barlow' :['Barlow', 'sans-serif']
      },
      fontSize:{
        "small":"14px"
      },
      fontWeight:{
        "light":"400",
      },
      colors:{
        "skyblue":"#157ed2",
        "jellow":"#fdd922"
      },
      borderWidth:{
        "sb":"1px"
      }
    },
  },
  plugins: [],
}

