// tailwind.config.js

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Add this line
  darkMode: 'class',

  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [],
}