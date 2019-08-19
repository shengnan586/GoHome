const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.get("/search",(req,res)=>{
    var hid = req.query.hid;
    //查询保存过的房屋设施
    var sql  = 'select installName,installType from home_dic_installation h1 join home_business_house_install h2 on h1.id = h2.installId where h2.hId = ? and h2.state = 1;'
    pool.query(sql,[hid],(err,result)=>{
        if(err) throw err;
        //将设施名字 和设施类型返回
        res.send({code:1,data:result});
    });
});
module.exports = router;