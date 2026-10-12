const CACHE_NAME = "et-cbt-v1";

const filesToCache = [
  "/",
  "/index.html",
  "/manifest.json",
  "/icons/icon-192.png",
  "/icons/icon-512.png",
  "/quizlogin.js",
  "/instructions.html",
  "/questsbk.js",
  "/quiz.html",
  "/quizselpg.html",
  "/shortcuts.js",
  "/ui.js",
  "/thanks.html",
  "/stys.css",
  "/review.html"
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(filesToCache))
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});