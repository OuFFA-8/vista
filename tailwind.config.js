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
        'vsta-teal': '#b1aafe',
      },
      animation: {
        'infinite-scroll': 'infinite-scroll 40s linear infinite',
        'wiggle': 'wiggle 1s ease-in-out infinite',

      },
      keyframes: {
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'wiggle': {
          '0%, 100%': { transform: 'rotate(-8deg)' },
          '50%': { transform: 'rotate(8deg)' },
        },
        'scroll-down': {
          '0%': { transform: 'translateY(0)', opacity: '1' },
          '80%, 100%': { transform: 'translateY(24px)', opacity: '0' },
        }

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

