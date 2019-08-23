<template>
  <div class="headerC" :class="{border:isIndex==0}">
    <!-- logo图标 -->
    <div class="logo">
      <a href="javascript:;" @click="GoRouter" data-router="index">
        <img src="../../assets/images/WechatIMG63.png" data-router="index"/>
        <span data-router="index" :class="{font:isIndex==0}"><span :class="{font:isIndex==0}" style="font-size:20px;">BUG民宿</span>  家的感觉</span>  
      </a>
    </div>
    <!-- 头部右侧导航 -->
    <div class="nav">
      <div>
        <a href="javascript:;" @click="GoRouter" data-router="index" :class="{'font-color':isIndex==0,font:isIndex==0,color:isIndex==0}">GoHome</a>
      </div>
      <div class="login">
        <div v-if="!UserName">
          <a href="javascript:;" @click="login" :class="{'font-color':isIndex==0,font:isIndex==0,color:isIndex==0}">登录</a>
          |
          <a href="javascript:;" @click="reg" :class="{'font-color':isIndex==0,font:isIndex==0,color:isIndex==0}">注册</a>
        </div> 
        <!-- 用户登录后下拉菜单 -->
        <div @mouseenter="Up" @mouseleave="Down" v-if="UserName">
          <a href="javascript:;" :class="{'font-color':isIndex==0,font:isIndex==0,color:isIndex==0}"><!--shengnan586-->{{UserName}}
            <span class="icon iconfont" :class="iconUpDown"></span>
          </a>
          <div @click="GoRouter" class="navlist" v-show="show">
            <ul v-show="isHoster=='1'">
              <li>
                  房东中心
              </li>

              <li><a href="javascript:;" data-router=“adminorder/list”>订单管理</a></li>
              <li><a href="javascript:;" data-router=“adminorder/settlement”>结算统计</a></li>
              <li><a href="javascript:;" data-router=adminorder/baseinfor>房源信息</a></li>
              <li><a href="javascript:;" data-router=“”>价格房态</a></li>
              <li><a href="javascript:;" data-router=“Admin_to”>个人资料</a></li>
              <li><a href="javascript:;" data-router=“adminorder/favorites”>我的收藏</a></li>
            </ul>
            <ul>
              <li>
                房客中心
              </li>
              <li><a href="javascript:;" data-router="adminorder/list">我的订单</a></li>
              <li><a href="javascript:;" data-router="Admin_to">个人资料</a></li>
              <li><a href="javascript:;" data-router=“adminorder/favorites”>我的收藏</a></li>
              <li><a href="javascript:;" data-router="adminorder/msg">通知</a></li>
            </ul>
            <div>
              <a href="javascript:;" data-router="close">退出</a>
            </div>
          </div>
        </div>
      </div>
      <!-- 发布房源 -->
      <div class="release">
        <a href="javascript:;" @click="GoRouter" data-router="publish">发布房源</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      iconUpDown:{//用户下拉箭头切换
        "icon-arrow-down":true,
        "icon-ico_back":false
      },
      show:false,//是否显示下拉菜单
      UserName:sessionStorage.getItem("username"),//用户名
      isHoster:sessionStorage.getItem("isHoster")//是否为房东
    };
  },
  props:{
    isIndex:{default:0}
  },
  methods: {
    // 登录
    login(){
      this.$router.push("/Login_go");
    },
    // 注册
    reg(){
      this.$router.push("/Reg_go");
    },
    // 鼠标移入用户名区域，箭头变为上箭头
    Up(){
      this.iconUpDown={
        "icon-arrow-down":false,
        "icon-ico_back":true
      }
      this.show=true;
    },
    //鼠标移除用户名区域，箭头变为下箭头
    Down(){
      this.iconUpDown={
        "icon-arrow-down":true,
        "icon-ico_back":false
      }
      this.show=false;
    },
    //菜单中路由跳转
    GoRouter(e){
      var router=e.target.dataset.router;
      if(router=="close"){
        sessionStorage.clear();
        this.UserName="";
        this.$router.push("/index");
      }else{
        this.$router.push("/"+router);
      }
    },
    
  }
};
</script>
<style scoped>
@import url("../../assets/css/indexfont/font_cveuyt7cddb/iconfont.css");
.headerC{
  width: 1240px;
  margin: 0 auto;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border:0;
}
.logo{
  height: 70px;
  line-height: 70px;
}
.logo img {
  height: 70px;
  vertical-align: top;
}
.logo span{
  font-size: 16px;
  font-family: 华文行楷;
  color: #fff;
  font-weight: bold;
}
.nav{
  width:500px;
  display: flex;
  justify-content: space-around;
  align-items: center;
  font-size: 18px;
}
.nav a{
  color:#fff;
}
.nav .login{
  height:50px;
  line-height: 50px;
  position: relative;
}
.nav .login a{
  display: inline-block;
  margin:0 10px;
}
.nav .release{
  display: inline-block;
  width:160px;
  height:50px;
  line-height: 50px;
  background-color: rgb(57,181,71,.8);
  border-radius: 5px;
  text-align: center;
}
.nav .release a{
  color:#fff;
}
.nav .login .icon{
  margin:0 8px;
}
.nav .navlist{
  width:135px;
  background-color: rgb(0, 0, 0,.6);
  position: absolute;
  top:50px;
  left:0;
  padding:0 15px 0;
  z-index: 1111;
}
.nav .navlist ul{
  width:135px;
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  border-bottom:1px solid #fff;
  padding-bottom: 15px;
}
.nav .navlist li{
  width:57.5px;
  height: 26px;
  line-height: 26px;
  padding:3px 5px;
}
.nav .navlist li:first-child{
  width:100%;
  height:25px;
  line-height: 25px;
  font-size: 16px;
  color:#fff;
  text-align: center;
  padding:10px;
}
.nav .navlist a{
  line-height: 25px;
  font-size: 14px;
  color:#fff;
  margin:0;
}
.nav div:first-child a:hover,
.nav div:nth-child(2) a:hover,
.nav .login div:nth-child(2):hover>a{
  color: #39b54a !important;
}
.nav .navlist div:last-child{
  text-align: center;
}
.font{
  color:#888 !important;
}
.font-color.font.color{
  color:#333;
}
.border{
  border-bottom: 1px solid #eaeaea;
}
</style>