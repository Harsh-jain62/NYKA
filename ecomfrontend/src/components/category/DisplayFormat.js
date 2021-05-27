import React,{useState,useEffect} from 'react';
import {ServerURL,getData,postData,postDataAndImage} from '../FetchNodeServices'
import MaterialTable from 'material-table';

import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import Divider from '@material-ui/core/Divider';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {isEmpty} from '../Checks'
import { Icon } from '@material-ui/core';




const useStyles = makeStyles((theme) => ({
    root: {
      display:'flex',
      alignContent:'center',
       justifyContent:'center',
       
    },

    subdiv:{
        display:'flex',
        alignContent:'center',
         justifyContent:'center',
         padding:20,  
            
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
}))  

export default function DisplayFormat(props)
{ const [data, setData] = useState([])
  const [open, setOpen] = React.useState(false);
  const [getCategoryId,setCategoryId]=useState('')
  const [getCategoryName,setCategoryName]=useState('')
  const [getCategoryDescription,setCategoryDescription]=useState('')
  const [getCategoryIcon,setCategoryIcon]=useState({fileBytes:'',fileUrl:'/noimage.png'})
  const [getCategoryAd,setCategoryAd]=useState({fileBytes:'',fileUrl:'/noimage.png'})
  const [getCategoryStatus,setCategoryStatus]=useState('')
  const [getBtnSaveIcon,setBtnSaveIcon]=useState(false)
  const [getBtnAdIcon,setBtnAdIcon]=useState(false)
  const [getErrorPic,setErrorPic]=useState({cn:'',cd:'',ci:'',ca:'',cas:''})

  
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();
    
    const [columns, setColumns] = useState([
        { title: 'Name', field: 'categoryname' },
        { title: 'Description', field: 'description' },
        { title: 'Icon', field: 'icon', render: rowData => <img src={`${ServerURL}/images/${rowData.icon}`} style={{width: 50, height:50, borderRadius: '5%'}}/> },
        { title: 'Ad', field: 'ad',render: rowData => <img src={`${ServerURL}/images/${rowData.ad}`} style={{width: 50, height:50, borderRadius: '5%'}}/> },
        { title: 'Ad Status', field: 'adstatus' },
      ]);
   
      
      const handleClose = () => {
        setOpen(false);
      };
    const fetchData=async()=>{
var result=await getData('category/fetchallcategory')
setData(result)
}

useEffect(function(){
fetchData()
},[])    

const handleIcon=(event)=>{
  setCategoryIcon({fileBytes:event.target.files[0],fileUrl:URL.createObjectURL(event.target.files[0])})
  setBtnSaveIcon(true)
  }
  const handleAd=(event)=>{
    setCategoryAd({fileBytes:event.target.files[0],fileUrl:URL.createObjectURL(event.target.files[0])})
    setBtnAdIcon(true)
    }
    const handleSaveIcon=async()=>{
  
   var formData=new FormData()
  
   formData.append('icon',getCategoryIcon.fileBytes) 
  formData.append('categoryid',getCategoryId) 
  const config={headers:{'content-type':'multipart/form-data'}}
  var result=await postDataAndImage('category/editcategoryicon',formData,config)
  fetchData() 
  setOpen(false)

    }


    const handleSaveAd=async()=>{
  
      var formData=new FormData()
     
      formData.append('ad',getCategoryAd.fileBytes) 
     formData.append('categoryid',getCategoryId) 
     const config={headers:{'content-type':'multipart/form-data'}}
     var result=await postDataAndImage('category/editcategoryad',formData,config)
     fetchData() 
     setOpen(false)
   
       }
   

  const handleSubmit=async()=>{
  var error=false
  var cn=isEmpty(getCategoryName)
  var cd=isEmpty(getCategoryDescription)
  var cas=isEmpty(getCategoryStatus)
  if(cn.err)
  { error=cn.err
   }

  if(cd.err)
  { error=cd.err
    }

  if(cas.err)
  {error=cas.err}
  setErrorPic({cn:cn.img,cd:cd.img,ci:'',ca:'',cas:cas.img})

  if(!error)
  
  {
 var body={categoryid:getCategoryId,categorydescription:getCategoryDescription,categoryname:getCategoryName,adstatus:getCategoryStatus}
 var result=await postData('category/updatecategory',body)
  fetchData()
 setOpen(false)
  }
}





const showEditContent=()=>{
  
return( <Dialog
  fullScreen={fullScreen}
  open={open}
  onClose={handleClose}
  aria-labelledby="responsive-dialog-title"
>
  <DialogTitle id="responsive-dialog-title">{"Edit Category"}</DialogTitle>
  <DialogContent>
    <DialogContentText>
    <Grid container spacing={2}>
        <Grid item xs={12}>
        <img src={`/${getErrorPic.cn}`} width='10' height='10'/> 
        <TextField  value={getCategoryName} id="outlined-basic" label="Category Name" variant="outlined"  fullWidth onChange={(event)=>setCategoryName(event.target.value)} />
        </Grid>

        <Grid item xs={12}>
        <img src={`/${getErrorPic.cd}`} width='10' height='10'/> 
        <TextField value={getCategoryDescription} onChange={(event)=>setCategoryDescription(event.target.value)} id="outlined-basic" label="Category Description" variant="outlined" fullWidth />
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
        >
          <MenuItem value={'No'}>No</MenuItem>
          <MenuItem value={'Yes'}>Yes</MenuItem>
         </Select>
      </FormControl>
    
     </Grid>
     <Grid item style={{display:'flex'}} xs={12}>
     <Button variant="contained" color="primary" onClick={()=>handleSubmit()}>
      Edit Data
     </Button>
     </Grid>
     <Grid item xs={12} >
      <Divider />
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
      <div style={{display:'flex',flexDirection:'row'}}>
       <div style={{padding:3}} >
       <label htmlFor="icon">
   
        <Button variant="contained" color="primary" component="span" >
          Change Icon
        </Button>
       </label>
        </div>
        <div style={{padding:3}}>
      {getBtnSaveIcon?<Button onClick={handleSaveIcon} color="primary" variant="contained" autoFocus>
      Save Icon
    </Button>:<div></div>}
       </div>
       </div>
        </Grid>
      <Grid  style={{display:'flex',justifyContent:'center'}} xs={12} sm={6}>
      <img  src={getCategoryIcon.fileUrl}  variant="rounded" className={classes.large} />
       </Grid>
 
 
       <Grid item xs={12} >
      <Divider  />
     </Grid>
     <Grid item xs={12} sm={6}>
        <img src={`/${getErrorPic.ci}`} width='10' height='10'/> 
        <input
        accept="image/*"
        className={classes.input}
        id="ad"
        multiple
        type="file"
        onChange={(event)=>handleAd(event)}
      />
      <div style={{display:'flex',flexDirection:'row'}}>
       <div style={{padding:3}} >
       <label htmlFor="ad">
   
        <Button variant="contained" color="primary" component="span" >
          Change Icon
        </Button>
       </label>
        </div>
        <div style={{padding:3}}>
      {getBtnAdIcon?<Button onClick={handleSaveAd} color="primary" variant="contained" autoFocus>
      Save Ad
    </Button>:<div></div>}
       </div>
       </div>
        </Grid>
      <Grid  style={{display:'flex',justifyContent:'center'}} xs={12} sm={6}>
      <img  src={getCategoryAd.fileUrl}  variant="rounded" className={classes.large} />
       </Grid>
 



    </Grid>

      
          </DialogContentText>
  </DialogContent>
  <DialogActions>
    <Button onClick={handleClose} color="primary" autoFocus>
      Close
    </Button>
  </DialogActions>
</Dialog>)

}

const handleEdit=(rowData)=>

{
  
  setCategoryId(rowData.categoryid)
  setCategoryName(rowData.categoryname)
  setCategoryDescription(rowData.description)
  setCategoryStatus(rowData.adstatus)
  setCategoryIcon({ fileBytes:'',fileUrl:`${ServerURL}/images/${rowData.icon}`})
  setCategoryAd({fileBytes:'', fileUrl:`${ServerURL}/images/${rowData.ad}`})
  setBtnSaveIcon(false)
  setBtnAdIcon(false)
  setErrorPic({cn:'tic.png',cd:'tic.png',ci:'tic.png',ca:'tic.png',cas:'tic.png'})
  
 
  setOpen(true)
}
const handleDelete=async(oldData)=>{
 //alert(oldData.categoryname)
 var body={categoryid:oldData.categoryid}
 var result=await postData('category/categorydelete',body)
   alert(result.RESULT)  
}

function Editable() {
  
  
    
    return (
        <div className={classes.subdiv}>
      <MaterialTable
        title="Category Register"
        columns={columns}
        data={data}
        
        actions={[
          {
            icon: 'edit',
            tooltip: 'Edit',
            onClick: (event, rowData) => {
              handleEdit(rowData)
            }
          }
        ]}

        editable={{
          onRowAdd: newData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                setData([...data, newData]);
                
                resolve();
              }, 1000)
            }),
            

          onRowDelete: oldData =>
            new Promise((resolve, reject) => {
              setTimeout(() => {
                const dataDelete = [...data];
                const index = oldData.tableData.id;
                dataDelete.splice(index, 1);
                setData([...dataDelete]);
                handleDelete(oldData)
                resolve()
              }, 1000)
            }),
        }}
      />
      </div>
    )
  }
  




return(
<div className={classes.root}>
  
{Editable()}
{showEditContent()}
</div>)
}

