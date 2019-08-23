const express = require("express");
const router = express.Router();
const pool = require("../pool");

//修改密码
router.post("/EditUpwd", (req, res) => {
    var id = req.body.userid;
    var upwd = req.body.upwd;
    console.log(req.body);
    var sql = " update home_business_user set upwd=? where id=? "
    pool.query(sql, [upwd, id], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            res.send({ code: 1, msg: "修改成功" });
        } else {
            res.send({ code: -1, msg: "修改失败" });
        }
    })
})

//查询输入的旧密码是否正确
//http://127.0.0.1:3003/adminpwdedit/GetUpwd?upwd=1
router.get("/GetUpwd", (req, res) => {
    var upwd = req.query.upwd;
    var sql = " select * from home_business_user where upwd=? ";
    // id=? and
    pool.query(sql, [upwd], (err, result) => {
        if (err) throw err;
        if (result.length > 0) {
            console.log(result);
            res.send({ code: 1, msg: "查询成功" });
        } else {
            res.send({ code: -1, msg: "查询失败" });
        }
    })
})
module.exports = router;