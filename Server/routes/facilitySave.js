const express=require("express");
const router=express.Router();
const query=require("../query");

router.get("/save",(req,res)=>{
    //pro--页面传来的设施名字对象
    var pro = JSON.parse(req.query.pro);
    //hid--房屋id
    var hid = parseInt(req.query.hid);
    //获取sql执行分支
    //1-->3--->5
    //2-->4
    var branch = 0;
    //data存页面传来的配套设施的名字
    var data = [];
    for(var key in pro){
      data.push(key);
    };
    //id存设施名字所对应的id
    var id = [];
    //通过设施名字查设施id
    var sql = 'select id,installName from home_dic_installation where installName in (?)';
    query(sql,[data])
    .then(result=>{
        //循环遍历数据库返回的id，将id存入data中
        for(var item of result){
            id.push(item.id);
        }
        //查询设施表中是否存在该房屋id
        sql = 'select hId from home_business_house_install where hId = ?';
        return query(sql,[hid]);
    }) 
    .then(result=>{
        //如果设施表中不存在该房屋id
        if(result.length <= 0 ){
            branch = 1;
            //则查询设施总表的所有设施id
            sql = 'select id from home_dic_installation';
            return query(sql);
        }
        else{
            //如果设施表中存在该房屋id
            branch = 2;
            console.log('branch'+branch);
            //更新该房屋id下的所有设施的状态为0
            sql = `update home_business_house_install set state = 0 where hId = ${hid}`;
            return query(sql,[hid]);
        }       
    })
    .then(result=>{
        if(branch == 1){
            if(result.length > 0){
                branch = 3;
                //不存在房屋id的情况下 插入该房屋id下所有设施 并将状态初始化为0
                sql = 'insert into home_business_house_install (id,hId,installId,state) values';
                for(var a of result){
                    sql += `(null,${hid},${a.id},0),`;
                };
                sql = sql.substr(0,sql.length-1);
                return query(sql);
            }
        }
        else{
            //存在该房屋id 则更新数据
            if(result.affectedRows > 0){
                branch = 4;
                console.log(branch);
                sql = `update home_business_house_install set state = 1 where hId = ${hid} and installId in (?)`;
                return query(sql,[id]);
            }     
        }
        
    })
    .then(result=>{
        if(branch == 3){
            //不存在房屋id的最后一步--->更新数据
            if(result.affectedRows > 0){
                branch = 5;
                sql = `update home_business_house_install set state = 1 where hId = ${hid} and installId in (?)`;
                return query(sql,[id]);
            }     
        }else{
            res.send({code:1});
            return;
        }
    })
    .then(result=>{
        if(branch == 5)
        res.send({code:1});
    })
    
})

module.exports = router;