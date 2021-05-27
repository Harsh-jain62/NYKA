var express = require('express');
var router = express.Router();
var pool=require("./pool")

/* GET home page. */

router.post('/chkadminlogin', function(req, res, next) {
   pool.query("select * from admins where adminid=? and password=?",[req.body.adminid,req.body.password],function(error,result){
   if(error)
   {console.log(error)
   
   return res.status(500).json({'status':false})

   }
   else
   { if(result.length==0)
    return res.status(200).json({'status':false})
    else
    return res.status(200).json({'status':true,'data':result})

   }



   })
    
});

module.exports = router;
