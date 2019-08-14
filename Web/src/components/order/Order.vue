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
                <div class="el-input" >
                  <input id="uname"
                    type="text"
                    autocomplete="off"
                    max="30"
                    maxlength="30"
                    placeholder="请确保信息真实 "
                    class="el-input_inner"
                    v-model="uname" @blur="uname_blur" :class="{inputborder:inputname=='uname'}"  @focus="clear"
                  />
                </div>
                <div class="error_panel"  :style="{display:blurinput[0]=='uname'?'block':'none'}">
                  <i class="iconfont icon-jinggao"></i>
                  <div class="el-alert_content">
                    <span class="el-alert_title">{{warn_name}}</span>
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
                  <input id="id_card"
                    type="text"
                    autocomplete="off"
                    max="30"
                    maxlength="30"
                    placeholder="请确保信息真实 "
                    class="el-input_inner"
                    v-model="id_card" @blur="card" :class="{inputborder:inputname=='id_card'}"  @focus="clear"
                  />
                </div>
                <div class="error_panel "  :style="{display:blurinput[1]=='id_card'?'block':'none'}">
                  <i class="iconfont icon-jinggao"></i>
                  <div class="el-alert_content ">
                    <span class="el-alert_title">{{warn_id_card}}</span>
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
                  <input id="phone"
                    type="text"
                    autocomplete="off"
                    max="30"
                    maxlength="30"
                    placeholder="请确保信息真实 "
                    class="el-input_inner"
                    v-model="phone" @blur="call" :class="{inputborder:inputname=='phone'}"  @focus="clear"
                  />
                </div>
                <div class="error_panel"  :style="{display:blurinput[2]=='phone'?'block':'none'}">
                  <i class="iconfont icon-jinggao"></i>
                  <div class="el-alert_content">
                    <span class="el-alert_title">{{warn_phone}}</span>
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
          <div class="checkall_wrap">
            <span>
              我同意《BUG服务协议》《房客规则》《意外健康险保险告知书》《会员服务协议》及房东规定的退订规则及入住要求
            </span>
          </div>
          <div class="push_order">
            提交订单
          </div>
        </div>
      </div>
    </div>
    <div class="order_right"></div>
  </div>
</template>
<script>
import layDate from "../laydate/laydate.vue";
export default {
  data() {
    return {
      date: "2018-02-01 - 2019-03-02", //入住日期
      uname: "", //姓名
      id_card: "", //身份证号
      phone: "", //手机号
      val: 2, //入住人数
      nickName: "shengnan586", //昵称
      userPhone: "15140617114",
      warn_name:"",
      warn_id_card:"",
      warn_phone:"",
      inputname:"",
      blurinput:["","",""]
    };
  },
  components: { laydate: layDate },
  methods: {
    clear(e){
      this.inputname=e.target.id;
      if(e.target.id=="uname"){
        this.blurinput[0]="";
      }else if(e.target.id=="id_card"){
        this.blurinput[1]="";
      }else{
        this.blurinput[2]="";
      }
    },
    uname_blur(e){
      this.inputname="";
      var reg=/^[\u2E80-\u9FFF]+$/;
      if(!this.uname){
        this.warn_name="请填写真实姓名";
        this.blurinput[0]=e.target.id;
      }else{
        if(!reg.test(this.uname)){
          this.warn_name="仅可使用汉字";
          this.blurinput[0]=e.target.id;
        }else{
          this.warn_name="";
          this.blurinput[0]="";
        }
      }
    },
    card(e){
      this.inputname="";
      var reg=/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if(this.id_card==""){
        this.warn_id_card="请填写身份证号";
        this.blurinput[1]=e.target.id;
      }else{
        if(!reg.test(this.id_card)){
          this.warn_id_card="身份证号有误";
          this.blurinput[1]=e.target.id;
        }else{
          this.warn_id_card="";
          this.blurinput[1]="";
        }
      }
    },
    call(e){
      this.inputname="";
      var reg=/^1(3|4|5|7|8)\d{9}$/;
      if(this.phone==""){
        this.warn_phone="请填写手机号";
        this.blurinput[2]=e.target.id;
      }else{
        if(!reg.test(this.phone)){
          this.warn_phone="手机号号有误";
          this.blurinput[2]=e.target.id;
        }else{
          this.warn_phone="";
          this.blurinput[2]="";
        }
      }
    }
  },
};
</script>
<style >
@import url("../../assets/css/font_kqc3z77i4jc/iconfont.css");
@import url("../../assets/css/order.css");
@import url("../../assets/css/font_5yphq9cnd0n/iconfont.css");
@import url("../../assets/css/font_d5zt1pasnrv/iconfont.css");
.inputborder{
  border:1px solid #212121 !important;
}
</style>