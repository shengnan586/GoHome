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
                        
                        <input type="text" id="start" placeholder="入住日期" readonly="readonly" style="cursor: pointer;" class=""/>
                        
                    </li>
                    <li>
                        
                            <input type="text" id="end" placeholder="离开日期" readonly="readonly" style="cursor: pointer;" class=""/>
                        
                    </li>
                    <li>
                        <div>
                            <input type="text" id="personNumIpt" placeholder="入住人数" readonly="readonly" style="cursor: pointer;" class=""/>
                        </div>
                    </li>
                    
                </ul>
                <button id="searchBtn">开始搜索</button>
            </div>
            <div class="search_list">
               <table class="search_tab">
                    <tr>
                       <td>
                            <div>出租方式</div>
                       </td>
                       <td> 
                            <div>不限</div>
                       </td>
                       <td>
                            <div>整套出租</div>
                        </td>
                       <td>     
                            <div>独立房间</div>
                        </td>
                    </tr>
                    <tr>
                       <td>
                            <div>预订类型</div>
                       </td>
                       <td> 
                            <div>不限</div>
                       </td>
                       <td>
                            <div>立即预订</div>
                        </td>
                       <td>     
                            <div>申请预定</div>
                        </td>
                    </tr>
                    
               </table>
            </div>
            
        </div>
    <!--商品列表 --> 
        <div class="productItem" v-for="(p ,i) of arr" :key="i">
            <a class="divImg" href="javascript:;">
                <img src="../../public/ChAFfVqqEhuATQSyAAzlNSICA1s060.JPG_Z_1200_800.jpg" alt="">
            </a>
            <div class="divMsg" >
                <a href=":;" id="aTitle">万科金色领域24 | 广佛线地铁上盖 | 北欧风公寓 | 配套设施齐全 | 千灯湖公园 | 交通便利</a>
                <h5>整套公寓·可住两人</h5>
                <p>
                <span>￥480</span> 
                每晚</p>
                <div>
                    <span>1人fd居</span>
                     <span>1人d居</span>
                      <span>1人居</span>
                </div>
            </div>
            <div class="divHost">
                <a href="javascript:;">
                    <img src="../../public/Draven.png" alt="">
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
            arr:[]
        }
    }
}
</script>
<style scoped>
    /* */
    .search_list{
        position:absolute;
        top:100px;
        width:100%;
    }
    .search_tab{
        width:600px;
    }
    .search_tab tr{
        width:100px;height:90px;    
    }
    .search_tab>tr>td{
        width:190px;height:90px;
        font-size:14px;
        color:#666;
    }
    .search_tab>tr>td:first-child{
        width:190px;height:90px;
        font-size:18px;
        color:#999;
    }
    .search_tab>tr>td>div{
        width:80px;height:30px;
        text-align:center;
        line-height:30px;
    }
    .search_tab>tr>td>div:hover{
        color:#39b54a;
    }

    /*查询列表 */
    
    .search_bar {
        width: 100%;
        height: 50px;
      padding-top: 30px;
      position:relative;
     
    }
     .searchBar_l{
        float: left;
        width: 839px;
        height: 48px;
        border: 1px solid #39b54a;
        border-radius: 5px 0 0 5px;
         margin-left:10px;
         border-right:0;
        text-align:center;
    }
    .searchBar_l_ul{
        width: 100%;
        padding: 10px 0;
        height: 38px;
        line-height: 30px;
        list-style:none;
        display:flex;
        padding:3px;
        margin-top:5px;
        align-items:center;
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
       background:#EFEFF4;
       font-size:14px;
       padding:0px 15px; 
   }
    #searchBtn{
        width:160px;height:50px;
        position:absolute;
        top:39px;left:848px;
        background:#39b54a;
        color:#fff;
        font-size:16px;
    }

    /*商品列表*/
    .productItem{
        width:1000px;
        height:244px;
        display:flex;
        justify-content:space-between;
        background:#fff;
        align-items:center;
        margin:20px auto;
        border-radius:10px;
        
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
        margin-top:20px;
        
    }
    #aTitle{
        display:block;
        padding-left:10px;
        width:500px;
        font-size:20px;
        font-weight:bold;
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
        width:180px;height:240px;
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