import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      // InjectManifest niet nodig: de autoUpdate strategie + precache is genoeg
      // voor een offline (in-de-auto) werkende app. SW wordt automatisch gegenereerd.
      registerType: 'autoUpdate',
      includeAssets: [
        'lambo.svg',
        'favicon.svg',
        'icons/icon-192.png',
        'icons/icon-512.png',
        'icons/icon-maskable-512.png',
        'icons/apple-touch-icon.png',
        'offline.html'
      ],
      manifest: false, // manifest zit in /public als static file (manifest.webmanifest)
      workbox: {
        globPatterns: ['**/*.{js,css,html,svg,png,woff2}'],
        // Alles wat we bouwen wordt geprecached -> app laadt zonder wifi.
        navigateFallback: 'index.html',
        cleanupOutdatedCaches: true,
        clientsClaim: true,
        // /api/* nooit cachen (online-only auth/data).
        navigateFallbackDenylist: [/^\/api\//],
        runtimeCaching: [
          {
            // Externe fonts mogen offline ook werken zodra ze 1x geladen zijn.
            urlPattern: ({ url }) =>
              url.origin === 'https://fonts.googleapis.com' ||
              url.origin === 'https://fonts.gstatic.com',
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts',
              expiration: { maxEntries: 20, maxAgeSeconds: 60 * 60 * 24 * 365 },
              cacheableResponse: { statuses: [0, 200] }
            }
          }
        ]
      },
      devOptions: {
        // Service worker ook in dev aanzetten zodat we offline kunnen testen.
        enabled: true,
        type: 'module',
        navigateFallback: 'index.html'
      }
    })
  ],
  server: {
    port: 3000,
    open: true
  }
})
