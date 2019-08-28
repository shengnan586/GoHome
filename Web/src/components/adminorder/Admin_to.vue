<template>
  <div clas="parent">
    <!-- 一层 -->
    <div class="f1">
      <h4>基本信息</h4>
      <div class="admin_parent">
        <div class="admin_son">
          <div class="first">
            <label>用户名:</label>
            <span v-if="show">{{gname}}</span>
            <input v-model="gname" v-else type="text" />
            <a href="javascript:;" @click="showCount">{{msg}}</a>
          </div>
          <div class="two">
            <label>手机号码:</label>
            <span v-if="word">{{gphone}}</span>
            <input v-model="gphone" v-else type="text" />
            <a href="javascript:;" @click="showBtn()">{{showMsg}}</a>
          </div>
          <div class="three">
            <label>邮箱地址:</label>
            <span v-if="three">{{gemail}}</span>
            <input v-model="gemail" v-else type="text" />
            <a href="javascrip:;" @click="show_can()">{{canMsg}}</a>
          </div>
          <div class="jifen">
            <label>住宿积分:</label>
            <span>{{gpoint}}&nbsp;积分</span>
          </div>
        </div>
         
      </div>
    </div>
    <!-- 二层 -->
    <div class="f2">
      <div class="two_top">
        <h4 class="title">身份信息</h4>
        <span>仅用于必要的安全环节，其他情况下将为您严格保密</span>
        <a href="javascript:;" @click="show_title()">{{realmsg}}</a>
      </div>
      <div class="two_middle">
        <label>真实姓名:</label>
        <span v-if="two_name">{{guserName}}</span>
        <input v-model="guserName" v-else placeholder="请输入真实姓名" type="text" />
      </div>
      <div class="two_midd">
        <label>身份证号:</label>
        <span v-if="two_name">{{gcard}}</span>
        <input v-model="gcard" v-else placeholder="请输入身份证号" type="text" />
      </div>
    </div>
  <Alert :display="display" :prompt="prompt"></Alert>
  </div>
</template>
<script>
import Alert from "../Alert"
export default {
  components:{Alert},
  data() {
    return {
      display:'none',
      prompt:'',
      d1:0,
      show: true,
      word: true,
      three: true,
      two_name: true,
      showMsg: "修改",
      msg: "修改",
      canMsg: "修改",
       realmsg:"修改",
      gname: "",
      gphone: "",
      gemail: "",
      guserName: "",
      gcard: "",
      gpoint:""
    };
  },
  methods: {
    /*从数据库请求到用户名 真实姓名 手机号 身份证号 积分*/

    load() {
      var url = "/user/admin_to";
      this.axios
        .get(url, { params: { id: sessionStorage.getItem("userid") } })
        .then(res => {
          this.gname = res.data.result[0].UserName;
          this.gphone = res.data.result[0].phone;
          this.guserName = res.data.result[0].realName;
          this.gcard = res.data.result[0].cardID;
          this.gemail = res.data.result[0].email;
          this.gpoint=res.data.result[0].point;
        });
    },
    // 修改数据请求服务器
    sendRequest(obj) {
      var url = "user/admin_up";
      obj.id = sessionStorage.getItem("userid");
      this.axios.post(url, obj).then(res => {
        if (res.data.code == 1) {
          console.log("修改成功");
        }
        if (res.data.code == -1) {
          console.log("修改失败");
        }
      });
    },
    /*x修改数据 用户名*/
    showCount() {
      if (this.show == true) {
        this.show = false;
        this.msg = "保存";      
      } else {
        if(this.msg == "保存"){
        var reg = /\d{3,12}/;
        if(reg.test(this.gname)==false){
         // console.log("hhh");
          this.prompt="用户名格式不正确";
          this.display='block'+(this.d1++); 
        }
         this.show = true;
        this.msg = "修改";
      }
        var obj = {
        UserName: this.gname
      };
      this.sendRequest(obj);
      }
    },
    /* two的显示隐藏  手机号*/
    showBtn() {
      if (this.word == true) {
        this.word = false;
        this.showMsg = "保存";
      } else {
        if(this.showMsg == "保存"){
        var reg = /^1[3-9]\d{9}$/;
        if(reg.test(this.gphone)==false){
           console.log("hhh");
          this.prompt="手机号格式不正确";
          this.display='block'+(this.d1++);  
        }
         this.word = true;
        this.showMsg = "修改";
      }
        var obj = {
        phone: this.gphone
      };
      this.sendRequest(obj);
      }  
    },
    /*three显示隐藏  //邮箱 */
    show_can() {
      if (this.three == true) {
        this.three = false;
        this.canMsg = "保存";
      } else {
        if(this.canMsg == "保存"){
        var reg =/^[0-9a-z_]+@(([0-9a-z]+)[.]){1,2}[a-z]{2,3}$/;
        if(reg.test(this.gemail)==false){
           console.log("hhh");
          this.prompt="邮箱格式不正确";
          this.display='block'+(this.d1++);  
        }
         this.three = true;
        this.canMsg = "修改";
      }
        var obj = {
        email: this.gemail
      };
      this.sendRequest(obj);
      }
    },
    //真实姓名 和身份证号
    show_title() {
      // this.show_name=!this.show_name;
      if (this.two_name == true) {
        this.two_name = false;
        this.realmsg="保存"
      } else{
        this.realmsg="修改"
        this.two_name = true;
     
      var obj = {
        realName: this.guserName,
        cardID:this.gcard
      };
      this.sendRequest(obj)
    }
    }
  },
  created() {
    this.load();
    //this.showCount();
  }
}; //export end
</script>
<!-- 以下是样式-->
<style scoped>
/*以下是f1的样式*/
.jifen>span{
  margin-left:20px;
  color:#f05b72;
}
h4 {
  height: 50px;
  line-height: 50px;
  font-size: 16px;
  color: #30c3a6;
}
.admin_parent {
  width: 758px;
  display: flex;
  border-top: 1px solid #dedede;
}
.admin-img5{
  width:102px;
  height:130px;
  font-size:14px;
}
.admin-img5>img{
  width:100px;
  height:100px;
  margin-top:10px;
   border:1px solid #dedede;
}
label {
  font-size: 14px;
  color: #959ea7;
}
.f1 {
  width: 758px;
  height: 237px;
  border: 1px solid #dedede;
  padding: 0 18px;
   margin-left:110.7px;
}
.first,
.two,
.three {
  width: 658px;
  height: 50px;
  line-height: 50px;
}
.first > span {
  margin-left: 20px;
}
.two > span {
  margin-left: 20px;
}
.three > span {
  margin-left: 20px;
}
.admin_parent span {
  font-size: 14px;
}
.admin_parent a {
  font-size: 14px;
  margin-left: 20px;
  color: #f05b72;
}
.first > input {
  width: 200px;
  height: 30px;
  font-size: 16px;
  margin-left: 20px;
  border: 0;
  border-bottom: 1px solid #dedede;
}
.two > input {
  width: 200px;
  height: 30px;
  font-size: 16px;
  margin-left: 20px;
  border: 0;
  border-bottom: 1px solid #dedede;
}
.three > input {
  width: 200px;
  height: 30px;
  font-size: 16px;
  margin-left: 20px;
  border: 0;
  border-bottom: 1px solid #dedede;
}

/* 以下是f2的样式 */
input {
  outline: none;
}

.f2 {
  width: 758px;
  height: 187px;
  border: 1px solid #dedede;
  padding: 0 18px;
  margin-top: 20px;
   margin-left:110.7px;
}
a {
  text-decoration: none;
}
.two_top {
  border-bottom: 1px solid #dedede;
  display: flex;
}
.two_top > h4 {
  margin: 0;
}
.two_top > span {
  font-size: 14px;
  color: #959ea7;
  margin-left: 19px;
}
.two_top > a {
  font-size: 14px;
  color: #f05b72;
  margin-left: 300px;
}
.two_top,
.two_middle,
.two_midd {
  width: 758px;
  height: 50px;
  line-height: 50px;
}
.two_middle {
  margin-top: 10px;
}
.two_middle > span {
  font-size: 14px;
  color: #959ea7;
  margin-left: 20px;
}
.two_middle > input {
  width: 290px;
  height: 20px;
  font-size: 14px;
  padding: 5px 0;
  margin-left: 20px;
}
.two_midd > span {
  font-size: 14px;
  color: #959ea7;
  margin-left: 20px;
}
.two_midd > input {
  width: 290px;
  height: 20px;
  font-size: 14px;
  padding: 5px 0px;
  margin-left: 20px;
}
</style>