export {};

type Filter = {
  format<T>(str: T): string;
};

type MyLoading = {
  isShow: Ref<boolean>;
  show(): void;
  hide(): void;
};

declare module '@vue/runtime-core' {
  export interface ComponentCustomProperties {
    $filters: Filter;
    $env: string;
    $_loading: MyLoading;
  }
}
