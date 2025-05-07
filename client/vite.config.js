  import { defineConfig } from 'vite'
  import react from '@vitejs/plugin-react'

  // https://vite.dev/config/
  export default defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        '/api': {
          target: 'http://localhost:4200/api',
          changeOrigin: true,
          rewrite: (path) => {
            console.log('Rewriting path:', path); // Log the path being rewritten
            return path.replace(/^\/api/, '')
          },
        },
      },
    }    
  });
