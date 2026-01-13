
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

  if (component.watch) {
    for (const key in component.watch) {
      const item = component.watch[key];
      let fn = item;
      let options = {};
      if (item.handler) {
        fn = item.handler
        const { handler, ...rest } = item
        options = rest
      }

      new Watcher(() => instance.data[key], fn, options)
    }
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