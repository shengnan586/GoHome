<template>
  <div>
    <div class="headerContent" :style="{width:innerWidth+'px',height:innerHeight+'px'}">
      <homeheader class="header"></homeheader>
      <carousel class="carousel"></carousel> 
      <search class="search"></search>
    </div>
  </div>
</template>
<script>
import Header from './header';
import Carousel from "./Carousel.vue";
import Search from "./Search.vue";
export default {
  data() {
    return {
      innerWidth:window.innerWidth,
      innerHeight:window.innerHeight,
    }
  },
  components:{
    "homeheader":Header,
    "carousel":Carousel,
    "search":Search
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
    bottom: 30px;
    transform: translateX(-50%);
    z-index: 100;
  }
</style>