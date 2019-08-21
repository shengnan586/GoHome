<template>
  <div>
    <div class="el-main">
      <div class="container">
        <!-- 数据列表 -->
        <div class="order_list" v-for="(item,i) in list" :key="i">
          <div class="el-card order_item is-never-shadow">
            <div class="content">
              <div class="pic_wrapper">
                <img
                  width="210"
                  height="150"
                  :src="`http://127.0.0.1:3003/${item.houseimgmd}`"
                  alt
                  class="pic"
                />
              </div>
              <div class="side_info">
                <div class="title">
                  位置:{{item.newadress}}
                  <!-- <a href="javascript:;">收藏时间：{{item.collectime}}</a> -->
                </div>
                <div class="desc">
                  <table>
                    <tr>
                      <td colspan="2">
                        <span>房源标题：{{item.houseTitle}}平方米</span>
                      </td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <span>房源介绍：{{item.houseDESC}}</span>
                      </td>
                      <td></td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <div class="handle">
                <button class="fa_btn" >修改地址</button>
              <button class="fa_btn" >继续发布</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div :style="{display:isnav}" class="pagenav">
      <v-pagination :total="total" :currentPage="current" @pagechange="pagechange"></v-pagination>
    </div>
  </div>
</template>
<script>
import pagination from "../page/page";
export default {
  data() {
    return {
      userid: "", //当前登陆的用户
      isnav: "flex",
      total: 0, // 记录总条数
      pageSize: 0, // 每页显示条数
      current: 1, // 当前的页数
      pageCount: "", //总共页
      list: [], //axios返回的数据
    };
  },
  methods: {
    pagechange(currentPage) {
      this.getList(currentPage);
      // ajax请求, 向后台发送 currentPage, 来获取对应的数据
    },
    getList(currentPage) {
       
      if (currentPage > 0) {
        currentPage = currentPage - 1;
      } else {
        currentPage = 0;
      }
      var obj = { id: this.userid, currentPage: currentPage };
      //  http://127.0.0.1:3003/admin/GetOrderMsglist
      this.axios.get("admin/GethouseList", { params: obj }).then(res => {
        this.list = res.data.data;
        this.total = res.data.count; // 记录总条数
        this.pageSize = res.data.pageSize; // 每页显示条数
        this.pageCount = res.data.pageCount; //总共页
        if (this.list.length > 0) {
          this.isnav = "flex";
        } else {
          this.isnav = "none";
        }
      });
    }
  },
  mounted() {
    this.getList();
  },
  components: {
    "v-pagination": pagination
  }
};
</script>
<style scoped>
*, body {
    font-weight: 300;
    outline: none;
    margin: 0;
    padding: 0;
}
ul{
    margin: 0 !important;padding: 0;
}
ul, ol {
    list-style: none outside none;
}
.el-main {
    margin-left: 20px;
    padding: 0;
    overflow: hidden;
}
/* .tab_list ul {
    border-bottom: 1px solid #bdbdbd;
    display: flex;
    justify-content:space-between;
    margin: 0 auto;
}
.tab_list ul li.active {
    background-color: #ff4081;
    color: #fff;
}
.tab_list ul li {
    display: inline-block;
    width: 11%;
    height: 40px;
    text-align: center;
    line-height: 40px;
    background-color: #fafafa;
    font-size: 14px;
} */
.order_list {
    margin: 0 auto;
}
.order_item {
    /* margin-top: 20px; */
    overflow: visible;
}
.el-card {
    border-radius: 0;
}
.el-card {
    border: 1px solid #ebeef5;
    background-color: #fff;
    color: #303133;
    -webkit-transition: .3s;
    transition: .3s;
    display: flex;
    justify-content: space-between;
    padding-bottom: 20px;
}
.order_item .pic_wrapper .pic {
    display: block;
    background: #EEE;
}
img {
    border: 0 none;
}
img, input, select, textarea, button, i {
    vertical-align: middle;
}
.order_item .side_info {
    margin-left: 20px;
}
.order_item .side_info .title {
    font-size: 18px;
    font-weight: 700;
}
.desc,.total{margin-top: 14px;}
.order_item .total .price {
    color: #ff4081;
    float: none;
    font-style: normal;
}
/* .price {
    color: #F26522;
    font-weight: bold;
    float: right;
} */
.order_item .content {
    display: -webkit-flex;
    display: flex;
    margin-top: 20px;
    font-size: 14px;
}
.desc{
    width: 100%;
}
.desc table{
    width: 100%;
}
.fa_btn {
    display: inline-block;
    height: 35px;
    /* line-height: 35px; */
    min-width: 90px;
    border: solid 1px #E0E0E0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
    border-radius: 2px;
    background: #eee;
    margin-right: 15px;
    border-radius: 5px;
  }
  .order_item .handle {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-pack: end;
    -ms-flex-pack: end;
    justify-content: flex-end;
    -webkit-box-align: end;
    -ms-flex-align: end;
    align-items: flex-end;
}
.fa_btn:hover{
    background-color:rgb(57,181,71,.8);
    border-radius: 5px;
    color: #fff;
}
.fa_btn{
   border-radius: 5px;
   background: #eee;
   margin-right: 10px;
}
.fa_btn:hover{
    background-color:  rgb(57,181,71,.8);
    border-radius: 5px;
    /* #ff4081; */
    color: #fff;
}
.pagenav{
    display: flex; 
    justify-content: center;
    margin-top:10px
}
</style>