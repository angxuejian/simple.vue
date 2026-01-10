
function aboutComponent() {

    return {

        mounted() {
            console.log('挂载成功')
        },
        render() {
            return h("p", null, "about simple vue")
        }
    }
}