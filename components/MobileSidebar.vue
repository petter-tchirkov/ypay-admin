<script setup lang="ts">
import { onClickOutside } from '@vueuse/core'

const { isMobileSidebarShown } = storeToRefs(useGlobalStore())
const localePath = useLocalePath()
const { logout } = useAuthStore()
const reloadPage = () => window.location.reload()
const { user } = storeToRefs(useAuthStore())

const sidebar = ref(null)
onClickOutside(sidebar, () => isMobileSidebarShown.value = false)
</script>
<template>
  <aside ref="sidebar" class="transition-all fixed top-0 min-h-screen bg-green z-10"
    :class="isMobileSidebarShown ? 'left-0' : '-left-60'">
    <div class="px-4">
      <img src="/assets/images/logo.png" alt="Click to reload page" class="h-16 cursor-pointer" @click="reloadPage()">
      <h2 class="text-center text-white mb-10">{{ user?.name }} ({{ getUserRole(user.role) }})</h2>

      <NuxtLink :to="localePath('/')" class=" text-white flex gap-3 items-center group p-2 cursor-pointer">
        <Icon name="heroicons:home-solid"
          class="size-8 text-white group-hover:text-[#63d5c8] transition duration-300" />
        <span class="text-lg group-hover:text-[#63d5c8]">{{ $t('sidebar.chains') }}</span>
      </NuxtLink>

      <NuxtLink :to="localePath('/spots')" class=" text-white flex gap-3 items-center group p-2 cursor-pointer">
        <Icon name="ion:restaurant" class="size-8 text-white group-hover:text-[#63d5c8] transition duration-300" />
        <span class="text-lg">{{ $t('sidebar.spots') }}</span>
      </NuxtLink>

      <NuxtLink :to="localePath('/analytics')" class=" text-white flex items-center gap-3 group p-2 cursor-pointer">
        <Icon name="material-symbols:grouped-bar-chart-rounded"
          class="size-8 text-white group-hover:text-[#63d5c8] transition duration-300" />
        <span class="text-lb">{{ $t('sidebar.analytics') }}</span>
      </NuxtLink>

      <NuxtLink :to="localePath('/analytics-tp')" class=" text-white flex items-center gap-3 group p-2 cursor-pointer">
        <Icon name="material-symbols:grouped-bar-chart-rounded"
          class="size-8 text-white group-hover:text-[#63d5c8] transition duration-300" />
        <span class="text-lb">{{ $t('sidebar.tp') }}</span>
      </NuxtLink>

      <NuxtLink @click="logout" class=" text-white flex gap-3 items-center group cursor-pointer p-2">
        <Icon name="ion:ios-exit" class="size-8 text-white group-hover:text-[#63d5c8] transition duration-300" />
        <span class="text-lg">{{ $t('auth.logout') }}</span>
      </NuxtLink>


      <LanguageSwitcher class="mt-10" />
    </div>
  </aside>
</template>
