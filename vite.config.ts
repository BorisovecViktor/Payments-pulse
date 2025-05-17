import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  server: {
    port: 3000,
  },
  resolve: {
    alias: {
      app: '/src/app',
      layout: '/src/layout',
      api: '/src/api',
      components: '/src/components',
      features: '/src/features',
      lib: '/src/lib',
    },
  },
  plugins: [react()],
})
