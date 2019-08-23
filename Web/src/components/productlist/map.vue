<template>
  <div class="test">
    <div id="container"></div>
    <button id="btn" @click="btnclick">Click Me!</button>
    <input type="text" class="search" v-model="val" />
  </div>
</template>
<script>
import MapLoader from "../../../static/utils/AMap.js";
export default {
  name: "test",
  data() {
    return {
      map: null,
      AMap: null,
      Marker: null,
      val:"",
      address:{}
    };
  },
  methods: {
    btnclick() {
    //     var val=this.val;
    //     AMap.plugin("AMap.Geocoder", function() {
    //     var geocoder = new AMap.Geocoder({
    //       // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
    //       city: "010"
    //     });

    //     geocoder.getLocation(val, function(status, result) {
    //       if (status === "complete" && result.info === "OK") {
    //         console.log(result.geocodes[0].location);
    //       }
    //     });
    //   });

      // var marker1 = new AMap.Marker({
      // position: new AMap.LngLat(114.39, 38.9),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      // title: '北京'

      // });
      // this.map.add(marker1);
   
    }
  },
  watch:{
      val(){
        var val=this.val;
        AMap.plugin("AMap.Geocoder", function() {
        var geocoder = new AMap.Geocoder({
          // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
          city: "010"
        });

        geocoder.getLocation(val, function(status, result) {
          if (status === "complete" && result.info === "OK") {
                var a=result.geocodes[0].location
                console.log(a) ;
          }
        });
      });
    }
  },
  mounted() {
    let that = this;
    MapLoader().then(
      AMap => {
        console.log("地图加载成功111111111111");
        that.map = new AMap.Map("container", {
        //   center: [116.397428, 39.90923],
          zoom: 11,
          resizeEnable: true
        });
    //     that.marker = new AMap.Marker({
    //     //   position: new AMap.LngLat(116.39, 39.9), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
    //       title: "北京"
    //     });
    //     // that.map.add(that.marker);
    //     that.AMap = that.map;
    //     // console.log(that.map);
    //   },
    //   e => {
    //     console.log("地图加载失败", e);
      }
    );
  }
};
</script>
<style scoped>
#container {
  width: 400px;
  height: 300px;
}
</style>