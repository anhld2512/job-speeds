<template>
    <div class="navbar bg-base-100 hidden lg:flex w-full" :data-theme="currentTheme">
        <div class="flex-1">
            <a class="btn btn-ghost text-xl" href="/">Job Speeds</a>
        </div>
        <div class="flex-none gap-5">
            <div class="form-control">
                <input type="text" placeholder="Search" class="input input-bordered w-24 md:w-auto" />
            </div>
            <div class="dropdown dropdown-end w-full">
                <div tabindex="0" role="button" class="btn btn-ghost btn-circle avatar">
                    <div class="w-10 rounded-full">
                        <img alt="Tailwind CSS Navbar component" :src="logoDefault" />
                    </div>
                </div>
                <ul tabindex="0"
                    class="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52">
                    <li>
                        <a class="justify-between">
                            Profile
                            <span class="badge">New</span>
                        </a>
                    </li>
                    <li><a>Settings</a></li>
                    <li><a>Logout</a></li>
                </ul>
            </div>
            <label class="swap swap-rotate">
                <!-- this hidden checkbox controls the state -->
                <input type="checkbox" class="theme-controller" value="synthwave" v-model="selectedTheme"
                    @change="changeTheme" />
                <!-- sun icon -->
                <svg class="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                </svg>
                <!-- moon icon -->
                <svg class="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                    <path
                        d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                </svg>
            </label>
        </div>
    </div>
    <div class="navbar bg-base-100 lg:hidden" :data-theme="currentTheme">
        <div class="navbar-start gap-5">

            <div class="drawer lg:drawer-open">
                <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
                <div class="drawer-content flex  items-center justify-start">
                    <!-- Page content here -->
                    <label for="my-drawer-2" tabindex="0" role="button"
                        class="btn btn-ghost btn-circle drawer-button lg:hidden">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M4 6h16M4 12h16M4 18h7" />
                        </svg>
                    </label>
                </div>
                <div class="drawer-side z-50">
                    <input type="checkbox" class="drawer-toggle" id="my-drawer-2">
                    <label for="my-drawer-2" class="drawer-overlay"></label>
                    <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                        <!-- Sidebar content here -->
                        <li><a href="#" class="block py-2 px-4 text-sm   flex">
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke-width="1.5" stroke="currentColor" class="size-6">
                                    <path stroke-linecap="round" stroke-linejoin="round"
                                        d="M4.26 10.147a60.438 60.438 0 0 0-.491 6.347A48.62 48.62 0 0 1 12 20.904a48.62 48.62 0 0 1 8.232-4.41 60.46 60.46 0 0 0-.491-6.347m-15.482 0a50.636 50.636 0 0 0-2.658-.813A59.906 59.906 0 0 1 12 3.493a59.903 59.903 0 0 1 10.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0 1 12 13.489a50.702 50.702 0 0 1 7.74-3.342M6.75 15a.75.75 0 1 0 0-1.5.75.75 0 0 0 0 1.5Zm0 0v-3.675A55.378 55.378 0 0 1 12 8.443m-7.007 11.55A5.981 5.981 0 0 0 6.75 15.75v-1.5" />
                                </svg> <span>Job</span></a>
                        </li>
                        <!-- <li><a href="#" class="block py-2 px-4 text-sm  ">Application
                                Form</a></li>
                        <li><a href="#" class="block py-2 px-4 text-sm  ">Login</a>
                        </li>
                        <li><a href="#" class="block py-2 px-4 text-sm  ">News</a>
                        </li>
                        <li><a href="#" class="block py-2 px-4 text-sm  ">Job
                                Seekers</a></li>
                        <li><a href="#" class="block py-2 px-4 text-sm  ">Share
                                CV</a></li>
                        <li><a href="#" class="block py-2 px-4 text-sm  ">Analyst
                                Link</a></li> -->
                        <!-- Add more links and functionalities here -->
                    </ul>
                </div>

            </div>
        </div>
        <div class="navbar-center">
            <a class="btn btn-ghost text-xl" href="/">Job Speeds</a>
        </div>
        <div class="navbar-end">
            <div class="flex-none gap-3">
                <!-- <button class="btn btn-ghost btn-circle">
                    <div class="indicator">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8" fill="none" viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                        </svg>
                        <span class="badge badge-xs badge-primary indicator-item"></span>
                    </div>
                </button> -->
                <label class="swap swap-rotate">
                    <!-- this hidden checkbox controls the state -->
                    <input type="checkbox" class="theme-controller" value="synthwave" v-model="selectedTheme"
                        @change="changeTheme" />
                    <!-- sun icon -->
                    <svg class="swap-off fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M5.64,17l-.71.71a1,1,0,0,0,0,1.41,1,1,0,0,0,1.41,0l.71-.71A1,1,0,0,0,5.64,17ZM5,12a1,1,0,0,0-1-1H3a1,1,0,0,0,0,2H4A1,1,0,0,0,5,12Zm7-7a1,1,0,0,0,1-1V3a1,1,0,0,0-2,0V4A1,1,0,0,0,12,5ZM5.64,7.05a1,1,0,0,0,.7.29,1,1,0,0,0,.71-.29,1,1,0,0,0,0-1.41l-.71-.71A1,1,0,0,0,4.93,6.34Zm12,.29a1,1,0,0,0,.7-.29l.71-.71a1,1,0,1,0-1.41-1.41L17,5.64a1,1,0,0,0,0,1.41A1,1,0,0,0,17.66,7.34ZM21,11H20a1,1,0,0,0,0,2h1a1,1,0,0,0,0-2Zm-9,8a1,1,0,0,0-1,1v1a1,1,0,0,0,2,0V20A1,1,0,0,0,12,19ZM18.36,17A1,1,0,0,0,17,18.36l.71.71a1,1,0,0,0,1.41,0,1,1,0,0,0,0-1.41ZM12,6.5A5.5,5.5,0,1,0,17.5,12,5.51,5.51,0,0,0,12,6.5Zm0,9A3.5,3.5,0,1,1,15.5,12,3.5,3.5,0,0,1,12,15.5Z" />
                    </svg>
                    <!-- moon icon -->
                    <svg class="swap-on fill-current w-10 h-10" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                        <path
                            d="M21.64,13a1,1,0,0,0-1.05-.14,8.05,8.05,0,0,1-3.37.73A8.15,8.15,0,0,1,9.08,5.49a8.59,8.59,0,0,1,.25-2A1,1,0,0,0,8,2.36,10.14,10.14,0,1,0,22,14.05,1,1,0,0,0,21.64,13Zm-9.5,6.69A8.14,8.14,0,0,1,7.08,5.22v.27A10.15,10.15,0,0,0,17.22,15.63a9.79,9.79,0,0,0,2.1-.22A8.11,8.11,0,0,1,12.14,19.73Z" />
                    </svg>
                </label>
            </div>

        </div>
    </div>
</template>

<script setup>
const { $util, payload: nuxtPayload } = useNuxtApp();
const baseURL = nuxtPayload.config.app.baseURL;
const cdnURL = `${nuxtPayload.config.app.cdnURL || ""}`.trim();
const headLinks = computed(() => {
    let url = `logo`;
    if (cdnURL.length > 0) {
        url = `${!!cdnURL.endsWith('/') ? cdnURL : cdnURL + '/'}${url}`
    } else {
        url = `${!!baseURL.endsWith('/') ? baseURL : baseURL + '/'}${url}`
    }
    return {
        rel: "stylesheet",
        url: url,
    }
})
const logoDefault = ref(`${headLinks.value.url}/logo-bg.png`)
const currentTheme = ref(localStorage.getItem('theme') || 'light');
const selectedTheme = ref(currentTheme.value);

const changeTheme = () => {
    currentTheme.value = selectedTheme.value ? 'dark' : 'light';
    document.getElementById('job-speed').setAttribute('data-theme', currentTheme.value);
    localStorage.setItem('theme', currentTheme.value);
};

onMounted(() => {
    document.getElementById('job-speed').setAttribute('data-theme', currentTheme.value);
});

watch(selectedTheme, changeTheme);
</script>

<style scoped>
select option {
    display: flex;
    align-items: center;
    padding: 5px 10px;
}

select option span {
    display: flex;
    align-items: center;
}

select option i {
    margin-right: 8px;
}
</style>