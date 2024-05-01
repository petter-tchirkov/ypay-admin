<script setup lang="ts">
const localePath = useLocalePath()

const { getAuthToken } = useAuthStore()
const email = ref('')
const password = ref('')

definePageMeta({
  layout: 'auth'
})
</script>

<template>
  <div class="flex justify-center items-center h-screen w-screen bg-gray-100 p-4 lg:p-0">
    <Toast />
    <div class="lg:w-96 p-4 rounded-xl shadow-md bg-white flex flex-col gap-4">
      <img src="/assets/images/logo2.png" alt="">
      <InputText v-model="email" :placeholder="$t('auth.email')" class="w-full" />
      <Password v-model="password" :placeholder="$t('auth.password')" class="w-full" :feedback="false" />
      <NuxtLink :to="localePath('/auth/register')" class="text-green">{{ $t('auth.register') }}</NuxtLink>
      <Button class="w-full" :label="$t('auth.login')" @click="getAuthToken(email, password)" />
    </div>
  </div>
</template>
