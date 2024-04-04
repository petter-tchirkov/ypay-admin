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
    const route = useRoute()
    const toast = useToast()

    const spotData = ref<SpotData | Record<string, never>>({})
    const spotOrders = ref([])

    const fetchSpotData = async (id: number) => {
        await $fetch(`${url}/Spots/${id}`, {
            headers: { Authorization: `Bearer ${useAuthStore().token}` },
            onResponse({ response }) {
                spotData.value = response._data
            }
        })
    }

    const fetchSpotOrders = async (id: number) => {
        await $fetch(`${url}/Spots/${id}/requests`, {
            headers: { Authorization: `Bearer ${useAuthStore().token}` },
            onResponse({ response }) {
                spotOrders.value = response._data
            }
        })
    }

    const updateSpot = async (id: number, chainId: number, name: string, description: string, address: string, spotPosId: number | null) => {
        await $fetch(`${url}/Spots/${id}`, {
            method: 'PUT',
            headers: { Authorization: `Bearer ${useAuthStore().token}` },
            body: { name, description, address, spotPosId, chainId },
            async onResponse({ response }) {
                toast.add({ summary: 'Spot updated', severity: 'success', life: 3000 })
                await fetchSpotData(id)
            }
        })
    }

    return { spotData, fetchSpotData, spotOrders, fetchSpotOrders, updateSpot }
})