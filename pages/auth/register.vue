<script setup lang="ts">
const { registerUser } = useAuthStore()
const localePath = useLocalePath()

const name = ref('')
const email = ref('')
const phone = ref<number | null>(null)
const password = ref('')


definePageMeta({
  layout: 'auth'
})
</script>

<template>
  <div class="flex justify-center items-center h-screen w-screen bg-gray-100 p-4 lg:p-0">
    <div class="w-96 p-4 rounded-xl shadow-md bg-white flex flex-col gap-4">
      <img src="/assets/images/logo2.png" alt="">
      <InputText v-model="name" :placeholder="$t('auth.name')" class="w-full" />
      <InputText v-model="email" :placeholder="$t('auth.email')" class="w-full" />
      <InputNumber v-model="phone" :placeholder="$t('auth.phone')" class="w-full" :use-grouping="false" />
      <Password v-model="password" :placeholder="$t('auth.password')" class="w-full" :feedback="false" />
      <NuxtLink :to="localePath('/auth/login')" class="text-green">{{ $t('auth.login') }}</NuxtLink>
      <Button class="w-full" :label="$t('auth.register')" @click="registerUser(name, email, phone!, password)" />
    </div>
  </div>
</template>
