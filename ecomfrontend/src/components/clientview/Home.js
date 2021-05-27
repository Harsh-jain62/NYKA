import React, { useEffect, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import GridList from "@material-ui/core/GridList";

import GridListTile from "@material-ui/core/GridListTile";
import MainPages from "./MainPages";

import { ServerURL, getData, postData } from "../FetchNodeServices";
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "space-around",

    backgroundColor: theme.palette.background.paper,
  },
  gridList: {
    width: "96%",
  },
  icon: {
    color: "rgba(255, 255, 255, 0.54)",
  },
}));

export default function Home(props) {
  const classes = useStyles();
  const [getBrand, setBrand] = useState([]);
  const [getTopBrand, setTopBrand] = useState([]);
  var settings = {
    dots: false,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
  };
  const fetchBrand = async () => {
    var result = await getData("brand/fetchbrandsads");
    setBrand(result);
  };

  const fetchTopBrand = async () => {
    var result = await getData("brand/fetchtopbrands");
    setTopBrand(result);
  };
  useEffect(function () {
    fetchBrand();
    fetchTopBrand();
  }, []);

  const sslider = () => {
    return getBrand.map((item, index) => {
      return (
        <div>
          <img src={ServerURL + "/images/" + item.ad} width="100%" />
        </div>
      );
    });
  };
  const TopProducts = () => {
    return (
      <div className={classes.root}>
        <GridList cellHeight={350} spacing={20} className={classes.gridList}>
          {getTopBrand.map((tile) => (
            <GridListTile key={tile.brandid}>
              <img
                src={ServerURL + "/images/" + tile.ad}
                width="100%"
                height="100%"
                style={{ borderRadius: "2%", elevation: 20 }}
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  };

  return (
    <div>
      <MainPages />

      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div style={{ width: "96%" }}>
          <Slider {...settings}>{sslider()}</Slider>
        </div>
      </div>
      <div
        style={{
          fontSize: 30,
          color: "#636e72",
          fontWeight: "normal",
          display: "flex",
          letterSpacing: "3.9px",
          fontFamily: 'Georgia,Times,"Times New Roman",serif',
          justifyContent: "center",
          padding: 10,
        }}
      >
        IN THE SPOTLIGHT
      </div>

      {TopProducts()}
    </div>
  );
}





