export {};

type Filter = {
  format<T>(str: T): string;
};

declare module 'vue' {
  export interface ComponentCustomProperties {
    $filters: Filter;
    $env: string;
  }
}
