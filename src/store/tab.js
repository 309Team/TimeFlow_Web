export default {
    state: {
        isCollapse: false,//导航栏是否折叠

    },
    mutations: {
        CollapseMenu(state) {
            state.isCollapse = !state.isCollapse
        },
    }
}
