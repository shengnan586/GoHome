const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.get("/",(req,res)=>{
 res.send("test");
})

module.exports=router;