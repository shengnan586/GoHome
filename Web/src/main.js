import Vue from 'vue'
import Vuex from 'vuex';
import store from './store'
import VueBus from 'vue-bus';
import App from './App.vue'
import router from './router'
import echarts from 'echarts'


Vue.use(VueBus);
Vue.use(Vuex);

Vue.config.productionTip = false
//5: 设置请求的根路径 
//Vue.http.options.root = "http://127.0.0.1/vue_ser/";
//6:全局设置post 时候表音的数据组织格式为 application/x-www-form-urlencoded
//Vue.http.options.emulateJSON = true;

//引入axios模块
import Axios from 'axios';
import URL from './config';
Axios.defaults.baseURL = URL;
//"http://127.0.0.1:3003/"
Axios.defaults.withCredentials = true;
Vue.prototype.axios = Axios;
Vue.prototype.$echarts = echarts;

import homeheader from "./components/index/header.vue";
import homefooter from "./components/index/footer.vue";

Vue.component("homeheader", homeheader);
Vue.component("homefooter", homefooter);
// 路由变化跳转页面回到顶部
router.afterEach((to, from, next) => {
  window.scrollTo(0, 0);
})
new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
