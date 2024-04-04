<script setup lang="ts">

const url = useRuntimeConfig().public.baseUrl
const emit = defineEmits<{ (e: 'create') }>()
const route = useRoute().params.id

const name = ref('')
const description = ref('')
const address = ref('')

const createSpot = async () => {
  await $fetch(`${url}/Spots`, {
    method: 'POST',
    body: {
      name: name.value,
      description: description.value,
      address: address.value,
      chainId: route
    },
    onResponse({ response }) {
      emit('create')
      name.value = ''
      description.value = ''
      address.value = ''
    }
  })
}
</script>

<template>
  <form action="" class="flex flex-col gap-3">
    <InputText v-model="name" label="Name" placeholder="Name" />
    <InputText v-model="description" label="Description" placeholder="Description" />
    <InputText v-model="address" label="Address" placeholder="Address" />
    <Button label="Create Spot" @click="createSpot" />
  </form>
</template>
