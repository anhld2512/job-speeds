<template>
    <div v-if="User" class="container mx-auto py-6 px-8">
        <ProfilePersonal v-model="User" :enableEditMode="false"> </ProfilePersonal>
    </div>
    <LoadingBasic ref="loading" :isClose="false"></LoadingBasic>
</template>

<script setup>
const { $modelAPI, $_ ,$filters} = useNuxtApp();
const { token, logout, userId } = useAuth();

const loading = ref(null)
const User = ref(null)
onMounted(() => {
    nextTick().then(() => {
        setTimeout(() => {
            $modelAPI.profileAPI.getProfilById(userId).then(result => {
                loading.value.show()
                if (result.data.value.result) {
                    User.value = result.data.value.data
                }
            }).catch(error =>{
                console.error(error)
            }).finally(()=>{
                loading.value.close()
            })
        }, 1);
    });
})
</script>

<style lang="scss" scoped></style>