import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://gdladder.com', // Replace with the API URL
        changeOrigin: true
      }
    }
  },
  base: "/"
})
