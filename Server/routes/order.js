const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.post("/order",(req,res)=>{
    var obj=req.body;
    var sql="INSERT INTO home_business_orderList (realName,cardID,phone,peopleNumber) values(?,?,?,?)";
    console.log(obj);
    pool.query(sql,[obj.realName,obj.cardID,obj.phone,obj.peopleNumber],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:"提交成功"})
        }else{
            res.send({code:-1,msg:"提交失败"})
        }
    })
})

module.exports=router;