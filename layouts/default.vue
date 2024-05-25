<template>
    <div id="job-speed" class="h-full overflow-hidden" :data-theme="currentTheme">
        <HeaderNavbar></HeaderNavbar>
        <div class="overflow-hidden h-full" >
        <slot />
    </div>
    </div>
  

</template>

<script setup>
const { $util } = useNuxtApp();

</script>
