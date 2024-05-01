<script setup lang="ts">
import type { Chain } from '~/types/chain'
import type { DataTableEditingRows } from 'primevue/datatable'
import { FilterMatchMode, FilterOperator } from 'primevue/api';
definePageMeta({
  middleware: 'user',
  layout: 'default'
})

const url = useRuntimeConfig().public.baseUrl
const { user, token } = storeToRefs(useAuthStore())
const { removeChain } = useChainsStore()
const isAddChainDialogShown = ref(false)
const newChain = ref('')
const selectedChain = ref<Chain | null>(null)
const rowToEdit = ref<DataTableEditingRows>()
const filters = ref({
  global: { value: null, matchMode: FilterMatchMode.CONTAINS },
});


const { data: chains, pending, refresh } = useLazyFetch<Chain[]>(`${url}/Chains`, {
  headers: { 'Auuthorization': `Bearer ${token.value}` }
})

const addChain = async () => {
  await $fetch(`${url}/Chains`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token.value}` },
    body: { name: newChain.value, userId: user.value.id },
    async onResponse({ response }) {
      if (response.status === 201) {
        newChain.value = ''
        isAddChainDialogShown.value = false
        refresh()
      }
    }
  })
}


const updateChain = async (chain: Chain) => {
  await $fetch(`${url}/Chains/${chain.id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token.value}` },
    params: { id: chain.userId },
    body: { name: chain.name, userId: chain.userId },
    async onResponse({ response }) {
      if (response.status === 204) {
        refresh()
      }
    }
  })
}


</script>

<template>
  <div>
    <Toast />
    <Header />
    <Preloader v-if="pending" />
    <section v-else class="p-4">
      <DataTable v-if="chains?.length" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" :value="chains"
        v-model:selection="selectedChain" v-model:filters="filters" filter-display="menu"
        :global-filter-fields="['name', 'createdAt']" v-model:editing-rows="rowToEdit" striped-rows
        selection-mode="single" edit-mode="row" @row-edit-save="updateChain($event.newData)"
        class="p-datatable-sm p-4 rounded-xl shadow-md bg-white">
        <template #header>
          <div class="flex flex-col md:flex-row justify-between gap-3 md:gap-0">
            <div class="flex justify-between lg:justify-start gap-3">
              <Button icon="pi pi-plus" rounded outlined :label="$t('global.add')"
                @click="isAddChainDialogShown = true" />
              <Button icon="pi pi-plus" severity="danger" rounded outlined :label="$t('global.delete')"
                @click="removeChain(selectedChain!.id)" />
            </div>
            <InputText v-model="filters['global'].value" :placeholder="$t('global.filter')" />
          </div>
        </template>
        <Column field="id" header="ID" />
        <Column field="name" :header="$t('global.chain')">
          <template #body="{ data }">
            <NuxtLink :to="`/chain-${data.id}`" class="text-green !hover:underline transition">{{ data.name }}
            </NuxtLink>
          </template>
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" />
          </template>
        </Column>
        <Column :header="$t('global.created')" field="createdAt">
          <template #body="{ data }">
            {{ useDateFormat(data.createdAt, 'DD.MM.YYYY').value }}
          </template>
        </Column>
        <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
      </DataTable>
      <h1 v-else class="text-center text-green font-medium text-3xl">No chains found</h1>
      <Dialog v-model:visible="isAddChainDialogShown" modal :header="$t('chain.new')" class="w-96">
        <div class="flex flex-col gap-3">
          <InputText v-model="newChain" class="w-full" :placeholder="$t('global.chain')" />
          <Button :label="$t('global.add')" @click="addChain" />
        </div>
      </Dialog>
    </section>
  </div>
</template>
