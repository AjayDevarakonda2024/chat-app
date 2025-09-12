import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',
      manifest: {
        name: 'Pluto',
        short_name: 'Pluto',
        icons: [
          { src: '/whats app.png', sizes: '192x192', type: 'image/png' },
          { src: '/whats app.png', sizes: '512x512', type: 'image/png' }
        ]
      }
    })
  ],
  build: {
    outDir: 'dist'
  },
  base : '/'
})
