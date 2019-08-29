const express=require("express");
const router=express.Router();
const query=require("../query");
const pool=require("../pool");

router.post("/order",(req,res)=>{
    var obj=req.body;
    var sql="INSERT INTO home_business_orderList (realName,cardID,phone,peopleNumber,checkinDate,checkoutDate,days,orderId,id,hid,payStatus,payTime,orderPrice,orderStatus,uid) values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)";
    pool.query(sql,[obj.realName,obj.cardID,obj.phone,obj.peopleNumber,obj.checkinDate,obj.checkoutDate,obj.days,obj.orderId,obj.id,obj.hid,obj.payStatus,obj.payTime,obj.orderPrice,obj.orderStatus,obj.uid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            id = result.insertId;	
            res.send({code:1,data:id})
        }else{
            res.send({code:-1,msg:"提交失败"})
        }
    })
})

router.post('/unpaid',(req,res)=>{
    var obj=req.body;
    console.log(obj);
    var sql='UPDATE home_business_orderlist set payStatus=?,orderStatus=? where id=？';
    pool.query(sql,[obj.payStatus,obj.orderStatus,obj.id],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:"支付成功"})
        }else{
            res.send({code:-1,msg:"支付失败"})
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

router.get("/prodetail",(req,res)=>{
    var hid=req.query.hid;
    // console.log(hid);
    var data = [];
    var sql="SELECT * FROM home_business_house WHERE id=? "
    query(sql,[hid])
    .then(result=>{
        if(result.length>0){
           data = result;
           console.log(11111111111);
           sql = "select installName from home_dic_installation where id in (select installId from home_business_house_install where hId = ? and state = 1)";
           
           query(sql,[hid])
           .then(result=>{
               if(result.length > 0){
                console.log(22222222222);
                   var installName = [];
                   for(var item of result){
                       installName.push(item.installName)
                   }
                   data[0].installName = installName;
                   sql = "select bedType from home_dic_bed where id in (select bId from home_business_house_bed  where hId = ?)";
                   
                   query(sql,[hid])
                   .then(result=>{
                    console.log(33333333);
                       if(result.length > 0){
                            var bed = [];
                            for(var item of result){
                                bed.push(item.bedType)
                            }
                            data[0].bed = bed;
                            res.send({code:1,data:data})
                            
                       }else{
                           res.send({code:-1})
                       }
                    
                   })
               }
           })
        }
    })
        
})
module.exports=router;