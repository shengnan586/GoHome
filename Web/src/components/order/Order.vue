<template>
  <div class="order_wrap mg_center">
    <div class="order_left">
      <div class="order_step_panel">
        <div class="item_step">
          <div class="main">
            <span class="dot_wrapper">
              <i class="dot dot_cur"></i>
            </span>
            <span class="step_txt step_txt_cur">申请预定</span>
          </div>
          <div class="line line_off"></div>
        </div>
        <div class="item_step">
          <div class="main">
            <span class="dot_wrapper">
              <i class="dot dot_off"></i>
            </span>
            <span class="step_txt step_txt_cur">待支付</span>
          </div>
          <div class="line line_off"></div>
        </div>
        <div class="item_step">
          <div class="main">
            <span class="dot_wrapper">
              <i class="dot dot_off"></i>
            </span>
            <span class="step_txt step_txt_cur">待入住</span>
          </div>
        </div>
      </div>
      <!-- 预订信息 -->
      <div class="order_info_wrap">
        <h3>预定信息</h3>
        <div class="calender_wrap_order book_info_wrap">
          <div class="book_info_box">
            <span class="wTitle">入住时段：</span>
            <div class="date_box">
              <laydate class="date_txt"></laydate>
              <i class="iconfont icon-rili"></i>
            </div>
          </div>
        </div>
      </div>
      <!-- 入住人信息 -->
      <div class="rent_info">
        <h3>入住人信息</h3>
        <h4>填写包含手机号在内的完整信息</h4>
        <div class="info_wrap">
          <div class="info_input_wrap">
            <div class="detail_wrap">
              <label>
                <i class="star">*</i>
                真实姓名：
              </label>
              <div class="name_panel">
                <div class="el-input">
                  <input
                    type="text"
                    autocomplete="off"
                    max="30"
                    maxlength="30"
                    placeholder="请确保信息真实 "
                    class="el-input_inner"
                    v-model="uname"
                  />
                </div>
                <div class="error_panel">
                  <i class="iconfont icon-jinggao"></i>
                  <div class="el-alert_content">
                    <span class="el-alert_title">请填写真实姓名</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 身份证 -->
            <!--  -->
            <div class="detail_wrap">
              <label>
                <i class="star">*</i>
                身份证号：
              </label>
              <div class="id_card_panel">
                <div class="el-input">
                  <input
                    type="text"
                    autocomplete="off"
                    max="30"
                    maxlength="30"
                    placeholder="请确保信息真实 "
                    class="el-input_inner"
                    v-model="id_card"
                  />
                </div>
                <div class="error_panel">
                  <i class="iconfont icon-jinggao"></i>
                  <div class="el-alert_content">
                    <span class="el-alert_title">请输入身份证号</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 手机号 -->
            <!--  -->
            <div class="detail_wrap">
              <label>手机号：</label>
              <div class="mobile_panel">
                <div class="el-input">
                  <input
                    type="text"
                    autocomplete="off"
                    max="30"
                    maxlength="30"
                    placeholder="请确保信息真实 "
                    class="el-input_inner"
                    v-model="phone"
                  />
                </div>
                <div class="error_panel">
                  <i class="iconfont icon-jinggao"></i>
                  <div class="el-alert_content">
                    <span class="el-alert_title">请输入手机号</span>
                  </div>
                </div>
              </div>
            </div>
            <!-- 入住人数 -->
            <!--  -->
            <div class="detail_wrap">
              <label>入住人数</label>
              <div class="num_panel">
                <div class="el-select">
                  <select v-model="val">
                    <option value="1">1人</option>
                    <option value="2">2人</option>
                    <option value="3">3人</option>
                    <option value="4">4人</option>
                    <option value="5">5人</option>
                  </select>
                  <i class="iconfont icon-xialakuangjiantou"></i>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- 预定人信息  -->
        <div class="order_info_wrap">
          <h3>预订人信息</h3>
          <div class="order_box">
            <!-- 昵称 -->
            <div class="nickname">
              <label>昵称：</label>
              <span v-text="nickName"></span>
            </div>
            <!-- 手机号 -->
            <div class="phone">
              <label>手机号：</label>
              <span v-text="userPhone"></span>
            </div>
          </div>
        </div>
        <!-- 退订须知 -->
        <div class="order_info_wrap rule">
          <h3>退订须知</h3>
          <!--  -->
          <div class="rule_wrap">
            <ul class="rule_detail">
              <li>
                <h3>9月21日14:00前取消，所有金额全部退还</h3>
              </li>
              <li>
                <h3>9月21日14:00后取消，扣除未入住首日房费</h3> 
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
    <div class="order_right"></div>
  </div>
</template>
<script>
import layDate from "../laydate.vue";
export default {
  data() {
    return {
      date: "2018-02-01 - 2019-03-02", //入住日期
      uname: "", //姓名
      phone: "", //手机号
      id_card: "", //身份证号
      val: 2, //入住人数
      nickName: "shengnan586", //昵称
      userPhone: "15140617114"
    };
  },
  components: { laydate: layDate }
};
</script>
<style >
@import url("../../assets/css/font_kqc3z77i4jc/iconfont.css");
@import url("../../assets/css/order.css");
@import url("../../assets/css/font_5yphq9cnd0n/iconfont.css");
@import url("../../assets/css/font_d5zt1pasnrv/iconfont.css");
</style>