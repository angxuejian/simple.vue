function testComponent() {
  return {
    data() {
      return {
        isSwitch: false,
        list: [{ name: "yuhua" }],
        isShow: false,
        isDiv: false,
      };
    },
    beforeCreate() {
      console.log("beforeCreate");
    },
    created() {
      console.log("created", this);
    },
    beforeMount() {
      console.log("beforeMount");
    },
    mounted() {
      console.log("mounted");
    },
    beforeUpdate() {
      console.log("beforeUpdate");
    },
    updated() {
      console.log("updated");
    },
    beforeUnmount() {
      console.log("beforeUnmount");
    },
    unmounted() {
      console.log("unmounted");
    },
    render() {
      return h("div", null, [
        h("div", null, [
          h(
            "button",
            {
              onclick: () => {
                this.isSwitch = !this.isSwitch;
              },
            },
            "switch string/array"
          ),
          h(
            "button",
            {
              onclick: () => {
                this.list.push({ name: `yuhua${this.list.length}` });
              },
            },
            "push list"
          ),
          h(
            "button",
            {
              onclick: () => {
                this.list.splice(this.list.length - 1, 1);
              },
            },
            "pop list"
          ),
          h(
            "button",
            {
              onclick: () => {
                this.list[0].name = "xuej";
              },
            },
            "update list[0].name"
          ),
          h(
            "button",
            {
              onclick: () => {
                this.isShow = !this.isShow;
              },
            },
            "switch show"
          ),
          h(
            "button",
            {
              onclick: () => {
                console.log("click once");
                this.isDiv = !this.isDiv;
              },
            },
            "switch isDiv"
          ),
        ]),
        h(
          "p",
          null,
          this.isSwitch
            ? [h("a", { href: "https://www.baidu.com" }, "link: baidu")]
            : "str: baidu"
        ),
        h("ul", null, [
          ...this.list.map((_, index) => h("li", null, `v-for: ${_.name}`)),
        ]),
        h(
          "p",
          {
            "data-test": this.isShow ? "1" : "2",
            ...(this.isShow ? { class: "p" } : {}),
          },
          "show: " + this.isShow
        ),
        this.isDiv ? h("div", null, "div") : h("p", null, "p"),

        h('p', null, 'Tips: Diff Test Checklist')
      ]);
    },
  };
}
