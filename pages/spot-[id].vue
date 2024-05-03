<script setup lang="ts">
import type { SpotData, SpotOrder } from '~/types/spot';
const url = useRuntimeConfig().public.baseUrl
const { token } = storeToRefs(useAuthStore())
const id = +useRoute().params.id
const { t } = useI18n()

definePageMeta({
  middleware: 'user',
  layout: 'default'
})

const { updateSpot } = useSpotStore()
const route = useRoute()
const expandedRows = ref()

const generateQr = async () => {
  window.location.href = `https://api.yumaxpay.com/api/Spots/${route.params.id}/qr-codes`
}

const { data: spotData } = await useFetch<SpotData>(`${url}/Spots/${id}`, {
  headers: { Authorization: `Bearer ${token.value}` },
})

const { data: spotOrders } = await useFetch<SpotOrder[]>(`${url}/Spots/${id}/requests`, {
  headers: { Authorization: `Bearer ${token.value}` },
})

const home = ref({
  icon: 'pi pi-home'
});
const items = ref([
  { label: t('sidebar.spots') },
  { label: spotData.value?.name },
]);
</script>

<template>
  <div>
    <Header />
    <Toast />
    <section class="p-4">
      <Breadcrumb :home="home" :model="items" class="mb-4" />
      <h1 class="text-green text-3xl mb-4 font-bold text-center lg:text-left">{{ spotData?.name }}</h1>
      <div class="flex flex-col lg:flex-row gap-4">
        <div class="flex shadow-md p-4 rounded-xl bg-white lg:w-fit mb-4">
          <div class="flex flex-col gap-3 mb-3 w-full">
            <h3 class="text-xl font-bold text-green text-center">{{ $t('global.settings') }}</h3>
            <div class="flex flex-col">
              <span>{{ $t('global.name') }}</span>
              <InputText v-model="spotData.name" />
            </div>
            <div class="flex flex-col">
              <span>{{ $t('global.description') }}</span>
              <Textarea v-model="spotData.description" />
            </div>
            <div class="flex flex-col">
              <span>{{ $t('global.address') }}</span>
              <InputText v-model="spotData.address" />
            </div>
            <div class="flex flex-col">
              <span>POS ID</span>
              <InputNumber v-model="spotData.spotPosId" :use-grouping="false" placeholder="POS ID" />
            </div>
            <Button :label="$t('spot.updateSpot')"
              @click="updateSpot(+$route.params.id, spotData.chainId, spotData.name, spotData.description, spotData.address, spotData.spotPosId)" />
            <Button :label="$t('spot.generateQr')" @click="generateQr" />
          </div>
        </div>
        <MenuTable class="shadow-md p-4 rounded-xl bg-white mb-4 grow" />
      </div>
      <DataTable :value="spotOrders" v-model:expandedRows="expandedRows" class="shadow-md p-4 rounded-xl bg-white">
        <Column expander style="width: 5rem" />
        <Column field="requestStatus" :header="$t('spot.reqStat')">
          <template #body="{ data }">
            {{ getRequestStatus(data.requestStatus) }}
          </template>
        </Column>
        <Column field="amount" :header="$t('spot.amount')" />
        <Column field="total" :header="$t('spot.total')" />
        <Column field="tips" :header="$t('spot.tips')" />
        <Column field="tableId" :header="$t('spot.tableId')" />
        <Column field="spotPosId" :header="$t('spot.spotPos')" />
        <Column field="spotId" :header="$t('spot.spotId')" />
        <Column field="personsCount" :header="$t('spot.persCount')" />
        <Column field="createdAt" :header="$t('global.created')">
          <template #body="{ data }">
            <div class="flex flex-col">
              {{ useDateFormat(data.createdAt, 'DD.MM.YYYY').value }}<br />
              {{ useDateFormat(data.createdAt, 'HH:mm:ss').value }}
            </div>
          </template>
        </Column>
        <template #expansion="slotProps">
          <h3>Order for Table {{ slotProps.data.tableId }}</h3>
          <DataTable :value="slotProps.data.requestProducts">
            <Column field="productPosId" :header="$t('spot.prodPos')" />
            <Column field="productName" :header="$t('spot.prodName')" />
            <Column field="price" :header="$t('global.price')" />
            <Column field="qty" :header="$t('global.quantity')" />
            <Column field="createdAt" :header="$t('global.created')">
              <template #body="{ data }">
                {{ useDateFormat(data.createdAt, 'DD.MM.YYYY').value }}
              </template>
            </Column>
          </DataTable>
        </template>
      </DataTable>
    </section>
  </div>
</template>
