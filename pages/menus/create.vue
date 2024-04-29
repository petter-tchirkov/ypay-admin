<script setup lang="ts">
const { mockProducts } = storeToRefs(useProductStore())
const newMenu = ref({
    name: '',
    description: ''
})
</script>
<template>
    <div>
        <Header />
        <div class="p-4">
            <section class="p-4 shadow-md bg-white rounded-xl flex flex-col gap-3">
                <h3 class="text-xl font-bold text-green text-center">New menu</h3>
                <InputText v-model="newMenu.name" placeholder="Name" />
                <Textarea v-model="newMenu.description" placeholder="Description" />
            </section>
        </div>
    </div>
</template>
