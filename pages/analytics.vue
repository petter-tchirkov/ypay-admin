<template>
    <div>
        <Header />
        <section class="p-4 h-full">
            <div class="rounded-xl bg-white p-4 shadow-md h-1/2">
                <OrderBySpotsChart />
            </div>
        </section>
    </div>
</template>

<script setup lang="ts">

definePageMeta({
    middleware: 'user',
    layout: 'default'
})
</script>

<style scoped></style>