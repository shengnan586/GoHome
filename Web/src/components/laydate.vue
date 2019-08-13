<template>
  <div>
    <input type="text" @focus="test" id="test1" style="width:auto; font-size:14px; margin-bottom:0;" readonly/>
  </div>
</template>
<script>
import "../assets/laydate/layDate-v5.0.9/laydate/laydate.js";
export default {
  methods: {
    formatDate(date) {
      var y = date.getFullYear();
      var m = date.getMonth() + 1;
      m = m < 10 ? "0" + m : m;
      var d = date.getDate();
      d = d < 10 ? "0" + d : d;
      return y + "-" + m + "-" + d;
    },
    test(e) {
      laydate.render({
        elem: "#test1",
        show: true, //直接显示
        range: true,
        closeStop: "test1" //这里代表的意思是：点击 test1 所在元素阻止关闭事件冒泡。如果不设定，则无法弹出控件
      });
    }
  },
  mounted() {
    var day = this.formatDate(new Date()).toString();
    var obj = {};
    obj[day] = "今日";
    var ins1 = laydate.render({
      elem: "#test1",
      range: true, //默认值 false
      min: 0,
      max:30,
      show: false,
      calendar: true,
      showBottom: true, //底部栏显示 默认为true
      isInitValue: false, //是否允许填充初始值，默认为 true
      mark: obj,
      calendar: true,
      zIndex: 9999,
      done: function(value, date) {
        var arr = value.split(" - ");
        var start = arr[0],
          end = arr[1];
        var startTime = new Date(start); //入住时间
        var endTime = new Date(end); //离开时间
        var days = (endTime - startTime) / 1000 / 24 / 60 / 60; //入住天数
        var orderDate = {
          start,
          end,
          days
        };
        return orderDate;
      }
    });
  }
};
</script>
<style>
@import url("../assets/laydate/layDate-v5.0.9/laydate/theme/default/laydate.css");
.layui-laydate-content .laydate-day-mark::after {
  background-color: transparent;
}

.layui-laydate-content td.layui-this .laydate-day-mark::after {
  display: block !important;
  background-color: transparent;
}
</style>