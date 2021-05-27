var express = require('express');
var router = express.Router();
var pool=require('./pool')
var upload=require('./multer')
/* GET home page. */
router.post('/categorysubmit',upload.any(), function(req, res, next) {
  console.log(req.body)
   pool.query('insert into category(categoryname,description,icon,ad,adstatus)values(?,?,?,?,?)',[req.body.categoryname,req.body.description,req.files[0].originalname,req.files[1].originalname,req.body.adstatus],function(error,result){
    if(error)
   {  console.log(error)
     
   return res.status(500).json({'RESULT':false})}
    else{
        return res.status(200).json({'RESULT':true})

    }


   }) 
  });

  router.post('/editcategoryicon',upload.any(), function(req, res, next) {
    pool.query('update category set icon=? where categoryid=?',[req.files[0].originalname,req.body.categoryid],function(error,result){
     if(error)
     { return res.status(500).json({'RESULT':false})}
     else{
         return res.status(200).json({'RESULT':true})
 
     }
 
 
    }) 
   });
 

   router.post('/editcategoryad',upload.any(), function(req, res, next) {
    pool.query('update category set ad=? where categoryid=?',[req.files[0].originalname,req.body.categoryid],function(error,result){
     if(error)
     { return res.status(500).json({'RESULT':false})}
     else{
         return res.status(200).json({'RESULT':true})
 
     }
 
 
    }) 
   });
 
 


  router.get('/fetchallcategory',function(req,res){
pool.query("select * from category",function(error,result){
 if(error)
 {
   return res.status(500).json([])
 }
 else
 {
   return res.status(200).json(result)
 }

})


})

router.get('/fetchcategory',function(req,res){
  pool.query("select * from category",function(error,result){
   if(error)
   {
     return res.status(500).json([])
   }
   else
   {
     return res.status(200).json(result)
   }
  
  })
  
  
  })
  
router.post('/categorydelete', function(req, res, next) {
  pool.query('delete from category where categoryid=?',[req.body.categoryid],function(error,result){
   if(error)
   { return res.status(500).json({'RESULT':false})}
   else{
       return res.status(200).json({'RESULT':true})

   }


  }) 
 });

 router.post('/updatecategory', function(req, res, next) {
  pool.query('update  category set categoryname=?, description=?, adstatus=?  where categoryid=?',[req.body.categoryname,req.body.categorydescription,req.body.adstatus,req.body.categoryid],function(error,result){
   if(error)
   {  console.log(error)
     return res.status(500).json({'RESULT':false})}
   else{
       return res.status(200).json({'RESULT':true})

   }


  }) 
 });
 router.get('/fetchcategorybyadstatus',function(req,res)
{ 
   

pool.query("select * from category where adstatus='Yes'",function(err,result){
if(err){
 return res.status(500).json([])
}
else
{
  return res.status(200).json(result)

}

})})





module.exports = router;
