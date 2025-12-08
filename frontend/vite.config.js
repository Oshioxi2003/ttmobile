import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    vue(),
    {
      name: 'admin-rewrite',
      apply: 'serve',
      configureServer(server) {
        server.middlewares.use((req, res, next) => {
          const url = req.url || ''
          // Rewrite /admin and any sub-paths (without file extension) to /admin.html
          if (url.startsWith('/admin') && !/\.[a-zA-Z0-9]+($|\?)/.test(url)) {
            req.url = '/admin.html'
          }
          next()
        })
      }
    }
  ],
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@admin': resolve(__dirname, 'src/Admin'),
      '@client': resolve(__dirname, 'src/Client')
    }
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        admin: resolve(__dirname, 'admin.html')
      }
    }
  },
  server: {
    port: 5173,
    proxy: {
      '/api': {
        target: 'http://localhost:3000',
        changeOrigin: true
      },
      // Proxy static files served by backend (e.g., /uploads/..)
      '/uploads': {
        target: 'http://localhost:3000',
        changeOrigin: true
      }
    }
  }
})

