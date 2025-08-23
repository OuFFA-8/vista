/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,ts}",
    "./node_modules/flowbite/**/*.js",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['GE SS Two', 'Cairo', 'sans-serif'],
      },
      colors: {
        'vsta-dark-blue': '#111111',
        'vsta-purple': '#6b43f4',
        'vsta-teal': '#40FFBA',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar-hide'),
    function ({ addUtilities }) {
      const newUtilities = {
        '.direction-rtl': {
          direction: 'rtl',
        },
        '.direction-ltr': {
          direction: 'ltr',
        },
      }
      addUtilities(newUtilities)
    }
  ],
}

