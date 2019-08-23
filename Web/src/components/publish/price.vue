<template>
    <div class="price" :style="{display:stepToChild==5?'block':'none'}">
        <table></table>
        <div class="h_wrap mt20">
            <h4 class="h_tit">价格规则</h4>
            <div class="h_house_info">
                <ul>
                    <li class="clearfix pb15">
                        <label class="type1 w_100">日价：</label>
                        <div class="h_house_r clearfix" style="position:relative">
                            <div class="h_input_box textarea_price" :style="err_price ? 'border:1px solid #f52626!important' : ''">
                                <span class="h_input_text">元/每晚</span>
                                <input class="input_price" type="text" onafterpaste="this.value=this.value.replace(/\D/g,'')" onkeyup="this.value=this.value.replace(/\D/g,'');changeFlag = true;" maxlength="6" v-model="price" @focus="iserr">
                            </div>
                            <p class="h_tip_text">日价的10%将作为服务费，请酌情考虑</p>
                            <div class="error_panel" v-show="err_price" style="display: block;top:10px;left:360px;">
                                <i class="iconfont icon-jinggao"></i>
                                <div class="el-alert_content">
                                    <span class="el-alert_title">{{err_price_content}}</span>
                                </div>
                            </div>
                        </div>
                    </li>
                    <li class="clearfix pb15">
                        <label class="type1 w_100">节假日价格：</label>
                        <div class="h_house_r clearfix" style="position:relative">
                            <div class="h_input_box textarea_price" >
                                <span class="h_input_text">元/每晚</span>
                                <input class="input_price" type="text" onafterpaste="this.value=this.value.replace(/\D/g,'')" onkeyup="this.value=this.value.replace(/\D/g,'');changeFlag = true;" maxlength="6" v-model="price_2" >
                            </div>
                            <p class="h_tip_text">节假日价格服务费标准以日价为准，请酌情考虑</p>
                        </div>
                    </li>
                    <li class="clearfix pb15">
                        <label class="type1 w_100">特价房：</label>
                        <div class="h_house_r clearfix" style="position:relative">
                            <div class="h_input_box textarea_price" >
                                <span class="h_input_text">元/每晚</span>
                                <input class="input_price" type="text" onafterpaste="this.value=this.value.replace(/\D/g,'')" onkeyup="this.value=this.value.replace(/\D/g,'');changeFlag = true;" maxlength="6" v-model="price_3" >
                            </div>
                            <p class="h_tip_text">特价房价格服务费标准以日价为准，请酌情考虑</p>
                        </div>
                    </li>
                    <li class="clearfix pb15">
                        <label class="type1 w_100">押金：</label>
                        <div class="clearfix hide_width">
                            <div class="clearfix hide_width" :value="cash" @click="iscash">
                                <div class="h_check" data-val="0" :class="cash ? '' :'h_check_cur' ">不收取押金</div>
                                <div class="h_house_r  clearfix" style="position:relative" id="cashpledge_more">
                                    <i class="yj_ico" @mouseenter="cash_info_show" @mouseleave="cash_info_hidden"></i>
                                    <div class="yj_online" :style="cash_info ? 'display:block' : 'display:none'">
                                        <i class="yj_top_arrow"></i>
                                        <h3>【为什么更多房东选择不收取押金？】</h3>
                                        <h4>①同等保障</h4>
                                        <p>不收取押金，不代表失去保障；小猪承诺无押金房源与押金房源享受同等赔付保障：小猪先行为房客垫付押金以支付您的损失。</p>
                                        <h4>②流量翻倍</h4>
                                        <p>无押金房源享受平台排名支持，增加曝光；同时提升房客好感，可获得更多订单。</p>
                                    </div>
                                </div>
                                <div class="h_check  ml90 " data-val="1" :class="cash ? 'h_check_cur' : '' ">收取押金</div>
                            </div>
                        </div>
                        <div class="h_input_box" :style="cash ? 'display:block' : 'display:none' ">
                            <span class="h_input_text">元</span>
                            <input type="text" maxlength="4" class="input_price"
                            onafterpaste="this.value=this.value.replace(/\D/g,'')" onkeyup="this.value=this.value.replace(/\D/g,'');changeFlag = true;" v-model="cashMoney">
                        </div>
                        <p class="h_tip_text" :style="cash ? 'display:block' : 'display:none' ">最高设置金额9999元</p>
                    </li>
                    <li class="clearfix pb15">
                        <label class="type1 w_100">交易规则：</label>
                        <div class="h_house_r">
                            <div class="clearfix">
                                <p class="price_con lh40">房客需支付每日价格的<strong class="size_bold">100%</strong>作为每日订金。</p>
                            </div>
                        </div>
                    </li>
                    <li class="clearfix pb15 new_rule">
                        <label class="type1 w_100">房客退订规则：</label>
                        <div class="h_house_r clearfix rule_wrap_price"  style="height: 218px; display: inline-block;">
                            <ul class="rule_detail">
                                <li>
                                    <h3>预订成功</h3>
                                    <p>无需支付违约金</p>
                                </li>
                                <li>
                                    <h3>入住前 3 天 14:00 后取消</h3>
                                    <p>违约金 = 100%首日房费 + 20%剩余房费</p>
                                </li>
                                <li>
                                    <h3>入住当天 14:00 后取消</h3>
                                    <p>违约金 = 100%次日房费 + 20%剩余房费</p>
                                </li>
                            </ul>
                            <ul class="rule_tips">
                                <li>已入住日期的房费正常结算</li>
                                <li>入住后退订时，清洁费正常结算</li>
                                </ul>
                                <i style="top: 116px;"></i>
                        </div>
                    </li>
                    <li style="height:100px"></li>
                </ul>
            </div>
        </div>
        <div class="w_960 tip_mt"  style="margin-bottom:18px; position:relative" >
            <span class="check_css3">
                <input type="checkbox" class="input_check" id="check3" v-model="ischecked" @click="ischeck">
                <label for="check3"></label>
            </span>
            我已阅读并同意
            <a href="javascript:;" class="col_pink">《房东规则》</a>
            、
            <a href="javascript:;" class="col_pink">《房源上线标准》</a>
            <div class="error_panel" v-show="checked_err" style="top:3px;left:310px;">
                <i class="iconfont icon-jinggao"></i>
                <div class="el-alert_content">
                    <span class="el-alert_title">您未同意相关条款，不可发布房源</span>
                </div>
            </div>
        </div>
        <div class="w_960 pb20 clearfix" style="margin-bottom:20px;">
            <a href="javascript:;" class="keep_btn yh fl" @click="subBtn">确认发布</a>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            err_price:false,//日价填写错误提示信息
            err_price_content:"",//日价错误信息提示语  请填写房源价格  请输入1～99999以内整数金额  [1-9]{1}\d{0,4}
            price:"",//日价
            price_2:"",//节假日
            price_3:"",//特价房
            cash:0,//是否收取押金 默认0 不收取
            cashMoney:"",//押金金额
            cash_info:false,//鼠标移入押金信息提示
            ischecked:true,//是否选中阅读协议 默认1 选中
            checked_err:false,//是否选中阅读协议 错误提示
        }
    },
    props:["stepToChild","hid"],
    created() {
        if(this.hid != 0){
            this.load();
        }
    },
    methods: {
        load(){
            this.axios.get("/infoSearch",{params:{hid:this.hid}})
            .then(res=>{
                if(res.data.data.length > 0)this.$emit("had",5);
                this.price=res.data.data[0].normalPrice;
                this.cash=res.data.data[0].isCash;
                if(res.data.data[0].cashMoney==0){//判断押金金额是否为空
                    this.cashMoney="";
                }else{
                    this.cashMoney=res.data.data[0].cashMoney;
                }
                if(res.data.data[0].festivalPrice==0){//判断节假日价格是否为空
                    this.price_2="";
                }else{
                    this.price_2=res.data.data[0].festivalPrice;
                }
                if(res.data.data[0].specialPrice==0){//判断特价房价格是否为空
                    this.price_3="";
                }else{
                    this.price_3=res.data.data[0].specialPrice;
                }
            })
        },
        // 获取焦点日价错误信息隐藏
        iserr(){
            this.err_price=false;
            this.err_price_2=false;
            this.err_price_3=false;
        },
        // 鼠标移入问号显示押金提示
        cash_info_show(){
            this.cash_info=true;
        },
        // 鼠标移入问号隐藏押金提示
        cash_info_hidden(){
            this.cash_info=false;
        },
        // 判断是否收取押金
        iscash(e){
            var _this=e.target
            if(_this.dataset.val==1){
                this.cash=1
            }else if(_this.dataset.val==0){
                this.cash=0
            }
        },
        //点击隐藏协议提示信息
        ischeck(){
            this.checked_err=false;
        },
        // 提交按钮
        subBtn(){
            // 如果日价为空
            if(!this.price){
                this.err_price=true;
                this.err_price_content="请填写房源价格";
                return;
            }else if(!/^[1-9]{1}\d{0,4}$/.test(this.price)){ //1～99999
                this.err_price=true;
                this.err_price_content="请输入1～99999以内整数金额";
                return;
            }else if(!this.ischecked){
                this.checked_err=true;
                return;
            }else{
                if(!this.price_2){//节假日价格为空
                    this.price_2=0;
                }
                if(!this.price_3){//特价房为空
                    this.price_3=0;
                }
                if(!this.cashMoney){//押金金额为空
                    this.cashMoney=0
                }
                var obj={
                    normalPrice:this.price,//日价
                    festivalPrice:this.price_2,//节假日价格
                    specialPrice:this.price_3,//特价房
                    isCash:this.cash,//是否收押金
                    cashMoney:this.cashMoney,//押金金额
                    hid:this.hid,//hid
                    isReleaseStatus:1//是否完成发布
                }
                // console.log('日价'+obj.normalPrice)
                // console.log('节假日价格'+obj.pestivalPrice)
                // console.log('特价房'+obj.specialPrice)
                // console.log('是否收押金'+obj.isCash)
                // console.log('押金金额'+obj.cashMoney)
                this.axios.post("/infoSave",obj)
                .then(result=>{
                    if(result.data.code==1){
                        this.$router.push("/adminbaseinfo")
                    }else{
                        alert("系统错误，万分抱歉")
                    }
                })
            }
        }
    },
}
</script>
<style scoped>
.price {
  background-color: #f5f5f5 !important;
  height: 100%;
  margin-top: 20px;
  display: none;
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
.pb15{
    padding-bottom:15px; 
}
.mt20{
    margin-top: 20px;
}
.h_tit {
    border-bottom: 1px solid #eee;
    height: 53px;
    line-height: 53px;
    margin: 0 10px;
    color: #30c3a6;
    padding-left: 10px;
    font-weight: bold;
}
.h_house_info {
    padding: 35px 0 0 33px;
}
.h_house_info li label.type1 {
    line-height: 40px;
}
.h_house_info li label.w_100 {
    width: 100px;
}
.h_house_r {
    width: 780px;
    float: left;
}
.h_input_box {
    position: relative;
    float: left;
    width: 140px;
    height: 38px;
    line-height: 38px;
    border: 1px solid #d1d1d1;
    margin-right: 10px;
    border-radius: 2px;
}
.h_input_box input {
    color: #2c3e50;
    width: 70px;
    height: 35px;
    line-height: 35px;
    border: 1px solid #fff;
    vertical-align: top;
    padding-left: 10px;
    font-family: "Microsoft YaHei";
    font-size: 14px;
    outline: none;
}
.h_input_text {
    display: block;
    position: absolute;
    right: 10px;
    height: 38px;
    top: 0;
}

.h_tip_text {
    float: left;
    line-height: 40px;
    color: #959ea7;
    font: normal 12px/40px "simsun";
}
.h_house_info li label {
    display: block;
    float: left;
    color: #959ea7;
}
.hide_width {
    float: left;
}
.h_check_cur {
    background-position: 0 -314px;
    font-weight: bold;
}
.h_check, .h_check_cur {
    float: left;
    height: 40px;
    line-height: 40px;
    background: url("../../../public/images/fb_sprice.png") no-repeat 0 -281px;
    padding-left: 23px;
    cursor: pointer;
}
#cashpledge_more {
    width: 20px !important;
    margin-top: 13px;
}
.yj_ico {
    display: inline-block;
    background: url("../../../public/images/ask.png") no-repeat;
    width: 14px;
    height: 14px;
    cursor: pointer;
    margin-left: 5px;
}
.yj_online {
    position: absolute;
    top: 29px;
    left: -98px;
    width: 450px;
    background: #f3f3f3;
    padding: 20px 15px 10px;
    color: #b5b5b5;
    z-index: 20;
}
.yj_top_arrow {
    position: absolute;
    z-index: 2;
    top: -13px;
    left: 225px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 15px solid #f3f3f3;
}
.ml90 {
    margin-left: 90px;
}
/* 押金选中样式 */
.h_check_cur {
    background-position: 0 -314px;
    font-weight: bold;
}
.price_con {
    float: left;
    width: 353px;
    word-break: break-all;
}
.lh40 {
    line-height: 40px;
}
.size_bold {
    font-weight: bold;
}
.rule_wrap_price ul.rule_detail li:not(:last-child)::after {
    display: inline-block;
    content: "";
    width: 1px;
    height: 40px;
    background-color: #212121;
    position: absolute;
    top: 30px;
    left: 5px;
}
.rule_wrap_price ul.rule_detail li:before {
    display: inline-block;
    content: "";
    background: url('../../assets/img/clock.png') no-repeat center;
    background-size: 100% 100%;
    width: 10px;
    height: 10px;
    position: absolute;
    left: 0px;
    top: 15px;
}
.rule_wrap_price {
    margin-left: 40px;
    background-color: #f5f5f5;
    width: 278px;
    position: relative;
    top: 8px;
    left: 0px;
}
.rule_wrap_price ul.rule_detail {
    margin: 20px 15px 10px 15px;
}
.rule_wrap_price ul li {
    padding: 10px 0px 10px 14px;
    position: relative;
}
.rule_wrap_price ul.rule_detail li > h3 {
    font-size: 12px;
    padding-left: 5px;
}
.rule_wrap_price ul.rule_detail li > p {
    font-size: 12px;
    color: #757575;
    padding-left: 5px;
}
.rule_wrap_price ul.rule_tips {
    padding: 10px 48px 10px 48px;
    background-color: #eee;
}
.rule_wrap_price i {
    display: inline-block;
    background-color: #f5f5f5;
    border-width: 10px;
    border-style: solid;
    border-color: #fff #f5f5f5 #fff #fff;
    position: absolute;
    margin-top: -115px;
    left: -20px;
}
.rule_wrap_price ul.rule_tips li {
    font-size: 12px;
    color: #8B2347;
    list-style: disc;
    padding: 0;
}
.tip_mt {
    margin-top: -10px;
    margin-bottom: 18px;
}
.w_960 {
    margin: 0 auto;
    width: 960px;
}
.check_css3{
    margin: 20px auto;
    position: relative;
    margin-right: 10px;
    top: 4px;
}
.check_css3 .input_check {
    position: absolute;
    width: 20px;
    height: 20px;
    opacity: 0;
    z-index: 9999;
    cursor: pointer;
}
.col_pink {
    color: #39b54a!important;
}
.check_css3 .input_check:checked+label {
    background: #39b54a;
    border: 1px solid #39b54a;
}
.check_css3 .input_check:checked+label:after {
    content: "";
    position: absolute;
    left: 4px;
    bottom: 12px;
    width: 9px;
    height: 4px;
    border: 1px solid #fff;
    border-top-color: transparent;
    border-right-color: transparent;
    transform: rotate(-45deg);
}
.check_css3 .input_check+label {
    cursor: pointer;
    border-radius: 2px;
    display: inline-block;
    width: 16px;
    height: 16px;
    border: 1px solid #bdbdbd;
}
.yh {
    font-family: "Microsoft YaHei";
}
.fl {
    float: left;
}
.keep_btn, .keep_btn:hover {
    display: block;
    width: 180px;
    height: 44px;
    line-height: 44px;
    background: #39b54a;
    text-align: center;
    color: #fff;
    font-size: 18px;
    text-decoration: none;
    border-radius: 2px;
}
</style>