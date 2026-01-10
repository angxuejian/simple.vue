function homeComponent() {
  const data = defineReaction({
    user: {
      name: "yuhua",
    },
    isShow: false,
    inputVal: 'v-model: value'
  });

  const list = defineReaction([0])

  return function render() {
    return h("div", null, [
      h("p", null, data.user.name),
      h(
        "button",
        {
          onclick: () => {
            // list.push(list.length)
            // data.isShow = !data.isShow
            defineReactionSet(list, 0, list[0] += 1)
          },
        },
        "add"
      ),
      h('div', null, [
        (data.isShow ? h('p', null, 'v-if: show') : '')
      ]),
      h('ul', null, [
        ...(list.map((_, index) => h('li', null, `v-for: ${_}`)))
      ]),
      h('input', { value: data.inputVal, oninput: (event) => {
        data.inputVal = event.target.value
        console.log(inputVal)
      } })
    ]);
  };
}
