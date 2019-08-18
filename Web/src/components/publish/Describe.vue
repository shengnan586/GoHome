<template>
<div class="describe" >
    <div class="h_wrap pb20 mt20">
        <h4 class="h_tit">房源描述</h4>
        <div class="h_room_box">
            <div class="h_room_ms clearfix" style="position:relative">
                <label style="width:100%;">
                    房源标题:
                    <span style="margin-left:15px;">
                        精炼的介绍特点和优势，让房客在第一时间对你的房源感兴趣
                    </span>
                </label>
                <div class="h_room_msg1 h_room_check" style="margin-left:90px;">
                    <div class="msg_tip" v-show="msg_tit">
                        <div class="msg_tip_arrow"></div>
                        建议格式：地标＋出租类型＋房源形容词
                        <br>
                        例如：国贸双井10号线地铁阳光充沛的大床房整租
                        <br>
                        请不要使用旅馆、旅店、招待所、浴池、计时休息、英租、法租、租界等词汇
                        <br>
                        <span>（不要发布联系方式，否则不能通过审核）</span>
                    </div>
                    <input type="text" placeholder="请填写" class="room_input input_detail" id="roomtitle" name="roomtitle" maxlength="22"  v-model="room_input_tit" onkeyup="changeFlag = true;"  @focus="title" @blur="clear">
                    <div class="number_tip_showCountVals_wrap"><span class="number_tip showCountVals" >{{num_tit}}/22</span></div>
                </div>
                <div  class="error_panel" v-show="err_title" style="display: block;top:65px;left:583px;">
                    <i  class="iconfont icon-jinggao"></i>
                    <div  class="el-alert_content">
                        <span  class="el-alert_title" >不能少于五个汉字</span>
                    </div>
                </div>
            </div>
            <div class="h_room_ms clearfix" style="position:relative">
                <label style="width: 100%;">房源介绍:
                    <span style="margin-left: 15px;">
                        向房客介绍一下自己的兴趣爱好，告诉房客能体验到的不一样的特色或服务有哪些
                    </span>
                    <br><br>
                    </label>
                <div class="h_room_msg1 h_room_msg12" style="margin-left:90px;">
                    <div class="msg_tip" v-show="msg_detail">
                        <div class="msg_tip_arrow"></div>
                        例如：你将结识一个热情、爱分享、爱读书、喜欢音乐和下厨的IT男生，希望与你一同感受胡同里的悠闲与自在。<br>
                        请不要使用旅馆、旅店、招待所、浴池、计时休息、英租、法租、租界等词汇<br>
                    </div>
                    <p class="number_tip showCountVals" id="number_roomServiceIntro">{{num_detail}}/2000</p>
                    <textarea rows="6" autoheight="true" placeholder="请填写" class="room_msg textarea_detail"  style="height: 144px;" @focus="detail" @blur="clear" v-model="room_input_detail"></textarea>
                </div>
                <div  class="error_panel" v-show="err_detail" style="display: block;top:68px;left:583px;">
                    <i  class="iconfont icon-jinggao"></i>
                    <div  class="el-alert_content">
                        <span  class="el-alert_title" >不能少于二十个汉字</span>
                    </div>
                </div>
            </div>
            <div class="h_room_ms clearfix" style="position:relative">
                <label style="width: 100%;">交通情况：
                    <span style="margin-left: 15px;">
                        房源所处位置，以及周边交通情况的描述
                    </span><br>
                    （选填）
                </label>
                <div class="h_room_msg1 h_room_msg12" style="margin-left:90px;">
                <div class="msg_tip" v-show="msg_traffic"> 
                    <div class="msg_tip_arrow" ></div>
                        例如：位于安定门外大街，从安定门地铁站A口5分钟即到。楼下还有27路、119路等多条公交线路，十分方便。<br>
                        请不要使用旅馆、旅店、招待所、浴池、计时休息、英租、法租、租界等词汇<br>
                    </div>
                    <p class="number_tip showCountVals">{{num_traffic}}/2000</p>
                    <textarea rows="6" autoheight="true" placeholder="请填写" class="room_msg textarea_detail" style="height: 144px;" @focus="traffic" @blur="clear" v-model="room_input_traffic"></textarea>
                </div>
                
            </div>
            
        </div>
    </div>
    <div class="w_960 clearfix" style="padding-bottom:15px;">
        <a href="javascript:;" class="keep_btn" @click="subBtn">保存并继续</a>
    </div>
</div>
</template>
<script>
export default {
    data() {
        return {
            msg_tit:false,
            room_input_tit:"",
            num_tit:0,
            msg_detail:false,
            room_input_detail:"",
            num_detail:0,
            msg_traffic:false,
            room_input_traffic:"",
            num_traffic:0,
            err_title:false,
            err_detail:false,
        }
    },
    props:["hid"],
    created() {
        if(!this.hid){
            this.load();
        }
    },
    methods: {
        load(){
            this.axios.get("/seldescribe",{params:{hid:this.hid}})
            .then(res=>{
                this.room_input_tit=res.data[0].houseTitle;
                this.room_input_detail=res.data[0].houseDESC;
                this.room_input_traffic=res.data[0].traffic;
            })
        },
        title(){
            this.msg_tit=true;
            this.msg_detail=false;
            this.msg_traffic=false;
            this.err_title=false;
        },
        detail(){
            this.msg_detail=true;
            this.msg_tit=false;
            this.msg_traffic=false;
            this.err_detail=false;
        },
        traffic(){
            this.msg_traffic=true;
            this.msg_tit=false;
            this.msg_detail=false;
        },
        clear(){
            this.msg_tit=false;
            this.msg_detail=false;
            this.msg_traffic=false;
        },
        subBtn(){
            if(this.room_input_tit.length<5){
                this.err_title=true;
                return;
            }else if(this.room_input_detail<20){
                this.err_detail=true;
            }else{
                var obj={
                    houseTitle:this.room_input_tit,
                    houseDESC:this.room_input_detail,
                    traffic:this.room_input_traffic,
                    
                }
                if(!this.hid){
                    this.axios.post("/describe",obj)
                    .then(res=>{
                        if(res.data.code==1){
                            console.log(res)
                        }else{
                            alert("操作失败")
                        }
                    })
                }else{
                    obj.hid=this.hid;
                    this.axios.post("/updescribe",obj)
                    .then(res=>{
                        if(res.data.code==1){
                            console.log(res)
                        }else{
                            alert("操作失败")
                        }
                    })
                }
            }
        }
    },
    watch: {
        room_input_tit(){
            this.num_tit=this.room_input_tit.length;
            if(this.room_input_tit.length>=22){
                this.room_input_tit.length==22
            }
        },
        room_input_detail(){
            this.num_detail=this.room_input_detail.length;
            if(this.room_input_detail.length>=2000){
                this.room_input_detail.length==2000;
            }
        },
        room_input_traffic(){
            this.num_traffic=this.room_input_traffic.length;
            if(this.room_input_traffic.length>=2000){
                this.room_input_traffic.length==2000;
            }
        }
    },
}
</script>
<style scoped>
.describe {
  background-color: #f5f5f5 !important;
  height: 100%;
}
html,
body {
  width: 100%;
  height: 100%;
}
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
}
.h_wrap{
    background:#fff;
    width: 960px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    font: normal 14px/22px "Microsoft YaHei";
    color: #2c3e50;
}
.pb20{
    padding-bottom: 20px;
}
.mt20{
    margin-top: 20px;
}
.h_tit {
  border-bottom: 1px solid #eee;
  height: 53px;
  line-height: 53px;
  margin: 0 10px;
  color: #39b54a;
  padding-left: 10px;
  font-weight: bold;
}
.h_room_box{
    padding: 30px 0 0 35px;
}
.h_room_ms label{
    display: block;
    float: left;
    line-height: 24px;
    padding-top: 8px;
    font-weight: bold;
}
.h_room_ms label span {
    color: #959ea7;
    font-weight: normal;
}
.h_room_check{
    color: #212121;
}
.h_room_msg1{
    padding-bottom: 42px;
    border: 1px solid #757575;
}
.h_room_msg1, .h_room_msg2 {
    width: 480px;
    position: relative;
}
.h_room_msg, .h_room_msg1, .h_room_msg2 {
    float: left;
    display: block;
    outline: none;
    resize: none;
}
.msg_tip {
    position: absolute;
    left: 500px;
    top: 0;
    width: 247px;
    background: #f5f5f5;
    color: #959ea7;
    padding: 8px 14px 7px;
    font: normal 12px/20px "simsun";
    transition: all .3s linear;
}
.msg_tip_arrow {
    position: absolute;
    left: -9px;
    top: 10px;
    background: url("../../../public/images/fb_sprice.png") no-repeat 0 -717px;
    width: 9px;
    height: 16px;
}
.room_input {
    width: 468px;
    height: 38px;
    border: 1px solid #d1d1d1;
    padding-left: 10px;
    color: #757575;
    font: normal 14px/38px "Microsoft YaHei";
    outline: none;
    border-radius: 2px;
    border: none;
    outline: none;
}
.number_tip_showCountVals_wrap {
    width: 100%;
}
.number_tip {
    position: absolute;
    right: 10px;
    bottom: 0;
    color: #959ea7;
    font: normal 12px/22px "simsun";
}
.h_room_msg12 {
    position: relative;
    top: -19px;
}
.room_msg, .s_room_msg {
    width: 458px;
    border: 1px solid #d1d1d1;
    color: #757575;
    font: normal 14px/22px "Microsoft YaHei";
    padding: 0px 10px 0px;
    resize: none;
    border-radius: 2px;
    overflow: hidden;
    padding-top: 8px;
    border: none;
    outline: none;
}
.w_960{
    margin: 0 auto;
    width:960px;
}
.keep_btn{
    display: block;
    width: 180px;
    height: 44px;
    line-height: 44px;
    background: #39b54a;
    text-align: center;
    color: #fff;
    font-size: 18px;
    text-decoration: none;
    font-family: "Microsoft YaHei";
    border-radius: 2px;
}
</style>