<template>
    <div class="bg-gray-100">
        <Header />
        <section class="p-4">
            <Dropdown :options="spots as Spot[]" option-label="name" placeholder="Select Trade Point"
                class="mb-4 w-full lg:w-fit" @update:modelValue="selectSpot($event)">
            </Dropdown>
            <h1 v-if="selectedSpot" class="text-center text-4xl text-green font-semibold mb-4">{{ selectedSpot.name }}
            </h1>
            <div v-if="selectedSpot" class=" bg-white rounded-xl shadow-md">
                <div class="flex flex-col md:flex-row md:justify-between p-4">
                    <h2 class="text-green text-2xl font-semibold text-center md:text-left">Orders</h2>
                    <InputText :placeholder="$t('global.filter')" />
                </div>
                <div class="flex flex-col lg:flex-row">
                    <SumByDateChart :id="selectedSpot.id" class="w-full lg:w-2/3" />
                    <CountStatusesChart :id="selectedSpot.id" class="w-fit" />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
import type { Spot } from '~/types/spot'
const url = useRuntimeConfig().public.baseUrl
const { token } = storeToRefs(useAuthStore())

const { data: spots } = await useFetch<Spot[]>(`${url}/Spots`, {
    headers: { 'Authorization': `Bearer ${token.value}` },
})

definePageMeta({
    middleware: 'user',
    layout: 'default'
})

const selectedSpot = ref<Spot | null>(null)

const selectSpot = (spot: Spot) => {
    selectedSpot.value = null
    setTimeout(() => {
        selectedSpot.value = spot
    }, 500);
}

definePageMeta({
    middleware: 'user',
    layout: 'default'
})

</script>

<style scoped></style>
