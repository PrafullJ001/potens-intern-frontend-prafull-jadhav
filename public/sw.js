const CACHE_NAME = "civicvoice-v1";

// App shell — the minimum needed to boot the UI offline.
// Vite's hashed JS/CSS filenames are cached dynamically on first fetch (see below),
// since we can't know their exact names ahead of a build.
const PRECACHE_URLS = ["/", "/manifest.json", "/offline.html"];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(PRECACHE_URLS))
  );
  self.skipWaiting();
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
  self.clients.claim();
});

self.addEventListener("fetch", (event) => {
  const { request } = event;

  // never intercept cross-origin or non-GET requests
  if (request.method !== "GET" || !request.url.startsWith(self.location.origin)) {
    return;
  }

  event.respondWith(
    caches.match(request).then((cached) => {
      const networkFetch = fetch(request)
        .then((response) => {
          // cache a copy of successful same-origin responses for offline reuse
          if (response && response.status === 200) {
            const responseClone = response.clone();
            caches.open(CACHE_NAME).then((cache) => cache.put(request, responseClone));
          }
          return response;
        })
        .catch(() => {
          // network failed — serve cached version, or offline fallback for navigations
          if (cached) return cached;
          if (request.mode === "navigate") {
            return caches.match("/offline.html");
          }
        });

      // cache-first for speed on slow 3G, falling back to network if not cached
      return cached || networkFetch;
    })
  );
});