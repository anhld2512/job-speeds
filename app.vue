<template>
  <div id="app">
    <div id="loading" class="flex justify-center items-center h-screen">
      <div class="text-center">
        <span class="loading loading-spinner text-accent w-20 h-20"></span>
      </div>
    </div>
    <NuxtLayout v-show="!loading">
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>

const loading = ref(true);
if (process.client) {
  document.addEventListener('click', function(event) {
    const target = event.target;
    if (target.tagName === 'A' && target.href) {
      event.preventDefault();
      window.location.href = target.href;
    }
  });
}
const applyTheme = (theme) => {
  if (theme === 'dark') {
    document.body.style.backgroundColor = '#1d232a';
    document.getElementById('loading').style.backgroundColor = '#1d232a';
  } else {
    document.body.style.backgroundColor = '#ffffff';
    document.getElementById('loading').style.backgroundColor = '#ffffff';
  }
};

onMounted(() => {
  const originalTheme = localStorage.getItem('theme') || 'light';
  applyTheme(originalTheme);

  console.log(originalTheme);

  if ('serviceWorker' in navigator) {
    navigator.serviceWorker.register('/app.js').then(function(registration) {
      console.log('Service Worker registered with scope:', registration.scope);
    }).catch(function(error) {
      console.log('Service Worker registration failed:', error);
    });
  }

  // Handle loading timeout
  const loadingTimeout = setTimeout(() => {
    if (loading.value) {
      document.getElementById('loading').style.display = 'none';
      loading.value = false;

      // Revert to the original theme color
      applyTheme(originalTheme);
    }
  }, 3000); // 3 seconds timeout

  window.addEventListener('load', () => {
    clearTimeout(loadingTimeout); // Clear the timeout if page loads within 3 seconds
    if (loading.value) {
      document.getElementById('loading').style.display = 'none';
      loading.value = false;

      // Revert to the original theme color
      applyTheme(originalTheme);
    }
  });
});
</script>

<style scoped>
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