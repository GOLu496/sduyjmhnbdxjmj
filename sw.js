self.addEventListener('install', (e) => {
    console.log('[Service Worker] Install');
});

self.addEventListener('fetch', (e) => {
    // Basic fetch functionality
    e.respondWith(fetch(e.request));
});
