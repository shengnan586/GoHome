<template>
  <div>
    <div class="headerContent" :style="{width:innerWidth+'px',height:innerHeight+'px'}">
      <homeheader class="header" :isIndex=1></homeheader>
      <carousel class="carousel"></carousel> 
      <search class="search" :style="{top:innerHeight*0.8+'px'}"></search>
    </div>
    <plist></plist>
    <rspots></rspots>
    <homefooter></homefooter>
  </div>
</template>
<script>
import Header from './header';
import Footer from './footer';
import Carousel from "./Carousel.vue";
import Search from "./Search.vue";
import ProductList from './ProductList.vue';
import RecommendSpots from './RecommendSpots.vue'
export default {
  data() {
    return {
      innerWidth:window.innerWidth,
      innerHeight:window.innerHeight,   
    }
  },
  created(){
     window.addEventListener("resize",()=>{
      this.innerWidth=window.innerWidth;
      this.innerHeight=window.innerHeight;
    })
  },
  components:{
    "homeheader":Header,
    "homefooter":Footer,
    "carousel":Carousel,
    "search":Search,
    "plist":ProductList,
    "rspots":RecommendSpots
  }
}
</script>
<style scoped>
  .headerContent{
    position: relative;
  }
  .headerContent .header{
    height:80px;
    position: absolute;
    top:0;
    left:50%;
    transform: translate(-50%);
    z-index: 111;
  }
  .headerContent .carousel{
    position:absolute;
    top:0;
  }
  .headerContent .search{
    position:absolute;
    left:50%;
    transform: translateX(-50%);
    z-index: 100;
  }
</style>