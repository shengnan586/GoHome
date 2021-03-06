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
    
    var sql=sql1 = `  select house.id,house.houseTitle,house.specialPrice,house.normalPrice,house.festivalPrice,user.UserName,
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

    inner join home_dic_apartment apartment on house.daId=apartment.id  `;
    var arr3=[];
    if (rentalTypeId!="0") {
        sql += " and house.rentalTypeId=?  "; //出租类型
        sql1 += " and house.rentalTypeId="+rentalTypeId; //出租类型
        arr3.push(rentalTypeId);
    }
    if(peopleNumber){
        sql +=" and house.peopleNumber=?  "; //人数
        sql1 +=" and house.peopleNumber="+peopleNumber; //人数
        arr3.push(peopleNumber);
    }
    if(aId){
        sql +=" and house.aId=? "; //地区
        sql1 +=" and house.aId="+aId; //地区
        arr3.push(aId);
    }
    if(bedroom){
        sql +=" and apartment.bedroom in("+bedroom+") "; //几居室
        sql1 +=" and apartment.bedroom in("+bedroom+") "; //几居室
        arr3.push(bedroom);
    }
    if(houseDESC){
        sql +=" and house.houseDESC like CONCAT('%',houseDESC,'%')"; //房源介绍--关键字
        sql1 +=" and house.houseDESC like CONCAT('%',houseDESC,'%')"; //房源介绍--关键字
        // sql +=" and house.houseDESC like %"+houseDESC+"%"; //房源介绍--关键字
    }
    if(smallprice&&bigprice){
        sql +=" and ((house.specialPrice between ? and ?) or (house.normalPrice between ? and ?) or (house.festivalPrice between ? and ?)) "; //价格
        sql1 +=" and ((house.specialPrice between "+smallprice+" and "+bigprice+") or (house.normalPrice between "+smallprice+" and "+bigprice+") or (house.festivalPrice  between "+smallprice+" and "+bigprice+")) "; //价格
        arr3.push(smallprice);
        arr3.push(bigprice);
        arr3.push(smallprice);
        arr3.push(bigprice);
        arr3.push(smallprice);
        arr3.push(bigprice);
    }
    if(checkinDate&&checkoutDate){
        sql +=" and house.id not in (select hid from home_business_orderList where checkinDate>=? and checkoutDate<=?)  "; //时间
        sql1 +=" and house.id not in (select hid from home_business_orderList where checkinDate>="+checkinDate+" and checkoutDate<="+checkoutDate+")  "; //时间
        arr3.push(checkinDate);
        arr3.push(checkoutDate);
    }
    console.log(arr3);//arr3
    console.log(sql1);
    pool.query(sql1, [], (err, result) => {
        if (err) throw err;
        output.count = result.length;
        output.pageCount = Math.ceil(output.count / output.pageSize);
        sql += ` limit ?,?`;
        var arr=[output.pageSize * output.pno,output.pageSize];
        var arr2=[];
        if(rentalTypeId!="0"){
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
        //,,,,bigprice,smallprice,bigprice,smallprice,bigprice,checkinDate,checkoutDate
        pool.query(sql1, arr, (err, result) => {
            output.data = result;
            res.send(output);
        })
    })
})
// http://127.0.0.1:3003/productlist/GetProduct?
// rentalTypeId=14&
// peopleNumber=5&
// aId=2&
// bedroom=1&
// houseDESC=%27%E6%88%BF%E6%BA%90%27&
// smallprice=80&
// bigprice=100&
// checkinDate=%2720190814%27&
// checkoutDate=%2720190815%27

// http://127.0.0.1:3003/productlist/GetProduct?
// currentPage=0&
// rentalTypeId=0&aId=&bedroom=&houseDESC=&smallprice=0&bigprice=300
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

