<script setup lang="ts">
const { locales, locale, setLocale, t } = useI18n()

const language = computed({
  get: () => locale.value,
  set: (val: string) => {
    setLocale(val)
  }
})

const getLanguageName = (languageCode: string) => {
  switch (languageCode) {
    case 'en':
      return t('lang.en')
    case 'ua':
      return t('lang.ua')
  }
}
</script>

<template>
  <Dropdown v-model="language" :options="locales" option-label="name" option-value="code">
    <template #value="{ value }">
      <div class="flex items-center gap-4">
        <Icon :name="`circle-flags:${value}`" />
        <span>{{ getLanguageName(value) }}</span>
      </div>
    </template>
    <template #option="{ option }">
      <div class="flex items-center gap-4">
        <Icon :name="`circle-flags:${option.code}`" />
        <span>{{ option.name }}</span>
      </div>
    </template>
  </Dropdown>
</template>
