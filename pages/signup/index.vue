<template>
    <div>
        <h1>Signup</h1>
        <input v-model="username" type="email" placeholder="Email">
        <input v-model="password" type="password" placeholder="Password">
        <button @click="handleSignup">Signup</button>
    </div>
</template>

<script setup>

import { useAuth } from '~/composables/useAuth';

const username = ref('');
const password = ref('');
const { signup } = useAuth();

const handleSignup = async () => {
    const success = await signup(username.value, password.value);
    if (success) {
        alert('Signup successful!');
    } else {
        alert('Signup failed.');
    }
};
</script>