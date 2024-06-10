<template>
  <ul class="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
    <!-- Sidebar content here -->
    <li>
      <a href="/" class="py-2 px-4 text-lg flex font-extrabold">
        <i class="bi bi-house"></i> <span>Home</span>
      </a>
    </li>
    <!-- <li>
      <a href="/dashboard" class="py-2 px-4 text-lg flex font-extrabold">
        <i class="bi bi-grid"></i> <span>Dashboard</span>
      </a>
    </li> -->
    <li>
      <a href="/job" class="py-2 px-4 text-lg flex font-extrabold">
        <i class="bi bi-list-ul"></i> <span>Job</span>
      </a>
    </li>

    <!-- <li>
      <a href="/candidate" class="py-2 px-4 text-lg flex font-extrabold">
        <i class="bi bi-list-stars"></i> <span>Candidate</span>
      </a>
    </li> -->
    <!-- <li>
      <a href="/application" class="py-2 px-4 text-lg flex font-extrabold">
        <i class="bi bi-card-list"></i> <span>Application</span>
      </a>
    </li> -->
    <!-- <li>
      <a href="/notifications" class="py-2 px-4 text-lg flex font-extrabold">
        <i class="bi bi-bell"></i><span>Notification</span>
      </a>
    </li> -->
    <li>
      <a href="/contact" class="py-2 px-4 text-lg flex font-extrabold">
        <i class="bi bi-telephone"></i><span>Contact</span>
      </a>
    </li>
    <hr class="mt-2 mb-2" />
    <div
      v-if="myToken"
      @click="actionLogout"
      class="w-full btn btn-sm btn-primary"
    >
      <i class="bi bi-box-arrow-in-right fs-6"></i>Logout
    </div>
    <div v-else>
      <NuxtLink href="/login"
        ><button @click="actionLogin" class="btn btn-sm btn-primary w-full">
          Login
        </button></NuxtLink
      >
    </div>
  </ul>
</template>
<script setup>
const { token, logout } = useAuth();
const myToken = computed(() => {
  const newToken = useAuth().token;
  return !!newToken;
});
const router = useRouter();

const actionLogout = () => {
  logout();
  router.push("/").then(() => {
    window.location.reload();
  });
};
const actionLogin = () => {
  setTimeout(() => {
    window.location.reload();
  }, 100);
};
</script>
<style lang="scss" scoped></style>
