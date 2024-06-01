<template>

  <div class="relative w-full">
    <div class="w-full">
      <input type="text" v-model="valueInputSearch" placeholder="Search" class="input input-bordered w-full"
        @focus="focusInputSearch" />
      <button @click="clearSearch" class="absolute right-0 top-0 mt-3 mr-3">
        <i class="bi bi-x-lg"></i>
      </button>
    </div>
    <div v-show="showFilter"
      class="absolute z-10 w-full bg-white border border-2 rounded mt-2 py-1 shadow-lg max-h-96 h-96 overflow-auto p-3">
      <div class="d-flex mb-3">
        <h6>Tìm Kiếm Nâng Cao</h6>
      <div class="text-end absolute top-0 right-0 mb-12 m-3">
        <button @click="closeFilter" class="btn btn-sm border border-2 border-primary text-end"><i class="bi bi-x"></i> Close</button>
      </div>
      </div>
     
      <div class="flex-row gap-3 mt-6">
        <div class="w-full">
          <ComboboxDropdown label="Category" filedFilter="jobCategory" v-model="filterCategory" :data="data">
          </ComboboxDropdown>
        </div>
        <div class="w-full">
          <ComboboxDropdown label="Type" filedFilter="jobType" v-model="filterType" :data="data"></ComboboxDropdown>
        </div>
        <div class="w-full">
          <button @click="btnActionSearch" class="w-full btn btn-sm btn-primary"><i class="bi bi-search"></i>
            Search</button>
        </div>
        
      </div>
     
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  modelValue: {
    type: Object,
    default: () => ({})
  },
  data: {
    type: Object,
    default: () => ({})
  },
})
const { modelValue, data } = toRefs(props);
const emit = defineEmits(["update:modelValue", 'actionFilter', 'actionBtnFilter']);

const valueInputSearch = ref('')
const filterCategory = ref('')
const filterType = ref('')
const showFilter = ref(false)
const focusInputSearch = () => {
  showFilter.value = true
}
const handleClickOutside = (event) => {
  if (!event.target.closest(`.relative`)) {
    showFilter.value = false;
  }
};
const clearSearch = () => {
  valueInputSearch.value = ''
}
const btnActionSearch = () => {
  const object = {
  }
  if (valueInputSearch.value.length > 0) {
    object.search = valueInputSearch.value
  }
  if (filterCategory.value.length > 0) {
    object.Category = filterCategory.value
  }
  if (filterType.value.length > 0) {
    object.Type = filterType.value
  }
  emit('actionBtnFilter', object)
}

const closeFilter = () =>{
  showFilter.value = false;
}
onMounted(() => {
  // Attach click event listener to the document
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  // Remove click event listener when component is unmounted
  document.removeEventListener('click', handleClickOutside);
});

</script>

<style lang="scss" scoped></style>