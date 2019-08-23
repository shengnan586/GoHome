<template>
  <div>
    <div class="title">
      <h1>别住酒店，住我家</h1>
      有朋自远方来，不亦乐乎！
    </div>
    <div class="pList">
      <div class="long">
        <router-link to="/productlist?selectedText=东城区&selectedAreaId=2"><img src="../../assets/images/gugonglong.jpeg"></router-link>
        <div class="detail">
          <p>明清的宫殿 · 故宫</p>
        </div>
      </div>
      <div>
        <router-link to="/prodetail?hid=1"><img src="../../assets/images/index1.jpg"></router-link>
        <div class="detail">
          <p>屋里灰灰的家 - 苏州</p>
          <div>￥240</div>
        </div>
      </div>
      <div>
        <router-link to="/prodetail?hid=1"><img src="../../assets/images/index1.jpg"></router-link>
        <div class="detail">
          <p>屋里灰灰的家 - 苏州</p>
          <div>￥240</div>
        </div>
      </div>
      <div>
        <router-link to="/prodetail?hid=1"><img src="../../assets/images/index1.jpg"></router-link>
        <div class="detail">
          <p>屋里灰灰的家 - 苏州</p>
          <div>￥240</div>
        </div>
      </div>
      <div>
        <router-link to="/prodetail?hid=1"><img src="../../assets/images/index1.jpg"></router-link>
        <div class="detail">
          <p>屋里灰灰的家 - 苏州</p>
          <div>￥240</div>
        </div>
      </div>
      <div>
        <router-link to="/prodetail?hid=1"><img src="../../assets/images/index1.jpg"></router-link>
        <div class="detail">
          <p>屋里灰灰的家 - 苏州</p>
          <div>￥240</div>
        </div>
      </div>
      <div class="long">
        <router-link to="/productlist?selectedText=朝阳区&selectedAreaId=5"><img src="../../assets/images/niaochao.jpg"></router-link>
        <div class="detail">
          <p>伟大建筑作品 · 鸟巢</p>
        </div>
      </div>
      <div>
        <router-link to="/prodetail?hid=1"><img src="../../assets/images/index1.jpg"></router-link>
        <div class="detail">
          <p>屋里灰灰的家 - 苏州</p>
          <div>￥240</div>
        </div>
      </div>
      <div>
        <router-link to="/prodetail?hid=1"><img src="../../assets/images/index1.jpg"></router-link>
        <div class="detail">
          <p>屋里灰灰的家 - 苏州</p>
          <div>￥240</div>
        </div>
      </div>
      <div>
        <router-link to="/prodetail?hid=1"><img src="../../assets/images/index1.jpg"></router-link>
        <div class="detail">
          <p>屋里灰灰的家 - 苏州</p>
          <div>￥240</div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      list:[]
    }
  },
}
</script>
<style scoped>
  .title{
    text-align: center;
    font-size: 18px;
    color:#959ea7;
    padding:20px 0 42px;
  }
  .title h1{
    font-size: 44px;
    color:#456;
  }
  .pList{
    width:1240px;
    display: flex;
    justify-content: space-around;
    flex-wrap: wrap;
    margin:0 auto;
  }
  .pList>div{
    width:33%;
    height:326px;
    padding:8px;
    box-sizing: border-box;
    position: relative;
    transition: all .3s linear;
  }
  .pList>div:hover{
    box-shadow: 0 0 8px 0 #999;
    padding:3px;
  }
  .pList>div img{
    width:100%;
    height:100%;
  }
  .pList>div .detail{
    width:100%;
    text-align: center;
    position: absolute;
    bottom:8px;
    font-size: 18px;
    color:#fff;
  }
  .pList .detail p{
    padding:5px;
  }
  .pList .detail div{
    width:90px;
    height:30px;
    background-color: rgb(0,0,0,.6);
    border-radius: 2px;
    margin:0 auto;
    line-height: 30px;
  }
  .pList .long{
    width:66%;
  }
</style>