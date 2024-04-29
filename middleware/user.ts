export default defineNuxtRouteMiddleware(() => {
  useAuthStore().getCurrentUser()
})
