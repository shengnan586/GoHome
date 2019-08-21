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
                <div class="title">房源标题:{{item.houseTitle}}</div>
                <div class="desc" style="width:100%">
                  <table style="width:100%">
                    <tr>
                      <td>
                        <span>位置：{{item.parenttypename}}{{item.aTypeName}}</span>
                      </td>
                      <td>
                        <span>详细位置：{{item.address}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>房屋面积：{{item.roomSize}}</span>
                      </td>
                      <td>
                        <span>房屋类型：{{item.bedroom}}室{{item.saloon}}厅{{item.toilet}}卫{{item.kitchen}}厨{{item.balcony}}阳台</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>户主电话：{{item.phone}}</span>
                      </td>
                      <td>
                        <span>信息提醒时间：{{item.msgtime}}</span>
                      </td>
                    </tr>
                    <tr>
                      <td>
                        <span>信息内容：{{item.msgContent}}</span>
                      </td>
                      <td></td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <!-- <div class="handle">
              <button class="fa_btn" @click="delorder(item.id)">删除</button>
            </div> -->
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
      list: [] //axios返回的数据
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
      console.log("页码：" + currentPage);
      var obj = { id: this.userid, currentPage: currentPage };
      console.log(this.orderStatus);
      //  http://127.0.0.1:3003/adminsettlement/GetOrderMsglist
      this.axios
        .get("admin/GetOrderMsglist", { params: obj })
        .then(res => {
          console.log(res);
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
@import url("../../assets/css/adminsettlement.css");
</style>