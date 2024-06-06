<template>
  <div :key="refeshFilter" class="relative w-full md:w-1/2">
    <div class="w-full">
      <input
        v-model="search"
        type="text"
        :readonly="isFilterAdvanced"
        :placeholder="!isFilterAdvanced ? 'Search' :''"
        @input="logValue"
        class="input input-sm input-bordered w-full"
        :class="{'input-accent':isFilterAdvanced}"
        @focus="focusInputSearch"
      />
      <button v-if="isSearching" @click="clearSearch" class="absolute right-2 top-1">
        <i class="bi bi-trash"></i>
      </button>
      <div v-else class="absolute right-2 top-1"><i class="bi bi-search"></i></div>
      <div v-if="isFilterAdvanced" :class="{'hidden' :!isFilterAdvanced}" class="absolute left-2 top-1 bg-accent rounded-xl items-center justify-center"><span class="px-2 text-xs items-center justify-center">Advanced <i @click="clearSearch"  class="bi bi-x-circle text-md front-bold"></i></span></div>
    </div>
    <div
      v-show="showFilter"
      class="absolute z-10 w-full bg-white border border-gray-300 rounded mt-2 py-3 shadow-lg max-h-96 h-96 overflow-auto p-3"
    >
      <div class="flex justify-between items-center mb-3">
        <h6 class="text-lg font-semibold">Tìm Kiếm Nâng Cao</h6>
        <button @click="closeFilter" class="btn btn-circle btn-sm border border-2">
          <i class="bi bi-x text-xl"></i>
        </button>
      </div>
      <div class="flex flex-col gap-3 px-2">
        <div class="w-full">
          <ComboboxDropdown label="Name" fieldFilter="jobName" v-model="filter.jobName" :data="data" />
        </div>
        <div class="w-full">
          <ComboboxDropdown label="Category" fieldFilter="jobCategory" v-model="filter.jobCategory" :data="data" />
        </div>
        <div class="w-full">
          <ComboboxDropdown label="Type" fieldFilter="jobTyped" v-model="filter.jobTyped" :data="data" />
        </div>
        <div class="absolute bottom-0 right-0 left-0 w-full px-4 pb-3">
          <button @click="btnActionSearch" class="w-full btn btn-sm btn-primary">
            <i class="bi bi-search"></i> Search
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { $_ } = useNuxtApp();

const props = defineProps({
  data: {
    type: Array,
    default: () => []
  },
  filter: {
    type: Object,
    default: () => ({})
  }
});

const { data, filter: initialFilter } = toRefs(props);
const isFilterAdvanced = ref(false)
const emit = defineEmits(['update:modelValue', 'actionFilter']);
const search = ref(initialFilter.value.search ?? '');
const filter = ref(initialFilter.value.filter ?? {
  jobName: '',
  jobCategory: '',
  jobTyped: ''
});
const showFilter = ref(false);
const refeshFilter = ref(0);

const focusInputSearch = () => {
  showFilter.value = true;
};

const clearSearch = () => {
  refeshFilter.value++;
  search.value = '';
  filter.value = {
    jobName: '',
    jobCategory: '',
    jobTyped: ''
  };
  emitFilter();
};
// Watcher cho search
const isSearching = computed(() => {
  return search.value?.length > 0;
});

watch(
  () => search.value,
  (newValue) => {
    if (newValue) {
      filter.value = {
        jobName: '',
        jobCategory: '',
        jobTyped: ''
      };
      isFilterAdvanced.value = false
    }
  },
  { immediate: true, deep: true }
);

// Watcher cho filter
watch(
  () => [
    filter.value.jobName,
    filter.value.jobCategory,
    filter.value.jobTyped
  ],
  (newValue) => {
    const isChangeFilter = newValue.some((v) => `${v || ''}`.trim().length > 0);
    if (isChangeFilter) {
      search.value = '';
      isFilterAdvanced.value = true
    }else{
      isFilterAdvanced.value = false
    }
  },
  { immediate: true, deep: true }
);

const emitFilter = () => {
  if (search.value?.length > 0) {
    emit('actionFilter', { search: search.value });
  } else {
    const filterObject = { ...filter.value };
    Object.keys(filterObject).forEach((key) => {
      if (!filterObject[key]) delete filterObject[key];
    });
    emit('actionFilter', { filter: filterObject, hasFilter: Object.keys(filterObject).length > 0 });
  }
};

const btnActionSearch = (event) => {
  if (event) {
    event.preventDefault();
  }
  showFilter.value = false;
  emitFilter();
};

const closeFilter = () => {
  showFilter.value = false;
};

const logValue = $_.debounce((event) => {
  showFilter.value = false;
  if(event.target.value.length > 0){
    emit('actionFilter', { search:  event.target.value });
  }else{
    emit('actionFilter', { search:  ''});
  }
  
}, 500);
onMounted(() => {
  // Khởi tạo giá trị filter và search nếu có giá trị ban đầu
  if (initialFilter.value.search) {
    search.value = initialFilter.value.search;
  } else if (initialFilter.value.filter) {
    filter.value = { ...initialFilter.value.filter };
  }
});
</script>

<style lang="scss" scoped></style>