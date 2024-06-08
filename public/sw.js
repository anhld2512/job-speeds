
self.addEventListener('push', function(event) {
  const data = event.data.json();

  const title = data.title || 'Default Title';
  const options = {
    body: data.message || 'Default message body',
    icon: '/logo/logo_250x250.png', // Đường dẫn tới biểu tượng của bạn
    badge: '/logo/logo_250x250.png', // Đường dẫn tới biểu tượng nhỏ của bạn
    data: {
      url: data.url || '/' // Đảm bảo rằng URL được bao gồm trong dữ liệu thông báo
    }
  };

  event.waitUntil(
    self.registration.showNotification(title, options)
  );
});
  
  self.addEventListener('notificationclick', function(event) {
    console.log('[Service Worker] Notification click Received.');
  
    event.notification.close(); // Đóng thông báo
  
    event.waitUntil(
      clients.openWindow(event.notification.data.url) // Mở URL khi thông báo được nhấp
    );
  });