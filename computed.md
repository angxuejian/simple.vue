# Computed

```text
homeComponent computed -> showname: { showname() => { return this.isShow ? 'yuhua' : 'xuejyang' } }

    ↓

createComponentInstance -> for (const key in component.computed) / 检测到computed

    ↓

new Watcher ->  const watch = new Watcher(component.computed[key].bind(instance.data), null, { lazy: true })

    ↓

Object.defineProperty -> Object.defineProperty(instance.data, key, { get() {
    if (watch.dirty) {
        watch.evaluate()
    }

    return watch.value;
} })

watch.dirty=true ->  watcher.get()  ->  Dep.target = watcher

    │                                                          │ 
    │                                                          │ 
    │                                                          │ 
    │                                                          │ 
    │                                                          │ 
    │                                                          │ 
    │                                                          │ 
    ↓                                                          └───────────── → cleanupDeps 更新新依赖 Dep / 移除不再依赖的 dep

isShow.getter / Object.defineProperty get() -> dep.depend() / watcher.addDep() = isShow 收集当前 watch

    ↓

count 修改后

    ↓

isShow.setter / Object.defineProperty set() ->  updateHandler / dep.notify() / watcher.update() = watch.dirty 再次等于 true

    ↓

render -> updateHandler / $instance.render() / diff算法 / 读取到 showname

    ↓

watch.dirty=true ->  watcher.get()  ->  Dep.target = watcher = 拿到最新的 isShow 数据 = { return this.isShow ? 'yuhua' : 'xuejyang' }

    ↓

showname = this.isShow ? 'yuhua' : 'xuejyang'
```