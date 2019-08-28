<template>
  <div class="info_info_wrap" :style="{display:stepToChild==1?'block':'none'}" >
    <!--  -->
    <!-- 房源地址 -->
    <table></table>
    <div class="h_wrap">
      <h4 class="h_tit">房源地址</h4>
      <div class="address_box">
        <div class="clearfix">
          <div class="address_text">房源位于：</div>
          <div class="address_list" style="position:relative;">
            <ul class="address_ul">
              <li class="clearfix select_bg" v-if="address">
                <div class="select_text" v-text="address" :title="address"></div>
              </li>
            </ul>
            <div class="address_btm clearfix">
              <span class="add_btn" @click="pop">+ 添加新地址</span>
            </div>
            <div
              class="error_panel"
              v-show="err_address"
              style="display: block;top:20px;left:140px;"
            >
              <i class="iconfont icon-jinggao"></i>
              <div class="el-alert_content">
                <span class="el-alert_title">请完善房源地址</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 弹出层 -->
    <!--  -->
    <div class="o_mask" v-show="isShow">
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
                    placeholder="请填写"
                    maxlength="100"
                    v-model="details_address"
                    @focus="errshow_detail"
                  />
                </div>
                <div
                  class="error_panel"
                  v-show="err_detail"
                  style="display: block;top:28px;left:450px;"
                >
                  <i class="iconfont icon-jinggao"></i>
                  <div class="el-alert_content">
                    <span class="el-alert_title">请填写详细地址</span>
                  </div>
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
                    v-model="house_num"
                    placeholder="请完善"
                    maxlength="50"
                    @focus="err_number"
                  />
                </div>
                <div
                  class="error_panel"
                  v-show="err_num"
                  style="display: block;top:28px;left:450px;"
                >
                  <i class="iconfont icon-jinggao"></i>
                  <div class="el-alert_content">
                    <span class="el-alert_title">请填写门牌号</span>
                  </div>
                </div>
              </div>
              <!-- 地图 -->
              <!--  -->
              <div style="width:700px;height:360px;background:#e8e8e8">
                <pmap style="width:100%;height:100%;" :val="val"></pmap>
              </div>
              <!-- 按钮 -->
              <div style="text-align: center;">
                <a
                  href="javascript:;"
                  class="o_sure_big f18 site_submit_btn"
                  id="site_submit"
                  @click="submit"
                >确定</a>
                <a
                  href="javascript:;"
                  class="o_sure_big f18 site_cancle_btn"
                  id="site_cancle"
                  @click="cancle"
                >取消</a>
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
          <!-- 房屋类型 -->
          <li class="clearfix" style="padding-bottom:15px;">
            <label class="type w_103" style="width: 100px;color:#000;">房屋类型：</label>
            <select id="house_type" class="h_input_box house_type" v-model="selectedId">
              <option
                v-for="(item,i) of houseList"
                :key="i"
                :value="item.id"
                v-text="item.typeName"
              ></option>
            </select>
          </li>
          <!-- 出租类型 -->
          <li class="clearfix" style="padding-bottom:15px;">
            <label class="type w_103" style="width: 100px;color:#000;">出租类型：</label>
            <select id="rent_type" class="h_input_box house_type" v-model="rentId">
              <option v-for="(item,i) of rentList" :key="i" :value="item.id" v-text="item.typeName"></option>
            </select>
          </li>
          <!-- 房屋户型 -->
          <li class="clearfix" style="padding-bottom:15px;">
            <label class="type1 w_103" style="color:#000;">房屋户型：</label>
            <div class="h_house_r clearfix" style="margin-left:100px;">
              <select class="h_input_box sel" v-model="room">
                <option :value="item" v-for="(item,i) of 10" :key="i" v-text="item"></option>
              </select>
              <span class="h_input_span">室</span>
              <select class="h_input_box sel" v-model="parlor">
                <option :value="i" v-for="(item,i) of 10" :key="i" v-text="i"></option>
              </select>
              <span class="h_input_span">厅</span>
              <select class="h_input_box sel" v-model="bathroom">
                <option :value="i" v-for="(item,i) of 10" :key="i" v-text="i"></option>
              </select>
              <span class="h_input_span">卫</span>
              <select class="h_input_box sel" v-model="kitchen">
                <option :value="i" v-for="(item,i) of 10" :key="i" v-text="i"></option>
              </select>
              <span class="h_input_span">厨</span>
              <select class="h_input_box sel" v-model="balcony">
                <option :value="i" v-for="(item,i) of 10" :key="i" v-text="i"></option>
              </select>
              <span class="h_input_span">阳台</span>
            </div>
          </li>
          <!-- 出租面积 -->
          <li class="clearfix" style="padding-bottom:15px;position:relative;">
            <label class="type1 w_103" style="color:#000;">出租面积：</label>
            <div class="h_house_r clearfix">
              <div class="h_input_box" style="width: 120px;">
                <input
                  type="text"
                  v-model="area"
                  placeholder="请填写"
                  onkeyup="this.value=this.value.replace(/[^\d]/g,'')"
                  onafterpaste="this.value=this.value.replace(/[^\d]/g,'') "
                  maxlength="4"
                  @focus="err_areaShow"
                />
              </div>
              <span class="h_input_span">m²</span>
            </div>
            <div class="error_panel" v-show="err_area" style="top:8px;left:270px;">
              <i class="iconfont icon-jinggao"></i>
              <div class="el-alert_content">
                <span class="el-alert_title">请填写出租面积</span>
              </div>
            </div>
          </li>
          <li class="clearfix" style="padding-bottom:15px;">
            <label class="type w_103" style="width: 100px;color:#000;">卫生间类型：</label>
            <select class="h_input_box" v-model="bathId">
              <option v-for="(item,i) of bathList" :key="i" :value="item.id" v-text="item.typeName"></option>
            </select>
          </li>
          <li class="clearfix" style="padding-bottom:15px;position:relative">
            <label class="type w_103" style="width: 100px;color:#000;">床铺信息：</label>
            <div class="bed_btns" style="margin-left:100px;" v-if="bed_btn.length>0 ">
              <div class="bed_btn" v-for="(item,i) of bed_btn" :key="i">
                <span class="bed_content" v-text="item.bedType"></span>
                <span class="bed_close" :data-id="i" @click="close">x</span>
              </div>
            </div>
            <div class="bed_select">
              <select class="h_input_box" v-model="bedTypeId">
                <option v-for="(item,i) of bedList" :key="i" :value="item.id" v-text="item.bedType"></option>
              </select>
              <div class="add_btn" style="width:100px;" @click="add_bed">+ 添加</div>
            </div>
            <div class="error_panel" v-show="err_bed" style="display: block;top:15px;left:100px;">
              <i class="iconfont icon-jinggao"></i>
              <div class="el-alert_content">
                <span class="el-alert_title">请填写床铺类型</span>
              </div>
            </div>
          </li>
          <li class="clearfix" style="padding-bottom:15px;">
            <label class="type1 w_103" style="color:#000;">宜居人数：</label>
            <span style="line-height: 40px;font-size:12px;color:#757575">
              请填写
              <span style="color:#39b54a;">最适宜居住的人数</span>，而不是最多入住人数。（如有需要，请在“加客设置”中填写）
              <p id="tantnumDesc" style="margin-left: 103px;font-size:12px;color:#757575">
                根据你填写的床铺信息，建议宜居人数为
                <span style="color: #ff0000;">2人</span>
              </p>
            </span>
            <div>
              <select
                v-model="peoples"
                class="h_input_box"
                style="margin-left: 100px;margin-top: 10px;"
              >
                <option :value="i" v-for="(item,i) of 10" :key="i" v-text="i"></option>
              </select>
              <span style="margin:10px 10px 0 0;float: left;line-height: 38px;">人</span>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <div class="w_960 clearfix" style="padding-bottom:15px;">
      <a href="javascript:;" class="keep_btn" @click="subBtn">保存并继续</a>
    </div>
  </div>
</template>
<script>
import map from "../productlist/map.vue"
export default {
  data() {
    return {
      uid:sessionStorage.getItem("userid"),//用户名
      hid1:0,
      address: "", //房源总地址
      err_address: false, //房源总地址提示信息
      areaList: [], //地区列表
      selectedAreaId: "", //地区id
      houseList: [], //房屋类型列表
      selectedId: "", //所选房屋类型id
      rentId: "", //所选出租类型id
      rentList: [], //出租类型列表
      bathId: "", //所选卫生间类型id
      bathList: [], //卫生间类型id
      room: 1, //室
      parlor: 1, //厅
      bathroom: 1, //卫
      kitchen: 1, //厨
      balcony: 0, //阳台
      area: "", //出租面积
      bedTypeId: "", //选中床铺id
      bedList: [], //床铺列表
      bed_btn: [], //选中床铺数组
      peoples: 2, //宜居人数
      isShow: false, //是否显示弹出层
      details_address: "", //详细地址
      err_detail: false, //详细地址提示信息
      house_num: "", //门牌号
      err_num: false, //门牌号提示信息
      err_area: false, //出租面积为空提示
      err_bed: false, //床铺类型为空提示,
      val:""
    };
  },
  props: ["stepToChild","hid"],
  created() {
    this.load();
    if(this.hid!=0){
      this.search();
    }
  },
  methods: {
    load() {
      this.axios
        .get("area", { params: { aParentId: 1, aType: 0 } })
        .then(result => {
          this.areaList = result.data;
          this.selectedAreaId = result.data[0].id;
        });
      this.axios.get("houseType", { params: { dicType: 1 } }).then(result => {
        this.houseList = result.data;
        this.selectedId = result.data[0].id;
      });
      this.axios.get("houseType", { params: { dicType: 2 } }).then(result => {
        this.rentList = result.data;
        this.rentId = result.data[0].id;
      });
      this.axios.get("houseType", { params: { dicType: 3 } }).then(result => {
        this.bathList = result.data;
        this.bathId = result.data[0].id;
      });
      this.axios.get("bedType").then(result => {
        this.bedList = result.data;
        this.bedTypeId = result.data[0].id;
      });
    },
    search(){
      this.axios.get("/search",{params:{id:this.hid}})
      .then(result=>{
        this.address=result.data.data[0].address;
        this.selectedId=result.data.data[0].houseTypeId;
        this.rentId=result.data.data[0].rentalTypeId;
        this.bathId=result.data.data[0].toiletId;
        this.room=result.data.data[0].bedroom;
        this.parlor=result.data.data[0].saloon;
        this.bathroom=result.data.data[0].toilet;
        this.kitchen=result.data.data[0].kitchen;
        this.balcony=result.data.data[0].balcony;
        this.area=result.data.data[0].roomSize;
        this.peoples=result.data.data[0].peopleNumber;
        var bid=result.data.data[0].bId;
		    for(var i=0;i<bid.length;i++){
			    this.bed_btn.push({
				    id:bid[i]
			    })
			    for( var j=0;j<this.bedList.length;j++){
				    if(this.bed_btn[i].id==this.bedList[j].id){
					      this.bed_btn[i].bedType = this.bedList[j].bedType
				    }
			    }
		    }
      });
    },
    pop() {
      this.isShow = true;
      this.err_detail = false;
      this.err_num = false;
      this.err_address = false;
    },
    // 弹出框信息
    submit() {
      if (!this.details_address) {
        this.err_detail = true;
        return;
      } else if (!this.house_num) {
        this.err_num = true;
      } else {
        var detail;
        for (var i = 0; i < this.areaList.length; i++) {
          if (this.areaList[i].id == this.selectedAreaId) {
            detail = this.areaList[i].aTypeName;
            break;
          }
        }
        this.address =
          "北京市" + detail + this.details_address + this.house_num;
        this.isShow = false;
        this.details_address = this.house_num = "";
      }
    },
    // 删除所选床铺信息
    cancle() {
      this.isShow = false;
    },
    // 添加床铺信息
    add_bed() {
      this.err_bed = false;
      for (var i = 0; i < this.bedList.length; i++) {
        if (this.bedList[i].id == this.bedTypeId) {
          this.bed_btn.push({
            id: this.bedList[i].id,
            bedType: this.bedList[i].bedType
          });
          break;
        }
      }
    },
    // 床铺信息删除所选
    close(e) {
      this.bed_btn.splice(e.target.dataset.id, 1);
    },
    // 详细地址获取焦点警告隐藏
    errshow_detail() {
      this.err_detail = false;
    },
    // 门牌号获取焦点警告隐藏
    err_number() {
      this.err_num = false;
      var detail;
        for (var i = 0; i < this.areaList.length; i++) {
          if (this.areaList[i].id == this.selectedAreaId) {
            detail = this.areaList[i].aTypeName;
            break;
          }
        }
        this.val=
          "北京市" + detail + this.details_address;
    },
    // 出租面积获取焦点警告隐藏
    err_areaShow() {
      this.err_area = false;
    },
    subBtn() {
      if (!this.address) {
        this.err_address = true;
        return;
      } else if (!this.area) {
        this.err_area = true;
        return;
      } else if (this.bed_btn.length==0) {
        this.err_bed = true;
        return;
      } else {
        
        // var obj={
        //     roomSize:this.area,
        //     daId:{
        //         bedroom:this.room,
        //         saloon:this.parlor,
        //         toilet:this.bathroom,
        //         kitchen:this.kitchen,
        //         balcony:this.balcony
        //     },
        //     aId:this.selectedAreaId,
        //     address:this.address,
        //     houseTypeId:this.selectedId,
        //     rentalTypeId:this.rentId,
        //     toiletId:this.bathId,
        //     peopleNumber:this.peoples,
        //     bld:this.bedTypeId
        // }
        var obj = {
          houseTypeId: this.selectedId,
          rentalTypeId: this.rentId,
          roomSize: this.area,
          toiletId: this.bathId,
          peopleNumber: this.peoples,
          aId: this.selectedAreaId,
          address: this.address,
          bedroom: this.room,
          saloon: this.parlor,
          toilet: this.bathroom,
          kitchen: this.kitchen,
          balcony: this.balcony,
          bId: this.bed_btn,
          uid:this.uid
        };
        if (this.hid==0) {
          this.axios.post("/addhouse/addhouse", obj).then(result => {
            this.hid1=result.data.data;
            this.$emit("sendHid",this.hid1);
            this.$emit("step",1)
          });
        } else {
          obj.id = this.hid;
        //  console.log("房东"+sessionStorage.getItem("isHoster"));
          this.axios.post("/updatehouse", obj).then(result => {
            this.$emit("step",1);
            sessionStorage.setItem("isHoster",1);
         //   console.log("房东"+sessionStorage.getItem("isHoster"));
          });
       }
      }
    }
  },
  components:{
    pmap:map
  }
};
</script>
<style scoped>
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
  display:none;
}
html,
body {
  height: 100%;
}
.clearfix:after {
  content: ".";
  display: block;
  height: 0;
  clear: both;
  visibility: hidden;
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
  font-weight: bold;
  transition: background-color 0.3s linear;
}
.address_list .select_bg:hover {
  background-color: #f8f8f8;
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
  top: 50%;
  left: 50%;
  background: #fff;
  z-index: 2000;
  font-family: "微软雅黑";
  border: none;
  transform: translate(-50%,-50%);
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
  padding-left: 10px;
}
.h_house_r {
  width: 780px;
  float: left;
}
.h_house_info li label.type {
  line-height: 50px;
}
.h_house_info li label.type1 {
  line-height: 40px;
}
.h_house_info li label.w_103 {
  width: 100px;
}
.h_house_info .h_input_span {
  position: relative;
  float: left;
  display: block;
  height: 38px;
  line-height: 38px;
  margin-right: 5px;
}
.h_input_box.sel {
  width: 118px;
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
.bed_btns {
  margin-bottom: 20px;
}
.bed_btns .bed_btn {
  width: 100px;
  height: 38px;
  float: left;
  margin: 10px 10px 5px 0;
  line-height: 38px;
  background-color: #eeeeee;
  color: #000;
  border: 0;
  border-radius: 4px;
  transition: box-shadow 0.3s linear;
}
.bed_btns .bed_btn:hover {
  box-shadow: 2px 2px 5px 0px #888;
}
.bed_btns .bed_content {
  display: inline-block;
  width: 66px;
  height: 24px;
  margin-left: 10px;
  cursor: pointer;
}
.bed_btns .bed_close {
  color: #333;
  cursor: pointer;
}
.bed_select {
  margin-left: 100px;
  clear: both;
}
.w_960 {
  margin: 0 auto;
  width: 960px;
}
.keep_btn {
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