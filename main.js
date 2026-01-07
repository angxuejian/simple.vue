window.onload = () => {
  const app = createApp(
    h("main", null, [
      h("div", null, [
        h("div", null, [
          h("a", { href: "#/" }, "home"),
          h("span", { style: "margin: 0 5px" }),
          h("a", { href: "#/about" }, "about"),
        ]),
      ]),
      h("div", { class: "router-view" }),
    ])
  );

  const router = createRouter([
    { path: "/", component: () => homeComponent() },
    { path: "/about", component: () => aboutComponent() },
  ]);

  app.$use(router).$mount("#app");
};
