/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      fontFamily: {
        jakarta: ["Jakarta", "sans-serif"],
        jetbrains: ["JetBrains Mono", "monospace"],
      },
      ringWidth: ['hover', 'active'],
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
