<script setup lang="ts">
// import loadingImg from '@/assets/imgs/loaddata.gif'
import type { Directive } from 'vue';
// global 懒加载 eager：静态加载
const imgList: Record<string, { default: string }> = import.meta.glob('@/assets/demo-05/*.*', { eager: true });
const urlArr: string[] = Object.values(imgList)?.map(item => item.default);
console.log(urlArr, 'list');

// 使用自定义指令做图片懒加载
const vLazy: Directive<HTMLImageElement, string> = async (el, bingding) => {
  const def = await import('../../assets/loaddata.gif');
  el.src = def.default;
  const observer = new IntersectionObserver(entry => {
    if (entry[0].intersectionRatio > 0) {
      setTimeout(() => {
        el.src = bingding.value;
      }, 1000);
      observer.unobserve(el);
    }
  });

  observer.observe(el);
};
</script>

<template>
  <div class="wraps">
    <NCard title="使用自定义指令实现图片懒加载">
      <img v-for="url in urlArr" :key="url" v-lazy="url" class="img-item m-[16px]" />
    </NCard>
  </div>
</template>

<style scoped lang="scss">
.wraps {
  .img-item {
    width: 512px;
    height: 512px;
    object-fit: cover;
  }
}
</style>
