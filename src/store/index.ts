import type { App } from 'vue';
import { createPinia } from 'pinia';
import { localPinia, resetSetupStore } from './plugins';

/** Setup Vue store plugin pinia */
export function setupStore(app: App) {
  const store = createPinia();

  store.use(resetSetupStore);
  store.use(
    localPinia({
      enable: true,
      key: 'local'
    })
  );

  app.use(store);
}
