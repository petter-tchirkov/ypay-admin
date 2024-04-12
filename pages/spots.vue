<script setup lang="ts">
const { spots } = storeToRefs(useSpotStore())
const { fetchSpots } = useSpotStore()
const localePath = useLocalePath()

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
      <h1 class="text-3xl text-green font-bold">Spots</h1>
      <DataTable :value="spots" striped-rows class="rounded-xl shadow-md p-4 bg-white p-datatable-sm">
        <Column field="spotPosId" header="POS ID" />
        <Column field="name" :header="$t('global.name')">
          <template #body="{ data }">
            <NuxtLink :to="localePath(`/spot-${data.id}`)" class="text-green hover:underline transition">{{ data.name }}
            </NuxtLink>
          </template>
        </Column>
        <Column field="address" :header="$t('global.address')" />
        <Column field="description" :header="$t('global.description')" />
        <Column field="createdAt" :header="$t('global.created')">
          <template #body="{ data }">
            <span>{{ useDateFormat(data.createdAt, 'DD.MM.YYYY').value }}</span>
          </template>
        </Column>
      </DataTable>
    </section>
  </div>
</template>
