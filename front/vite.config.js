import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      src: '/src'
    }
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8080'
    },
    watch: {
      usePolling: true
    },
    host: true,
    strictPort: true,
    port: 5173
  },
  css: {
    modules: {
      localsConvention: 'camelCaseOnly'
    },
    preprocessorOptions: {
      scss: {
        additionalData: `
          @use 'src/styles/theme' as *;
        `
      }
    }
  }
})
