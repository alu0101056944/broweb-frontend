// tailwind.config.js
import typography from '@tailwindcss/typography'; // 1. Import it

/** @type {import('tailwindcss').Config} */
module.exports = {
  // Add this line
  darkMode: 'class',

  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {},
  },
  plugins: [
    typography()
  ],
}