<template>
    <div>
      <h1>Login</h1>
      <input v-model="username" type="email" placeholder="Email">
      <input v-model="password" type="password" placeholder="Password">
      <button @click="handleLogin">Login</button>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuth } from '~/composables/useAuth';
  const router = useRouter();
  const username = ref('');
  const password = ref('');
  const { login } = useAuth();
  
  const handleLogin = async () => {
    const success = await login(username.value, password.value);
    if (success) {
      alert('Login successful!');
      router.push('/');
    } else {
      alert('Login failed.');
    }
  };
  </script>
  