<template>
  <div id="black" :style="{display:display1}">
    <div class="contain" @click="hidden">
      <div class="top">
        <h4>提示</h4>
        <span></span>
      </div>
      <p>{{prompt}}</p>
      <a href="javascripy:;">确定</a>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
        display1:'none',
    };
  },
  props:["display","prompt"],
  watch: {
      display(){
          this.display1 = this.display.substr(0,5);
      }
  },
  methods: {
      hidden(e){
          if(e.target.nodeName=="A" || e.target.nodeName == "SPAN"){
              this.display1 = 'none';
          }
      }
  },
};
</script>
<style scoped>
#black{
    background-color: rgba(0, 0, 0, 0.5);
    width:100%;
    height: 850px;
    position: absolute;
    top:0px;
    z-index: 111;
}
#black::before{
    content: "";
    display:table;
}
.contain{
    width:400px;
    height: 229px;
    margin: 0 auto; 
    text-align: center;
    background-color: #fff;
    margin-top:300px;
}
.top {
  box-sizing: border-box;
  display: flex;
  justify-content: space-between;
  width: 400px;
  height: 50px;
  padding-left: 18px;
  padding-right: 18px;
  background: #f6f6f6;
  line-height: 50px;
  align-items: center;
}
h4 {
  margin: 0px;
  font-weight: bold;
  font-size: 16px;
  color: #959ea7;
}
span,span:hover{
    display: inline-block;
    width:18px;
    height: 17px;
    background: url("../../public/images/o_icons.png") no-repeat 0 0;
    cursor: pointer;
}
span:hover{
    background: url("../../public/images/o_icons.png") no-repeat 0 11%;
}
p{
    box-sizing: border-box;
    height: 24px;
    padding:45px 0px;
    margin: 0px;
    font-size: 16px;
    color:#2c3e50;
}
a{
    display: inline-block;
    width:100px;
    height: 40px;
    text-decoration: none;
    color:#fff;
    line-height: 40px;
    border-radius: 4px;
    background-color:#30c3a6;
    font-size: 18px;
    margin-top:25px;
}
</style>