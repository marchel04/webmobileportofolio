const CACHE_NAME = "portfolio-cache-v1"; 
// Nama cache yang digunakan. Versi ini penting untuk pengelolaan cache lama dan baru.

const urlsToCache = [
  "./",
  "./index.html",
  "./project.html",
  "./manifest.json",
  "./images/css.jpg",
  "./images/html.jpg",
  "./images/java.jpg",
  "./images/aws.png",
  "./images/Pemrograman_Komputer.png",
  "./images/saya.jpg"
];
// Daftar file yang akan disimpan di cache agar bisa diakses secara offline

// Event saat service worker pertama kali dipasang (install)
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME) // Membuka cache berdasarkan nama yang sudah ditentukan
      .then((cache) => {
        return cache.addAll(urlsToCache); // Menambahkan seluruh file ke dalam cache
      })
      .catch((err) => {
        console.error("❌ Caching failed:", err); // Menangani error jika caching gagal
      })
  );
});

// Event saat halaman melakukan permintaan resource (fetch)
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request) // Mengecek apakah file sudah ada di cache
      .then((response) => {
        return response || fetch(event.request); // Jika ada di cache, tampilkan dari cache; jika tidak, ambil dari jaringan
      })
  );
});

// Event saat service worker diaktifkan (activate)
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((name) => {
          if (name !== CACHE_NAME) {
            return caches.delete(name); // Menghapus cache lama yang tidak lagi digunakan
          }
        })
      );
    })
  );
});
