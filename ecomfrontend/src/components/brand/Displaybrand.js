import React,{useState,useEffect}  from 'react';
import {ServerURL,getData,postData,postDataAndImage} from '../FetchNodeServices'
import MaterialTable, { MTableToolbar } from 'material-table';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import  {isEmpty} from '../Checks';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

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
    width:'45%',
    
  
  },
  subdiv:{
    display:'flex',
    justifyContent:'center',
    alignContent:'center',
    width:'auto',
    marginTop:'10px',
    
    padding:'15px',
    borderRadius:'34px'
  },
 
  input: {
      display: 'none',
    },
}));



export default function Displayformat(props)
{
    const classes = useStyles();

    const [getbrandid,setbrandid]=useState('')
    const [getcategoryid,setcategoryid]=useState('')
    const [getbrandname,setbrandname]=useState('')
    const [getdescription,setdescription]=useState('')
    const [getpicture,setpicture]=useState({fileBytes:'',fileUrl:''})
    const [getsavepicture,setsavepicture]=useState(false)
    const [getsavead,setsavead]=useState(false)
    const [getad,setad]=useState({fileBytes:'',fileUrl:''})
    const [getadstatus,setadstatus]=useState('')
    const [gettopbrand,settopbrand]=useState('')
    const [getnewbrand,setnewbrand]=useState('')
    const [getMessage,setMessage] =useState('')
    const [geterrpic,seterrpic]=useState({ci:'tic.png',bn:'tic.png',de:'tic.png',pi:'tic.png',ad:'tic.png',as:'tic.png',tb:'tic.png',nb:'tic.png'})
    
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
    setsavepicture(true)
    }
    const ad=(event)=>{
    setad({fileBytes:(event.target.files[0]),fileUrl:URL.createObjectURL(event.target.files[0])})
    setsavead(true)
    }

    const handlesavepicture=async()=>{
      var formData =new FormData()

      formData.append('brandid',getbrandid)
      formData.append('picture',getpicture.fileBytes)
      const config = {headers:{'content-type':'multipart/form-data'}}
      var result =await postDataAndImage('brand/editpicture',formData,config)
      setOpen(false)
      fetchData()
    }
    
    const handlesavead=async()=>{
      var formData = new FormData()

      formData.append('brandid',getbrandid)
      formData.append('ad',getad.fileBytes)
      const config ={headers:{'content-type':'multipart/form-data'}}
      var result = await postDataAndImage('brand/editad',formData,config) 
      setOpen(false)
      fetchData()
    }

    const submit=async()=>{
      
    //   var error = false
    //   var ci = isEmpty(getcategoryid)
    //   var bn = isEmpty(getbrandname)
    //   var de = isEmpty(getdescription)
    //   var pi = isEmpty(getpicture.fileBytes)
    //   var ad = isEmpty(getad.fileBytes)
    //   var as = isEmpty(getadstatus)
    //   var tb = isEmpty(gettopbrand)
    //   var nb = isEmpty(getnewbrand)
      

    //   if(ci.err)
    //   {
    //     error= ci.err
    //   }
    //   if(bn.err)
    //   {
    //     error=bn.err
    //   }
    //   if(de.err)
    //   {
    //     error=de.err
    //   }
    //   if(pi.err)
    //   {
    //     error=pi.err
    //   }
    //   if(ad.err)
    //   {
    //     error=ad.err
    //   }
    //   if(as.err)
    //   {
    //     error=as.err
    //   }
    //   if(tb.err)
    //   {
    //     error=tb.err
    //   }
    //   if(nb.err)
    //   {
    //     error=nb.err
    //   }

    //  seterrpic({ci:ci.img,bn:bn.img,de:de.img,pi:pi.img,ad:ad.img,as:as.img,tb:tb.img,nb:nb.img})
    


    // if(!error)
    // {
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
    // }
    // else
    // {
    //   alert('fill the all entries')
    // }

    var body = {brandid:getbrandid,categoryid:getcategoryid,brandname:getbrandname,description:getdescription,adstatus:getadstatus,topbrand:gettopbrand,newbrand:getnewbrand}
    var result=await postData('brand/updatebrand',body)
    fetchData()
    setOpen(false)
  }




    const [data, setData] = useState([]);

    const [columns, setColumns] = useState([
      { title: 'CategoryID', field: 'categoryid' },
      { title: 'Brnadname', field :'brandname'},
      { title: 'Description', field: 'description'},
      {title:'Picture', field:'picture',render: rowData => <img src={`${ServerURL}/images/${rowData.picture}`} style={{width: 50,height:50, borderRadius: '3%'}}/>},
      {title:'Ad', field:'ad',render: rowData => <img src={`${ServerURL}/images/${rowData.ad}`} style={{width: 50, height:50, borderRadius: '3%'}}/>},
      {title:'Ad Status', field:'adstatus'},
      {title:'Topbrand',field:'topbrand'},
      {title:'Newbrand',field:'newbrand'}
    ]);

    const [getList,setList]=useState([])
            const [open, setOpen] = React.useState(false);
            const theme = useTheme();
            const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

            const handleClickOpen = () => {
              setOpen(true);
            };

            const handleClose = () => {
              setOpen(false);
            };





    const fetchData = async()=>{

        var result =await getData('brand/displaybrand')
        setData(result)
    }


    const fetchCategory=async()=>{
      var result=await getData('category/fetchallcategory')
      setList(result)
      
      }
    
      const categoryItems=()=>{
        return(
                
              getList.map((item,index)=>{
                return(   
                          <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
                      ) })     
                    
            )
        }
    
    
     const  handleDelete=async(olddata)=>{
      var body ={brandid:olddata.brandid}
      var result = await postData('brand/deletebrand',body)
      alert(result.RESULT)
     }

     const  handelEdit=(rowData)=>{
        setbrandid(rowData.brandid)
        setcategoryid(rowData.categoryid)
        setbrandname(rowData.brandname)
        setdescription(rowData.description)
        setadstatus(rowData.adstatus)
        settopbrand(rowData.topbrand)
        setnewbrand(rowData.newbrand)
        setpicture({fileBytes:'',fileUrl:`${ServerURL}/images/${rowData.picture}`})
        setsavepicture(false)
        setad({fileBytes:'',fileUrl:`${ServerURL}/images/${rowData.ad}`})
        setsavead(false)

        EditContent(rowData)
        setOpen(true)
     }

     function EditContent(rowData){
      return(<Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Edit Brand"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Grid container spacing={3} style={{marginTop:'-50px'}}>
        <Grid item xs={12}>
        <h3>{getMessage}</h3>
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
          <Grid item xs={12}>
          <img src={`${geterrpic.bn}`} width='13' height='13'/>
          <TextField value={getbrandname} id="outlined-basic" label="Brand Name" variant="outlined" fullWidth  onChange={(event)=>brandname(event)}/>          
          </Grid>
          <Grid item xs={12}>
          <img src={`${geterrpic.de}`} width='13' height='13'/>
          <TextField  value={getdescription} id="outlined-basic" label="Description" variant="outlined" fullWidth onChange={(event)=>description(event)} />         
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

        <Grid xs={12} style={{marginTop:-20}}>
        <Button variant="contained" color="primary" style={{ marginTop:20, width:370,marginLeft:98,color:'white',background:'purple'}} onClick={()=>submit()}>EDIT</Button>    
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
            <div style={{display:'flex',flexDirection:'column'}}>
            <div style={{padding:'3px',}}>
           <label htmlFor="pi">
           <img src={`${geterrpic.pi}`} width='13' height='13'/>
            <Button variant="contained" color="primary" component="span">
            Picture
            </Button>
           </label>
            </div>
            <div style={{padding:'3px',marginLeft:'20px',width:'20%'}}>
           {getsavepicture?<Button onClick={handlesavepicture} variant="contained" color="primary" autoFocus>
            Save
          </Button>:<div></div>}
            </div>
            </div>
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
            <div style={{display:'flex',flexDirection:'column'}}>
            <div style={{padding:'3px',}}>
           <label htmlFor="ad">
           <img src={geterrpic.ad} width='13' height='13'/>
            <Button variant="contained" color="primary" component="span">
            Ad
            </Button>
            <div style={{padding:'3px',marginLeft:'20%'}}></div>
            <div style={{marginLeft:'10px',width:'30%'}}>
            {getsavead?<Button  onClick={handlesavead} variant="contained" color="primary" autoFocus>
            Save
          </Button>:<div></div>}
           </div>
           </label>
           </div>
           </div>
          </Grid>
          <Grid item xs={3}>
          <img src={getad.fileUrl} width='90px' height='90px'/>
          </Grid>


        </Grid>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
         <Button onClick={handleClose} color="primary" autoFocus>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      )
     }
   
   
     function Editable() {

      useEffect(function(){
        fetchCategory()
        fetchData()
       },[])
         return (<div classes={classes.maindiv}>
           <div className={classes.subdiv}>
          <MaterialTable
            title="Brand"
            columns={columns}
            data={data}

            actions={[
              {
                icon: 'edit',
                tooltip: 'edit',
                onClick: (event, rowData) => {
                handelEdit(rowData)
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
          </div>
        )
      }
      




    return (<div>
        {Editable()}
        {EditContent()}
        </div>)
}