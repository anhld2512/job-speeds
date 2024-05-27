<template>
    <div class="h-full overflow-auto">
        <!-- Phần Giới thiệu -->
        <HeaderBox></HeaderBox>
        <HeaderBox></HeaderBox>
        <HeaderBox></HeaderBox>
        <HeaderBox></HeaderBox>
     
        <FooterLayout></FooterLayout>
    </div>
</template>
<script setup>
import { useAuth } from '~/composables/useAuth';
const { token, logout } = useAuth();

const { $modelAPI, $_ } = useNuxtApp();
const listJob = ref(null)
const originalListJob = ref(null)
const renderImage = (id) => {
    return `http://localhost:2024/file-manager/files/${id}`
}

const pushMoreJobs = () => {
    if (originalListJob.value && listJob.value) {
        const startIndex = listJob.value.length;
        const endIndex = startIndex + 9;
        if (endIndex <= originalListJob.value.length) {
            // Push 9 items từ originalListJob vào listJob
            const newJobs = originalListJob.value.slice(startIndex, endIndex);
            listJob.value = listJob.value.concat(newJobs);
        } else {
            // Nếu không còn đủ items trong originalListJob, có thể xử lý thông báo hoặc logic khác tùy theo yêu cầu
            console.log("Không còn việc làm mới để hiển thị.");
        }
    }
};

onMounted(() => {
    nextTick().then(() => {
        setTimeout(() => {
            $modelAPI.jobAPI.getListJob().then(result => {
                if (result.data.value.result) {
                    originalListJob.value = result.data.value.data;
                    // Khởi tạo listJob với 9 items ban đầu
                    listJob.value = originalListJob.value.slice(0, 9);
                }
            }).catch(err => {
                console.error(err)
            })

        }, 1);
    });
})

window.addEventListener('scroll', () => {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const bodyHeight = document.body.offsetHeight;

    // Tính vị trí giữa trang
    const middleOfPage = windowHeight / 2;

    // Khi vị trí cuộn cao hơn hoặc bằng vị trí giữa trang, gọi hàm pushMoreJobs
    if (scrollY >= (bodyHeight / 2) - middleOfPage) {
        pushMoreJobs();
    }
});
</script>
