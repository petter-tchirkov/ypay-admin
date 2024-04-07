<script setup lang="ts">
import type { ChainData } from '~/types/chain'
const url = useRuntimeConfig().public.baseUrl
const { token } = storeToRefs(useAuthStore())

definePageMeta({
  middleware: 'user',
  layout: 'default'
})

const isAddSpotDialogShown = ref(false)
const chainData = ref<ChainData | null>(null)

const fetchChainData = async () => {
  await $fetch<ChainData>(`${url}/Chains/${useRoute().params.id}`, {
    headers: { Authorization: `Bearer ${token.value}` },
    onResponse({ response }) {
      isAddSpotDialogShown.value = false
      chainData.value = response._data
    }
  })
}

await fetchChainData()

</script>
<template>
  <div class="flex flex-col">
    <Header />
    <section class="p-4 grow">
      <Button label="Add Spot" @click="isAddSpotDialogShown = true" class="mb-4" />
      <div class="mb-4">
        <div v-if="chainData?.spots.length" class="flex flex-col gap-4">
          <SpotCard v-for="spot in chainData.spots" :spot="spot" @click="$router.push(`/spot-${spot.id}`)" />
        </div>
        <div v-else class="flex flex-col">
          <h2 class="text-center text-green font-medium text-3xl">No spots found</h2>
        </div>
      </div>
      <Dialog v-model:visible="isAddSpotDialogShown" modal header="Create a new Spot">
        <AddSpotForm @create="fetchChainData" />
      </Dialog>
    </section>
  </div>
</template>
