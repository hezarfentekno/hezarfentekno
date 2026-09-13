// Minimal service worker — enables "Add to Home Screen" installability.
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { self.clients.claim(); });
self.addEventListener('fetch', (e) => {
  // Pass-through: always fetch from network (panel data is live/dynamic, no offline caching needed)
  e.respondWith(fetch(e.request).catch(() => new Response('Bağlantı yok. Lütfen internete bağlanıp tekrar deneyin.', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })));
});
