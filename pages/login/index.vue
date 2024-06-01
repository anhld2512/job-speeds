<template>
  <div class="items-center justify-center p-5 h-screen">
    <div class="card shadow-2xl bg-base-100 py-3 max-w-md mx-auto  border border-2 shadow-xl">
      <h3 class="text-2xl font-bold text-center">Login</h3>
      <div class="card-body">
        <div class="form-control">
          <label class="label">
            <span class="label-text">Email</span>
          </label>
          <input required v-model="username" type="email" placeholder="Email" class="input input-bordered" />

        </div>
        <div class="form-control">
          <label class="label">
            <span class="label-text">Password</span>
          </label>
          <input required v-model="password" type="password" placeholder="Password" class="input input-bordered" />
         
        </div>
        <div class="flex-row">
          <label class="label">
            <a href="/forgot" class="label-text-alt link link-hover">Forgot password?</a>
          </label>
          <label class="label ms-auto">
            <span>You can create an account. <NuxtLink href="/sign-up" class="text-primary link link-hover">Sign Up</NuxtLink></span>
          </label>
        </div>
        <div class="form-control mt-3">
          <button :disabled="disabledBtnLogin" @click="handleLogin" class="btn btn-primary">Login</button>
        </div>
      </div>
    </div>
  </div>
  <ToastMessage ref="toastRef" :typeToast="currentToastType" :message="toastMessage" :show="showToast" />
  <LoadingBasic ref="loading" :isClose="false"></LoadingBasic>
</template>

<script setup>
import { useAuth } from '~/composables/useAuth';
const { token, logout } = useAuth();
const loading = ref(null)
const router = useRouter();
const username = ref('');
const password = ref('');
const { login } = useAuth();
const toastRef = ref(null);
const showToast = ref(false);
const currentToastType = ref('');
const toastMessage = ref('');
const disabledBtnLogin = ref(false)
const handleLogin = async () => {
  loading.value.show()
  disabledBtnLogin.value = true
  const success = await login(username.value, password.value);
  if (success) {
    disabledBtnLogin.value =true
    loading.value.close()
    router.push('/');
  } else {
    triggerToast('error','Login failed.')
  }
};
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
          if(token){
             router.push('/');
          }
        }, 1);
    });
})
</script>

<style></style>
