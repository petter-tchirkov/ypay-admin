<script setup lang="ts">

const url = useRuntimeConfig().public.baseUrl
const emit = defineEmits<{ (e: 'create'): void }>()
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
    onResponse() {
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
    <InputText v-model="name" :placeholder="$t('global.name')" />
    <InputText v-model="description" :placeholder="$t('global.description')" />
    <InputText v-model="address" :placeholder="$t('global.address')" />
    <Button :label="$t('spot.create')" @click="createSpot" />
  </form>
</template>
