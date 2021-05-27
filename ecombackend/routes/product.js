var express = require('express');
var router = express.Router();
var pool=require("./pool");
var upload=require("./multer");

router.post('/productsubmit',upload.any(),function(req,res){
    
    pool.query("insert into product(categoryid,brandid,modelid,productname,description,price,picture,offerprice,delivery,ratings,color,ad,adstatus,offertype,stock)values(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)",[req.body.categoryid,req.body.brandid,req.body.modelid,req.body.productname,req.body.description,req.body.price,req.files[0].originalname,req.body.offerprice,req.body.delivery,req.body.ratings,req.body.color,req.files[1].originalname,req.body.adstatus,req.body.offertype,req.body.stock],function(err,result){
        if(err){
          
          return res.status(500).json({'RESULT':false})
        }
        else
 
        {
          console.log(req.body)
          return res.status(200).json({'RESULT':true})
        }
    })
  
  });

  router.get('/fetchallproduct',function(req,res){

    pool.query("select * from product",function(error,result){
      if(error)
      {  
        return res.status(500).json([])
      }
      else{
         
        return res.status(200).json(result)
      }
  })
  
  });

  router.post('/updateproduct',function(req,res){
    
    pool.query("update product set categoryid=?,brandid=?,modelid=?,productname=?,description=?,price=?,offerprice=?,delivery=?,ratings=?,color=?,adstatus=?,offertype=?,stock=? where productid=?",[req.body.categoryid,req.body.brandid,req.body.modelid,req.body.productname,req.body.description,req.body.price,req.body.offerprice,req.body.delivery,req.body.ratings,req.body.color,req.body.adstatus,req.body.offertype,req.body.stock,req.body.productid],function(err,result){
        if(err){
          //console.log(err)
          return res.status(500).json({'Result':false})
        }
        else
        { 
          return res.status(200).json({'Result':true})
        }
    })
  
  });
  router.get('/displayalltopproducts',function(req,res,next){
    pool.query("select * from product ",function(err,result){
      if(err){
        return  res.status(500).json([])
      }
      else{
        return  res.status(200).json(result)
      }
    })
  
  })
  
  
  router.post('/editproductpicture',upload.any(),function(req,res){
  
    pool.query("update product set picture=? where productid=?",[req.files[0].originalname,req.body.productid],function(err,result){
        if(err){
          
          return res.status(500).json({'Result':false})
        }
        else
        {
          return res.status(200).json({'Result':true})
        }
    })
  
  });
  
  router.post('/editproductad',upload.any(),function(req,res){
  
    pool.query("update product set ad=? where productid=?",[req.files[0].originalname,req.body.productid],function(err,result){
        if(err){
          console.log(err)
          return res.status(500).json({'Result':false})
        }
        else
        {
          return res.status(200).json({'Result':true})
        }
    })
  
  });
  
  router.post('/productdelete',function(req,res){
  
    pool.query("delete from product where productid=?",[req.body.productid],function(err,result){
        if(err){
          
          return res.status(500).json({'Result':false})
        }
        else
        {
          return res.status(200).json({'Result':true})
        }
    })
  
  });
  
  




module.exports = router;