/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,svelte,ts}'],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'), // add this line
    require("daisyui")
  ],
  daisyui: {
    themes: ["cmyk", "dracula"],
    darkTheme: "dracula",
  },
}