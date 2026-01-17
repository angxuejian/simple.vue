# Simple.vue
simple.vue is a minimal front-end framework built to help learn and understand the core principles of Vue.

## Feature Progress

| 功能点                      | 状态    | 说明                                    |
| ------------------------ | ----- | ------------------------------------- |
| Vue2 响应性（this.xx） | done | 基于 `Object.defineProperty` 实现 |
| Vue3 响应式（ref、reactive） | done | 基于 `Proxy` 实现 | 
| `h` 函数 | done | 创建 VNode |
| 虚拟 DOM（VNode）| done | 支持基本节点结构   |
| 初次渲染（mount）| done | 将 VNode 挂载到 DOM |
| 组件实例创建 | done | data / render / 生命周期 |
| Router | done | 基于 `URL hash（#）` 实现|
| 生命周期钩子 | done | `created / mounted / updated`  |
| Event/Attribute/input | done | `onClick / class` 等处理  |
| v-if/v-for/v-model| done | 使用 `JS` 语法完成 |
| Diff 算法  | done | `patch`完成；（未完成：`array key`、`多次数据更新只一次渲染`） |
| `watch`    | done | 支持`immediate`, 不支持`array` / `xx.xx.xx`  |
| `methods`  | done | ~  |
| `computed` | done | `lazy`, 不支持`array`  |

