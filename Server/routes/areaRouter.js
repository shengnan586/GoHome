const express=require("express");
const router=express.Router();
const pool=require("../pool");

//根据所属地区：aParentId和类别：aType查询地区列表
router.get("/",(req,res)=>{
  pool.query("SELECT * FROM home_dic_area WHERE aParentId=? and aType=?",[req.query.aParentId,req.query.aType],(err,result)=>{
    if(err) throw err;
    res.send(result);
  });
})

module.exports=router;