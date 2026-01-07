const CACHE_NAME = "maaz-elite-v103"; // Version 103 forces a fresh start

// We only cache the main pages. We do NOT cache the image because it is a live link.
const assets = [
  "/",
  "/index.html",
  "/games.html",
  "/manifest.json"
];

self.addEventListener("install", (e) => {
    self.skipWaiting(); // Force activation immediately
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(assets);
        })
    );
});

self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            );
        }).then(() => self.clients.claim())
    );
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
