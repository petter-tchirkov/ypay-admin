<template>
    <div class="bg-gray-100">
        <Header />
        <section class="p-4">
            <Dropdown :options="spots" option-label="name" placeholder="Select Trade Point" class="mb-4"
                @update:modelValue="selectSpot($event)">
            </Dropdown>
            <h1 v-if="selectedSpot" class="text-center text-4xl text-green font-semibold mb-4">{{ selectedSpot.name }}
            </h1>
            <div v-if="selectedSpot" class=" bg-white rounded-xl shadow-md">
                <h2 class="p-4 text-green text-2xl font-semibold">Orders</h2>
                <div class="flex">
                    <SumByDateChart :id="selectedSpot.id" class="w-4/5" />
                    <CountStatusesChart :id="selectedSpot.id" class="w-fit" />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
const { fetchSpots } = useSpotStore()
const { spots } = storeToRefs(useSpotStore())

const selectedSpot = ref(null)

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

await fetchSpots()
</script>

<style scoped></style>