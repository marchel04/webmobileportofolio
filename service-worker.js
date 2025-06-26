const CACHE_NAME = "portfolio-cache-v1";

const urlsToCache = [
  "/index.html",
  "/project.html",
  "/manifest.json",
  "/images/css.jpg",
  "/images/html.jpg",
  "/images/java.jpg",
  "/images/aws.png",
  "/images/Pemrograman_Komputer.png",
  "/images/saya.jpg"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        console.log("📦 Caching files:", urlsToCache);
        return cache.addAll(urlsToCache);
      })
      .catch((err) => {
        console.error("❌ Caching failed:", err);
      })
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      })
  );
});

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
