
<template>
<div>
    <div class=adminall>
        <div class=admin_top>
             <h2>为出行计划攒住宿积分</h2>
           <p>每成功邀请1位朋友注册，你们均可得500积分</p>
           <img src="../../assets/jifen.jpg" alt="">
        </div>
        <div>
        <div class="admin_bottom">
           <h6>分享码邀请码</h6>
              <span class="admin_msg" id="url">{{msg}}</span>
             <!-- <img  id = "btn" src="../../assets/fuzhi.png" alt=""> -->
            </div>
             <hr style="width:200px; margin-left:300px;">
       </div>
     
       </div>
    </div>
</template>
<script>
export default {
    data(){
        return{
          msg:""
        }
    },
    methods: {
      intial(){
          var url="user/admin_go"
        this.axios.get(url,{params:{id:sessionStorage.getItem("userid")}}).then(res=>{
             console.log(res)
            if(res.data.code==1){
              this.msg=res.data.result[0].porn
            }
        })
        
      }
},

created() {
    this.intial()
        /*复制*/
     /*onload = function () { 
    var btn = document.getElementById("btn"); 
    var url = document.getElementById("url"); 
    btn.onclick = function (){ 
    url.select(); 
    document.execCommand("Copy"); 
    } 
     }*/
},
}
</script>
<style scoped>
    .adminall{
         width:800px;
        height:446px;
        border:1px solid #dedede;
         display:flex;
        flex-direction: column;
        text-align: center;
         background:url(../../assets/bei.png) 0 0 no-repeat;
         background-size:100%;
         margin-left:110.7px;
    }
    .admin_top>h2{
        margin-top:20px;
       font-size: 24px;
       color:#fff;
    }
    .admin_top>p{
        margin:20px 0;
        font-size:18px;
        color:#fff;
    }
  .admin_bottom{
      margin-top:130px;
  }
  .admin_bottom>h6{
      margin:0;
      font-size: 14px;
      margin-bottom:20px;
  }
    .admin_bottom>img{
        margin-left:50px;
    }

.admin_msg{
    width:200px;
    height:25px;
    font-size:20px;
    line-height:25px;
    border:1px solid #000;
     border:0; 
    /* border-bottom:1px solid #dedede; */
}
</style>