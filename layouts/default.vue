<template>
  <div id="job-speed" class="w-full overflow-hidden flex-row min-h-screen">
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
  </div>
</template>

<script setup>
const { $util } = useNuxtApp();
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
