export const useGlobalStore = defineStore('global', () => {
  const isMobileSidebarShown = ref(false)

  return { isMobileSidebarShown }
})
