import Vue from 'vue'
import Router from 'vue-router'
import HelloContainer from "./components/HelloWorld.vue"
import index from "./components/index/index.vue"
import Order from "./components/order/Order.vue"
import productList from "./components/productlist/productList.vue"
import map from "./components/productlist/map.vue"
import prodetail from "./components/productlist/prodetail.vue"
import Info from "./components/publish/info.vue"

//登录的引入
import Login_go from "./components/Login_go.vue"
//注册引入
import Reg_go from "./components/Reg_go.vue"
import Publish from "./components/publish/Publish.vue"
import Facility from "./components/publish/Facility.vue"
import Describe from "./components/publish/Describe.vue"

import Photos from "./components/publish/photos.vue"
import Price from "./components/publish/price.vue"
import adminorderlist from "./components/adminorder/adminOrderlist.vue"
import adminpwdedit from "./components/adminorder/adminPwdedit.vue"
import adminmsg from "./components/adminorder/adminMsg.vue"
import adminsettlement from "./components/adminorder/adminSettlement.vue"
import adminfavorites from "./components/adminorder/adminFavorites.vue"
import adminbaseinfor from "./components/adminorder/adminBaseinfor.vue"
import adminorder from "./components/adminorder/adminorder.vue"
import Admin_go from "./components/adminorder/Admin_go.vue"
import Admin_to from "./components/adminorder/Admin_to.vue"
import detail from "./components/productlist/detail"
import Unpaid from "./components/order/unpaid.vue"

Vue.use(Router)
export default new Router({
  routes: [
    {path:'/',component:index},
    {path:'/index',component:index},
    {path:'/detail',component:detail},
    {path:'/order',component:Order},
    {path:'/price',component:Price},
    {path:'/photos',component:Photos},
    {path:'/productList',name: 'ProductList',component:productList},
    {path:'/prodetail',component:prodetail},
    {path:'/unpaid',component:Unpaid},

    
    
    // {path:'/search',component:search},


    {path:'/info',component:Info},
    {path:'/Publish',component:Publish},
    {path:'/Describe',component:Describe},
     //登录的路径
    {path:'/Login_go',component:Login_go},
     //注册的路径
    {path:'/Reg_go',component:Reg_go},
    {path:'/map',component:map},
    {path:'/facility',component:Facility},
    {path:'/Admin_go',component:Admin_go},
    {path:'/Admin_to',component:Admin_to},
	{path:'/adminpwdedit',component:adminpwdedit},
    {path:'/adminmsg',component:adminmsg},
    {path:'/adminsettlement',component:adminsettlement},
    {path:'/adminfavorites',component:adminfavorites},
    {path:'/adminbaseinfor',component:adminbaseinfor},
    
    // {path:'/adminorder',component:adminorder},

    {
      path: '/adminorder',
      component: adminorder,
      redirect: '/adminorder/list',
      children: [
        {
          path: 'list',
          name: 'list',
          component: adminorderlist
        },
        {
          path: 'settlement',
          name: 'settlement',
          component: adminsettlement
        },
        {
          path: 'msg',
          name: 'msg',
          component: adminmsg
        },
        {
          path: 'pwdedit',
          name: 'pwdedit',
          component: adminpwdedit
        },
        {
          path: 'favorites',
          name: 'favorites',
          component: adminfavorites
        },
        {
          path: 'baseinfor',
          name: 'baseinfor',
          component: adminbaseinfor
        },
        {/*邀请码*/
          path: 'Admin_go',
          name: 'Admin_go',
          component: Admin_go
        },
        {/*个人资料*/ 
          path: 'Admin_to',
          name: 'Admin_to',
          component: Admin_to
        }
        
      ]
    }
  ]
})
