const express=require('express');
const router=express.Router();
//引入multer组件
const multer = require('multer');
//设置存储路径
const fileBasePath = 'public/uploads/';
//处理存储路径以及文件名和后缀
const storage = multer.diskStorage({
  destination:fileBasePath,//路径
  filename(req,file,cb){//文件名称及后缀
    //const name = file.originalname.split('.');
    cb(null,new Date().getTime()+Math.floor(Math.random()*9999)+/\.\w+$/.exec(file.originalname));
  },
});
const baseUpload = multer({storage});
//single中的loadfile与前台页面封装的formData追加的属性名一致
const upload = baseUpload.single('loadfile');
//如果有错误消息，处理错误消息
function uploadMiddleware(req,res,next){
  upload(req,res,(err)=>{
    if(err){
      // 进行错误捕获
      res.json({code:-1,msg:err.toString()});
    }else{
      next();
    }
  });
}
router.post("/",
uploadMiddleware,(req,res)=>{
  //保存到服务器后req.file.path为服务器路径（包含public），所以需要去掉public
  let savePath = req.file.path.replace(/\\/g,'/').replace("public/",'');
  res.send(savePath);//返回服务器保存为文件全路径
})
module.exports=router;