<script setup lang="ts">
// defineEmits(['on-test', 'on-click'])

const emit = defineEmits<{
  (e: 'onTest', value: string): void;
  (e: 'onClick', value: number): void;
}>();

const sendNum = () => {
  emit('onClick', 100);
};

const sendStr = () => {
  emit('onTest', 'hhh');
};

defineOptions({
  name: 'ChildA'
});

defineExpose({
  default: 'null',
  open: () => {
    console.log(1);
  }
});
</script>

<template>
  <div class="wraps">
    <n-flex justify="space-between">
      <NButton type="primary" @click="sendNum">给父组件传num</NButton>
      <NButton type="primary" @click="sendStr">给父组件传str</NButton>
    </n-flex>
  </div>
</template>

<style scoped lang="scss">
.wraps {
  width: 260px;
}
</style>
