<template>
  <div class="productlist">
    <div class="product" v-for="(p,i) of productList" :key="i">
      <div class="p-img">
        <span class="favorites iconfont icon-shoucang" @click="love" :data-hid ="p.hid"></span>
        <router-link :to="'/prodetail?hid='+p.id"><img :src="'http://127.0.0.1:3003/'+p.houseimg"></router-link>
        <div class="price">￥<span>{{p.specialPrice}}</span>起/晚</div>
      </div>
      <div class="p-detail">
        <p class="title"><router-link :to="'/prodetail/'+p.hid">{{p.houseTitle}}</router-link></p>
        <p class="detail">{{p.typeName}}/{{p.bedcount}}张床/易住{{p.peopleNumber}}人</p>
        <div class="user"><span>{{p.UserName}}</span>的房子</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    productList:{default:[]}
  },
  methods: {
    love(e){
      var hid = e.target.dataset.hid;
      var uid = sessionStorage.getItem("userid");
      var collectime = new Date().getTime();
      this.axios.get("/love",{params:{
        hid,uid,collectime
      }}).then(result=>{
        //if(result)
        console.log(result);
      })
    }
  },
}
</script>
<style scoped>
@import url("../../assets/css/indexfont/font_reuh16mad8/iconfont.css");
  .productlist{
    width:1240px;
    display: flex;
    justify-content: flex-start;
    flex-wrap: wrap;
  }
  .productlist .product{
    width: 400px;
    height:400px;
  }
  .productlist .product:not(:first-child){
    margin-left: 20px;
  }
  .productlist .product .p-img{
    width:100%;
    height: 311px;
    position: relative;
  }
  .productlist .product .p-img img{
    width:100%;
    height:100%;
  }
  .productlist .product .p-img .favorites{
    position: absolute;
    top:5px;
    right:5px;
    font-size: 40px;
    color: #ddd;
  }
  .productlist .product .p-img .price{
    height:48px;
    line-height: 48px;  
    position: absolute;
    left:0;
    bottom:0;
    padding:0 8px;
    background-color: rgb(0,0,0,.5);
    font-size: 18px;
    color:#fff;
  }
  .productlist .product .p-img .price span{
    font-size: 28px;
  }
  .productlist .product .p-detail{
    width:100%;
    height:40px;
    position: relative;
    margin-top:10px;
  }
  .productlist .product .p-detail .title a{
    font-size: 14px;
    color:#333;
    font-weight: bold;
  }
  .productlist .product .p-detail .detail{
font-size: 12px;
    color:#959ea7;
    margin:5px 0;
  }
  .productlist .product .p-detail .user{
    position: absolute;
    right:10px;
    bottom:0;
  }
  .productlist .product .p-detail .user span{
    font-size: 16px;
    color:#39b54a;
  }
</style>