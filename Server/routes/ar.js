const express=require("express");
const router=express.Router();
const pool=require("../pool");

router.get("/",(req,res)=>{
    var hid = parseInt(req.query.hid);
    var count = req.query.count;
    var data=[];
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
            for(var i = 0;i<count;i++){
                data[i] = [];
            }
            for(var i = 0;i<result.length;i++){
              //  console.log(typeof(result[i].ImgUrl[2]));
                switch(parseInt((result[i].ImgUrl.substr(-7,1)))){
                    case 0:
                        dir(data[0],result[i].ImgUrl);
                      //  data[0].push(result[i].ImgUrl);
                        break;
                    case 1:
                        dir(data[1],result[i].ImgUrl);
                        //data[1].push(result[i].ImgUrl);
                        break;
                    case 2:
                        dir(data[2],result[i].ImgUrl);
                        //data[2].push(result[i].ImgUrl);
                        break;
                    case 3:
                        dir(data[3],result[i].ImgUrl);
                        //data[3].push(result[i].ImgUrl);
                        break;
                    case 4:
                        dir(data[4],result[i].ImgUrl);
                        //data[4].push(result[i].ImgUrl);
                        break;
                    
                }
            }     
            res.send({msg:1,data});      
        }
    });
})

module.exports = router;