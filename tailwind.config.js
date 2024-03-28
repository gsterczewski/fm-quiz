/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  darkMode: 'selector',
  theme: {
    extend: {
      colors: {
        'light-gray': '#F4F6FA',
        'gray-navy': '#626C7F',
        blueish: '#ABC1E1',
        navy: '#3B4D66',
        'dark-navy': '#313E51',
        green: {
          100: '#E0FDEF',
          500: '#26D782'
        },
        red: {
          100: '#FFF1E9',
          500: '#EE5454'
        },
        purple: {
          100: '#F6E7FF',
          200: '#D394FA',
          500: '#A729F5'
        },
        blue: {
          100: '#EBF0FF',
          500: '#306AFF'
        }
      },
      backgroundImage: {
        mobile: "url('images/pattern-background-mobile-light.svg')",
        'mobile-dark': "url('images/pattern-background-mobile-dark.svg')",
        tablet: "url('images/pattern-background-tablet-light.svg')",
        'tablet-dark': "url('images/pattern-background-tablet-dark.svg')",
        desktop: "url('images/pattern-background-desktop-light.svg')",
        'desktop-dark': "url('images/pattern-background-desktop-dark.svg')"
      }
    }
  },
  plugins: []
};
