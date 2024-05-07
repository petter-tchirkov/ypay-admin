import { defineStore } from "pinia";
import { useRouter } from "vue-router";

export interface User {
  name: string;
  email: string;
  phone: string;
  dateOfBirth: null;
  role: number;
  id: number;
  createdAt: Date;
}

export const useAuthStore = defineStore('auth', () => {
  const url = useRuntimeConfig().public.baseUrl
  const router = useRouter()
  const toast = useToast()
  const localePath = useLocalePath()

  const token = useCookie<string>('access_token', {
    default: () => '',
    maxAge: 1800,
  })

  const user: Ref<User | Record<string, never>> = ref({})


  const getAuthToken = async (email: string, password: string) => {
    await $fetch(`${url}/Users/get-token`, {
      method: 'POST',
      body: { email, password },
      async onResponse({ response }) {
        switch (response.status) {
          case 200:
            token.value = response._data.token
            getCurrentUser()
            navigateTo(localePath('/'))
          case 401:
            toast.add({
              detail: 'Please check your email and password',
              severity: 'error',
              life: 3000
            })
        }
      }
    })
  }

  const registerUser = async (name: string, email: string, phone: string | number, password: string) => {
    phone = phone.toString()
    await $fetch(`${url}/Users`, {
      method: 'POST',
      body: { name, email, phone, password },
      onResponse() {
        router.push(localePath('/auth/login'))
      }
    })
  }

  const getCurrentUser = async () => {
    await useFetch(`${url}/Users/current`, {
      headers: {
        Authorization: `Bearer ${token.value}`
      },
      onResponse({ response }) {
        switch (response.status) {
          case 401:
            token.value = ''
            user.value = {}
            navigateTo(localePath('/auth/login'))
          case 200:
            user.value = response._data
        }
      }
    })
  }

  const logout = () => {
    token.value = ''
    user.value = {}
    router.push(localePath('/auth/login'))
  }




  return { getAuthToken, token, registerUser, user, logout, getCurrentUser }
})
