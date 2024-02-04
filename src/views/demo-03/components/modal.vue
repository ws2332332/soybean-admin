<script setup lang="ts">
const props = defineProps<{
  isShow: boolean;
  text: string;
  // 自定义修饰符
  textModifiers?: {
    isMaxLength: boolean;
  };
}>();

const emit = defineEmits(['update:isShow', 'update:text']);
const close = () => {
  emit('update:isShow', false);
};

const valueChange = (value: string) => {
  console.log(value, 'value');
  emit('update:text', props?.textModifiers?.isMaxLength ? `${value}到达最大长度了` : value);
};

const valueChange2 = (e: Event) => {
  const target = e.target as HTMLInputElement;
  emit('update:text', target.value);
};

defineOptions({
  name: 'TestModal'
});
</script>

<template>
  <div v-if="props.isShow" class="wraps">
    <div class="modal-content">
      <div class="modal-title">
        <span>我是v-model的子组件 dialog</span>
        <NButton type="primary" @click="close">关闭</NButton>
      </div>
      <div class="modal-body mb-[16px]">
        {{ props.isShow }}
      </div>
      <NInput class="modal-body mb-[16px]" :value="props.text" @input="valueChange">
        {{ props.isShow }}
      </NInput>
      <input :value="props.text" @input="valueChange2" />
    </div>
  </div>
</template>

<style scoped lang="scss">
.wraps {
  position: absolute;
  left: 0;
  top: 0;
  display: flex;
  width: 100vw;
  height: 100vh;
  background-color: #00000050;
  z-index: 999;

  .modal-content {
    width: 600px;
    height: 320px;
    margin: 200px auto;
    padding: 0 20px;
    border-radius: 1rem;
    background-color: #fff;

    .modal-title {
      display: flex;
      justify-content: space-between;
      align-items: center;
      height: 60px;
      font-size: 18px;
      font-weight: 600;
    }

    .modal-body {
      border-top: 1px solid #dedede;
    }
  }
}
</style>
