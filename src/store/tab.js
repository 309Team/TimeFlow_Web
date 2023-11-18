export default {
    state: {
        isCollapse: false,//导航栏是否折叠
        headName: "",
    },
    mutations: {
        CollapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
        SetheadName(state, payload) {
            state.headName = payload
        }
    }
}
