function createRouter(router) {
  let $routerView;
  let $mount;

  const render = () => {
    const path = location.hash.slice(1) || "/";
    const loadRoute = matchRoute(path);

    if (!loadRoute) { throw new Error("Router: path not find"); }

    global.itemComponentRender = loadRoute.component()
    global.itemRouterView = $routerView
    const itemVNode = global.itemComponentRender()
    $mount(itemVNode, $routerView, { replace: true})
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
    $init(routerView, mount) {
      $routerView = routerView;
      $mount = mount
      window.addEventListener("hashchange", render);
      render();
    },
  };
}
