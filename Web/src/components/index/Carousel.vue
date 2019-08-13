<template>
  <div class="carousel" :style="{width:innerWidth+'px',height:innerHeight+'px'}">
    <div class="carousel-inner">
      <div class="carousel-item" v-for="(img,i) of imgs" :key="i" 
      :style="{opacity:index==i?1:0,'z-index':index==i?1:0}">
        <a :href="img.to">
          <img :src="img.src" :style="{width:innerWidth+'px',height:innerHeight+'px'}">
        </a>
      </div>
    </div>
    <div class="carousel-control">
      <div class="carousel-control-item" v-for="(n,i) of imgs.length" :key="i">
        <div class="item-over" :class="{transition:index==i}" :style="{width:(index==i?overWidth:0)+'px'}"></div>
      </div>
    </div>
      <div class="btn-left" @click="move(-1)">
        <a href="javascript:;">
          <img src="../../assets/left.png" alt="">
        </a>
      </div>
      <div class="btn-right" @click="move(+1)">
        <a href="javascript:;">
          <img src="../../assets/right.png" alt="">
        </a>
      </div>
    
  </div>
</template>
<script>
export default {
  data() {
    return {
      innerWidth:window.innerWidth,
      innerHeight:window.innerHeight,
      overWidth:0,
      imgs:[
        {
          src:"/images/Carousel1.jpg",
          title:"轮播1",
          to:"javascript:;"
        },
        {
          src:"/images/Carousel2.jpg",
          title:"轮播2",
          to:"javascript:;"
        },
        {
          src:"/images/Carousel3.jpg",
          title:"轮播3",
          to:"javascript:;"
        },
        {
          src:"/images/Carousel4.jpg",
          title:"轮播4",
          to:"javascript:;"
        }
      ],
      index:0,
      timer:null,
    }
  },
  created() {
    window.addEventListener("resize",()=>{
      this.innerWidth=window.innerWidth;
      this.innerHeight=window.innerHeight;
    })
    setTimeout(() => {
      this.overWidth=50;
    }, 0);
   this.setInter();
  },
  methods: {
    move(n){
      clearInterval(this.timer);
      this.timer=null;
      this.index+=n;
      if(this.index<0)
      {
        this.index=this.imgs.length-1;
      }else if (this.index>=this.imgs.length){
        this.index=0;
      }
      this.setInter();
    },
    setInter(){
      this.timer=setInterval(() => {
        this.index++;
        if(this.index>=this.imgs.length) this.index=0;
      }, 3000);
    }
  },

}
</script>
<style scoped>
  .carousel{
    position: relative;
  }
  .carousel .carousel-item{
    transition: all 0.5s linear;
    position: absolute;
    top:0;
    left:0;
  }
  .carousel .carousel-control{
    width:250px;
    display: flex;
    justify-content: space-around;
    position: absolute;
    left:200px;
    bottom:20px;
    z-index: 99;
  }
  .carousel .carousel-control-item{
    width:50px;height:3px;
    background-color:#555;
    border-radius: 2px;
  }
  .carousel .item-over{
    height:3px;
    background-color: #fff;
    border-radius: 2px;
  }
  .carousel .transition{
    transition: all 3s linear;
  }
  .carousel .btn-left,.carousel .btn-right{
    position: absolute;
    top:50%;
    transform: translateY(-50%);
    z-index: 99;
  }
  .carousel .btn-left{
    left:0;
  }
  .carousel .btn-right{
    right:0;
  }
  .carousel .btn-left img,.carousel .btn-right img{
    width:24px;height:24px;
    vertical-align: bottom;
  }
</style>