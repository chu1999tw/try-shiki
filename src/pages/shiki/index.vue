<script setup lang="ts">
import { Shiki, useHighlighter } from '~/composables/useShiki'
import usingComponentSample from '~/sample/usingComponent.sample?raw'
import usingComposableSample from '~/sample/usingComposable.sample?raw'

const componentCodeRaw = ref(usingComponentSample)

const composableCodeRaw = ref(usingComposableSample)

const composableCode = computed(() => useHighlighter(composableCodeRaw.value, 'vue').value)
</script>

<template>
  <div grid="~" gap="6">
    <p>Using Composable:</p>
    <textarea v-model="composableCodeRaw" name="jsCodeRaw" p="6" rounded="lg" border="1px solid #aaaaaa70" />
    <span overflow="auto" border="1px solid #aaaaaa70" rounded="lg" p="6" v-html="composableCode" />

    <p>Using Component:</p>
    <textarea v-model="componentCodeRaw" name="script" p="6" rounded="lg" border="1px solid #aaaaaa70" />
    <Shiki lang="vue" :code="componentCodeRaw" overflow="auto" />
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
