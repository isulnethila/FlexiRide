/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./frontend/App.{js,jsx,ts,tsx}",
    "./frontend/pages/**/*.{js,jsx,ts,tsx}",
    "./frontend/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {},
    fontFamily: {
      sans: ['System'],
      serif: ['System'],
      mono: ['System'],
    },
  },
  plugins: [],
}
