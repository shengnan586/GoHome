<template>
  <div>
    <div class="mg_center">
      <div role="navigation" class="el-breadcrumb">
        <span class="el-breadcrumb__item">
          <span class="el-breadcrumb__inner sy">
            <a href="javascript:;">首页</a>
          </span>
          <a class="iconfont icon-xiangyoujiantou"></a>
        </span>
        <span class="el-breadcrumb__item">
          <span class="el-breadcrumb__inner">
            <a href="javascript:;">订单列表</a>
          </span>
        </span>
      </div>
      <section class="el-container">
        <!-- 左边 -->
        <aside class="el-aside" style="float:left">
          <div class="menu_web">
            <ul role="menubar" class="el-menu" @click="changestyle">
              <li data-id="1" role="menuitem" class="el-menu-item" :class="{'is-active':isActive=='1'}">
                <router-link to="/adminorder/list" data-id="1">
                  <i class="iconfont icon-dingdanguanli" data-id="1"></i>
                  <span class="title" data-id="1">订单管理</span>
                </router-link>
              </li>
              <li data-id="2" role="menuitem" class="el-menu-item" :class="{'is-active':isActive=='2'}">
                <router-link to="/adminorder/settlement" data-id="2">
                  <i class="iconfont icon-line-chart_icon" data-id="2"></i>
                  <span class="title" data-id="2">结算统计</span>
                </router-link>
              </li>
              <li data-id="3" role="menuitem" class="el-menu-item" :class="{'is-active':isActive=='3'}">
                <router-link to="/adminorder/msg" data-id="3">
                  <i class="iconfont icon-tongzhi1" data-id="3"></i>
                  <span class="title" data-id="3">通知</span>
                </router-link>
              </li>
              <li data-id="4" role="menuitem" class="el-menu-item" :class="{'is-active':isActive=='4'}">
                <router-link to="/adminorder/pwdedit" data-id="4">
                  <i class="iconfont icon-mima1" data-id="4"></i>
                  <span class="title" data-id="4">密码设置</span>
                </router-link>
              </li>
              <li data-id="5" role="menuitem" class="el-menu-item" :class="{'is-active':isActive=='5'}">
                <router-link to="/adminorder/favorites" data-id="5">
                  <i class="iconfont icon-wodeshoucang" data-id="5"></i>
                  <span class="title" data-id="5">我的收藏</span>
                </router-link>
              </li>
              <li data-id="6" role="menuitem" class="el-menu-item" :class="{'is-active':isActive=='6'}">
                <router-link to="/adminorder/baseinfor" data-id="6">
                  <i class="iconfont icon-jibenxinxi" data-id="6"></i>
                  <span class="title" data-id="6">房源信息</span>
                </router-link>
              </li>
              <li data-id="7" role="menuitem" class="el-menu-item" :class="{'is-active':isActive=='7'}">
                 <router-link to="/adminorder/baseinfor" data-id="6">
                  <i class="iconfont  icon-gerenziliao1" data-id="6"></i>
                  <span class="title" data-id="7">个人资料</span>
                </router-link>
              </li>
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
export default {
    data () {
        return {
            isActive:"1"
        }
    },
    methods: {
        changestyle(e){
            this.isActive=e.target.dataset.id;
        }
    }
}
</script>
<style scoped>
@import url("../../assets/css/adminorder.css");
@import url("../../assets/css/font/iconfont.css");
</style>