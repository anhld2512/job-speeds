self.addEventListener('push', function(event) {
    const options = {
      body: event.data ? event.data.text() : 'Push message with no payload',
      icon: './favicon.ico',
      badge: './favicon.ico'
    };
  
    event.waitUntil(
      self.registration.showNotification('Push Notification', options)
    );
  });