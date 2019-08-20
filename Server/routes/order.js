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
    var start=req.query.start;
    var  count=req.query.count;
   
    var sql=`SELECT * FROM home_business_house LIMIT ${start},${count} `;
    pool.query(sql,[start,count],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
            res.send({code:1,data:result})
           
        }else{
            res.send({code:-1,msg:"没有数据"});
        }
    })
})
router.get("/proSearch",(req,res)=>{
   
    console.log(key);
    var start=req.query.start;
    var  count=req.query.count;
    var sql="SELECT * FROM home_business_house WHERE aid=? ,peopleNumber=?,cashMoney=?";
})
router.get("/searchKey",(req,res)=>{
    var key='%'+req.query.key+'%';
    var sql="SELECT * FROM  home_business_house WHERE address LIKE ?";
    pool.query(sql,[key],(err,result)=>{
        if(err) throw err;
        if(result.length>0){
           res.send({code:200,data:result});
        }else{
            res.send({code:-1,msg:"未找到相关信息"})
        }
    })
})
module.exports=router;