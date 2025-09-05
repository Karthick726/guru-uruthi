import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  build: {
    ssr:true,
    rollupOptions: {
      input: {
        client: './src/main.jsx',
        server: './src/entry-server.jsx'
      }
    }
  },
  ssr: {
    noExternal: ['react-helmet-async']
  }
})