import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  
  server: {
    port: 5173,
    host: true,
  },
  
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      input: './index.html',
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom', 'react-router-dom'],
        }
      }
    }
  },

  base: '/',
  publicDir: 'public'
})