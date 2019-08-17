<!--这是注册页面-->
<!---->

<template>
  <div class="reg_top">
    <div class="reg_parent">
      <div class="reg_log">注册</div>
      <div class="reg_no">
        已有账号 ?
        <a @click="reg_to" href="javascript:;">登录</a>
      </div>

      <input @blur="blurphone" v-model="phone" type="text" placeholder="建议使用常用手机号">
      <div class="reg_phone">{{spanMsg}}</div>

      <!-- 手机验证码一隐藏 -->
      <div style="display:none" class="reg_input">
        <input type="text" placeholder="请输入验证码">
        <button>获取验证码</button>
        <div class="reg_code">请输入验证码</div>
      </div>

      <input @blur="blurupwd" v-model="upwd" class="reg_upwd" type="text" placeholder="请输入6-16位密码">
      <div class="reg_up">{{divMsg}}</div>

      <span class="reg_span">
        <input type="checkbox">
        <a class="span_a" href="javascript:;">我已阅读并同意《xx用户协议》</a>
      </span>
      <button class="reg_btn" @click="reg()">注册</button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      phone: "",
      upwd: "",
      spanMsg: "",
      divMsg: ""
    };
  },
  watch: {
    //监控哪个变量，函数名就要和变量名一致！
    phone() {
      this.checkphone();
    },
    upwd() {
      this.checkupwd();
    }
  },
  methods: {
    reg_to(){
      this.$router.push("/Login_go")
    },
    blurphone() {
      return new Promise((resolve, reject) => {
        if (this.phone.trim() == "") {
          this.spanMsg = "手机号不能为空";
          resolve(false);
        } else {
          var url = "user/reg_go";
          this.axios(url, { params: { phone: this.phone } }).then(res => {
            if (res.data.code == -1) {
              this.spanMsg = "用户名已存在";
            } else {
              this.spanMsg = "手机号可用";
            }
          });
        }
      });
    },
    blurupwd() {
      return new Promise((resolve, reject) => {
        if (this.upwd.trim() == "") {
          this.divMsg = "密码不能为空";
          resolve(false);
        }
      });
    },
    checkphone() {
      var reg = /^1[3-9]\d{9}$/;
      //如果验证通过！
      if (this.phone) {
        //console.log(this.phone);
        if (reg.test(this.phone) == true) {
          this.spanMsg = "";
          return true;
        } else {
          this.spanMsg = "手机号格式不正确";
          return false;
        }
      } else {
        this.spanMsg = "手机号不能为空";
        return false;
      }
    },
    checkupwd() {
      var reg = /^[0-9A-Za-z]{3,12}$/i;
      if(this.upwd){
      //如果验证通过！
      if (reg.test(this.upwd) == true) {
        this.divMsg = "";
        return true;
      } else {
        this.divMsg = "密码必须在3~9位之间";
        return false;
      }
      }else{
        this.divMsg="密码不能为空";
        return false;
      }
    },
    reg() {
      if (this.checkphone() && this.checkupwd()) {
        var url = "user/reg";
        this.axios
          .post(url, { phone: this.phone, upwd: this.upwd })
          .then(res => {
            if (res.data.code == 1) {
              console.log("注册成功");
              this.$router.push("/Login_go");
            }
            if (res.data.code == -1) {
              console.log("注册失败");
            }
          });
      } else {
        return;
      }
    }
  }
};
</script>
<style scoped>
.reg_top {
  margin-top: 50px;
}
.reg_parent {
  width: 406px;
  height: 450px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background: #f7f7f7;
  padding: 40px;
  padding-bottom: 60px;
}

.reg_parent > input {
  width: 385px;
  height: 19px;
  padding: 15px 10px;
  border: 1px solid #dedede;
  font-size: 14px;
  margin: 0;
}
.reg_btn {
  width: 406px;
  height: 49px;
  border-radius: 2px;
  color: #fff;
  border: 0;
  background-color: #39b54a;
  box-sizing: border-box;
}
.reg_input input {
  width: 256px;
  height: 49px;
  font-size: 14px;
  padding: 15px 10px;
  border: 1px solid #dedede;
  margin: 0;
}
.reg_input button {
  width: 122px;
  height: 49px;
  border: 1px solid #dedede;
  color: #39b54a;
  padding: 1px 6px;
  margin-left: 6px;
}

.reg_log {
  font-size: 30px;
}
.reg_no {
  font-size: 16px;
  color: rgb(0, 0, 0, 0.4);
  margin: 20px 0;
  font-size: 16px;
  font-weight: bold;
}
.reg_no > a {
  font-size: 16px;
  color: #39b54a;
}
.reg_phone {
  width: 406px;
  height: 30px;
  line-height: 30px;
  color: #ff3737;
  font-size: 12px;
}
.reg_code {
  width: 406px;
  height: 30px;
  line-height: 30px;
  color: #ff3737;
  font-size: 12px;
}
.reg_up {
  width: 406px;
  height: 30px;
  line-height: 30px;
  color: #ff3737;
  font-size: 12px;
}
.reg_span {
  margin: 10px 0;
}
.span_a {
  color: rgb(0, 0, 0, 0.4);
  text-decoration: none;
  font-size: 15px;
}
</style>