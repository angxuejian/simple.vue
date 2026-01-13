function appComponent() {
  const links = [
    { path: "#/", label: "home" },
    { path: "#/about", label: "about" },
    { path: "#/test", label: "test" },
    { path: "#/watch", label: "watch" },
  ];

  return {
    render() {
      return h("main", null, [
        h("div", null, [
          h(
            "div",
            null,
            links.reduce((arr, item, index) => {
              arr.push(h("a", { href: item.path }, item.label));
              if (index !== links.length - 1) {
                arr.push(h("span", { style: "margin: 0 5px" }));
              }
              return arr;
            }, [])
          ),
        ]),
        h("div", { class: "router-view" }),
      ]);
    },
  };
}
