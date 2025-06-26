const cacheName = 'portfolio-v1';
const assets = [
  '/',
  '/portfolio/index.html',
  '/portfolio/project.html',
  '/portfolio/style.css',
  '/portfolio/manifest.json',
  '/portfolio/images/saya.jpg',
  '/portfolio/images/aws.png',
  '/portfolio/images/Pemrograman_Komputer.png',
  '/portfolio/images/html.jpg',
  '/portfolio/images/css.jpg',
  '/portfolio/images/java.jpg'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName)
      .then(cache => {
        return cache.addAll(assets);
      })
      .catch(error => {
        console.error('Gagal cache:', error);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(cached => {
      return cached || fetch(event.request);
    })
  );
});
