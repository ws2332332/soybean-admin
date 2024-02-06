import { createApp } from 'vue';
import './plugins/assets';
import GlobalLoading from '@/components/_global';
import { setupDayjs, setupIconifyOffline, setupLoading, setupNProgress } from './plugins';
import { setupStore } from './store';
import { setupRouter } from './router';
import { setupI18n } from './locales';
import { myUse } from './utils/myUse';
import App from './App.vue';

async function setupApp() {
  setupLoading();

  setupNProgress();

  setupIconifyOffline();

  setupDayjs();

  const app = createApp(App);

  app.config.globalProperties.$env = 'test';
  app.config.globalProperties.$filters = {
    format<T>(str: T) {
      return `hh-${str}`;
    }
  };

  // app.use(GlobalLoading)
  // 使用自定义的use
  myUse(app, GlobalLoading);

  setupStore(app);

  await setupRouter(app);

  setupI18n(app);

  app.mount('#app');
}

setupApp();
