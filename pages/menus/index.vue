<script setup lang="ts">
const url = useRuntimeConfig().public.baseUrl
const { token } = storeToRefs(useAuthStore())
const { mockMenu } = useMenuStore()

definePageMeta({
    middleware: 'user',
    layout: 'default'
})

const { data: menus, pending } = await useLazyFetch(`${url}/Menu`, {
    headers: { 'Authorization': `Bearer ${token.value}` }
})

const expandedRows = ref()
</script>
<template>
    <div>
        <Toast />
        <Header />
        <p v-if="pending">Loading...</p>
        <section v-else class="p-4">
            <DataTable :value="mockMenu" v-model:expanded-rows="expandedRows"
                class="p-datatable-sm p-4 rounded-xl shadow-md bg-white">
                <Column expander style="width: 5rem" />
                <Column field="name" :header="$t('global.name')">
                    <template #body="{ data }">
                        <NuxtLink :to="`/menus/menu-${data.id}`" class="text-green hover:underline">{{ data.name
                            }}
                        </NuxtLink>
                    </template>
                </Column>
                <Column field="description" :header="$t('global.description')" />
                <Column field="isAtive" :header="$t('global.active')">
                    <template #body="{ data }">
                        <InputSwitch v-model="data.isAtive" />
                    </template>
                </Column>
                <Column field="createdAt" :header="$t('global.created')">
                    <template #body="{ data }">
                        {{ useDateFormat(data.createdAt, 'DD.MM.YYYY').value }}
                    </template>
                </Column>
                <template #expansion="slotProps">
                    <DataTable :value="slotProps.data.menuProducts">
                        <Column field="image" header="Image">
                            <template #body="slotProps">
                                <img :src="slotProps.data.product.image" class="w-24 h-24 rounded-xl object-cover"
                                    alt="">
                            </template>
                        </Column>
                        <Column field="product.name" :header="$t('global.name')" />
                        <Column field="product.description" :header="$t('global.description')" />
                    </DataTable>
                </template>
            </DataTable>
        </section>
    </div>
</template>
