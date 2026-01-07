const CACHE_NAME = "maaz-elite-v102"; // Version 102 forces a fresh update

// We only cache the main pages first. This prevents the install from crashing 
// if an image name is slightly wrong.
const assets = [
  "/",
  "/index.html",
  "/games.html",
  "/manifest.json"
];

// 1. Install Event: Caches the core files
self.addEventListener("install", (e) => {
    self.skipWaiting(); // Forces this new Service Worker to take over immediately
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(assets);
        })
    );
});

// 2. Activate Event: Cleans up old versions and takes control
self.addEventListener("activate", (e) => {
    e.waitUntil(
        caches.keys().then((keys) => {
            return Promise.all(
                keys.map((key) => {
                    if (key !== CACHE_NAME) return caches.delete(key);
                })
            );
        }).then(() => self.clients.claim()) // Tells the browser "I'm the boss now"
    );
});

// 3. Fetch Event: Tries to get live files, falls back to cache if offline
self.addEventListener("fetch", (e) => {
    e.respondWith(
        fetch(e.request)
            .catch(() => caches.match(e.request))
    );
});
