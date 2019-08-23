const express = require("express");
const router = express.Router();
const pool = require("../pool");

//根据户型查询设施
// router.get("/GethouseList", (req, res) => {
//     console.log(111111);
//     var hid = req.query.hid;
//     var sql = ` select * from (
//         SELECT (select aTypeName from home_dic_area where home_dic_area.id=area.aParentId) parentName, 
//          (select ImgUrl  from home_business_house_img img where  img.ImgSize="md" and img.hid=house.id limit 0,1) houseimgmd,
//         house.*,area.aTypeName,area.aParentId
//         from home_business_house house 
//         inner join home_dic_area area on house.aId=area.id 
//         )A   `;
//     if(uid){
//         sql +=" where uid=?  ";
//     }
//     pool.query(sql, [hid], (err, result) => {
//         if (err) throw err;
//         if (result.length > 0) {
//             res.send({ code: 1, data:result});
//         } else {
//             res.send({ code: -1, msg: "暂无信息" });
//         }
//     })
// })

router.get("/GethouseList", (req, res) => {
    var id = req.query.id;
    console.log(req.query);
    var output = {
        count: 0, //一共有多少条
        pageSize: 10,  //每个页面显示几条
        pageCount: 0, //总共几页
        pno: req.query.currentPage || 0, //返回的当前是第几页
        data: []
    };
    var sql = `   select CONCAT(parentName,CONCAT(aTypeName,address)) newadress,A.* from (
        SELECT (select aTypeName from home_dic_area where home_dic_area.id=area.aParentId) parentName, 
         (select ImgUrl  from home_business_house_img img where  img.ImgSize="md" and img.hid=house.id limit 0,1) houseimgmd,
        house.*,area.aTypeName,area.aParentId
        from home_business_house house 
        inner join home_dic_area area on house.aId=area.id 
        )A   `;
    if (id) {
        sql += " where uid=?  ";
    }
    pool.query(sql, [id], (err, result) => {
        if (err) throw err;
        output.count = result.length;
        output.pageCount = Math.ceil(output.count / output.pageSize);
        sql += ` limit ?,?`;
        var arr=[output.pageSize * output.pno,output.pageSize];
        if(id){
            arr.unshift(id);
        }
        pool.query(sql, arr, (err, result) => {
            output.data = result;
            res.send(output);
        })
    })
})

module.exports = router;