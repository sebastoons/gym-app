import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // Configuración para desarrollo (mantiene tu proxy)
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  
  // Configuración para build/producción (esto faltaba)
  build: {
    outDir: 'dist',
    rollupOptions: {
      input: './index.html'  // Especifica dónde está el HTML
    }
  },
  
  // Configuración de rutas
  base: '/'
})