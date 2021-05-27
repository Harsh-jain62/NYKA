import React,{useEffect, useState} from 'react';
import {ServerURL,getData, postData,postDataAndImage} from '../FetchNodeServices';
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
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {isEmpty} from '../Checks'

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

export default function ProductDisplay(props)
{
    const [data, setData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const[getCategory,setCategory]=useState([]);
    const[getBrand,setBrand]=useState([]);
    const[getModel,setModel]=useState([]);
    const[getProductId,setProductId]=useState('');
    const[getCategoryId,setCategoryId]=useState('');
    const[getBrandId,setBrandId]=useState('');
    const[getModelId,setModelId]=useState('');
    const[getProductName,setProductName]=useState('');
    const[getProductDescription,setProductDescription]=useState('');
    const[getProductPrice,setProductPrice]=useState('');
    const[getProductPicture,setProductPicture]=useState({fileBytes:'',fileUrl:'/nm.jpg'});
    const[getOfferPrice,setOfferPrice]=useState('');
    const[getDelivery,setDelivery]=useState('');
    const[getRatings,setRatings]=useState('');
    const[getColor,setColor]=useState('');
    const[getProductAd,setProductAd]=useState({fileBytes:'',fileUrl:'/nm.jpg'});
    const[getAdStatus,setAdStatus]=useState('');
    const[getOfferType,setOfferType]=useState('');
    const[getStock,setStock]=useState('');
    const[getBtnSavePicture,setBtnSavePicture]=useState(false);
    const[getBtnSaveAd,setBtnSaveAd]=useState(false);
    const[getErrorPic,setErrorPic]=useState({ci:'',bi:'',mi:'',pn:'',pd:'',pp:'',pic:'',op:'',del:'',pr:'',pc:'',pa:'',pas:'',ot:'',ps:''})
    
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));
    const classes = useStyles();

    const [columns, setColumns] = useState([
        // { title: 'Product Id', field: 'productid' },
        // { title: 'Category Id', field: 'categoryid' },
        // { title: 'Brand Id', field: 'brandid' },
        // { title: 'Model Id', field: 'modelid' },
        { title: 'Product Name', field: 'productname' },
        { title: 'Description', field: 'description' },
        { title: 'Price', field: 'price' },
        { title: 'Picture', field: 'picture', render: rowData => <img src={`${ServerURL}/images/${rowData.picture}`} style={{width: 50, height:50, borderRadius: '5%'}}/> },
        { title: 'Offer Price', field: 'offerprice' },
        { title: 'Delivery/Ratings', render:rowData=><div><div>{rowData.delivery}</div> <div>{rowData.ratings}</div></div> },
      
        { title: 'Color', field: 'color' },
        { title: 'Ad', field: 'ad',render: rowData => <img src={`${ServerURL}/images/${rowData.ad}`} style={{width: 50, height:50, borderRadius: '5%'}}/> },
        { title: 'AdStatus', field: 'adstatus' },
        { title: 'Offer Type', field: 'offertype' },
        { title: 'Stock', field: 'stock' },
      ]);

   
    
      const handleClose = () => {
        setOpen(false);
      };
    
    const fetchData=async()=>{
        var result=await getData('product/fetchallproduct')
        setData(result)
    }

    const handleCategory=(event)=>{
        setCategoryId(event.target.value);
        fetchBrand(event.target.value);
       
       }
      
       const handleBrand=(event)=>{
        setBrandId(event.target.value);
        fetchModel(event.target.value);
       
       }
  
      const fetchCategory=async()=>{
        var result=await getData('category/fetchallcategory')
        setCategory(result)
       }
  
       const fetchBrand=async(data)=>{
        var body={categoryid:data}
        var result=await postData('brand/fetchbrands',body)
             setBrand(result)
             
       }
       
       const fetchModel=async(brandid)=>{
        var body={brandid:brandid}
        var result=await postData('model/fetchmodels',body)
             setModel(result)
             
       }

     
  
       useEffect(function(){
        fetchData()
        fetchCategory()
       // fetchBrand()
       // fetchModel()
         },[])
         
      
         const categoryItems=()=>{
          return(
           
                  getCategory? getCategory.map((item,index)=>{
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
  
            const modelItems=()=>{
              return(
               
                       getModel.map((item,index)=>{
                           return(
                                <MenuItem value={item.modelid}>{item.modelname}</MenuItem>
                          )
                       })
                  
              )
              }

    const handlePicture=(event)=>{
        setProductPicture({fileBytes:event.target.files[0],fileUrl:URL.createObjectURL(event.target.files[0])})
        setBtnSavePicture(true)
      }
      const handleAd=(event)=>{
        setProductAd({fileBytes:event.target.files[0],fileUrl:URL.createObjectURL(event.target.files[0])})
        setBtnSaveAd(true)
        }

        const handleSavePicture=async()=>{
          var formData=new FormData()
       
        formData.append('picture',getProductPicture.fileBytes)
        formData.append('productid',getProductId)
      

        const config={headers:{'content-type':'multipart/form-data'}}
        var result= await postDataAndImage('product/editproductpicture',formData,config)
        alert(result)
        fetchData()
        setOpen(false)
        }

        const handleSaveAd=async()=>{
          var formData=new FormData()
       
        formData.append('ad',getProductAd.fileBytes)
        formData.append('productid',getProductId)
      

        const config={headers:{'content-type':'multipart/form-data'}}
        var result= await postDataAndImage('product/editproductad',formData,config)
        fetchData()
        setOpen(false)

        }

        const handleSubmit=async()=>{
            var error=false
        var ci=isEmpty(getCategoryId)
        var bi=isEmpty(getBrandId)
        var mi=isEmpty(getModelId)
        var pn=isEmpty(getProductName)
        var pd=isEmpty(getProductDescription)
        var pp=isEmpty(getProductPrice)
        var pic=isEmpty(getProductPicture.fileBytes)
        var op=isEmpty(getOfferPrice)
        var del=isEmpty(getDelivery)
        var pr=isEmpty(getRatings)
        var pc=isEmpty(getColor)
        var pa=isEmpty(getProductAd.fileBytes)
        var pas=isEmpty(getAdStatus)
        var ot=isEmpty(getOfferType)
        var ps=isEmpty(getStock)
       
        if(ci.err)
        {
           error=ci.err
          
        }
        if(bi.err)
        {
           error=bi.err
          
        }
        if(mi.err)
        {
           error=mi.err
          
        }
        if(pn.err)
        {
           error=pn.err
           
        }
        if(pd.err)
        {
           error=pd.err
          
        }
        if(pp.err)
        {
           error=pp.err
          
        }
        // if(pic.err)
        // {
        //    error=pic.err
          
        // }
        if(op.err)
        {
           error=op.err
          
        }
        if(del.err)
        {
           error=del.err
          
        }
        if(pr.err)
        {
           error=pr.err
          
        }
        if(pc.err)
        {
           error=pc.err
          
        }
      //  if(pa.err)
      //   {
      //      error=pa.err
          
      //   }
        if(pas.err)
        {
           error=pas.err
          
        }
        if(ot.err)
        {
           error=ot.err
          
        }
        if(ps.err)
        {
           error=ps.err
          
        }
      
       setErrorPic({ci:ci.img,bi:bi.img,mi:mi.img,pn:pn.img,pd:pd.img,pp:pp.img,pic:'',op:op.img,del:del.img,pr:pr.img,pc:pc.img,pa:'',pas:pas.img,ot:ot.img,ps:ps.img})
       
             
  
        if(!error)
        {
          
                var body={categoryid:getCategoryId,brandid:getBrandId,modelid:getModelId,productname:getProductName,description:getProductDescription,price:getProductPrice,offerprice:getOfferPrice,delivery:getDelivery,ratings:getRatings,color:getColor,adstatus:getAdStatus,offertype:getOfferType,stock:getStock,productid:getProductId}
                 var result=await postData('product/updateproduct',body)                 
                 fetchData()
                 setOpen(false)
      }
      else{
        alert("Hello")
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
        <DialogTitle id="responsive-dialog-title">{"Edit Product"}</DialogTitle>
        <DialogContent>
          <DialogContentText>
          <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
                   <img src={`/${getErrorPic.ci}`}  width='10' height='10'/>
                   <FormControl variant="outlined" fullWidth >
                  <InputLabel >Category Id</InputLabel>
                 <Select value={getCategoryId}  onChange={(event)=>handleCategory(event)}  
                 label="Category Id" >
                           {categoryItems()}
                  </Select>
            </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                  <img src={`/${getErrorPic.bi}`} width='10' height='10' />
                  <FormControl variant="outlined" fullWidth >
                  <InputLabel >Brand Id</InputLabel>
                 <Select value={getBrandId}  onChange={(event)=>handleBrand(event)}  
                 label="Brand Id" >
                           {brandItems()}
                  </Select>
                </FormControl>
                  </Grid>

                  <Grid item xs={12} sm={4}>
                  <img src={`/${getErrorPic.mi}`}  width='10' height='10'/>
                  <FormControl variant="outlined" fullWidth >
                  <InputLabel >Model Id</InputLabel>
                 <Select value={getModelId}  onChange={(event)=>setModelId(event.target.value)}  
                 label="Model Id" >
                            {modelItems()}
                  </Select>
            </FormControl>
                  </Grid>
                
                <Grid item xs={12}>
                <img src={`/${getErrorPic.pn}`}  width='10' height='10'/>
                  <TextField value={getProductName}  label="Product Name" variant="outlined" fullWidth onChange={(event)=>setProductName(event.target.value)} />
                </Grid>
                <Grid item xs={12}>
                <img src={`/${getErrorPic.pd}`}width='10' height='10' />
                  <TextField value={getProductDescription}  label="Product Description" variant="outlined" fullWidth onChange={(event)=>setProductDescription(event.target.value)} />
                </Grid>
                <Grid item xs={12}  sm={4}>
                <img src={`/${getErrorPic.pp}`} width='10' height='10'/>
                  <TextField value={getProductPrice}  label="Product Price" variant="outlined" fullWidth onChange={(event)=>setProductPrice(event.target.value)} />
                </Grid>

                  <Grid item xs={12} sm={4}>
                <img src={`/${getErrorPic.op}`} width='10' height='10'/>
                  <TextField value={getOfferPrice}  label="Offer Price" variant="outlined" fullWidth onChange={(event)=>setOfferPrice(event.target.value)} />
                </Grid>

                <Grid item xs={12} sm={4}>
                <img src={`/${getErrorPic.del}`} width='10' height='10'/>
                  <TextField value={getDelivery}  label="Delivery" variant="outlined" fullWidth onChange={(event)=>setDelivery(event.target.value)} />
                </Grid>

                <Grid item xs={12} sm={4}>
                <img src={`/${getErrorPic.pr}`}width='10' height='10' />
                  <TextField value={getRatings}  label="Product Ratings" variant="outlined" fullWidth onChange={(event)=>setRatings(event.target.value)} />
                </Grid>

                <Grid item xs={12}  sm={4}>
                <img src={`/${getErrorPic.pc}`} width='10' height='10'/>
                  <TextField value={getColor}   label="Product Color" variant="outlined" fullWidth onChange={(event)=>setColor(event.target.value)} />
                </Grid>   

               <Grid item xs={12} sm={4}>
                <img src={`/${getErrorPic.pas}`} width='10' height='10'/>
              <FormControl variant="outlined" fullWidth >
               <InputLabel>Ad Status</InputLabel>
                 <Select value={getAdStatus}  onChange={(event)=>setAdStatus(event.target.value)}  
                 label="Ad Status" >
         
                  <MenuItem value={'No'}>No</MenuItem>
                  <MenuItem value={'Yes'}>Yes</MenuItem>
         
                  </Select>
            </FormControl>
           </Grid>   
           
           <Grid item xs={12} sm={6}>
                <img src={`/${getErrorPic.ot}`}width='10' height='10' />
                  <TextField  value={getOfferType} label="Offer Type" variant="outlined" fullWidth onChange={(event)=>setOfferType(event.target.value)} />
                </Grid>

                
                  <Grid item xs={12} sm={6}>
                <img src={`/${getErrorPic.ps}`}width='10' height='10' />
                  <TextField value={getStock}  label="Product Stock" variant="outlined" fullWidth onChange={(event)=>setStock(event.target.value)} />
                </Grid>           



           <Grid style={{ display:'flex'}} item xs={12}>
           <Button variant="contained" color="primary" onClick={()=>handleSubmit()} >
              Edit Data
                   </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <Divider/>
                    </Grid>
             
                  <Grid item xs={12} sm={6}>
                  <img src={`/${getErrorPic.pic}`}width='10' height='10' />
                  <input accept="image/*" className={classes.input} multiple id="picture" type="file"  onChange={(event)=>handlePicture(event)} />
                  <div style={{display:'flex',flexDirection:'row'}}>
                    <div style={{padding:3}}>
                    <label htmlFor="picture">
                   <Button variant="contained" color="primary" component="span">
                      Change Picture
                    </Button>
                    </label>
                    </div>
                    <div style={{padding:3}}>
                    {getBtnSavePicture?<Button onClick={handleSavePicture} color="primary" variant="contained" autoFocus>
                        Save Picture </Button>:<div></div>}
                    </div>
                    </div>
                </Grid>
            
                <Grid style={{ display:'flex',justifyContent:'center'}} item xs={12} sm={6}>
                  <img src={getProductPicture.fileUrl}  className={classes.large} />
                  </Grid>
                  <Grid item xs={12}>
                    <Divider/>
                    </Grid>
                  <Grid item xs={12} sm={6}>
                  <img src={`/${getErrorPic.pa}`}width='10' height='10' />
                  <input accept="image/*" className={classes.input} multiple id="ad" type="file" onChange={(event)=>handleAd(event)} />
                  <div style={{display:'flex',flexDirection:'row'}}>
                    <div style={{padding:3}}>
                  <label htmlFor="ad">
                  <Button variant="contained" color="primary" component="span">
                    Change Ad
                    </Button>
                  </label>
                  </div>
               
                 <div style={{padding:3}}>
                 {getBtnSaveAd?<Button onClick={handleSaveAd} color="primary" variant="contained" autoFocus>
                        Save Ad </Button>:<div></div>}
                    </div>
                 </div>
                 </Grid>

               <Grid style={{ display:'flex',justifyContent:'center'}} item xs={12} sm={6}>
                <img src={getProductAd.fileUrl} className={classes.large} />
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
      

      setProductId(rowData.productid)
      setCategoryId(rowData.categoryid)
      fetchBrand(rowData.categoryid)

      setBrandId(rowData.brandid)
      fetchModel(rowData.brandid)
      setModelId(rowData.modelid)
      setProductName(rowData.productname)
      setProductDescription(rowData.description)
      setProductPrice(rowData.price)
      setOfferPrice(rowData.offerprice)
      setDelivery(rowData.delivery)
      setRatings(rowData.ratings)
      setColor(rowData.color)
      setAdStatus(rowData.adstatus)
      setOfferType(rowData.offertype)
      setStock(rowData.stock)
      setProductPicture({fileBytes:'',fileUrl:`${ServerURL}/images/${rowData.picture}`})
      setProductAd({fileBytes:'',fileUrl:`${ServerURL}/images/${rowData.ad}`})
      setBtnSavePicture(false)
      setBtnSaveAd(false)
      setOpen(true)
      
      setErrorPic({ci:'tic.png',bi:'tic.png',mi:'tic.png',pn:'tic.png',pd:'tic.png',pp:'tic.png',pic:'tic.png',op:'tic.png',del:'tic.png',pr:'tic.png',pc:'tic.png',pa:'tic.png',pas:'tic.png',ot:'tic.png',ps:'tic.png'})
    }

    const handleDelete=async(oldData)=>{
     
      var body={productid:oldData.productid}
      var result=await postData('product/productdelete',body)
     
    }

    function Editable() {
        

        return (
          <MaterialTable
            title="Product Register"
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