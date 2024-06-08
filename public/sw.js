self.addEventListener('push', function(event) {
  let title = 'New';
  let options = {
    message: 'You have a new message.',
      icon: './favicon.ico',
      badge: './favicon.ico'
  };
  if (event.data) {
      try {
          const data = event.data.json();
          title = data.title || title;
          options.message = data.message || options.message;
          options.icon = data.icon || options.icon;
          options.badge = data.badge || options.badge;
      } catch (e) {
          console.error('Error parsing push notification data', e);
      }
  }
  event.waitUntil(
      self.registration.showNotification(title, options)
  );
});