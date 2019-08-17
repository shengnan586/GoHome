const express=require("express");
const router=express.Router();
const pool=require("../pool");

//功能1：完成用户的登录操作
//app.get("/login_go", (req, res) => {
router.get("/login_go",(req,res)=>{
    //.1获取网页传递的两个数据 phone upwd
    //参数方式一：?phone=tom&upwd="123"查询字符串
    var phone = req.query.phone;
    var upwd = req.query.upwd;
   
    //2.sql:查询sq语句
    //数据库：库名  表名 列名  都是小写
    var sql = "SELECT id FROM home_business_User WHERE phone=? AND upwd=md5(?)";
    //3.json:{code:1,msg:"登陆成功"}
    pool.query(sql, [phone, upwd], (err, result) => {
        //console.log(phone)
        if (err) throw err;
        if (result.length == 0) {
            res.send({ code: -1, msg: "登录失败" })
        } else {
          
            res.send({ code: 1, msg: "登录成功" })
        }
    })
  });
//功能2 完成注册的操作
router.post("/reg",(req,res)=>{
 var obj=req.body;
    var sql="INSERT INTO home_business_User SET ?";
    pool.query(sql,[obj],(err,result)=>{
        console.log(result)
        if(err)throw err;
        if(result.affectedRows>0){
            res.send({code:1,msg:"注册成功"})
        }else{
            res.send({code:-1,msg:"注册失败"})
        }
    })
});
module.exports=router;