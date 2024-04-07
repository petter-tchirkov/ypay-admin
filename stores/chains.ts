import type { Chain } from '~/types/chain'
export const useChainsStore = defineStore('chains', () => {
    const { token } = storeToRefs(useAuthStore())
    const url = useRuntimeConfig().public.baseUrl

    const chains = ref<Chain[]>([])

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




    return { chains, fetchChains }
})