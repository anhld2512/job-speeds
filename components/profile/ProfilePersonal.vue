<template>
  <div v-if="profile" class="max-w-6xl">
    <!-- Form Title -->
    <h3 class="text-xl font-semibold mb-3">Personal Information</h3>
    <!-- Form -->
    <form @submit.prevent="updateProfile">
      <div class="grid grid-cols-2 gap-2">
        <!-- Full Name -->
        <FormInPlaceEditor label="Full Name" :required="true" v-model="profile.personalInfo.fullName"
          cssClass="block text-xl " :showButtonEditMode="false" :enableEditMode="isEditMode">
          <input type="text" id="fullName" v-model="profile.personalInfo.fullName"
            class="input input-bordered w-full" />
        </FormInPlaceEditor>
        <!-- Email -->
        <FormInPlaceEditor label="Email" :required="true" v-model="profile.personalInfo.email"
          cssClass="block text-xl " :showButtonEditMode="false" :enableEditMode="isEditMode">
          <input type="email" id="email" v-model="profile.personalInfo.email" class="input input-bordered w-full" />
        </FormInPlaceEditor>

        <!-- Phone -->
        <FormInPlaceEditor label="Phone" :required="true" v-model="profile.personalInfo.phone"
          cssClass="block text-xl " :showButtonEditMode="false" :enableEditMode="isEditMode">
          <input type="text" id="phone" v-model="profile.personalInfo.phone" class="input input-bordered w-full" />
        </FormInPlaceEditor>

        <!-- Address -->
        <FormInPlaceEditor label="Address" :required="true" v-model="profile.personalInfo.address"
          cssClass="block text-xl " :showButtonEditMode="false" :enableEditMode="isEditMode">
          <input type="text" id="address" v-model="profile.personalInfo.address" class="input input-bordered w-full" />
        </FormInPlaceEditor>


        <!-- Date of Birth -->
        <FormInPlaceEditor label="Date of Birth" :required="true" v-model="profile.personalInfo.dateOfBirth"
          cssClass="block text-xl " :showButtonEditMode="false" :enableEditMode="isEditMode">
         
          <input type="date" id="dateOfBirth" v-model="profile.personalInfo.dateOfBirth" 
            class="input input-bordered w-full" />
          <template #displayValue>
            <span> {{ profile?.personalInfo?.dateOfBirth ? $filters.dateStringFormat(profile?.personalInfo?.dateOfBirth, "DD/MM/YYYY") : ''}}</span>
          </template>
        </FormInPlaceEditor>

        <!-- Gender -->
        <FormInPlaceEditor label="Gender" :required="true" v-model="profile.personalInfo.gender"
          cssClass="block text-xl " :showButtonEditMode="false" :enableEditMode="isEditMode">
          <select id="gender" v-model="profile.personalInfo.gender" class="select select-bordered w-full">
            <option value="Male" selected>Male</option>
            <option value="Female">Female</option>
            <option value="Other">Other</option>
          </select>
        </FormInPlaceEditor>
      </div>

      <!-- Submit Button -->
      <div v-if="enableEditMode" class="flex justify-end mt-3">
        <button type="submit" :disabled="isValidateForm" class="btn btn-primary">Save</button>
      </div>
    </form>
  </div>
</template>

<script setup>
const { $modelAPI, $_, $filters, $uuidToObjectId, $uuidv4 } = useNuxtApp();

const { token, logout, userId } = useAuth();
const test = '2024-06-05'
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => { }
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
    return modelValue?.value ?? {};
  },
  set(value) {
    if (!$_.isEqual(modelValue.value, value)) {
      emit("update:modelValue", value)
    }
  }
});

const isEditMode = computed(() => {
  return enableEditMode.value
});
// Mock data
const isValidateForm = ref(true)
const uuidv4 = $uuidv4()
const idProfile = ref($uuidToObjectId(uuidv4))
watch(
  () => [
    profile.value.role,
    profile.value?.personalInfo?.fullName,
    profile.value?.personalInfo?.email,
    profile.value?.personalInfo?.phone,
    profile.value?.personalInfo?.address,
    profile.value?.personalInfo?.gender,
    profile.value?.personalInfo?.dateOfBirth
  ],
  (newValue) => {
    const isValidFields =
      (newValue || []).length > 0 &&
      !newValue.some((v) => `${v || ""}`.trim().length < 1);
    isValidateForm.value = !isValidFields
  },
  { immediate: true, deep: true }
);
const updateProfile = (event) => {
  if (event) {
        event.preventDefault();
  }
  // Handle profile update logic here
  $modelAPI.profileAPI.updateProfile(idProfile.value, profile).then(result => {
    if (result.data.value.result) {
      emit('valid', true)
    }
  })
}
</script>
