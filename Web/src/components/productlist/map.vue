<template>
    <div class="test">
        <div id="container"></div>
        <button id="btn" @click="btnclick">Click Me!</button>
    </div>
    
</template>
<script>
import MapLoader from '../../../static/utils/AMap.js'
export default {
    name:'test',
    data(){
        return{
            map:null,
            AMap:null,
            Marker:null
        }
    },
    methods:{
        btnclick(){
            
            
            var marker1 = new AMap.Marker({
            position: new AMap.LngLat(114.39, 38.9),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: '北京'
            
            });  
            this.map.add(marker1);      
            
        }
    },
    mounted(){
        
        let that=this
        MapLoader().then(AMap=>{
            console.log("地图加载成功111111111111")
            that.map=new AMap.Map("container",{
                center:[116.397428, 39.90923],
                zoom:11,
                resizeEnable: true
            });
            that.marker = new AMap.Marker({
            position: new AMap.LngLat(116.39, 39.9),   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
            title: '北京'
            
            });
            that.map.add(that.marker);
            that.AMap=that.map;
            console.log(that.map)
            },e=>{
                console.log('地图加载失败',e)
            })
    }
}
</script>
<style scoped>
    #container{
        width: 400px;
        height: 300px;
    }
</style>