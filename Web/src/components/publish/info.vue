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
              <span class="add_btn">+ 添加新地址</span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹出层 -->
    <!--  -->
    <div class="o_mask" style="display:none">
      <div class="o_warp">
        <div class="o_tit">
          <h4 class="o_h4">房源地址</h4>
        </div>
        <div class="o_main">
          <div class="o_address clearfix">
            <div style="position:relative;">
              <div style="width:12%;display:inline-block;">城市及地区:</div>
              <div class="o_addTop">
                <div class="o_addTop_l">北京市</div>
                <div class="o_addTop_r">
                  <select id="city" v-model="selectedAreaId">
                    <option
                      v-for="(area,i) of areaList"
                      :key="i"
                      :value="area.id"
                      v-text="area.aTypeName"
                    ></option>
                  </select>
                </div>
              </div>
            </div>
            <div class="o_addBottom">
              <div style="position:relative;">
                <div style="width: 12%;display: inline-block;">详细地址：</div>
                <div style="width: 50%;display: inline-block;vertical-align: top;">
                  <div style="font-size: 12px;color: #757575;">无需再填省市区。例：中山路阳光小区8号楼2单元</div>
                  <input
                    class="o_add_detail"
                    style="margin:5px 0 10px 0;width: 330px;"
                    type="text"
                    value
                    placeholder="请填写"
                    maxlength="100"
                  />
                </div>
              </div>
              <div style="position:relative;">
                <div style="width: 12%;display: inline-block;">门牌号：</div>
                <div style="width: 50%;display: inline-block;vertical-align: top;">
                  <div style="font-size: 12px;color: #757575;">房客不可见。例：201房</div>
                  <input
                    class="o_house_number"
                    style="margin:5px 0 10px 0;width: 330px;"
                    type="text"
                    value
                    placeholder="请完善"
                    maxlength="50"
                  />
                </div>
              </div>
              <!-- 地图 -->
              <!--  -->
              <div style="width:700px;height:360px;background:#e8e8e8"></div>
              <!-- 按钮 -->
              <div style="text-align: center;">
                <a href="#" class="o_sure_big f18 site_submit_btn" id="site_submit">确定</a>
                <a href="#" class="o_sure_big f18 site_cancle_btn" id="site_cancle">取消</a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 房源基本信息 -->
    <!--  -->
    <div class="h_wrap">
        <h4 class="h_tit">房源基本情况</h4>
        <div class="h_house_info">
            <ul>
                <li class="clearfix" style="padding-bottom:15px;">
                    <label class="type w_103" style="width: 100px;color:#000;">房屋类型：</label>
                    <select id="house_type" class="h_input_box house_type" v-model="selectedType">
                        <option v-for="(item,i) of houseList"
                    :key="i" :value="item.id" v-text="item.typeName"></option>
                    </select>
                </li>
                <li class="clearfix" style="padding-bottom:15px;">
                    <label class="type w_103" style="width: 100px;color:#000;">出租类型：</label>
                    <select id="rent_type" class="h_input_box house_type" v-model="rentType">
                        <option v-for="(item,i) of rentList"
                    :key="i" :value="item.id" v-text="item.typeName"></option>
                    </select>
                </li>
                <li class="clearfix" style="padding-bottom:15px;">
                    <label class="type1 w_103" style="color:#000;">房屋户型：</label>
                    <div class="h_house_r clearfix" style="margin-left:100px;">
                        <select  class="h_input_box sel" v-model="room">
                            <option value="item"  v-for="(item,i) of 10" :key="i" v-text="item"></option>
                        </select>
                        <span class="h_input_span">室</span>
                        <select  class="h_input_box sel" v-model="parlor">
                            <option value="i"  v-for="(item,i) of 10" :key="i" v-text="i"></option>
                        </select>
                        <span class="h_input_span">厅</span>
                        <select  class="h_input_box sel" v-model="bathroom">
                            <option value="i"  v-for="(item,i) of 10" :key="i" v-text="i"></option>
                        </select>
                        <span class="h_input_span">卫</span>
                        <select  class="h_input_box sel" v-model="kitchen">
                            <option value="i"  v-for="(item,i) of 10" :key="i" v-text="i"></option>
                        </select>
                        <span class="h_input_span">厨</span>
                        <select  class="h_input_box sel" v-model="balcony">
                            <option value="item"  v-for="(item,i) of 10" :key="i" v-text="i"></option>
                        </select>
                        <span class="h_input_span">阳台</span>
                    </div>
                </li>
                <li class="clearfix" style="padding-bottom:15px;">
                    <label class="type1 w_103" id="room_area_title" style="color:#000;">出租面积：</label>
                    <div class="h_house_r clearfix" style="margin-left: 103px;"></div>
                </li>
            </ul>
        </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      address: "",
      areaList: [],
      selectedAreaId: "",
      houseList:[],
      selectedType:"",
      rentType:"",
      rentList:[],
      room:1,  //室
      parlor:1, //厅
      bathroom:1,//卫
      kitchen:1,//厨
      balcony:0,//阳台
    };
  },
  created() {
    this.load();
  },
  methods: {
    load() {
        this.axios
        .get("area", { params: { aParentId: 1, aType: 0 } })
        .then(result => {
          this.areaList = result.data;
          this.selectedAreaId = result.data[0].id;
        });
        this.axios.get("houseType",{params:{dicType:1 }})
        .then(result=>{
            this.houseList=result.data;
            this.selectedType = result.data[0].id;
            console.log(this.houseList);
        });
        this.axios.get("houseType",{params:{dicType:2 }})
        .then(result=>{
            this.rentList=result.data;
            this.rentType = result.data[0].id;
            console.log(this.rentList);
        })
    }
  }
};
</script>
<style scoped>
@import url("../../assets/css/font_zl650w5ajr/iconfont.css");

body,
div,
dl,
dt,
dd,
ul,
ol,
li,
h1,
h2,
h3,
h4,
h5,
h6,
hr,
pre,
code,
form,
input,
button,
fieldset,
textarea,
p,
blockquote,
th,
td {
  margin: 0;
  padding: 0;
}
ol,
ul {
  list-style: none;
}
a,
a:hover {
  text-decoration: none;
}
.info_info_wrap {
  background-color: #f5f5f5 !important;
  height: 100%;
}
html,
body {
  height: 100%;
}
.info_info_wrap {
  height: 100%;
}

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
/* 房源地址 */
/*  */
.h_wrap {
  background: #fff;
  width: 960px;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 20px;
  margin-top: 20px;
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
.address_list li {
  padding: 8px 0 8px 20px;
  line-height: 52px;
  cursor: pointer;
}
.address_list .select_bg {
  background: #fafafa;
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
.add_btn,
.add_btn:hover {
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
  transition: all 0.2s ease 0s;
}
.add_btn:hover {
  background-color: #39b54a;
  color: #fff;
}

/* 弹出层 */
.o_mask {
  position: fixed;
  top: 0px;
  left: 0px;
  width: 100%;
  height: 100%;
  background: #2c3e50b5;
  z-index: 1000;
}
.o_warp {
  position: absolute;
  width: 800px;
  top: 200px;
  left: 50%;
  background: #fff;
  z-index: 2000;
  font-family: "微软雅黑";
  border: none;
  left: 551.5px;
  top: 122px;
}
.o_tit {
  position: relative;
  width: 800px;
  height: 54px;
  line-height: 54px;
  border-bottom: 1px solid #eee;
}
.o_main {
  width: 700px;
  margin: 10px auto 10px;
}
.o_h4 {
  font-family: "微软雅黑";
  font-size: 14px;
  padding-left: 20px;
  text-align: center;
}
.o_addTop {
  width: 50%;
  display: inline-block;
  padding-bottom: 12px;
}
.o_addTop .o_addTop_l {
  width: 30%;
  height: 40px;
  font-size: 14px;
  box-sizing: border-box;
  display: inline-block;
  margin-left: 20px;
}
.o_addTop .o_addTop_r {
  width: 50%;
  height: 40px;
  display: inline-block;
}
.o_addTop .o_addTop_r select {
  font-size: 14px;
  height: 40px;
  padding-left: 15px;
}
.o_add_detail,
.o_house_number {
  width: 330px;
  height: 38px;
  line-height: 38px;
  border: 1px solid #d1d1d1;
  padding: 0 10px;
  outline: none;
  margin: 5px 0 10px 0;
  border-radius: 2px;
  font-size: 14px;
  font-family: "Microsoft YaHei";
}
.site_submit_btn {
  display: inline-block;
  background-color: #39b54a;
  margin-top: 40px;
  width: 90px;
  height: 35px;
  font-size: 14px;
  line-height: 36px;
  margin-right: 20px;
  color: #fff;
}
.site_cancle_btn {
  display: inline-block;
  background-color: #3cc950a1;
  color: #007d12fc;
  margin-top: 40px;
  width: 90px;
  height: 35px;
  font-size: 14px;
  line-height: 36px;
  margin-right: 20px;
}
.h_wrap {
    background: #fff;
    width: 960px;
    margin-top: 20px;
    margin-left: auto;
    margin-right: auto;
    margin-bottom: 20px;
    font: normal 14px/22px "Microsoft YaHei";
    color: #2c3e50;
}
.h_house_info {
    padding: 35px 0 0 33px;
}
.h_house_info li label.type {
    line-height: 50px;
}
.h_house_info li label {
    display: block;
    float: left;
}
.h_input_box {
    position: relative;
    width: 120px;
    float: left;
    width: 140px;
    height: 38px;
    line-height: 38px;
    border: 1px solid #d1d1d1;
    margin-right: 10px;
    border-radius: 2px;
    font-size: 14px;
}
.h_house_r{
    width: 780px;
    float: left;
}
.h_house_info li label.type{
    line-height: 50px;
}
.h_house_info li label.type1{
    line-height: 40px;
}
.h_house_info li label.w_103{
    width: 100px;
}
.h_house_info .h_input_span{
    position: relative;
    float: left;
    display: block;
    height: 38px;
    line-height: 38px;
    margin-right: 5px;
}
.h_input_box.sel{
    width: 118px;
}
</style>