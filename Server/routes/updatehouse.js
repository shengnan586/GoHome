const express=require("express");
const router=express.Router();
const query=require("../query");

router.post("/",(req,res)=>{
    var obj=req.body;
    var branch = 0;
    var sql = 'select id from home_dic_apartment where bedroom=? and saloon=?  and toilet=? and kitchen=? and balcony=?';
    query(sql,[obj.bedroom,obj.saloon,obj.toilet,obj.kitchen,obj.balcony])
    .then(result=>{
        if(result.length > 0){
            branch = 1;
            var daId = parseInt(result[0].id);
            sql = 'update home_business_house set houseTypeId = ?,rentalTypeId=?,daId = ?,roomSize = ?,toiletId = ?,peopleNumber=?,aId=?,address=? where id = ?'
            return query(sql,[obj.houseTypeId, obj.rentalTypeId, daId, obj.roomSize, obj.toiletId, obj.peopleNumber, obj.aId, obj.address,obj.id]);
        }else{
            branch = 2;
            sql = 'insert into home_dic_apartment (bedroom,saloon,toilet,kitchen,balcony) values (?,?,?,?,?)';
            return query(sql,[obj.bedroom,obj.saloon,obj.toilet,obj.kitchen,obj.balcony]);
        }
    }).then(result=>{
        if(branch == 1){
            if(result.affectedRows > 0){
                branch = 3;
                sql = 'delete from home_business_house_bed where hId = ?'
                return query(sql,[obj.id]);
            }
        }else if(branch == 2){
            if(result.affectedRows > 0){
                var daId = result.insertId;
                branch = 4;
                sql = 'update home_business_house set houseTypeId = ?,rentalTypeId=?,daId = ?,roomSize = ?,toiletId = ?,peopleNumber=?,aId=?,address=? where id = ?'
                return query(sql,[obj.houseTypeId, obj.rentalTypeId, daId, obj.roomSize, obj.toiletId, obj.peopleNumber, obj.aId, obj.address,obj.id]);
            }    
        }   
    }).then(result=>{
        if(branch == 3){
            if(result.affectedRows > 0){
                branch = 5;
                var str = "";
                var arr = [];
                for(var item of obj.bId){
                    str += "(?,?),";
                    arr.push(parseInt(obj.id));
                    arr.push(parseInt(item.id));                     
                }
                str = str.substr(0,str.length-1);
                sql = `INSERT into home_business_house_bed (hId,bId) VALUES ${str} `;
                return query(sql,arr);
            }
        }else if(branch == 4){
            if(result.affectedRows > 0){
                branch = 6;
                sql = 'delete from home_business_house_bed where hId = ?';
                return query(sql,[obj.id]);
            }
        }
    }).then(result=>{
        if(branch == 5){
            if(result.affectedRows > 0){
                res.send({code:1});
            }
        }else if(branch == 6){
            if(result.affectedRows > 0){
                var str = "";
                var arr = [];
                for(var item of obj.bId){
                    str += "(?,?),";
                    arr.push(parseInt(obj.id));
                    arr.push(parseInt(item.id));                     
                }
                str = str.substr(0,str.length-1);
                sql = `INSERT into home_business_house_bed (hId,bId) VALUES ${str} `;
                return query(sql,arr);
            }
        }     
    }).then(result=>{
        if(result.affectedRows > 0){
            res.send({code:1});
        }
    })
})

module.exports=router;