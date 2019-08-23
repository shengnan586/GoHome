const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.get("/",(req,res)=>{
    var arr = [];
    var hid = req.query.hid;
    var sql = "select ImgUrl from home_business_house_img where hId = ?";
    pool.query(sql,[hid],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            for(var item of result){
                arr.push(item.ImgUrl)
            }
            res.send({code:1,data:arr});
        }
    });
})

module.exports = router;