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
      <input type="text" @blur="bluruname" v-model="username" placeholder="请填写用户名6-12位">
      <div class="reg_code">{{spanusermsg}}</div>

      <input @blur="blurphone" v-model="phone" type="text" placeholder="建议使用常用手机号">
      <div class="reg_phone">{{spanMsg}}</div>

      <!-- 手机验证码一隐藏 -->
      <div style="display:none" class="reg_input">
        <input type="text" placeholder="请输入验证码">
        <button>获取验证码</button>
        <div class="reg_code">请输入验证码</div>
      </div>

      <input @blur="blurupwd" v-model="upwd" class="reg_upwd" type="password" placeholder="请输入6-16位密码">
      <div class="reg_up">{{divMsg}}</div>
      <!-- @blur="blurporned" -->
      <input type="text" @blur="blurporned" v-model="porned" placeholder="请填写邀请码">
      <div class="reg_code">{{spanpornedMsg}}</div>

      <span class="reg_span">
        <input type="checkbox">
        <a class="span_a" href="javascript:;">我已阅读并同意《xx用户协议》</a>
      </span>
      <button class="reg_btn" @keyup.13="reg" @click="reg">注册</button>
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
      divMsg: "",
      porn: "", //邀请码
      spanusermsg: "", //用户名提示
      username: "", //用户名信息
      porned: "", //被邀请码
      spanpornedMsg: "" //验证码提示
    };
  },
  watch: {
    //监控哪个变量，函数名就要和变量名一致！
    username() {
      this.checkusername();
    },
    phone() {
      this.checkphone();
    },
    upwd() {
      this.checkupwd();
    },
    /*回车键注册*/
    reg() {
      this.reg();
    }
  },
  methods: {
    //验证邀请码
    blurporned() {
      return new Promise((resolve, reject) => {
        if (this.porned.trim()) {
          var url = "user/Getporned";
          this.axios(url, { params: { porned: this.porned } }).then(res => {
            if (res.data.code == -1) {
              this.spanpornedMsg = "邀请码可用";
              resolve(true);
            } else {
              this.spanpornedMsg = "邀请码错误";
              resolve(false);
            }
          });
        } else {
          resolve(true);
        }
      });
    },
    //检测用户名是否重复
    bluruname() {
      return new Promise((resolve, reject) => {
        if (this.username.trim() == "") {
          this.spanusermsg = "用户名不能为空";
          resolve(false);
        } else {
          var url = "user/GetUsername";
          this.axios(url, { params: { uname:this.username } }).then(res => {
            if (res.data.code == -1) {
              this.spanusermsg = "用户名已存在";
              resolve(true);
            } else {
              this.spanusermsg = "";
              resolve(false);
            }
          });
        }
      });
    },
    reg_to() {
      this.$router.push("/Login_go");
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
              this.spanMsg = "手机号已存在";
            } else {
              this.spanMsg = "";
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
    checkusername() {
      if (!this.username.trim()) {
        this.spanusermsg = "用户名不能为空";
        return false;
      }else 
        this.spanusermsg=""
      
    },
    checkphone() {
      var reg = /^1[3-9]\d{9}$/;
      //如果验证通过！
      if (this.phone) {
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
      if (this.upwd) {
        //如果验证通过！
        if (reg.test(this.upwd) == true) {
          this.divMsg = "";
          return true;
        } else {
          this.divMsg = "密码必须在3~9位之间";
          return false;
        }
      } else {
        this.divMsg = "密码不能为空";
        return false;
      }
    },
    //生成6位邀请码
    GetInviteCode() {
      return new Promise((resolve, reject) => {
        var chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
        var codeLength = 6;
        var s = [];
        for (var i = 0; i < 6; i++) {
          s[i] = chars.substr(Math.floor(Math.random() * 36), 1);
        }
        this.porn = s.join(""); //生成注册码
        //再去注册码里查询这个注册码是否存在，如果存在，则重新生成，如果不存在，则新增。
        console.log(this.porn);
        var obj = { porn: this.porn };
        this.axios.get("user/reg_porn", { params: obj }).then(res => {
          if (res.data.code == -1) {
            GetInviteCode();
            resolve(false);
          } else {
            resolve(true);
          }
        });
      });
    },
    //注册
    reg() {
      if (this.checkphone() && this.checkupwd()) {
        Promise.all([this.GetInviteCode(), this.blurporned()])
          .then(result => {
            if (result) {
              var url = "user/reg";
              this.axios
                .post(url, {
                  username: this.username,
                  phone: this.phone,
                  upwd: this.upwd,
                  porn: this.porn,
                  porned: this.porned,
                  point: 500
                })
                .then(res => {
                  if (res.data.code == 1) {
                    console.log("注册成功");
                    this.$router.push("/Login_go");
                  }
                  if (res.data.code == -1) {
                    console.log("注册失败");
                  }
                });
            }
          })
          .catch({});
      } else {
        return;
      }
    }
  },
  /*回车键注册*/
  created() {
    let that = this;
    document.onkeypress = function(e) {
      var keycode = document.all ? event.keyCode : e.which;
      if (keycode == 13) {
        that.reg(); // 登录方法名
        return false;
      }
    };
  }
  // mounted() {
  //   this.GetInviteCode();
  // }
};
</script>
<style scoped>
.reg_top {
  width: 100%;
  height: 100%;
  background: url(../assets/denglu.jpg) 0 0 no-repeat;
  background-size: 100% 100%;
  position: relative;
}
.reg_parent {
  width: 406px;
  height: 500px;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  background: rgba(255, 255, 255, 0.5);
  padding: 40px;
  padding-bottom: 60px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
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