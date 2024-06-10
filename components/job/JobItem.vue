<template>
    <div class="card flex flex-col h-full bg-base-100 shadow border-2 rounded-xl items-center px-3 py-2">
        <div class="card-header w-full">
            <div class="flex w-full items-center">
                <div class="flex w-4/5">
                    <div @click="myFormApplicantion.showModal()"
                        class="btn btn-sm m-1 text-start btn-primary rounded w-full">
                        <i class="bi bi-heart text-xl"></i> Apply
                    </div>
                </div>
                <div class="flex w-1/5 justify-end">
                    <div
                        class="btn btn-sm btn-circle btn-accent dropdown dropdown-bottom dropdown-end text-primary items-center">
                        <button tabindex="0" class="text-black"><i class="bi bi-gear text-xl"></i>
                        </button>
                        <ul tabindex="0"
                            class="border border-2 dropdown-content z-[1] menu p-2 shadow bg-base-100 rounded-md w-40 mt-2">
                            <li><a @click="detailJob(itemJob._id)"><i class="bi bi-eye"></i> Detail</a></li>
                            <!-- <li><a @click="deleteJob(itemJob._id)"><i class="bi bi-trash3"></i> Delete</a></li> -->
                        </ul>
                    </div>
                </div>
            </div>
        </div>

        <div class="card-body p-1">
            <h3 class="card-title text-lg text-primary w-full max-w-lg cursor-pointer" @click="detailJob(itemJob._id)">{{
                itemJob.jobName }}</h3>
            <div class="flex flex-col gap-2 w-full">
                <p class="w-full mb-1 text-sm">{{ itemJob.contact.company }}</p>
                <div class="flex flex-wrap mb-2 gap-2">
                    <span class="badge badge-lg badge-neutral"><i class="bi bi-award mr-1"></i> {{ itemJob.jobCategory }}
                    </span>
                    <span class="badge badge-lg badge-error"><i class="bi bi-clock-history mr-1"></i> {{ itemJob.jobTyped
                        }}
                    </span>
                </div>
                <i class="text-sm front-semibold text-gray-500 underline"><i class="bi bi-award text-md"></i> Skill
                    list</i>
                <div class="card-actions flex flex-col justify-between min-h-[6rem] max-h-[8rem] overflow-hidden p-2">
                    <!-- Hiển thị kỹ năng yêu cầu -->
                    <div class="flex flex-wrap">
                        <div v-for="(itemSkill, index) in itemJob.jobSkills" :key="index"
                            class="badge badge-outline whitespace-nowrap overflow-hidden text-ellipsis mr-1 mb-1">
                            {{ itemSkill }}
                        </div>
                    </div>
                    <!-- Nội dung khác (nếu có) -->
                </div>

                <figure class="h-44 w-full skeleton">
                    <div class="h-full w-full object-contain rounded-lg"
                        :style="{ backgroundImage: `url(${itemJob.jobImageUrl})`, backgroundSize: 'contain', backgroundPosition: 'center' }">
                    </div>
                </figure>
            </div>

        </div>
    </div>
    <dialog ref="myFormApplicantion" class="modal">
    <div class="modal-box w-11/12 max-w-5xl" :key="keyApply">
      <ApplyForm v-model="itemJob._id" @applications="applications"></ApplyForm>
    </div>
  </dialog>
  <ToastMessage ref="toastRef" :typeToast="currentToastType" :message="toastMessage" :show="showToast" />
</template>

<script setup>
// #region default v-model binding
const { $modelAPI, $_, $filters, $uuidToObjectId, $uuidv4 } = useNuxtApp();
const { token, logout, userId } = useAuth();
const myFormApplicantion = ref(null)
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => { }
  },
});
const { modelValue} = toRefs(props);
const emit = defineEmits(["update:modelValue"]);
const itemJob = computed({
  get() {
    return modelValue?.value ?? {};
  },
  set(value) {
    if (!$_.isEqual(modelValue.value, value)) {
      emit("update:modelValue", value)
    }
  }
});
// #endregion
// #region define Toast 
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
// #endregion
// #region AnhLD function detail item
const detailJob = (itemId) => {
  router.push({ path: `/job/${itemId}` }); // Điều hướng đến trang chi tiết công việc
};
// #endregion
// #region AnhLD Onmounted
onMounted(() => {
    nextTick().then(() => {
        setTimeout(() => {
        }, 1);
    });
})

// #endregion
</script>

<style lang="scss" scoped></style>