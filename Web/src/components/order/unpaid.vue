<template>
  <div>
    <homeheader></homeheader>
    <div class="order_step_panel" style="width:1240px;margin:auto;">
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
              <i class="dot dot_off" style="background: #26a69a;"></i>
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
    
    <div class="content">
       <div class="prompt" style="position:relative;">
           <div style="position:absolute;top:50%;left:50%;transform: translate(-50%,-50%);">   
            <p class="title" :style="colorShow ? {color:'#f00'} : {color:'#39b54a'}">{{tit}}</p>
            <p v-show="isShow" class="titcontent">即将跳转，还有{{time}}秒</p>
           </div>
       </div>
     </div>
     <homefooter style="position:fixed;bottom:0"></homefooter>
  </div>
</template>
<script>
export default {
  data() {
    return {
      time: 5,
      tit: "正在支付，请您稍等...",
      isShow: false,
      colorShow:true,
      payStatus:1,
      orderStatus:2,
      id:null
    };
  },
  created() {
    this.timer();
  },
  mounted() {
    this.id = this.$route.query.key;
    console.log('页面加载'+this.id);
  },
  methods: {
    timer() {
      var p = new Promise((resolve,reject)=> {  //正在支付等待5秒
        var t = setInterval(() => {
          this.time--;
          if (this.time == 0) {
            this.tit = "支付成功";
            this.colorShow = false;
            clearInterval(t);
            t = null;
            this.isShow = false;
            this.time = 3;
            resolve();
          }
        }, 1000);
      }).then(
          ()=>{
              this.isShow = true;
              var t = setInterval(() => { //支付成功等待3秒跳转
              this.time--;
          if (this.time == 0) {
            clearInterval(t);
            t = null;
            
          }
        }, 1000);
        this.id=this.id;
        console.log(this.id);
          }
      ).then(
        this.axios.post('/order/unpaid',{payStatus:this.payStatus,orderStatus:this.orderStatus,id:this.id}).then(res=>{
          if(res.data.code==1){
            // 跳转到待支付界面
            this.$router.push("adminorder/list")
          }else{
            alert("请求超时");
          }
        })
      )
    }
  }
};
</script>
<style scoped>
.content {
  width: 1240px;
  margin: auto;
  box-sizing: border-box;
}
.prompt {
  width: 62%;
  border: 1px solid #f5f5f5a6;
  margin: auto;
  margin-top: 20px;
  height:500px;
  box-shadow: inset 1px 0px 4px 1px #d1d1d1;
}
.title {
  color: #f00;
  font-size: 40px;
  font-weight: bold;
  margin: auto;
  width: 300px;
  text-align: center;
}
.titcontent{
    margin:10px auto 0;
    width: 300px;
    box-sizing: border-box;
    text-align: center;
    color:#666;
    font-size:16px;
}
</style>