function genUid() {
  return uid++;
}

function createComponentInstance(component) {
  let instance = {
    data: null,
    render: null,
    hooks: {},
  };

  const hookNames = [
    "beforeCreate",
    "created",
    "beforeMount",
    "mounted",
    "beforeUpdate",
    "updated",
    "beforeUnmount",
    "unmounted",
  ];

  hookNames.forEach((name) => {
    if (typeof component[name] == "function") {
      instance.hooks[name] = component[name];
    }
  });

  callHook(instance, "beforeCreate");

  const $key = `$instance${genUid()}`;

  if (component.data) {
    instance.data = defineReaction(component.data(), $key);
    instance.data["$set"] = (target, key, value) =>
      defineReactionSet(target, key, value, $key);
  }

  if (!instance.data) {
    instance.data = {};
  }
  instance.data[`$key`] = $key;

  if (component.methods) {
    Object.keys(component.methods).forEach((key) => {
      instance.data[key] = component.methods[key].bind(instance.data);
    });
  }

  if (component.watch) {
    for (const key in component.watch) {
      const item = component.watch[key];
      let fn = item;
      let options = {};
      if (item.handler) {
        fn = item.handler;
        const { handler, ...rest } = item;
        options = rest;
      }

      new Watcher(() => instance.data[key], fn, options);
    }
  }

  callHook(instance, "created");

  instance.render = component.render.bind(instance.data);
  return instance;
}

function callHook(instance, name) {
  if (instance.hooks[name]) {
    instance.hooks[name].call(instance.data);
  }
}

function renderComponent({ component, container, oldInstanceKey }) {
  if (global[oldInstanceKey])
    callHook(global[oldInstanceKey].$instance, "beforeUnmount");
  const c = compilerSFC(component.component());
  const componentInstance = createComponentInstance(c);
  callHook(componentInstance, "beforeMount");

  const oldItemVNode = global[oldInstanceKey]?.$oldVNode || null;
  const newItemVNode = componentInstance.render();
  replaceHandler(oldItemVNode, newItemVNode, container);

  if (global[oldInstanceKey]) {
    callHook(global[oldInstanceKey].$instance, "unmounted");
    global[oldInstanceKey] = null;
    delete global[oldInstanceKey];
  }

  callHook(componentInstance, "mounted");

  global[componentInstance.data.$key] = {
    $instance: componentInstance,
    $container: container,
    $oldVNode: newItemVNode,
  };

  return { vnode: newItemVNode, $key: componentInstance.data.$key };
}
