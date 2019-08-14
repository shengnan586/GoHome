<template>
  <div class="search">
    <select id="city" v-model="selectedAreaId">
      <option v-for="(area,i) of areaList" :key="i" :value="area.id" v-text="area.aTypeName"></option>
    </select>
  </div>
</template>
<script>
export default {
  data() {
    return { 
      areaList:[],
      selectedAreaId:""
    }
  },
  created(){
    this.load()
  },
  methods: {
    load(){
      this.axios.get("area",{params:{aParentId:1,aType:0}}).then(result=>{
        this.areaList=result.data;
      });
    }
  },
  watch: {
    selectedAreaId(){
      console.log(this.selectedAreaId);
    }
  },
};
</script>
<style scoped>
</style>