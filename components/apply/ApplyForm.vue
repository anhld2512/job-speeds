<template>
    <div class="container mx-auto">
        <div class="fixed top-0 right-5 modal-action">
            <form method="dialog">
                <button class="btn btn-circle btn-sm border border-1 border-primary">
                    <i class="bi bi-x text-2xl"></i>
                </button>
            </form>
        </div>
        <form @submit.prevent="submitForm" class="space-y-6 rounded-xl p-3">
            <h1 class="text-3xl font-bold mb-6 text-center text-primary">Application</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-2">
                <FormInPlaceEditor label="Full Name" :required="true" v-model="formData.fullName"
                    cssClass="block text-lg" :showButtonEditMode="false" :enableEditMode="isEditMode">
                    <input type="text" v-model="formData.fullName"
                        class="input input-primary input-sm input-bordered w-full" />
                </FormInPlaceEditor>

                <FormInPlaceEditor label="Email" :required="true" v-model="formData.email" cssClass="block text-lg"
                    :showButtonEditMode="false" :enableEditMode="isEditMode">
                    <input type="email" v-model="formData.email"
                        class="input input-primary input-sm input-bordered w-full" />
                </FormInPlaceEditor>

                <FormInPlaceEditor label="Phone" :required="true" v-model="formData.phone" cssClass="block text-lg"
                    :showButtonEditMode="false" :enableEditMode="isEditMode">
                    <input type="text" v-model="formData.phone"
                        class="input input-primary input-sm input-bordered w-full" />
                </FormInPlaceEditor>

                <FormInPlaceEditor label="Address" :required="false" v-model="formData.address" cssClass="block text-lg"
                    :showButtonEditMode="false" :enableEditMode="isEditMode">
                    <ComboboxDropdown label="" fieldFilter="Name" v-model="formData.address" :data="Provinces"
                        :useAbsolute="true" />
                </FormInPlaceEditor>
            </div>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormInPlaceEditor label="Cover Letter" :required="false" v-model="formData.coverLetter"
                    cssClass="block text-lg" :showButtonEditMode="false" :enableEditMode="isEditMode">
                    <textarea v-model="formData.coverLetter" class="textarea textarea-primary w-full h-52 max-h-52"
                        placeholder="Cover Letter"></textarea>
                </FormInPlaceEditor>
                <InputFile v-model="formData.urlCV" label="Resume" :isEditMode="isEditMode" />
            </div>
            <div class="text-end">
                <button :disabled="isValidateForm" type="submit" class="w-full btn btn-md btn-primary border border-1">Submit</button>
            </div>
        </form>
    </div>
</template>
<script setup>
import Provinces from '../../composables/Province';

const { $modelAPI, $sanitizeData } = useNuxtApp();
const { token, logout, userId } = useAuth();

const props = defineProps({
    modelValue: {
        type: Object,
        default: () =>{}
    }
});
const { modelValue } = toRefs(props);

const formData = ref({
    fullName: '',
    email: '',
    phone: '',
    address: '',
    coverLetter: '',
    urlCV: null,
    jobId: modelValue.value._id,
    userId: modelValue.value.userId
});

const isEditMode = ref(true);
const emits = defineEmits(['applications']);
const isValidateForm = ref(true)
watch(
  () => [
  formData.value.fullName,
  formData.value.email,
  formData.value.phone
  ],
  (newValue) => {
    const isValidFields =
      (newValue || []).length > 0 &&
      !newValue.some((v) => `${v || ""}`.trim().length < 1);
      isValidateForm.value = !isValidFields
    },
  { immediate: true, deep: true }
);
const submitForm = async () => {
    const sanitizedData = $sanitizeData(formData.value);
    try {
        const result = await $modelAPI.applyAPI.createApply(sanitizedData);
        if (result.data.value.result) {
            emits('applications',true)
            console.log('Form submitted successfully:', formData.value);
        } else {
            emits('applications',false)
            console.error('Error submitting form');
        }
    } catch (error) {
        emits('applications',false)
        console.error('Error submitting form:', error);
    }
};
</script>
<style></style>
