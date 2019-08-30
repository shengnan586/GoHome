const express = require("express");
const router = express.Router();
const pool = require("../pool");

//删除订单列表
router.post("/DelOrder", (req, res) => {
    var id = req.body.id;
    var sql = " delete from home_business_orderlist where id=? "
    pool.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({ code: 1, msg: "删除成功" });
        } else {
            res.send({ code: -1, msg: "删除失败" });
        }
    })
})

//获取订单列表
router.get("/GetOrderlist", (req, res) => {
    var orderStatus = req.query.orderStatus;
    var id = req.query.userid;
    var output = {
        count: 0, //一共有多少条
        pageSize: req.query.pageSize || 10,  //每个页面显示几条
        pageCount: 0, //总共几页
        pno: req.query.currentPage || 0, //返回的当前是第几页
        data: []
    };
    var sql = `  select user.id, orderlist.id,orderlist.orderId,orderlist.checkinDate,orderlist.checkoutDate,
    user.realName,user.cardID,user.phone,orderlist.peopleNumber,orderlist.days,orderlist.orderPrice,
    houser.address,apartment.bedroom,
    apartment.saloon,
    apartment.toilet,
    apartment.kitchen,
    apartment.balcony,
	houseimg.ImgUrl
    from home_business_orderList orderlist inner join home_business_User user on orderlist.uid=user.id 
    inner join home_business_house houser on orderlist.hid=houser.id 
    inner join home_dic_apartment apartment on houser.daId=apartment.id  
		inner join home_business_house_img houseimg on houser.id=houseimg.hid 
    where 1=1 and houseimg.ImgSize='md' `;
    //houseimg.imgsize
    //sql +=" and user.id=?  and user.isHoster=? ";
    var arr3=[];
    if (orderStatus) {
        sql += " and orderStatus=? ";
        arr3.push(orderStatus);
    }
    if (id) {
        sql += " and user.id=? ";
        arr3.push(id);
    }
    sql += " GROUP BY  orderlist.id  ";
    pool.query(sql, arr3, (err, result) => {
        if (err) throw err;
        output.count = result.length;
        output.pageCount = Math.ceil(output.count / output.pageSize);
        sql += ` limit ?,?`;
        var arr = [output.pageSize * output.pno, output.pageSize];
        var arr2 = [];
        if (orderStatus) {
            arr2.push(orderStatus);
        }
        if (id) {
            arr2.push(id);
        }
        arr = arr2.concat(arr);
        pool.query(sql, arr, (err, result) => {
            output.data = result;
            res.send(output);
        })
    })
})

module.exports = router;