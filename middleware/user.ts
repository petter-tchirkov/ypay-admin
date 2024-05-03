const { isMobileSidebarShown } = storeToRefs(useGlobalStore())
export default defineNuxtRouteMiddleware(() => {
  isMobileSidebarShown.value = false
  useAuthStore().getCurrentUser()
})
