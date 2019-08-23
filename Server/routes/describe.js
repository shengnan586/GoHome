const express=require("express");
const router=express.Router();
const pool=require("../pool");

// router.post("/",(req,res)=>{
//     var obj=req.body;
//     var sql="INSERT INTO home_business_house (houseTitle,houseDESC,traffic) value(?,?,?)";
//     pool.query(sql,[obj.houseTitle,obj.houseDESC,obj.traffic],(err,result)=>{
//         if(err) throw err;
//         if(result.affectedRows>0){
//             res.send({code:1,msg:"插入成功"})
//         }else{
//             res.send({code:-1,msg:"插入失败"})
//         }
//     })
// })

router.post("/",(req,res)=>{
    var obj=req.body;
    if(obj.hid==0){
        return;
    }
    var sql="UPDATE home_business_house SET houseTitle=?,houseDESC=?,traffic=? WHERE id=?";
    pool.query(sql,[obj.houseTitle,obj.houseDESC,obj.traffic,parseInt(obj.hid)],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:"修改成功"})
        }else{
            res.send({code:-1,msg:"修改失败"})
        }
    })
})

router.get("/seldescribe",(req,res)=>{
    pool.query("SELECT * FROM home_business_house where id=?",[req.query.hid],(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
})
module.exports=router;