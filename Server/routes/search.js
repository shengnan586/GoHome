const express=require("express");
const router=express.Router();
const query=require("../query");

router.get("/",(req,res)=>{
    console.log(parseInt(req.query.id));
    var hid = parseInt(req.query.id);
    var obj = [];
    var sql = 'select * from home_business_house where id =?';
    query(sql,[hid])
    .then(result=>{
        if(result.length>0){
            obj = result;
            sql = 'select bId from home_business_house_bed where hId = ?';
            return query(sql,[hid]);
        }
    })
    .then(result=>{
        if(result.length > 0){
            obj[0].bId = result[0].bId;
            sql = 'select * from home_dic_apartment where hId = ?'
            return query(sql,[hid]);
        }
    })
    .then(result=>{
        if(result.length > 0){
            obj[0].bedroom = result[0].bedroom;
            obj[0].saloon = result[0].saloon;
            obj[0].toilet = result[0].toilet;
            obj[0].kitchen = result[0].kitchen;
            obj[0].balcony = result[0].balcony;
            res.send({code:1,data:obj})
        }
    })
})

module.exports = router;