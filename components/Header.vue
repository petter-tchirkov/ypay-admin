<script setup lang="ts">
const { user } = storeToRefs(useAuthStore())

const links = ref([
  { label: 'Chains', path: '/' },
  { label: 'Spots', path: '/spots' },
  { label: 'Logout', path: '/auth/login' }
])

</script>

<template>
  <header class="bg-green text-white px-4 lg:px-10 p-4 flex items-center justify-between w-full">
    <div class="flex gap-4">
      <img src="/assets/images/logo.png" alt="" class="h-12">
      <div class="flex flex-col">
        <h1 class="text-2xl mt-1">{{ user?.name }}</h1>
        <span class="text-xs">{{ getUserRole(user.role) }}</span>
      </div>
    </div>
    <ul class="flex gap-3 mb-1">
      <li v-for="link in links" :key="link.label">
        <NuxtLink :to="link.path">{{ link.label }}</NuxtLink>
      </li>
    </ul>
  </header>
</template>

<style scoped>
.router-link-active {
  position: relative;
}

.router-link-active::after {
  content: '';
  position: absolute;
  bottom: -2px;
  left: 0;
  right: 0;
  height: 2px;
  background-color: #000;
  width: 80%;
}
</style>
