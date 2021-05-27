var express = require('express');
var router = express.Router();
var pool=require("./pool");
var upload=require("./multer");

router.post('/dummy',upload.any(),function(req,res){
    
    
          return res.status(200).json({'RESULT':true})
        });
    
  
        router.post("/addproductpicture", upload.any(), function (req, res, next) {
            //console.log(req.body)
            //console.log(req.files)
            q =
              "insert into productpictures(categoryid,brandid,modelid,productid,description,productpicture) values ?";
            pool.query(
              q,
              [
                req.files.map((item) => [
                  req.body.categoryid,
                  req.body.brandid,
                  req.body.modelid,
                  req.body.productid,
                  req.body.description,
                  item.originalname,
                ]),
              ],
              function (err, result) {
                if (err) {
                  console.log(err);
                  return res.status(500).json({ RESULT: false });
                } else {
                  return res.status(200).json({ RESULT: true });
                }
              }
            );
          });
          

  
  




module.exports = router;