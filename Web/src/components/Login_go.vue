<!--这是登录页面-->
<template>
        <div class="login_top">
            <div class="login_parent">
                <div class="login_log">登录</div>
                <div class="login_no">没有账号? 可以<a @click="login_to" href="javascript:;">注册</a></div>
                <!-- 手机号验证 -->
                <input v-model="phone" type="text"  placeholder="请输入手机号">
                <div class="login_phone">{{spanMsg}}</div>
                
                <input v-model="upwd"  type="text" placeholder="请输入密码">
                <div class="login_upwd">{{divMsg}}</div>

                <div class="login_forget">
                    <label><input type="checkbox">一周内免登录</label>
                    <a class="login_for" style="color:#006837" href="javascript:;">忘记密码</a> 
                </div>
                <button class="login_btn" @click="login">登录</button> 
                <div style="display:none" class="login_num">手机验证码登录</div>
            </div>
        </div>
</template>
<script>
export default {
    data(){
        return{
            phone:"",
            upwd:"",
            spanMsg:"",
            divMsg:""
        }
    },
    watch:{
    //监控哪个变量，函数名就要和变量名一致！
    phone(){
     this.checkphone();
      
    },
     upwd(){
    this.checkupwd();
    }

  },
  methods:{
      login_to(){
          this.$router.push("/Reg_go")
      },
        checkphone(){
             var reg=/^1[3-9]\d{9}$/;
            //如果验证通过！
            if(this.phone){
            if(reg.test(this.phone)==true){
                this.spanMsg="";
                return true;
            }else{
                this.spanMsg="手机号格式不正确";
            return false;
            }
            }else{
                this.spanMsg="手机号不能为空";
                return false;
            }
        },
        checkupwd(){
            var reg=/^[0-9A-Za-z]{3,12}$/i;
            //如果验证通过！
            if(this.upwd){
            if(reg.test(this.upwd)==true){
                this.divMsg="";
                return true;
            }else{
                this.divMsg="密码不正确";
                return false;
            }
            }else{
                this.divMsg="密码不能为空";
                return false;
            }
        },
        login(){
           
           if(this.checkphone()&&this.checkupwd()){  
              
            //5.发送ajax请求 axios？
            var url="user/login_go";   
            this.axios.get(url,{params:{phone:this.phone,upwd:this.upwd}}).then(res=>{
                console.log(res);
                 //6.获取服务器返回的结果
                 
            if(res.data.code==-1){
                    //6.1登录失败 提示
                    //6.2登陆成功 跳转商品首页
            }else{
                /*以下是存储id username phone*/ 
                var id=res.data.data[0].id;
                var username=res.data.data[0].username;
                var phone=res.data.data[0].phone;
                var isHoster=res.data.data[0].isHoster;
                sessionStorage.setItem("userid",id);
                sessionStorage.setItem("username",username);
                sessionStorage.setItem("phone",phone);
                sessionStorage.setItem("isHoster",isHoster);
                /*登录成功自动转*/ 
                this.$router.push("/index")//将Product这个路由推入路由器，路由自动跳转
            }
            })
           
                
        }
      }
    }
  
}

</script>
<style scoped>
    *{margin:0;padding:0;}
    .login_top{
        margin-top:50px;
    }
    .login_parent{
         padding:40px;
         padding-bottom:60px;
         margin-top:20px;
        width:406px;
        height:450px;
        margin:0 auto;
        display:flex;
       flex-direction: column;
       background:#F7F7F7;
    }

    .login_parent>input{
        width:385px;
        height:19px;
        font-size:14px;
        padding:15px 10px;
        border:1px solid #dedede;
        margin:0;
    }
    .login_btn{
        width:406px;
        height:49px;
        border-radius: 2px;
        color:#fff;
        border:0;
        background-color:#39b54a;
        box-sizing: border-box;
        margin-top:10px;
    }
   
    .login_log{
        font-size:30px;
    }
    .login_no{
        font-size:16px;
        font-weight:bold;
        color:rgb(0,0,0,.4);
        margin:20px 0;
    }
    .login_no>a{
        font-size:16px;
        color: #39b54a;
    }
    .login_phone{
        width:406px;
        height:30px;
        line-height:30px;
        color:#ff3737;
        font-size:12px; 
    }
     .login_upwd{
        width:406px;
        height:30px;
        line-height:30px;
        color:#ff3737;
        font-size:12px; 
    }
    .login_num{
        color:#006837;
        font-size: 17px;
        margin:20px auto;
    }
    .login_forget{
        display:flex;
        justify-content: space-between;
        font-size:15px;
        color:rgb(0,0,0,.4);
        margin:10px 0;
    }
    .login-for{
        font-size:15px;
    }
</style>