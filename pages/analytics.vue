<template>
    <div>
        <Header />
        <section class="p-4 h-full">
            <Breadcrumb :home="home" :model="items" class="mb-4" />
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

const { t } = useI18n()

const home = ref({
    icon: 'pi pi-home'
});
const items = ref([
    { label: t('sidebar.analytics') },
]);
</script>

<style scoped></style>
