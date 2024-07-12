<template>
    <div v-if="isProfile" class="container max-w-6xl mx-auto">
        <div class="flex-row md:flex gap-3 p-3">
            <div class="card w-full md:w-2/3 border border-2 mb-3 shadow">
                <div class="card-body p-2">
                    <h3 class="text-xl font-semibold flex items-center justify-start gap-2"><i
                            class="bi bi-person-bounding-box text-3xl"></i> Personal</h3>
                    <ProfilePersonal v-model="User" :enableEditMode="false"> </ProfilePersonal>
                    <div class="absolute top-0 right-0 mt-1 mr-1 ">
                        <div class="dropdown dropdown-bottom dropdown-end">
                            <div tabindex="0" role="button" class="btn btn-sm btn-accent m-1"><i
                                    class="bi bi-gear text-lg front-bold"></i></div>
                            <ul tabindex="0"
                                class="border border-2 dropdown-content z-[1] menu p-1 shadow bg-base-100 rounded-md w-36">
                                <li><a @click="actionEditProfile"><i
                                            class="bi bi-pen text-lg text-accent font-extrabold"></i>Edit</a></li>
                                <hr class="border border-3 border-gray mb-1 mt-1 font-extrabold">
                                <li><a><i class="bi bi-info-square text-lg text-accent font-extrabold"></i>Help</a></li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
            <div class="card w-full md:w-1/3 border border-2 mb-3 shadow">
                <div class="card-body p-2">
                    <h3 class="text-xl font-semibold flex items-center justify-start gap-2"><i
                            class="bi bi-person-badge text-3xl"></i> Other</h3>
                    <div class="grid grid-cols-2 gap-1">
                        <div class="information-avatar">
                            <FormInPlaceEditor label="Avatar" :required="false" v-model="User.avatar"
                                cssClass="block text-xl" :showButtonEditMode="false" :enableEditMode="false">
                                <template #displayValue>
                                    <div class="avatar items-center justify-center w-full">
                                        <div class="skeleton w-full min-h-32 max-h-40 h-auto rounded">
                                            <img v-if="User.avatar" :src="User.avatar" />
                                            <img v-else
                                                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg" />
                                        </div>
                                    </div>
                                    <div class="custom-file-input">
                                        <input @change="actionChangeAvatar" id="idphoto" :multiple="false" type="file"
                                            accept="image/*" :key="KeyChangeAvatar" name="file_photo" />
                                        <button class="btn btn-sm btn-primary rounded-md">
                                            <i class="bi bi-camera text-xl"></i> Change
                                        </button>
                                    </div>
                                </template>
</FormInPlaceEditor>

</div>
<div class="information-setting">
    <div class="grid grid-cols-1 gap-1 ">
        <FormInPlaceEditor label="Role" :required="false" v-model="User.role" cssClass="block text-xl"
            :showButtonEditMode="false" :enableEditMode="false">
            <input type="text" id="Role" v-model="User.role" class="input input-bordered w-full" />
            <template #displayValue>
                                        <span class="badge badge-accent">{{ User.role }}</span>
                                    </template>
        </FormInPlaceEditor>
        <FormInPlaceEditor label="Created At" :required="false" v-model="User.createdAt" cssClass="block text-xl"
            :showButtonEditMode="false" :enableEditMode="false">
            <input type="text" id="Role" v-model="User.createdAt" class="input input-bordered w-full" />
            <template #displayValue>
                                        <span> {{ $filters.dateStringFormat(User.createdAt, "DD/MM/YYYY") }}</span>
                                    </template>
        </FormInPlaceEditor>
        <FormInPlaceEditor label="Updated At" :required="false" v-model="User.updatedAt" cssClass="block text-xl"
            :showButtonEditMode="false" :enableEditMode="false">
            <input type="text" id="Role" v-model="User.updatedAt" class="input input-bordered w-full" />
            <template #displayValue>
                                        <span> {{ $filters.dateStringFormat(User.updatedAt, "DD/MM/YYYY") }}</span>
                                    </template>
        </FormInPlaceEditor>
    </div>
</div>
</div>
</div>
</div>
</div>
<div class="flex-row md:flex gap-3 p-3">
    <div class="card w-full border border-2 mb-3 shadow">
        <div class="card-body p-2">
            <h3 class="text-xl font-semibold flex items-center justify-start gap-2"><i
                    class="bi bi-postcard text-3xl"></i>Post</h3>
            <div class="badge badge-accent">Comming soon</div>
        </div>
    </div>
</div>
<div class="flex-row md:flex gap-3 p-3">
    <div class="card w-full border border-2 mb-3 shadow">
        <div class="card-body p-2">
            <h3 class="text-xl font-semibold flex items-center justify-start gap-2"><i
                    class="bi bi-images text-3xl"></i>Ablum</h3>
            <div class="badge badge-accent">Comming soon</div>
        </div>
    </div>
</div>
<div class="flex-row md:flex gap-3 p-3">
    <div class="card w-full border border-2 mb-3 shadow">
        <div class="card-body p-2">
            <h3 class="text-xl font-semibold flex items-center justify-start gap-2"><i
                    class="bi bi-grid text-3xl"></i>Service</h3>
            <div class="badge badge-accent">Comming soon</div>
        </div>
    </div>
    <div class="card w-full border border-2 mb-3 shadow">
        <div class="card-body p-2">
            <h3 class="text-xl font-semibold flex items-center justify-start gap-2"><i
                    class="bi bi-credit-card text-3xl"></i>Billing</h3>
            <div class="badge badge-accent">Comming soon</div>
        </div>
    </div>
</div>

</div>
    <ModalDialogLoadingBasic ref="loading" :isClose="false"></ModalDialogLoadingBasic>
    <ToastMessage ref="toastRef" :typeToast="currentToastType" :message="toastMessage" :show="showToast" />


    <dialog ref="modalAvatar" class="modal">
        <div class="modal-box h-full w-11/12 max-w-6xl m-2 border border-2 rounded-xl shadow overflow-hidden bg-black">
            <div class="fixed top-0 right-5 modal-action z-50">
                <button @click="closeModal" class="btn btn-circle btn-md border border-1 border-primary">
                    <i class="bi bi-x text-2xl"></i></button>
            </div>
            <CropperLayout class="h-full overflow-hidden">
                <Cropper :hidden="isHiddenModal" class="cropper h-full overflow-hidden rounded-xl -mt-4"
                    ref="cropperAvatar" :src="imgAvatar" :key="keyAvatar"
                    :stencil-component="useVerticalButton ? ((viewCropper === 'circle') ? $options.components.CircleStencil : $options.components.Circle) : stencilComponent ? $options.components.SimplestStencil : ''"
                    :canvas="CanvasRefAvatar" :stencil-props="OptionsPropsAvatar"
                    :resize-image="{ adjustStencil: false }" default-boundaries="fill" :default-size="defaultSize" />
                <div v-if="useVerticalButton">
                    <CropperVerticalButtons>
                        <CropperSquareButton title="circle" @click="circleCrop">
                            <i class="bi bi-person-circle"></i>
                        </CropperSquareButton>
                        <CropperSquareButton title="square" @click="squareCrop">
                            <i class="bi bi-person-square"></i>
                        </CropperSquareButton>
                    </CropperVerticalButtons>
                </div>
            </CropperLayout>
            <div class="fixed w-full bottom-5 right-0 left-0 px-4 md:px-56">
                <button @click="cropAvatar" class="w-full btn btn-sm btn-accent"><i
                        class="bi bi-save text-lg front-bold"></i> Save</button>
            </div>
        </div>
    </dialog>
    <dialog v-if="!isProfile" ref="updateProfile" class="modal py-3">
        <div class="modal-box w-11/12 max-w-6xl m-2 border border-2 rounded-xl ">
            <div class="fixed top-0 right-5 modal-action">
                <form method="dialog">
                    <button class="btn btn-circle btn-sm">
                        <i class="bi bi-x text-2xl"></i></button>
                </form>
            </div>
            <ProfilePersonal v-model="User" :enableEditMode="true" @valid="valid"></ProfilePersonal>
        </div>
    </dialog>

</template>

<script setup>
import { Cropper } from "vue-advanced-cropper";
const { $modelAPI, $_, $filters, $uuidv4 } = useNuxtApp();
const { token, logout, userId } = useAuth();
const router = useRouter();
const loading = ref(null)
const User = ref(null)
// #region Avatar
const isHiddenModal = ref(false)
const keyAvatar = ref(0)
const useVerticalButton = ref(true)
const modalAvatar = ref(null)
const imgAvatar = ref(null)
const KeyChangeAvatar = ref(0)
const CanvasRefAvatar = ref({});
const OptionsPropsAvatar = ref({
    handlers: {},
    movable: false,
    resizable: false,
    aspectRatio: 1,
});
const viewCropper = ref('circle')
const circleCrop = () => {
    return viewCropper.value = "circle"
}
const squareCrop = () => {
    return viewCropper.value = 'square'
}
const openModal = () => {
    isHiddenModal.value = false
    modalAvatar.value.show()
}
const closeModal = () => {
    isHiddenModal.value = true
    modalAvatar.value.close()
}
const actionChangeAvatar = (input) => {
    if (input.target.files[0]) {
        KeyChangeAvatar.value++;
        const src = URL.createObjectURL(input.target.files[0]);
        if (src) {
            openModal();
            imgAvatar.value = src;
        }
    }
}
const cropperAvatar = ref(null);
const cropAvatar = (event) => {
    if (event) {
        event.preventDefault();
    }
    const { coordinates, canvas } = cropperAvatar.value.getResult();
    cropperAvatar.value.coordinates = coordinates;
    // Điều chỉnh phương thức lấy dữ liệu Image sau khi Crop.
    canvas.toBlob(uploadImageBlobAvatar);
};
const uploadImageBlobAvatar = async (ImageAvatar) => {
    if (ImageAvatar) {
        closeModal()
        loading.value.show()
        //AnhTranTuan 2024-05-06: Điều chỉnh API Upload ID Photo
        $modelAPI.uploadAPI.uploadLocal(ImageAvatar).then(result => {
            if (result.data.value.result) {
                User.value.avatar = result.data.value.fileUrl
                $modelAPI.profileAPI.updateProfile(User.value._id, User.value).then(result => {
                    if (result.data.value.result) {
                        triggerToast('success', 'Avatar is updated')
                        keyAvatar.value++
                    }
                }).catch(error => {
                    console.error(error)
                })
            }
        }).catch(error => {
            console.error(error)
        }).finally(() => {
            loading.value.close()
        })

    }
};

const defaultSize = ({ imageSize, visibleArea }) => {
    return {
        width: (visibleArea || imageSize).width,
        height: (visibleArea || imageSize).height,
    };
};
//#region Toast
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
//#endregion
// #endregion
//#region Change Information
const updateProfile = ref(null)
const actionEditProfile = () => {
    updateProfile.value.show()
}
const valid = (value) => {
    if (value) {
        updateProfile.value.close()
        triggerToast('success', 'Information is updated')
    }
}
const isReloadPage = ref(true)
const authStore = useAuthStore();

//#endregion
const isProfile = ref(false)
onMounted(() => {
    nextTick().then(() => {
        setTimeout(async () => {
            const { token, userId } = authStore;
            if (localStorage.getItem("token")) {
                if (localStorage.getItem("userId")) {
                    loading.value.show();
                    try {
                        const result = await $modelAPI.profileAPI.getProfileById(localStorage.getItem("userId"), localStorage.getItem("token"));
                        if (result.data.value.result) {
                            isProfile.value = result.data.value.result
                            User.value = $_.cloneDeep($modelAPI.profileAPI.profileFormat(result.data.value.data));
                        } else {
                            User.value = {
                                "userId": localStorage.getItem("userId"),
                                "role": "Employer",
                                "avatar": "",
                                "personalInfo": {
                                    "fullName": "",
                                    "email": "",
                                    "phone": "",
                                    "address": "",
                                    "dateOfBirth": "",
                                    "gender": "Male"
                                }
                            }
                            updateProfile.value.show()
                        }
                    } catch (error) {
                        console.error(error);
                    } finally {
                        loading.value.close();
                    }
                }
            } else {
                router.push('/login');
            }
        }, 1);
    });
});
</script>

<style lang="scss" scoped></style>
<script>
import { CircleStencil } from 'vue-advanced-cropper'
import SimplestStencil from "../../components/Cropper/CropperSimplestStencil.vue";
export default {
    components: {
        SimplestStencil, CircleStencil
    },
};
</script>