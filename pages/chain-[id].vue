<script setup lang="ts">
import type { ChainData } from '~/types/chain'
const url = useRuntimeConfig().public.baseUrl
import type { DataTableEditingRows } from 'primevue/datatable'
const { token } = storeToRefs(useAuthStore())

definePageMeta({
	middleware: 'user',
	layout: 'default',
})

const isAddSpotDialogShown = ref(false)
const chainData = ref<ChainData | Record<string, never>>({})
const rowToEdit = ref<DataTableEditingRows>()
const toast = useToast()

const fetchChainData = async () => {
	await $fetch<ChainData>(`${url}/Chains/${useRoute().params.id}`, {
		headers: { Authorization: `Bearer ${token.value}` },
		onResponse({ response }) {
			isAddSpotDialogShown.value = false
			chainData.value = response._data
		},
	})
}

const updateSpot = async (spot: {
	id: number
	chainId: number
	name: string
	description: string
	address: string
	spotPosId: number | null
}) => {
	await $fetch(`${url}/Spots/${spot.id}`, {
		method: 'PUT',
		headers: { Authorization: `Bearer ${token.value}` },
		body: {
			id: spot.id,
			chainId: spot.chainId,
			name: spot.name,
			description: spot.description,
			address: spot.address,
			spotPosId: spot.spotPosId,
		},
		async onResponse({ response }) {
			toast.add({ summary: 'Spot updated', severity: 'success', life: 3000 })
			await fetchChainData()
		},
	})
}

await fetchChainData()
</script>
<template>
	<div class="flex flex-col">
		<section class="p-4 grow">
			<div class="mb-4">
				<h1 class="text-3xl text-green font-bold mb-4">
					{{ chainData?.name }}
				</h1>
				<DataTable
					:value="chainData?.spots"
					striped-rows
					v-model:editing-rows="rowToEdit"
					edit-mode="row"
					@row-edit-save="updateSpot($event.newData)"
					class="rounded-xl shadow-md p-4 bg-white p-datatable-sm"
				>
					<template #header>
						<Button
							:label="$t('global.add')"
							icon="pi pi-plus"
							outlined
							rounded
							@click="isAddSpotDialogShown = true"
						/>
					</template>
					<Column field="id" header="ID" />
					<Column field="name" :header="$t('global.name')">
						<template #editor="{ data, field }">
							<InputText v-model="data[field]" /> </template
					></Column>
					<Column field="address" :header="$t('global.address')"
						><template #editor="{ data, field }">
							<InputText v-model="data[field]" /> </template
					></Column>
					<Column field="description" :header="$t('global.description')"
						><template #editor="{ data, field }">
							<InputText v-model="data[field]" /> </template
					></Column>
					<Column field="createdAt" :header="$t('global.created')">
						<template #body="{ data }">
							<span>{{
								useDateFormat(data.createdAt, 'DD.MM.YYYY').value
							}}</span>
						</template>
					</Column>
					<Column
						:rowEditor="true"
						style="width: 10%; min-width: 8rem"
						bodyStyle="text-align:center"
					></Column>
				</DataTable>
			</div>
			<Dialog
				v-model:visible="isAddSpotDialogShown"
				modal
				:header="$t('spot.create')"
			>
				<AddSpotForm @create="fetchChainData" />
			</Dialog>
		</section>
	</div>
</template>
