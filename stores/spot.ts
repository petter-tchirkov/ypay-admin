import type { Spot, SpotData } from '~/types/spot'

export const useSpotStore = defineStore('spot', () => {
    const url = useRuntimeConfig().public.baseUrl
    const { token } = storeToRefs(useAuthStore())
    const toast = useToast()

    const spots = ref<Spot[]>([])
    const spotData = ref<SpotData | Record<string, never>>({})
    const spotOrders = ref([])

    const fetchSpotData = async (id: number) => {
        await $fetch(`${url}/Spots/${id}`, {
            headers: { Authorization: `Bearer ${token.value}` },
            onResponse({ response }) {
                spotData.value = response._data
            }
        })
    }

    const fetchSpotOrders = async (id: number) => {
        await $fetch(`${url}/Spots/${id}/requests`, {
            headers: { Authorization: `Bearer ${token.value}` },
            onResponse({ response }) {
                spotOrders.value = response._data
            }
        })
    }

    const updateSpot = async (id: number, chainId: number, name: string, description: string, address: string, spotPosId: number | null) => {
        await $fetch(`${url}/Spots/${id}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${token.value}` },
            body: { name, description, address, spotPosId, chainId },
            async onResponse({ response }) {
                toast.add({ summary: 'Spot updated', severity: 'success', life: 3000 })
                await fetchSpotData(id)
            }
        })
    }

    return { spotData, fetchSpotData, spotOrders, fetchSpotOrders, updateSpot, spots }
})
