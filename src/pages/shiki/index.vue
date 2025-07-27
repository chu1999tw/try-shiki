<script setup lang="ts">
import { Shiki } from '~/composables/useShiki'
import vueSample from '~/sample/vue.sample?raw'

const code = ref(vueSample)
</script>

<template>
  <div grid="~" gap="6">
    <textarea v-model="code" name="script" p="8" rounded="xl" border="1px solid #cccccc" />
    <Shiki lang="vue" :code="code" overflow="auto" />
  </div>
</template>

<route lang="yaml">
meta:
  layout:  default
</route>
