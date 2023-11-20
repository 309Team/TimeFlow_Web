import Vue from 'vue'
import App from './App.vue'
import router from './router'
//引入Element组件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import store from './store/index'

// 引入全局按钮配色
// import './assets/css/dialog-btn.css'
// import './assets/css/button.css'

Vue.config.productionTip = false
Vue.use(ElementUI);



new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
