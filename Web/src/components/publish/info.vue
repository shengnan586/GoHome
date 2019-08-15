<template>
    <div class="info_info_wrap">
        <!-- 顶部 -->
        <div class="h_top_box">
            <div class="h_step_box">
                <ul class="clearfix"></ul>
                <div class="h_pos1 h_step_text_g">
                    <span class="iconfont icon-icon-test3"></span>
                    <p>房源信息</p>
                </div>
                <div class="h_pos2 h_step_text">
                    <span class="iconfont icon-icon-test4"></span>
                    <p>房源描述</p>
                </div>
                <div class="h_pos3 h_step_text">
                    <span class="iconfont icon-icon-test1"></span>
                    <p>配套设施</p>
                </div>
                <div class="h_pos4 h_step_text">
                    <span class="iconfont icon-icon-test"></span>
                    <p>真实照片</p>
                </div>
                <div class="h_pos5 h_step_text">
                    <span class="iconfont icon-icon-test2"></span>
                    <p>价格规则</p>
                </div>
            </div>
        </div>
        <!--  -->
        <!-- 房源地址 -->
        <div class="h_wrap">
            <h4 class="h_tit">房源地址</h4>
            <div class="address_box">
                <div class="clearfix">
                    <div class="address_text">房源位于：</div>
                    <div class="address_list">
                        <ul class="address_ul">
                            <li class="clearfix select_bg">
                                <div class="select_text" v-text="address" :title="address"></div>
                            </li>
                        </ul>
                    <div class="address_btm clearfix">
                        <span class="add_btn" @click="addBtn">添加新地址</span>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    data() {
        return {
            address:"河北石家庄桥西翡翠公园1号楼2单元，2102",
        }
    },
}
</script>
<style scoped>
@import url("../../assets/css/font_zl650w5ajr/iconfont.css");

body, div, dl, dt, dd, ul, ol, li, h1, h2, h3, h4, h5, h6, hr, pre, code, form, input, button, fieldset, textarea, p, blockquote, th, td {
    margin: 0;
    padding: 0;
}
ol, ul {
    list-style: none;
}

.info_info_wrap{
    background-color: #f5f5f5 !important;
}

.icon-icon-test3::before{
    font-size: 26px;
    background-color: #39b54a;
    color: #fff;
    border-radius: 50%;
}
.icon-icon-test::before,.icon-icon-test1::before,.icon-icon-test2::before,.icon-icon-test4::before{
    background-color:#fff;
    font-size: 24px;
}

.h_top_box {
    background: #fff;
    border-top: 1px solid #f6f6f6;
    height: 100px;
}
.h_step_box {
    position: relative;
    width: 808px;
    margin: 40px auto 0;
    background: #eeeeee;
    height: 2px;
    font: normal 14px/20px "Microsoft YaHei";
}
.clearfix:after {
    content: ".";
    display: block;
    height: 0;
    clear: both;
    visibility: hidden;
}
.h_step_text_g,.h_step_text{
    position: absolute;
    top: -8px;
    width: 65px;
    text-align: center;
    color: #959ea7;
}
.h_step_text_g{
    color:#39b54a;
}
.h_pos1{
    left:-25px;
}
.h_pos2{
    left:178px;
}
.h_pos3{
    left: 378px;
}
.h_pos4{
    left: 582px;
}
.h_pos5{
    left:783px ;
}
/* 房源地址 */
/*  */
.h_wrap {
    background: #fff;
    width: 960px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    margin-top:20px;
    font: normal 14px/22px "Microsoft YaHei";
    color: #2c3e50;
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
.address_box {
    padding: 28px 0 0 32px;
}
.address_text {
    float: left;
    width: 115px;
    color: #959ea7;
    padding-top: 8px;
}
.address_list {
    float: left;
    width: 794px;
}
.address_list li{
    padding: 8px 0 8px 20px;
    line-height: 52px;
    cursor: pointer;
}
.address_list .select_bg{
    background:#fafafa;
    font-weight: bold;
}
.select_text {
    float: left;
    width: 730px;
    height: 52px;
    display: block;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
}
.address_btm {
    padding: 10px 0 12px;
}
.add_btn, .add_btn:hover {
    display: block;
    width: 118px;
    height: 38px;
    border: 1px solid #39b54a;
    line-height: 38px;
    background-color: #fff;
    float: left;
    text-align: center;
    color: #39b54a;
    text-decoration: none;
    border-radius: 2px;
    cursor: pointer;
    transition:all 0.2s ease 0s;
}
.add_btn:hover{
    background-color:#39b54a;
    color:#fff;
}
</style>