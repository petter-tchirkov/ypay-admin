<script setup lang="ts">

const links = ref([
  { label: 'Chains', path: '/' },
  { label: 'Spots', path: '/spots' },
  { label: 'Logout', path: '/auth/login' }
])

</script>

<template>
  <header class="bg-green text-white px-4 lg:px-10 p-4 flex items-center justify-between w-full">
    <div class="flex items-center gap-4">
      <div class="bg-white rounded-full w-10 h-10"></div>
      <h1 class="text-2xl">My Restaurant</h1>
    </div>
    <ul class="flex gap-3">
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
