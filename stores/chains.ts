import type { ChainData, Chain } from '~/types/chain'
export const useChainsStore = defineStore('chains', () => {
    const { token } = storeToRefs(useAuthStore())
    const url = useRuntimeConfig().public.baseUrl
    const toast = useToast()
    const { t } = useI18n()

    const chains = ref<Chain[]>([])
    const chainData = ref<ChainData | Record<string, never>>({})

    const fetchChains = async () => {
        await $fetch(`${url}/Chains`, {
            headers: { Authorization: `Bearer ${token.value}` },
            onResponse({ response }) {
                if (response.status === 200) {
                    chains.value = response._data
                }
            }
        })
    }

    const removeChain = async (id: number) => {
        await $fetch(`${url}/Chains/${id}`, {
            method: 'DELETE',
            headers: { Authorization: `Bearer ${token.value}` },
            params: { id },
            async onResponse() {
                toast.add({ severity: 'success', detail: t('chain.removed'), life: 3000 })
                await fetchChains()
            }
        })
    }




    return { chains, fetchChains, removeChain, chainData }
})
