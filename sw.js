const CACHE_NAME = 'whatsapp-call-v1';

// 1. Install Event: Force activation immediately
self.addEventListener('install', (event) => {
    console.log('[Service Worker] Installing...');
    // यह लाइन पुराने Service Worker को हटाकर नए को तुरंत एक्टिवेट करती है
    self.skipWaiting();
});

// 2. Activate Event: Take control of the page immediately
self.addEventListener('activate', (event) => {
    console.log('[Service Worker] Activating...');
    // यह लाइन पेज को बिना रिलोड किए कंट्रोल में ले लेती है
    event.waitUntil(clients.claim());
});

// 3. Push Event: Handle Notification
self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    const data = event.data ? event.data.text() : 'Incoming Video Call';

    const title = 'WhatsApp Call';
    const options = {
        body: data,
        icon: 'https://cdn-icons-png.flaticon.com/512/124/124034.png',
        badge: 'https://cdn-icons-png.flaticon.com/512/124/124034.png',
        vibrate: [200, 100, 200],
        data: { url: './index.html' }
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

// 4. Notification Click Event
self.addEventListener('notificationclick', function(event) {
    event.notification.close();
    event.waitUntil(clients.openWindow(event.notification.data.url));
});
