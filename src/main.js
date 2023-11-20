import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入Element组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index'

// 引入腾讯ui组件
import TDesign from 'tdesign-vue';

// 引入组件库的少量全局样式变量
import 'tdesign-vue/es/style/index.css';


// 引入全局按钮配色
// import './assets/css/dialog-btn.css'
// import './assets/css/button.css'

Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(TDesign);


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
