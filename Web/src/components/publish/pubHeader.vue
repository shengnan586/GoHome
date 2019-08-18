<template>
  <div>
    <!-- 顶部 -->
    <div class="h_top_box">
      <div class="content cursor" @click="tab">
        <span class="img" data-num="0"></span>
        <p data-num="0" :class="{word:word[0].isActive}">房源信息</p>
      </div>
      <span class="line" :class="{active:word[1].isActive}"></span>
      <div class="content after" :class="{cursor:word[1].isActive}" @click="tab">
        <span data-num="1" class="img" :class="{color:word[1].isActive}" :style="{'background-position':word[1].position}"></span>
        <p data-num="1" :class="{word:word[1].isActive}">房源描述</p>
      </div>
       <span class="line2" :class="{active:word[2].isActive}"></span>
      <div class="content after" :class="{cursor:word[2].isActive}" @click="tab">
        <span data-num="2" class="img" :class="{color:word[2].isActive}" :style="{'background-position':word[2].position}"></span>
        <p data-num="2" :class="{word:word[2].isActive}">配套设施</p>
      </div>
       <span class="line3" :class="{active:word[3].isActive}"></span>
      <div class="content after" :class="{cursor:word[3].isActive}" @click="tab">
        <span data-num="3" class="img" :class="{color:word[3].isActive}" :style="{'background-position':word[3].position}"></span>
        <p data-num="3" :class="{word:word[3].isActive}">真实照片</p>
      </div>
      <span class="line4" :class="{active:word[4].isActive}"></span>
      <div class="content after" :class="{cursor:word[4].isActive}" @click="tab">
        <span data-num="4" class="img" :class="{color:word[4].isActive}" :style="{'background-position':word[4].position}"></span>
        <p data-num="4" :class="{word:word[4].isActive}">价格规则</p>
      </div>
    </div>
    <!-- <Info></Info> -->
    <Facility :stepToChild="stepToChild" :hid="hid" @step="stepToParent" @had="sort"></Facility>
  </div>
</template>
<script>
import Info from "./info.vue"
import Facility from "./Facility.vue"
export default {
    //缺：当该房源是新创建的时候，第一个页面点击保存后，子组件需将hid传回
    //jr写的页面组件的东西加一样的 stepToParent保存时传来的数据跳转到下一个页面 sort页面刚加载时传来的 保证页面是当时保存的状态
    data(){
      return{
        hid:9,//保存其他页面跳转过来的hid
        stepToChild:1,//当字体变成绿色时，可以点击更换组件 传给子组件 子组件通过这个值来进行判断是否展示 1--第一步 2--第二步。。。
        step:1,//保存子组件传来的值 用来遍历数组 改变字体的颜色 只用来控制字体颜色
        
        word:[//保存图片位置和当前按钮是否是激活状态
          {
            isActive:true
          },
          {
            isActive:false,
            position:"-91px -2359px",
            default:"-91px -2359px",
            active:"-112px -2378px"
          },
          {
            isActive:false,
            position:"-109px -2359px",
            default:"-109px -2359px",
            active:"-133px -2378px"
          },
          {
            isActive:false,
            position:"-127px -2359px",
            default:"-127px -2359px",
            active:"-154px -2378px"
          },
          {
            isActive:false,
            position:"-145px -2359px",
            default:"-145px -2359px",
            active:"-91px -2400px"
          }
        ],
        
      }
    },
    watch: {
      step(){//只要step有改变 字体颜色和图片位置就会变
          for(var i = 1;i<this.step;i++){
          this.word[i].isActive = true;
          this.word[i].position = this.word[i].active;
        }
      }
    },
    components:{Facility,Info},
    created() {
    //  if(!this.$route.params.hid) this.hid = 0;//如果没传hid hid则为0
    //  else this.hid = this.$route.params.hid;//页面刚加载就读取传过来的hid
      //如果是新页面 则step=1 只有第一个字绿色，如果是继续填写，step的值由子组件查到的数据决定
      for(var i = 1;i<this.step;i++){ 
        this.word[i].isActive = true;
        this.word[i].position = this.word[i].active;
      }
    },
    methods: {
      //只有当字体为绿色时才能点击切换组件
      tab(e){
        if(e.target.nodeName == "P" || e.target.nodeName == "SPAN"){
          var num = parseInt(e.target.dataset.num);
          if(this.word[num].isActive){
            //跳转到点击的页面，数组下标是012 所以页面数要加1
            this.stepToChild = num+1;
          }
          else{
            return;
          }
        }
      },
      stepToParent(step){
        console.log("fanhui"+step);
        if(this.step != 5){
          this.step = step+1;//控制字体颜色 让下一个组件的颜色变亮 +1
        }
        this.stepToChild = step+1;//控制跳下一个组件
      },
      sort(step){//该函数控制如果当前页面是从房源发布列表id中进入 显示当时保存的页面
        if(this.step < step){
          this.step = step;
          this.stepToChild = step;
        }
      }
    },
}

</script>
<style scoped>
.h_top_box{
  box-sizing: border-box;
  height: 100px;
  background-color:#fff;
  border:1px solid #f6f6f6;
  text-align: center;
  display: flex;
  padding-top:30px;
  padding-left:300px;
  position: relative;
}
.content{
  box-sizing: border-box;
  color:#959ea7;
  font-size:14px;
  font:"Microsoft YaHei";
  font-weight: bold;
}
.after{
  margin-left:125px;
}
p{
  margin:0;
  padding: 0;
}
p.word{
  color:#30c3a6;
}
.content>.img{
  display: inline-block;
  width:16px;
  height: 16px;
  background: url("../../../public/images/fb_sprice.png") no-repeat -91px -2359px;
}
.content:first-child>.img{
  display: inline-block;
  width:20px;
  height: 20px;
  background: url("../../../public/images/fb_sprice.png") no-repeat -91px -2378px;
}
.content>span.img.color{
  width:20px;
  height: 20px;
}
.content+span{
  display: inline-block;
  width:162px;
  height: 2px;
  background: #eeeeee;
  position: absolute;
  top:40px;
  left:338px;
}
span.active{
  background-color:#30c3a6;
}
span.line2{
  left:519px;
}
span.line3{
  left:700px;
}
span.line4{
  left:880px;
}
.cursor{
  cursor: pointer;
}
</style>
    