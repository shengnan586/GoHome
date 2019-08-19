const express=require("express");
const router=express.Router();
const pool=require("../pool");
const query = require("../query");

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
    var sql = "INSERT INTO home_business_house (houseTitle,houseDESC,traffic) value('','','') where id = ?";
    query(sql,[obj.hid])
    .then(result=>{
        if(result.affectedRows > 0){
            sql = "UPDATE home_business_house SET (houseTitle=?,houseDESC=?,traffic=?) WHERE id=?";
            return query(sql,[obj.houseTitle,obj.houseDESC,obj.traffic,obj.hid]);
        }
    })
    .then(result=>{
        if(result.affectedRows>0){
            res.send({code:1,msg:"修改成功"})
        }else{
            res.send({code:-1,msg:"修改失败"})
        }
    })
   /* var sql="UPDATE home_business_house SET (houseTitle=?,houseDESC=?,traffic=?) WHERE hid=?";
    pool.query(sql,[obj.houseTitle,obj.houseDESC,obj.traffic,obj.hid],(err,result)=>{
        if(err) throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:"修改成功"})
        }else{
            res.send({code:-1,msg:"修改失败"})
        }
    })*/
})

router.get("/seldescribe",(req,res)=>{
    console.log(req.query.hid)
    pool.query("SELECT * FROM home_business_house where id=?",[req.query.hid],(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
})
module.exports=router;