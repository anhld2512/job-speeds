<template>
    <div v-if="isAuthenticated">
        <div tabindex="0" role="button" class="btn btn-sm btn-ghost btn-circle avatar">
            <div class="w-10 rounded-full">
                <i class="bi bi-person-lines-fill text-2xl font-extrabold"></i>
            </div>
        </div>
        <ul tabindex="0" class="mt-3 mb-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 border border-2 rounded-box w-60 gap-3">
            <li v-if="isUser">
                <div class="flex items-center justify-start">
                    <img :src="User?.avatar || logoDefault"
                        alt="Avatar" class="w-12 h-12 rounded-full mr-2">
                    <div>
                        <p class="font-bold text-primary">{{User?.personalInfo?.fullName}}</p>
                        <span class="badge badge-primary">{{User?.role}}</span>
                    </div>
                </div>
            </li>
            <li>
                <a href="/profile" class="text-lg">
                    <i class="bi bi-person-video text-2xl text-accent"></i>Profile
                </a>
            </li>
            <li>
                <hr class="mt-1 mb-1">
                <div @click="logout" class="w-full btn btn-sm btn-primary">
                    <i class="bi bi-box-arrow-in-right fs-6"></i>Logout
                </div>
            </li>
        </ul>
    </div>
    <div v-else>
        <NuxtLink href="/login"><button class="btn btn-sm btn-ghost btn-circle"><i class="bi bi-person-circle text-3xl"></i>
        </button></NuxtLink>
    </div>
</template>

<script setup>
const {  $util, payload: nuxtPayload , $_} = useNuxtApp();
const { token, logout, userId } = useAuth();
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => {}
  },
});
const { modelValue } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);
const User = computed({
  get() {
    return modelValue?.value ?? {};
  },
  set(value) {
    if (!$_.isEqual(modelValue.value, value)) {
      emit("update:modelValue", value)
    }
  }
});
const isUser = computed(()=>{
    return Object.keys(User.value).length > 0;
})
const isAuthenticated = computed(() => {
    return useAuth().isAuthenticated
})

const logoDefault = ref(`https://api.jobspeeds.com/logo/logo.JPG`)
onMounted(() => {
    nextTick().then(() => {
        setTimeout(() => {
      
        }, 1);
    });
})


</script>

<style lang="scss" scoped></style>