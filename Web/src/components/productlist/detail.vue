<template>
  <div class="detail">
    <div class="carousel">
      <div>
        <ul>
          <li
            class="carousel-item"
            v-for="(img,i) in imgs"
            :key="i"
            :style="{opacity:index==i?1:0,'z-index':index==i?1:0}"
          >
            <a :href="href"><img :src="`${URL+img}`" /></a>
          </li>
        </ul>
        <div class="btn-left" @click="move(-1)">
          <a href="javascript:;">
            <img src="../../assets/left.png" alt />
          </a>
        </div>
        <div class="btn-right" @click="move(+1)">
          <a href="javascript:;">
            <img src="../../assets/right.png" alt />
          </a>
        </div>
      </div>
      <div class="detailContent">
        <div class="detailTitle">
          <h1>{{p_detail.houseTitle}}</h1>
          <p>{{p_detail.address}}</p>
        </div>
        <ul class="detailicon">
          <li>
            <span class="iconfont icon-shouye"></span>
            <p>{{typeName}}</p>
          </li>
          <li>
            <span class="iconfont icon-qunzuduoren"></span>
            <p>可住{{p_detail.peopleNumber}}人</p>
          </li>
          <li>
            <span class="iconfont icon-icon-test"></span>
            <p>{{bedroom}}居</p>
          </li>
          <li>
            <span class="iconfont icon-hekriconqingjingwoshi"></span>
            <p>{{bednum}}张双人床</p>
          </li>
          <li>
            <span class="iconfont icon-biaochi"></span>
            <p>{{p_detail.roomSize}}平方木</p>
          </li>
        </ul>
      </div>
    </div>
    <div class="right">
      <h1>￥{{p_detail.normalPrice}}/晚</h1>
      <div class="date_box">
        <laydate @getValue="getDateValue" class="date_txt"></laydate>
        <i class="iconfont icon-rili"></i>
      </div>
      <ul class="price">
        <li>
          <span>房费</span>
          <span>￥{{price}}</span>
        </li>
        <li>
          <span>押金</span>
          <span>￥{{p_detail.cashMoney}}</span>
        </li>
        <li>
          <span>订单总金额</span>
          <span>￥{{totalprice}}</span>
        </li>
      </ul>
      <button class="btn" @click="order">立即预定</button>
    </div>
  </div>
</template>
<script>
import layDate from "../laydate/laydate.vue";
import URL from "../../config"
export default {
  data() {
    return {
      imgwidth: 724,
      index: 0,
      orderDate: null,
      href:"javascript:;",
      imgs: [ "/images/Carousel1.jpg",
        "/images/Carousel2.jpg",
        "/images/Carousel3.jpg",
        "/images/Carousel4.jpg"],
      typeName:  "整套出租" ,
      bedroom:  2 ,
      bednum: 2 
      };
  },
  // props: {
    
  //   hid:{default:1},
  //   title: { default: "【独栋老洋房】Tree 树德坊 · 小城/徐家汇/交通大学" },
  //   address: { default: "上海徐汇区天平路288弄树德坊" },
  //   typeName: { default: "整套出租" }, //出租类型
  //   peopleNumber: { default: 4 }, //宜居人数
  //   bedroom: { default: 2 }, //几室
  //   bednum: { default: 2 }, //几个双人床
  //   roomSize: { default: 120.0 }, //面积
  //   specialPrice: { default: 799 }, //最低价格
  //   normalPrice: { default: 799 } //押金
  // },
  props:["p_detail"],
  methods: {
    //获取时间控件返回的时间对象{入住时间、离开时间、天数}
    getDateValue(orderDate) {
      this.orderDate = orderDate;
    },
    order(){
      this.$router.push({path: "/order", query: {hid: this.p_detail.id,totalprice:this.totalprice}})
    },
    move(n) {
      this.index += n;
      if (this.index < 0) {
        this.index = this.imgs.length - 1;
      } else if (this.index >= this.imgs.length) {
        this.index = 0;
      }
    }
  },
  computed: {
    price() {
      if (this.orderDate) {
        return this.orderDate.days * this.p_detail.normalPrice;
      } else {
        return 0;
      }
    },
    totalprice() {
      if (this.orderDate) {
        return this.orderDate.days * this.p_detail.normalPrice + this.p_detail.cashMoney;
      } else {
        return 0;
      }
    }
  },
  updated(){
     console.log(this.p_detail);
    switch(this.p_detail.id){
      case 1:
      case 5:
        this.href=URL+"AR/ar.html?hid="+this.p_detail.id+"&count=4";
        console.log(this.p_detail.id);
        break;
      case 2:
      case 3:
      case 4:
        this.href=URL+"AR/ar.html?hid="+this.p_detail.id+"&count=5";
        break;
      default:
        break;
    }
  },
  components: { laydate: layDate } //时间控件
};
</script>
<style scoped>
@import url("../../assets/css/indexfont/font_reuh16mad8/iconfont.css");
.detail {
  width: 1240px;
  margin: 0 auto;
  display: flex;
  justify-content: center;
}
.carousel {
  width: 730px;
  margin-right: 50px;
}
.carousel>div:first-child{
  position: relative;
}
.carousel ul {
  height: 480px;
}
.carousel .carousel-item {
  width: 730px;
  height: 480px;
  position: absolute;
  top: 0;
  left: 0;
  background-color: #fff;
}
.carousel .carousel-item img {
  width: 730px;
  height: 480px;
}
.carousel .btn-left,
.carousel .btn-right {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 99;
}
.carousel .btn-left {
  left: 0;
}
.carousel .btn-right {
  right: 0;
}
.carousel .btn-left img,
.carousel .btn-right img {
  width: 24px;
  height: 24px;
  vertical-align: bottom;
}
.detailContent {
  width: 730px;
}
.detailContent .detailTitle {
  width: 700px;
  margin: 0 auto;
  border-bottom: 1px solid #eaeaea;
}
.detailContent .detailTitle p {
  font-size: 16px;
  color: #777;
}
.detailContent .detailicon {
  height:90px;
  width: 100%;
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
  text-align: center;
}
.detailContent .detailicon .iconfont {
  font-size: 50px;
  color: #777;
}
.right h1{
  width:90%;
  color:#39b54a;
  text-align: center;
  margin:0 auto;
  border-bottom: 1px solid #eaeaea;
  font-weight: bold;
  margin-bottom: 30px;
  padding:20px 0;
}
.right .price{
  width:100%;
  color:#777;
  font-size: 16px;
}
.right .price li{
  width:100%;
  display: flex;
  justify-content: space-between;
  padding:25px 5px 18px;
  border-bottom:1px solid #eaeaea;
  box-sizing: border-box;
}
.right .price li:last-child{
  color:#39b54a;
  border:0;
}
.right .btn{
  width:100%;
  height:50px;
  background-color: #39b54a;
  border-radius: 5px;
  border:0;
  outline: 0;
  font-size: 22px;
  color:#fff;
  cursor: pointer;
}
</style>