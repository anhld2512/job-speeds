<template>
 <div class="hero bg-base-200">
  <div class="hero-content flex-col lg:flex-row">
    <NuxtImg style="max-width: 255px;;max-height: 255px;object-fit: cover;" :src="logoDefault" class="max-w-sm rounded-lg shadow-2xl hidden lg:flex w-full"  alt="logo"/>
    <div>
      <h1 class="text-5xl font-bold">Job Speed!</h1>
      <p class="py-6">
        Job Speeds là trang web tuyển dụng hỗ trợ công việc tuyển dụng, tối ưu hóa thời gian làm việc và kết nối người tìm việc với nhà tuyển dụng một cách hiệu quả.
      </p>
      <TimeCountDown />
    </div>
  </div>
</div>
</template>

<script setup>
const { $util, payload: nuxtPayload } = useNuxtApp();
const baseURL = nuxtPayload.config.app.baseURL;
const cdnURL = `${nuxtPayload.config.app.cdnURL || ""}`.trim();
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
const logoDefault = ref(`https://jobspeeds.com/logo/logo-bg.png`)

</script>

<style lang="scss" scoped></style>