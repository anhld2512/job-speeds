<template>
    <div class="bg-white rounded-lg shadow-lg p-6">
      <div class="flex justify-center items-center">
        <div v-for="(value, unit) in time" :key="unit" class="flex flex-col items-center mx-2">
          <div class="text-4xl font-bold">{{ value }}</div>
          <div class="text-gray-600">{{ unit }}</div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  
  const targetDateString = '2024-06-01';
  const targetDate = new Date(targetDateString).getTime();
  
  const time = ref({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0
  });
  
  const updateTime = () => {
    const now = new Date().getTime();
    const distance = targetDate - now;
  
    time.value = {
      days: Math.floor(distance / (1000 * 60 * 60 * 24)),
      hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
      minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
      seconds: Math.floor((distance % (1000 * 60)) / 1000)
    };
  };
  
  onMounted(() => {
    updateTime();
    setInterval(updateTime, 1000);
  });
  
  const formattedTime = computed(() => {
    return Object.entries(time.value)
      .map(([unit, value]) => `${value < 10 ? '0' + value : value} ${unit}`)
      .join(' : ');
  });
  </script>
  
  <style scoped>
  /* Optional styling */
  </style>
  