declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
//引入svg
declare module "*.svg" {
  const content: string;
  export default content;
}
