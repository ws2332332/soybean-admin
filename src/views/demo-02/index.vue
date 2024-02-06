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

// 获取当前族简单的实例，实例上可以获取到全局所有的属性和方法
const app = getCurrentInstance();
console.log(app?.proxy?.$filters);

const toggleLoading = () => {
  console.log(app?.proxy?.$_loading.isShow.value, 'app?.proxy?.$_loading.isShow');
  if (app?.proxy?.$_loading.isShow?.value) {
    app?.proxy?.$_loading.hide();
  } else {
    app?.proxy?.$_loading.show();
  }
  // 3秒后自动关闭
  setTimeout(() => {
    app?.proxy?.$_loading.hide();
  }, 3000);
};

// ref使用
const testRef = ref<InstanceType<typeof ChildA>>();
</script>

<template>
  <div class="wraps">
    <ChildA ref="testRef" @on-click="getNum" @on-test="getStr" />
    <NCard title="card1" class="mt-20px">{{ val ?? testRef?.default }}</NCard>
    <NButton type="primary" class="mt-20px" @click="testRef?.open">调用子组件的方法</NButton>
    <NCard title="全局属性和方法的例子" class="mt-20px">
      <div>全局变量$env： {{ $env }}</div>
      <NButton type="primary" class="mt-20px" @click="toggleLoading">调用全局的Loading组件</NButton>
    </NCard>
  </div>
</template>

<style scoped lang="scss"></style>
