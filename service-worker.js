const cacheName = 'portfolio-cache-v1';
const assetsToCache = [
  '/index.html',
  '/project.html',
  '/manifest.json',
  '/style.css',
  '/images/saya.jpg',
  '/images/aws.png',
  '/images/Pemrograman_Komputer.png',
  '/images/html.jpg',
  '/images/css.jpg',
  '/images/java.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => cache.addAll(assetsToCache))
      .catch(err => console.error('❌ Gagal cache:', err))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(cached => cached || fetch(event.request))
  );
});
