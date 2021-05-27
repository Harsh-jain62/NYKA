
function isEmpty(txt)
{ if(txt.length==0)
    return({img:'crs.png',err:true})
  else  
  return({img:'tic.png',err:false})

}


function checkRequire(txt){
  if(txt.length==0)
  return false
  else
  return true
}

function checkPassword(txt){
  if(txt.length<=5)
  return({img:'crs.png',err:true})

  else
  return({img:'tic.png',err:false})
}


function checkMobile(txt){
var reg=/[0-9]{10}/
     //Alert.alert('cc '+reg.test(txt))
     if(reg.test(txt)==false)
      return false
      else
      return true
  
  }

function checkEmail(txt)
{if(checkRequire(txt))
{ var reg= /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
  if(reg.test(txt)==false)
  {return false}
  else
  {return true}
}
else
{return false}

}


export {checkRequire,checkMobile,checkEmail,checkPassword,isEmpty}

