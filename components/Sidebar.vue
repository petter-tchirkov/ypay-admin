<script setup lang="ts">
const { logout } = useAuthStore()
const { user, getUserNameFirstLetter } = storeToRefs(useAuthStore())
const { fetchChains } = useChainsStore()
const { chains } = storeToRefs(useChainsStore())
await fetchChains()
</script>

<template>
    <aside class="h-screen bg-green flex flex-col w-auto transition py-4 pl-4 pr-10">
        <img src="/assets/images/logo.png" alt="" class="h-12 mb-4">

        <NuxtLink to="/" class=" text-white flex items-center gap-2 group mb-4">
            <Icon name="material-symbols:home-rounded"
                class="size-8 text-white group-hover:text-[#63d5c8] transition duration-300" />
            <span class="group-hover:text-[#63d5c8] font-medium text-xl transition">Chains</span>
        </NuxtLink>
        <div class="pl-4 flex flex-col mb-4 gap-2 max-h-48 overflow-auto">
            <NuxtLink v-for="chain in chains" :key="chain.id" :to="`/chain-${chain.id}`"
                class="text-nowrap text-white hover:text-[#63d5c8]">
                {{ chain.name }}
            </NuxtLink>
        </div>

        <NuxtLink to="/spots" class=" text-white flex items-center gap-2 group mb-4">
            <Icon name="ic:baseline-restaurant"
                class="size-8 text-white group-hover:text-[#63d5c8] transition duration-300" />
            <span class="group-hover:text-[#63d5c8] font-medium text-xl transition">Spots</span>
        </NuxtLink>


        <div to="/analytics" class=" text-white flex items-center gap-2 group mb-4">
            <Icon name="material-symbols:grouped-bar-chart-rounded"
                class="size-8 text-white group-hover:text-[#63d5c8] transition duration-300" />
            <span class="group-hover:text-[#63d5c8] font-medium text-xl transition">Analytics</span>
        </div>

        <NuxtLink to="/analytics" class=" text-white flex items-center gap-2 group mb-4 text-nowrap pl-4">
            <span class="group-hover:text-[#63d5c8] font-medium transition">Base Analytics</span>
        </NuxtLink>

        <NuxtLink to="/analytics-tp" class=" text-white flex items-center gap-2 group mb-4 text-nowrap pl-4">
            <span class="group-hover:text-[#63d5c8] font-medium transition">TP Analytics</span>
        </NuxtLink>

        <NuxtLink @click="logout" class=" text-white flex items-center gap-2 group mb-4 cursor-pointer">
            <Icon name="bx:bxs-log-out" class="size-8 text-white group-hover:text-[#63d5c8] transition duration-300" />
            <span class="group-hover:text-[#63d5c8] font-medium text-xl transition">Logout</span>
        </NuxtLink>
    </aside>
</template>


<style scoped></style>