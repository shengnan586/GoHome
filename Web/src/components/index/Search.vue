<template>
  <div class="search">
    <select id="city" v-model="selectedAreaId">
      <option v-for="(area,i) of areaList" :key="i" :value="area.id" v-text="area.aTypeName"></option>
    </select>
    <div class="date_box">
      <laydate class="date_txt"></laydate>
      <i class="iconfont icon-rili"></i>
    </div>
  </div>
</template>
<script>
import layDate from "../laydate/laydate.vue";
export default {
  data() {
    return { 
      areaList:[],
      selectedAreaId:""
    }
  },
  created(){
    this.load();
  },
  methods: {
    load(){
      this.axios.get("area",{params:{aParentId:1,aType:0}}).then(result=>{
        this.areaList=result.data;
      });
    },
    reg(){
      this.axios.post("user/reg",{id:234}).then(res=>{
        console.log(res);
      });
    }
  },
  watch: {
    selectedAreaId(){
      console.log(this.selectedAreaId);
    }
  },
  components: { laydate: layDate },
};
</script>
<style scoped>
  .search{
    width:790px;height:80px;
    display: flex;

  }
</style>