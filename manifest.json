const CACHE_NAME = "maaz-elite-v100"; // Changed to v100 to force update
const assets = ["/"]; // Only cache the root, nothing else for now

self.addEventListener("install", (e) => {
    self.skipWaiting(); // Force this new version to take over immediately
    e.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(assets);
        })
    );
});

self.addEventListener("activate", (e) => {
    e.waitUntil(self.clients.claim()); // Take control of the page right now
});

self.addEventListener("fetch", (e) => {
    e.respondWith(
        fetch(e.request).catch(() => caches.match(e.request))
    );
});
