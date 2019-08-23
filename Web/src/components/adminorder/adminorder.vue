<template>
  <div>
    <Header style="width:80%"></Header>
    <div class="mg_center">
      <div role="navigation" class="el-breadcrumb">
        <!-- <span class="el-breadcrumb__item">
          <span class="el-breadcrumb__inner sy">
            <a href="javascript:;">首页</a>
          </span>
          <a class="iconfont icon-xiangyoujiantou"></a>
        </span>
        <span class="el-breadcrumb__item">
          <span class="el-breadcrumb__inner">
            <a href="javascript:;">订单列表</a>
          </span>
        </span> -->
      </div>
      <section class="el-container">
        <!-- 左边 -->
        <aside class="el-aside" style="float:left">
          <div class="menu_web">
            <ul role="menubar" class="el-menu" @click="changestyle">
              <li
                data-id="1"
                role="menuitem"
                class="el-menu-item"
                :class="{'is-active':isActive=='1'}"
              >
                <router-link to="/adminorder/list" data-id="1">
                  <i class="iconfont icon-dingdanguanli" data-id="1"></i>
                  <span class="title" data-id="1">订单管理</span>
                </router-link>
              </li>
              <li
                data-id="2"
                role="menuitem"
                class="el-menu-item"
                :class="{'is-active':isActive=='2'}"
              >
                <router-link to="/adminorder/settlement" data-id="2">
                  <i class="iconfont icon-line-chart_icon" data-id="2"></i>
                  <span class="title" data-id="2">结算统计</span>
                </router-link>
              </li>
              <li
                data-id="3"
                role="menuitem"
                class="el-menu-item"
                :class="{'is-active':isActive=='3'}"
              >
                <router-link to="/adminorder/msg" data-id="3">
                  <i class="iconfont icon-tongzhi1" data-id="3"></i>
                  <span class="title" data-id="3">通知</span>
                </router-link>
              </li>
              <li
                data-id="4"
                role="menuitem"
                class="el-menu-item"
                :class="{'is-active':isActive=='4'}"
              >
                <router-link to="/adminorder/pwdedit" data-id="4">
                  <i class="iconfont icon-mima1" data-id="4"></i>
                  <span class="title" data-id="4">密码设置</span>
                </router-link>
              </li>
              <li
                data-id="5"
                role="menuitem"
                class="el-menu-item"
                :class="{'is-active':isActive=='5'}"
              >
                <router-link to="/adminorder/favorites" data-id="5">
                  <i class="iconfont icon-wodeshoucang" data-id="5"></i>
                  <span class="title" data-id="5">我的收藏</span>
                </router-link>
              </li>
              <li
                data-id="6"
                role="menuitem"
                class="el-menu-item"
                :class="{'is-active':isActive=='6'}"
              >
                <router-link to="/adminorder/baseinfor" data-id="6">
                  <i class="iconfont icon-jibenxinxi" data-id="6"></i>
                  <span class="title" data-id="6">房源信息</span>
                </router-link>
              </li>
              <!---邀请码-->
              <li
                data-id="7"
                role="menuitem"
                class="el-menu-item"
                :class="{'is-active':isActive=='7'}"
              >
                <router-link to="/adminorder/Admin_to" data-id="7">
                  <i class="iconfont icon-gerenziliao1" data-id="7"></i>
                  <span class="title" data-id="7">个人资料</span>
                </router-link>
              </li>
              <!--sdf-->
              <!-- 个人资料 -->
              <li
                data-id="8"
                role="menuitem"
                class="el-menu-item"
                :class="{'is-active':isActive=='8'}"
              >
                <router-link to="/adminorder/Admin_go" data-id="8">
                  <i class="iconfont icon-gerenziliao1" data-id="8"></i>
                  <span class="title" data-id="7">邀请码</span>
                </router-link>
              </li>
              <!--  -->
            </ul>
          </div>
        </aside>
        <!-- 右边 -->
        <div style="float:left;width:80%">
          <router-view></router-view>
        </div>
      </section>
    </div>
  </div>
</template>
<script>
import header from "../index/header.vue";
export default {
  data() {
    return {
      isActive: "1"
    };
  },
  methods: {
    changestyle(e) {
      this.isActive = e.target.dataset.id;
    }
  },
  components: {
    //Footer: footer,
    Header: header
  }
};
</script>
<style scoped>
@import url("../../assets/css/font/iconfont.css");
body{margin: 0;padding:0;}
a{
    text-decoration: none;
}
.mg_center{
    margin-left: auto;
    margin-right: auto;
    width: 1000px;
}
.el-breadcrumb{
    font-size: 14px;
    line-height: 1;
}
.el-breadcrumb::after, .el-breadcrumb::before{
    display: table;
    content: "";
}
.el-breadcrumb__item{
    float: left;
}
.el-breadcrumb__inner{
    color:#606266;
}
.el-breadcrumb__inner.sy a{
    color: #bdc3c7;
}
.iconfont.icon-xiangyoujiantou{
    margin-left: 15px;
    font-size: 12px !important;
    color: #bdc3c7;
}
.el-breadcrumb__item{
    float: left;
}

.el-breadcrumb__inner>a{
    margin-left: 15px;
    font-weight: 400;
    color: #606266;
    cursor: text;
}
.el-breadcrumb::after{
    clear: both;
}
.el-container {
    margin-top: 20px;
}
.el-aside{
    width: 20%;
    /* 170px; */
    overflow: hidden;
    font-weight: 300;
    outline: none;
    background-color: #ededed;
}
.menu_web .el-menu{
    border: 0;
}
.el-menu{
    border-right: solid 1px #e6e6e6;
    list-style: none;
    position: relative;
    margin: 0;
    padding-left: 0;
}
.menu_web .el-menu-item.is-active{
    background-color: rgb(57,181,71,.8);
    border-radius: 5px;
}

.menu_web .el-menu-item.is-active>a,.menu_web .el-menu-item.is-active .iconfont{
    color:#fff;
}
.el-menu-item {
    font-size: 14px;
    color: #303133;
    padding: 0 20px;
    cursor: pointer;
    -webkit-transition: border-color .3s,background-color .3s,color .3s;
    transition: border-color .3s,background-color .3s,color .3s;
    box-sizing: border-box;
}
/* .title{
    vertical-align: middle;
} */
.el-menu-item, .el-submenu__title {
    height: 56px;
    line-height: 56px;
    position: relative;
    -webkit-box-sizing: border-box;
    white-space: nowrap;
    list-style: none;
}
.el-menu-item > a {
    display: inline-block;
    width: 100%;
    height: 100%;
    vertical-align:middle;
    color:#333;
}
ul.el-menu>li{
    padding-left: 25%;
    color: rgb(44, 62, 80) !important;
}
.iconfont{
    font-size: 20px !important;
    color: #000;
}
</style>