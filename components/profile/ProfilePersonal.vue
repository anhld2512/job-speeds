<template>
  <div v-if="profile" class="max-w-6xl">
    <form @submit.prevent="updateProfile">
      <div class="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 gap-2 mt-2">
        <!-- Full Name -->
        <div class="col-span-1">
          <FormInPlaceEditor label="Full Name" :required="true" v-model="profile.personalInfo.fullName"
            cssClass="block text-xl" :showButtonEditMode="false" :enableEditMode="isEditMode">
            <input type="text" id="fullName" v-model="profile.personalInfo.fullName"
              class="input input-bordered w-full" />
          </FormInPlaceEditor>
        </div>
        <!-- Email -->
        <div class="col-span-1">
          <FormInPlaceEditor label="Email" :required="true" v-model="profile.personalInfo.email"
            cssClass="block text-xl truncate max-w-full" :showButtonEditMode="false" :enableEditMode="isEditMode">
            <input type="email" id="email" v-model="profile.personalInfo.email" class="input input-bordered w-full" />
          </FormInPlaceEditor>
        </div>
        <!-- Phone -->
        <div class="col-span-1">
          <FormInPlaceEditor label="Phone" :required="true" v-model="profile.personalInfo.phone"
            cssClass="block text-xl" :showButtonEditMode="false" :enableEditMode="isEditMode">
            <input type="text" id="phone" v-model="profile.personalInfo.phone" class="input input-bordered w-full" />
          </FormInPlaceEditor>
        </div>
        <!-- Address -->
        <div class="col-span-1">
          <FormInPlaceEditor label="Address" :required="true" v-model="profile.personalInfo.address"
            cssClass="block text-xl" :showButtonEditMode="false" :enableEditMode="isEditMode">
            <input type="text" id="address" v-model="profile.personalInfo.address"
              class="input input-bordered w-full" />
          </FormInPlaceEditor>
        </div>
        <!-- Date of Birth -->
        <div class="col-span-1">
          <FormInPlaceEditor label="Date of Birth" :required="true" v-model="profile.personalInfo.dateOfBirth"
            cssClass="block text-xl" :showButtonEditMode="false" :enableEditMode="isEditMode">
            <input type="date" id="dateOfBirth" v-model="profile.personalInfo.dateOfBirth"
              class="input input-bordered w-full" />
            <template #displayValue>
              <span>{{ profile?.personalInfo?.dateOfBirth ?
                $filters.dateStringFormat(profile?.personalInfo?.dateOfBirth, "DD/MM/YYYY") : '' }}</span>
            </template>
          </FormInPlaceEditor>
        </div>
        <!-- Gender -->
        <div class="col-span-1">
          <FormInPlaceEditor label="Gender" :required="true" v-model="profile.personalInfo.gender"
            cssClass="block text-xl" :showButtonEditMode="false" :enableEditMode="isEditMode">
            <select id="gender" v-model="profile.personalInfo.gender" class="select select-bordered w-full">
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </FormInPlaceEditor>
        </div>
      </div>

      <!-- Submit Button -->
      <div v-if="enableEditMode" class="flex justify-end mt-3">
        <button type="submit" :disabled="isValidateForm" class="btn btn-primary">Save</button>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, computed } from 'vue';
import { useNuxtApp } from '#app';

const { $modelAPI, $_, $filters, $uuidToObjectId, $uuidv4 } = useNuxtApp();
const authStore = useAuthStore();

const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  enableEditMode: {
    type: Boolean,
    default: () => true
  }
});

const { enableEditMode, modelValue } = toRefs(props);
const emit = defineEmits(["update:modelValue", "valid"]);

const profile = computed({
  get() {
    return modelValue.value;
  },
  set(value) {
    if (!$_.isEqual(modelValue.value, value)) {
      emit("update:modelValue", value);
    }
  }
});

const isEditMode = computed(() => enableEditMode.value);
const isValidateForm = ref(true);

const idProfile = ref(profile?.value?._id ?? $uuidToObjectId($uuidv4()));

watch(
  () => [
    profile.value?.role,
    profile.value?.personalInfo?.fullName,
    profile.value?.personalInfo?.email,
    profile.value?.personalInfo?.phone,
    profile.value?.personalInfo?.address,
    profile.value?.personalInfo?.gender,
    profile.value?.personalInfo?.dateOfBirth
  ],
  (newValue) => {
    const isValidFields = (newValue || []).length > 0 && !newValue.some((v) => `${v || ""}`.trim().length < 1);
    isValidateForm.value = !isValidFields;
  },
  { immediate: true, deep: true }
);

const updateProfile = async (event) => {
  if (event) {
    event.preventDefault();
  }
  // Handle profile update logic here
  try {
    const result = await $modelAPI.profileAPI.updateProfile(idProfile.value, profile.value);
    if (result.data.value.result) {
      emit('valid', true);
    }
  } catch (error) {
    console.error('Error updating profile:', error);
  }
};
</script>
