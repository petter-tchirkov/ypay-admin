<script setup lang="ts">
import { onClickOutside } from '@vueuse/core';
const { logout } = useAuthStore()
const { fetchChains } = useChainsStore()
const { chains } = storeToRefs(useChainsStore())
const localePath = useLocalePath()
await fetchChains()

const isAnalyticsSidebarTogggled = ref(false)
const isChainsSidebarTogggled = ref(false)
const sidebar = ref<HTMLElement | null>(null)
onClickOutside(sidebar, () => {
    isAnalyticsSidebarTogggled.value = false
    isChainsSidebarTogggled.value = false
})
</script>

<template>
    <aside ref="sidebar" class="h-screen bg-green flex flex-col w-auto transition py-16">

        <div class=" text-white flex flex-col items-center group p-4 cursor-pointer"
            :class="{ 'bg-dark-green': isChainsSidebarTogggled }"
            @click="[isChainsSidebarTogggled = !isChainsSidebarTogggled, isAnalyticsSidebarTogggled = false]">
            <Icon name="heroicons:home-solid"
                class="size-8 text-white group-hover:text-[#63d5c8] transition duration-300" />
            <span class="text-xs">{{ $t('sidebar.chains') }}</span>
        </div>

        <SecondSidebar v-if="isChainsSidebarTogggled" class="absolute top-0 left-20 z-10 bg-dark-green py-20">
            <div class="flex flex-col mb-4 gap-2 max-h-48 overflow-auto">
                <NuxtLink :to="localePath('/')" class=" text-white flex items-center gap-2 group mb-4 text-nowrap">
                    {{ $t('sidebar.main') }}</NuxtLink>
                <NuxtLink v-for="chain in chains" :key="chain.id" :to="localePath(`/chain-${chain.id}`)"
                    class="text-nowrap text-white hover:text-[#63d5c8]">
                    {{ chain.name }}
                </NuxtLink>
            </div>
        </SecondSidebar>

        <NuxtLink :to="localePath('/spots')" class=" text-white flex flex-col items-center group  p-4">
            <Icon name="ion:restaurant" class="size-8 text-white group-hover:text-[#63d5c8] transition duration-300" />
            <span class="text-xs">{{ $t('sidebar.spots') }}</span>
        </NuxtLink>


        <div to="/analytics" class=" text-white flex flex-col items-center group p-4 cursor-pointer"
            :class="{ 'bg-dark-green': isAnalyticsSidebarTogggled }"
            @click="[isAnalyticsSidebarTogggled = !isAnalyticsSidebarTogggled, isChainsSidebarTogggled = false]">
            <Icon name="material-symbols:grouped-bar-chart-rounded"
                class="size-8 text-white group-hover:text-[#63d5c8] transition duration-300" />
            <span class="text-xs">{{ $t('sidebar.analytics') }}</span>
        </div>

        <SecondSidebar v-if="isAnalyticsSidebarTogggled" class="absolute top-0 left-20 z-10 bg-dark-green py-20">
            <NuxtLink to="/analytics" class=" text-white flex items-center gap-2 group mb-4 text-nowrap">
                <span class="group-hover:text-[#63d5c8] font-medium transition">{{ $t('sidebar.base') }}</span>
            </NuxtLink>

            <NuxtLink to="/analytics-tp" class=" text-white flex items-center gap-2 group mb-4 text-nowrap">
                <span class="group-hover:text-[#63d5c8] font-medium transition">{{ $t('sidebar.tp') }}</span>
            </NuxtLink>
        </SecondSidebar>

        <NuxtLink @click="logout" class=" text-white flex flex-col items-center group cursor-pointer p-4">
            <Icon name="ion:ios-exit" class="size-8 text-white group-hover:text-[#63d5c8] transition duration-300" />
            <span class="text-xs">{{ $t('auth.logout') }}</span>
        </NuxtLink>

    </aside>
</template>


<style scoped></style>
