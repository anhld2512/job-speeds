<template>
  <div class="p-4 max-w-4xl mx-auto">
    <h1 class="text-2xl font-bold mb-4">{{ isCreate ? 'Post New Job' : job.jobName }}</h1>
    <form @submit.prevent="submitForm" class="grid grid-cols-1 gap-3 md:grid-cols-2">
      <FormInPlaceEditor label="Company Name" :required="true"
        v-model="job.contact.company" cssClass="block text-lg" :showButtonEditMode="false"
        :enableEditMode="isEditMode">
        <input type="text" v-model="job.contact.company" class="input input-primary input-sm input-bordered w-full"
          placeholder="Company Name" />
      </FormInPlaceEditor>
      <FormInPlaceEditor label="Job Name" :required="true" v-model="job.jobName" cssClass="block text-lg"
        :showButtonEditMode="false" :enableEditMode="isEditMode">
        <input type="text" v-model="job.jobName" class="input input-primary input-sm input-bordered w-full" />
      </FormInPlaceEditor>

      <FormInPlaceEditor label="Job Category" :required="true" v-model="job.jobCategory" cssClass="block text-lg"
        :showButtonEditMode="false" :enableEditMode="isEditMode">
        <ComboboxDropdown label="" fieldFilter="Name" v-model="job.jobCategory" :data="Categories"  :useAbsolute="true"/>
      </FormInPlaceEditor>
      <FormInPlaceEditor label="Job Type" :required="true" v-model="job.jobTyped" cssClass="block text-lg"
        :showButtonEditMode="false" :enableEditMode="isEditMode">
        <select v-model="job.jobTyped" class="select select-sm select-primary w-full">
          <option selected value="Full-Time">Full-Time</option>
          <option value="Part-Time">Part-Time</option>
          <option value="Other">Other</option>
        </select>
      </FormInPlaceEditor>
        <FormInPlaceEditor label="Job Salary" :required="true" v-model="job.jobSalary" cssClass="block text-lg" :showButtonEditMode="false" :enableEditMode="isEditMode">
          <select v-model="job.jobSalary" class="select select-sm select-primary w-full">
            <option selected value="Từ 5 Triệu - 10 Triệu">Từ 5 Triệu - 10 Triệu</option>
            <option value="Trên 10 Triệu">Trên 10 Triệu</option>
            <option value="Thoả Thuận">Thoả Thuận</option>
          </select>
        </FormInPlaceEditor>
        <FormInPlaceEditor label="Job Location" :required="true" v-model="job.jobLocation" cssClass="block text-lg" :showButtonEditMode="false" :enableEditMode="isEditMode">
          <ComboboxDropdown label="" fieldFilter="Name" v-model="job.jobLocation" :data="Provinces" :useAbsolute="true"/>
        </FormInPlaceEditor>

      <div class="w-full md:col-span-2">
        <FormInPlaceEditor label="Job Skills" :required="false" cssClass="block text-lg" :enableEditMode="isEditMode" :showButtonEditMode="false">
          <InputChipMulti v-model="job.jobSkills" />
        </FormInPlaceEditor>
      </div>
     

      <FormInPlaceEditor label="Job Description" :required="false" v-model="job.jobDescription"
        cssClass="block text-lg col-span-1 md:col-span-2" :showButtonEditMode="false" :enableEditMode="isEditMode">
        <textarea v-model="job.jobDescription" class="textarea textarea-primary w-full h-40"></textarea>
      </FormInPlaceEditor>
      <FormInPlaceEditor label="Requirements" :required="false" v-model="job.Requirements"
        cssClass="block text-lg col-span-1 md:col-span-2" :showButtonEditMode="false" :enableEditMode="isEditMode">
        <textarea v-model="job.Requirements" class="textarea textarea-primary w-full h-40"></textarea>
      </FormInPlaceEditor>
      <FormInPlaceEditor label="Responsibilities" :required="false" v-model="job.Responsibilities"
        cssClass="block text-lg col-span-1 md:col-span-2" :showButtonEditMode="false" :enableEditMode="isEditMode">
        <textarea v-model="job.Responsibilities" class="textarea textarea-primary w-full h-40"></textarea>
      </FormInPlaceEditor>
     

      <InputFile v-model="job.jobImageUrl" label="Job Image" :isEditMode="isEditMode"
        cssClass="col-span-1 md:col-span-2"></InputFile>
      <InputFile v-model="job.jobAttachmentUrl" label="Job Attachment" :isEditMode="isEditMode"
        cssClass="col-span-1 md:col-span-2"></InputFile>
      <button @click="onSubmit" :disabled="isValidateForm" class="btn btn-primary w-full col-span-1 md:col-span-2">
        <i class="bi bi-save text-lg"></i> Save
      </button>
    </form>
  </div>
  <ToastMessage ref="toastRef" :typeToast="currentToastType" :message="toastMessage" :show="showToast" />
  <LoadingBasic ref="loading" :isClose="false"></LoadingBasic>
</template>
<script setup>
const { $modelAPI, $_, $filters, $uuidToObjectId, $uuidv4 } = useNuxtApp();
import Provinces from '../../composables/Province';
import Categories from '../../composables/Category';
const { token, logout, userId } = useAuth();

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => { }
  },
  enableEditMode: {
    type: Boolean,
    default: () => true
  },
  isCreate: {
    type: Boolean,
    default: () => false
  },
});
const { enableEditMode, modelValue,isCreate} = toRefs(props);
const emit = defineEmits(["update:modelValue", "valid", "onSubmit"]);
const loading = ref(null)
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
const isEditMode = computed(() => {
  return enableEditMode.value
})
const job = computed({
  get() {
    return modelValue?.value ?? {};
  },
  set(value) {
    if (!$_.isEqual(modelValue.value, value)) {
      emit("update:modelValue", value)
    }
  }
});

const isValidateForm = ref(true)
watch(
  () => [
    job.value?.contact?.company,
    job.value?.jobName,
    job.value?.jobSalary,
    job.value?.jobLocation,
    job.value?.jobCategory,
    job.value?.jobTyped,
  ],
  (newValue) => {
    const isValidFields =
      (newValue || []).length > 0 &&
      !newValue.some((v) => `${v || ""}`.trim().length < 1);
    isValidateForm.value = !isValidFields
  },
  { immediate: true, deep: true }
);

const onSubmit = () => {
  emit('onSubmit', true)
};
</script>

<style scoped>
/* Add any additional styling if necessary */
</style>