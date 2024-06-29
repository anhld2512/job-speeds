<template>
  <div v-if="loading" id="loading" class="fixed inset-0 flex justify-center items-center bg-white z-50">
    <div class="text-center">
      <span class="loading loading-spinner text-accent w-20 h-20"></span>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

const emits = defineEmits(['payload']);
const loading = ref(true);

const applyTheme = (theme) => {
  const bgColor = theme === 'dark' ? '#1d232a' : '#ffffff';
  document.body.style.backgroundColor = bgColor;
  const loadingElement = document.getElementById('loading');
  if (loadingElement) {
    loadingElement.style.backgroundColor = bgColor;
  }
};

const setFirstVisitFlag = () => {
  const currentTime = new Date().getTime();
  localStorage.setItem('firstVisit', currentTime);
};

const isFirstVisit = () => {
  const firstVisit = localStorage.getItem('firstVisit');
  if (!firstVisit) {
    setFirstVisitFlag();
    return true;
  }

  const currentTime = new Date().getTime();
  const timeElapsed = currentTime - parseInt(firstVisit, 10);
  const thirtyMinutes = 30 * 60 * 1000;

  if (timeElapsed > thirtyMinutes) {
    setFirstVisitFlag();
    return true;
  }

  return false;
};

onMounted(() => {
  const originalTheme = localStorage.getItem('theme') || 'light';
  applyTheme(originalTheme);

  if (isFirstVisit()) {
    setTimeout(() => {
      loading.value = false;
      emits('payload', loading.value);
    }, 3000);
  } else {
    loading.value = false;
    emits('payload', loading.value);
  }
});
</script>

<style scoped>
#loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ffffff;
  z-index: 9999;
  display: flex;
  justify-content: center;
  align-items: center;
}
html, body {
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
}
body {
  background: #ffffff;
}
</style>
