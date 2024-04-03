<script setup lang="ts">
const { spot } = defineProps<{ spot: Spot }>()
</script>

<template>
  <div class="flex bg-green bg-opacity-20 border border-green rounded-xl p-4 justify-between">
    <div class="flex flex-col">
      <h1 class="text-2xl font-bold">{{ spot.name }}</h1>
      <span class="text-xs">{{ spot.address }}</span>
      <p>{{ spot.description }}</p>
    </div>
    <div class="flex">
      <span>{{ useDateFormat(spot.createdAt, 'DD.MM.YYYY').value }}</span>
    </div>
  </div>
</template>
