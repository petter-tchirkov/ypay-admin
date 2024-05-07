<template>
    <main class="flex">
        <Sidebar />
        <div class="w-full h-screen overflow-auto">
            <Header />
            <HistoryTabs />
            <NuxtPage keepalive class="w-full h-screen overflow-auto bg-gray-100" />
        </div>

    </main>
</template>

<script setup lang="ts">
import Sidebar from '../components/Sidebar.vue';
</script>