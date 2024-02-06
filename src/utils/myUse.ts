import type { App } from 'vue';

interface Use {
  install(app: App, ...options: any[]): void;
}

const installSet = new Set();

export async function myUse<T extends Use>(app: App, plugin: T, ...options: any[]) {
  if (!installSet.has(plugin)) {
    plugin.install(app, ...options);
    installSet.add(plugin);
  }
}
