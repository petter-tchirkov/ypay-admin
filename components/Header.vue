<script setup lang="ts">
const { user, getUserNameFirstLetter } = storeToRefs(useAuthStore())

const links = ref([
  { label: 'FAQ', path: '/' },
  { label: 'Terms of Service', path: '/' },
  { label: 'Privacy Policy', path: '/' }
])

</script>

<template>
  <header class="bg-green text-white pr-4 lg:pr-10 py-2 flex items-center justify-between w-full">
    <div class="flex items-center">
      <div class="flex justify-start flex-col">
        <h1 class="text-2xl">{{ user?.name }}</h1>
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
/* .router-link-active {
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
*/
</style>
