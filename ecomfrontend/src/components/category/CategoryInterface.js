import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {postDataAndImage,ServerURL} from '../FetchNodeServices'
import {isEmpty} from '../Checks'

const useStyles = makeStyles((theme) => ({
  root: {
    display:'flex',
    alignContent:'center',
     justifyContent:'center',
     
  },
  headingdiv:{
   display:'flex',
   flexDirection:'column',
   width:'auto',
   padding:3,
   border:'1 solid #000000'
    
  },
  maindiv:{
     display:'flex',
     alignContent:'center',
     justifyContent:'center',
     flexDirection:'column',
 
     padding:20,
     marginTop:20,
     width:600,
     backgroundColor:'#ecf0f1'

  },
  input: {
    display: 'none',
  },
  large: {
    width:70 ,
    height:70,
    margin:5,
    padding:3,
    
    
  },
  
}));

export default function CategoryInterface(props)
{
    const classes = useStyles();
    const [getCategoryName,setCategoryName]=useState('')
    const [getCategoryDescription,setCategoryDescription]=useState('')
    const [getCategoryIcon,setCategoryIcon]=useState({fileBytes:'',fileUrl:'/noimage.png'})
    const [getCategoryAd,setCategoryAd]=useState({fileBytes:'',fileUrl:'/noimage.png'})
    const [getCategoryStatus,setCategoryStatus]=useState('')
    const [getMessage,setMessage]=useState()
    const [getErrorPic,setErrorPic]=useState({cn:'tp.png',cd:'tp.png',ci:'tp.png',ca:'tp.png',cas:'tp.png'})

    

    const handleIcon=(event)=>{
    setCategoryIcon({fileBytes:event.target.files[0],fileUrl:URL.createObjectURL(event.target.files[0])})

    }
    const handleAd=(event)=>{
      setCategoryAd({fileBytes:event.target.files[0],fileUrl:URL.createObjectURL(event.target.files[0])})
  
      }

      const handleReset=()=>{
        setCategoryName('')
        setCategoryDescription('')
         setCategoryStatus('')
        

      }
      const checkStorage=()=>{
        if(!localStorage.getItem("ADMIN"))
        {
         props.history.replace({pathname:'\adminlogin'})
        }
      
     
       }
       useEffect(function(){
        checkStorage()   
     
       },[])

  const handleSubmit=async()=>{
    var error=false
    var cn=isEmpty(getCategoryName)
    var cd=isEmpty(getCategoryDescription)
    var ci=isEmpty(getCategoryIcon.fileBytes)
    var ca=isEmpty(getCategoryAd.fileBytes)
    var cas=isEmpty(getCategoryStatus)
    if(cn.err)
    { error=cn.err
     }

    if(cd.err)
    { error=cd.err
      }
    if(ci.err)
    {error=ci.err}

    if(ca.err)
    {error=ca.err}
    if(cas.err)
    {error=cas.err}
    setErrorPic({cn:cn.img,cd:cd.img,ci:ci.img,ca:ca.img,cas:cas.img})
    
    if(!error)
    
    {
    var formData=new FormData()
    formData.append('categoryname',getCategoryName)
    formData.append('description',getCategoryDescription)
    formData.append('icon',getCategoryIcon.fileBytes) 
    formData.append('ad',getCategoryAd.fileBytes) 
    formData.append('adstatus',getCategoryStatus) 
    const config={headers:{'content-type':'multipart/form-data'}}
    var result=await postDataAndImage('category/categorysubmit',formData,config)
     if(result)
     {setMessage("Record Submitted...")} 
     else
     {setMessage("Fail To Submit Record")}
    }
    
  }

return(

<div className={classes.root} >
   <div className={classes.maindiv}>
     <div className={classes.headingdiv}>
       <h3>Category Interface</h3>

     </div>
    <Grid container spacing={2}>
        <Grid item xs={12}>
        <img src={`/${getErrorPic.cn}`} width='10' height='10'/> 
        <TextField id="outlined-basic" label="Category Name" variant="outlined" value={getCategoryName} fullWidth onChange={(event)=>setCategoryName(event.target.value)} />
        </Grid>

        <Grid item xs={12}>
        <img src={`/${getErrorPic.cd}`} width='10' height='10'/> 
        <TextField onChange={(event)=>setCategoryDescription(event.target.value)} value={getCategoryDescription} id="outlined-basic" label="Category Description" variant="outlined" fullWidth />
        </Grid>

        <Grid item xs={12} sm={6}>
        <img src={`/${getErrorPic.ci}`} width='10' height='10'/> 
        <input
        accept="image/*"
        className={classes.input}
        id="icon"
        multiple
        type="file"
        onChange={(event)=>handleIcon(event)}
       
      />
      <label htmlFor="icon">
        <Button variant="contained" color="primary" component="span" >
          Upload Icon
        </Button>
      </label>
 
        </Grid>
      <Grid  style={{display:'flex',justifyContent:'center'}} xs={12} sm={6}>
      <img  src={getCategoryIcon.fileUrl}  variant="rounded"  className={classes.large} />
       </Grid>
 
    <Grid item xs={12} sm={6}>
    <img src={`/${getErrorPic.ca}`} width='10' height='10'/> 
        <input
        accept="image/*"
        className={classes.input}
        id='ad'
        multiple
        type="file"
        onChange={(event)=>handleAd(event)}
   
      />
      <label htmlFor="ad">
        <Button variant="contained" color="primary" component="span">
          Upload Ad
        </Button>
      </label>
 
        </Grid>
      <Grid  style={{display:'flex',justifyContent:'center'}} xs={12} sm={6}>
      <img  src={getCategoryAd.fileUrl}  className={classes.large} />
       </Grid>
     <Grid item  xs={12}>
     <img src={`/${getErrorPic.cas}`} width='10' height='10'/> 
     <FormControl variant="outlined" fullWidth >
        <InputLabel id="demo-simple-select-outlined-label">Ad Status</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={getCategoryStatus}
          onChange={(event)=>setCategoryStatus(event.target.value)}
          label="Ad Status"
          value={getCategoryStatus}
        >
          <MenuItem value={'No'}>No</MenuItem>
          <MenuItem value={'Yes'}>Yes</MenuItem>
         </Select>
      </FormControl>
    
     </Grid>
     <Grid item style={{display:'flex',justifyContent:'center'}} xs={12} sm={6}>
     <Button variant="contained" color="primary" onClick={()=>handleSubmit()}>
      Submit
     </Button>
     </Grid>
     <Grid item style={{display:'flex',justifyContent:'center'}} xs={12} sm={6}>
     <Button variant="contained" color="primary" onClick={()=>handleReset()}>
      Reset
     </Button>
     </Grid>
    </Grid>
    <div style={{width:550,padding:10,display:'flex',justifyContent:'center',alignContent:'center'}}>
    <b>{getMessage}</b>
    </div>
    </div>
</div>


)


}