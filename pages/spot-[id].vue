<script setup lang="ts">
import type { Column } from '#build/components';

const { spotData, spotOrders } = storeToRefs(useSpotStore())
const { fetchSpotData, fetchSpotOrders, updateSpot } = useSpotStore()
const route = useRoute()
const expandedRows = ref()

await fetchSpotData(+route.params.id)
await fetchSpotOrders(+route.params.id)
</script>

<template>
  <div>
    <Header />
    <Toast />
    <section class="p-4">
      <div class="flex gap-3 items-center mb-4">
        <Icon name="ic:baseline-restaurant" />
        <h1>Spot №{{ $route.params.id }}</h1>
      </div>
      <div class="flex">
        <div class="flex flex-col gap-3 mb-3 w-md">
          <div class="flex flex-col">
            <span>Name</span>
            <InputText v-model="spotData.name" />
          </div>
          <div class="flex flex-col">
            <span>Description</span>
            <Textarea v-model="spotData.description" />
          </div>
          <div class="flex flex-col">
            <span>Address</span>
            <InputText v-model="spotData.address" />
          </div>
          <div class="flex flex-col">
            <span>Spot POS ID</span>
            <InputNumber v-model="spotData.spotPosId" :use-grouping="false" placeholder="Spot POS ID" />
          </div>
          <Button label="Update Spot"
            @click="updateSpot(+$route.params.id, spotData.chainId, spotData.name, spotData.description, spotData.address, spotData.spotPosId)" />
        </div>
        <SumByDateChart class="grow" />
        <CountStatusesChart />
      </div>
      <DataTable :value="spotOrders" v-model:expandedRows="expandedRows">
        <Column expander style="width: 5rem" />
        <Column field="requestStatus" header="Request Status">
          <template #body="{ data }">
            {{ getRequestStatus(data.requestStatus) }}
          </template>
        </Column>
        <Column field="amount" header="Amount" />
        <Column field="total" header="Total" />
        <Column field="tips" header="Tips" />
        <Column field="tableId" header="Table ID" />
        <Column field="spotPosId" header="Spot POS ID" />
        <Column field="spotId" header="Spot ID" />
        <Column field="personsCount" header="Persons Count" />
        <Column field="createdAt" header="Creation Date">
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
            <Column field="productPosId" header="Product POS ID" />
            <Column field="productName" header="Product Name" />
            <Column field="price" header="Price" />
            <Column field="qty" header="Quantity" />
            <Column field="createdAt" header="Created At">
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
