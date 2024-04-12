<script setup lang="ts">
import type { ChainData } from '~/types/chain'
const url = useRuntimeConfig().public.baseUrl
const { token } = storeToRefs(useAuthStore())

definePageMeta({
  middleware: 'user',
  layout: 'default'
})

const isAddSpotDialogShown = ref(false)
const chainData = ref<ChainData | Record<string, never>>({})

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
      <div class="mb-4">
        <h1 class="text-3xl text-green font-bold mb-4">{{ chainData?.name }}</h1>
        <DataTable :value="chainData?.spots" striped-rows class="rounded-xl shadow-md p-4 bg-white p-datatable-sm">
          <template #header>
            <Button :label="$t('global.add')" icon="pi pi-plus" outlined rounded @click="isAddSpotDialogShown = true" />
          </template>
          <Column field="spotPosId" header="POS ID" />
          <Column field="name" :header="$t('global.name')" />
          <Column field="address" :header="$t('global.address')" />
          <Column field="description" :header="$t('global.description')" />
          <Column field="createdAt" :header="$t('global.created')">
            <template #body="{ data }">
              <span>{{ useDateFormat(data.createdAt, 'DD.MM.YYYY').value }}</span>
            </template>
          </Column>
        </DataTable>
      </div>
      <Dialog v-model:visible="isAddSpotDialogShown" modal :header="$t('spot.create')">
        <AddSpotForm @create="fetchChainData" />
      </Dialog>
    </section>
  </div>
</template>
