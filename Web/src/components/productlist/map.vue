<template>
    <div class="test">
        <div id="container"></div>
    </div>
</template>
<script>
import MapLoader from '../../../static/utils/AMap.js'
export default {
    name:'test',
    data(){
        return{
            map:null,
            marker:null
        }
    },
    methods: {
        loadmore(){
             
        
       return MapLoader().then(AMap=>{
            
            this.map=new AMap.Map("container",{
                center:[116.397428, 39.90923],
                zoom:11
            })
            this.marker = new AMap.Marker({
                position: [116.39, 39.9],   // 经纬度对象，也可以是经纬度构成的一维数组[116.39, 39.9]
                title: '北京'  
                })
                console.log(this.map);
                this.map.add(this.marker);
            
        },e=>{
            console.log('地图加载失败',e)
        })
        }
        
    },
    mounted(){
        
       this.loadmore();
    //    this.loadmarker();

// 将创建的点标记添加到已有的地图实例：
    }     
}
</script>
<style scoped>
    #container{
        width: 400px;
        height: 300px;
    }
</style>