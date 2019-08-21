const express=require("express");
const router=express.Router();
const pool=require("../pool.js");

router.post("/",(req,res)=>{
    var obj = req.body;
    var sql = "select id from home_business_house where id = ?";
    var sql = "update home_business_house set normalPrice = ?,festivalPrice=?,specialPrice = ?,cashMoney = ?,isReleaseStatus = ?,isCash=? where id = ?";
    pool.query(sql,[obj.normalPrice,obj.festivalPrice,obj.specialPrice,obj.cashMoney,obj.isReleaseStatus,obj.isCash,obj.hid],(err,result)=>{
        if(err)throw err;
        if(result.affectedRows > 0) res.send({code:1})
    });
})

module.exports = router;