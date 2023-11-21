import Vue from "vue";
import Vuex from 'vuex';
import tab from './tab';
import calendar from './calendar';

Vue.use(Vuex)

// 创建Vuex实例并导出
export default new Vuex.Store({
    modules:{
        tab,
        calendar // 日历组件使用
    }
})