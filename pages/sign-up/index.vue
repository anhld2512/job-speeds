<template>
  <div class="items-center justify-center p-5 h-screen ">
    <div class="card shadow-2xl bg-base-100 py-3 max-w-md mx-auto border border-2 shadow-xl">
      <h3 class="text-2xl font-bold text-center">Register</h3>
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
          <label class="label ms-auto">
            <span>Already have an account? <NuxtLink href="/login" class="text-primary link link-hover">Login
              </NuxtLink></span>
          </label>
        </div>
        <div class="form-control mt-3">
          <button @click="handleRegister" class="btn btn-primary w-full">
            Sign Up
          </button>
        </div>
      </div>
    </div>
  </div>

  <ToastMessage ref="toastRef" :typeToast="currentToastType" :message="toastMessage" :show="showToast" />
</template>

<script setup>
import { useAuth } from '~/composables/useAuth';

const router = useRouter();
const username = ref('');
const password = ref('');
const toastRef = ref(null);
const showToast = ref(false);
const currentToastType = ref('');
const toastMessage = ref('');
const { signup, login } = useAuth();

const handleRegister = async () => {
  const success = await signup(username.value, password.value);
  if (success) {
    handleLogin()
    triggerToast('success', 'Login successful.')
  } else {
    triggerToast('error', 'Registration failed.')
  }
};
const handleLogin = async () => {
  const success = await login(username.value, password.value);
  if (success) {
    router.push('/');
  } else {
    triggerToast('error', 'Login failed.')
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
</script>

<style></style>