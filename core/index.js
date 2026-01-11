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
        mountEvent(el, key, value)
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

function mountEvent(el, key, callbackFn) {
  const invokers = el.__$svei || (el.__$svei = {})
  const eventName = key.slice(2).toLowerCase();

  let invoker = invokers[key]

  if (callbackFn) {
    if (invoker) {
      invoker.callback = callbackFn
    } else {
      invoker = el.__$svei[key] = (e) => {
        invoker.callback(e)
      }
      invoker.callback = callbackFn
      el.addEventListener(eventName, invoker)
    }

  } else if (invoker) {
    el.removeEventListener(eventName, invoker)
    invokers[key] = undefined
  }
}


// 增删改
function patch(oldVNode, newVNode, container) {
  newVNode.el = oldVNode.el
  if (oldVNode.type !== newVNode.type) {
    mount(newVNode, container, { replace: true });
  } else {

    // 都是数组
    if (Array.isArray(oldVNode.children) && Array.isArray(newVNode.children)) {
      
      // old 比 new 多，删除多余的dom
      if (oldVNode.children.length > newVNode.children.length) {
        const startIndex = oldVNode.children.length - newVNode.children.length
        for (let i = startIndex; i < newVNode.el.children.length; i++) {
          oldVNode.el.removeChild(oldVNode.el.children[i])
        }
      }
      newVNode.children.forEach((_, index) => {
        if (oldVNode.children[index]) {
          patch(oldVNode.children[index], newVNode.children[index], oldVNode.el)
        } else {
          // new 比 old 多，新增dom
          mount(newVNode.children[index], oldVNode.el)
        }
      })

    } else {
      // 只有这里更新 props
      patchProps(oldVNode, newVNode)

      // 更新children(array -> string, string -> array, string -> string)
      patchChildren(oldVNode, newVNode)
   }
  }
}

function patchProps(oldVNode, newVNode) {
  if (oldVNode.props === null && newVNode.props === null) return;

  const remove = (el, key) => {
    if (key.startsWith("on")) {
      mountEvent(el, key, null)
    } else {
      el.removeAttribute(key)
    }
  }

  const add = (el, key, value) => {
    if (key.startsWith("on") && typeof value === "function") {
      mountEvent(el, key, value)
    } else {
      el.setAttribute(key, value);
    }
  }

  if (oldVNode.props && newVNode.props === null) {
    for (const key in oldVNode.props) {
      remove(oldVNode.el, key)
    }
  }
  else if (oldVNode.props === null && newVNode.props) {
    for (const key in newVNode.props) {
      const value = newVNode.props[key];
      add(oldVNode.el, key, value)
    }
  }
  else {

    for (const key in oldVNode.props) {
      if (!newVNode.props[key]) remove(oldVNode.el, key, null)
    }

    for (const key in newVNode.props) {
      const el = oldVNode.el;
      const value = newVNode.props[key]
      if (!oldVNode[key] || oldVNode.props[key] !== newVNode.props[key]) add(el, key, value);
    }
  }

}

function patchChildren(oldVNode, newVNode) {
  if (oldVNode.children === newVNode.children) return;
  
  // old为数组，new不为
  if (Array.isArray(oldVNode.children)) {        
    for (let i = 0; i < oldVNode.el.children.length; i++) {
      oldVNode.el.removeChild(oldVNode.el.children[i])
    }
    oldVNode.el.textContent = `${newVNode.children}`
  } 
  
  // new为数组，old不为
  else if (Array.isArray(newVNode.children)) {
    if (oldVNode.el.textContent) {
      oldVNode.el.textContent = ''
    }
    for (let i = 0; i < newVNode.children.length; i++) {
      mount(newVNode.children[i], oldVNode.el)
    }
  } 
  
  // 都是文本，直接替换
  else {
    oldVNode.el.textContent = `${newVNode.children}` 
  }

}

function compilerSFC(sfc) {
  return sfc;
}

function update() {
  if (global.$instance === null || global.$routerView === null) return;
  callHook(global.$instance, 'beforeUpdate')

  const component = global.$instance.render();
  patch(global.$oldComponentVNode, component, global.$routerView)

  global.$oldComponentVNode = component
  callHook(global.$instance, 'updated')
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