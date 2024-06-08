<template>
  <div class="container mx-auto max-w-xl px-3 text-center">
    <div class="border-dashed border-2 border-primary rounded-xl w-full gap-6 p-5">
      <div class="flex items-center justify-between mb-3">
        <button @click="registerForPushNotifications" class="btn btn-sm btn-circle btn-error mx-1">
          <i class="bi bi-bell text-lg"></i>
        </button>
        <h3 class="text-xl font-black">Push Notification</h3>
        <button @click="sendNotification" class="btn btn-sm btn-accent my-2">
          <div class="flex gap-2">
            <i class="bi bi-send"></i>
            <span>Send</span>
          </div>
        </button>
      </div>
      <div class="flex-row flex-wrap gap-6">
        <!-- Input for notification title -->
        <input v-model="notificationTitle" type="text" placeholder="Notification Title"
          class="input input-bordered mb-3 w-full">
        <!-- Input for notification body -->
        <input v-model="notificationMessage" type="text" placeholder="Notification Body"
          class="input input-bordered mb-3 w-full">
          <input v-model="notificationUrl" placeholder="Enter notification URL" class="input input-bordered mb-3 w-full"/>

      </div>
    </div>
  </div>
  <ModalDialogMessage ref="modalMessage" />
</template>

<script setup>

const { $api, $urlBase64ToUint8Array, $sendNotification} = useNuxtApp();
const notificationTitle = ref('');
const notificationMessage = ref('');
const notificationUrl = ref('');
const modalMessage = ref(null)
const registerForPushNotifications = async () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      // Đăng ký hoặc lấy Service Worker hiện tại
      const swReg = await navigator.serviceWorker.register('/sw.js');

      // Yêu cầu quyền hiển thị thông báo
      const permission = await Notification.requestPermission();
      if (permission !== 'granted') {
        registerForPushNotifications()
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
    } catch (error) {
      console.error('Failed to subscribe the user: ', error);
      modalMessage.value.openDialog('Failed', 'Failed to subscribe the user.');
    }
  } else {
    modalMessage.value.openDialog('Warning', 'Push messaging is not supported.');
  }
};

const sendNotification = async () => {
  const title = notificationTitle.value.trim() || 'JobSpeed';
  const message = notificationMessage.value.trim() || 'You have a new notification from JobSpeed';
  const url = notificationUrl.value.trim() || 'https://default.url';
  $sendNotification(title, message, url);
};

onMounted(() => {
  nextTick().then(() => {
    setTimeout(() => {
      registerForPushNotifications();
    }, 1);
  });
});
</script>