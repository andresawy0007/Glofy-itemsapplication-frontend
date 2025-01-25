import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      manifest: {
        name: 'Items Application',
        short_name: 'IAPP',
        description: 'A simple PWA created with Vite',
        theme_color: '#ffffff',
        background_color: '#ffffff',
        display: 'standalone',
        scope: '/',
        start_url: '/',
        icons: [
          {
            src: '/icons/icon-192x192.png',
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/icon-512x512.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
        screenshots: [
          {
            src: "/screenshots/desktop.png",
            sizes: "1920x1080",
            type: "image/png",
            form_factor: "wide"
          },
          {
            src: "/screenshots/mobile.png",
            sizes: "1080x1920",
            type: "image/png"
          }
        ],
        workbox: {
          globPatterns: ['**/*.{js,css,html}'],
        }
      },
    })
  ],
})
