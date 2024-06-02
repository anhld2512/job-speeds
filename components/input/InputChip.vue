<template>
    <div class="flex flex-wrap items-center gap-2 p-2 border rounded-md">
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(chip, index) in chips"
          :key="index"
          class="flex items-center px-3 py-1 bg-gray-200 rounded-full"
        >
          {{ chip }}
          <button
            @click="removeChip(index)"
            class="ml-2 text-red-500 focus:outline-none"
          >
            x
          </button>
        </span>
      </div>
    </div>
  </template>
  
  <script setup>

  const props = defineProps({
    modelValue: {
      type: Array,
      default: () => [],
    },
  });
  
  const emits = defineEmits(['update:modelValue']);
  
  const chips = ref([...props.modelValue]);
  const inputText = ref('');
  
  watch(chips, (newChips) => {
    emits('update:modelValue', newChips);
  });
  
  const addChip = () => {
    if (inputText.value.trim() !== '') {
      chips.value.push(inputText.value.trim());
      inputText.value = '';
    }
  };
  
  const removeChip = (index) => {
    chips.value.splice(index, 1);
  };
  </script>
  
  <style scoped>
  /* Bạn có thể thêm các kiểu CSS khác nếu cần */
  </style>
  