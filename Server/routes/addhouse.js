const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.post("/addhouse",(req,res)=>{
    var obj=req.body;
    var sql="INSERT INTO home_business_house (roomSize,daId,aId,address,houseTypeId,rentalTypeId,toiletId,peopleNumber,bld) value(?,?,?,?,?,?,?,?,?)";
})



module.exports=router;