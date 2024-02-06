import { createApp } from 'vue';
import './plugins/assets';
import { setupDayjs, setupIconifyOffline, setupLoading, setupNProgress } from './plugins';
import { setupStore } from './store';
import { setupRouter } from './router';
import { setupI18n } from './locales';
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

  setupStore(app);

  await setupRouter(app);

  setupI18n(app);

  app.mount('#app');
}

setupApp();
