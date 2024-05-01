<script setup lang="ts">
import type { Spot } from '~/types/spot';
import { FilterMatchMode } from 'primevue/api';

const url = useRuntimeConfig().public.baseUrl
const { token } = storeToRefs(useAuthStore())
const localePath = useLocalePath()

definePageMeta({
  middleware: 'user',
  layout: 'default'
})

const { data: spots, pending, refresh } = await useFetch<Spot[]>(`${url}/Spots`, {
  headers: { 'Authorization': `Bearer ${token.value}` }
})

const filters = ref({
  name: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  address: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
  description: { value: null, matchMode: FilterMatchMode.STARTS_WITH },
});

</script>
<template>
  <div>
    <Header />
    <Preloader v-if="pending" />
    <section v-else class="p-4 flex flex-col gap-3">
      <h1 class="text-3xl text-green font-bold">Spots</h1>
      <DataTable :value="spots" striped-rows class="rounded-xl shadow-md p-4 bg-white p-datatable-sm"
        v-model:filters="filters" filter-display="row">
        <Column field="spotPosId" header="POS ID" />
        <Column field="name" :header="$t('global.name')" filter-field="name" :show-filter-menu="false">
          <template #body="{ data }">
            <NuxtLink :to="localePath(`/spot-${data.id}`)" class="text-green hover:underline transition">{{ data.name }}
            </NuxtLink>
          </template>
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
              :placeholder="$t('global.name')" />
          </template>
        </Column>
        <Column field="address" :header="$t('global.address')" filter-field="address" :show-filter-menu="false">
          <template #filter="{ filterModel, filterCallback }">
            <InputText v-model="filterModel.value" type="text" @input="filterCallback()" class="p-column-filter"
              :placeholder="$t('global.address')" />
          </template>
        </Column>
        <Column field="description" :header="$t('global.description')" filter-field="description"
          :show-filter-menu="false">
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
      </DataTable>
    </section>
  </div>
</template>
