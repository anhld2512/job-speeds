<template>
  <!-- Thanh lọc và nút tạo công việc -->
  <div class="fixed w-full max-w-6xl flex-row md:flex bg-base-100 z-10 h-auto -mt-4 px-2 gap-3">
    <!-- Nội dung bộ lọc -->
    <div class="w-full md:w-1/2 flex py-3 items-center justify-start">
      <FilterSearch :data="listJob" @actionBtnFilter="actionBtnFilter"></FilterSearch>
    </div>
    <div class="w-full flex md:w-1/2 py-3 items-center justify-end">
      <button class="btn btn-md btn-primary "><i class="bi bi-plus-circle"></i> Create</button>
    </div>
  </div>

  <!-- Khu vực hiển thị danh sách công việc -->
  <div class="overflow-auto md:mt-12 mt-32 gap-3">
    <!-- Hiển thị trang tải dữ liệu -->
    <LoadingPage class="h-screen" v-if="isLoadingData" />
    <div v-else class="flex flex-wrap">
      <!-- Hiển thị danh sách công việc -->
      <div v-if="listJob.length > 0" v-for="(item, index) in listJob" :key="index" class="w-full p-2 sm:w-1/2 md:w-1/3">
        <!-- Thẻ công việc -->
        <div class="card flex flex-col h-full bg-base-100 shadow-xl p-3 border-2 rounded-xl">
          <div class="card-header"></div>
          <div class="card-body flex-grow p-1">
            <h2 class="card-title text-primary" type="button" @click="detailJob(item._id)">{{ item.jobName }}</h2>
            <p>{{ item.companyName }}</p>
            <p>{{ item.jobCategory }}</p>
            <p>{{ item.jobType }}</p>
            <div class="card-actions justify-start flex-wrap">
              <!-- Hiển thị kỹ năng yêu cầu -->
              <div v-for="(itemSkill, index) in item.jobSkills" :key="index" class="badge badge-outline">{{ itemSkill }}</div>
            </div>
            <div class="absolute top-0 right-0 mt-1 mr-1">
              <div class="dropdown dropdown-bottom dropdown-end text-primary">
                <div tabindex="0" role="button" class="btn btn-sm m-1"><i class="bi bi-three-dots-vertical"></i></div>
                <ul tabindex="0" class="border border-2 dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-md w-52">
                  <li><a @click="detailJob(item._id)"><i class="bi bi-eye"></i> Detail</a></li>
                  <!-- <li><a @click="deleteJob(item._id)"><i class="bi bi-trash3"></i> Delete</a></li> -->
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
        <!-- Kết thúc thẻ công việc -->
      </div>
      <div v-else class="mt-3">
        <i>No item to display</i>
      </div>
    </div>

    <LoadingPage v-if="isLoadingDataPush" />
  </div>

  <LoadingBasic ref="loading" :isClose="true"></LoadingBasic>
</template>

<script setup>
const { $modelAPI, $_ } = useNuxtApp();
const router = useRouter();

const filter = ref(null);

const actionBtnFilter = (value) => {
  filter.value = value; // Cập nhật bộ lọc mới
  listJob.value = []; // Đặt lại danh sách công việc
  fetchJobs(); // Tải công việc mới dựa trên bộ lọc mới
};

const loading = ref(null);

const isLoadingData = ref(true);
const isLoadingDataPush = ref(false);
const listJob = ref([]);
const itemMax = ref(null);

const fetchJobs = async () => {
  isLoadingData.value = true;
  try {
    // Gọi API để lấy danh sách công việc dựa trên bộ lọc
    const result = await $modelAPI.jobAPI.filterJob(listJob.value.length, filter.value);
    if (result.data.value.result) {
      listJob.value = result.data.value.data; // Cập nhật danh sách công việc
      itemMax.value = result.data.value.count; // Cập nhật tổng số công việc
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoadingData.value = false; // Tắt trạng thái tải dữ liệu
  }
};

const pushMoreJobs = async () => {
  try {
    isLoadingDataPush.value = true;
    // Gọi API để lấy thêm công việc khi cuộn xuống cuối trang
    const result = await $modelAPI.jobAPI.filterJob(listJob.value.length, filter.value);
    if (result.data.value.result) {
      const newJobs = result.data.value.data;
      listJob.value = [...listJob.value, ...newJobs]; // Thêm công việc mới vào danh sách hiện tại
    } else {
      console.log("No more jobs to display.");
    }
  } catch (error) {
    console.error(error);
  } finally {
    isLoadingDataPush.value = false; // Tắt trạng thái tải thêm dữ liệu
  }
};

const onScroll = () => {
  const windowHeight = window.innerHeight;
  const scrollY = window.scrollY;
  const bodyHeight = document.body.offsetHeight;
  const distanceFromBottom = bodyHeight - (scrollY + windowHeight);
  const threshold = windowHeight / 2;

  // Kiểm tra điều kiện để tải thêm công việc khi cuộn gần cuối trang
  if (distanceFromBottom <= threshold && !isLoadingDataPush.value && listJob.value.length < itemMax.value) {
    pushMoreJobs();
  }
};

// Thiết lập sự kiện cuộn trang và tải dữ liệu khi component được mount
onMounted(() => {
  fetchJobs();
  window.addEventListener("scroll", onScroll);
});

const deleteJob = async (itemId) => {
  loading.value.show();
  try {
    const result = await $modelAPI.jobAPI.deleteJob(itemId);
    if (result.data.value.result) {
      listJob.value = listJob.value.filter(item => item._id !== itemId); // Cập nhật danh sách công việc sau khi xóa
    }
  } catch (error) {
    console.error(error);
  } finally {
    loading.value.close();
  }
};

const detailJob = (itemId) => {
  router.push({ path: `/job/${itemId}` }); // Điều hướng đến trang chi tiết công việc
};
</script>

<style scoped>
.container {
    max-width: 1024px;
}
</style>
