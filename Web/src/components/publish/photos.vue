<template>
    <div class="photos">
        <table></table>
        <div class="h_wrap">
            <h4 class="h_tit">
                <div style="float:left;">房源照片</div>
            </h4>
            <div>
                <div class="h_pic_tip">
                    请不要上传修改痕迹明显、拉伸变形、有水印、有联系方式或品牌宣传等内容的照片。<br>
                    <span style="color:#f00">请认真查看照片范例和要求说明，避免因为审核不通过而耽误上线时间。</span>
                </div>
                <div class="h_pic_list clearfix">
                    <span style="font-weight:bold">房源图片:</span>
                    <p style="color:#757575;">根据你填写的户型和床铺信息，必须上传</p>
                    <ul>
                        <li class="pho_bg">
                            <div style="cursor:pointer">
                                <img src="" alt="" style="width:180px; weight:180px;heigth:180px;cursor:pointer">
                            </div>
                        </li>
                        <li class="fileNow">
                            <input type="file" class="file_input" @change="file($event)">
                            <div class="h_add_pic"></div>
                        </li>
                    </ul>
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
            imgs:[]
        }
    },
    methods: {
        subBtn(){//提交

        }
    },
}
</script>
<style scope>
.photos {
  background-color: #f5f5f5 !important;
  height: 100%;
  /* display: none; */
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
    margin-top: 20px;
    margin-bottom: 20px;
    font: normal 14px/22px "Microsoft YaHei";
    color: #2c3e50;
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
.h_pic_tip {
    padding: 30px 0 6px 54px;
    margin-left: 20px;
}
.h_pic_list {
    padding: 15px 0 6px 54px;
}
.h_pic_list li {
    position: relative;
    float: left;
    width: 180px;
    height: 180px;
    margin: 0 30px 20px 0;
    padding: 5px;
    border: 1px solid #fff;
    background: #fff;
}
.h_pic_list li.pho_bg:hover{
    border: 1px solid #d6d6d6;
    box-shadow: 1px 1px 3px 2px #d1d1d1;
}
.file_input {
    z-index: 6;
    filter: Alpha(opacity=0);
    opacity: 0;
}
.h_add_pic {
    z-index: 5;
    background: url("../../../public/images/add_pic.png") no-repeat;
}
.h_add_pic, .file_input {
    position: absolute;
    left: 5px;
    top: 5px;
    width: 180px;
    height: 180px;
    cursor: pointer;
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
.w_960 {
    margin: 0 auto;
    width: 960px;
}
</style>