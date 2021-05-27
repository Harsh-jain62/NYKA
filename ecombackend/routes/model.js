var express = require('express');
var router = express.Router();
var pool=require("./pool");

router.post('/modelsubmit',function(req,res){
    
    pool.query("insert into model(brandid,modelname,description)values(?,?,?)",[req.body.brandid,req.body.modelname,req.body.description],function(err,result){
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

  router.get('/fetchallmodel',function(req,res){

    pool.query("select * from model",function(error,result){
      if(error)
      {  
        return res.status(500).json([])
      }
      else{
         
        return res.status(200).json(result)
      }
  });
  
  });

  router.post('/updatemodel',function(req,res){
    
    pool.query("update model set brandid=?,modelname=?,description=? where modelid=?",[req.body.brandid,req.body.modelname,req.body.description,req.body.modelid],function(err,result){
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

  router.post('/modeldelete',function(req,res){
  
    pool.query("delete from model where modelid=?",[req.body.modelid],function(err,result){
        if(err){
          
          return res.status(500).json({'Result':false})
        }
        else
        {
          return res.status(200).json({'Result':true})
        }
    })
  
  });

  router.post('/fetchmodels',function(req,res){
   
    pool.query("select * from model where brandid=?",[req.body.brandid],function(error,result){
      if(error)
      {  console.log(error)
        return res.status(500).json([])
      }
      else{
         
        return res.status(200).json(result)
      }
  });
  
  });

module.exports = router;