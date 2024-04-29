<script setup lang="ts">
import { FilterMatchMode } from 'primevue/api';
import type { DataTableEditingRows } from 'primevue/datatable'
import type { ChainData } from '~/types/chain'
const url = useRuntimeConfig().public.baseUrl
const { token } = storeToRefs(useAuthStore())
const { id } = useRoute().params

definePageMeta({
  middleware: 'user',
  layout: 'default',
})

const isAddSpotDialogShown = ref(false)
const rowToEdit = ref<DataTableEditingRows>()
const selectedRow = ref<ChainData | Record<string, never>>({})
const toast = useToast()
const { t } = useI18n()

const { data: chainData, pending, refresh } = useLazyFetch<ChainData>(`${url}/Chains/${id}`, {
  headers: { 'Authorization': `Bearer ${token.value}` }
})

const removeSpot = async (id: number) => {
  await $fetch(`${url}/Spots/${id}`, {
    method: 'DELETE',
    headers: { 'Authorization': `Bearer ${token.value}` },
    params: { id },
    onResponse() {
      selectedRow.value = {}
      toast.add({ severity: 'success', detail: t('spot.removed'), life: 3000 })
      refresh()
    }
  })
}

const onSpotCreation = () => {
  isAddSpotDialogShown.value = false
  refresh()
}

const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  address: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});


</script>

<template>
  <div class="flex flex-col">
    <Toast />
    <Header />
    <p v-if="pending">Loading...</p>
    <section v-else class="p-4 grow">
      <div class="mb-4">
        <h1 class="text-3xl text-green font-bold mb-4">
          {{ chainData?.name }}
        </h1>
        <DataTable :value="chainData?.spots" striped-rows v-model:selection="selectedRow" v-model:filters="filters"
          selection-mode="single" v-model:editing-rows="rowToEdit" edit-mode="row" filter-display="row"
          @row-edit-save="" class="rounded-xl shadow-md p-4 bg-white p-datatable-sm">
          <template #header>
            <div class="flex gap-3">
              <Button :label="$t('global.add')" icon="pi pi-plus" outlined rounded
                @click="isAddSpotDialogShown = true" />
              <Button :label="$t('global.delete')" severity="danger" icon="pi pi-trash" outlined rounded
                @click="removeSpot(selectedRow!.id)" />
            </div>
          </template>
          <Column field="id" header="ID" />
          <Column field="name" :header="$t('global.name')" filter-field="name" :show-filter-menu="false">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
                :placeholder="$t('global.name')" />
            </template>
          </Column>
          <Column field="address" :header="$t('global.address')" filter-field="address" :show-filter-menu="false">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
                :placeholder="$t('global.address')" />
            </template>
          </Column>
          <Column field="description" :header="$t('global.description')" filter-field="description"
            :show-filter-menu="false">
            <template #editor="{ data, field }">
              <InputText v-model="data[field]" />
            </template>
            <template #filter="{ filterModel, filterCallback }">
              <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
                :placeholder="$t('global.description')" />
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
        <AddSpotForm @create="onSpotCreation" />
      </Dialog>
    </section>
  </div>
</template>
