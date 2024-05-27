<template>
    <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
        <!-- Sidebar content here -->
        <li>
            <a href="/job" class=" py-2 px-4 text-md flex">
                <i class="bi bi-journal-bookmark"></i> <span>Job</span>
            </a>
        </li>
        <hr class="mt-1 mb-1">
        <div @click="logout" class="w-full btn btn-sm btn-primary">
                <i class="bi bi-box-arrow-in-right fs-6"></i>Logout
            </div>
    </ul>
</template>
<script setup>
    const {
        token,
        logout
    } = useAuth();
</script>
<style lang="scss" scoped></style>