# Watch

```text
homeComponent watch -> watch: { count: (newV, oldV) => {} }

    ↓

createComponentInstance -> for (const key in component.watch) / 检测到watch

    ↓

new Watcher ->  new Watcher(() => instance.data[key], component.watch[key])

    ↓

new Watcher constructor() { watcher.get() } ->  Dep.target = watcher

    │                                                          │ 
    │                                                          │ 
    │                                                          │ 
    │                                                          │ 
    │                                                          │ 
    │                                                          │ 
    │                                                          │ 
    ↓                                                          └───────────── → cleanupDeps 更新新依赖 Dep / 移除不再依赖的 dep

count.getter / Object.defineProperty get() -> dep.depend() / watcher.addDep()

    ↓

count 修改后

    ↓

count.setter / Object.defineProperty set() ->  dep.notify() / watcher.update()

    ↓

watcher.callback(newVal, oldVal) -> watch: { count: (newV, oldV) => {} }
```