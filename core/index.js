function createApp(sfc) {
  const appSFC = sfc;
  const appVNode = compilerSFC(appSFC);

  let $routerInstance;

  return {
    $mount(key) {
      const container = document.querySelector(key);
      mount(appVNode, container);

      if ($routerInstance) {
        const routerView = appVNode.el.querySelector(".router-view");
        $routerInstance.$init(routerView, mount);
      }
      return this;
    },
    $use(routerInstance) {
      $routerInstance = routerInstance;
      return this;
    },
  };
}

function h(type, props, children) {
  return { type, props, children };
}

function mount(vnode, container, method) {
  const opt = Object.assign({ append: true, replace: false }, method);
  const el = document.createElement(vnode.type);

  if (vnode.props) {
    for (const key in vnode.props) {
      const value = vnode.props[key];

      if (key.startsWith("on") && typeof value === "function") {
        const eventName = key.slice(2).toLowerCase();
        el.addEventListener(eventName, value);
      } else {
        el.setAttribute(key, vnode.props[key]);
      }
    }
  }

  const types = ['string', 'boolean', 'number']
  if (types.includes(typeof vnode.children)) {
    el.textContent = `${vnode.children}`;
  } else if (Array.isArray(vnode.children)) {
    vnode.children.forEach((child) => mount(child, el));
  }

  vnode.el = el;
  if (opt.replace) container.replaceChildren(el);
  else if (opt.append) container.appendChild(el);
}

function patch() {}

function patchProps() {}

function patchChildren() {}

function compilerSFC(sfc) {
  return sfc;
}

function update() {
    if (global.$instance && global.$routerView) {
      callHook(global.$instance, 'beforeUpdate')
      const component = global.$instance.render();
      mount(component, global.$routerView, { replace: true});
      callHook(global.$instance, 'updated')

    }
}

function createComponentInstance(component) {
  let instance = {
    data: null,
    render: null,
    hooks: {},
  }

  const hookNames = [
    'beforeCreate', 'created',
    'beforeMount', 'mounted',
    'beforeUpdate', 'updated',
    'beforeUnmount', 'unmounted'
  ]

  hookNames.forEach(name => {
    if (typeof component[name] == 'function') {
      instance.hooks[name] = component[name]
    }
  })

  callHook(instance, 'beforeCreate')

  if (component.data) {
    instance.data = defineReaction(component.data())
    instance.data['$set'] = defineReactionSet
  }
  callHook(instance, 'created')
 
  instance.render = component.render.bind(instance.data)
  
  return instance
}

function callHook(instance, name) {
  if (instance.hooks[name]) {
    instance.hooks[name].call(instance.data)
  }
}