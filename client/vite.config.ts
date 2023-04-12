import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    // generate manifest.json in outDir
    manifest: true,
    rollupOptions: {
      // overwrite default .html entry
      input: '/src/main.tsx',
    },
  },
  server: {
    port: 8080,
    proxy: {
      '/troveql': 'http://localhost:4000/troveql',
      '/reset': 'http://localhost:4000/reset',
    }
  }
})
