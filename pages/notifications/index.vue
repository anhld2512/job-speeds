<template>
  <div class="flex-row flex-wrap gap-3">
    <h1>Nuxt 3 Web Push Notifications</h1>
    <button @click="notifyUser" class="btn btn-sm btn-accent mx-1">Send Notification</button>
    <button @click="registerForPushNotifications" class="btn btn-sm btn-error mx-1">Register for Push
      Notifications</button>
  </div>
</template>

<script setup>
const { $api, $sendNotification, $urlBase64ToUint8Array } = useNuxtApp();

const registerForPushNotifications = async () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    const swReg = await navigator.serviceWorker.getRegistration();
    if (swReg) {
      const subscription = await swReg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: $urlBase64ToUint8Array('BA5xnicrkH0hO5H0Y3cK5AAik0G_j62c8mukA0eYjhQ9ShDxDvh9gksXEL-VRMoZaeT2bDh2y_1Wi2C3ro9d_9E')
      });
      await $api.post('/notifications/save-subscription', subscription);
      alert('Subscribed to push notifications');
    } else {
      alert('Service Worker registration not found');
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

</script>