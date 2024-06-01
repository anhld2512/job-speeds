<template>
    <div class="navbar bg-base-100 hidden lg:flex w-full px-3">
      <div class="flex-1">
        <div class="flex">
          <div class="drawer">
            <input
              id="my-drawer-desktop"
              type="checkbox"
              class="drawer-toggle"
            />
            <div class="drawer-content">
              <!-- Page content here -->
              <label
                for="my-drawer-desktop"
                class="btn btn-ghost text-xl drawer-button"
                ><i class="bi bi-list"></i> Job Speeds</label
              >
            </div>
            <div class="drawer-side z-50">
              <label
                for="my-drawer-desktop"
                aria-label="close sidebar"
                class="drawer-overlay"
              ></label>
              <HeaderNavbarList />
            </div>
          </div>
        </div>
      </div>
      <div class="flex gap-3 items-center justify-center">
        <!-- <div class="form-control">
                <input type="text" placeholder="Search" class="input input-sm input-bordered w-24 md:w-auto" />
            </div> -->
        <div class="dropdown dropdown-end w-full">
          <HeaderProfileDropdown />
        </div>
        <HeaderMode />
      </div>
    </div>
    <div class="navbar bg-base-100 lg:hidden fixed top-0 z-50">
      <div class="navbar-start gap-5">
        <div class="drawer lg:drawer-open">
          <input id="my-drawer-2" type="checkbox" class="drawer-toggle" />
          <div class="drawer-content flex items-center justify-start">
            <!-- Page content here -->
            <label
              for="my-drawer-2"
              tabindex="0"
              role="button"
              class="btn btn-ghost btn-circle drawer-button lg:hidden"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4 6h16M4 12h16M4 18h7"
                />
              </svg>
            </label>
          </div>
          <div class="drawer-side z-50">
            <input type="checkbox" class="drawer-toggle" id="my-drawer-2" />
            <label for="my-drawer-2" class="drawer-overlay"></label>
            <HeaderNavbarList />
          </div>
        </div>
      </div>
      <div class="navbar-center">
        <a class="btn btn-ghost text-xl" href="/">Job Speeds</a>
      </div>
      <div class="navbar-end">
        <div class="flex gap-3 items-center justify-center">
          <HeaderMode />
          <div class="dropdown dropdown-end w-full">
            <HeaderProfileDropdown />
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="text-sm px-6 breadcrumbs py-1">
      <HeaderBreadcrumbs />
    </div> -->
</template>

<script setup>
const { $util, payload: nuxtPayload } = useNuxtApp();
</script>

<style scoped></style>
