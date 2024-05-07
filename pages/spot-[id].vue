<script setup lang="ts">
definePageMeta({
	middleware: 'user',
	layout: 'default',
})

const { spotData, spotOrders } = storeToRefs(useSpotStore())
const { fetchSpotData, fetchSpotOrders, updateSpot } = useSpotStore()
const route = useRoute()
const expandedRows = ref()

const generateQr = async () => {
	window.location.href = `https://api.yumaxpay.com/api/Spots/${route.params.id}/qr-codes`
}

await fetchSpotData(+route.params.id)
await fetchSpotOrders(+route.params.id)
</script>

<template>
	<div>
		<Toast />
		<section class="p-4">
			<h1 class="text-green text-3xl mb-4 font-bold">{{ spotData.name }}</h1>
			<div class="flex">
				<div class="flex flex-col gap-3 mb-3 w-1/3">
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
						<InputNumber
							v-model="spotData.spotPosId"
							:use-grouping="false"
							placeholder="POS ID"
						/>
					</div>
					<Button
						:label="$t('spot.updateSpot')"
						@click="
							updateSpot({
								id: +$route.params.id,
								chainId: spotData.chainId,
								name: spotData.name,
								description: spotData.description,
								address: spotData.address,
								spotPosId: spotData.spotPosId,
							})
						"
					/>
					<Button :label="$t('spot.generateQr')" @click="generateQr" />
				</div>
			</div>
			<DataTable :value="spotOrders" v-model:expandedRows="expandedRows">
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
