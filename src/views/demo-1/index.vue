<script setup lang="ts">
import { markRaw, ref, shallowRef } from 'vue';
import A from './components/A.vue';
import B from './components/B.vue';
import C from './components/C.vue';

const comId = shallowRef(A);
const active = ref(0);

const data = [
  {
    name: 'A组件',
    com: markRaw(A)
  },
  {
    name: 'B组件',
    com: markRaw(B)
  },
  {
    name: 'C组件',
    com: markRaw(C)
  }
];

const handleChange = (index: number) => {
  comId.value = data[index].com;
  active.value = index;
};
</script>

<template>
  <div class="wraps">
    <div class="navs">
      <div
        v-for="(item, index) in data"
        :key="index"
        class="nav-item"
        :class="active === index ? 'active' : ''"
        @click="handleChange(index)"
      >
        <div>{{ item.name }}</div>
      </div>
    </div>
    <component :is="comId"></component>
  </div>
</template>

<style scoped lang="scss">
.wraps {
  .navs {
    display: flex;
    justify-content: center;
    width: 300px;
    border: 1px solid #dedede;

    .nav-item {
      flex: 1;
      padding: 8px 0;
      text-align: center;
      cursor: pointer;
    }

    .nav-item:not(:last-child) {
      border-right: 1px solid #dedede;
    }

    .active {
      background-color: pink;
    }
  }
}
</style>
