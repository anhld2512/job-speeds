<template>
    <div class="space-y-5 border border-1 border-primary rounded-lg p-2">
      <div class="flex mb-3 gap-2 w-full">
        <button @click="addSkill" class="top-0 left-0">
          <i class="bi bi-plus-circle text-lg"></i>
        </button>
        <input
          type="text"
          v-model="newSkill"
          @keydown.enter.prevent="preventEnter"
          class="input input-sm input-bordered w-full"
          placeholder="Add a skill"
        />
        
      </div>
      <div class="flex flex-wrap gap-2">
        <span
          v-for="(skill, index) in jobSkills"
          :key="index"
          class="badge badge-accent inline-flex items-center justify-center text-sm font-medium gap-2 rounded-xl"
        >
          {{ skill }}
          <button @click="removeSkill(index)" type="button" class="ml-1">
            <i class="bi bi-x-circle text-md font-bold"></i>
          </button>
        </span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue';
  
  const props = defineProps({
    modelValue: {
      type: Array,
      default: () => []
    }
  });
  
  const emits = defineEmits(['update:modelValue']);
  
  const jobSkills = ref([...props.modelValue]);
  const newSkill = ref('');
  
  const addSkill = () => {
    const trimmedSkill = newSkill.value.trim();
    if (trimmedSkill && !jobSkills.value.includes(trimmedSkill)) {
      jobSkills.value.push(trimmedSkill);
      newSkill.value = '';
      emits('update:modelValue', jobSkills.value);
    }
  };
  
  const removeSkill = (index) => {
    jobSkills.value.splice(index, 1);
    emits('update:modelValue', jobSkills.value);
  };
  
  const preventEnter = (event) => {
    event.preventDefault(); // Prevent the Enter key from adding the skill
  };
  
  watch(() => props.modelValue, (newVal) => {
    jobSkills.value = [...newVal];
  });
  </script>
  
  <style scoped>
  /* Add any additional styling if necessary */
  </style>