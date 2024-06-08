<template>
  <div id="app">
   <LoadingPayload v-show='isLoadingPayload' :payload="payload"></LoadingPayload>
    <NuxtLayout v-show='!isLoadingPayload'>
      <NuxtPage />
    </NuxtLayout>
  </div>

</template>

<script setup>
const isLoadingPayload = ref(true)
const payload = (isVal) =>{
  return isLoadingPayload.value = !isVal  ?? false
}
</script>

<style scoped>

</style>