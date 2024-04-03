import { useAuthStore } from '~/stores/auth'

export default defineNuxtRouteMiddleware(async () => {
  await useAuthStore().currentUser()
})
