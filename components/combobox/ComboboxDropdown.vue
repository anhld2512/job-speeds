<template>
  <div class="relative w-full gap-3 mb-3" :class="`relative-${filedFilter}`">
    <input ref="valueInput" class="input input-bordered input-primary w-full" type="text" v-model="itemSelected"
      @input="logValue" :placeholder="label" @focus="focusInput">
    <button @click="clearValue" class="absolute right-0 top-0 mt-3 mr-3">
      <i class="bi bi-x-lg"></i>
    </button>
    <ul v-show="showDropdown"
      class="absolute z-10 w-full bg-white border border-gray-300 rounded mt-1 py-1 shadow-lg max-h-60 overflow-auto">
      <li v-for="item in dataScrouce" :key="item" @click="selectItem($event, item)"
        class="cursor-pointer px-4 py-2 hover:bg-gray-100 mt-1 rounded-x">
        {{ item }}
      </li>
      <li>
        <LoadingPage v-if="isLoadingData" />
      </li>
    </ul>

  </div>

</template>

<script setup>
const { $_ } = useNuxtApp()
const props = defineProps({
  modelValue: {
    type: String,
    default: ''
  },
  data: {
    type: Object,
    required: true
  },
  label: {
    type: String,
    default: ''
  },
  filedFilter: {
    type: String,
    default: 'name'
  }
});

const { data, filedFilter, label, modelValue } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);

const itemSelected = computed({
  get() {
    // CheckSameSameAddress();
    return modelValue?.value ?? {};
  },
  set(value) {
    if (!$_.isEqual(modelValue.value, value)) {
      emit("update:modelValue", value)
    }
  }
});

const isLoadingData = ref(true);
const showDropdown = ref(false);
const valueInput = ref(null)
const pressedKey = ref('');
const logValue = $_.debounce((event) => {
  pressedKey.value = event.target.value;

}, 500);

const selectItem = (event, value) => {
  itemSelected.value = value;
  showDropdown.value = false;
};
const focusInput = () => {
  showDropdown.value = true
}

const dataScrouce = computed(() => {
  const newArray = data.value.map(item => item[filedFilter.value])
  const uniqueArray = newArray.filter((item, index, self) => self.indexOf(item) === index);
  if (uniqueArray?.length > 0) {
    isLoadingData.value = false;
  } else {
    isLoadingData.value = true;
  }
  if (pressedKey.value.trim() === '') {
    return uniqueArray
  } else {
    return uniqueArray.filter(item => item.toLowerCase().includes(pressedKey.value.toLowerCase()));
  }
})
const handleClickOutside = (event) => {
  if (!event.target.closest(`.relative-${filedFilter.value}`)) {
    showDropdown.value = false;
  }
};
const clearValue = () => {
  itemSelected.value = ''
  showDropdown.value = true;
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
