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

const style = ref({
  color: 'blue',
  fontSize: '16px'
});

setInterval(() => {
  style.value.color = `rgb(${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)}, ${Math.floor(Math.random() * 255)})`;
  style.value.fontSize = `${Math.floor(Math.random() * 10 + 16)}px`;
}, 2000);

const css = useCssModule('myMoudle');
console.log(css, '====css');
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
      <NInput class="test" placeholder="测试样式穿透" />
      <div :class="[myMoudle.hhh]">css moudle {{ css }}</div>
      <div class="div1">动态css</div>
    </div>
  </div>
</template>

<style scoped lang="scss">
.test {
  :deep(.n-input__placeholder) {
    color: red;
  }
}

.div1 {
  color: v-bind('style.color');
  font-size: v-bind('style.fontSize');
}
</style>

<style module="myMoudle">
.hhh {
  color: green;
}
</style>
