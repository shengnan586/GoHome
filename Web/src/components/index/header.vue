<template>
  <div class="headerC">
    <div class="logo">
      <a href="javascript:;" @click="GoIndex">
        <img src="../../assets/images/WechatIMG63.png" />
        <span>BUG民宿，家的感觉</span>  
      </a>
    </div>
    <div class="nav">
      <div>
        <a href="javascript:;">GoHome</a>
      </div>
      <div class="login">
        <div v-if="false">
          <a href="javascript:;">登录</a>
          |
          <a href="javascript:;">注册</a>
        </div> 
        <div @mouseenter="Up" @mouseleave="Down" v-if="true">
          <a href="javascript:;">shengnan586<!--{{sessionStorage.getItem("username")}}-->
            <span class="icon iconfont" :class="iconUpDown"></span>
          </a>
          <div @click="GoRouter" class="navlist" v-show="show">
            <ul>
              <li>
                  房东中心
              </li>
              <li><a href="javascript:;" data-router=“”>订单管理</a></li>
              <li><a href="javascript:;" data-router=“”>结算统计</a></li>
              <li><a href="javascript:;" data-router=“”>房源信息</a></li>
              <li><a href="javascript:;" data-router=“”>价格房态</a></li>
              <li><a href="javascript:;" data-router=“”>个人资料</a></li>
              <li><a href="javascript:;" data-router=“”>我的收藏</a></li>
            </ul>
            <ul>
              <li>
                房客中心
              </li>
              <li><a href="javascript:;" data-router="">我的订单</a></li>
              <li><a href="javascript:;" data-router="">个人资料</a></li>
              <li><a href="javascript:;" data-router="">我的收藏</a></li>
              <li><a href="javascript:;" data-router="">通知</a></li>
            </ul>
            <div>
              <a href="javascript:;">退出</a>
            </div>
          </div>
        </div>
      </div>
      <div class="release">
        <a href="javascript:;">发布房源</a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      iconUpDown:{
        "icon-arrow-down":true,
        "icon-ico_back":false
      },
      show:false
    };
  },
  methods: {
    Up(){
      this.iconUpDown={
        "icon-arrow-down":false,
        "icon-ico_back":true
      }
      this.show=true;
    },
    Down(){
      this.iconUpDown={
        "icon-arrow-down":true,
        "icon-ico_back":false
      }
      this.show=false;
    },
    GoRouter(){
      console.log(123);
    },
    GoIndex() {
      this.$router.push("/index");
    }
  }
};
</script>
<style scoped>
@import url("../../assets/css/indexfont/font_fn9n2xmf4ol/iconfont.css");
.headerC{
  width: 1240px;
  margin: 0 auto;
  height: 80px;
  display: flex;
  justify-content: space-between;
  align-items: center;
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
  font-size: 20px;
  font-family: SimHei;
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
  color: #39b54a;
}
.nav .navlist div:last-child{
  text-align: center;
}
</style>