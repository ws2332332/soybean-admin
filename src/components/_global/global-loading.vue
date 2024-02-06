<script setup lang="ts">
const isShow = ref<boolean>(false);
const show = () => {
  isShow.value = true;
};
const hide = () => {
  isShow.value = false;
};

// 导出的函数和状态可以在 vnode.component?.exposed 获取到
defineExpose({
  isShow,
  show,
  hide
});
</script>

<template>
  <div v-if="isShow" class="wraps">全局loading...</div>
</template>

<style scoped lang="scss">
.wraps {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  background: #000000aa;
  color: #fff;
  z-index: 9999;
}
</style>
