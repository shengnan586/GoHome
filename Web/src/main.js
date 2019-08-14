import Vue from 'vue'
import App from './App.vue'
import router from './router'

Vue.config.productionTip = false
//5: 设置请求的根路径 
//Vue.http.options.root = "http://127.0.0.1/vue_ser/";
//6:全局设置post 时候表音的数据组织格式为 application/x-www-form-urlencoded
//Vue.http.options.emulateJSON = true;


new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
