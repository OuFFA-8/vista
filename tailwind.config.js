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
        'vsta-dark-blue': '#0D0D1F',
        'vsta-purple': '#1A1A3D',
        'vsta-teal': '#2CE6A7',
      }
    },
  },
  plugins: [
    require('flowbite/plugin'),
    require('tailwind-scrollbar-hide')
  ],
}

