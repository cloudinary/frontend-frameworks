/**
 * This files fixes "Cannot find module" errors for vue components.
 * It tells typescript to treat *.vue files as if they had this content.
 */

/* eslint-disable */
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<{}, {}, any>
  export default component
}
