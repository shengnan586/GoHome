<template>
  <div class="test">
    <div id="container"></div>
    <!-- <button id="btn" @click="btnclick">Click Me!</button> -->
    <!-- <input type="text" class="search" v-model="val" /> -->
  </div>
</template>
<script>
import MapLoader from "../../assets/js/AMap.js";
export default {
  name: "test",
  data() {
    return {
      map: null,
      AMap: null,
      marker: null,
      lng:0,
      lat:0
    };
  },
  props:["val"],
  methods: {
    // btnclick() {
    //   var address = {};
    //   var val = this.val;
    //   function map(val){
    //     return new Promise(
    //       function(resolve,reject){
    //         AMap.plugin("AMap.Geocoder", function() {
    //           var geocoder = new AMap.Geocoder({
    //             // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
    //             city: "010"
    //           });
    //           geocoder.getLocation(val, function(status, result) {
    //             if (status === "complete" && result.info === "OK") {
    //               console.log(result.geocodes[0].location);
    //               address.lng = result.geocodes[0].location.lng;
    //               address.lat = result.geocodes[0].location.lat;
    //             //  console.log("that p:" + address.P);
    //               resolve(address);
    //             }
    //           });
    //         })
    //       }
    //     )
    //   }
    //   map(val).then((address)=>{
    //     this.lng = address.lng;
    //     this.lat = address.lat;
    //     console.log("this:"+this.lng);
    //     console.log("this:"+this.lat);
    //   })
      // var marker1 = new AMap.Marker({
      // position: new AMap.LngLat(114.39, 38.9),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      // title: '北京'

      // });
      // this.map.add(marker1);
    // }
  },
  watch: {
    val(){
      var address = {};
      var val = this.val;
      function map(val){
        return new Promise(
          function(resolve,reject){
            AMap.plugin("AMap.Geocoder", function() {
              var geocoder = new AMap.Geocoder({
                // city 指定进行编码查询的城市，支持传入城市名、adcode 和 citycode
                city: "010"
              });
              geocoder.getLocation(val, function(status, result) {
                if (status === "complete" && result.info === "OK") {
                  address.lng = result.geocodes[0].location.lng;
                  address.lat = result.geocodes[0].location.lat;
                //  console.log("that p:" + address.P);
                  resolve(address);
                }
              });
            })
          }
        )
      }
      map(val).then((address)=>{
        this.lng = address.lng;
        this.lat = address.lat;
      })
    },


    lng(){
      if(this.marker!=null){
        this.map.remove(this.marker);
      }
      this.marker = new AMap.Marker({
        position: new AMap.LngLat(this.lng,this.lat), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
          title: "北京"
      });
      this.map.add(this.marker);
    }
  },
  mounted() {
    let that = this;
    MapLoader().then(AMap => {
      that.map = new AMap.Map("container", {
        //   center: [116.397428, 39.90923],
        zoom: 11,
        resizeEnable: true
      });
      // that.marker = new AMap.Marker({
      //   position: new AMap.LngLat(116.39, 39.9), // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
      //     title: "北京"
      // });
          // that.map.add(that.marker);//点标记
          // that.AMap = that.map;
          // console.log(that.map);
        },
        e => {
          console.log("地图加载失败", e);
    });
  }
};
</script>
<style scoped>
#container {
  width: 100%;
  height: 100%;
}
</style>