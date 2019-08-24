<template>
  <div>
    <div class="spots-txt">
      <h1>推荐景点</h1>
      <p>探索最热门的目的地</p>
    </div>
    <div class="spots-list">
      <ul>
        <li>
          <img src="../../assets/images/gugong.jpg" :class="{imgscale:id=='1'&&isShow}" />
          <div :class="{'font-color':id=='1'&&isShow}">
            <h1>故宫</h1>
            <p>The Imperial Palace</p>
          </div>
          <div :class="{height:id=='1'&&isShow}"></div>
          <div id="1" class="mask" @mouseenter="enter" @mouseleave="leave"></div>
        </li>
        <li>
          <img src="../../assets/images/tiantan.jpeg" :class="{imgscale:id=='2'&&isShow}" />
          <div :class="{'font-color':id=='2'&&isShow}">
            <h1>天坛</h1>
            <p>Temple of Heaven</p>
          </div>
          <div :class="{height:id=='2'&&isShow}"></div>
          <div id="2" class="mask" @mouseenter="enter" @mouseleave="leave"></div>
        </li>
        <li>
          <img src="../../assets/images/changcheng.jpg" :class="{imgscale:id=='3'&&isShow}" />
          <div :class="{'font-color':id=='3'&&isShow}">
            <h1>长城</h1>
            <p>The Great Wall</p>
          </div>
          <div :class="{height:id=='3'&&isShow}"></div>
          <div id="3" class="mask" @mouseenter="enter" @mouseleave="leave"></div>
        </li>
        <li>
          <img src="../../assets/images/yiheyuan.jpg" :class="{imgscale:id=='4'&&isShow}" />
          <div :class="{'font-color':id=='4'&&isShow}">
            <h1>颐和园</h1>
            <p>Temple of Heaven</p>
          </div>
          <div :class="{height:id=='4'&&isShow}"></div>
          <div id="4" class="mask" @mouseenter="enter" @mouseleave="leave"></div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      isShow: false,
      id: ""
    };
  },
  methods: {
    enter(e) {
      console.log(1);
      this.isShow = true;
      this.id = e.target.id;
    },
    leave(e) {
      console.log(2);
      this.isShow = false;
      this.id = "";
    }
  }
};
</script>
<style scoped>
h1 {
  margin: 0;
}
  .spots-txt{
    width:1240px;
    text-align: center;
    padding:80px;
    font-size: 22px;
    margin: auto;
  }
  .spots-txt h1{
    display: flex;
    justify-content: center;
    align-items: center;
    color: #555;
    
  }
  .spots-txt h1::before,
  .spots-txt h1::after{
    content: "";
    display: inline-block;
    width:50px;
    height:0;
    border:1px solid #333;
    margin:0 25px;
  }
  .spots-txt p{
    font-size: 20px;
    color:#666;
    margin:10px;
  }
  .spots-list{
    width:1240px;
    margin:0 auto;
  }
  .spots-list ul{
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding-bottom:70px;
  }
  .spots-list ul li{
    width:25%;
    height:439px;
    box-sizing: border-box;
    margin:0 5px;
    position: relative;
    overflow: hidden;
    cursor: pointer;
  }
  .spots-list ul li img{
    width:100%;
    height:100%;
    transform:scale(1);
    transition: all .3s linear;
  }
  .spots-list ul li div:nth-child(2){
    position: absolute;
    top:50%;
    left:50%;
    transform: translate(-50%,-50%);
    color:#fff;
    text-align: center;
    font-size: 21px;
    z-index: 9;
    transition: all .3s linear;
  }
  .spots-list ul li div:nth-child(3){
    position: absolute;
    width:94%;
    height:0;
    left:50%;
    bottom:0;
    transform:  translateX(-50%);
    background-color:rgb(255,255,255,.7);
    transition: all .3s linear;
  }
  .spots-list ul li .mask{
    width:100%;
    height:100%;
    position: absolute;
    top:0;
    left:0;
    z-index: 10;
  }
  .font-color{
    color:#444 !important;
  }
  .height{
    height:100% !important;
  }
  .imgscale{
    transform:scale(1.1) !important;
  }
</style>