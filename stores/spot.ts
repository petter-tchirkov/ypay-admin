import type { Spot } from '../types/spot'
type SpotData = {
	spotSettings: {
		spotId: number
		tablesCount: number
		terminalId: string
		employeeId: number
		id: number
		createdAt: Date
	}
	name: string
	description: string
	address: string
	chainId: number
	spotPosId: number | null
	qrCodes: any[]
	spots: any[] | null
	id: number
	createdAt: Date
}

export const useSpotStore = defineStore('spot', () => {
	const url = useRuntimeConfig().public.baseUrl
	const { token } = storeToRefs(useAuthStore())
	console.log(token)
	const toast = useToast()

	const spots = ref<Spot[]>([])
	const spotData = ref<SpotData | Record<string, never>>({})
	const spotOrders = ref([])

	const fetchSpots = async () => {
		await $fetch(`${url}/Spots`, {
			headers: { Authorization: `Bearer ${token.value}` },
			onResponse({ response }) {
				spots.value = response._data
			},
		})
	}

	const fetchSpotData = async (id: number) => {
		await $fetch(`${url}/Spots/${id}`, {
			headers: { Authorization: `Bearer ${token.value}` },
			onResponse({ response }) {
				spotData.value = response._data
			},
		})
	}

	const fetchSpotOrders = async (id: number) => {
		await $fetch(`${url}/Spots/${id}/requests`, {
			headers: { Authorization: `Bearer ${token.value}` },
			onResponse({ response }) {
				spotOrders.value = response._data
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
				await fetchSpotData(spot.id)
			},
		})
	}

	return {
		spotData,
		fetchSpotData,
		spotOrders,
		fetchSpotOrders,
		updateSpot,
		fetchSpots,
		spots,
	}
})
