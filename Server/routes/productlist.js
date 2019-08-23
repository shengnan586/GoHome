const express = require("express");
const router = express.Router();
const pool = require("../pool");

router.get("/GetProduct", (req, res) => {
    var rentalTypeId = req.query.rentalTypeId;//出租类型
    var peopleNumber=req.query.peopleNumber;//人数
    var aId=req.query.aId;//地区
    var bedroom=req.query.bedroom;//几居室
    var houseDESC=req.query.houseDESC;//关键字
    var smallprice=req.query.smallprice;//价格区间小
    var bigprice=req.query.bigprice;//价格区间大
    var checkinDate=req.query.checkinDate;//入住时间
    var checkoutDate=req.query.checkoutDate;//离开时间

    var output = {
        count: 0, //一共有多少条
        pageSize: 9,  //每个页面显示几条
        pageCount: 0, //总共几页
        pno: req.query.currentPage || 0, //返回的当前是第几页
        data: []
    };
    var sql = `  select house.id,house.houseTitle,house.specialPrice,house.normalPrice,house.festivalPrice,user.UserName,
    user.phone,user.email,user.realName,user.cardID,
    case user.sex  when  0 then '女' else '男' end sex,
    dictype.typeName,house.peopleNumber,apartment.bedroom,
    
    (select sum(dicbed.num) from home_business_house house1 
    inner join home_business_house_bed housebed on house1.id=housebed.hid 
    inner join home_dic_bed dicbed on housebed.bid=dicbed.id  
    where house1.id=house.id GROUP BY  house.id) bedcount,

    (select ImgUrl from home_business_house_img houseimg  where houseimg.hid=house.id and ImgSize='md' LIMIT 0,1) houseimg  
    
    from home_business_house house 
    inner join home_business_User user on house.uid=user.id 
    inner join home_dic_type dictype on house.rentalTypeId=dictype.id 
    -- inner join home_dic_area area on house.aId=area.id 

    inner join home_dic_apartment apartment on house.houseTypeId=apartment.id and user.isHoster=1 `;
    
    // rentalTypeId: this.chuzuid, //不选择默认0
    //     peopleNumber: this.peopleNumber, //不选择默认undefined
    //     aId: this.selectedAreaId, //不选择默认空
    //     bedroom: this.apartment.toString(), //默认值""
    //     houseDESC: this.searchKey,//默认值空
    //     smallprice: this.priceid * 300,//默认值0
    //     bigprice: (this.priceid + 1) * 300,//默认值300
    //     checkinDat: this.orderDate.start,//默认值undefined
    //     checkoutDate: this.orderDate.end//同上
    if (rentalTypeId=="0") {
        sql += " and house.rentalTypeId=?  "; //出租类型
    }
    if(peopleNumber){
        sql +=" and house.peopleNumber=?  "; //人数
    }
    if(aId){
        sql +=" and house.aId=? "; //地区
    }
    if(bedroom){
        sql +=" and apartment.bedroom in("+bedroom+") "; //几居室
    }
    if(houseDESC){
        sql +=" and house.houseDESC like CONCAT('%',houseDESC,'%')"; //房源介绍--关键字
        // sql +=" and house.houseDESC like %"+houseDESC+"%"; //房源介绍--关键字
    }
    if(smallprice&&bigprice){
        sql +=" and ((house.specialPrice between ? and ?) or (house.normalPrice between ? and ?) or (house.festivalPrice between ? and ?)) "; //价格
    }
    if(checkinDate&&checkoutDate){
        sql +=" and house.id not in (select hid from home_business_orderList where checkinDate>=? and checkoutDate<=?)  "; //时间
    }
    console.log(sql);
    console.log(rentalTypeId,peopleNumber,aId,bedroom,houseDESC,smallprice,bigprice,smallprice,bigprice,smallprice,bigprice,checkinDate,checkoutDate);
    pool.query(sql, [rentalTypeId,peopleNumber,aId,smallprice,bigprice,smallprice,bigprice,smallprice,bigprice,checkinDate,checkoutDate], (err, result) => {
        if (err) throw err;
        output.count = result.length;
        console.log(result.length);
        output.pageCount = Math.ceil(output.count / output.pageSize);
        sql += ` limit ?,?`;
        var arr=[output.pageSize * output.pno,output.pageSize];
        var arr2=[];
        if(rentalTypeId=="0"){
            arr2.push(rentalTypeId);
        }
        if(peopleNumber){
            arr2.push(peopleNumber);
        }
        if(aId){
            arr2.push(aId);
        }
        // if(bedroom){
        //     arr2.push(bedroom);
        // }
        // if(houseDESC){
        //     arr2.push(houseDESC);
        // }
        if(smallprice&&bigprice){
            arr2.push(smallprice);
            arr2.push(bigprice);
            arr2.push(smallprice);
            arr2.push(bigprice);
            arr2.push(smallprice);
            arr2.push(bigprice);
        }
        if(checkinDate){
            arr2.push(checkinDate);
        }
        if(checkoutDate){
            arr2.push(checkoutDate);
        }
        // arr.unshift(arr2);
        arr=arr2.concat(arr);
        console.log(arr);
        //,,,,bigprice,smallprice,bigprice,smallprice,bigprice,checkinDate,checkoutDate
        pool.query(sql, arr, (err, result) => {
            output.data = result;
            res.send(output);
        })
    })
})

// -- 
// -- 暂定查询标题、价格、房东基本信息、出租类型、床数、宜居人数
// -- 
// -- 查询条件：，入住开始时间和结束时间，，，，价格(bettwen and ),
// -- 房源介绍,
// -- 地区
// -- 出租方式(出租类型)
// -- 入住人数()
// -- 几居室
// -- 
// select house.houseDESC,house.id,house.houseTitle,house.specialPrice,house.normalPrice,house.festivalPrice,user.UserName,
// user.phone,user.email,user.realName,user.cardID,
// case user.sex  when  0 then '女' else '男' end sex,
// dictype.typeName,house.peopleNumber,apartment.bedroom,

// (select sum(dicbed.num) from home_business_house house1 
// inner join home_business_house_bed housebed on house1.id=housebed.hid 
// inner join home_dic_bed dicbed on housebed.bid=dicbed.id  
// where house1.id=house.id GROUP BY  house.id) bedcount 

// from home_business_house house 
// inner join home_business_User user on house.uid=user.id 
// inner join home_dic_type dictype on house.rentalTypeId=dictype.id 
// -- inner join home_dic_area area on house.aId=area.id 
// inner join home_dic_apartment apartment on house.houseTypeId=apartment.id 
// and user.isHoster=1
// and house.rentalTypeId=14
// and house.peopleNumber=5 
// and house.aId=2

// and apartment.bedroom=1
// and house.houseDESC like '%房源%' 
// and ((house.specialPrice between 80 and 100) or (house.normalPrice between 80 and 100) or (house.festivalPrice between 80 and 100)) 
// and house.id not in (select DISTINCT hid from home_business_orderList where checkinDate>='20190814' and checkoutDate<='20190815') 

// http://127.0.0.1:3003/productlist/GetProduct?rentalTypeId=14&peopleNumber=5&aId=2&bedroom=(1,2,3)&houseDESC='房源'&smallprice=80&bigprice=100&checkinDate='20190814'&checkoutDate='20190815'

// http://127.0.0.1:3003/admin/GetOrderMsglist

//最终的
// http://127.0.0.1:3003/productlist/GetProduct?rentalTypeId=14&peopleNumber=5&aId=2&bedroom=1,2,3,4&houseDESC=%27%E6%88%BF%E6%BA%90%27&smallprice=80&bigprice=100&checkinDate=%2720190814%27&checkoutDate=%2720190815%27



module.exports = router;


// select A.*,(select sum(dicbed.num) from home_business_house house1 
// inner join home_business_house_bed housebed on house1.id=housebed.hid 
// inner join home_dic_bed dicbed on housebed.bid=dicbed.id  
// where house1.id=A.id GROUP BY  A.id) bedcount 
// from (
// 	select house.id,house.houseTitle,house.specialPrice,house.normalPrice,house.festivalPrice,user.UserName,
// user.phone,user.email,user.realName,user.cardID,
// case user.sex  when  0 then '女' else '男' end sex,
// dictype.typeName,house.peopleNumber,apartment.bedroom 


// from home_business_house house 
// inner join home_business_User user on house.uid=user.id 
// inner join home_dic_type dictype on house.rentalTypeId=dictype.id 
// -- inner join home_dic_area area on house.aId=area.id 
// inner join home_dic_apartment apartment on house.houseTypeId=apartment.id 
// ) A 
