function homeComponent() {
  return {
    data() {
      return {
        user: { name: "yuhua" },
        isShow: false,
        inputVal: "v-model: value",
        list: [1, 2, 3],
      };
    },
    beforeCreate() {
      console.log('beforeCreate')
    },
    created() {
      console.log('created', this)
    },
    beforeMount() {
      console.log('beforeMount')
    },
    mounted() {
      console.log('mounted')
    },
    beforeUpdate() {
      console.log('beforeUpdate')
    },
    updated() {
      console.log('updated')
    },
    beforeUnmount() {
      console.log('beforeUnmount')
    },
    unmounted() {
      console.log('unmounted')
    },
    render() {
      return h("div", null, [
        h("p", null, this.user.name),
        h(
          "button",
          {
            onclick: () => {
              // this.user.name += 1
              this.list.push(this.list.length + 1)
              // this.isShow = !this.isShow
              // this.$set(this.list, 0, 6)
            },
          },
          "add"
        ),
        h("div", null, [this.isShow ? h("p", null, "v-if: show") : ""]),
        h("ul", null, [
          ...this.list.map((_, index) => h("li", null, `v-for: ${_}`)),
        ]),
        h("input", {
          value: this.inputVal,
          oninput: (event) => {
            this.inputVal = event.target.value;
            console.log(inputVal);
          },
        }),
      ]);
    },
  };
}