<script setup lang="ts">
const url = useRuntimeConfig().public.baseUrl
definePageMeta({
  middleware: 'user'
})

const { data: chainData } = await useFetch<ChainData>(`${url}/Chains/${useRoute().params.id}`, {
  headers: { Authorization: `Bearer ${useAuthStore().token.value}` }
})
</script>
<template>
  <Header />
  <section class="p-4">
    <div v-if="chainData.spots">
          <SpotCard v-for="spot in chainData.spots" :spot="spot"/>
    </div>
    <h1 v-else>No spots found</h1>
  </section>
</template>
