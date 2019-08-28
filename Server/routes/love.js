const express = require("express");
const router = express.Router();
const query = require("../query");

router.get("/",(req,res)=>{
    var hId = req.query.hid;
    var uId = req.query.uid;
    var collectime = req.query.collectime;
    var branch = 0;
    var sql = "select hId from home_business_house_collect_img where hId = ?";
    query(sql,[hId])
    .then(result=>{
        console.log("result"+result.length);
        if(result.length < 1){
            branch = 1;
            sql = "insert into home_business_house_collect_img (uId,hId,collectime) values (?,?,?)";
            return query(sql,[uId,hId,collectime])
        }else{
           res.send({code:-1})
          // console.log("nn"+result);
           return;
        }
    })
    .then(result=>{
        if(branch == 1){
            console.log("成功"+result.affected)
            if(result.affectedRows > 0) res.send({code:1});
            else res.send({code:-1})
        }
        //console.log("return?");
       // if(result.length > 0) console.log(result)
    })
    
   // console.log(hId,uId,collectime);
})
module.exports = router;