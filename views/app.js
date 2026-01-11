function appComponent() {
  return {
    render() {
      return h("main", null, [
        h("div", null, [
          h("div", null, [
            h("a", { href: "#/" }, "home"),
            h("span", { style: "margin: 0 5px" }),
            h("a", { href: "#/about" }, "about"),
            h("span", { style: "margin: 0 5px" }),
            h("a", { href: "#/test" }, "test"),
          ]),
        ]),
        h("div", { class: "router-view" }),
      ]);
    },
  };
}
