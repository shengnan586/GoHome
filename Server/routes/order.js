const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.post("/order",(req,res)=>{
    var obj=req.body;
    var sql="INSERT INTO home_business_orderList (realName,cardID,phone,peopleNumber,checkinDate,checkoutDate,days,orderId,id,hid,payStatus,payTime,orderPrice,orderStatus,uid) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    pool.query(sql,[obj.realName,obj.cardID,obj.phone,obj.peopleNumber,obj.checkinDate,obj.checkoutDate,obj.days,obj.orderId,obj.id,obj.hid,obj.payStatus,obj.payTime,obj.orderPrice,obj.orderStatus,obj.uid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:"提交成功"})
        }else{
            res.send({code:-1,msg:"提交失败"})
        }
    })
})
router.get("/productlist",(req,res)=>{
    
    var sql="SELECT * FROM home_business_house";
    pool.query(sql,(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result})
        }else{
            res.send({code:-1,msg:"没有数据"});
        }
    })
})

module.exports=router;