/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    'node_modules/flowbite/**/*.{js,jsx,ts,tsx}',
    "./src/**/*.{vue,js,ts,jsx,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('flowbite/plugin')
  ],
}

