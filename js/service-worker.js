const CACHE_NAME = "4D-Youth-Cache-v1";
const ASSETS_TO_CACHE = [
    "./",
    "./index.html",
    "./manifest.json",
    "./Services/assets/logo.png",  // ✅ Corrected path
    "./css/header.css",
    "./css/body.css",
    "./css/footer.css"
];

// Install Service Worker & Cache Assets
self.addEventListener("install", (event) => {
    console.log("Service Worker: Installing...");
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            console.log("Caching assets...");
            return cache.addAll(ASSETS_TO_CACHE).catch((error) => {
                console.error("Cache failed:", error);
            });
        })
    );
});

// Activate Service Worker & Cleanup Old Caches
self.addEventListener("activate", (event) => {
    console.log("Service Worker: Activating...");
    event.waitUntil(
        caches.keys().then((cacheNames) => {
            return Promise.all(
                cacheNames.map((cache) => {
                    if (cache !== CACHE_NAME) {
                        console.log("Deleting old cache:", cache);
                        return caches.delete(cache);
                    }
                })
            );
        })
    );
});

// Fetch Cached Assets (Offline Support)
self.addEventListener("fetch", (event) => {
    console.log("Service Worker: Fetching", event.request.url);
    event.respondWith(
        caches.match(event.request).then((response) => {
            if (response) {
                console.log("Serving from cache:", event.request.url);
                return response;
            }
            return fetch(event.request).catch(() => {
                console.warn("Fetch failed, serving fallback:", event.request.url);
                return caches.match("./index.html"); // Fallback to homepage if offline
            });
        })
    );
});
