<template>
    <div class="container mx-auto p-3">
        <div class="fixed top-0 right-5 modal-action">
            <form method="dialog">
                <button class="btn btn-circle btn-sm border border-1 border-primary">
                    <i class="bi bi-x text-2xl"></i></button>
            </form>
        </div>
        <form @submit.prevent="submitForm" class="p-3 space-y-6 lg:border lg:border-2 lg:border-primary rounded-xl">
            <h1 class="text-3xl font-bold mb-6 text-center text-primary">Application</h1>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                <label class="input input-primary input-bordered flex items-center gap-2">
                    <i class="bi bi-person text-primary"></i>
                    <input type="text" class="grow text-primary" id="name" v-model="formData.name"
                        placeholder="Full Name" />
                </label>
                <label class="input input-primary input-bordered flex items-center gap-2">
                    <i class="bi bi-envelope-at text-primary"></i>
                    <input type="email" class="grow text-primary" v-model="formData.email" placeholder="Email" />
                </label>
                <label class="input input-primary input-bordered flex items-center gap-2">
                    <i class="bi bi-telephone text-primary"></i>
                    <input type="text" class="grow text-primary" id="name" v-model="formData.phone"
                        placeholder="Phone" />
                </label>
                <label class="input input-primary input-bordered flex items-center gap-2">
                    <i class="bi bi-geo-alt text-primary"></i>
                    <input type="text" class="grow text-primary" id="name" v-model="formData.address"
                        placeholder="Address" />
                </label>
                <div class="md:col-span-2">
                    <label for="coverLetter" class="block text-primary font-semibold mb-2">Cover Letter</label>
                    <textarea class="textarea textarea-primary w-full h-20" placeholder="Bio"></textarea>
                </div>
                <div class="md:col-span-2 w-full text-primary">
                    <input type="file" class="file-input w-full text-primary border border-1 border-primary rounded-lg" />
                </div>
            </div>
            <div class="text-end">
                <button type="submit" class="w-full btn btn-md btn-primary border border-1">
                    Submit
                </button>
            </div>

        </form>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const formData = ref({
    name: '',
    email: '',
    phone: '',
    address: '',
    resume: null,
    photo: null,
    coverLetter: '',
    linkedin: '',
});

const handleFileUpload = (event) => {
    formData.value.resume = event.target.files[0];
};

const handleImageUpload = (event) => {
    formData.value.photo = event.target.files[0];
};

const submitForm = () => {
    const form = new FormData();
    form.append('name', formData.value.name);
    form.append('email', formData.value.email);
    form.append('phone', formData.value.phone);
    form.append('address', formData.value.address);
    form.append('resume', formData.value.resume);
    form.append('photo', formData.value.photo);
    form.append('coverLetter', formData.value.coverLetter);
    form.append('linkedin', formData.value.linkedin);

    // Here you can handle the form submission, e.g., sending the data to a server.
    console.log('Form submitted:', formData.value);
};
</script>

<style scoped>
.container {
    max-width: 1024px;
}
</style>