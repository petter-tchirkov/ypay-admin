<template>
    <div class="bg-gray-100">
        <Header />
        <section class="p-4">
            <Dropdown :options="spots" option-label="name" placeholder="Select Trade Point" class="mb-4"
                @update:modelValue="selectSpot($event)">
            </Dropdown>
            <h1 class="text-center text-4xl text-green font-semibold mb-4">{{ selectedSpot.name }}</h1>
            <div v-if="isSpotSelected" class=" bg-white rounded-xl shadow-md">
                <h2 class="p-4 text-green text-2xl font-semibold">Orders</h2>
                <div class="flex">
                    <SumByDateChart :id="selectedSpot.id" />
                    <CountStatusesChart :id="selectedSpot.id" class="w-fit" />
                </div>
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">
const { fetchSpots } = useSpotStore()
const { spots } = storeToRefs(useSpotStore())

const isSpotSelected = ref(false)
const selectedSpot = ref(null)

const selectSpot = (spot: Spot) => {
    isSpotSelected.value = false
    selectedSpot.value = spot
    setTimeout(() => {
        isSpotSelected.value = true
    }, 500);
}

definePageMeta({
    middleware: 'user',
    layout: 'default'
})

await fetchSpots()
</script>

<style scoped></style>