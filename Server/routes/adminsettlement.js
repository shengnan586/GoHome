const express = require("express");
const router = express.Router();
const pool = require("../pool");

//获取通知列表
router.get("/GetOrderMsglist", (req, res) => {
    var id = req.query.userid;
    var output = {
        count: 0, //一共有多少条
        pageSize: 10,  //每个页面显示几条
        pageCount: 0, //总共几页
        pno: req.query.currentPage || 0, //返回的当前是第几页
        data: []
    };
    var sql = ` select A.*,home_dic_area.aTypeName parenttypename from (
        select user.phone,user.id,user.UserName,houser.roomSize,houser.address,houser.houseTitle,houser.normalPrice,houser.festivalPrice,apart.bedroom,apart.saloon,apart.toilet,apart.kitchen,apart.balcony,
        area.aTypeName,area.aParentId,msg.msgContent,msg.msgtime,houseimg.ImgUrl,houseimg.ImgSize,
        msg.id msgid 
        from home_business_house_msg msg inner join home_business_house houser on 
        msg.hid=houser.id  inner join home_business_User user on msg.uid=user.id 
        inner join home_dic_apartment apart on houser.daId=apart.id 
        inner join home_dic_area area on houser.aId=area.id inner join home_business_house_img houseimg
         on houser.id=houseimg.hid 
        )A inner join home_dic_area on A.aParentId=home_dic_area.id    `;
    //houseimg.imgsize
    //sql +=" and user.id=?  and user.isHoster=? ";
    if (id) {
        sql += " and A.id=?  ";
    }
    sql += " GROUP BY A.msgid   order by A.msgtime  desc  ";
    pool.query(sql, [id], (err, result) => {
        if (err) throw err;
        output.count = result.length;
        output.pageCount = Math.ceil(output.count / output.pageSize);
        sql += ` limit ?,?`;
        //console.log(sql);
        // pool.query(sql, [id || output.pageSize * output.pno, id ? output.pageSize * output.pno : output.pageSize, output.pageSize], (err, result) => {
        //     output.data = result;
        //     res.send(output);
        // })
        var arr = [output.pageSize * output.pno, output.pageSize];
        if (id) {
            arr.unshift(id);
        }
        pool.query(sql, arr, (err, result) => {
            output.data = result;
            res.send(output);
        })
    })
})

router.get("/GetEarcharts", (req, res) => {
    var year = req.query.year;
    var uid = req.query.userid;
        var sql = ` select sum(orderPrice) value, case when name='01' then '一月' when  name='02' then '二月' 
        when  name='03' then '三月' when  name='04' then '四月'  when  name='05' then '五月' 
        when  name='06' then '七月' when  name='08' then '八月'  when  name='09' then '九月' 
        when  name='10' then '十月' when  name='11' then '十一月'  
        else '十二月' end name from (
	select orderPrice,substring(checkinDate,5,2) as name,substring(checkinDate,1,4) nian,orderlist.uid 
from home_business_orderList orderlist 
inner join home_business_house house on orderlist.hId=house.id 
inner join home_business_User user on house.uid=user.id 
and user.isHoster=1  and  orderlist.orderStatus=2 
)A where a.nian=? GROUP BY name   `
    var arr=[year];
    if (uid) {
        sql += "  and orderlist.uid=? ";
        arr.push(uid);
    }
    pool.query(sql,arr, (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({ code: 1, data: result });
        } else {
            res.send({ code: -1, data: "暂无数据" });
        }
    })
})

module.exports = router;