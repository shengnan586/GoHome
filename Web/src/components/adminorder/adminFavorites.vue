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
                  :src="`http://127.0.0.1:3003/${item.ImgUrl}`"
                  alt
                  class="pic"
                />
              </div>
              <div class="side_info">
                <div class="title">
                  房源标题:{{item.houseTitle}}
                  <a href="javascript:;">收藏时间：{{item.collectime}}</a>
                </div>
                <div class="desc">
                  <table>
                    <tr>
                      <td>
                        <span>位置：{{item.parentName}}{{item.aTypeName}}</span>
                      </td>
                      <td>
                        <span>详细位置：{{item.address}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>房屋面积：{{item.roomSize.toFixed(2)}}平方米</span>
                      </td>
                      <td>
                        <span>房屋类型：{{item.bedroom}}室{{item.saloon}}厅{{item.toilet}}卫{{item.kitchen}}厨{{item.balcony}}阳台</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>平时价格：{{item.normalPrice.toFixed(2)}}元</span>
                      </td>
                      <td>
                        <span>节假日价格：{{item.festivalPrice.toFixed(2)}}元</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>押金金额：{{item.cashMoney==""?"0.00":item.cashMoney.toFixed(2)}}元</span>
                      </td>
                      <td>
                        <span>其他费用：{{item.otherMoney}}</span>
                      </td>
                    </tr>
                    <tr>
                      <!-- <td>
                        <span>交通情况：{{item.traffic}}</span>
                      </td> -->
                      <td colspan="2">
                        <span>户主电话：{{item.phone}}</span>
                      </td>
                    </tr>
                    <!-- <tr>
                      <td colspan="2">
                        <span>房源介绍：{{item.houseDESC}}</span>
                      </td>
                      <td></td>
                    </tr> -->
                    <tr>
                      <td colspan="2">
                        <div style="float:left">床铺信息：</div>
                        <div style="float:left">
                          <div v-for="(item,i) of listBed" :key="i">
                          <input type="checkbox" disabled="false" checked />
                          {{item.bedType}}:
                          长-{{item.width}} 宽-{{item.extent}} 个数-{{item.num}}描述:{{item.description}}<br>
                        </div>
                        </div>
                      </td>
                      <td></td>
                    </tr>
                    <tr>
                      <td colspan="2">
                        <span>房屋设施：</span>
                        <span v-for="(item,i) of listinstallation" :key="i">
                          <input type="checkbox" disabled="false" checked />
                          {{item.installName}}
                        </span>
                      </td>
                      <td></td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <div class="handle">
              <button class="fa_btn" @click="delCollectByid(item.collectid)">删除</button>
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
      listinstallation: [], //axios根据每条信息的hid查询每次的设施信息
      listBed: [] //axios根据每条信息的hid查询每个户型的床铺信息
    };
  },
  methods: {
    //删除收藏
    delCollectByid(id){
      if (confirm("确认删除吗?")) {
        if (id != "" && id != "underfind") {
          var obj = { id };
          this.axios.post("admin/DelCollectByid", obj).then(res => {
            if (res.data.code == 1) {
              alert("删除成功");
              this.getList();
            } else {
              alert("删除失败");
            }
          });
        }
      }
    },
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
      console.log("页码：" + currentPage);
      var obj = { id: this.userid, currentPage: currentPage };
      console.log(this.orderStatus);
      //  http://127.0.0.1:3003/admin/GetOrderMsglist
      this.axios.get("admin/GetCollectlist", { params: obj }).then(res => {
        console.log(res);
        this.list = res.data.data;
        this.total = res.data.count; // 记录总条数
        this.pageSize = res.data.pageSize; // 每页显示条数
        this.pageCount = res.data.pageCount; //总共页
        if (this.list.length > 0) {
          this.isnav = "flex";
          for (var i = 0; i < this.list.length; i++) {
            obj = { hid: this.list[i].id };
            this.axios
              .get("admin/GetInstallationByhid", { params: obj })
              .then(res => {
                this.listinstallation = res.data.data;
              });
            this.axios.get("admin/GetBedByhid", { params: obj }).then(res => {
              this.listBed = res.data.data;
            });
          }
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
/* @import url("../../assets/css/adminFavorites.css"); */
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
.order_list {
    margin: 0 auto;
}
.order_item {
    margin-top: 0px;
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
.order_list .pic_wrapper{
    display: flex;
    align-items: center;
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
.title>a{
  margin-left: 30px;
  font-size:13px;
  color:gray;
}
.desc,.total{margin-top: 14px;}
.order_item .total .price {
    color: #ff4081;
    float: none;
    font-style: normal;
}
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
.fa_btn:hover{
    background-color: #ff4081;
    color: #fff;
}
.pagenav{
    display: flex; 
    justify-content: center;
    margin-top:10px
}
</style>