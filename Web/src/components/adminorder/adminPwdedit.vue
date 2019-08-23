<template>
  <div>
    <div class="g_ctmain right_con">
      <div id="g_ctmain">
        <div id="updatePassWord">
          <p class="g_ft18">密码修改</p>
          <table>
            <tr>
              <td class="g_lists">已验证手机：</td>
              <td colspan="2" class="g_ft14">+86 185****4761</td>
            </tr>
            <tr>
              <td class="g_lists">图片验证码：</td>
              <td>
                <input
                  v-model="verify"
                  class="g_inputs g_ft14"
                  type="text"
                  placeholder="请输入图片验证码"
                  @blur="chkverify"
                />
              </td>
              <td valign="top">
                <div id="v_container" class="vcontainer"></div>
              </td>
              <td valign="middle" class="g_lists">
                <a class="iconfont icon-jingshigantanhao2 iconcolor" v-if="IS" href="javascript:;"></a>
                {{yanzhengmaMsg}}
              </td>
            </tr>
            <tr>
              <td class="g_lists">旧密码：</td>
              <td>
                <input
                  v-model="upwd"
                  class="g_inputs g_ft14"
                  type="text"
                  placeholder="请输入旧密码"
                  @blur="bluruupwd"
                />
              </td>
              <td colspan="2" valign="middle" class="g_lists">
                <a
                  class="iconfont icon-jingshigantanhao2 iconcolor"
                  href="javascript:;"
                  v-if="ISUpwd"
                ></a>
                {{oldUpwdMsg}}
              </td>
            </tr>
            <tr>
              <td class="g_lists">新密码：</td>
              <td>
                <input
                  v-model="newupwd"
                  class="g_inputs g_ft14"
                  type="text"
                  placeholder="请输入新密码"
                  @blur="blurnewupwd"
                />
              </td>
              <td colspan="2" valign="middle" class="g_lists">
                <a
                  class="iconfont icon-jingshigantanhao2 iconcolor"
                  v-if="ISNewupwd"
                  href="javascript:;"
                ></a>
                {{newUpwdMsg}}
              </td>
            </tr>
            <tr>
              <td colspan="4">
                <a href="javascript:;" class="g_pinkinput" @click="EditUpwd">确认</a>
              </td>
            </tr>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import "./gVerify.js";
export default {
  data() {
    return {
      userid: sessionStorage.getItem("userid"), //当前登陆的用户
      upwd: "", //旧密码框
      newupwd: "", //新密码框
      verify: "", //验证码绑定
      verifyCode: "", //验证码首次加载
      yanzhengmaMsg: "", //验证码错误信息
      newUpwdMsg: "", //新密码错误信息
      oldUpwdMsg: "", //旧密码错误信息
      IS: false, //判断验证码感叹号是否显示
      ISUpwd: false, //判断旧密码感叹号是否显示
      ISNewupwd: false //判断新密码感叹号是否显示
    };
  },
  methods: {
    //新密码的onblur事件，要在3-12位之间
    blurnewupwd() {
      var reg = /^[0-9A-Za-z]{3,12}$/i;
      if (this.newupwd.trim()) {
        if (!reg.test(this.newupwd.trim())) {
          this.newUpwdMsg = "新密码必须在3-12位之间";
          this.ISNewupwd = true;
        } else {
          this.newUpwdMsg = "";
          this.ISNewupwd = false;
        }
      } else {
        this.newUpwdMsg = "请输入新密码";
        this.ISNewupwd = true;
      }
    },
    //旧密码的onblur事件，去数据库里查询下密码是否正确
    bluruupwd() {
      return new Promise((resolve, reject) => {
        if (this.upwd.trim()) {
          var obj = { upwd: this.upwd };
          this.axios.get("/admin/GetUpwd", { params: obj }).then(res => {
            if (res.data.code == -1) {
              this.oldUpwdMsg = "旧密码输入错误";
              this.ISUpwd = true;
              resolve(false);
            } else {
              this.oldUpwdMsg = "";
              this.ISUpwd = false;
              resolve(true);
            }
          });
        } else {
          this.oldUpwdMsg = "请输入旧密码";
          this.ISUpwd = true;
        }
      });
    },
    //验证码的onblur事件
    chkverify() {
      if (this.verify.trim()) {
        var res = this.verifyCode.validate(this.verify);
        if (res) {
          this.yanzhengmaMsg = "";
          this.IS = false;
        } else {
          this.yanzhengmaMsg = "验证码错误";
          this.IS = true;
        }
      } else {
        this.yanzhengmaMsg = "请输入验证码";
        this.IS = true;
      }
    },
    EditUpwd() {
      this.chkverify();
      this.blurnewupwd();
      this.bluruupwd().then(res1 => {
        if (!res1) {
          return;
        } else if (this.yanzhengmaMsg || this.newUpwdMsg || this.oldUpwdMsg) {
          console.log("111111");
          return;
        } else {
          var id = "1"; //110 记得以后改成动态的
          var upwd = this.upwd;
          if (id != "" && id != "underfind") {
            var obj = { upwd, id };
            this.axios.post("admin/EditUpwd", obj).then(res => {
              if (res.data.code == 1) {
                alert("修改成功");
              } else {
                alert("修改失败");
              }
            });
          }
        }
      });
    }
  },
  mounted() {
    this.verifyCode = new GVerify("v_container"); //加载验证码
  },
  watch: {
    newupwd: "blurnewupwd",
    upwd: "bluruupwd"
    // verify:'chkverify'
  }
};
</script>>
<style scoped>
@import url("../../assets/css/font/iconfont.css");
.right_con {
  width: 800px;
  float: right;
  padding-bottom: 50px;
}
.g_ctmain {
  padding-top: 10px;
  padding-left: 15px;
  width: 80%;
}
.g_ft18 {
  font-size: 18px;
  color: "#2c3e50";
}
.g_lists {
  margin-top: 10px;
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  color: #a5adb4;
  vertical-align: top;
}
.g_ft14 {
  font-size: 14px;
}
.g_inputs {
  border: 1px solid #d1d1d1;
  height: 38px;
  line-height: 38px;
  width: 220px;
  padding-left: 10px;
  vertical-align: top;
}
.g_pinkinput {
  display: block;
  background: rgb(57, 181, 71, 0.8);
  border-radius: 5px;
  /* #f05b72; */
  width: 200px;
  height: 45px;
  line-height: 45px;
  text-align: center;
  color: #fff !important;
  font-size: 18px;
  margin-left: 32px;
  margin-top: 20px;
}
.vcontainer {
  width: 180px;
  height: 40px;
  margin-left: 5px;
}
a {
  display: inline;
  /* margin-left: 10px; */
}
.iconcolor {
  color: rgba(229, 229, 33, 1) !important;
}
table > tr > td {
  line-height: 50px;
}
</style>