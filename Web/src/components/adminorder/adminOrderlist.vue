<template>
  <div>
    <div class="el-main">
      <div class="container">
        <!-- 表头 -->
        <div class="tab_list">
          <ul class="tab_list">
            <li :class="{'active':this.liststatus[0]}" @click="orderStatu(0)">全部</li>
            <li :class="{'active':this.liststatus[1]}" @click="orderStatu(1)">待支付</li>
            <li :class="{'active':this.liststatus[2]}" @click="orderStatu(2)">待入住</li>
            <li :class="{'active':this.liststatus[3]}" @click="orderStatu(3)">入住中</li>
            <li :class="{'active':this.liststatus[4]}" @click="orderStatu(4)">已完成</li>
            <li :class="{'active':this.liststatus[5]}" @click="orderStatu(5)">已取消</li>
          </ul>
        </div>
        <!-- 数据列表 -->
        <div class="order_list" v-for="(item,i) in list" :key="i">
          <div class="el-card order_item is-never-shadow">
            <div class="content">
              <div class="pic_wrapper">
                <img
                  width="210"
                  height="150"
                  :src="`http://127.0.0.1:3003/${item.ImgUrl}`"
                  alt
                  class="pic"
                />
              </div>
              <div class="side_info">
                <div class="title">订单编号：{{item.orderId}}</div>
                <div class="desc">
                  <table>
                    <tr>
                      <td>
                        <span>用户真实姓名：{{item.realName}}</span>
                      </td>
                      <td>
                        <span>用户时间：{{item.checkinDate}}-{{item.checkoutDate}}({{item.days}}天)</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>用户身份证号：{{item.cardID}}</span>
                      </td>
                      <td>
                        <span>用户电话：{{item.phone}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>入住人数：{{item.peopleNumber}}</span>
                      </td>
                      <td>
                        <span>房屋类型：{{item.bedroom}}室{{item.saloon}}厅{{item.toilet}}卫{{item.kitchen}}厨{{item.balcony}}阳台</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>位置：{{item.address}}</span>
                      </td>
                      <td></td>
                    </tr>
                  </table>
                </div>
                <div>
                  <!-- total -->
                  订单总额：
                  <em class="price" v-if="item!=[]?`￥{{item.orderPrice.toFixed(2)}}`:0"></em>
                </div>
              </div>
            </div>
            <div class="handle">
              <!-- <button class="fa_btn">详情</button> -->
              <button class="fa_btn" @click="delorder(item.id)">删除</button>
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
import pagination from "../page/page"
export default {
  data() {
    return {
       userid: sessionStorage.getItem("userid"), //当前登陆的用户
      isnav:"flex",
      total: 0, // 记录总条数
      pageSize: 0, // 每页显示条数
      current: 1, // 当前的页数
      pageCount:"",  //总共页
      list: [], //axios返回的数据
      orderStatus: "", //订单状态（1：待支付；2：待入住；3：入住中；4：已完成；5：已取消
      liststatus: [true, false, false, false, false, false]
    };
  },
  methods: {
    pagechange(currentPage) {
      this.getList(currentPage);
      // ajax请求, 向后台发送 currentPage, 来获取对应的数据
    },
    orderStatu(n) {
      if (n == 0) {
        this.orderStatus = "";
      } else {
        this.orderStatus = n;
      }
      for (var i = 0; i < this.liststatus.length; i++) {
        if (i == n) {
          this.liststatus[i] = true;
        } else {
          this.liststatus[i] = false;
        }
      }
      this.getList(1);
      this.current=1;
    },
    getList(currentPage) {
      if(currentPage>0){
        currentPage=currentPage-1;
      }else{currentPage=0}
      console.log("页码："+currentPage);
      var obj = { orderStatus: this.orderStatus,currentPage:currentPage};
      console.log(this.orderStatus);
      //   http://127.0.0.1:3003/adminorder/GetOrderlist?orderStatus=
      this.axios.get("admin/GetOrderlist", { params: obj }).then(res => {
        this.list = res.data.data;
         this.total=res.data.count; // 记录总条数
        this.pageSize=res.data.pageSize; // 每页显示条数
        this.pageCount=res.data.pageCount;  //总共页
        this.current=Number.parseInt(res.data.pno)+1;
        if(this.list.length>0){
          this.isnav="flex";
        }else{
          this.isnav="none";
        }
      });
    },
    delorder(id) {
      if (confirm("确认删除吗?")) {
        if (id != "" && id != "underfind") {
          var obj = { id };
          this.axios.post("admin/DelOrder", obj).then(res => {
            if (res.data.code == 1) {
              alert("删除成功");
              this.getList();
            } else {
              alert("删除失败");
            }
          });
        }
      }
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
.tab_list ul {
    border-bottom: 1px solid #bdbdbd;
    display: flex;
    justify-content:space-between;
    margin: 0 auto;
}
.tab_list ul li.active {
    background-color: rgb(57,181,71,.8) !important;
    border-radius: 5px;
    /* #ff4081; */
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
}
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
.price {
    color: #F26522;
    font-weight: bold;
    float: right;
}
.order_item .content {
    display: -webkit-flex;
    display: flex;
    margin-top: 20px;
    font-size: 14px;
}
.order_item .handle {
    display: -webkit-flex;
    display: flex;
    -webkit-justify-content: flex-end;
    justify-content: flex-end;
    align-items: flex-end;
}
.fa_btn {
    display: inline-block;
    height: 35px;
    /* line-height: 35px; */
    min-width: 90px;
    border: solid 1px #E0E0E0;
    box-sizing: border-box;
    border-radius: 2px;
    background: #eee;
    margin-right: 15px;
    border-radius: 5px;
}

.desc{
    width: 100%;
}
.desc table{
    width: 100%;
}
.fa_btn:hover{
    background-color:rgb(57,181,71,.8);
     /* #ff4081; */
    color: #fff;
    border-radius: 5px;
}
.pagenav{
    display: flex; 
    justify-content: center;
    margin-top:10px
}
</style>