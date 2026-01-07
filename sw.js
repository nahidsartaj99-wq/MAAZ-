const CACHE_NAME = "maaz-elite-safe-v1";

// We only cache the main page to start. This prevents crashing.
const assets = ["/"];

self.addEventListener("install", (e) => {
    self.skipWaiting(); // Force activation immediately
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(assets).catch(err => console.log("Cache error ignored", err));
        })
    );
});

self.addEventListener("activate", (e) => {
    // Take control of the page immediately
    e.waitUntil(self.clients.claim());
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
