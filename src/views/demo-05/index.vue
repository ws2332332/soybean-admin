<script setup lang="ts">
// import loadingImg from '@/assets/imgs/loaddata.gif'
import type { Directive } from 'vue';
import useResize from 'xllin-vue-resize';
// global 懒加载 eager：静态加载
const imgList: Record<string, { default: string }> = import.meta.glob('@/assets/demo-05/*.*', { eager: true });
const urlArr: string[] = Object.values(imgList)?.map(item => item.default);

// 使用自定义指令做图片懒加载
const vLazy: Directive<HTMLImageElement, string> = async (el, bingding) => {
  const def = await import('../../assets/loaddata.gif');
  el.src = def.default;
  const observer = new IntersectionObserver(entry => {
    console.log(entry[0], 'entry[0]');
    if (entry[0].intersectionRatio > 0) {
      setTimeout(() => {
        el.src = bingding.value;
      }, 1000);
      observer.unobserve(el);
    }
  });

  observer.observe(el);
};

onMounted(() => {
  const el = document.querySelector('#box') as HTMLElement;
  console.log(el, 'ellll');
  useResize(el, (size: any) => {
    console.log(size, 'size');
  });
});
</script>

<template>
  <div class="wraps">
    <NCard title="使用自定义指令实现图片懒加载">
      <img v-for="url in urlArr" :key="url" v-lazy="url" class="img-item m-[16px]" />
    </NCard>
    <div id="box">123</div>
  </div>
</template>

<style scoped lang="scss">
.wraps {
  .img-item {
    width: 512px;
    height: 512px;
    object-fit: cover;
  }

  #box {
    border: 1px solid;
    resize: both;
    overflow: hidden;
  }
}
</style>
