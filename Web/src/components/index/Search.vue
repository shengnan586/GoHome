<template>
  <div class="search">
    <select id="city">
      <option value=""></option>
    </select>
  </div>
</template>
<script>
export default {
  data() {
    return { 
      areaList:[]
    }
  },
  created(){
    this.load()
  },
  methods: {
    load(){
      this.axios("area",{params:{aParentId:1,aType:0}}).then(result=>{
        console.log(result);
        this.areaList=result.data;
      });
    }
  },
};
</script>
<style scoped>
</style>