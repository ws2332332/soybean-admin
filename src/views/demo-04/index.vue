<script setup lang="ts">
import type { Directive, DirectiveBinding } from 'vue';
type CardInfo = {
  title: string;
  userId: string;
};
const cardInfo = ref<CardInfo>({
  title: 'vue自定义指令',
  userId: 'xiaoman-zs'
});

const vLocalValue: Directive = {
  created(...args: any[]) {
    console.log('======created');
    console.log(args, 'args');
  },
  beforeMount() {
    console.log('======beforeMount');
  },
  mounted(_el: HTMLElement, dir: DirectiveBinding<CardInfo>) {
    console.log('======mounted');
    localStorage.setItem('pageInfo', JSON.stringify(dir.value));
    console.log(dir.value.title, 'title');
  },
  beforeUpdate() {
    console.log('======beforeUpdate');
  },
  updated() {
    console.log('======updatede');
  },
  beforeUnmount() {
    console.log('======beforeUnmount');
  },
  unmounted() {
    console.log('======unmounted');
  }
};

// 用户权限数据 userId:page:operation
const permission: string[] = [
  'xiaoman-zs:shop:creat',
  'xiaoman-zs:shop:edit'
  // 'xiaoman-zs:shop:delete',
];

const userId = JSON.parse(localStorage.getItem('pageInfo') ?? '{}')?.userId ?? '';
// 一个按钮级的权限控制
const vCanUse: Directive<HTMLElement, string> = (el, bingding) => {
  console.log(el, bingding);
  if (!permission.includes(`${userId}:${bingding?.value}`)) {
    el.style.display = 'none';
  }
};
</script>

<template>
  <div>
    <div class="wraps">
      <NCard v-local-value:localValue="cardInfo" title="自定义指令"></NCard>
    </div>
    <div class="mt-[20px]">
      <NButton v-can-use="'shop:creat'" type="primary">创建</NButton>
      <NButton v-can-use="'shop:edit'" type="default">编辑</NButton>
      <NButton v-can-use="'shop:delete'" type="error">删除</NButton>
    </div>
  </div>
</template>

<style scoped lang="scss"></style>
