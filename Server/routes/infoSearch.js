const express=require("express");
const router=express.Router();
const pool=require("../pool.js");

router.get("/",(req,res)=>{
    var hid = req.query.hid;
    var sql = "select normalPrice,festivalPrice,specialPrice,cashMoney,isReleaseStatus from home_business_house where id = ?";
    pool.query(sql,[hid],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result})
        }
    })
})

module.exports = router;