const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.get("/",(req,res)=>{
    var hid = parseInt(req.query.hid);
    var count = req.query.count;
    var data=[];
    //将图片按照 r-l-u-d-f-b 的顺序排好
    function dir(direct,url){
        switch(url.substr(-5,1)){
            case 'r':
                direct[0] = url;
                break;
            case 'l':
                direct[1] = url;
                break;
            case 'u':
                direct[2] = url;
                break;
            case 'd':
                direct[3] = url;
                break;
            case 'f':
                direct[4] = url;
                break;
            case 'b':
                direct[5] = url;
                break;
        }
    }
    var sql = 'select ImgUrl from home_business_house_img where hId = ?';
    pool.query(sql,[hid],(err,result)=>{
        if(err) throw err;
        if(result.length > 0){
            //按照房间类型的数量初始化装图片的数组
            for(var i = 0;i<count;i++){
                data[i] = [];
            }
            //按照0--客厅 1--厨房 2--卫生间 3--主卧 4--阳台的顺序整理图片
            for(var i = 0;i<result.length;i++){
                switch(parseInt((result[i].ImgUrl.substr(-7,1)))){
                    case 0:
                        dir(data[0],result[i].ImgUrl);
                        break;
                    case 1:
                        dir(data[1],result[i].ImgUrl);
                        break;
                    case 2:
                        dir(data[2],result[i].ImgUrl);
                        break;
                    case 3:
                        dir(data[3],result[i].ImgUrl);
                        break;
                    case 4:
                        dir(data[4],result[i].ImgUrl);
                        break;
                    
                }
            }     
            res.send({msg:1,data});      
        }
    });
})

module.exports = router;