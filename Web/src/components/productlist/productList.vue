<template>
  <div class="container">
    <!-- 条件筛选框-->
    <homeheader></homeheader>
    <div class="searchBar">
      <div class="searchBar_l">
        <ul class="searchBar_l_ul">
          <li>
            <div>北京</div>
          </li>
          <li>
            <div class="city" @mouseenter="enter" @mouseleave="leave">
              <div>
                {{selectedText}}
                <span class="icon iconfont icon-xiajiantou"></span>
              </div>
              <ul class="city-area" v-show="show" @click="selectedArea">
                <li
                  v-for="(area,i) of areaList"
                  :key="i"
                  :data-value="area.id"
                  :data-text="area.aTypeName"
                >
                  <a href="javascript:;">{{area.aTypeName}}</a>
                </li>
              </ul>
            </div>
          </li>
          <li>
            <div class="date_box">
              <laydate @getValue="getDateValue" class="date_txt"></laydate>
              <i class="iconfont icon-rili"></i>
            </div>
          </li>
          <li>
            <div>
              <div class="city" @mouseenter="Numenter" @mouseleave="Numleave">
                <div>
                  {{NumselectedValue}}人
                  <span class="icon iconfont icon-xiajiantou"></span>
                </div>
                <ul class="city-area" v-show="Numshow" @click="selectedNum">
                  <li v-for="(n,i) of 10" :key="i" :data-value="n">
                    <a href="javascript:;">{{n}}人</a>
                  </li>
                </ul>
              </div>
            </div>
          </li>
        </ul>
        <button id="searchBtn" @click="searchBtn">开始搜索</button>
      </div>
      <div class="search-tab">
        <div class="search-tab-item">
          <div>出租方式</div>
          <ul @click="chuzuchecked">
            <li :class="{active:chuzuid=='0'}" data-id="0">
              <span data-id="0">不限</span>
            </li>
            <li :class="{active:chuzuid=='1'}" data-id="1">
              <span data-id="1">整套出租</span>
            </li>
            <li :class="{active:chuzuid=='2'}" data-id="2">
              <span data-id="2">独立房间</span>
            </li>
            <li :class="{active:chuzuid=='3'}" data-id="3">
              <span data-id="3">合住房间</span>
            </li>
          </ul>
        </div>
        <div class="search-tab-item">
          <div>户型</div>
          <div>
            <label>
              <input type="checkbox" v-model="apartment[1]" />一居
            </label>
            <label>
              <input type="checkbox" v-model="apartment[2]" />二居
            </label>
            <label>
              <input type="checkbox" v-model="apartment[3]" />三居
            </label>
            <label>
              <input type="checkbox" v-model="apartment[4]" />四居
            </label>
            <label>
              <input type="checkbox" v-model="apartment[0]" />其他
            </label>
          </div>
        </div>
        <div class="search-tab-item">
          <div>价格</div>
          <ul @click="pricechecked">
            <li :class="{active:priceid=='0'}" data-id="0">
              <span data-id="0">0-300</span>
            </li>
            <li :class="{active:priceid=='1'}" data-id="1">
              <span data-id="1">300-600</span>
            </li>
            <li :class="{active:priceid=='2'}" data-id="2">
              <span data-id="2">600-900</span>
            </li>
          </ul>
        </div>
        <div class="search-tab-item">
          <div>搜索关键词</div>
          <div>
            <input type="text" class="keywords" placeholder="请输入房屋信息" v-model="searchKey" />
          </div>
        </div>
        <!-- <table class="search_tab">
          <tr>
            <td>出租方式</td>
            <td>
              <p :class="{pactive:l==1}" id="1" @click="tdclick1">不限</p>
            </td>
            <td>
              <p :class="{pactive:l==2}" id="2" @click="tdclick1">整套出租</p>
            </td>
            <td>
              <p :class="{pactive:l==3}" id="3" @click="tdclick1">独立房间</p>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>预定类型</td>
            <td>
              <p :class="{pactive:m==4}" id="4" @click="tdclick2">不限</p>
            </td>
            <td>
              <p :class="{pactive:m==5}" id="5" @click="tdclick2">立即预定</p>
            </td>
            <td>
              <p :class="{pactive:m==6}" id="6" @click="tdclick2">申请预定</p>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>价格</td>
            <td>
              <p :class="{pactive:n==7}" id="7" @click="tdclick3">0-300</p>
            </td>
            <td>
              <p :class="{pactive:n==8}" id="8" @click="tdclick3">300-600</p>
            </td>
            <td>
              <p :class="{pactive:n==9}" id="9" @click="tdclick3">600-900</p>
            </td>
            <td></td>
          </tr>
          <tr>
            <td>搜索关键词</td>
            <td colspan="4">
              <div>
                <input type="text" placeholder="请输入地址信息" v-model="searchKey" />
              </div>
            </td>
          </tr>
        </table>-->
      </div>
      <div class="pricelist"></div>
    </div>
    <!--商品列表 -->
    <div class="productBar">
      <product :productList="productList"></product>
      <!--<div class="productItem" v-for="(p ,i) of arr" :key="i">
        <a class="divImg" href="javascript:;">
          <img src="../../../public/ChAFfVqqEhuATQSyAAzlNSICA1s060.JPG_Z_1200_800.jpg" alt />
        </a>
        <div class="divMsg">
          <a href=":;" id="aTitle">{{p.houseTitle}}</a>
          <h5>整套公寓·可住{{p.peopleNumber}}人</h5>
          <p>
            <span>￥{{p.cashMoney}}</span>
            每晚
          </p>
          <div>
            <span>1人fd居</span>
            <span>1人d居</span>
            <span>1人居</span>
          </div>
        </div>
        <div class="divHost">
          <a href="javascript:;">
            <img src="../../../public/Draven.png" alt />
          </a>
          <p>房东</p>
          <p>德莱文</p>
        </div>
      </div> -->
      <div class="more"><a href="javascript:;" @click="getmore">加载更多...</a></div>
      <!-- <button class="getbtn" @click="getmore">加载更多</button> -->
    </div>
    <homefooter></homefooter>
  </div>
</template>
<script>
import layDate from "../laydate/laydate.vue";
import product from './product';
export default {

  data() {
    return {
      areaList: [],
      selectedAreaId: "",
      show: false,
      selectedText: "请选择区县",
      Numshow: false,
      NumselectedValue: "",
      orderDate: {},
      apartment: [],
      chuzuid: "0",
      priceid: "0",
      productList: [],
      currentPage:0,//当前页码
      searchKey:""
           
            
        }
    },
  methods: {
    //获取时间控件返回的时间对象{入住时间、离开时间、天数}
    getDateValue(orderDate) {
      this.orderDate = orderDate;
    },
    chuzuchecked(e) {
      this.chuzuid = e.target.dataset.id;
    },
    pricechecked(e) {
      this.priceid = e.target.dataset.id;
    },
    //选中人数
    selectedNum(e) {
      this.NumselectedValue = e.target.dataset.value;
      this.Numshow = false;
    },
    //鼠标进入宜居人数，显示人数列表
    Numenter() {
      this.Numshow = true;
    },
    //鼠标离开宜居人数，隐藏人数列表
    Numleave() {
      this.Numshow = false;
    },
    //选中区县
    selectedArea(e) {
      this.selectedAreaId = e.target.dataset.value;
      this.selectedText = e.target.dataset.text;
      this.show = false;
    },
    //鼠标进入区县，显示区县列表
    enter() {
      this.show = true;
    },
    //鼠标离开区县，隐藏区县列表
    leave() {
      this.show = false;
    },
    //页面加载，加载区县列表
    load() {
      this.axios
        .get("area", { params: { aParentId: 1, aType: 0 } })
        .then(result => {
          this.areaList = result.data;
          //this.selectedAreaId = result.data[0].id;
        });
    },

    // 搜索条
    searchBtn() {
      this.currentPage=0;
      this.loadmore();
    },
    // 查询全部商品
    loadmore() {
      var url = "productlist/GetProduct";
      var new_apartment=[];
      for(var i=0;i<this.apartment.length;i++){
        if(this.apartment[i]){
          new_apartment.push(i);
        }
      }
      var params = {
        currentPage:this.currentPage,//当前页码
        rentalTypeId: this.chuzuid, //不选择默认0
        peopleNumber: this.peopleNumber, //不选择默认空
        aId: this.selectedAreaId, //不选择默认空
        bedroom: new_apartment.toString(), //
        houseDESC: this.searchKey,//默认值空
        smallprice: this.priceid * 300,//默认值0
        bigprice: (Number(this.priceid) + 1) * 300,//默认值300
        checkinDat: this.orderDate.start,//
        checkoutDate: this.orderDate.end
      };
      console.log(params);
      this.axios.get(url, { params }).then(res=>{
        this.productList=this.productList.concat(res.data.data);
      }).catch(err=>console.log(err));
    },
    getmore() {
      this.currentPage++;
      this.loadmore();
    }
  },
  created() {
    this.selectedText=this.$route.query.selectedText;
    this.selectedAreaId=this.$route.query.selectedAreaId;
    this.orderDate=this.$route.query.orderDate;
    if(!this.orderDate){
      this.orderDate={};
    }
    this.load();
    this.loadmore();
  },
  components: {
    laydate: layDate,
    product:product
  }
};
</script>
<style scoped>
@import url("../../assets/css/productlist/productlist.css");

.city {
  border-radius: 0 0 5px 5px;
}
.city div:first-child {
  width: 203px;
  height: 38px;
  line-height: 38px;
  background-color: #fff;
  padding: 0 20px;
  box-sizing: border-box;
  cursor: pointer;
  font-size: 14px;
  color: #444;
  border-radius: 5px 0 0 5px;
}
.city .icon {
  float: right;
  color: #bbb;
}
.city .city-area {
  background-color: #fff;
  padding-top: 5px;
  margin-top: -5px;
  position: relative;
  z-index: 1;
}
.city .city-area li {
  height: 40px;
  line-height: 40px;
  padding: 0 20px;
  cursor: pointer;
}
.city .city-area li:hover {
  background-color: #eee;
}
.city .city-area li:hover a {
  color: #39b54a;
}
.city .city-area a {
  color: #444;
}
.date_box {
  width: 250px;
  height: 38px;
  line-height: 38px;
  background-color: #fff;
  border: 0;
}
.date_box .date_txt {
  width: 250px;
}
.date_box i {
  top: 0;
}
.search-tab-item {
  width: 90%;
  height: 60px;
  line-height: 60px;
  display: flex;
  justify-content: flex-start;
  font-size: 16px;
  color: #aaa;
  border-bottom: 1px solid #ccc;
}
.search-tab-item > div:first-child {
  width: 180px;
  margin-left: 10px;
  color: #333;
}
.search-tab-item ul {
  display: flex;
  justify-content: space-around;
  flex: 1;
}
.search-tab-item ul li {
  width: 33%;
  text-align: left;
  cursor: pointer;
}
.search-tab-item ul li:hover {
  color: #39b54a;
}

.search-tab-item ul li span {
  padding: 8px 15px;
}
.search-tab-item ul li.active span {
  color: #39b54a;
  border: 1px solid #39b54a;
  border-radius: 5px;
}
.search-tab-item label {
  margin-right: 40px;
}
.search-tab-item label input{
  margin-left: 8px;
}
.productBar .more{
  text-align: center;
  font-size: 16px;
}
.productBar .more a{
  color:#333;
}
.productBar .more a:hover{
  color:#39b54a;
}

</style>