<template>
  <div id="job-speed" class="w-full overflow-hidden flex-row min-h-screen relative">
    <header class="fixed top-0 z-50 w-full">
      <HeaderNavbar v-model="User"></HeaderNavbar>
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
    <dialog ref="updateProfile" class="modal py-3" >
      <div class="modal-box w-11/12 max-w-4xl m-2 border border-2 rounded-xl ">
        <div class="fixed top-0 right-5 modal-action">
            <form method="dialog">
                <button class="btn btn-circle btn-sm">
                    <i class="bi bi-x text-2xl"></i></button>
            </form>
        </div>
        <ProfilePersonal v-model="profile" :enableEditMode="true" @valid="valid"></ProfilePersonal>
      </div>
    </dialog>
  </div>
  <ToastMessage ref="toastRef" :typeToast="currentToastType" :message="toastMessage" :show="showToast" />
</template>

<script setup>
const { $modelAPI, $_ } = useNuxtApp();
const { token, logout,userId} = useAuth();
const User =ref(null)
const showScrollButton = ref(false);
const toastRef = ref(null);
const showToast = ref(false);
const currentToastType = ref('');
const toastMessage = ref('')
const updateProfile = ref(null)
const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
};
const profile = ref({
  userId:userId,
  role: 'employer',
  avatar: '',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    gender: 'Male'
  }
});
const handleScroll = () => {
  showScrollButton.value = window.scrollY > 200;
};
const valid = (value) =>{
  if(value){
    updateProfile.value.close()
    triggerToast('success','Information is updated')
  }
}
const triggerToast = (type, message) => {
  currentToastType.value = type;
  toastMessage.value = message;
  showToast.value = true;
  if (toastRef.value) {
    toastRef.value.show();
  }
};
onMounted(() => {
  nextTick().then(() => {
    setTimeout(() => {
      window.addEventListener('scroll', handleScroll);
      if (token) {
        $modelAPI.profileAPI.getProfilById(userId).then(result =>{
          if(!result.data.value.result){
            updateProfile.value.show()
          }
          User.value = result.data.value.data
        })
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
