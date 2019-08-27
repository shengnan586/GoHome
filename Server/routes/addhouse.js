const express = require("express");
const router = express.Router();
const pool = require("../pool");

router.post("/addhouse", (req, res) => {
    var houseid = "";
    var obj = req.body;
    //更新房东信息
    var sql = "update home_business_User set isHoster = 1 where id = ?";
    pool.query(sql, [obj.uid], (err, result) => {
        if (err) throw err;
        if (result.affectedRows > 0) {
            //先判断home_dic_apartment户型表里有没有这个户型，如果有则查出id,插入house表中，如果没有则先插入户型表，再获得id插入house中
            var sqlSelectapartment = " select * from home_dic_apartment where bedroom=? and saloon=? and toilet=? and kitchen=? and balcony=? ";
            pool.query(sqlSelectapartment, [obj.bedroom, obj.saloon, obj.toilet, obj.kitchen, obj.balcony], (err, result) => {
                var daId = ""; //户型id
                var houseid = ""; //房屋主表id
                if (err) throw err;
                if (result.length > 0) {
                    daId = result[0].id;
                    //插入主表house
                    var sqlhouse = " INSERT into home_business_house (houseTypeId,rentalTypeId,daId,roomSize,toiletId,peopleNumber,aId,address,uid) VALUES(?,?,?,?,?,?,?,?,?) ";
                    pool.query(sqlhouse, [obj.houseTypeId, obj.rentalTypeId, daId, obj.roomSize, obj.toiletId, obj.peopleNumber, obj.aId, obj.address, obj.uid], (err, houseresult) => {
                        if (err) throw err;
                        //添加床铺表
                        if (houseresult.affectedRows > 0) {
                            houseid = houseresult.insertId;
                            var str = "";
                            var arr = [];
                            for (var item of obj.bId) {
                                str += "(?,?),";
                                arr.push(parseInt(houseid));
                                arr.push(parseInt(item.id));
                            }
                            str = str.substr(0, str.length - 1);
                            houseid = houseresult.insertId;
                            var sqlhousebed = `INSERT into home_business_house_bed (hId,bId) VALUES ${str}`;
                            pool.query(sqlhousebed, arr, (err, bedresult) => {
                                if (err) throw err;
                                if (bedresult.affectedRows > 0) {
                                    res.send({ code: 1, data: houseid })
                                } else {
                                    res.send({ code: -1, msg: "home_business_house_bed添加成功失败" })
                                }
                            })
                        }
                    });
                } else {
                    //没有则插入
                    var sqlAddapartment = " INSERT INTO home_dic_apartment (bedroom,saloon,toilet,kitchen, balcony) VALUES(?,?,?,?,?) ";
                    pool.query(sqlAddapartment, [obj.bedroom, obj.saloon, obj.toilet, obj.kitchen, obj.balcony], (err, result) => {
                        //获得刚插入的户型id,插入主表的时候要用
                        daId = result.insertId;
                        if (err) throw err;
                        //插入主表house
                        var sqlhouse = " INSERT into home_business_house (houseTypeId,rentalTypeId,daId,roomSize,toiletId,peopleNumber,aId,address,uid) VALUES(?,?,?,?,?,?,?,?,?) ";
                        pool.query(sqlhouse, [obj.houseTypeId, obj.rentalTypeId, daId, obj.roomSize, obj.toiletId, obj.peopleNumber, obj.aId, obj.address, obj.uid], (err, houseresult) => {
                            if (err) throw err;
                            if (houseresult.affectedRows > 0) {
                                houseid = houseresult.insertId;
                                var str = "";
                                var arr = [];
                                for (var item of obj.bId) {
                                    str += "(?,?),";
                                    arr.push(parseInt(houseid));
                                    arr.push(parseInt(item.id));
                                }
                                str = str.substr(0, str.length - 1);
                                //添加床铺表
                                var sqlhousebed = `INSERT into  home_business_house_bed (hId,bId)  VALUES ${str} `;
                                pool.query(sqlhousebed, arr, (err, bedresult) => {
                                    if (err) throw err;
                                    if (bedresult.affectedRows > 0) {
                                        res.send({ code: 1, data: houseid });
                                    } else {
                                        res.send({ code: -1, msg: "home_business_house_bed添加成功失败" });
                                    }
                                })
                            }
                        });
                    })
                }
            })
        }
    });

})
module.exports = router;