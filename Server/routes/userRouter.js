const express = require("express");
const router = express.Router();
const pool = require("../pool");

//功能1：完成用户的登录操作
router.get("/login_go", (req, res) => {
    //.1获取网页传递的两个数据 phone upwd
    //参数方式一：?phone=tom&upwd="123"查询字符串
    var phone = req.query.phone;
    var upwd = req.query.upwd;
    //console.log(phone)
    //2.sql:查询sq语句
    //数据库：库名  表名 列名  都是小写
    var sql = "SELECT id,username,phone,isHoster FROM home_business_User WHERE phone=? AND upwd=?";
    //3.json:{code:1,msg:"登陆成功"}
    pool.query(sql, [phone, upwd], (err, result) => {
        // console.log(result)
        if (err) throw err;
        if (result.length == 0) {
            res.send({ code: -1, msg: "登录失败" })
        } else {

            res.send({ code: 1, data: result })
        }
    })
});

//功能3 注册前验证用户名是否已存在
router.get("/reg_go", (req, res) => {
    var phone = req.query.phone;
    var sql = "SELECT id FROM home_business_User WHERE 1=1 AND phone=?";
    pool.query(sql, [phone], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            res.send({ code: -1, msg: "用户名已存在" })
        } else {
            res.send({ code: 1, msg: "用户名可用" })
        }

    })
})

//功能3 完成注册的操作
router.post("/reg", (req, res) => {
    var obj = req.body;
    console.log(obj);
    var sql = "INSERT INTO home_business_User SET ?";
    pool.query(sql, [obj], (err, result) => {
        console.log(result)
        if (err) throw err;
        if (result.affectedRows > 0) {
            if(obj.porned){
                var sqlupdate=" update home_business_user set point =ifnull(point,0) +500 where porn=?";
                pool.query(sqlupdate,[obj.porned],(err,resultporned)=>{
                    if(resultporned.affectedRows>0){
                        res.send({ code: 1, msg: "注册成功" })
                    }
                })
            }else{
                res.send({ code: 1, msg: "注册成功" })
            }
        } else {
            res.send({ code: -1, msg: "注册失败" })
        }
    })
});

/*邀请码*/
router.get("/admin_go", (req, res) => {
    var id = req.query.id;
    var sql = "SELECT id,porn FROM home_business_User WHERE id=? ";
    pool.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.length == 1) {
            res.send({ code: 1, result: result })
        } else {
            res.send({ code: -1, result: result })
        }

    })
})
/*个人资料的查询*/
router.get("/admin_to", (req, res) => {
    var id = req.query.id;
        var sql = "SELECT id,UserName,phone,email,realName,cardID FROM home_business_User WHERE id=?";
    // console.log(id)
    pool.query(sql, [id], (err, result) => {
        if (err) throw err;
        if (result.length == 1) {
            res.send({ code: 1, result })
        } else {
            res.send({ code: -1, result })
        }
    })
})
/*个人资料修改 UserName,phone,email,realName,cardID*/
router.post("/admin_up", (req, res) => {
    var sql = "UPDATE home_business_User SET ";
    var arr_params = [];
    if (req.body.UserName) {
        sql += " UserName=?,";
        arr_params.push(req.body.UserName);
    }
    if (req.body.phone) {
        sql += " phone=?,";
        arr_params.push(req.body.phone);
    }
    if (req.body.email) {
        sql += " email=?,";
        arr_params.push(req.body.email);
    }
    if (req.body.realName) {
        sql += " realName=?,";
        arr_params.push(req.body.realName);
    }
    if (req.body.cardID) {
        sql += " cardID=?,";
        arr_params.push(req.body.cardID);
    }
    if (arr_params.length > 0) {
        sql=sql.substr(0,sql.length-1);
        sql += " WHERE id=?"
        arr_params.push(req.body.id);
        pool.query(sql, arr_params, (err, result) => {
            if (err) throw err;
            if (result.affectedRows > 0) {
                res.send({ code: 1, msg: "成功" })
            } else {
                res.send({ code: -1, msg: "失败" })
            }
        })
    }
    else {
        res.send({ code: -1, msg: "失败" })
    }
})
//功能4 注册前验证用注册码是否存在
router.get("/reg_porn",(req,res)=>{
    var porn=req.query.porn;
    var sql="select * from home_business_user where porn=?";
    pool.query(sql,[porn],(err,result)=>{
        if(err)throw err;
        if(result.length>0){
            res.send({code:-1,msg:"注册码已存在"})
        }else{
            res.send({code:1,msg:"注册码可用"})
        }
        
    })
});

//功能5 根据登陆的uid获取邀请码 
router.get("/GetPornByid",(req,res)=>{
    var id=req.query.uid;
    var sql="select porn from home_business_user where id=?";
    pool.query(sql,[id],(err,result)=>{
        if(err)throw err;
        if(result.length>0){
            res.send({code:1,data:result})
        }else{
            res.send({code:-1,data:"暂无注册码"})
        }
        
    })
})

//功能6 判断注册的是时候用户名是否重复
router.get("/GetUsername",(req,res)=>{
    var uname=req.query.uname;
    var sql="select * from home_business_user where UserName=?";
    pool.query(sql,[uname],(err,result)=>{
        if(err)throw err;
        if(result.length>0){
            res.send({code:-1,data:"用户名已存在"})
        }else{
            res.send({code:1,data:"用户名可用"})
        }
        
    })
})

//功能6 注册的时候判断填写的邀请码是否存在
router.get("/Getporned",(req,res)=>{
    var porned=req.query.porned;
    var sql="select * from home_business_user where porned=?";
    pool.query(sql,[porned],(err,result)=>{
        if(err)throw err;
        if(result.length>0){
            res.send({code:1,data:result})
        }else{
            res.send({code:-1,data:"暂无数据"})
        }
        
    })
})


module.exports=router;