<template>
  <div class="relative flex flex-col mb-3">
    <FormInPlaceEditor :label="label" cssClass="block text-lg" :showButtonEditMode="false" :enableEditMode="isEditMode">
      <template v-if="!fileUrl">
        <label :for="inputId"
          class="flex flex-col items-center justify-center border-2 border-dashed border-primary rounded-xl cursor-pointer w-full h-52 max-h-52"
          @dragover.prevent @drop.prevent="handleDrop">
          <i class="bi bi-file-earmark-arrow-up text-4xl text-primary mb-2"></i>
          <span class="text-sm text-primary">Drag & Drop or Click to Upload</span>
          <input :id="inputId" @change="onFileChange" type="file" class="hidden" />
        </label>
      </template>
      <template v-else>
        <div class="relative border-2 border-dashed border-primary rounded-xl w-full h-52 max-h-52">
          <button @click="clearFile" class="absolute top-1 right-1 btn btn-circle btn-error btn-sm z-10">
            <i class="bi bi-x-circle text-xl"></i>
          </button>
          <div v-if="isImage" class="flex justify-center items-center h-full rounded-xl"
            :style="{ backgroundImage: `url(${fileUrl})`, backgroundSize: 'contain', backgroundPosition: 'center' }">
            <!-- <img :src="fileUrl ?? ''" alt="Preview" class="h-full max-w-72 object-contain rounded-xl" /> -->
          </div>
          <div v-else class="flex justify-center items-center h-full skeleton">
            <iframe :src="fileUrl ?? ''" class="h-full max-w-72  rounded-xl"></iframe>
          </div>
        </div>
      </template>
    </FormInPlaceEditor>
  </div>
  <ToastMessage ref="toastRef" :typeToast="currentToastType" :message="toastMessage" :show="showToast" />
  <ModalDialogLoadingBasic ref="loading" :isClose="false"></ModalDialogLoadingBasic>
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
const loading = ref({ show: () => { }, close: () => { } });

const inputId = `file-input-${Math.random().toString(36).substring(2, 15)}`;

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
   console.error(error)
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
