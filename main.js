window.onload = () => {
  const app = createApp(appComponent().render());

  const router = createRouter([
    { path: "/", component: () => homeComponent() },
    { path: "/about", component: () => aboutComponent() },
    { path: "/test", component: () => testComponent()},
    { path: "/watch", component: () => watchComponent()}
  ]);

  app.$use(router).$mount("#app");
};
