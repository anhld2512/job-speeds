<template>
    <div class="container h-full overflow-hidden mx-auto top-20">
     
      <div class="w-full mt-5 md:mt-8 md:shadow-md rounded rounded-xl h-full overflow-auto">
        <!-- Hiển thị trang tải dữ liệu -->
        <LoadingPage class="h-screen" v-if="isLoadingData" />
        
        <div v-else class="flex flex-wrap">
          <!-- Hiển thị danh sách công việc -->
          <div v-if="listJob.length > 0" v-for="(item, index) in listJob.slice(0,3)" :key="index"
            class="w-full p-2 md:w-1/2 lg:w-1/3">
            <!-- Thẻ công việc -->
            <div class="card flex flex-col h-full bg-base-100 shadow border-2 rounded-xl items-center px-3 py-2">
              <div class="card-header w-full">
                <div class="flex w-full items-center">
                    <div @click="actionApplication(item)"
                      class="btn btn-sm m-1 text-start btn-primary rounded w-full">
                      <i class="bi bi-heart text-xl"></i> Apply
                    </div>
                </div>
              </div>
  
              <div class="card-body p-1">
                <h3 class="card-title text-lg text-primary w-full max-w-lg cursor-pointer" @click="detailJob(item._id)">{{
                  item.jobName }}</h3>
                <div class="flex flex-col gap-2 w-full">
                  <p class="w-full mb-1 text-sm">{{ item.contact?.company }}</p>
                  <div class="flex flex-wrap mb-2 gap-2">
                    <span class="badge badge-lg badge-neutral"><i class="bi bi-award mr-1"></i> {{ item.jobCategory }}
                    </span>
                    <span class="badge badge-lg badge-error"><i class="bi bi-clock-history mr-1"></i> {{ item.jobTyped
                      }}
                    </span>
                  </div>
                  <i class="text-sm front-semibold text-gray-500 underline"><i class="bi bi-award text-md"></i> Skill
                    list</i>
                  <div class="card-actions flex flex-col justify-between min-h-[6rem] max-h-[8rem] overflow-hidden p-2">
                    <div class="flex flex-wrap">
                      <div v-for="(itemSkill, index) in item.jobSkills" :key="index"
                        class="badge badge-outline whitespace-nowrap overflow-hidden text-ellipsis mr-1 mb-1">
                        {{ itemSkill }}
                      </div>
                    </div>
                  </div>
  
                  <figure class="h-44 w-full skeleton">
                    <div class="h-full w-full object-contain rounded-lg"
                      :style="{ backgroundImage: `url(${item.jobImageUrl})`, backgroundSize: 'contain', backgroundPosition: 'center' }">
                    </div>
                  </figure>
                </div>
  
              </div>
            </div>
            <!-- Kết thúc thẻ công việc -->
             <!-- <JobItem :modelValue="item" /> -->
          </div>
          <div v-else class="mt-3 w-full p-3">
            <!-- Component Start -->
            <div
              class="container  w-full flex flex-wrap justify-between items-center mx-auto bg-base-100 rounded-md dark:bg-slate-500">
              <div class="text-center border-dashed border-2 border-primary rounded-xl w-full p-20">
                <i class='bx bxs-contact bx-lg mb-5 dark:text-white'></i>
                <p class="text-xl mb-2 uppercase font-bold dark:text-white"> <i>No item to display</i></p>
              </div>
            </div>
            <!-- Component End  -->
  
          </div>
        </div>
  
      </div>
    </div>
    <!-- Khu vực hiển thị danh sách công việc -->
    <dialog ref="myFormApplicantion" class="modal">
      <div class="modal-box w-11/12 max-w-5xl" :key="keyApply">
     
        <ApplyForm v-if="currentJob" v-model="currentJob" @applications="applications"></ApplyForm>
      </div>
    </dialog>
    <ToastMessage ref="toastRef" :typeToast="currentToastType" :message="toastMessage" :show="showToast" />
  
  <ModalDialogLoadingBasic ref="loading" :isClose="true"></ModalDialogLoadingBasic>
  </template>
  
  <script setup>
  // #region AnhLD Import dafault
  const { $modelAPI, $_, $filters, $uuidToObjectId, $uuidv4 } = useNuxtApp();
  const { token, logout, userId } = useAuth();
  const router = useRouter();
  const loading = ref(null);
  const myFormApplicantion = ref(null)
  const isLoadingData = ref(true);
  const isLoadingDataPush = ref(false);
  const listJob = ref([]);
  const itemMax = ref(null);
  const filter = ref({
    search: '',
    filter: {
      jobName: '',
      jobCategory: '',
      jobTyped: ''
    },
  });
  // #endregion

  
  
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
  

  
  const onScroll = () => {
    const windowHeight = window.innerHeight;
    const scrollY = window.scrollY;
    const bodyHeight = document.body.offsetHeight;
    const distanceFromBottom = bodyHeight - (scrollY + windowHeight);
    const threshold = windowHeight / 2;
  };
  const currentJob = ref(null)
  const actionApplication = (item) =>{
    setTimeout(() => {
      currentJob.value = item
    }, 1);
  
    myFormApplicantion.value.showModal()
  
  }
  // Thiết lập sự kiện cuộn trang và tải dữ liệu khi component được mount
  onMounted( () => {
    nextTick(()=>{
      setTimeout(async() => {
        const result = await fetchJobs();
        console.log(result)
        window.addEventListener("scroll", onScroll);
      }, 1);
    })
    
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
  const applications = (isVal) =>{
      if(isVal){
          myFormApplicantion.value.close()
          triggerToast('success', 'Ứng tuyển thành công')
      }else{
        setTimeout(() => {
          myFormApplicantion.value.close()
        }, 1);
          triggerToast('error', 'Xin vui lòng thử lại')
      }
  }
  </script>
  
  <style scoped></style>
  