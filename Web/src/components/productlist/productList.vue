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
                {{selectedText?selectedText:"--请选择--"}}
                <span class="icon iconfont icon-xiajiantou"></span>
              </div>
              <ul class="city-area" v-show="show" @click="selectedArea">
                <li data-text="--请选择--">
                  <a href="javascript:;">--请选择--</a>
                </li>
                <li
                  v-for="(area,i) of areaList"
                  :key="i"
                  :data-value="area.id"
                  :data-text="area.aTypeName"
                >
                  <a href="javascript:;" :data-value="area.id"
                  :data-text="area.aTypeName">{{area.aTypeName}}</a>
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
                  {{NumselectedValue?NumselectedValue+"人":"--请选择--"}}
                  <span class="icon iconfont icon-xiajiantou"></span>
                </div>
                <ul class="city-area" v-show="Numshow" @click="selectedNum">
                  <li>
                    <a href="javascript:;">--请选择--</a>
                  </li>
                  <li v-for="(n,i) of 10" :key="i" :data-value="n">
                    <a href="javascript:;" :data-value="n">{{n}}人</a>
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

            <li v-for="(c,i) of rentList" :key="i" :class="{active:chuzuid==c.id}" :data-id="c.id">
              <span :data-id="c.id">{{c.typeName}}</span>
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
     
      </div>
    </div>
    <!--商品列表 -->
    <div class="productBar">
      <product :productList="productList"></product>
      <div class="more"><a href="javascript:;" @click="getmore">加载更多...</a></div>
    </div>
    <homefooter class="footer"></homefooter>
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
      selectedText: "",
      Numshow: false,
      NumselectedValue: "",
      orderDate: {},
      apartment: [],
      chuzuid: "0",
      priceid: "0",
      productList: [],
      currentPage:0,//当前页码
      searchKey:"",

      rentList: [], //出租类型列表
           
            
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
        this.axios.get("houseType", { params: { dicType: 2 } }).then(result => {
        this.rentList = result.data;
      });
    },

    // 搜索条
    searchBtn() {
      this.currentPage=0;
      this.productList=[];
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
        peopleNumber: this.NumselectedValue, //不选择默认空
        aId: this.selectedAreaId, //不选择默认空
        bedroom: new_apartment.toString(), //
        houseDESC: this.searchKey,//默认值空
        smallprice: this.priceid * 300,//默认值0
        bigprice: (Number(this.priceid) + 1) * 300,//默认值300
        checkinDat: this.orderDate.start,//
        checkoutDate: this.orderDate.end
      };
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
  height:200px;
  background-color: #fff;
  padding-top: 5px;
  margin-top: -5px;
  position: relative;
  z-index: 1;
  overflow-y: scroll;
  border:1px solid #eee;
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