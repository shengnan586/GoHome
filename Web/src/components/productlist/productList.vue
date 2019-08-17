<template>
   <div class="container">
   <!-- 条件筛选框-->
       <div class="searchBar">
            <div class="searchBar_l">
                <ul class="searchBar_l_ul" >
                    <li >
                        <div>
                            <input type="text" id="cityIpt" placeholder="北京" readonly="readonly"/>
                        </div>
                    </li>
                    <li>
                        <select  id="city_show" class="select_css">
                            <option value="1001">请选择</option>
                            <option value="1002">朝阳</option>
                            <option value="1001">海淀</option>
                            <option value="1002">朝阳</option>
                        </select>
                        
                    </li>
                    <li>
                        
                            <input type="text" id="end" placeholder="入住日期" readonly="readonly" style="cursor: pointer;" class=""/>
                        
                    </li>
                    <li>
                        <div>
                            <select class="select_css">
                                <option value="">入住人数</option>
                                <option value="0001">1人</option>
                                <option value="0001">2人</option>
                                <option value="0001">3人</option>
                                <option value="0001">4人</option>
                                <option value="0001">5人</option>
                            </select>
                        </div>
                    </li>
                    
                </ul>
                <button id="searchBtn">开始搜索</button>
               
            </div> 
            <div>
                <table class="search_tab">
                    <tr >
                        <td>
                            价格
                        </td>
                        <td><p >0-300</p></td>
                        <td><p >300-600</p></td>
                        <td><p >600-900</p></td>
                    </tr>
                    <tr>
                        <td>搜索关键词</td>
                        <td colspan=3>
                            <div>
                                <input type="text" placeholder="请输入商圈、景点、房间名、房东名等">
                            </div>
                        
                        </td>
                    </tr>
                </table>
            </div>
            <div class="pricelist">

            </div>
        </div>
    <!--商品列表 --> 
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
</template>
<script>
export default {
    data(){
        return{
            arr:[],
           
            
        }
    },
    methods: {
        
        loadmore(){
            var url="order/productlist"
            console.log(2)
            this.axios.get(url).then(res=>{
            if(res.data.code==-1){
                console.log(-1);
            }else{
                console.log(res.data.data)
                this.arr=res.data.data;
            }
            })
        }
        
    },
    created(){
          console.log(3)
          this.loadmore();
          
    }
}
</script>
<style scoped>
    /*选择条 */
    input:focus { outline: none; } 
    select:focus { outline: none; } 
    a{  text-decoration:none;}
    .search_tab{
        width:992px;
        height:160px;
        position:absolute;
        top:100px;
        border-collapse: collapse;
        border-spacing: 0; 
        margin-left:10px;
        color:#ccc;

    }
    .search_tab>tr{
        height:90px;
       
        border-bottom:1px solid #ccc;
    }
    .search_tab td{
        height:50px;
        line-height:50px;
        font-size:16px;
        
    }
     .search_tab div{
         width:270px; height:40px;
         border:1px solid #ccc;
         border-radius:5px;
         position:relative;
         
     }
     .search_tab p{
         width:82px;height:32px;
         box-sizing:border-box;
         border:1px solid rgba(0,0,0,0);
         line-height:32px;
         text-align:center;
     }
     .search_tab p:hover{
         border:1px solid #39b54a;
         border-radius:5px;
         color:#39b54a;
     }
     .search_tab input{
         width:92%;
        position:absolute;
        top:11px;
        left:10px;
        border:0;
     }
    /*搜索条 */
    .select_css{
        width:83%;height:20px;
        border:0;
        text-align:center;
        color:#999;
        margin-left:10px;
    }
    
    .search_list{
        position:absolute;
        top:100px;
        width:100%;
        
    }
    

    /*查询列表 */
    
    .searchBar {
        width: 1000px;
        height: 260px;
        padding-top: 30px;
        position:relative;
        margin:auto;
     
    }
    
     .searchBar_l{
        float: left;
        width: 839px;
        height: 48px;
        border: 1px solid #39b54a;
        border-radius: 5px 0 0 5px;
        position:relative;
         margin-left:10px;
         border-right:0;
        text-align:center;
    }
    .searchBar_l_ul{
        width: 100%;
        /*/ padding: 10px 0;*/
        height: 38px;
        line-height: 30px;
        list-style:none;
        display:flex;
        padding:3px;
        margin-top:5px;
        align-items:center;
        margin-bottom:0;
    }
    .searchBar_l
    .searchBar_l_ul>li {
        
        float: left;
        width: 208px;
        height: 30px;
        line-height: 30px;
        border-right: 1px solid #39b54a;
        position: relative;
       
         
    }
    .searchBar_l
    .searchBar_l_ul>li:last-child{
       border:0;
    }
   .searchBar_l
   .searchBar_l_ul 
   input{
       border:none;
       height:100%;
       background:#fff;
       font-size:14px;
       padding:0px 15px; 
   }
    #searchBtn{
        width:160px;height:50px;
        position:absolute;
        top:-1px;left:836px;
        background:#39b54a;
        color:#fff;
        font-size:18px;
        outline:none;
        border:0;
        border-radius:0 5px 5px 0;
    }

    /*商品列表*/
    .productItem{
        width:1000px;
        height:244px;
        display:flex;
        box-sizing:border-box;
        overflow:hidden;
        padding:20px;
        justify-content:space-between;
        background:#f6f6f6;
        align-items:center;
        margin:20px auto;
       
        border-radius:3px;
        
    }
    .productItem p{
        font-size:20px;
        margin-top:20px;
      
    }
    .productItem p>span:first-child{
        color:#000;
        font-weight:bold;
        font-size:30px !important;
       
    }
    /*商品图片 */
    .divImg{
        width:320px;height:200px;
        margin-left:30px;
    }

    .divImg img{
        width:100%;height:100%;
    }
    /*商品描述*/
    .divMsg{
        width:500px;height:200px;
        margin-left:20px;
        
        
    }
    #aTitle{
        display:block;
        padding-left:10px;
        width:500px;
        font-size:20px;
        
        overflow:hidden;
        text-overflow:ellipsis;
        white-space:nowrap;
        margin-bottom:20px;
        color:#666 !important;
    }
    
    .divMsg div:last-child{
        margin-top:40px;
        width:300px;height:40px;
        display:flex;
        justify-content:space-between;

    }
    .divMsg div:last-child>span{
        padding:0 10px;
        line-height:40px;
        border:2px solid #ccc;
        box-sizing:border-box;
        color:#ccc;
        border-radius:10%;
        
    }
    /*房主信息 */
    .divHost{
        width:180px;height:200px;
        border-left:2px dashed #39b54a;
    }
    .divHost a{
        display:block;
        width:80px;height:80px;
        
        border-radius:50%;
        overflow:hidden;
        margin:auto;
        margin-top:40px;
    }
    .divHost img{
        width:80px;height:80px;
    }
    .divHost p{
        text-align:center;
        margin-top:20px;
        font-size:16px;
        color:#666 !important;
        font-weight:bold;
    }
    .divHost p:last-child{
        font-size:20px;
        text-align:center;
    }
</style>