<template>
  <div class="relative w-full gap-3 mb-3" :class="`relative-${fieldFilter}`">
    <input
      ref="valueInput"
      class="input input-sm input-bordered input-primary w-full"
      type="text"
      v-model="itemSelected"
      @input="logValue"
      :placeholder="label"
      @focus="focusInput"
    />
    <button v-if="isSearching" @click="clearValue" class="absolute right-2 top-1">
      <i class="bi bi-trash"></i>
    </button>
    <div v-else class="absolute right-2 top-1"><i class="bi bi-search"></i></div>
    <ul
      v-show="showDropdown"
      class="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 py-1 shadow-lg max-h-60 overflow-auto"
    >
      <li v-for="(item,index) in dataScrouce"
        :key="index"
        @click="selectItem($event, item)"
        class="cursor-pointer px-4 py-2 hover:bg-gray-100 mt-1 rounded-x"
      >
        {{ item }}
      </li>
     
      <li v-if="isLoadingData">
        <LoadingPage />
      </li>
    </ul>
  </div>
</template>
<script setup>
import { ref, computed, onMounted, onBeforeUnmount } from 'vue';
import { useNuxtApp } from '#app';
const { $_ } = useNuxtApp();

const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  data: {
    type: Array,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  fieldFilter: {
    type: String,
    default: 'name'
  }
});

const { data, fieldFilter, label, modelValue } = toRefs(props);
const emit = defineEmits(['update:modelValue']);

const itemSelected = computed({
  get() {
    return modelValue.value ?? '';
  },
  set(value) {
    if (!$_.isEqual(modelValue.value, value)) {
      emit('update:modelValue', value);
    }
  }
});

const isLoadingData = ref(true);
const showDropdown = ref(false);
const valueInput = ref(null);
const pressedKey = ref('');
const keyRefesh= ref(0)
const isSearching = computed(() => {
  return itemSelected.value?.length > 0;
});
const logValue = $_.debounce((event) => {
  pressedKey.value = event.target.value;
}, 500);

const selectItem = (event, value) => {
  itemSelected.value = value;
  showDropdown.value = false;
};

const focusInput = () => {
  showDropdown.value = true;
};

const dataScrouce = computed(() => {
  const newArray = data.value.map(item => item[fieldFilter.value]);
  const uniqueArray = newArray.filter((item, index, self) => self.indexOf(item) === index);
  isLoadingData.value = uniqueArray.length === 0;

  if (pressedKey.value.trim() === '') {
    return uniqueArray;
  } else {
    return uniqueArray.filter(item => item.toLowerCase().includes(pressedKey.value.toLowerCase()));
  }
});

const handleClickOutside = (event) => {
  if (!event.target.closest(`.relative-${fieldFilter.value}`)) {
    showDropdown.value = false;
  }
};

const clearValue = (event) => {
  if(event) {
    event.preventDefault();
  }
  itemSelected.value = '';
  pressedKey.value= ''
  showDropdown.value = true;
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>