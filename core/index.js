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

  if (typeof vnode.children === "string") {
    el.textContent = vnode.children;
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
    if (global.itemComponentRender && global.itemRouterView) {
        const itemComponentRender = global.itemComponentRender();
        mount(itemComponentRender, global.itemRouterView, { replace: true});
    }
}