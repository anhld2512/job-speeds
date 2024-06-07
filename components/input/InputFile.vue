<template>
  <div class="relative flex flex-col mb-3">
    <FormInPlaceEditor :label="label" cssClass="block text-lg" :showButtonEditMode="false" :enableEditMode="isEditMode">
      <template v-if="!fileUrl">
        <label
          for="file-upload"
          class="flex flex-col items-center justify-center border-2 border-dashed border-primary rounded-xl cursor-pointer w-full h-72 max-h-72"
          @dragover.prevent
          @drop.prevent="handleDrop"
        >
          <i class="bi bi-file-earmark-arrow-up text-4xl text-primary mb-2"></i>
          <span class="text-sm text-primary">Drag & Drop or Click to Upload</span>
          <input id="file-upload" @change="onFileChange" type="file" class="hidden" />
        </label>
      </template>
      <template v-else>
        <div class="relative border-2 border-dashed border-primary rounded-xl p-2 w-full h-72 max-h-72">
          <button @click="clearFile" class="absolute top-1 right-1 btn btn-circle btn-error btn-sm z-10">
            <i class="bi bi-x-circle text-xl"></i>
          </button>
          <div v-if="isImage" class="flex justify-center items-center h-full">
            <img :src="fileUrl ?? ''" alt="Preview" class="max-h-64 w-full object-contain rounded-xl" />
          </div>
          <div v-else class="flex justify-center items-center h-full">
            <iframe :src="fileUrl ?? ''" class="w-full max-h-64 rounded-xl"></iframe>
          </div>
        </div>
      </template>
    </FormInPlaceEditor>
  </div>
  <ToastMessage ref="toastRef" :typeToast="currentToastType" :message="toastMessage" :show="showToast" />
  <LoadingBasic ref="loading" :isClose="false"></LoadingBasic>
</template>

<script setup>
const { $modelAPI, $_, $filters, $textAreaFormatText } = useNuxtApp();

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  label: {
    type: String,
    default: ''
  },
  isEditMode: {
    type: Boolean,
    default: true
  }
});

const emits = defineEmits(['update:modelValue']);

const fileUrl = ref(props.modelValue);
const loading = ref({ show: () => {}, close: () => {} });

const getFileNameFromUrl = (url) => {
  const parts = url.split('/');
  return parts[parts.length - 1];
};

const fileName = computed(() => getFileNameFromUrl(fileUrl.value));

const isImage = computed(() => {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'bmp', 'webp'];
  const extension = fileName.value.split('.').pop().toLowerCase();
  return imageExtensions.includes(extension);
});

const onFileChange = async (event) => {
  const file = event.target.files[0];
  if (file) {
    uploadFile(file);
  }
};

const handleDrop = async (event) => {
  const file = event.dataTransfer.files[0];
  if (file) {
    uploadFile(file);
  }
};

const uploadFile = async (file) => {
  loading.value.show();
  try {
    const result = await $modelAPI.uploadAPI.uploadLocal(file);
    if (result.data.value.result) {
      fileUrl.value = result.data.value.fileUrl;
      emits('update:modelValue', fileUrl.value);
    }
  } catch (error) {
    triggerToast('error', error.message);
  } finally {
    loading.value.close();
  }
};


const clearFile = () => {
  fileUrl.value = '';
  emits('update:modelValue', '');
};

// Watch for external changes to the modelValue
watch(() => props.modelValue, (newVal) => {
  fileUrl.value = newVal;
});
</script>

<style scoped>
/* Add any additional styling if necessary */
</style>