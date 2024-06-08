<template>
  <div class="flex-row flex-wrap gap-3">
    <h1>Nuxt 3 Web Push Notifications</h1>
    <button @click="notifyUser" class="btn btn-sm btn-accent mx-1">Send Notification</button>
    <button @click="registerForPushNotifications" class="btn btn-sm btn-accent mx-1">Register</button>
  </div>
</template>

<script setup>

const { $api, $sendNotification, $urlBase64ToUint8Array } = useNuxtApp();

const registerForPushNotifications = async () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      // Đăng ký hoặc lấy Service Worker hiện tại
      const swReg = await navigator.serviceWorker.register('/sw.js');
      console.log('Service Worker registered:', swReg);

      // Yêu cầu quyền hiển thị thông báo
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        alert('Permission not granted for Notification');
        return;
      }

      // Kiểm tra nếu đã có đăng ký
      let subscription = await swReg.pushManager.getSubscription();
      if (!subscription) {
        // Tạo đăng ký mới
        subscription = await swReg.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: $urlBase64ToUint8Array('BA5xnicrkH0hO5H0Y3cK5AAik0G_j62c8mukA0eYjhQ9ShDxDvh9gksXEL-VRMoZaeT2bDh2y_1Wi2C3ro9d_9E')
        });
      }

      // Gửi đăng ký lên server
      await $api.post('notifications/save-subscription', subscription);
      alert('Subscribed to push notifications');
    } catch (error) {
      console.error('Failed to subscribe the user: ', error);
      alert('Failed to subscribe the user');
    }
  } else {
    alert('Push messaging is not supported');
  }
};

function notifyUser() {
  const title = 'Hello';
  const message = 'This is a test notification';
  $sendNotification(title, message);
}

onMounted(() => {
  nextTick().then(() => {
    setTimeout(() => {
    }, 1);
  });
});
</script>