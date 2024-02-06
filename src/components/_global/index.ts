// 导出对象的话，需要实现里面的install方法
import type { App, VNode } from 'vue';
import { createVNode, render } from 'vue';
import GlobalLoading from './global-loading.vue';
export default {
  // 这里app实例是在main.ts中调用 app.use()时回传给install函数的
  install(app: App) {
    const Vnode: VNode = createVNode(GlobalLoading); // 将组件转为虚拟dom
    render(Vnode, document.body); // 将虚拟dom挂载到body上
    // 将组件的方法和状态放在全局的属性上
    app.config.globalProperties.$_loading = {
      isShow: Vnode.component?.exposed?.isShow,
      show: Vnode.component?.exposed?.show,
      hide: Vnode.component?.exposed?.hide
    };
    console.log(Vnode, '---vnode');
  }
};
