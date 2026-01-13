function watchComponent() {
  return {
    data() {
      return {
        count: 0,
      };
    },
    watch: {
      count(newV) {
        console.log("watch: count ->", newV);
      },
    },
    render() {
      return h("div", null, [
        h(
          "button",
          {
            onclick: () => {
              this.count++;
            },
          },
          "add"
        ),

        h('p', null, 'Tips: 请查看控制台~ 详看 watch log')
      ]);
    },
  };
}
