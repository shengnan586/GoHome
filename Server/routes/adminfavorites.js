const express = require("express");
const router = express.Router();
const pool = require("../pool");

//获取通知列表
router.get("/GetCollectlist", (req, res) => {
    var id = req.query.userid;
    var output = {
        count: 0, //一共有多少条
        pageSize: 10,  //每个页面显示几条
        pageCount: 0, //总共几页
        pno: req.query.currentPage || 0, //返回的当前是第几页
        data: []
    };
    var sql = ` select collect.id collectid,house.id,collect.collectime,img.ImgUrl,(select aTypeName from home_dic_area where home_dic_area.id=area.aParentId) parentName,area.aTypeName,house.roomSize,house.address,house.houseTitle,house.houseDESC,house.traffic,
    house.normalPrice,house.festivalPrice,house.isCash,house.cashMoney,house.otherMoney,house.otherAsk,
    user.phone,user.UserName,
    apartment.bedroom,
    apartment.saloon,
    apartment.toilet,
    apartment.kitchen,
    apartment.balcony
    from home_business_house_collect_img collect 
    inner join home_business_house house on collect.hid=house.id 
    INNER join home_business_User user on collect.uid=user.id 
    inner join home_dic_apartment apartment on house.daId=apartment.id 
    inner join home_dic_area area on house.aId=area.id 
    inner join home_business_house_img img on house.id=img.hId 
     where user.isHoster=1 and img.ImgSize="md"  `;
    //houseimg.imgsize
    //sql +=" and user.id=?  and user.isHoster=? ";
    if (id) {
        sql += " and user.id=?  ";
    }
    sql += "  GROUP BY collect.collectime ORDER BY collect.collectime desc  ";
    pool.query(sql, [id], (err, result) => {
        if (err) throw err;
        output.count = result.length;
        output.pageCount = Math.ceil(output.count / output.pageSize);
        sql += ` limit ?,?`;
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

//根据户型查询设施
router.get("/GetInstallationByhid", (req, res) => {
    var hid = req.query.hid;
    var sql = `  select home_dic_installation.installType,home_dic_installation.installName from home_business_house_install INNER join 
    home_dic_installation on home_business_house_install.installId=home_dic_installation.id`;
    sql += " where home_business_house_install.hId=?  ";
    pool.query(sql, [hid], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({ code: 1, data: result });
        } else {
            res.send({ code: -1, msg: "暂无设施" });
        }
    })
})

//根据户型查询床铺信息
router.get("/GetBedByhid", (req, res) => {
    var hid = req.query.hid;
    var sql = `  select home_dic_bed.* from home_business_house_bed inner join home_dic_bed on home_business_house_bed.bid=
    home_dic_bed.id `;
    sql += " where home_business_house_bed.hid=?  ";
    pool.query(sql, [hid], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({ code: 1, data: result });
        } else {
            res.send({ code: -1, msg: "暂无设施" });
        }
    })
})

//删除订单列表
router.post("/DelCollectByid", (req, res) => {
    var id = req.body.id;
    var sql = " delete from home_business_house_collect_img where id=? "
    pool.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({ code: 1, msg: "删除成功" });
        } else {
            res.send({ code: -1, msg: "删除失败" });
        }
    })
})
module.exports = router;