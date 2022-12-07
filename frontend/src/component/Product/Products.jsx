import React, { Fragment, useEffect, useState } from "react";
import "./Products.css";
import Loader from "../layout/Loader/Loader";
import ProductCard from "../Home/ProductCard";
import Pagination from "react-js-pagination";
import Slider from "@material-ui/core/Slider";
import Typography from "@material-ui/core/Typography";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import axios from "axios";
import { useParams } from "react-router-dom";

const categories = [
  "Laptop",
  "SmartPhones",
  "Camera",
  "Watch",
  "Headphone",
  "Mobile Cover",
  "Fans",
  "Fridge",
  "Footwear",
  "Bottom",
  "Tops",
  "Attire",
  "Book",
  "Food",
  "Trimmer",
  "Electronic Device",
  "Home Appliances",
  "Cosmetic",
  "Goggle",
];

const Products = () => {
  const alert = useAlert();
  const { keyword } = useParams();

  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 25000]);
  const [category, setCategory] = useState(
    keyword !== undefined ? keyword : null
  );
  const [ratings, setRatings] = useState(0);

  const [loading, setLoading] = useState(true);
  const [productData, setProductData] = useState({});

  console.log(category);

  useEffect(() => {
    const getProduct = async () => {
      try {
        let result = {};
        if (category) {
          result = await axios.get(`/api/v1/products?category=${category}`);
        } else {
          result = await axios.get(`/api/v1/products?page=${currentPage}`);
        }

        const { data } = result;

        setProductData({
          products: data.products,
          productsCount: data.productsCount,
          resultPerPage: data.resultPerPage,
          filteredProductsCount: data.filteredProductsCount,
        });
        setLoading(false);
      } catch (error) {
        alert.error(error);
        setProductData(null);
        setLoading(false);
      }
    };

    getProduct();
  }, [category,currentPage,alert]);

  let count = 0;
  if (productData) count = productData.filteredProductsCount;

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title="PRODUCTS -- NISHOSHOP" />
          <h2 className="productsHeading">Products</h2>
          <div className="products">
            {productData.products.length>0 ? (
              productData.products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))
            ) : (
              <h2 style={{marginTop:"100px",fontFamily:"Roboto",color:"rgba(95, 94, 94, 0.267)",letterSpacing:"2px"}}>Opps! Product Not Found.</h2>
            )}
          </div>
          <div className="filterBox">
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={(event, newPrice) => {
                setPrice(newPrice);
              }}
              valueLabelDisplay="auto"
              aria-labelledby="range-slider"
              min={0}
              max={25000}
            />
            <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <fieldset>
              <Typography component="legend"> Ratings Above</Typography>
              <Slider
                value={ratings}
                onChange={(e, newRating) => {
                  setRatings(newRating);
                }}
                aria-labelledby="continuous-slider"
                min={0}
                max={5}
                valueLabelDisplay="auto"
              />
            </fieldset>
          </div>
          {productData.resultPerPage < count && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={productData.resultPerPage}
                totalItemsCount={productData.productsCount}
                onChange={(pageNo) => {
                  setCurrentPage(pageNo);
                }}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default Products;
