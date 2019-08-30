<template>
  <div class="divparent">
    <div id="myChartId" style="height:500px;width:400px;margin-top:20px;margin-left:30px"></div>
    <div class="divtable">
      <div class="disdiv">
        <div class="yearlist" @mouseenter="enter" @mouseleave="leave">
          <span>{{selvalue}}年</span>
          <span class="iconfont" :class="icon"></span>
          <ul v-show="show" @click="selectedYear">
            <li data-value="2019">2019年</li>
            <li data-value="2018">2018年</li>
            <li data-value="2017">2017年</li>
            <li data-value="2016">2016年</li>
          </ul>
        </div>
        <button @click="btnSelect" class="btn">查询</button>
      </div>
      <table>
        <thead>
          <th>月份</th>
          <th>月收入</th>
        </thead>
        <tr v-for="(item,i) of this.list" :key="i">
          <td>{{item.name}}</td>
          <td>{{item.value.toFixed(2)}}元</td>
        </tr>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      userid: sessionStorage.getItem("userid"), //当前登陆的用户
      list: [],
      listTitle: [],
      selvalue:"2019",//获得下拉框选中的年份
      icon:{
        "icon-shangjiantou":true,
        "icon-jiantou9":false
      },
      show:false//是否显示下拉选
    };
  },
  methods: {
    selectedYear(e){
      this.selvalue=e.target.dataset.value;
      this.leave();
    },
    enter(){
      this.show=true;
      this.icon={
        "icon-shangjiantou":false,
        "icon-jiantou9":true
      }
    },
    leave(){
      this.show=false;
      this.icon={
        "icon-shangjiantou":true,
        "icon-jiantou9":false
      }
    },
    btnSelect(){
      this.load();
    },
    changeType(){
      this.selvalue = sel.options[sel.selectedIndex].value;
    },
    initChart() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = this.$echarts.init(document.getElementById("myChartId"));
      let option = {
        title: {
          text: "年度月收入总结",
          subtext: "",
          x: "center"
        },
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: this.listTitle
        },
        series: [
          {
            name: "月份收入",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.list,
            itemStyle: {
              emphasis: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: "rgba(0, 0, 0, 0.5)"
              }
            }
          }
        ]
      };
      // 绘制图表
      myChart.setOption(option);
    },
    load() {
      var uid = this.userid;
      var year = this.selvalue;
      var obj = { uid, year };
      this.axios.get("admin/GetEarcharts", { params: obj }).then(res => {
        if (res.data.code == 1) {
          this.list = res.data.data;
          for (var value of this.list) {
            this.listTitle.push(value);
          }
        }else{
          this.list=[];
          this.listTitle=[];
        }
        this.initChart();
      });
    }
  },
  mounted: function() {
    this.load();
  },
  created: function() {}
};
</script>
<style scoped>
/* @import url("../../assets/css/adminsettlement.css"); */
@import url("../../assets/css/font/iconfont.css");
*, body {
    font-weight: 300;
    outline: none;
    margin: 0;
    padding: 0;
}
.disdiv{
  display: flex;
}

table tr:nth-child(odd){background:#F4F4F4;} 
table td:nth-child(even){color:#C00;} */
*, body {
    font-weight: 300;
    outline: none;
    margin: 0;
    padding: 0;
}
.yearlist{
  width:200px;
  height:30px;
  padding:8px 15px;
  border:1px solid #ddd;
  position: relative;
}
.yearlist span{
  font-size: 16px;
  color:#333;
}
.yearlist span:nth-child(2){
  float:right;
}
.yearlist ul{
  width:90%;
  position: absolute;
  top:43px;
  left:0;
  background-color: rgb(0,0,0,.5);
}
.yearlist ul li{
  padding:5px 15px;
  color:#fff;
  font-size: 14px;
}
.yearlist ul li:hover{
  background-color: #333;
}
.btn{
  width: 60px;
  height: 48px;
    display: inline-block;
    border: solid 1px #E0E0E0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 2px;
    background: #eee;
    margin-right: 15px;
    border-radius: 5px;
}
.btn:hover{
  display: block;
  background: rgb(57, 181, 71, 0.8);
  border-radius: 5px;
  line-height: 45px;
  text-align: center;
  color: #fff !important;
  font-size: 13px;
  outline: none;
}
ul{
    margin: 0 !important;padding: 0;
}
ul, ol {
    list-style: none outside none;
}
.el-main {
    margin-left: 20px;
    padding: 0;
    overflow: hidden;
}
.order_list {
    margin: 0 auto;
}
.order_item {
    margin-top: 20px;
    overflow: visible;
}
.el-card {
    border-radius: 0;
}
.el-card {
    border: 1px solid #ebeef5;
    background-color: #fff;
    color: #303133;
    -webkit-transition: .3s;
    transition: .3s;
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
}
.order_item .pic_wrapper .pic {
    display: block;
    background: #EEE;
}
img {
    border: 0 none;
}
img, input, select, textarea, button, i {
    vertical-align: middle;
}

.order_item .side_info {
    margin-left: 0px;
    width: 100%;
}
.order_item .side_info .title {
    font-size: 18px;
    font-weight: 700;
}
.desc,.total{margin-top: 14px;}
.order_item .total .price {
    color: #ff4081;
    float: none;
    font-style: normal;
}
.order_item .content {
    display: -webkit-flex;
    display: flex;
    margin-top: 20px;
    font-size: 14px;
    width: 100%;
}
.desc{
    width: 100%;
}
.desc table{
    width: 100%;
}
.fa_btn:hover{
    background-color: #ff4081;
    color: #fff;
}
.pagenav{
    display: flex; 
    justify-content: center;
    margin-top:10px
}
.divtable{
    float: left;
    width: 300px;
    height: 500px;
}
#myChartId{
    float: left;
}
.divtable>table{
    width: 100%;
    margin-top: 70px;
    border: 1px solid #ddd;
    background:#fff;
}
.divtable>table>thead{
    font-size: 20px;
    height: 35px;
    color:#fff;
    line-height: 35px;
    background: rgb(57,181,71,.7);
    /* #ff4081; */
}
.divtable>table>thead>th:first-child{
    border-top-left-radius: 7px;
}
.divtable>table>thead>th:nth-child(2){
    border-top-right-radius: 7px;
}
.divtable>table td{
    font-size: 14px;
    text-align: center;
    height: 30px;
    line-height: 30px;
}
.selyear{
    width: 200px;
    border: 1px solid #303133 !important;
}
select{
    border: 1px solid #303133 !important;
}


</style>