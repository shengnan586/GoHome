<template>
<div>
  <homeheader></homeheader>
  <div style="height:20px;"></div>
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
              <!-- 时间子组件，自定义时间getValue用于获取选中的入住时间段 -->
              <laydate  @getValue="getDateValue" :orderDate="order" class="date_txt"></laydate>
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
          <div class="push_order" @click="submit">
            提交订单
          </div>
        </div>
      </div>
    </div>
    <div class="order_right"></div>
  </div>
  <homefooter></homefooter>
</div>
</template>
<script>
import layDate from "../laydate/laydate.vue";
export default {
  data() {
    return {
      ischecked:false,
      uname: "", //姓名
      id_card: "", //身份证号
      phone: "", //手机号
      val: 2, //入住人数
      nickName: sessionStorage.getItem("username"), //昵称
      userPhone: sessionStorage.getItem("phone"),//手机号
      warn_name:"",
      warn_id_card:"",
      warn_phone:"",
      inputname:"",
      blurinput:["","",""],
      orderDate:null,//保存时间控件返回的对象
      // order:{start:"2019-09-01",end:"2019-09-03"}
    };
  },
  created() {
    if(!sessionStorage.getItem("userid")){
        this.$router.push("/Login_go");
      }
  },
  props:["order"],
  components: { laydate: layDate },
  methods: {
    //获取时间控件返回的时间对象{入住时间、离开时间、天数}
    getDateValue(orderDate){
      this.orderDate=orderDate;
    },
    // 获得焦点事件
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
    // 用户名失去焦点正则判断
    uname_blur(e){
      this.inputname="";
      var reg=/^[\u2E80-\u9FFF]+$/;
      if(!this.uname){
        this.warn_name="请填写真实姓名";
        this.blurinput[0]=e.target.id;
        this.ischecked= false;
      }else{
        if(!reg.test(this.uname)){
          this.warn_name="仅可使用汉字";
          this.blurinput[0]=e.target.id;
          this.ischecked= false;
        }else{
          this.warn_name="";
          this.blurinput[0]="";
          return true;
        }
      }
    },
    // 身份证号失去焦点正则判断
    card(e){
      this.inputname="";
      var reg=/^[1-9]\d{5}(18|19|([23]\d))\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
      if(this.id_card==""){
        this.warn_id_card="请填写身份证号";
        this.blurinput[1]=e.target.id;
        this.ischecked= false;
      }else{
        if(!reg.test(this.id_card)){
          this.warn_id_card="身份证号有误";
          this.blurinput[1]=e.target.id;
          this.ischecked= false;
        }else{
          this.warn_id_card="";
          this.blurinput[1]="";
          this.ischecked= true;
        }
      }
    },
    // 手机号失去焦点正则判断
    call(e){
      this.inputname="";
      var reg=/^1(3|4|5|7|8)\d{9}$/;
      if(this.phone==""){
        this.warn_phone="请填写手机号";
        this.blurinput[2]=e.target.id;
        this.ischecked= false;
      }else{
        if(!reg.test(this.phone)){
          this.warn_phone="手机号码有误";
          this.blurinput[2]=e.target.id;
          this.ischecked= false;
        }else{
          this.warn_phone="";
          this.blurinput[2]="";
          this.ischecked= true;
        }
      }
    },
    // 时间戳函数
    getDateString(){
      var d=new Date();
      var year=d.getFullYear().toString();
      var month=(d.getMonth()+1)<10?"0"+(d.getMonth()+1):(d.getMonth()+1).toString();
      var date=d.getDate()<10?"0"+d.getDate():d.getDate().toString();
      var hours=d.getHours()<10?"0"+d.getHours():d.getHours().toString();
      var minutes=d.getMinutes()<10?"0"+d.getMinutes():d.getMinutes().toString();
      var seconds=d.getSeconds()<10?"0"+d.getSeconds():d.getSeconds().toString();
      var milliseconds=d.getMilliseconds().toString();
      return year+month+date+hours+minutes+seconds+milliseconds;
    },
    // 提交数据
    submit(){
      // 订单编号  getDate
      var getDate=this.getDateString();
      // ID
      var id=null;
      // 用户id
      var uid=1
      // 房屋编号
      var hid=1;
      // 付款状态
      var payStatus=0;
      // 付款时间
      var payTime="";
      // 订单价格
      var orderPrice=1200;
      // 订单状态
      var orderStatus=1;
      if(this.ischecked){
        var url="/order/order";
        var obj = {realName:this.uname,cardID:this.id_card,phone:this.phone,peopleNumber:this.val,checkinDate:this.orderDate.start,checkoutDate:this.orderDate.end,days:this.orderDate.days,orderId:getDate,id:id,hid:hid,payStatus:payStatus,payTime:payTime,orderPrice:orderPrice,orderStatus:orderStatus,uid:uid};
        this.axios.post(url,obj).then(res=>{
          if(res.data.code==1){
            // 跳转到待支付界面
            this.$router.push("unpaid")
          }else{
            alert("提交失败");
          }
        })
      }else{
        alert("请完善您的信息");
        return;
      }
    },

  },
};
</script>
<style scoped>
@import url("../../assets/css/font_zl650w5ajr/iconfont.css");
@import url("../../assets/css/order.css");

</style>