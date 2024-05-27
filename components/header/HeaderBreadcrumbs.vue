<template>
    <ul>
        <li v-for="(item, index) in currentBreadcrumbs" :key="index"><a :href="item.url"> <i :class="item.icon"
                    class="me-1"></i> {{ item.title }}</a></li>
    </ul>
</template>

<script setup>
const currentRouter = useRouter().currentRoute;
const breadcrumbsList = [
    {
        path: '/',
        breadcrumbs: [{
            url: "/", title: "Home", icon: 'bi bi-house'
        }],
    },
    {
        path: '/contact',
        breadcrumbs: [
            { url: "/", title: "Home", icon: 'bi bi-house' },
            { url: "/contact", title: "Contact", icon: 'bi bi-phone' }
        ],
    },
    {
        path: '/about',
        breadcrumbs: [
            { url: "/", title: "Home", icon: 'bi bi-house' },
            { url: "/about", title: "About", icon: 'bi bi-info-circle' }
        ],
    }
]
const currentPath = ref(null)
const currentBreadcrumbs = computed(() => {
    const result =  breadcrumbsList.find(item => item?.path?.trim()?.toLocaleLowerCase() === currentPath?.value?.trim()?.toLocaleLowerCase())?.breadcrumbs ?? [{
        url: "/", title: "Home", icon: 'bi bi-house'
    }]
    return result 
})
onMounted(() => {
    nextTick().then(() => {
        setTimeout(() => {
            currentPath.value = currentRouter.value.path
        }, 1);
    });
})
</script>

<style lang="scss" scoped></style>