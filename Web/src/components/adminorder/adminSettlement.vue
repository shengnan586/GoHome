<template>
  <div class="divparent">
    <div id="myChartId" style="height:500px;width:400px;margin-top:20px;margin-left:30px"></div>
    <div class="divtable">
      <div>
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
        <!-- <select v-model="selvalue" class="selyear" id="sel" @change="changeType">
          <option value="2019" selected>2019年</option>
          <option value="2018">2018年</option>
          <option value="2017">2017年</option>
        </select> -->
        <button @click="btnSelect">查询</button>
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
          //["一月", "二月", "三月", "四月", "五月"]
        },
        series: [
          {
            name: "月份收入",
            type: "pie",
            radius: "55%",
            center: ["50%", "60%"],
            data: this.list,
            // [
            //   { value: 335, name: "直接访问" },
            //   { value: 310, name: "邮件营销" },
            //   { value: 234, name: "联盟广告" },
            //   { value: 135, name: "视频广告" },
            //   { value: 1548, name: "搜索引擎" }
            // ]
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
      var uid = "1";
      var year = this.selvalue;
      console.log(year);
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
@import url("../../assets/css/adminsettlement.css");
@import url("../../assets/css/font/iconfont.css");
.divtable>div{
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
}
.yearlist{
  width:200px;
  height:43px;
  padding:10px 15px;
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
table tr:nth-child(odd){background:#F4F4F4;} 
table td:nth-child(even){color:#C00;}
</style>