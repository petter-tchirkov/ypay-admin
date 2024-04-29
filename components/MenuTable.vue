<script setup lang="ts">
const { mockMenu } = useMenuStore()
const expandedRows = ref()
</script>
<template>
  <section class="p-4">
    <h3 class="text-xl font-bold text-green text-center">{{ $t('menu.menu') }}</h3>
    <DataTable :value="mockMenu" v-model:expanded-rows="expandedRows" class="p-datatable-sm">
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
              <img :src="slotProps.data.product.image" class="w-24 h-24 rounded-xl object-cover" alt="">
            </template>
          </Column>
          <Column field="product.name" :header="$t('global.name')" />
          <Column field="product.description" :header="$t('global.description')" />
        </DataTable>
      </template>
    </DataTable>
  </section>
</template>
