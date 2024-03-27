/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
  "./src/**/*.{vue,js,ts,jsx,tsx}",
],
  theme: {
    extend: {
      colors:{
        'light-gray':'#F4F6FA',
        'gray-navy':'#626C7F',
        'blueish':'#ABC1E1',
        'navy':'#3B4D66',
        'dark-navy':'#313E51',
        'green':'#26D782',
        'red':'#EE5454',
        'purple':'#A729F5',
      }
    },
  },
  plugins: [],
}

