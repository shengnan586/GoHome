<template>
  <div class="search">
    <div class="city" @mouseenter="enter" @mouseleave="leave">
      <div>{{selectedText}}
        <span class="icon iconfont icon-xiajiantou"></span>
      </div>
      <ul class="city-area" v-show="show" @click="selectedArea">
        <li v-for="(area,i) of areaList" :key="i" :data-value="area.id" :data-text="area.aTypeName">
          <a href="javascript:;" :data-value="area.id" :data-text="area.aTypeName">{{area.aTypeName}}</a>
        </li>
      </ul>
    </div>
    <div class="date_box">
      <laydate  @getValue="getDateValue" class="date_txt"></laydate>
      <i class="iconfont icon-rili"></i>
    </div>
    <button @click="Search">开始搜索</button>
  </div>
</template>
<script>
import layDate from "../laydate/laydate.vue";
export default {
  data() {
    return {
      areaList: [],
      selectedAreaId: "",
      show:false,
      selectedText:"请选择区县",
      orderDate:{}
    };
  },
  created() {
    this.load();
  },
  methods: {
     //获取时间控件返回的时间对象{入住时间、离开时间、天数}
    getDateValue(orderDate){
      this.orderDate=orderDate;
    },
    //搜索
    Search(){
      this.$router.push({
        name:"ProductList",
        query:{
          selectedText:this.selectedText,
          selectedAreaId:this.selectedAreaId,
          orderDate:this.orderDate
        }
      })
    },
    //选中区县
    selectedArea(e){
      this.selectedAreaId=e.target.dataset.value;
      this.selectedText=e.target.dataset.text;
      this.show=false;
    },
    //鼠标进入区县，显示区县列表
    enter(){
      this.show=true;
    },
    //鼠标离开区县，隐藏区县列表
    leave(){
      this.show=false;
    },
    //页面加载，加载区县列表
    load() {
      this.axios
        .get("area", { params: { aParentId: 1, aType: 0 } })
        .then(result => {
          this.areaList = result.data;
          //this.selectedAreaId = result.data[0].id;
        });
    },
  },
  components: { laydate: layDate }//时间控件
};
</script>
<style scoped>
@import url("../../assets/css/indexfont/font_cveuyt7cddb/iconfont.css");
.search {
  width: 790px;
  height: 50px;
  display: flex;
}
.city{
  border-radius: 0 0 5px 5px;
  
}
.city div:first-child{
  width:203px;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  padding:0 20px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 14px;
  color:#444;
  border-right:1px solid #ddd;
  border-radius: 5px 0 0 5px;
}
.city .icon{
  float: right;
  color:#bbb;
}
.city .city-area{
  width: 99%;
  height:200px;
  background-color: #fff;
  padding-top:5px;
  margin-top:-5px;
  border:1px solid #eee;
  overflow-y: scroll;
}
.city .city-area li{
  height:40px;
  line-height: 40px;
  padding:0 20px;
  cursor: pointer;
}
.city .city-area li:hover{
  background-color: #eee;
}
.city .city-area li:hover a{
  color:#39b54a;
}
.city .city-area a{
  color:#444;
}
.date_box{
  width:374px;
  height:50px;
  line-height: 50px;
  background-color: #fff;
  border:0;
}
.date_box .date_txt{
  width:350px;
}
.date_box i{
  top:0;
}
.search button{
  width:160px;
  height:50px;
  background-color:rgb(57,181,71,.8);
  border:0;
  font-size:18px;
  color:#fff;
  border-radius:0 5px 5px 0;
  outline:0;
  cursor:pointer;
}
</style>