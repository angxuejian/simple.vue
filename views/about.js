function aboutComponent() {
  return {
    data() {
      return {
        count: 1,
        isShow: false,
        list: [{ name: '1'}, { name: '2'}]
      };
    },
    mounted() {
      console.log("挂载成功");
    },
    render() {
      // "about simple vue"
      return h("div", null, [
        // h("p", null, !this.isShow ? '1': [h('a', { href: 'www.baidu.com'}, 'baidu')]),
        h('p', { 'data-test': this.isShow ? '1': '2', ...( this.isShow ? { class: 'p'} : '' )}, this.count),
        h("ul", null, [
          ...this.list.map((_, index) => h("li", null, `v-for: ${_.name}`)),
        ]),
        h('button', !this.isShow ? { 'data-test': '123', class: '1', onclick: () => {
            console.log('test button')
        } }: null, 'test button'),
        h(
          "button",
          {
            onclick: () => {
            //   this.count++;
              this.isShow = !this.isShow;
            // this.list.push(this.list.length + 1)
            // this.list.splice(1, 1)
            // this.list[0].name = 456
            },
          },
          "add"
        ),
      ]);
    },
  };
}
