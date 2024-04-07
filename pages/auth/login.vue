<script setup lang="ts">
const { getAuthToken } = useAuthStore()
const email = ref('')
const password = ref('')

definePageMeta({
  layout: 'auth'
})
</script>

<template>
  <div class="flex justify-center items-center h-screen w-screen bg-gray-100">
    <Toast />
    <div class="w-96 p-4 rounded-xl shadow-md bg-white flex flex-col gap-4">
      <img src="/assets/images/logo2.png" alt="">
      <InputText v-model="email" placeholder="Email" class="w-full" />
      <Password v-model="password" placeholder="Password" class="w-full" :feedback="false" />
      <NuxtLink to="/auth/register" class="text-green">Register</NuxtLink>
      <Button class="w-full" label="Login" @click="getAuthToken(email, password)" />
    </div>
  </div>
</template>
