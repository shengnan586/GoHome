const express=require("express");
const router=express.Router();
const query=require("../query");

router.post("/",(req,res)=>{
    var obj=req.body;
    var sql = 'select id from home_dic_apartment where hId = ?';
    query(sql,[parseInt(obj.id)])
    .then(result=>{
        var daId = result[0].id;
        sql = 'update home_business_house set houseTypeId = ?,rentalTypeId=?,daId = ?,roomSize = ?,toiletId = ?,peopleNumber=?,aId=?,address=? where id = ?';
        return query(sql,[obj.houseTypeId, obj.rentalTypeId, daId, obj.roomSize, obj.toiletId, obj.peopleNumber, obj.aId, obj.address,obj.id]);
    }).then(result=>{
        
        sql = 'update home_business_house_bed set bId = ? where hId = ?';
        return query(sql,[obj.bId,parseInt(obj.id)]);
    }).then(result=>{
        sql = 'update home_dic_apartment set bedroom=?,saloon=?,toilet=?,kitchen=?,balcony=? where hId = ?';
        return query(sql,[obj.bedroom,obj.saloon,obj.toilet,obj.kitchen,obj.balcony,parseInt(obj.id)]);
    }).then(result=>{
        res.send({code:1});
    })
})



module.exports=router;