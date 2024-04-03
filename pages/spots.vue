<script setup lang="ts">
const url = useRuntimeConfig().public.baseUrl
const spots = ref([])

const fetchSpots = async () => {
  const { data: spots } = await useFetch(`${url}/Spots`, {
    headers: { Authorization: `Bearer ${useAuthStore().token.value}` },
    onResponse({ response }) {
      if (response.status === 200) {
        spots.value = response._data
      }
    }
  })
}
</script>
<template>
  <Header />
</template>
