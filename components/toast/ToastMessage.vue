<template>
  <div v-if="visible" :class="toastClass" class="fixed top-4 left-1/2 transform -translate-x-1/2 z-50 px-5 w-full md:w-1/2 lg:w-1/3 max-w-2xl">
    <div role="alert" :class="alertClass" class="flex">
      <svg @click="closeToast" v-if="typeToast === 'success'" xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>

      <svg @click="closeToast" v-if="typeToast === 'error'" xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6"
        fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <svg @click="closeToast" v-if="typeToast === 'warning'" xmlns="http://www.w3.org/2000/svg" class="stroke-current shrink-0 h-6 w-6"
        fill="none" viewBox="0 0 24 24">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </svg>
      <svg @click="closeToast" v-if="typeToast === 'info'" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
        class="stroke-current shrink-0 w-6 h-6">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <span >{{ message }}</span>
    </div>
  </div>
</template>

<script setup>

const props = defineProps({
  typeToast: {
    type: String,
    required: true,
  },
  message: {
    type: String,
    required: true,
  },
  show: {
    type: Boolean,
    required: true,
  },
});

const visible = ref(props.show);

const toastClass = computed(() => {
  switch (props.typeToast) {
    case 'success':
      return 'toast-success';
    case 'error':
      return 'toast-error';
    case 'warning':
      return 'toast-warning';
    case 'info':
      return 'toast-info';
    default:
      return '';
  }
});

const alertClass = computed(() => {
  switch (props.typeToast) {
    case 'success':
      return 'alert alert-success text-white';
    case 'error':
      return 'alert alert-error text-white';
    case 'warning':
      return 'alert alert-warning text-dark';
    case 'info':
      return 'alert alert-info text-dark';
    default:
      return '';
  }
});
const showToast = () => {
  visible.value = true;
  setTimeout(() => {
    visible.value = false;
  }, 5000);
};
const closeToast =() =>{
  visible.value = false;
}
watch(() => props.show, (newVal) => {
  if (newVal) {
    showToast();
  }
});

defineExpose({
  show: showToast,
  close: closeToast
});
</script>

<style scoped>
.toast {
  position: fixed;
  top: 2rem;
  right: 1rem;
  z-index: 9999;
}
</style>