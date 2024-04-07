<script setup lang="ts">
const { spots } = storeToRefs(useSpotStore())
const { fetchSpots } = useSpotStore()

definePageMeta({
  middleware: 'user',
  layout: 'default'
})


await fetchSpots()
</script>
<template>
  <div>
    <Header />
    <section class="p-4 flex flex-col gap-3">
      <SpotCard v-for="spot in spots" :key="spot.id" :spot="spot" />
    </section>
  </div>
</template>
