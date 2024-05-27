<template>
    <div id="job-speed" class="h-full w-full overflow-hidden">
      <HeaderNavbar></HeaderNavbar>
      <div class="overflow-hidden h-full w-full">
        <slot />
      </div>
    </div>
  </template>
  
  <script setup>
  const { $util } = useNuxtApp();
  </script>
  
<style>
/* global.css */
html, body, #__nuxt, #job-speed {
  height: 100%;
  margin: 0;
}

</style>
