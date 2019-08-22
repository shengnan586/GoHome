const express = require("express");
const router = express.Router();
const query = require("../query");

router.post("/", (req, res) => {
    var obj = req.body;
    var sql = "delete from home_business_house_img where hid = ?";
    query(sql, [obj.hid])
        .then(result => {
            var str = "";
            var arr = [];
            for (var i = 0;i < obj.url.length;i++) {
                str += "(?,?,'md'),";
                arr.push(parseInt(hid));
                arr.push(parseInt(obj.url[i]));
            }
            str = str.substr(0, str.length - 1);
            sql = "INSERT into  home_business_house_img (hId,ImgUrl,ImgSize)  VALUES ${str} ";
            return query(sql,arr);
        })
        .then(result=>{
            if(result.affectedRows > 0){
                res.send({code:1});
            }
        })
})

module.exports = router;