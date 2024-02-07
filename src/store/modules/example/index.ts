import { defineStore } from 'pinia';

export const useExampleStore = defineStore({
  id: 'example-store',
  state: () => ({
    count: 0
  }),
  getters: {
    doubleCount(state) {
      return state.count * 2;
    }
  },
  actions: {
    increment() {
      this.count += 1;
    },
    decrement() {
      this.count -= 1;
    }
  }
});
