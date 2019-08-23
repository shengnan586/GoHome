const express=require("express");
const router=express.Router();
const query=require("../query");

router.get("/",(req,res)=>{
    console.log("hid"+parseInt(req.query.id));
    var hid = parseInt(req.query.id);
    var obj = [];
    var sql = 'select * from home_business_house where id =?';
    query(sql,[hid])
    .then(result=>{
        console.log("result"+result[0].address);
        if(result.length>0){
            obj = result;
            console.log("search  obj"+obj[0].address);
            sql = 'select bId from home_business_house_bed where hId = ?';
            return query(sql,[hid]);
        }
    })
    .then(result=>{
        if(result.length > 0){
            obj[0].bId = [];
            for(var item of result){
                obj[0].bId.push(item.bId);
            }
            sql = 'select * from home_dic_apartment where id = ?'
            return query(sql,[parseInt(obj[0].daId)]);
        }
    })
    .then(result=>{
        if(result.length > 0){
            obj[0].bedroom = result[0].bedroom;
            obj[0].saloon = result[0].saloon;
            obj[0].toilet = result[0].toilet;
            obj[0].kitchen = result[0].kitchen;
            obj[0].balcony = result[0].balcony;
            console.log("adress"+obj[0].address);
            res.send({code:1,data:obj})
        }
    })
})

module.exports = router;