<template>
   <div class="container w-full max-w-xl mx-auto flex flex-wrap justify-between items-center bg-base-100 rounded-md dark:bg-slate-500">
    <div class="text-center border-dashed border-2 border-primary rounded-xl w-full p-20">
      <I class='bx bxs-contact bx-lg mb-5 dark:text-white'></I>
      <div class="flex-row flex-wrap gap-3">
        <!-- Input for notification title -->
        <input v-model="notificationTitle" type="text" placeholder="Notification Title" class="input input-bordered mb-2 w-full">
        <!-- Input for notification body -->
        <input v-model="notificationMessage" type="text" placeholder="Notification Body" class="input input-bordered mb-2 w-full">
        <!-- Button to send notification -->
        <button @click="sendNotification" class="btn btn-sm btn-accent mx-1">
          <div class="flex gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-send" viewBox="0 0 16 16">
              <path d="M15.854.146a.5.5 0 0 1 .11.54l-5.819 14.547a.75.75 0 0 1-1.329.124l-3.178-4.995L.643 7.184a.75.75 0 0 1 .124-1.33L15.314.037a.5.5 0 0 1 .54.11ZM6.636 10.07l2.761 4.338L14.13 2.576zm6.787-8.201L1.591 6.602l4.339 2.76z"/>
            </svg>
            <span>Send</span>
          </div>
        </button>
        <!-- Button to register for push notifications -->
        <button @click="registerForPushNotifications" class="btn btn-sm btn-error mx-1">
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-bell" viewBox="0 0 16 16">
            <path d="M8 16a2 2 0 0 0 2-2H6a2 2 0 0 0 2 2M8 1.918l-.797.161A4 4 0 0 0 4 6c0 .628-.134 2.197-.459 3.742-.16.767-.376 1.566-.663 2.258h10.244c-.287-.692-.502-1.49-.663-2.258C12.134 8.197 12 6.628 12 6a4 4 0 0 0-3.203-3.92zM14.22 12c.223.447.481.801.78 1H1c.299-.199.557-.553.78-1C2.68 10.2 3 6.88 3 6c0-2.42 1.72-4.44 4.005-4.901a1 1 0 1 1 1.99 0A5 5 0 0 1 13 6c0 .88.32 4.2 1.22 6"/>
          </svg>
          <span>Register</span>
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>

const { $api, $urlBase64ToUint8Array } = useNuxtApp();
const notificationTitle = ref('');
const notificationMessage = ref('');
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

const sendNotification = async () => {
    const notificationPayload = {
        title: notificationTitle.value,
        body: notificationMessage.value,
    };

    await $api.post('notifications/send-notification', notificationPayload);
};

onMounted(() => {
  nextTick().then(() => {
    setTimeout(() => {
      registerForPushNotifications();
    }, 1);
  });
});
</script>