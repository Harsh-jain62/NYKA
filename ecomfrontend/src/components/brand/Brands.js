import React,{useEffect, useState} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//import Example from './Example.css';
import  {isEmpty} from '../Checks';
import {postDataAndImage,ServerURL,getData} from '../FetchNodeServices'
import { grid } from '@material-ui/system';

const useStyles = makeStyles((theme) => ({
    root: {
      flexGrow: 1,
      display:'flex',
      justifyContent:'center',
      alignContent:'center',
      
    },
    formControl: {
        margin: theme.spacing(1),
        minWidth: 120,
      },
    maindiv:{
      display:'flex',
      justifyContent:'center',
      alignContent:'center',
      width:'65%',
      marginTop:'10px',
      background:'#bebebe',
      padding:'15px',
      borderRadius:'14px'
    },
    heading:
    {
        marginLeft:'42%',
        color:'#6a5acd',
        borderRadius:'5px'   ,
        
    },
    input: {
        display: 'none',
      },
  }));
  
  



function Brand(){
    const classes = useStyles();
    const [getList,setList]=useState([])
    const [getcategoryid,setcategoryid]=useState('')
    const [getbrandname,setbrandname]=useState('')
    const [getdescription,setdescription]=useState('')
    const [getpicture,setpicture]=useState({fileBytes:'',fileUrl:'noimage.png'})
    const [getad,setad]=useState({fileBytes:'',fileUrl:'noimage.png'})
    const [getadstatus,setadstatus]=useState('')
    const [gettopbrand,settopbrand]=useState('')
    const [getnewbrand,setnewbrand]=useState('')
    const [getMessage,setMessage] =useState('')
    const [geterrpic,seterrpic]=useState({ci:'tp.png',bn:'tp.png',de:'tp.png',pi:'tp.png',ad:'tp.png',as:'tp.png',tb:'tp.png',nb:'tp.png'})
    
    const categoryid =(event)=>{
    setcategoryid(event.target.value)
    }
    const brandname =(event)=>{
    setbrandname(event.target.value)
    }
    const description=(event)=>{
    setdescription(event.target.value)
    }
    const picture=(event)=>{
    setpicture({fileBytes:(event.target.files[0]),fileUrl:URL.createObjectURL(event.target.files[0])})
    }
    const ad=(event)=>{
    setad({fileBytes:(event.target.files[0]),fileUrl:URL.createObjectURL(event.target.files[0])})
    }
    const fetchData=async()=>{
      var result=await getData('category/fetchallcategory')
      setList(result)
      
      }
      useEffect(function(){
fetchData()

      },[])

      const categoryItems=()=>{
        return(
                
              getList.map((item,index)=>{
                return(   
                          <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
                      ) })     
                    
            )
        }

        const handleReset=()=>{
          setcategoryid('')
          setbrandname('')
          setdescription('')
          setadstatus('')
          settopbrand('')
           setnewbrand('')
          
  
        }
  


    const submit=async()=>{
      
      var error = false
      var ci = isEmpty(getcategoryid)
      var bn = isEmpty(getbrandname)
      var de = isEmpty(getdescription)
      var pi = isEmpty(getpicture.fileBytes)
      var ad = isEmpty(getad.fileBytes)
      var as = isEmpty(getadstatus)
      var tb = isEmpty(gettopbrand)
      var nb = isEmpty(getnewbrand)
      

      if(ci.err)
      {
        error= ci.err
      }
      if(bn.err)
      {
        error=bn.err
      }
      if(de.err)
      {
        error=de.err
      }
      if(pi.err)
      {
        error=pi.err
      }
      if(ad.err)
      {
        error=ad.err
      }
      if(as.err)
      {
        error=as.err
      }
      if(tb.err)
      {
        error=tb.err
      }
      if(nb.err)
      {
        error=nb.err
      }

     seterrpic({ci:ci.img,bn:bn.img,de:de.img,pi:pi.img,ad:ad.img,as:as.img,tb:tb.img,nb:nb.img})
    


    if(!error)
    {
      var formData = new FormData()
        formData.append('categoryid',getcategoryid)
        formData.append('brandname',getbrandname)
        formData.append('description',getdescription)
        formData.append('picture',getpicture.fileBytes)
        formData.append('ad',getad.fileBytes)
        formData.append('adstatus',getadstatus)
        formData.append('topbrand',gettopbrand)
        formData.append('newbrand',getnewbrand)

        const config={headers:{'content-type':'multipart/formdata'}}
        var result =await postDataAndImage('brand/brandsubmit',formData,config)

        if(result)
        {
          console.log(result)
          setMessage('Record Submited...')
        }
        else
        {
          console.log(result)
          setMessage('Fail to submit record...')
        }
    }
   
  }

  
    return(<div className={classes.root}>
      
        <div className={classes.maindiv}>
          
        <Grid container spacing={3}>
        <Grid item xs={12}>
        <h1 className={classes.heading}> BRAND</h1>        
        </Grid>
          <Grid item xs={12}>
            <img src={`${geterrpic.ci}`} width='13' height='13'/>
     
          <FormControl variant="outlined"  fullWidth>
        <InputLabel id="categoryid">Category ID</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="categoryid"
          value={getcategoryid}
          onChange = {(event)=>categoryid(event)}
          label="Category ID"
        >
          
        {categoryItems()}
          
        </Select>
      </FormControl>
     
          </Grid>
          <Grid item xs={6}>
          <img src={`${geterrpic.bn}`} width='13' height='13'/>
          <TextField id="outlined-basic" label="Brand Name" variant="outlined"  value={getbrandname} fullWidth  onChange={(event)=>brandname(event)}/>          
          </Grid>
          <Grid item xs={6}>
          <img src={`${geterrpic.de}`} width='13' height='13'/>
          <TextField id="outlined-basic" label="Description" variant="outlined"  value={getdescription} fullWidth onChange={(event)=>description(event)} />         
          </Grid>
          <Grid item xs={3} style={{marginTop:'26px',}}>
          <input
            accept="image/*"
            className={classes.input}
            id="pi"
            multiple
            type="file"
            onChange={(event)=>picture(event)}
            />
           <label htmlFor="pi">
           <img src={`${geterrpic.pi}`} width='13' height='13'/>
            <Button variant="contained" color="primary" component="span">
            Picture
            </Button>
           </label>
         
          </Grid>
          <Grid item xs={3}>
            <img src={getpicture.fileUrl} width='90px' height='90px'/>
          </Grid>
          <Grid item xs={3}  style={{marginTop:'26px',}}>
          <input
            accept="image/*"
            className={classes.input}
            id="ad"
            multiple
            type="file"
            onChange={(event)=>ad(event)}
            />
           <label htmlFor="ad">
           <img src={geterrpic.ad} width='13' height='13'/>
            <Button variant="contained" color="primary" component="span">
            Upload Ad
            </Button>
           </label>
          </Grid>
          <Grid item xs={3}>
          <img src={getad.fileUrl} width='90px' height='90px'/>
          </Grid>

        <Grid item xs>
        <img src={`${geterrpic.as}`} width='13' height='13'/>
        <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel id="demo-simple-select-outlined-label">Ad Status</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={getadstatus}
          onChange={(event)=>setadstatus(event.target.value)}
          label="Ad Status"
        >


          <MenuItem value={'No'}>No</MenuItem>
          <MenuItem value={'Yes'}>Yes</MenuItem>
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs>
        <img src={`${geterrpic.tb}`} width='13' height='13'/>
        <FormControl variant="outlined" className={classes.formControl} fullWidth>
        <InputLabel id="demo-simple-select-outlined-label">Top Brands</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={gettopbrand}
          onChange={(event)=>settopbrand(event.target.value)}
          label="Top Brands"
        >
         
          <MenuItem value={'No'}>No</MenuItem>
          <MenuItem value={'Yes'}>Yes</MenuItem>
        </Select>
      </FormControl>
        </Grid>
        <Grid item xs>
        <img src={`${geterrpic.nb}`} width='13' height='13'/>
        <FormControl variant="outlined" className={classes.formControl} fullWidth> 
        <InputLabel id="demo-simple-select-outlined-label" >New Brands</InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={getnewbrand}
          onChange={(event)=>setnewbrand(event.target.value)}
          label="New Brands"
        >

          <MenuItem value={'No'}>No</MenuItem>
          <MenuItem value={'Yes'}>Yes</MenuItem>
        </Select>
      </FormControl>
        </Grid>
        <Grid item style={{display:'flex',justifyContent:'center'}} xs={12} sm={6}>
     <Button variant="contained" color="primary" onClick={()=>submit()}>
      Submit
     </Button>
     </Grid>
     <Grid item style={{display:'flex',justifyContent:'center'}} xs={12} sm={6}>
     <Button variant="contained" color="primary" onClick={()=>handleReset()}>
      Reset
     </Button>
     </Grid>
        
      
      <div style={{width:550,padding:10,display:'flex',justifyContent:'center',alignContent:'center'}}>
    <b>{getMessage}</b>
    </div>
</Grid>
      </div>

    </div>)
}

export default Brand;