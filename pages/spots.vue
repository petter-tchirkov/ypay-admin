<script setup lang="ts">
import type { Spot } from '~/types/spot';
const url = useRuntimeConfig().public.baseUrl
const spots = ref<Spot[]>([])
const { token } = storeToRefs(useAuthStore())

definePageMeta({
  middleware: 'user'
})


const fetchSpots = async () => {
  await $fetch(`${url}/Spots`, {
    headers: { Authorization: `Bearer ${token.value}` },
    onResponse({ response }) {
      spots.value = response._data
    }
  })
}
await fetchSpots()
</script>
<template>
  <div>
    <Header />
    <div class="p-4">
      <FakeBarChart />
    </div>
    <section class="p-4 flex flex-col gap-3">
      <SpotCard v-for="spot in spots" :key="spot.id" :spot="spot" />
    </section>
  </div>
</template>
