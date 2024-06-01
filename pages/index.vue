<template>
    <div class="h-full overflow-auto">
        <!-- Phần Giới thiệu -->
        
        <HeaderBox></HeaderBox>
        
    </div>
</template>
<script setup>
import { useAuth } from '~/composables/useAuth';
const { token, logout } = useAuth();



onMounted(() => {
    nextTick().then(() => {
        setTimeout(() => {
            

        }, 1);
    });
})


</script>
