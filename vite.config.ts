import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use conditional base path - empty for Netlify, repo name for GitHub Pages
  base: process.env.GITHUB_PAGES === 'true' ? '/portfolio-2.0/' : '/', 
  server: {
    port: 3000,
  },
  build: {
    outDir: 'dist',
    sourcemap: true,
  },
})
