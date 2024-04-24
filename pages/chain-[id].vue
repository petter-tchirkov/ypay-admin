<script setup lang="ts">
import type { ChainData } from '~/types/chain'
const url = useRuntimeConfig().public.baseUrl
import type { DataTableEditingRows } from 'primevue/datatable'
const { token } = storeToRefs(useAuthStore())
const { chainData } = storeToRefs(useChainsStore())

definePageMeta({
  middleware: 'user',
  layout: 'default',
})

const isAddSpotDialogShown = ref(false)
const rowToEdit = ref<DataTableEditingRows>()
const selectedRow = ref<ChainData | Record<string, never>>({})
const toast = useToast()
const { t } = useI18n()

const fetchChainData = async () => {
  await useFetch<ChainData>(`${url}/Chains/${useRoute().params.id}`, {
    headers: { Authorization: `Bearer ${token.value}` },
    onResponse({ response }) {
      isAddSpotDialogShown.value = false
      chainData.value = response._data
    },
  })
}

const removeSpot = async (id: number) => {
  await $fetch(`${url}/Spots/${id}`, {
    method: 'DELETE',
    headers: { Authorization: `Bearer ${token.value}` },
    params: { id },
    async onResponse() {
      await fetchChainData()
      toast.add({ severity: 'success', detail: t('spot.removed'), life: 3000 })
    }
  })
}

await fetchChainData()
</script>

<template>
  <div class="flex flex-col">
    <Toast />
    <Header />
    <section class="p-4 grow">
      <div class="mb-4">
        <h1 class="text-3xl text-green font-bold mb-4">
          {{ chainData?.name }}
        </h1>
        <DataTable :value="chainData?.spots" striped-rows v-model:selection="selectedRow" selection-mode="single"
          v-model:editing-rows="rowToEdit" edit-mode="row" @row-edit-save=""
          class="rounded-xl shadow-md p-4 bg-white p-datatable-sm">
          <template #header>
            <div class="flex gap-3">
              <Button :label="$t('global.add')" icon="pi pi-plus" outlined rounded
                @click="isAddSpotDialogShown = true" />
              <Button :label="$t('global.delete')" severity="danger" icon="pi pi-trash" outlined rounded
                @click="removeSpot(selectedRow!.id)" />
            </div>
          </template>
          <Column field="id" header="ID" />
          <Column field="name" :header="$t('global.name')">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
          </Column>
          <Column field="address" :header="$t('global.address')">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
          </Column>
          <Column field="description" :header="$t('global.description')">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
          </Column>
          <Column field="createdAt" :header="$t('global.created')">
            <template #body="{ data }">
              <span>{{ useDateFormat(data.createdAt, 'DD.MM.YYYY').value }}</span>
            </template>
          </Column>
          <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center">
          </Column>
        </DataTable>
      </div>
      <Dialog v-model:visible="isAddSpotDialogShown" modal :header="$t('spot.create')">
        <AddSpotForm @create="fetchChainData" />
      </Dialog>
    </section>
  </div>
</template>
