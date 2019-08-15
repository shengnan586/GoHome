<template>
  <div>
    <div class="">
      <carousel></carousel> 
      <search class="search"></search>
    </div>
  </div>
</template>
<script>
import Carousel from "./Carousel.vue"
import Search from "./Search.vue"
export default {
  data() {
    return {
      
    }
  },
  components:{
    "carousel":Carousel,
    "search":Search
  }
}
</script>
<style scoped>
  
</style>