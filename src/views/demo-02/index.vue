<script setup lang="ts">
import { ref } from 'vue';
import ChildA from './components/child.vue';

const val = ref<string | number>();

const getNum = (num: number) => {
  val.value = num;
};

const getStr = (str: string) => {
  val.value = str;
};

// ref使用
const testRef = ref<InstanceType<typeof ChildA>>();
</script>

<template>
  <div class="wraps">
    <ChildA ref="testRef" @on-click="getNum" @on-test="getStr" />
    <NCard title="card1" class="mt-20px">{{ val ?? testRef?.default }}</NCard>
    <NButton type="primary" class="mt-20px" @click="testRef?.open">调用子组价的方法</NButton>
  </div>
</template>

<style scoped lang="scss"></style>
