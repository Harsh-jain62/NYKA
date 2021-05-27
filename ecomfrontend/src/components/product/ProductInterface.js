import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import {postData,ServerURL,getData,postDataAndImage} from '../FetchNodeServices';
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

export default function ProductInterface(props)
{
    const classes = useStyles();
    const[getCategory,setCategory]=useState([]);
    const[getBrand,setBrand]=useState([]);
    const[getModel,setModel]=useState([]);
    const[getCategoryId,setCategoryId]=useState('');
    const[getBrandId,setBrandId]=useState('');
    const[getModelId,setModelId]=useState('');
    const[getProductName,setProductName]=useState('');
    const[getProductDescription,setProductDescription]=useState('');
    const[getProductPrice,setProductPrice]=useState('');
    const[getProductPicture,setProductPicture]=useState({fileBytes:'',fileUrl:'/noimage.png'});
    const[getOfferPrice,setOfferPrice]=useState('');
    const[getDelivery,setDelivery]=useState('');
    const[getRatings,setRatings]=useState('');
    const[getColor,setColor]=useState('');
    const[getProductAd,setProductAd]=useState({fileBytes:'',fileUrl:'/noimage.png'});
    const[getAdStatus,setAdStatus]=useState('');
    const[getOfferType,setOfferType]=useState('');
    const[getStock,setStock]=useState('');
    const[getMessage,setMessage]=useState();
    const[getErrorPic,setErrorPic]=useState({ci:'',bi:'',mi:'',pn:'',pd:'',pp:'',pic:'',op:'',del:'',pr:'',pc:'',pa:'',pas:'',ot:'',ps:''})
   
    
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
      fetchCategory()
      fetchBrand()
      fetchModel()
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
        
            }
            const handleAd=(event)=>{
              setProductAd({fileBytes:event.target.files[0],fileUrl:URL.createObjectURL(event.target.files[0])})
          
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
        if(pic.err)
        {
           error=pic.err
          
        }
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
       if(pa.err)
        {
           error=pa.err
          
        }
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
      
       setErrorPic({ci:ci.img,bi:bi.img,mi:mi.img,pn:pn.img,pd:pd.img,pp:pp.img,pic:pic.img,op:op.img,del:del.img,pr:pr.img,pc:pc.img,pa:pa.img,pas:pas.img,ot:ot.img,ps:ps.img})
       
        if(!error)
        {
             
       
        var formData=new FormData()
        formData.append('categoryid',getCategoryId)
        formData.append('brandid',getBrandId)
        formData.append('modelid',getModelId)
        formData.append('productname',getProductName)
        formData.append('description',getProductDescription)
        formData.append('price',getProductPrice)
        formData.append('picture',getProductPicture.fileBytes)
        formData.append('offerprice',getOfferPrice)
        formData.append('delivery',getDelivery)
        formData.append('ratings',getRatings)
        formData.append('color',getColor)
        formData.append('ad',getProductAd.fileBytes)
        formData.append('adstatus',getAdStatus)
        formData.append('offertype',getOfferType)
        formData.append('stock',getStock)

        const config={headers:{'content-type':'multipart/form-data'}}
        var result= await postDataAndImage('product/productsubmit',formData,config)
                
         
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
             <h3>Product Interface</h3>
            </div>
           <Grid container spacing={2}>
           <Grid item xs={12} sm={4}>
                   <img src={`/${getErrorPic.ci}`} width='10' height='10'/>
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
                  <img src={`/${getErrorPic.mi}`}width='10' height='10' />
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
                  <TextField  label="Product Name" variant="outlined" fullWidth onChange={(event)=>setProductName(event.target.value)} />
                </Grid>
                <Grid item xs={12}>
                <img src={`/${getErrorPic.pd}`}  width='10' height='10'/>
                  <TextField  label="Product Description" variant="outlined" fullWidth onChange={(event)=>setProductDescription(event.target.value)} />
                </Grid>
                <Grid item xs={12}>
                <img src={`/${getErrorPic.pp}`}  width='10' height='10'/>
                  <TextField  label="Product Price" variant="outlined" fullWidth onChange={(event)=>setProductPrice(event.target.value)} />
                </Grid>
                <Grid item xs={12} sm={6}>
                <img src={`/${getErrorPic.pic}`}  width='10' height='10'/>
                  <input accept="image/*" className={classes.input} multiple id="picture" type="file"  onChange={(event)=>handlePicture(event)} />
                   <label htmlFor="picture">
                   <Button variant="contained" color="primary" component="span">
                    Upload Picture
                    </Button>
                    </label>
                </Grid>
            
                <Grid style={{ display:'flex',justifyContent:'center'}} item xs={12} sm={6}>
                  <img src={getProductPicture.fileUrl}  className={classes.large} />
                  </Grid>
                
                  <Grid item xs={12} sm={4}>
                <img src={`/${getErrorPic.op}`} width='10' height='10' width='10' height='10' />
                  <TextField  label="Offer Price" variant="outlined" fullWidth onChange={(event)=>setOfferPrice(event.target.value)} />
                </Grid>

                <Grid item xs={12} sm={4}>
                <img src={`/${getErrorPic.del}`} width='10' height='10' />
                  <TextField  label="Delivery" variant="outlined" fullWidth onChange={(event)=>setDelivery(event.target.value)} />
                </Grid>
                <Grid item xs={12} sm={4}>
                <img src={`/${getErrorPic.pr}`} width='10' height='10' />
                  <TextField  label="Product Ratings" variant="outlined" fullWidth onChange={(event)=>setRatings(event.target.value)} />
                </Grid>

                <Grid item xs={12}>
                <img src={`/${getErrorPic.pc}`} width='10' height='10' />
                  <TextField  label="Product Color" variant="outlined" fullWidth onChange={(event)=>setColor(event.target.value)} />
                </Grid>   
                <Grid item xs={12} sm={6}>
                 <img src={`/${getErrorPic.pa}`} width='10' height='10' />
                  <input accept="image/*" className={classes.input} multiple id="ad" type="file" onChange={(event)=>handleAd(event)} />
                  <label htmlFor="ad">
                  <Button variant="contained" color="primary" component="span">
                    Upload Ad
                    </Button>
                  </label>
                 </Grid>
            
               <Grid style={{ display:'flex',justifyContent:'center'}} item xs={12} sm={6}>
                <img src={getProductAd.fileUrl} className={classes.large} />
                  </Grid> 

                   <Grid item xs={12} sm={4}>
            <img src={`/${getErrorPic.pas}`}  width='10' height='10'/>
              <FormControl variant="outlined" fullWidth >
               <InputLabel>Ad Status</InputLabel>
                 <Select value={getAdStatus}  onChange={(event)=>setAdStatus(event.target.value)}  
                 label="Ad Status" >
         
                  <MenuItem value={'No'}>No</MenuItem>
                  <MenuItem value={'Yes'}>Yes</MenuItem>
         
                  </Select>
            </FormControl>
           </Grid>   
           
           <Grid item xs={12} sm={4}>
                <img src={`/${getErrorPic.ot}`} width='10' height='10' />
                  <TextField  label="Offer Type" variant="outlined" fullWidth onChange={(event)=>setOfferType(event.target.value)} />
                </Grid>

                
                  <Grid item xs={12} sm={4}>
                <img src={`/${getErrorPic.ps}`} width='10' height='10' />
                  <TextField  label="Product Stock" variant="outlined" fullWidth onChange={(event)=>setStock(event.target.value)} />
                </Grid>           

           
           <Grid style={{ display:'flex',justifyContent:'center'}} item xs={12} sm={6}>
           <Button variant="contained" color="primary" onClick={()=>handleSubmit()} >
               Submit
                   </Button>
                  </Grid>

                  <Grid style={{ display:'flex',justifyContent:'center'}} item xs={12} sm={6}>
                  <Button variant="contained" color="primary">
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