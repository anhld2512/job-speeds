<template>
  <!-- Thanh lọc và nút tạo công việc -->
  <div class="fixed -mt-4 w-full flex-wa bg-base-100 z-10 px-2 h-12 py-1">
    <!-- Nội dung bộ lọc -->
    <div class="flex w-full md:w-1/2 items-center mb-2 gap-1">
      <button @click="CreateFormApplicantion.show()" class="flex btn btn-sm btn-accent items-center"><i
          class="bi bi-plus-circle"></i> New</button>
      <FilterSearch :data="listJob" :filter="filter" @actionFilter="actionFilter"></FilterSearch>
    </div>

  </div>

  <!-- Khu vực hiển thị danh sách công việc -->
  <div class="overflow-auto gap-3 mt-10">
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
            <p>{{ item.jobTyped }}</p>
            <div class="card-actions justify-start flex-wrap">
              <!-- Hiển thị kỹ năng yêu cầu -->
              <div v-for="(itemSkill, index) in item.jobSkills" :key="index" class="badge badge-outline">{{ itemSkill }}
              </div>
            </div>
            <div class="absolute top-0 right-0 mt-1 mr-1">
              <div class="dropdown dropdown-bottom dropdown-end text-primary">
                <div tabindex="0" role="button" class="btn btn-sm m-1 btn-accent"><i class="bi bi-gear text-xl"></i>
                </div>
                <ul tabindex="0"
                  class="border border-2 dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-md w-52">
                  <li><a @click="detailJob(item._id)"><i class="bi bi-eye"></i> Detail</a></li>
                  <!-- <li><a @click="deleteJob(item._id)"><i class="bi bi-trash3"></i> Delete</a></li> -->
                </ul>
              </div>
            </div>
          </div>
          <div class="card-footer p-1">
            <figure class="h-44 w-full">
              <img class="h-full w-full object-contain bg-black rounded-xl" :src="item.jobImageUrl" alt="jobs" />
            </figure>
          </div>
        </div>
        <!-- Kết thúc thẻ công việc -->
      </div>
      <div v-else class="mt-3 w-full">
        <!-- Component Start -->
        <div  class="container  w-full flex flex-wrap justify-between items-center mx-auto bg-white rounded-md dark:bg-slate-500">
          <div class="text-center border-dashed border-2 border-slate-200 dark:border-slate-100 rounded-md w-full p-20">
            <i class='bx bxs-contact bx-lg mb-5 dark:text-white'></i>
            <p class="text-xl mb-2 uppercase font-bold dark:text-white"> <i>No item to display</i></p>
            <spam class="text-m text-slate-400 block mb-10 dark:text-slate-50">Get started by creating a new Job</spam>
            <button class="rounded-full px-5 py-3 btn btn-md w-auto btn-accent" @click="CreateFormApplicantion.show()"><i
                class="bi bi-plus-circle"> </i>Create</button>
          </div>
        </div>
        <!-- Component End  -->

      </div>
    </div>

    <LoadingPage v-if="isLoadingDataPush" />
  </div>
  <dialog ref="CreateFormApplicantion" class="modal">
    <div class="modal-box w-11/12 max-w-5xl border border-2 shadow-xl">
      <div class="fixed top-0 right-5 modal-action">
        <form method="dialog">
          <button class="btn btn-circle btn-sm border border-1 border-primary">
            <i class="bi bi-x text-2xl"></i></button>
        </form>
      </div>
      <JobForm v-model="job" @onSubmit="onSubmit" :isCreate="true"></JobForm>
    </div>
  </dialog>
  <ToastMessage ref="toastRef" :typeToast="currentToastType" :message="toastMessage" :show="showToast" />

  <LoadingBasic ref="loading" :isClose="true"></LoadingBasic>
</template>

<script setup>
const { $modelAPI, $_, $filters, $uuidToObjectId, $uuidv4 } = useNuxtApp();
const { token, logout, userId } = useAuth();

const router = useRouter();

const filter = ref({
  search: '',
  filter: {
    jobName: '',
    jobCategory: '',
    jobTyped: ''
  },
});
const actionFilter = (value) => {
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

const toastRef = ref(null);
const showToast = ref(false);
const currentToastType = ref('');
const toastMessage = ref('')
const triggerToast = (type, message) => {
  currentToastType.value = type;
  toastMessage.value = message;
  showToast.value = true;
  if (toastRef.value) {
    toastRef.value.show();
  }
};


const CreateFormApplicantion = ref(null)
const uuidv4 = $uuidv4()
const idJob = ref($uuidToObjectId(uuidv4))
const job = ref({
  _id: idJob.value,
  userId: userId,
  jobName: '',
  jobDescription: '',
  jobSalary: 'Từ 5 Triệu - 10 Triệu',
  jobLocation: '',
  jobTyped: 'Full-Time',
  jobCategory: '',
  jobSkills: [],
  jobImageUrl: '',
  jobAttachmentUrl: '',
  Responsibilities: '',
  Requirements: '',
  contact: {
    companyName: '',
  },
});
const onSubmit = (isVal) => {
  if (isVal) {
    loading.value.show()
    $modelAPI.jobAPI.createJob(job.value).then(result => {
      if (result.data.value.result) {
        triggerToast('success', 'Job is created')
        router.push(`/job/${result.data.value.data._id}`)
      }
      else {
        triggerToast('error', 'Job is failed')
      }
    }).catch(error => {
      triggerToast('error', error)
    }).finally(() => {
      loading.value.close()
    })
  }
}
</script>

<style scoped>
.container {
  max-width: 1024px;
}
</style>
