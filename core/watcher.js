

class Watcher {
    constructor(getter, callback, options = {}) {
        this.getter = getter;
        this.callback = callback;
        // this.lazy = options.lazy;
        
        this.value = this.get()

        if (options.immediate) {
            this.update()
        }
    }

    get() {
        Dep.target = this;
        const value = this.getter()
        Dep.target = null;

        return value
    }

    addDep(dep) {
        if (!dep.subs.has(this)) {
            dep.subs.add(this)
        }
    }

    cleanupDeps() {
        
    }

    update() {

        const oldVal = this.value;
        this.value = this.get();

        this?.callback(this.value, oldVal)
    }
}