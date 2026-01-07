function homeComponent() {
  const data = defindReaction({
    user: {
      name: "yuhua",
    },
  });

  return function render() {
    return h("div", null, [
      h("p", null, data.user.name),
      h(
        "button",
        {
          onclick: () => {
            data.user.name += "1";
          },
        },
        "add"
      ),
    ]);
  };
}
