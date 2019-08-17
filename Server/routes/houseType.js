const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.get("/",(req,res)=>{
    pool.query("SELECT * FROM home_dic_type WHERE dicType=?",[req.query.dicType],(err,result)=>{
        if(err) throw err;
        res.send(result);
    });
})

module.exports=router;