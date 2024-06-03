<template>
  <div id="job-speed" class="w-full overflow-hidden flex-row min-h-screen relative">
    <header class="fixed top-0 z-50 w-full">
      <HeaderNavbar></HeaderNavbar>
    </header>
    <main>
      <div class="container-auto overflow-auto mt-20 max-w-6xl mx-auto">
        <slot />
      </div>
    </main>
    <footer class="flex-grow-1 footer p-5 mb-10 bg-base-100 text-base-content flex-row text-base-content">
      <FooterLayout></FooterLayout>
    </footer>
    <button v-if="showScrollButton" @click="scrollToTop"
      class="fixed bottom-5 right-5 btn btn-circle btn-primary transition-opacity duration-300">
      <i class="bi bi-arrow-up-circle text-2xl"></i></button>
    <!-- Open the modal using ID.showModal() method -->
    <dialog ref="updateProfile" class="modal mt-3 mb-3">
      <div class="modal-box w-11/12 max-w-6xl m-2 border border-2 rounded-xl">
        <ProfilePersonal></ProfilePersonal>
        <div class="modal-action">
          <form method="dialog">
            <button class="btn">Close</button>
          </form>
        </div>
      </div>
    </dialog>
  </div>
</template>

<script setup>
const { token, logout } = useAuth();
const showScrollButton = ref(false);
const updateProfile = ref(null)
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};

const handleScroll = () => {
  showScrollButton.value = window.scrollY > 200;
};

onMounted(() => {
  nextTick().then(() => {
    setTimeout(() => {
      window.addEventListener('scroll', handleScroll);
      if (token) {
        updateProfile.value.show()
      }
    }, 1);
  });
})
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
