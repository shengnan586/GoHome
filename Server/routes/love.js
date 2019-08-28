const express = require("express");
const router = express.Router();
const query = require("../query");

router.get("/",(req,res)=>{
    var hId = req.query.hid;
    var uId = req.query.uid;
    var collectime = req.query.collectime;
    console.log(hId,uId,collectime);
})
module.exports = router;