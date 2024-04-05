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


  const token = useCookie<string | null>('access_token', {
    default: () => null,
    watch: true,
    maxAge: 1800,
    sameSite: 'none',
    secure: true
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
            await router.push('/')
            break;
          case 401:
            toast.add({
              summary: 'Invalid credentials',
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
      onResponse({ response }) {
        router.push('/login')
      }
    })
  }

  const logout = () => {
    token.value = null
    user.value = {}
    router.push('/auth/login')
  }


  const currentUser = async () => {
    if (token.value) {
      await useFetch(`${url}/Users/current`, {
        headers: {
          Authorization: `Bearer ${token.value}`
        },
        onResponse({ response }) {
          switch (response.status) {
            case 401:
              logout()
              break
            default:
              user.value = response._data
          }
        }
      })
    } else {
      logout()
    }
  }




  return { getAuthToken, token, registerUser, currentUser, user, logout }
})
