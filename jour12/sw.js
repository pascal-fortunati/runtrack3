const CACHE_NAME = "horloge-android-pwa-v3";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.json",
  "./sw.js",
  "./scripts/app.js",
  "./scripts/boot.js",
  "./scripts/clock.js",
  "./scripts/alarm.js",
  "./scripts/timer.js",
  "./scripts/stopwatch.js",
  "./scripts/storage.js",
  "./scripts/toast.js",
  "./sounds/alarme.wav",
  "./sounds/notification.wav",
  "./sounds/sidebarhaut.wav",
  "./sounds/boot.wav"
];

// Installation : mise en cache des fichiers principaux
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(ASSETS))
  );
});

// Activation : nettoyage des anciens caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) {
            return caches.delete(key);
          }
          return null;
        })
      )
    )
  );
});

// Fetch : stratégie cache-first
self.addEventListener("fetch", (event) => {
  const { request } = event;
  if (request.method !== "GET") return;

  event.respondWith(
    caches.match(request).then((cached) => {
      if (cached) return cached;
      return fetch(request).then((response) => {
        const clone = response.clone();
        caches.open(CACHE_NAME).then((cache) => {
          cache.put(request, clone);
        });
        return response;
      });
    })
  );
});