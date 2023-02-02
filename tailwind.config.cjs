/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  darkMode: 'class',
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'), // add this line
    require("daisyui")
  ],
  daisyui: {
    themes: ["cmyk", "dracula", "dark", "light"],
    darkTheme: "dracula",
  },
}