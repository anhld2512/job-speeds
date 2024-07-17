<template>
  <JobHot />
</template>

<script setup>
const { $util, payload: nuxtPayload } = useNuxtApp();
// const baseURL = nuxtPayload.config.app.baseURL;
// const cdnURL = `${nuxtPayload.config.app.cdnURL || ""}`.trim();
// const headLinks = computed(() => {
//   let url = `logo`;
//   if (cdnURL.length > 0) {
//     url = `${!!cdnURL.endsWith('/') ? cdnURL : cdnURL + '/'}${url}`
//   } else {
//     url = `${!!baseURL.endsWith('/') ? baseURL : baseURL + '/'}${url}`
//   }
//   return {
//     rel: "stylesheet",
//     url: url,
//   }
// })
const logoDefault = ref(`https://api.jobspeeds.com/logo/logo.JPG`)

</script>

<style lang="scss" scoped></style>