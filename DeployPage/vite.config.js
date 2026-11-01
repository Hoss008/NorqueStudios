import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: './',
  plugins: [react()],
  server: {
    port: 3000,
    open: true,
    allowedHosts: true,
    watch: {
      usePolling: true,
      interval: 300,
      ignored: ['**/*.crdownload', '**/*.tmp', '**/node_modules/**', '**/page2_figma/**']
    }
  },
  preview: {
    port: 4173,
    host: true,
    allowedHosts: true
  }
})
