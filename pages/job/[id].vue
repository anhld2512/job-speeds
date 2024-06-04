<template>
    <div class="container mx-auto p-3">
        <div class="shadow-md rounded p-6 border border-2 rounded-xl">
            <div class="text-end">
                <button @click="myFormApplicantion.showModal()"
                    class="btn w-full md:w-1/6 text-end btn-sm btn-primary font-bold py-2 px-4 rounded transition duration-300">
                    Apply Now
                </button>
            </div>
            <h1 class="text-3xl font-bold my-4">{{ currentJob?.jobName }}</h1>
            <div class="mb-6">
                <div class="flex flex-wrap mb-4">
                    <div class="w-full md:w-1/2">
                        <h2 class="text-xl font-semibold mb-2">Date Expired</h2>
                        <p class="mb-4">{{ $filters.dateStringFormat(currentJob?.dateExpired, "DD/MM/YYYY") }}</p>
                    </div>
                    <div class="w-full md:w-1/2">
                        <h2 class="text-xl font-semibold mb-2">Category</h2>
                        <p class="mb-4">{{ currentJob?.jobCategory }}</p>
                    </div>
                </div>

                <div class="flex flex-wrap mb-4">
                    <div class="w-full md:w-1/2">
                        <h2 class="text-xl font-semibold mb-2">Type</h2>
                        <p class="mb-4">{{ currentJob?.jobType }}</p>
                    </div>
                    <div class="w-full md:w-1/2">
                        <h2 class="text-xl font-semibold mb-2">Skill</h2>
                        <div class="card-actions justify-start flex-wrap">
                            <div v-for="(itemSkill, index) in currentJob?.jobSkills" :key="index"
                                class="badge badge-primary">{{ itemSkill }}</div>
                        </div>
                    </div>
                </div>

                <div class="mb-4">
                    <h2 class="text-2xl font-semibold mb-2">Job Description</h2>
                    <p class="mb-4">{{ currentJob?.jobDescription }}</p>
                </div>

                <div class="mb-4">
                    <h2 class="text-2xl font-semibold mb-2">Responsibilities</h2>
                    <ul class="list-disc list-inside mb-4">
                        <li>Develop new user-facing features</li>
                        <li>Build reusable code and libraries for future use</li>
                        <li>Ensure the technical feasibility of UI/UX designs</li>
                        <li>Optimize application for maximum speed and scalability</li>
                        <li>Collaborate with other team members and stakeholders</li>
                    </ul>
                </div>

                <div class="mb-4">
                    <h2 class="text-2xl font-semibold mb-2">Requirements</h2>
                    <ul class="list-disc list-inside mb-4">
                        <li>Proven work experience as a Frontend Developer</li>
                        <li>Experience with JavaScript, CSS, and jQuery</li>
                        <li>Knowledge of Vue.js and its ecosystem</li>
                        <li>Good understanding of SEO principles</li>
                        <li>Excellent analytical and multitasking skills</li>
                    </ul>
                </div>
                <div class="mb-4">
                    <h2 class="text-2xl font-semibold mb-2">Company Information</h2>
                    <div class="mb-3 flex items-center">
                        <i class="bi bi-person-fill text-xl mr-2"></i>
                        <span class="fw-bold">Name:</span>
                        <span>{{ currentJob?.contact?.name }}</span>
                    </div>
                    <div class="mb-3 flex items-center">
                        <i class="bi bi-envelope-fill text-xl mr-2"></i>
                        <span class="fw-bold">Email:</span>
                        <span>{{ currentJob?.contact?.email }}</span>
                    </div>
                    <div class="mb-3 flex items-center">
                        <i class="bi bi-phone-fill text-xl mr-2"></i>
                        <span class="fw-bold">Phone:</span>
                        <span>{{ currentJob?.contact?.phone }}</span>
                    </div>
                    <div class="mb-3 flex items-center">
                        <i class="bi bi-building text-xl mr-2"></i>
                        <span class="fw-bold">Company:</span>
                        <span>{{ currentJob?.contact?.companyName }}</span>
                    </div>
                    <div class="mb-3 flex items-center">
                        <i class="bi bi-geo-alt-fill text-xl mr-2"></i>
                        <span class="fw-bold">Address:</span>
                        <span>{{ currentJob?.contact?.companyAddress }}</span>
                    </div>
                </div>


                <figure>
                    <img class="h-full w-full" :src="currentJob?.jobImageUrl" alt="jobs" />
                </figure>
            </div>
        </div>
    </div>
    <!-- Open the modal using ID.showModal() method -->
    <dialog ref="myFormApplicantion" class="modal">
        <div class="modal-box w-11/12 max-w-5xl">
            <ApplyForm></ApplyForm>

        </div>
    </dialog>
    <LoadingBasic ref="loading" :isClose="false"></LoadingBasic>

</template>

<script setup>
const { $modelAPI, $_, $filters } = useNuxtApp();
const route = useRoute();
const JobID = route.params.id;
const myFormApplicantion = ref(null)
const currentJob = ref(null)
const loading = ref(false)
onMounted(() => {
    nextTick().then(() => {
        setTimeout(() => {
            loading.value.show()
            $modelAPI.jobAPI.getJobById(JobID).then(result => {
                currentJob.value = result.data.value.data
            }).catch(error => {
                console.error(error)
            }).finally(() => {
                loading.value.close()
            })
        }, 1);
    });
});
</script>

<style scoped>
.container {
    max-width: 1024px;
}
</style>