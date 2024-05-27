<template>
    <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <!-- Sidebar content here -->
        <li>
            <a href="/job" class=" py-2 px-4 text-md flex">
                <i class="bi bi-journal-bookmark"></i> <span>Job</span>
            </a>
        </li>
        <hr class="mt-1 mb-1">
        <div v-if="myToken" @click="actionLogout" class="w-full btn btn-sm btn-primary">
                <i class="bi bi-box-arrow-in-right fs-6"></i>Logout
        </div>
        <div v-else>
            <button @click="actionLogin" class="btn btn-sm btn-primary w-full">Login</button>
        </div>
    </ul>
</template>
<script setup>
    const {
        token,
        logout
    } = useAuth();
    const myToken = computed(()=>{
    const newToken = useAuth().token
    return !!newToken
})
const router = useRouter();

const actionLogout = () =>{
    logout()
    router.push("/").then(() => {
        window.location.reload();
    });
}
const actionLogin = () =>{
    router.push("/login").then(() => {
        window.location.reload();
    });
}
</script>
<style lang="scss" scoped></style>