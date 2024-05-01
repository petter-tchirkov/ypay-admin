<script setup lang="ts">
const { user } = storeToRefs(useAuthStore())
const { t } = useI18n()
const { isMobileSidebarShown } = storeToRefs(useGlobalStore())

const links = ref([
  { label: t('global.faq'), path: '/lorem' },
  { label: t('global.terms'), path: '/lorem' },
  { label: t('global.privacy'), path: '/lorem' }
])

const reloadPage = () => window.location.reload()
</script>

<template>
  <header class="bg-green text-white px-4 lg:pl-0 lg:pr-10 flex items-center justify-between w-full">
    <div class="flex items-center gap-3">
      <img src="/assets/images/logo.png" alt="Click to reload page" class="h-16 cursor-pointer" @click="reloadPage()">
      <div class="justify-start flex-col hidden lg:flex">
        <h1 class="text-2xl">{{ user?.name }}</h1>
        <span class="text-xs">{{ getUserRole(user.role) }}</span>
      </div>
    </div>
    <div class="flex gap-3">
      <ul class="gap-3 mb-1 hidden lg:flex">
        <li v-for="link in links" :key="link.label">
          <NuxtLink :to="link.path">{{ link.label }}</NuxtLink>
        </li>
      </ul>
      <LanguageSwitcher class="hidden lg:block" />
      <div @click="isMobileSidebarShown = !isMobileSidebarShown">
        <Icon name="ci:hamburger" class="w-10 h-10" />
      </div>
    </div>
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
