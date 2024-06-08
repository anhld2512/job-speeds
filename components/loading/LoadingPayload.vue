<template>
     <div v-if="loading" id="loading" class="fixed inset-0 flex justify-center items-center bg-white z-50">
      <div class="text-center">
        <span class="loading loading-spinner text-accent w-20 h-20"></span>
      </div>
    </div>
</template>

<script setup>

const emits = defineEmits(["payload"]);

const loading = ref(true);
const applyTheme = (theme) => {
  if (theme === 'dark') {
    document.body.style.backgroundColor = '#1d232a';
    document.getElementById('loading').style.backgroundColor = '#1d232a';
  } else {
    document.body.style.backgroundColor = '#ffffff';
    document.getElementById('loading').style.backgroundColor = '#ffffff';
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
  const timeElapsed = currentTime - firstVisit;
  
  // 30 minutes in milliseconds
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
    }, 3000); // 3 seconds timeout
  } else {
    loading.value = false;
  }
  emits('payload',loading.value)
});

</script>

<style  scoped>
#loading {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: #ffffff; /* Default background */
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
  background: #ffffff; /* Default background */
}
</style>