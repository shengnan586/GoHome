<template>
  <div>
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
  </div>
</template>
<script>
export default {
    
}
</script>
<style scoped>
@import url("../../assets/css/font_zl650w5ajr/iconfont.css");
/* 图标样式 */
.icon-icon-test3::before {
  font-size: 26px;
  background-color: #39b54a;
  color: #fff;
  border-radius: 50%;
}
.icon-icon-test::before,
.icon-icon-test1::before,
.icon-icon-test2::before,
.icon-icon-test4::before {
  background-color: #fff;
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
.h_step_text_g,
.h_step_text {
  position: absolute;
  top: -8px;
  width: 65px;
  text-align: center;
  color: #959ea7;
}
.h_step_text_g {
  color: #39b54a;
}
.h_pos1 {
  left: -25px;
}
.h_pos2 {
  left: 178px;
}
.h_pos3 {
  left: 378px;
}
.h_pos4 {
  left: 582px;
}
.h_pos5 {
  left: 783px;
}
</style>>
    
</style>