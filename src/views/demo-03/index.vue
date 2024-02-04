<script setup lang="ts">
import TestModal from './components/modal.vue';
const isShow = ref<boolean>(false);
const text = ref<string>('默认值');
</script>

<template>
  <div class="wraps">
    <NButton type="primary" @click="isShow = !isShow">开关</NButton>
    <div class="pt-[20px]">isShow: {{ isShow }}</div>
    <div class="pt-[20px]">text: {{ text }}</div>
    <TestModal v-model:isShow="isShow" v-model:text.isMaxLength="text"></TestModal>
  </div>
</template>

<style scoped lang="scss"></style>
