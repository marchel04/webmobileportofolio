const CACHE_NAME = "portfolio-cache-v1";

const urlsToCache = [
  "./",
  "./index.html",
  "./project.html",
  "./manifest.json",
  "./images/css.jpg",
  "./images/html.jpg",
  "./images/java.jpg",
  "./images/aws.png",
  "./images/Pemrograman_komputer.png",
  "./images/saya.jpg"
];

// Install service worker
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    }).catch((error) => {
      console.error("Caching failed:", error);
    })
  );
});

// Fetch requests
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Activate service worker and clean old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name);
          }
        })
      );
    })
  );
});
