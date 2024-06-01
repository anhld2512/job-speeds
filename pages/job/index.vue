<template>
  <div class="w-full flex-row md:flex fixed w-full bg-base-100 z-10 h-auto -mt-4 px-4 gap-3">
    <!-- Your filter content here -->
    <div class="w-full md:w-1/2 flex flex-wrap md:flex-nowrap py-3">
      <FilterSearch :data="listJob" @actionBtnFilter="actionBtnFilter"></FilterSearch>
    </div>
    <div class="w-full md:w-1/2 py-3 text-end">
        <button class="btn btn-md btn-primary "><i class="bi bi-plus-circle"></i> Create Job</button>
      </div>
  </div>

  <div class="overflow-auto my-3 px-4 md:mt-12  mt-32 gap-3">
    <LoadingPage class="h-screen" v-if="isLoadingData" />
    <div v-else class="flex flex-wrap">
      <div v-for="(item, index) in listJob" :key="index" class="w-full p-2 sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 my-2">
        <!-- Job Card -->
        <div class="card flex flex-col h-full bg-base-100 shadow-xl p-3 border-2 rounded-xl">
          <div class="card-header"></div>
          <div class="card-body flex-grow p-1">
            <h2 class="card-title">{{ item.jobName }}</h2>
            <p>{{ item.contact.companyName }}</p>
            <div class="card-actions justify-start flex-wrap"> <!-- Thêm flex-wrap vào đây -->
              <div v-for="(itemSkill, index) in item.jobSkills" :key="index" class="badge badge-outline">{{ itemSkill }}
              </div>
            </div>
            <div class="absolute top-0 right-0 mt-1 mr-1">
              <div class="dropdown dropdown-bottom dropdown-end text-primary">
                <div tabindex="0" role="button" class="btn btn-sm m-1"><i class="bi bi-three-dots-vertical"></i></div>
                <ul tabindex="0" class=" border border-2 dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-md w-52">
                  <li><a><i class="bi bi-eye"></i> Detail</a></li>
                  <li><a> <i class="bi bi-trash3"></i> Delete</a></li>
                </ul>
              </div>
            </div>
          </div>
          <div class="card-footer p-1">
            <figure>
              <img class="h-32 w-full" :src="item.jobImageUrl" alt="jobs" />
            </figure>
          </div>
        </div>
        <!-- End Job Card -->
      </div>
    </div>

    <LoadingPage v-if="isLoadingDataPush" />
  </div>



  <LoadingBasic ref="loading" :isClose="true"></LoadingBasic>
</template>

<script setup>
const { $modelAPI, $_ } = useNuxtApp();
const filter = ref(null)
const actionBtnFilter = (value) => {
  filter.value = value
}
const loading = ref(null);

const isLoadingData = ref(true);
const isLoadingDataPush = ref(false);
const listJob = ref([]);
const originalListJob = ref([]);

const pushMoreJobs = async () => {
  try {
    isLoadingDataPush.value = true;
    const result = await $modelAPI.jobAPI.filterJob(listJob.value.length, filter); // Truyền giá trị skip vào API để lấy dữ liệu mới
    if (result.data.value.result) {
      const newJobs = result.data.value.data;
      listJob.value = [...listJob.value, ...newJobs];
    } else {
      console.log("Không còn việc làm mới để hiển thị.");
    }
  } catch (error) {
    console.error(error);
  }
};
const itemMax = ref(null)
onMounted(() => {
  nextTick().then(() => {
    setTimeout(async () => {
      try {
        // Reset lại vị trí scroll mỗi khi trang được load
        window.scrollTo(0, 0);
        // Thêm sự kiện cuộn trang
        const result = await $modelAPI.jobAPI.filterJob(listJob.value.length, filter) ?? [];
        if (result.data.value.result) {
          originalListJob.value = result.data.value.data;
          listJob.value = originalListJob.value; // Khởi tạo listJob với dữ liệu ban đầu
          itemMax.value = result.data.value.count
        }
      } catch (error) {
        console.error(error);
      } finally {
        isLoadingData.value = false;
      }
    }, 1);
  });
});

let isLoadingMore = false;

const onScroll = () => {
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY;
  const bodyHeight = document.body.offsetHeight;
  const distanceFromBottom = bodyHeight - (scrollY + windowHeight);
  const threshold = windowHeight / 2;
  const isPushLoading = itemMax.value > listJob.value.length ? true : false
  if (distanceFromBottom <= threshold && !isLoadingMore && !isLoadingDataPush.value && isPushLoading) {
    isLoadingMore = true;
    isLoadingDataPush.value = true;

    pushMoreJobs().finally(() => {
      setTimeout(() => {
        isLoadingMore = false;
        isLoadingDataPush.value = false;
      }, 100);
    });
  }
};
window.addEventListener("scroll", onScroll);
</script>

<style scoped></style>
