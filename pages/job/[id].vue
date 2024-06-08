<template>

    <div class="container  mx-auto md:p-3">
        <div class="w-full md:shadow-md rounded p-6 md:border md:border-2 rounded-xl">
            <div class="flex md:flex-row items-center justify-between gap-2 ">
                <button @click="myFormApplicantion.showModal()"
                    class="btn w-1/2 md:w-1/4 md:flex text-center btn-sm btn-primary font-bold py-2 px-4 rounded transition duration-300">
                    Apply Now
                </button>
                <div v-if="isAuthor" class="relative mt-2 md:mt-0 md:w-1/4 text-center md:text-right dropdown dropdown-bottom dropdown-end">
                    <div tabindex="0" role="button" class="btn btn-sm btn-accent m-1">
                        <i class="bi bi-gear text-md font-bold"></i>
                    </div>
                    <ul tabindex="0" class="absolute right-0 border border-2 dropdown-content z-[1] menu mt-1 mx-2 shadow bg-base-100 rounded-md w-44">
                        <li>
                            <a @click="actionEditJob">
                                <i class="bi bi-pen text-lg text-accent font-extrabold"></i> Edit
                            </a>
                        </li>
                        <hr class="border-t-2 border-gray-300 my-1">
                        <li>
                            <a @click="deleteJob(currentJob?._id)">
                                <i class="bi bi-trash3"></i> Delete
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
            <hr class="border-1 my-1">
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
                        <p class="mb-4">{{ currentJob?.jobTyped }}</p>
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
                    <div v-html="$textAreaFormatText(currentJob?.jobDescription)"></div>
                </div>

                <div class="mb-4">
                    <h2 class="text-2xl font-semibold mb-2">Responsibilities</h2>
                    <div v-html="$textAreaFormatText(currentJob?.Responsibilities)"></div>
                </div>

                <div class="mb-4">
                    <h2 class="text-2xl font-semibold mb-2">Requirements</h2>
                    <div v-html="$textAreaFormatText(currentJob?.Requirements)"></div>
                </div>
                <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <div class="col-span-1 p-4 flex flex-col">
                        <h2 class="text-2xl font-semibold mb-2">Company Information</h2>
                        <div class="mb-3 flex items-start gap-1">
                            <i class="bi bi-person-fill text-xl mr-2"></i>
                            <span>{{ currentJob?.contact?.name }}</span>
                        </div>
                        <div class="mb-3 flex items-start gap-1">
                            <i class="bi bi-envelope-fill text-xl mr-2"></i>
                            <span>{{ currentJob?.contact?.email }}</span>
                        </div>
                        <div class="mb-3 flex items-start gap-1">
                            <i class="bi bi-phone-fill text-xl mr-2"></i>
                            <span>{{ currentJob?.contact?.phone }}</span>
                        </div>
                        <div class="mb-3 flex items-start gap-1">
                            <i class="bi bi-building text-xl mr-2"></i>
                            <span>{{ currentJob?.contact?.company }}{{ currentJob?.contact?.address }}</span>
                        </div>
                        <div class="mb-3 flex items-start gap-1">
                            <i class="bi bi-geo-alt-fill text-xl mr-2"></i>
                            <span>{{ currentJob?.contact?.address }}{{ currentJob?.contact?.address }}</span>
                        </div>
                    </div>
                    <div class="col-span-1 md:col-span-2/3 p-4">
                        <figure class="w-full h-full skeleton">
                            <img class="h-full w-full object-cover rounded-xl" :src="currentJob?.jobImageUrl"
                                alt="jobs" />
                        </figure>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Open the modal using ID.showModal() method -->
    <dialog ref="myFormApplicantion" class="modal">
        <div class="modal-box w-11/12 max-w-5xl">
            <ApplyForm></ApplyForm>

        </div>
    </dialog>
    <dialog ref="EditFormApplicantion" class="modal">

        <div v-if="isRenderModel" class="modal-box w-11/12 max-w-5xl">
            <div class="fixed top-0 right-5 modal-action">
                <form method="dialog">
                    <button class="btn btn-circle btn-sm border border-1 border-primary">
                        <i class="bi bi-x text-2xl"></i></button>
                </form>
            </div>
            <JobForm  v-model="currentJob" @onSubmit="onSubmit"></JobForm>
        </div>
    </dialog>
    <LoadingBasic ref="loading" :isClose="false"></LoadingBasic>
    <ToastMessage ref="toastRef" :typeToast="currentToastType" :message="toastMessage" :show="showToast" />

</template>

<script setup>
const { $modelAPI, $_, $filters, $textAreaFormatText } = useNuxtApp();
const { token, logout, userId } = useAuth();

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
const route = useRoute();
const router = useRouter();
const JobID = route.params.id;
const myFormApplicantion = ref(null)
const currentJob = ref(null)
const loading = ref(false)
const isAuthor = computed(() => {
    return userId === currentJob?.value?.userId ? true : false
})
const isRenderModel = computed(()=>{
    return currentJob?.value?.length > 0 ? true : false
})
onMounted(() => {
    nextTick().then(() => {
        setTimeout(() => {
            loading.value.show()
            $modelAPI.jobAPI.getJobById(JobID).then(result => {
                if (result.data.value.result) {
                    currentJob.value = $_.cloneDeep(result.data.value.data)
                }
            }).catch(error => {
                router.push("/job")
                console.error(error)
            }).finally(() => {
                loading.value.close()
            })
        }, 1);
    });
});
const EditFormApplicantion = ref(null)
const actionEditJob = (event) => {
    if (event) {
        event.preventDefault();
    }
    EditFormApplicantion.value.show()
}
const onSubmit = (isVal) => {
    if (isVal) {
        loading.value.show()
        $modelAPI.jobAPI.updateJobById(currentJob.value._id, currentJob.value).then(result => {
            if (result.data.value.result) {
                EditFormApplicantion.value.close()
                currentJob.value = $_.cloneDeep(result.data.value.data)
                triggerToast('success', 'Job is updated')
            }
            else {
                triggerToast('error', 'Job is failed')
            }
        }).catch(error => {
            triggerToast('error', error)
        }).finally(() => {
            loading.value.close()
        })
    }
}
const deleteJob = (id)=>{
    $modelAPI.jobAPI.deleteJob(id).then(result => {
            if (result.data.value.result) {
                triggerToast('success', 'Job is Deleted')
                router.push("/job")
            }
            else {
                triggerToast('error', 'Delete is failed')
            }
        }).catch(error => {
            triggerToast('error', error)
        }).finally(() => {
            loading.value.close()
        })
}
</script>

<style scoped>
.container {
    max-width: 1024px;
}
</style>