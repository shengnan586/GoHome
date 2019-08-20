<template>
   <div class="container">
   <!-- 条件筛选框-->
        <Header></Header>
       <div class="searchBar">
            <div class="searchBar_l">
                <ul class="searchBar_l_ul" >
                    <li >
                        <div>
                            <input type="text" id="cityIpt" placeholder="北京" readonly="readonly"/>
                        </div>
                    </li>
                    <li>
                        <select  id="city_show" class="select_css" v-model="city">
                            <option value=1000>请选择</option>
                            <option value=1001>朝阳</option>
                            <option value=1002>海淀</option>
                            <option value=1003>朝阳</option>
                        </select>
                        
                    </li>
                    <li>
                        
                            <input type="text" id="end" placeholder="入住日期" readonly="readonly" style="cursor: pointer;" class=""/>
                        
                    </li>
                    <li>
                        <div>
                            <select class="select_css" v-model="pnum">
                                <option value=0>入住人数</option>
                                <option value=1>1人</option>
                                <option value=2>2人</option>
                                <option value=3>3人</option>
                                <option value=4>4人</option>
                                <option value=5>5人</option>
                            </select>
                        </div>
                    </li>
                    
                </ul>
                <button id="searchBtn" @click="searchBtn">开始搜索</button>
               
            </div> 
            <div>
                <table class="search_tab">

                    <tr>
                        <td>出租方式</td>
                        <td><p :class="{pactive:l==1}" id="1" @click="tdclick1">不限</p></td>
                        <td><p :class="{pactive:l==2}" id="2" @click="tdclick1">整套出租</p></td>
                        <td><p :class="{pactive:l==3}" id="3" @click="tdclick1">独立房间</p></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td>预定类型</td>
                        <td><p :class="{pactive:m==4}" id="4" @click="tdclick2">不限</p></td>
                        <td><p :class="{pactive:m==5}" id="5" @click="tdclick2">立即预定</p></td>
                        <td><p :class="{pactive:m==6}" id="6" @click="tdclick2">申请预定</p></td>
                        <td></td>
                    </tr>
                    <tr >
                        <td>
                            价格
                        </td>
                        <td><p :class="{pactive:n==7}" id="7" @click="tdclick3">0-300</p></td>
                        <td><p :class="{pactive:n==8}" id="8" @click="tdclick3">300-600</p></td>
                        <td><p :class="{pactive:n==9}" id="9" @click="tdclick3">600-900</p></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td >搜索关键词</td>
                        <td colspan=4>
                            <div>
                                <input type="text" placeholder="请输入商圈、景点、房间名、房东名等" v-model="searchKey">
                            </div>
                        
                        </td>
                    </tr>
                </table>
            </div>
            <div class="pricelist">

            </div>
        </div>
    <!--商品列表 --> 
        <div class="productBar">
            <div class="productItem" v-for="(p ,i) of arr" :key="i">
                <a class="divImg" href="javascript:;">
                    <img src="../../../public/ChAFfVqqEhuATQSyAAzlNSICA1s060.JPG_Z_1200_800.jpg" alt="">
                </a>
                <div class="divMsg" >
                    <a href=":;" id="aTitle">{{p.houseTitle}}</a>
                    <h5>整套公寓·可住{{p.peopleNumber}}人</h5>
                    <p>
                    <span>￥{{p.cashMoney}}</span> 
                    每晚</p>
                    <div>
                        <span>1人fd居</span>
                        <span>1人d居</span>
                        <span>1人居</span>
                    </div>
                </div>
                <div class="divHost">
                    <a href="javascript:;">
                        <img src="../../../public/Draven.png" alt="">
                    </a>
                    <p>房东</p>
                    <p>德莱文</p>
                </div>
                
            </div> 
        </div>
       <Footer></Footer>    
           
   </div> 
  
</template>
<script>
import footer from "../index/footer.vue";
import header from "../index/header.vue";
export default {
    data(){
        return{
            arr:[],
            n:7,
            m:4,
            l:1,
            city:1000,
            pnum:0,
            searchKey:""
           
            
        }
    },
    methods: {
        // 搜索条
        searchBtn(){
            var url="order/proSearch"
            var aid=this.city==1000?null:this.city;
            var pnum=this.pnum;
            
            this.axios.get(url,{params:{aid,pnum}}).then()
        },
        // 查询全部商品
        loadmore(){
            var url="order/productlist"
            var start=this.arr.length;
            var count=5; 
            
            this.axios.get(url,{params:{start,count}}).then(res=>{
            if(res.data.code==-1){
                console.log(-1);
            }else{
                console.log(res.data.data)
                this.arr=res.data.data;
            }
            })
        },
        // 下面选择条
        tdclick1(e){
            if(this.l!=e.target.id){
                 this.l=e.target.id;
            }else {
                 this.l="";
            }
        },
      
        tdclick2(e){
            if(this.m!=e.target.id){
                 this.m=e.target.id;
            }else {
                 this.m="";
            }
        },   
        tdclick3(e){
            if(this.n!=e.target.id){
                 this.n=e.target.id;
            }else {
                 this.n="";
            }
            // if(e.target.id==7){
            //     var arr1=this.arr.filter(
            //     function(elem){
            //         return elem>0&&elem<300}
            // )
            // }else if(e.target.id==8){
            //     var arr1=this.arr.filter(
            //     function(elem){
            //         return elem>300&&elem<600}
            // )
            // }else{
            //     var arr1=this.arr.filter(
            //     function(elem){
            //         return elem>600&&elem<900}
            // )
            // }
           
            
            // console.log(arr1);
        },
        // 关键词查询
       


    },
    watch: {
        searchKey(){
            var url="order/searchKey";
            console.log(this.searchKey);
            var key=this.searchKey;
            var start=0;
            var count=4;
            this.axios.get(url,{params:{key}}).then(res=>{
                this.arr=res.data.data
            }).catch(err=>{
                alert("没有找到相关信息");
            })
        }
    },
    created(){
          this.loadmore();
    },

    components:{
              Footer:footer,
              Header:header
    }

}
</script>
<style scoped>
 @import url("../../assets/css/productlist/productlist.css")
</style>