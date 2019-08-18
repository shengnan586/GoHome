<template>
  <div class="h_container" :style="{display:stepToChild==3?'block':'none'}">
      <!-- :style="{display:stepToChild==3?'block':'none'}" -->
      <!-- ==3 表示头部点击了第三步 该组件显示 -->
    <div class="h_wrap">
      <h4 class="h_tit">配套设施</h4>
      <div class="sb_box">
        <h4>卫浴：</h4>
        <ul class="sb_list" @click="tab">
          <li v-for="(item,i) of weiyu" :key="i">
            <span :class="{s_active:item.isActive}" data-fname="weiyu" :data-index="i" class="checkbox"></span>
            <p data-fname="weiyu" :data-index="i" class="facility_icon" :class="{active:item.isActive}" :style="{'background-position':item.position}">{{item.word}}</p>
          </li>
        </ul>
      </div>
      <div class="sb_box">
        <h4>电器：</h4>
        <ul class="sb_list" @click="tab">
          <li v-for="(item,i) of dianqi" :key="i">
            <span :class="{s_active:item.isActive}" data-fname="dianqi" :data-index="i" class="checkbox"></span>
            <p data-fname="dianqi" :data-index="i" class="facility_icon" :class="{active:item.isActive}" :style="{'background-position':item.position}">{{item.word}}</p>
          </li>
        </ul>
      </div>
      <div class="sb_box">
        <h4>设施：</h4>
        <ul class="sb_list" @click="tab">
          <li v-for="(item,i) of sheshi" :key="i">
            <span :class="{s_active:item.isActive}" data-fname="sheshi" :data-index="i" class="checkbox"></span>
            <p data-fname="sheshi" :data-index="i" class="facility_icon" :class="{active:item.isActive}" :style="{'background-position':item.position}">{{item.word}}</p>
          </li>
        </ul>
      </div>
      <div class="sb_box">
        <h4>要求：</h4>
        <ul class="sb_list" @click="tab">
          <li v-for="(item,i) of request" :key="i">
            <span :class="{s_active:item.isActive}" data-fname="request" :data-index="i" class="checkbox"></span>
            <p data-fname="request" :data-index="i" class="facility_icon" :class="{active:item.isActive}" :style="{'background-position':item.position}">{{item.word}}</p>
          </li>
        </ul>
      </div>
    </div>
    <a href="javascript:;" class="keep_btn" @click="save">保存并继续</a>
    <Alert :display="display" :prompt="prompt"></Alert>
  </div>
</template>
<script>
import Alert from "../Alert"
export default {
  components:{Alert},
  data() {
    return {
        //弹出框alert的使用的变量
        display:'none',
        prompt:'你还没有选择任何配套设施',
        d1:0,
        //数据用来循环创建页面上的小图标
        //数据名对应数据库内设施类型
        //1--weiyu  2--dianqi 3--sheshi 4--request
        //default--默认图标位置 未激活状态
        //active--激活状态的图标位置
        //isActive--用来控制图标激活
        weiyu:[
            {
                position:"0 -806px",
                word:"牙具",
                isActive:false,
                default:"0 -806px",
                active:"0 -2445px"
            },
            {
                position:"0 -838px",
                word:"香皂",
                isActive:false,
                default:"0 -838px",
                active:"0 -2476px"
            },
            {
                position:"0 -869px",
                word:"毛巾",
                isActive:false,
                default:"0 -869px",
                active:"0 -2509px"
            },
            {
                position:"0 -903px",
                word:"浴液 洗发水",
                isActive:false,
                default:"0 -903px",
                active:"0 -2545px"
                },
            {
                position:"0 -934px",
                word:"手纸",
                isActive:false,
                default:"0 -934px",
                active:"0 -2577px"
                },
            {
                position:"0 -967px",
                word:"热水淋浴",
                isActive:false,
                default:"0 -967px",
                active:"0 -2610px"
            },
            {
                position:"0 -1001px",
                word:"浴缸",
                isActive:false,
                default:"0 -1001px",
                active:"0 -2646px"
            },
            {
                position:"0 -1037px",
                word:"拖鞋",
                isActive:false,
                default:"0 -1037px",
                active:"0 -2679px"
            }
        ],
        dianqi:[
            {
                position:"0 -1072px",
                word:"电视",
                isActive:false,
                default:"0 -1072px",
                active:"0 -2711px"
            },
            {
                position:"0 -1107px",
                word:"空调",
                isActive:false,
                default:"0 -1107px",
                active:"0 -2743px"
            },
            {
                position:"0 -1225px",
                word:"饮水设备",
                isActive:false,
                default:"0 -1225px",
                active:"0 -2845px"
            },
            {
                position:"0 -1184px",
                word:"冰箱",
                isActive:false,
                default:"0 -1184px",
                active:"0 -2811px"
            },
            {
                position:"0 -1144px",
                word:"洗衣机",
                isActive:false,
                default:"0 -1144px",
                active:"0 -2777px"
            }
        ],
        sheshi:[
            {
                position:"0 -1260px",
                word:"无线网络",
                isActive:false,
                default:"0 -1260px",
                active:"0 -2878px"
            },
            {
                position:"0 -1298px",
                word:"有线网络",
                isActive:false,
                default:"0 -1298px",
                active:"0 -2907px"
            },
            {
                position:"0 -1331px",
                word:"暖气",
                isActive:false,
                default:"0 -1331px",
                active:"0 -2939px"
            },
            {
                position:"0 -1671px",
                word:"电梯",
                isActive:false,
                default:"0 -1671px",
                active:"0 -2973px"
            },
            {
                position:"0 -1712px",
                word:"门禁系统",
                isActive:false,
                default:"0 -1712px",
                active:"0 -3006px"
            },
            {
                position:"0 -1751px",
                word:"停车位",
                isActive:false,
                default:"0 -751px",
                active:"0 -3037px"
            },
        ],
        request:[
            {
                position:"0 -1792px",
                word:"允许吸烟",
                isActive:false,
                default:"0 -1792px",
                active:"0 -3071px"
                },
            {
                position:"0 -1833px",
                word:"允许做饭",
                isActive:false,
                default:"0 -1833px",
                active:"0 -3104px"
            },
            {
                position:"0 -1871px",
                word:"允许带宠物",
                isActive:false,
                default:"0 -1871px",
                active:"0 -3137px"
            },
            {
                position:"0 -1908px",
                word:"允许聚会",
                isActive:false,
                default:"0 -1908px",
                active:"0 -3167px"
            }
        ],
    }
  },
  props:["stepToChild","hid"],//stepToChild父组件传过来，用来是否显示该组件的 hid是父组件传过来的，用来查询数据库是否有数据的
  created() {
      if(this.hid != 0)
      this.load();
  },
  methods: {
        //将点击事件绑定在父元素上，判断子元素是否是p或span来执行事件
        tab(e){
            if(e.target.nodeName == "SPAN" || e.target.nodeName == "P"){
                //用自定义属性来获得当前点击的图标的下标和该图标属于哪种设施
                var index = parseInt(e.target.dataset.index);
                var fname = e.target.dataset.fname;
                this.change(fname,index);  
            }
        },       
        save(){
            var pro = {};
            //点击保存时 循环遍历每一种设施，将选中的保存到对象中
            for(var item of this.weiyu){
                if(item.isActive) pro[item.word] = 1;
            }
            for(var item of this.dianqi){
                if(item.isActive) pro[item.word] = 1;
            }
            for(var item of this.sheshi){
                if(item.isActive) pro[item.word] = 1;
            }
            for(var item of this.request){
                if(item.isActive) pro[item.word] = 1;
            }
            if(JSON.stringify(pro) == '{}'){
                //弹出框 要改！！！
                this.display='block'+(this.d1++);         
            }else{
                //发送ajax请求，传入房屋id和设施名字
                this.axios.get("facility/save",{
                    params:{
                        pro,
                        hid:this.hid
                    }
                }).then(res=>{
                    if(res.data.code > 0){
                        console.log("跳组件");
                        //跳转下一个组件
                        this.$emit("step",3);
                    }
                })
            }          
        },
        load(){
            this.axios.get("facility/search",{
                params:{hid:this.hid}
            }).then(res=>{
                var data = res.data.data;
                //请求回来的数据是设施名字和设施类型 for循环遍历 并通过switch-case来筛选出数据，将对应数据的active变成true
                if(data.length > 0){
                    this.$emit("had",3);
                    for(var item of data){
                        //data是数组 存着installType-->设施类型 和installName-->设施名字
                        switch(parseInt(item.installType)){
                            case 1:
                                for(var list of this.weiyu){
                                    if(item.installName == list.word){
                                        list.isActive = true;
                                        list.position = list.active;
                                    }
                                };
                                break;
                            case 2:
                                for(var list of this.dianqi){
                                    if(item.installName == list.word){
                                        list.isActive = true;
                                        list.position = list.active;
                                    }
                                };
                                break;
                            case 3:
                                for(var list of this.sheshi){
                                    if(item.installName == list.word){
                                        list.isActive = true;
                                        list.position = list.active;
                                    }
                                };
                                break;
                            case 4:
                                for(var list of this.request){
                                    if(item.installName == list.word){
                                        list.isActive = true;
                                        list.position = list.active;
                                    }
                                };
                                break;
                        }
                    }
                }
                
            })
        },
        //切换激活和未激活状态
        change(fname,index){
            switch(fname){
                case 'weiyu':
                    //如果当前点击的图标是未激活状态 则将状态改成激活 图标位置改成激活状态下的位置
                    this.weiyu[index].isActive?(this.weiyu[index].isActive=false):(this.weiyu[index].isActive=true);
                    this.weiyu[index].isActive?(this.weiyu[index].position=this.weiyu[index].active):(this.weiyu[index].position=this.weiyu[index].default);
                    break;
                case 'dianqi':
                    this.dianqi[index].isActive?(this.dianqi[index].isActive=false):(this.dianqi[index].isActive=true);
                    this.dianqi[index].isActive?(this.dianqi[index].position=this.dianqi[index].active):(this.dianqi[index].position=this.dianqi[index].default);
                    break;
                case 'sheshi':
                    this.sheshi[index].isActive?(this.sheshi[index].isActive=false):(this.sheshi[index].isActive=true);
                    this.sheshi[index].isActive?(this.sheshi[index].position=this.sheshi[index].active):(this.sheshi[index].position=this.sheshi[index].default);
                    break;
                case 'request':
                    this.request[index].isActive?(this.request[index].isActive=false):(this.request[index].isActive=true);
                    this.request[index].isActive?(this.request[index].position=this.request[index].active):(this.request[index].position=this.request[index].default);
                    break;           
            }
        }
    }
};
</script>
<style scoped>
@import url("../../../public/css/normalize.css");
.h_container {
  background: #f5f5f5;
  padding-top: 20px;
  height: 100%;
  display:none 
}
.h_wrap {
  width: 960px;
  margin: 0 auto;
  background: #fff;
  margin-bottom: 20px;
  font: normal 14px/22px "Microsoft YaHei";
  color: #2c3e50;
}
.h_wrap > .h_tit {
  width: 930px;
  height: 53px;
  margin: 0 10px;
  padding-left: 10px;
  font-size: 14px;
  font-weight: bold;
  line-height: 53px;
  color: #30c3a6;
  border-bottom: 1px solid #eee;
}
.h_wrap > .sb_box {
  padding: 20px 0 0 30px;
  display: flex;
}
.h_wrap > .sb_box > h4 {
  width: 103px;
  color: #959ea7;
  margin: 0;
}
.h_wrap > .sb_box > .sb_list {
  list-style: none;
  width: 820px;
  margin: 0;
  padding: 0;
  display: flex;
  flex-wrap: wrap;
}
.sb_list li {
  width: 194px;
  margin: 0;
  padding: 0;
  margin-bottom: 28px;
}
.sb_list li span{
    margin-right: 10px;
    display: inline-block;
}
.sb_list li p{
    display: inline-block;
    padding-left:30px;
    margin-left: 5px;
    cursor: pointer;
}
p.active{
    color:#f05b72;
}
.sb_list > li > .checkbox {
  background: url("../../../public/images/fb_sprice.png") no-repeat 0 -3313px;
  width:14px;
  height: 14px;
  cursor: pointer;
  vertical-align: -1px;
}
.sb_list > li > span.s_active{
    background-position: 0 -3344px;
}
.sb_list > li > .facility_icon {
  margin: 0;
  background: url("../../../public/images/fb_sprice.png") no-repeat 0 -806px;
}
a.keep_btn{
    display:block;
    width:180px;
    height: 44px;
    line-height: 44px;
    background-color: #ff4081;
    text-align: center;
    color: #fff;
    font-size: 18px;
    text-decoration: none;
    font-family: "Microsoft YaHei";
    border-radius: 2px;
    transition: background-color 0.2s ease;
    margin-left: 240px;
}
a.keep_btn:hover{
    background-color:#ca0624;
}
</style>