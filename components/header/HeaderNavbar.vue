<template>
  <div class="navbar w-full justify-between bg-base-100 max-w-full">
    <div v-if="!isServiceError" class="navbar-start gap-5">
      <div class="drawer">
        <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
        <div class="drawer-content flex items-center justify-start">
          <!-- Page content here -->
          <label for="my-drawer-2" tabindex="0" role="button" class="btn btn-ghost btn-circle drawer-button">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
              stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h7" />
            </svg>
          </label>
        </div>
        <div class="drawer-side z-50">
          <input type="checkbox" class="drawer-toggle" id="my-drawer-2" />
          <label for="my-drawer-2" class="drawer-overlay"></label>
          <HeaderNavbarList />
        </div>
      </div>
    </div>
    <div class="navbar-center">
      <a class="btn btn-ghost text-xl" href="/">Job Speeds</a>
    </div>
    <div class="navbar-end">
      <div class="flex gap-3 items-center justify-center">
        <button v-if="User && isPWA && !isServiceError" @click="registerForPushNotifications" class="btn btn-sm btn-circle btn-error mx-1">
          <i class="bi bi-bell text-lg"></i>
        </button>
        <HeaderMode />
        <div v-if="User && !isServiceError" class="dropdown dropdown-end w-full">
          <HeaderProfileDropdown  v-model="User"/>
        </div>
      </div>
    </div>
  
  </div>

  <!-- <div class="text-sm px-6 breadcrumbs py-1">
      <HeaderBreadcrumbs />
    </div> -->
</template>

<script setup>
const { $util, payload: nuxtPayload , $_,$api, $urlBase64ToUint8Array } = useNuxtApp();
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {}
  },
  isServiceError:{
    type: Boolean,
    default: () => {}
  }
});
const { modelValue,isServiceError } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);
const User = computed({
  get() {
    return modelValue?.value ?? {};
  },
  set(value) {
    if (!$_.isEqual(modelValue.value, value)) {
      emit("update:modelValue", value)
    }
  }
});
const isPWA = ref(false)
const registerForPushNotifications = async () => {
  if ('serviceWorker' in navigator && 'PushManager' in window) {
    try {
      isPWA.value = true
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
</script>

<style scoped></style>
