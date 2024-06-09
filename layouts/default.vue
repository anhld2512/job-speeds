<template>
  <div id="job-speed" class="w-full h-full overflow-hidden flex-row min-h-screen relative">
    <header class="fixed top-0 z-50 w-full">
      <HeaderNavbar v-model="User" :isServiceError="isServiceError"></HeaderNavbar>
    </header>
    <main>
      <div v-if="!isServiceError" class="container-auto h-full overflow-hidden mt-20 max-w-full mx-auto">
        <slot />
      </div>
      <div v-else class="flex h-[calc(100vh-80px)] items-center justify-center p-5 w-full bg-base-100">
        <div class="text-center">
          <div class="inline-flex rounded-full bg-sky-100 p-4">
            <div class="rounded-full stroke-sky-600 bg-sky-200 p-4">
              <svg class="w-16 h-16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path
                  d="M6 6L10.5 10.5M6 6H3L2 3L3 2L6 3V6ZM19.259 2.74101L16.6314 5.36863C16.2354 5.76465 16.0373 5.96265 15.9632 6.19098C15.8979 6.39183 15.8979 6.60817 15.9632 6.80902C16.0373 7.03735 16.2354 7.23535 16.6314 7.63137L16.8686 7.86863C17.2646 8.26465 17.4627 8.46265 17.691 8.53684C17.8918 8.6021 18.1082 8.6021 18.309 8.53684C18.5373 8.46265 18.7354 8.26465 19.1314 7.86863L21.5893 5.41072C21.854 6.05488 22 6.76039 22 7.5C22 10.5376 19.5376 13 16.5 13C16.1338 13 15.7759 12.9642 15.4298 12.8959C14.9436 12.8001 14.7005 12.7521 14.5532 12.7668C14.3965 12.7824 14.3193 12.8059 14.1805 12.8802C14.0499 12.9501 13.919 13.081 13.657 13.343L6.5 20.5C5.67157 21.3284 4.32843 21.3284 3.5 20.5C2.67157 19.6716 2.67157 18.3284 3.5 17.5L10.657 10.343C10.919 10.081 11.0499 9.95005 11.1198 9.81949C11.1941 9.68068 11.2176 9.60347 11.2332 9.44681C11.2479 9.29945 11.1999 9.05638 11.1041 8.57024C11.0358 8.22406 11 7.86621 11 7.5C11 4.46243 13.4624 2 16.5 2C17.5055 2 18.448 2.26982 19.259 2.74101ZM12.0001 14.9999L17.5 20.4999C18.3284 21.3283 19.6716 21.3283 20.5 20.4999C21.3284 19.6715 21.3284 18.3283 20.5 17.4999L15.9753 12.9753C15.655 12.945 15.3427 12.8872 15.0408 12.8043C14.6517 12.6975 14.2249 12.7751 13.9397 13.0603L12.0001 14.9999Z"
                  stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
              </svg>
            </div>
          </div>
          <h1 class="mt-5 text-[36px] font-bold text-slate-800 lg:text-[50px]">Service Unavailable</h1>
          <p class="text-slate-600 mt-5 lg:text-lg">Please try again later.</p>
        </div>
      </div>
    </main>
    <footer class="p-5 bg-base-100 text-base-content flex-row text-base-content">
      <FooterLayout></FooterLayout>
    </footer>
    <button v-if="showScrollButton" @click="scrollToTop"
      class="fixed bottom-5 right-5 z-100 btn btn-md btn-circle btn-primary transition-opacity duration-300">
      <i class="bi bi-arrow-up-circle text-2xl"></i></button>
    <dialog ref="updateProfile" class="modal py-3">
      <div class="modal-box w-11/12 max-w-4xl m-2 border border-2 rounded-xl ">
        <ProfilePersonal v-model="profile" :enableEditMode="true" @valid="valid"></ProfilePersonal>
      </div>
    </dialog>
  </div>

  <ToastMessage ref="toastRef" :typeToast="currentToastType" :message="toastMessage" :show="showToast" />
</template>

<script setup>
const { $api, $modelAPI, $_ } = useNuxtApp();

const { token, logout, userId } = useAuth();
const router = useRouter();
const User = ref(null)
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
  userId: userId,
  role: 'Employer',
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
const valid = (value) => {
  if (value) {
    updateProfile.value.close()
    triggerToast('success', 'Information is updated')
    window.location.reload();
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
const isServiceError = ref(false)
onMounted(() => {
  nextTick().then(() => {
    setTimeout(async () => {
      window.addEventListener('scroll', handleScroll);
      if (token && userId) {
        $modelAPI.profileAPI.getProfileById(userId).then(result => {
          if (result.data.value.result) {
            User.value = result.data.data;
          } else {
            updateProfile.value.show();
          }
        }).catch(error => {
          console.error(error); // Log error for debugging
          if (error.response) {
            // Server responded with a status code out of range of 2xx
            if (error.response.status === 401) {
              router.push('/login');
            } else {
              triggerToast('error', 'An error occurred: ' + error.response.status);
            }
          } else if (error.request) {
            // No response received
            isServiceError.value = true
            triggerToast('error', `Server error. Please try again.`);
          } else {
            isServiceError.value = true
            // Error setting up the request
            triggerToast('error', `Server error. Please try again.`);
          }
        });
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
