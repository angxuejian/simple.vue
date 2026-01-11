window.onload = () => {
  const app = createApp(appComponent().render());

  const router = createRouter([
    { path: "/", component: () => homeComponent() },
    { path: "/about", component: () => aboutComponent() },
    { path: "/test", component: () => testComponent()}
  ]);

  app.$use(router).$mount("#app");
};
