import React, { Fragment, useEffect, useState } from "react";
import Helmet from "../layout/MetaData";
import { CgMouse } from "react-icons/all";
import "./Home.css";
import ProductCard from "./ProductCard.jsx";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import axios from "axios";
import Img1 from "../../images/1.jpg";
import Img2 from "../../images/2.jpg";
import Img3 from "../../images/3.jpg";
import Img4 from "../../images/4.jpg";

const options = {
  autoPlay: true,
  infiniteLoop: true,
  interval: 5000,
  showStatus: false,
  showThumbs: false,
  transitionTime: 1500,
  stopOnHover: false,
  
};

var Carousel = require("react-responsive-carousel").Carousel;

const Home = () => {
  const alert = useAlert();

  const [loading, setLoading] = useState(true);
  const [products, setProducts] = useState(null);

  useEffect(() => {
    const getProducts = async () => {
      try {
        const { data } = await axios.get("/api/v1/products?page=1");

        setLoading(false);
        setProducts(data.products);
      } catch (error) {
        setLoading(false);
        alert.error(error);
        setProducts(null);
      }
    };

    getProducts();
  }, [alert]);

  const bannersImg = [Img1, Img2, Img3, Img4];
  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="HomeContainer">
            <Helmet title="NISHO👜SHOPE" />
            <div className="banner">
              <p>Welcome to NishoShop</p>
              <h1>FIND AMAZING PRODUCTS BELOW</h1>

              <a href="#container">
                <button>
                  Scroll <CgMouse />
                </button>
              </a>
            </div>
            <div className="carousel">
              <Carousel {...options}>
                {bannersImg.map((Img) => (
                  <div key={Img}>
                    <img className="imgblock" src={Img} alt="temp" />
                  </div>
                ))}
              </Carousel>
            </div>
            <h2 className="homeHeading">Featured Product</h2>
            <div className="container" id="container">
              {products &&
                products.map((product, i) => (
                  <ProductCard product={product} key={i} />
                ))}
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default Home;
