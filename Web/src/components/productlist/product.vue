<template>
  <div class="productlist">
    <div class="product" v-for="(p,i) of productList" :key="i">
      <div class="p-img">
        <span></span>
        <img :src="'http://127.0.0.1:3003/'+p.houseimg">
        <div>{{p.specialPrice}}</div>
      </div>
      <div class="p-detail">
        <p>{{p.houseTitle}}</p>
        <p>{{p.typeName}}/{{p.bedcount}}张床/易住{{p.peopleNumber}}人</p>
      </div>
      <div>{{p.userName}}的房子</div>
    </div>
  </div>
</template>
<script>
export default {
  props:{
    productList:{default:[]}
  }
}
</script>
<style scoped>
  
</style>