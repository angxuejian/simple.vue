
function createApp(sfc) {
  const appSFC = sfc;
  const appVNode = compilerSFC(appSFC);

  let $routerInstance;

  return {
    $mount(key) {
      const container = document.querySelector(key);
      mountHandler(appVNode, container);

      if ($routerInstance) {
        const routerView = appVNode.el.querySelector(".router-view");
        $routerInstance.$init(routerView, replaceHandler);
      }
      return this;
    },
    $use(routerInstance) {
      $routerInstance = routerInstance;
      return this;
    },
  };
}