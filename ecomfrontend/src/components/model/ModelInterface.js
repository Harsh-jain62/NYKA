import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {postData,ServerURL,getData} from '../FetchNodeServices';
import {isEmpty} from '../Checks'

const useStyles = makeStyles((theme) => ({
  root: {
    display:'flex',
    alignContent:'center',
    justifyContent:'center',
  },
 maindiv:{
   display:'flex',
   flexDirection:'column',
   alignContent:'center',
   justifyContent:'center',
   padding:20,
   marginTop:30,
   width:600,
   backgroundColor:'#dfe4ea',
   border:'2px solid #7f8c8d',
   borderRadius:'2%',
 },
 headingdiv:{
  display:'flex',
  width:'auto',
  padding:3,
  border:'1 solid #000000',

 },
 input: {
  display: 'none',
},
large: {
  width: 70,
  height: 70,
  margin:5,
},
}));

export default function ModelInterface(props)
{
    const classes = useStyles();
    const[getList,setList]=useState([]);
    const[getBrand,setBrand]=useState([]);
    const[getCategoryId,setCategoryId]=useState('');
    const[getBrandId,setBrandId]=useState('');
    const[getModelName,setModelName]=useState('');
    const[getModelDescription,setModelDescription]=useState('');
    const[getMessage,setMessage]=useState();
    const[getErrorPic,setErrorPic]=useState({bi:'',mn:'',md:'',ci:''})
   
    // const categoryid =(event)=>{
    //   setcategoryid(event.target.value)
    //   }
    const handleCategory=(event)=>{
      setCategoryId(event.target.value);
      fetchBrand(event.target.value);
     }


    const fetchData=async()=>{
      var result=await getData('category/fetchallcategory')
      setList(result)
     }

     const fetchBrand=async(data)=>{
      var body={categoryid:data}
      var result=await postData('brand/fetchbrands',body)
           setBrand(result)
     }

   

     useEffect(function(){
      fetchData()
      fetchBrand()
       },[])
       
    
       const categoryItems=()=>{
        return(
         
                getList? getList.map((item,index)=>{
                     return(
                          <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
                    )
                 }):null
            
        )
        }

        const brandItems=()=>{
          return(
           
                   getBrand.map((item,index)=>{
                       return(
                            <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
                      )
                   })
              
          )
          }
          const handleReset=()=>{
            setCategoryId('')
            setBrandId('')
             setModelName('')
             setModelDescription('')
             
            
    
          }
  

      const handleSubmit=async()=>{

        var error=false
        var bi=isEmpty(getBrandId)
        var mn=isEmpty(getModelName)
        var md=isEmpty(getModelDescription)
        var ci=isEmpty(getCategoryId)
       
        if(bi.err)
        {
           error=bi.err
          
        }
        if(mn.err)
        {
           error=mn.err
           
        }
        if(md.err)
        {
           error=md.err
          
        }
        if(ci.err)
        {
           error=ci.err
          
        }
      
      
          setErrorPic({bi:bi.img,mn:mn.img,md:md.img,ci:ci.img})
       
        if(!error)
        {
             
        var body={brandid:getBrandId,modelname:getModelName,description:getModelDescription}
        var result=await postData('model/modelsubmit',body)
        
        if(result){
          setMessage("Record Submitted...")
        }
        else{
          setMessage("Record not submitted...")
        }
      }
     
      }  
    
    return(
        <div className={classes.root}>
          <div className={classes.maindiv}>
             <div className={classes.headingdiv}>
             <h3>Model Interface</h3>
            </div>
           <Grid container spacing={2}>
           <Grid item xs={12} sm={6}>
           <img src={`/${getErrorPic.ci}`} width='10' height='10'  />
                   <FormControl variant="outlined" fullWidth >
                  <InputLabel >Category </InputLabel>
                 <Select value={getCategoryId}  onChange={(event)=>handleCategory(event)}  
                 label="Category Id" >
                           {categoryItems()}
                  </Select>
            </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                  <img src={`/${getErrorPic.bi}`} width='10' height='10'  />
                  <FormControl variant="outlined" fullWidth >
                  <InputLabel >Brand </InputLabel>
                 <Select value={getBrandId}  onChange={(event)=>setBrandId(event.target.value)}  
                 label="Brand Id" >
                           {brandItems()}
                  </Select>
            </FormControl>
                  </Grid>
                            
                <Grid item xs={12}>
                <img src={`/${getErrorPic.mn}`} width='10' height='10' />
                  <TextField   value={getModelName}   label="Model Name" variant="outlined" fullWidth onChange={(event)=>setModelName(event.target.value)} />
                </Grid>
                <Grid item xs={12}>
                <img src={`/${getErrorPic.mn}`}  width='10' height='10'/>
                  <TextField   value={getModelDescription}  label="Model Description" variant="outlined" fullWidth onChange={(event)=>setModelDescription(event.target.value)} />
                </Grid>
            
           
           <Grid style={{ display:'flex',justifyContent:'center'}} item xs={12} sm={6}>
           <Button variant="contained" color="primary" onClick={()=>handleSubmit()} >
               Submit
                   </Button>
                  </Grid>

                  <Grid style={{ display:'flex',justifyContent:'center'}} item xs={12} sm={6}>
                  <Button variant="contained" color="primary" onClick={()=>handleReset()}>
                   Reset
                   </Button>
                  </Grid>


           </Grid>
           <div style={{ width:600,padding:10,display:'flex',justifyContent:'center',alignContent:'center'}}>
         <b>{getMessage}</b>
         </div>
          </div>
      
        </div>
    );
}