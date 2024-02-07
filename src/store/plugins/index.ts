import type { PiniaPluginContext } from 'pinia';
import { cloneDeep } from 'lodash-es';
import { SetupStoreId } from '@/enum';

type Options = {
  /** 是否开启本地持久化 */
  enable: boolean;
  /** 本地持久化存储的key */
  key: string;
};

const defaultKey = 'pinia';

/**
 * The plugin reset the state of the store which is written by setup syntax
 *
 * @param context
 */
export function resetSetupStore(context: PiniaPluginContext) {
  const setupSyntaxIds = Object.values(SetupStoreId) as string[];

  if (setupSyntaxIds.includes(context.store.$id)) {
    const { $state } = context.store;

    const defaultStore = cloneDeep($state);

    context.store.$reset = () => {
      context.store.$patch(defaultStore);
    };
  }
}

// 本地持久化
const setStorage = (key: string, value: any) => {
  localStorage.setItem(key, JSON.stringify(value));
};

// 本地持久化获取pinia
const getStore = (key: string) => {
  const value = localStorage.getItem(key);
  return value ? JSON.parse(value) : null;
};

// 本地持久化pinia
export function localPinia(options: Options) {
  return (context: PiniaPluginContext) => {
    const { store } = context;
    const localData = getStore(`${options?.key ?? defaultKey}-${store.$id}`);
    store.$subscribe((mutation, state) => {
      setStorage(`${options?.key ?? defaultKey}-${store.$id}`, toRaw(state));
      console.log(mutation, state);
    });
    return {
      ...localData
    };
  };
}
