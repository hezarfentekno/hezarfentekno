// Minimal service worker — enables "Add to Home Screen" installability and device notifications.
self.addEventListener('install', (e) => { self.skipWaiting(); });
self.addEventListener('activate', (e) => { self.clients.claim(); });
self.addEventListener('fetch', (e) => {
  // Pass-through: always fetch from network (panel data is live/dynamic, no offline caching needed)
  e.respondWith(fetch(e.request).catch(() => new Response('Bağlantı yok. Lütfen internete bağlanıp tekrar deneyin.', { headers: { 'Content-Type': 'text/plain; charset=utf-8' } })));
});
self.addEventListener('notificationclick', (e) => {
  e.notification.close();
  e.waitUntil(
    self.clients.matchAll({ type: 'window' }).then((clients) => {
      for (const client of clients) { if ('focus' in client) return client.focus(); }
      if (self.clients.openWindow) return self.clients.openWindow('./index.html');
    })
  );
});
