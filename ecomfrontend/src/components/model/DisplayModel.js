import React,{useEffect, useState} from 'react';
import {ServerURL,getData, postData,postDataAndImage} from '../FetchNodeServices';
import MaterialTable from 'material-table';
import { makeStyles } from '@material-ui/core/styles';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {isEmpty} from '../Checks';

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
     marginTop:30,
     width:800,
     
    
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

export default function DisplayModel(props)
{
    const [data, setData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const[getList,setList]=useState([]);
    //const[getCategory,setCategory]=useState([]);
    
    const[getBrand,setBrand]=useState([]);
    const[getCategoryId,setCategoryId]=useState('');
    const[getModelId,setModelId]=useState('');
    const[getBrandId,setBrandId]=useState('');
    const[getModelName,setModelName]=useState('');
    const[getModelDescription,setModelDescription]=useState('');
    const[getErrorPic,setErrorPic]=useState({bi:'',mn:'',md:'',ci:''})
  
    
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();

    const [columns, setColumns] = useState([
        
        { title: 'Model Id', field: 'modelid' },
        { title: 'Brand Id', field: 'brandid' },
        { title: 'Model Name', field: 'modelname' },
        { title: 'Description', field: 'description' },
       
      ]);

   
    
      const handleClose = () => {
        setOpen(false);
      };
    
    const fetchData=async()=>{
        var result=await getData('model/fetchallmodel')
        setData(result)
    }

    const handleCategory=(event)=>{
      setCategoryId(event.target.value);
      fetchBrand(event.target.value);
     }


    const fetchCategory=async()=>{
      var result=await getData('category/fetchallcategory')
      setList(result)
     }

     const fetchBrand=async(data)=>{
      var body={categoryid:data}
      var result=await postData('brand/fetchbrands',body)
           setBrand(result)
     }

     const fetchCategoryByBrand=async(brandid)=>{
      var body={brandid:brandid}
      var result=await postData('brand/fetchcategorybybrand',body)
          // setCategory(result[0])
          await fetchBrand(result[0].categoryid)
           await setCategoryId(result[0].categoryid)
     }

     useEffect(function(){
      fetchData()
      fetchCategory()
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
          
            var body={modelid:getModelId,brandid:getBrandId,modelname:getModelName,description:getModelDescription}
            var result=await postData('model/updatemodel',body)
                 
                 fetchData()
                 setOpen(false)
      }
      
      }  

    const showEditContent=()=>{
      return(
        <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{"Edit Model"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Grid container spacing={2}>
          
          <Grid item xs={12} sm={6}>
                   <img src={`/${getErrorPic.ci}`} width='10' height='10' />
                   <FormControl variant="outlined" fullWidth >
                  <InputLabel >Category </InputLabel>
                 <Select value={getCategoryId}  onChange={(event)=>handleCategory(event)}  
                 label="Category Id" >
                           {categoryItems()}
                  </Select>
            </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={6}>
                  <img src={`/${getErrorPic.bi}`}  width='10' height='10'/>
                  <FormControl variant="outlined" fullWidth >
                  <InputLabel >Brand Id</InputLabel>
                 <Select value={getBrandId}  onChange={(event)=>setBrandId(event.target.value)}  
                 label="Brand Id" >
                           {brandItems()}
                  </Select>
            </FormControl>
                  </Grid>
                            
                            
                <Grid item xs={12}>
                <img src={`/${getErrorPic.mn}`} width='10' height='10' />
                  <TextField value={getModelName} label="Model Name" variant="outlined" fullWidth onChange={(event)=>setModelName(event.target.value)} />
                </Grid>
                <Grid item xs={12}>
                <img src={`/${getErrorPic.mn}`}  width='10' height='10'/>
                  <TextField value={getModelDescription} label="Model Description" variant="outlined" fullWidth onChange={(event)=>setModelDescription(event.target.value)} />
                </Grid>
            

           <Grid style={{ display:'flex'}} item xs={12}>
           <Button variant="contained" color="primary" onClick={()=>handleSubmit()} >
              Edit Data
                   </Button>
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

    const handleEdit=async(rowData)=>{
        fetchCategoryByBrand(rowData.brandid)
      
        setModelId(rowData.modelid)
        setBrandId(rowData.brandid)
        setModelName(rowData.modelname)
        setModelDescription(rowData.description)
       setOpen(true)
       setErrorPic({bi:'tic.png',mn:'tic.png',md:'tic.png'})
      
    }

    const handleDelete=async(oldData)=>{
     
      var body={modelid:oldData.modelid}
      var result=await postData('model/modeldelete',body)
      //alert(result.Result)

    }

    function Editable() {
        

        return (
          <MaterialTable
            title="Model Register"
            columns={columns}
            data={data}
           
            actions={[
              {
                icon:'edit',
                tooltip:'Edit',
                onClick:(event,rowData)=>{
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
                    handleDelete(oldData);
                    resolve()
                  }, 1000)
                }),
            }}
            options={{
                rowStyle: {
                  backgroundColor: '#EEE',
                }
              }}
          />
        )
      }

return(
<div className={classes.root}>
<div className={classes.subdiv}>
{Editable()}
{showEditContent()}
</div>
</div>
)


}