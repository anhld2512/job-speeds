<template>
  <div id="job-speed" class="w-full overflow-hidden flex-row min-h-screen relative">
    <header class="fixed top-0 z-50 w-full">
      <HeaderNavbar></HeaderNavbar>
    </header>
    <main>
      <div class="container-auto overflow-auto mt-20">
        <slot />
      </div>
    </main>
    <footer class="flex-grow-1 footer p-5 mb-10 bg-base-100 text-base-content flex-row text-base-content">
      <FooterLayout></FooterLayout>
    </footer>
    <button
      v-if="showScrollButton"
      @click="scrollToTop"
      class="fixed bottom-5 right-5 btn btn-circle btn-primary transition-opacity duration-300"
    >
    <i class="bi bi-arrow-up-circle text-2xl"></i></button>
  </div>
</template>

<script setup>
import { onMounted, ref, onUnmounted } from 'vue';
const showScrollButton = ref(false);
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleScroll = () => {
  showScrollButton.value = window.scrollY > 200;
};

onMounted(() => {
  window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});
</script>

<style>
/* global.css */
html,
body,
#__nuxt,
#job-speed {
  margin: 0;
  padding: 0;
}
</style>
