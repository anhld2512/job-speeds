<template>
    <div class="container h-full overflow-hidden mx-auto top-20">
        <div
            class="fixed container mx-auto px-5 md:px-0 right-0 left-0 -mt-4 flex w-full items-center justify-between bg-base-100">
            <div @click="myFormApplicantion.showModal()" :class="{ 'w-full md:w-1/2 lg:w-1/3': !isAuthor, }"
                class="btn btn-md m-1 text-start btn-primary rounded">
                <i class="bi bi-heart text-xl"></i> Apply Now
            </div>
            <div v-if="isAuthor"
                class="btn btn-sm btn-circle btn-accent dropdown dropdown-bottom dropdown-end text-primary  items-center">
                <button tabindex="0" class="text-black"><i class="bi bi-gear text-xl"></i>
                </button>
                <ul tabindex="0"
                    class="absolute right-0 border border-2 dropdown-content z-[1] menu mt-1 mx-2 shadow bg-base-100 rounded-md w-44">
                    <li>
                        <a @click="actionEditJob">
                            <i class="bi bi-pen text-lg font-extrabold"></i> Edit
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
        <div
            class="w-full mt-3 md:mt-12 md:shadow-md rounded p-6 md:border md:border-2 rounded-xl h-full overflow-auto">
            <h3 class="text-2xl md:text-3xl font-bold my-4">{{ currentJob?.jobName }}</h3>
            <div class="flex flex-wrap items-center gap-2">
                <span class="badge badge-lg badge-accent mb-2"><i class="bi bi-calendar3 mr-1"></i> {{
                    $filters.dateStringFormat(currentJob?.dateExpired, "DD/MM/YYYY") }}</span>
                <span class="badge badge-lg badge-neutral mb-2"><i class="bi bi-award mr-1"></i> {{
                    currentJob?.jobCategory }}</span>
                <span class="badge badge-lg badge-error mb-2"><i class="bi bi-clock-history mr-1"></i>
                    {{ currentJob?.jobTyped }}</span>
            </div>

            <div class="flex flex-wrap w-full items-center my-1">
                <div class="w-full text-star">
                    <h2 class="text-xl font-semibold">Skill</h2>
                    <div class="card-actions justify-start flex-wrap mb-2 ml-1">
                        <div v-for="(itemSkill, index) in currentJob?.jobSkills" :key="index"
                            class="badge badge-lg badge-outline">{{ itemSkill }}</div>
                    </div>
                </div>
                <div class="w-full text-star my-1">
                    <h2 class="text-xl font-semibold">Job Description</h2>
                    <div v-html="$textAreaFormatText(currentJob?.jobDescription)" class="mb-2 ml-1"></div>
                </div>
                <div class="w-full text-star my-1">
                    <h2 class="text-xl font-semibold">Requirements</h2>
                    <div v-html="$textAreaFormatText(currentJob?.Requirements)" class="mb-2 ml-1"></div>
                </div>
                <div class="w-full text-star my-1">
                    <h2 class="text-xl font-semibold">Responsibilities</h2>
                    <div v-html="$textAreaFormatText(currentJob?.Responsibilities)" class="mb-2 ml-1"></div>
                </div>
            </div>
            <div class="grid grid-cols-1 gap-3 md:grid-cols-2">
                <div class="col-span-1 flex flex-col">
                    <h2 class="text-xl font-semibold mb-2">Contact</h2>
                    <div class="mb-1 flex items-start gap-1">
                        <i class="bi bi-person-fill text-xl mr-2"></i>
                        <span>{{ currentJob?.contact?.name }}</span>
                    </div>
                    <div class="mb-1 flex items-start gap-1">
                        <i class="bi bi-envelope-fill text-xl mr-2"></i>
                        <span>{{ currentJob?.contact?.email }}</span>
                    </div>
                    <div class="mb-1 flex items-start gap-1">
                        <i class="bi bi-phone-fill text-xl mr-2"></i>
                        <span>{{ currentJob?.contact?.phone }}</span>
                    </div>
                    <div class="mb-1 flex items-start gap-1">
                        <i class="bi bi-building text-xl mr-2"></i>
                        <span>{{ currentJob?.contact?.company }}</span>
                    </div>
                    <div class="mb-1 flex items-start gap-1">
                        <i class="bi bi-geo-alt-fill text-xl mr-2"></i>
                        <span>{{ currentJob?.contact?.address }}</span>
                    </div>
                </div>
                <div class="col-span-1 md:col-span-2/3">
                    <figure class="w-full h-60 md:h-full skeleton">
                        <div class="h-full w-full bg-cover bg-center rounded-lg"
                            :style="{ backgroundImage: `url(${currentJob?.jobImageUrl})` }">
                        </div>
                    </figure>
                </div>
            </div>
        </div>
    </div>
    <!-- Open the modal using ID.showModal() method -->
    <dialog ref="myFormApplicantion" class="modal">
        <div v-if="!!currentJob" class="modal-box w-11/12 max-w-5xl">
            <ApplyForm v-model="currentJob" @applications="applications"></ApplyForm>
        </div>
    </dialog>

    <dialog ref="EditFormApplicantion" class="modal">
        <div class="modal-box max-w-3xl border border-2 shadow-xl">
            <div class="fixed top-0 right-5 modal-action">
                <form method="dialog">
                    <button class="btn btn-circle btn-sm border border-1 border-primary">
                        <i class="bi bi-x text-2xl"></i></button>
                </form>
            </div>
            <JobForm v-model="currentJob" @onSubmit="onSubmit"></JobForm>
        </div>
    </dialog>
    <ModalDialogLoadingBasic ref="loading" :isClose="false"></ModalDialogLoadingBasic>
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

onMounted(() => {
    nextTick().then(() => {
        setTimeout(() => {
            loading.value.show()
            $modelAPI.jobAPI.getJobById(JobID).then(result => {
                if (result.data.value.result) {
                    const custormData = result.data.value.data
                    custormData.company = result.data.value.data.contact.company
                    currentJob.value = $_.cloneDeep(custormData)
                    
                    // Set SEO metadata
                    useHead({
                        title: currentJob.value.jobName || 'Job Detail',
                        meta: [
                            { name: 'description', content: currentJob.value.jobDescription || 'Job detail page description' },
                            { property: 'og:title', content: currentJob.value.jobName || 'Job Detail' },
                            { property: 'og:description', content: currentJob.value.jobDescription || 'Job detail page description' },
                            { property: 'og:image', content: currentJob.value.jobImageUrl || 'https://example.com/default-image.jpg' },
                            { property: 'og:url', content: window.location.href },
                            { name: 'twitter:card', content: 'summary_large_image' },
                            { name: 'twitter:title', content: currentJob.value.jobName || 'Job Detail' },
                            { name: 'twitter:description', content: currentJob.value.jobDescription || 'Job detail page description' },
                            { name: 'twitter:image', content: currentJob.value.jobImageUrl || 'https://example.com/default-image.jpg' }
                        ]
                    });
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
        currentJob.value.contact.company = currentJob.value.company
        console.log(currentJob.value)
        $modelAPI.jobAPI.updateJobById(currentJob.value._id, currentJob.value).then(result => {
            if (result.data.value.result) {
                EditFormApplicantion.value.close()
                const custormData = result.data.value.data
                custormData.company = result.data.value.data.contact.company
                currentJob.value = $_.cloneDeep(custormData)
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
const deleteJob = (id) => {
    setTimeout(() => {
        $modelAPI.jobAPI.deleteJob(id).then(result => {
            if (result.data.value.result) {
                triggerToast('success', 'Job is Deleted')
            }
            else {
                triggerToast('error', 'Delete is failed')
            }
        }).catch(error => {
            triggerToast('error', error)
        }).finally(() => {
            loading.value.close()
            router.replace({ path: '/job' })
            triggerToast('success', 'Job is Deleted')
        })
    }, 1);
}

const applications = (isVal) => {
    if (isVal) {
        myFormApplicantion.value.close()
        triggerToast('success', 'Ứng tuyển thành công')
    } else {
        myFormApplicantion.value.close()
        triggerToast('error', 'Xin vui lòng thử lại')
    }
}
</script>

<style scoped></style>
