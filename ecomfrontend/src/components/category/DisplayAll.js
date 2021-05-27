import React,{useState,useEffect} from 'react';
import {ServerURL,getData} from '../FetchNodeServices'
export default function DisplayAll(props)
{ const [getList,setList]=useState([])

const fetchData=async()=>{
var result=await getData('category/fetchallcategory')
setList(result)

}

useEffect(function(){
fetchData()

},[])    

const displayResult=()=>{
return(
        
      getList.map((item,index)=>{
        return(  <div>
              {item.categoryid} {item.categoryname}
             </div>) })     
            
    )
}


return(<div>
{displayResult()}

</div>)
}