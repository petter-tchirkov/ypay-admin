import { defineStore } from "pinia";

export const useGlobalStore = defineStore('global', () => {

    const tabs = ref<{ path: string, title: string }[]>([])
    const activeTabIndex = ref<number | null>(null)

    return { tabs, activeTabIndex }
})
