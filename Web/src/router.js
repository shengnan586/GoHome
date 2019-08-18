import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"
import index from "./components/index/index.vue"
import Order from "./components/order/Order.vue"
import productList from "./components/productlist/productList.vue"
import map from "./components/productlist/map.vue"
import search from "./components/productlist/search.vue"
import Info from "./components/publish/info.vue"
import Alert from "./components/Alert.vue"
//登录的引入
import Login_go from "./components/Login_go.vue"
//注册引入
import Reg_go from "./components/Reg_go.vue"
import Publish from "./components/publish/Publish.vue"
import Facility from "./components/publish/Facility.vue"

Vue.use(Router)
export default new Router({
  routes: [
    {path:'/index',component:index},
    {path:'/',component:HelloContainer},
    {path:'/order',component:Order},
    {path:'/productlist',component:productList},
    {path:'/search',component:search},
    {path:'/alert',component:Alert},
    {path:'/info',component:Info},
    {path:'/Publish',component:Publish},
     //登录的路径
    {path:'/Login_go',component:Login_go},
     //注册的路径
    {path:'/Reg_go',component:Reg_go},
    {path:'/map',component:map},
    {path:'/facility',component:Facility}
  ]
})
