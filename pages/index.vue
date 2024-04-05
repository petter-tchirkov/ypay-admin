<script setup lang="ts">
import type { Chain } from '~/types/chain'
definePageMeta({
  middleware: 'user'
})

const url = useRuntimeConfig().public.baseUrl
const { user, token } = storeToRefs(useAuthStore())
const isAddChainDialogShown = ref(false)
const chains = ref<Chain[]>([])
const newChain = ref('')
const selectedChain = ref<Chain | null>(null)
const rowToEdit = ref<Chain | null>(null)

const fetchChains = async () => {
  await $fetch(`${url}/Chains`, {
    headers: { Authorization: `Bearer ${token.value}` },
    onResponse({ response }) {
      if (response.status === 200) {
        chains.value = response._data
      }
    }
  })
}

const addChain = async () => {
  await $fetch(`${url}/Chains`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token.value}` },
    body: { name: newChain.value, userId: user.id },
    async onResponse({ response }) {
      if (response.status === 201) {
        newChain.value = ''
        isAddChainDialogShown.value = false
        await fetchChains()
      }
    }
  })
}

const updateChain = async (chain: Chain) => {
  await $fetch(`${url}/Chains/${chain.id}`, {
    method: 'PUT',
    headers: { Authorization: `Bearer ${token.value}` },
    params: { id: chain.userId },
    body: { name: chain.name, userId: chain.userId },
    async onResponse({ response }) {
      if (response.status === 204) {
        await fetchChains()
      }
    }
  })
}


await fetchChains()
</script>

<template>
  <div>
    <Header />
    <section class="p-4">
      <DataTable v-if="chains.length" paginator :rows="5" :rowsPerPageOptions="[5, 10, 20, 50]" :value="chains"
        v-model:selection="selectedChain" v-model:editing-rows="rowToEdit" selection-mode="single" edit-mode="row"
        @row-edit-save="updateChain($event.newData)">
        <template #header>
          <Button label="Add Chain" @click="isAddChainDialogShown = true" />
        </template>
        <Column field="id" header="ID" />
        <Column field="name" header="Chain Name">
          <template #body="{ data }">
            <NuxtLink :to="`/chain-${data.id}`" class="text-green hover:font-bold transition">{{ data.name }}</NuxtLink>
          </template>
          <template #editor="{ data, field }">
            <InputText v-model="data[field]" />
          </template>
        </Column>
        <Column field="spots" header="Spots" />
        <Column header="Created At" field="createdAt">
          <template #body="{ data }">
            {{ useDateFormat(data.createdAt, 'DD.MM.YYYY').value }}
          </template>
        </Column>
        <Column :rowEditor="true" style="width: 10%; min-width: 8rem" bodyStyle="text-align:center"></Column>
      </DataTable>
      <h1 v-else class="text-center text-green font-medium text-3xl">No chains found</h1>
      <Dialog v-model:visible="isAddChainDialogShown" modal header="New Chain" class="w-96">
        <div class="flex flex-col gap-3">
          <InputText v-model="newChain" label="Chain Name" class="w-full" placeholder="Chain Name" />
          <Button label="Add" @click="addChain" />
        </div>
      </Dialog>
    </section>
  </div>
</template>
