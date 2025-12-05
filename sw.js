self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    console.log(`[Service Worker] Push had this data: "${event.data.text()}"`);

    const title = 'WhatsApp Call';
    const options = {
        body: event.data.text() || 'Incoming Video Call...',
        icon: 'https://cdn-icons-png.flaticon.com/512/124/124034.png', // WhatsApp Icon
        badge: 'https://cdn-icons-png.flaticon.com/512/124/124034.png',
        vibrate: [200, 100, 200, 100, 200, 100, 200], // Phone vibration pattern
        data: {
            url: './index.html' // Clicking notification opens the app
        }
    };

    event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');
    event.notification.close();

    event.waitUntil(
        clients.openWindow(event.notification.data.url)
    );
});
