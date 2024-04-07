<script setup lang="ts">
const { registerUser } = useAuthStore()
const name = ref('')
const email = ref('')
const phone = ref<number | null>(null)
const password = ref('')


definePageMeta({
  layout: 'auth'
})
</script>

<template>
  <div class="flex justify-center items-center h-screen w-screen bg-gray-100">
    <div class="w-96 p-4 rounded-xl shadow-md bg-white flex flex-col gap-4">
      <InputText v-model="name" placeholder="Name" class="w-full" />
      <InputText v-model="email" placeholder="Email" class="w-full" />
      <InputNumber v-model="phone" placeholder="Phone" class="w-full" :use-grouping="false" />
      <Password v-model="password" placeholder="Password" class="w-full" :feedback="false" />
      <NuxtLink to="/auth/login" class="text-green">Login</NuxtLink>
      <Button class="w-full" label="Register" @click="registerUser(name, email, phone, password)" />
    </div>
  </div>
</template>
