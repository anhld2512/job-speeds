
self.addEventListener('push', function(event) {
    console.log('[Service Worker] Push Received.');
    const data = event.data.json();
  
    const title = data.title || 'Default Title';
    const options = {
      body: data.message || 'Default message body',
      icon: './favicon.ico',
      badge: './favicon.ico',
      data: {
        url: data.url || 'https://default.url' // Include the URL in the notification data
      }
    };
  
    event.waitUntil(
      self.registration.showNotification(title, options)
    );
  });
  
  self.addEventListener('notificationclick', function(event) {
    event.notification.close(); // Close the notification
    event.waitUntil(
      clients.openWindow(event.notification.data.url) // Open the URL when the notification is clicked
    );
  });