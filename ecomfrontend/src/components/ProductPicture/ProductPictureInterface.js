import React, { useState, useEffect, useRef, createRef } from "react";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";
import Grid from "@material-ui/core/Grid";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";
import DropzoneComponent from "react-dropzone-component";
import {
  postData,
  ServerURL,
  getData,
  postDataAndImage,
} from "../FetchNodeServices";
import { isEmpty } from "../Checks";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
  },
  maindiv: {
    display: "flex",
    flexDirection: "column",
    alignContent: "center",
    justifyContent: "center",
    padding: 20,
    marginTop: 30,
    width: 600,

    border: "2px solid #7f8c8d",
    borderRadius: "2%",
  },
  headingdiv: {
    display: "flex",
    width: "auto",
    padding: 3,
    border: "1 solid #000000",
  },
  input: {
    display: "none",
  },
  large: {
    width: 70,
    height: 70,
    margin: 5,
  },
}));

export default function ProductPictureInterface(props) {
  const classes = useStyles();
  const [getCategory, setCategory] = useState([]);
  const [getProducts, setProducts] = useState([]);
  const [getBrand, setBrand] = useState([]);
  const [getModel, setModel] = useState([]);
  const [getCategoryId, setCategoryId] = useState("");
  const [getBrandId, setBrandId] = useState("");
  const [getModelId, setModelId] = useState("");
  const [getProductId, setProductId] = useState("");
  const [getProductDescription, setProductDescription] = useState("");

  const [getMessage, setMessage] = useState();
  const [getErrorPic, setErrorPic] = useState({
    ci: "tp.png",
    bi: "tp.png",
    mi: "tp.png",
    pi: "tp.png",
    pd: "tp.png",
  });
  var dref = createRef();
  var djsConfig = {
    addRemoveLinks: true,
    acceptedFiles: "image/jpeg,image/png,image/gif",
    autoProcessQueue: false,
    uploadMultiple: true,
  };

  var componentConfig = {
    iconFiletypes: [".jpg", ".png", ".gif"],
    showFiletypeIcon: true,
    postUrl: `${ServerURL}/productpicture/dummy`,
  };
  const handleCategory = (event) => {
    setCategoryId(event.target.value);
    fetchBrand(event.target.value);
  };

  const handleBrand = (event) => {
    setBrandId(event.target.value);
    fetchModel(event.target.value);
  };
  const handleModel = (event) => {
    setModelId(event.target.value);
    fetchProduct(event.target.value);
  };
  const fetchCategory = async () => {
    var result = await getData("category/fetchallcategory");
    setCategory(result);
  };

  const fetchBrand = async (data) => {
    var body = { categoryid: data };
    var result = await postData("brand/fetchbrands", body);
    setBrand(result);
  };

  const fetchModel = async (brandid) => {
    var body = { brandid: brandid };
    var result = await postData("model/fetchmodels", body);
    setModel(result);
  };
  const fetchProduct = async (modelid) => {
    var body = { modelid: modelid };
    var result = await postData("product/fetchproductbymodel", body);
    setProducts(result);
  };
  useEffect(function () {
    fetchCategory();
    fetchBrand();
    fetchModel();
  }, []);

  const categoryItems = () => {
    return getCategory
      ? getCategory.map((item, index) => {
          return (
            <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
          );
        })
      : null;
  };

  const brandItems = () => {
    return getBrand.map((item, index) => {
      return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>;
    });
  };

  const modelItems = () => {
    return getModel.map((item, index) => {
      return <MenuItem value={item.modelid}>{item.modelname}</MenuItem>;
    });
  };

  const productItems = () => {
    return getProducts.map((item, index) => {
      return <MenuItem value={item.productid}>{item.productname}</MenuItem>;
    });
  };

  const handleSubmit = async () => {
    var error = false;
    var ci = isEmpty(getCategoryId);
    var bi = isEmpty(getBrandId);
    var mi = isEmpty(getModelId);
    var pi = isEmpty(getProductId);

    var pd = isEmpty(getProductDescription);

    if (ci.err) {
      error = ci.err;
    }
    if (bi.err) {
      error = bi.err;
    }
    if (mi.err) {
      error = mi.err;
    }

    if (pd.err) {
      error = pd.err;
    }
    if (pi.err) {
      error = pi.err;
    }

    setErrorPic({
      ci: ci.img,
      bi: bi.img,
      mi: mi.img,
      pi: pi.img,
      pd: pd.img,
    });

    if (!error) {
      var formData = new FormData();
      formData.append("categoryid", getCategoryId);
      formData.append("brandid", getBrandId);
      formData.append("modelid", getModelId);
      formData.append("productid", getProductId);
      formData.append("description", getProductDescription);
      dref.current.state.files.map((file, index) => {
        formData.append("pictures" + index, file);
      });
      const config = { headers: { "content-type": "multipart/form-data" } };
      var result = await postDataAndImage(
        "productpicture/addproductpicture",
        formData,
        config
      );

      if (result) {
        setMessage("Record Submitted...");
      } else {
        setMessage("Record not submitted...");
      }
    } else {
      alert("Please fill the blank entry..");
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.maindiv}>
        <div className={classes.headingdiv}>
          <h3>Product Interface</h3>
        </div>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <img src={`/${getErrorPic.ci}`} />
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Category Id</InputLabel>
              <Select
                value={getCategoryId}
                onChange={(event) => handleCategory(event)}
                label="Category Id"
              >
                {categoryItems()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <img src={`/${getErrorPic.bi}`} />
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Brand Id</InputLabel>
              <Select
                value={getBrandId}
                onChange={(event) => handleBrand(event)}
                label="Brand Id"
              >
                {brandItems()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={4}>
            <img src={`/${getErrorPic.mi}`} />
            <FormControl variant="outlined" fullWidth>
              <InputLabel>Model Id</InputLabel>
              <Select
                value={getModelId}
                onChange={(event) => handleModel(event)}
                label="Model Id"
              >
                {modelItems()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <img src={`/${getErrorPic.pi}`} />
            <FormControl variant="outlined" fullWidth>
              <InputLabel>ProductId Id</InputLabel>
              <Select
                value={getProductId}
                onChange={(event) => setProductId(event.target.value)}
                label="Product Id"
              >
                {productItems()}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12}>
            <img src={`/${getErrorPic.pd}`} />
            <TextField
              label="Product Description"
              variant="outlined"
              fullWidth
              onChange={(event) => setProductDescription(event.target.value)}
            />
          </Grid>
          <Grid item xs={12}>
            <DropzoneComponent
              ref={dref}
              config={componentConfig}
              djsConfig={djsConfig}
            />
          </Grid>
          <Grid
            style={{ display: "flex", justifyContent: "center" }}
            item
            xs={12}
            sm={6}
          >
            <Button
              variant="contained"
              color="primary"
              onClick={() => handleSubmit()}
            >
              Submit
            </Button>
          </Grid>

          <Grid
            style={{ display: "flex", justifyContent: "center" }}
            item
            xs={12}
            sm={6}
          >
            <Button variant="contained" color="primary">
              Reset
            </Button>
          </Grid>
        </Grid>
        <div
          style={{
            width: 600,
            padding: 10,
            display: "flex",
            justifyContent: "center",
            alignContent: "center",
          }}
        >
          <b>{getMessage}</b>
        </div>
      </div>
    </div>
  );
}
