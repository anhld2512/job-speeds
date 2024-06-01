<template>
  <dialog ref="my_modal" id="my_modal_1" class="modal">
    <div class="modal-box flex-row">
      <div class="flex-row items-center text-center">
        <h3 class="font-bold text-lg ">Please waiting...</h3>
        <span class="loading loading-spinner loading-lg text-primary"></span>
      </div>
      <div class="modal-action w-full mt-3">
      <form method="dialog" class="w-full">
        <!-- if there is a button, it will close the modal -->
        <button v-if="isClose" @click="closeDialog" class="btn btn-primary w-full ">Close</button>
      </form>
    </div>
      
    </div>
  </dialog>
</template>

<script setup>
const props = defineProps({
  isClose: {
    type: Boolean,
    required: true,
  },
});
const { isClose } = toRefs(props);

const my_modal = ref();
const openDialog = () => {
  my_modal.value.showModal();
};
const closeDialog = () => {
    my_modal.value.close();
};
defineExpose({
  show: openDialog,
  close: closeDialog
});
</script>

<style lang="scss" scoped></style>
