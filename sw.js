// Service Worker dasar untuk ManagePro F&B
// Tujuan: memenuhi syarat PWA installable (bukan untuk caching agresif,
// karena app ini live/real-time — data kasir tidak boleh basi).

const CACHE_NAME = 'managepro-shell-v1';

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Pass-through saja: selalu ambil dari network, tidak menyimpan cache data
// transaksi/stok supaya angka yang tampil selalu yang terbaru.
self.addEventListener('fetch', (event) => {
  event.respondWith(
    fetch(event.request).catch(() => caches.match(event.request))
  );
});
