function createRouter(router) {
  let $routerView;
  let $replaceVNode;

  const render = () => {
    const path = location.hash.slice(1) || "/";
    const loadRoute = matchRoute(path);
    if (!loadRoute) { throw new Error("Router: path not find"); }

    if (global.$instance) callHook(global.$instance, 'beforeUnmount');
    const componentInstance = createComponentInstance(loadRoute.component())
    callHook(componentInstance, 'beforeMount')

    const itemVNode = componentInstance.render()
    $replaceVNode(global.$oldComponentVNode, itemVNode, $routerView)

    if (global.$instance) {
      callHook(global.$instance, 'unmounted');
      global.$instance = null;
    };
    callHook(componentInstance, 'mounted')

    global.$instance = componentInstance
    global.$routerView = $routerView
    global.$oldComponentVNode = itemVNode
  };

  const matchRoute = (path) => {
    const loadRoute = router.filter((item) => {
      const r = item.path;
      const p = path;
      return r === p;
    });
    return loadRoute[0];
  };

  return {
    $init(routerView, rpHandler) {
      $routerView = routerView;
      $replaceVNode = rpHandler
      window.addEventListener("hashchange", render);
      render();
    },
  };
}
