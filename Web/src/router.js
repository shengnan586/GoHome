import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"
import Order from "./components/order/Order.vue"
import Laydate from "./components/laydate.vue"
Vue.use(Router)
export default new Router({
  routes: [
    {path:'/',component:HelloContainer},
    {path:'/order',component:Order},
    {path:'/laydate',component:Laydate}
  ]
})
