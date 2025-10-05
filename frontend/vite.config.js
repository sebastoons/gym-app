import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  // Configuración para desarrollo
  server: {
    port: 5173,
    host: true, // Permite acceso desde red local (importante para probar en móvil)
    // IMPORTANTE: En producción NO se usa proxy, se usa VITE_API_URL
    proxy: {
      '/api': {
        target: 'http://localhost:8000',
        changeOrigin: true,
        secure: false,
      }
    }
  },
  
  // Configuración para build/producción
  build: {
    outDir: 'dist',
    sourcemap: false, // No generar sourcemaps en producción (más ligero)
    rollupOptions: {
      input: './index.html',
      output: {
        // Separar vendors para mejor caché
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
  },

  css: {
    devSourcemap: true
  },

  // Configuración de rutas
  base: '/',

  // Copiar archivos estáticos desde public/
  publicDir: 'public'
})
