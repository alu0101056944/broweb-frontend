// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from "@tailwindcss/vite";

import react from '@astrojs/react';

const SITE_URL = process.env.VERCEL_URL 
  ? `https://${process.env.VERCEL_URL}`
  : 'https://davidjbarrios.com';

// https://astro.build/config
export default defineConfig({
  site: SITE_URL,
  integrations: [react()],
  vite: {
    plugins: [tailwindcss()],
  },
});
