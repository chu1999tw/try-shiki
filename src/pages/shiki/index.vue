<script setup lang="ts">
import { Shiki, useHighlighter } from '~/composables/useShiki'
import vueSample from '~/sample/vue.sample?raw'

const code = ref(vueSample)

const jsCodeRaw = ref('const a = 1;')

const jsCode = computed(() => useHighlighter(jsCodeRaw.value, 'javascript').value)
</script>

<template>
  <div grid="~" gap="6">
    <!-- using composable -->
    <textarea v-model="jsCodeRaw" name="jsCodeRaw" p="6" rounded="lg" border="1px solid #aaaaaa70" />
    <span border="1px solid #aaaaaa70" rounded="lg" p="6" v-html="jsCode" />

    <!-- using component  -->
    <textarea v-model="code" name="script" p="6" rounded="lg" border="1px solid #aaaaaa70" />
    <Shiki lang="vue" :code="code" overflow="auto" />
  </div>
</template>

<route lang="yaml">
meta:
  layout:  default
</route>

<style>
textarea {
  scrollbar-color: #aaaaaa transparent;
}
</style>
