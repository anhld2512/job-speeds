<template>
  <div class="max-w-4xl mx-auto">
    <!-- Form Title -->
    <h2 class="text-2xl font-semibold mb-6">Update Personal Information</h2>

    <!-- Form -->
    <form @submit.prevent="updateProfile">
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <!-- Full Name -->
        <div class="mb-4">
          <label for="fullName" class="block text-gray-700 font-bold mb-2">Full Name</label>
          <input 
            type="text" 
            id="fullName" 
            v-model="profile.personalInfo.fullName" 
            class="input input-bordered w-full"
          />
        </div>

        <!-- Email -->
        <div class="mb-4">
          <label for="email" class="block text-gray-700 font-bold mb-2">Email</label>
          <input 
            type="email" 
            id="email" 
            v-model="profile.personalInfo.email" 
            class="input input-bordered w-full"
          />
        </div>

        <!-- Phone -->
        <div class="mb-4">
          <label for="phone" class="block text-gray-700 font-bold mb-2">Phone</label>
          <input 
            type="text" 
            id="phone" 
            v-model="profile.personalInfo.phone" 
            class="input input-bordered w-full"
          />
        </div>

        <!-- Address -->
        <div class="mb-4">
          <label for="address" class="block text-gray-700 font-bold mb-2">Address</label>
          <input 
            type="text" 
            id="address" 
            v-model="profile.personalInfo.address" 
            class="input input-bordered w-full"
          />
        </div>

        <!-- Date of Birth -->
        <div class="mb-4">
          <label for="dateOfBirth" class="block text-gray-700 font-bold mb-2">Date of Birth</label>
          <input 
            type="date" 
            id="dateOfBirth" 
            v-model="profile.personalInfo.dateOfBirth" 
            class="input input-bordered w-full"
          />
        </div>

        <!-- Gender -->
        <div class="mb-4">
          <label for="gender" class="block text-gray-700 font-bold mb-2">Gender</label>
          <select 
            id="gender" 
            v-model="profile.personalInfo.gender" 
            class="select select-bordered w-full"
          >
            <option value="male" selected>Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
      </div>

      <!-- Submit Button -->
      <div class="flex justify-end">
        <button type="submit" class="btn btn-primary">Update Profile</button>
      </div>
    </form>
  </div>
</template>

<script setup>
const { token, logout ,userId} = useAuth();
console.log(useAuth())
// Mock data
const profile = reactive({
  userId: userId,
  role:'employer',
  avatar:'',
  personalInfo: {
    fullName: '',
    email: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    gender: 'male'
  }
});

const updateProfile = () => {
  // Handle profile update logic here
  console.log('Profile updated', profile.personalInfo);
};
</script>
