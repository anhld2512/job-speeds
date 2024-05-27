<template>
    <div v-if="myToken">
        <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
        <div class="w-10 rounded-full">
            <img alt="logo-tech" :src="logoDefault"  />
        </div>
    </div>
    <ul tabindex="0" class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
        <li>
            <a class="justify-between">
                Profile
                <span class="badge badge-primary">New</span>
            </a>
        </li>
        <li><a>Settings</a></li>
        <li>
            <hr class="mt-1 mb-1">
            <div @click="logout" class="w-full btn btn-sm btn-primary">
                <i class="bi bi-box-arrow-in-right fs-6"></i>Logout
            </div>
        </li>
    </ul>
    </div>
    <div v-else>
        <button class="btn btn-sm btn-primary"><NuxtLink href="/login">Login</NuxtLink> </button>
    </div>
</template>

<script setup>
const { $util, payload: nuxtPayload } = useNuxtApp();
const { token, logout } = useAuth();
const myToken = computed(()=>{
    const newToken = useAuth().token
    return !!newToken
})
const baseURL = nuxtPayload.config.app.baseURL;
const cdnURL = `${nuxtPayload.config.app.cdnURL || ""}`.trim();
// const headLinks = computed(() => {
//     let url = `logo`;
//     if (cdnURL.length > 0) {
//         url = `${!!cdnURL.endsWith('/') ? cdnURL : cdnURL + '/'}${url}`
//     } else {
//         url = `${!!baseURL.endsWith('/') ? baseURL : baseURL + '/'}${url}`
//     }
//     return {
//         rel: "stylesheet",
//         url: url,
//     }
// })
const logoDefault = ref(`https://api.jobspeeds.com/file-manager/files/1HRK-1cwNy660RxETKsXNznb66uxbA87H`)
</script>

<style lang="scss" scoped></style>