import React, { Fragment, useEffect, useState } from "react";
import "./ProductDetails.css";
import { useParams } from "react-router-dom";
import ReviewCard from "./ReviewCard.jsx";
import Loader from "../layout/Loader/Loader";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import { useAlert } from "react-alert";
import MetaData from "../layout/MetaData";
import axios from "axios";
import { addItemToCart } from "../../Redux/actions/cartAction";
import { useDispatch, useSelector } from "react-redux";
import {
  clearErrors,
  getAllRecommandedProducts,
  newReview,
} from "../../Redux/actions/productAction";
import ProductCard from "../Home/ProductCard";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@material-ui/core";
import { Rating } from "@material-ui/lab";
import { NEW_REVIEW_RESET } from "../../Redux/constants/productConstants";

const ProductDetails = () => {
  const alert = useAlert();
  const dispatch = useDispatch();
  const { id } = useParams();

  const [loading, setLoading] = useState(true);
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);

  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");

  const { success, error } = useSelector((state) => state.newReview);
  const { products, error: error2 } = useSelector(
    (state) => state.adminProducts
  );

  const addToCartHandler = () => {
    dispatch(addItemToCart(id, quantity));
    alert.success("Item Added To Cart");
  };

  const reviewSubmitHandler = () => {
    const myForm = new FormData();

    myForm.set("rating", rating);
    myForm.set("comment", comment);
    myForm.set("productId", id);

    dispatch(newReview(myForm));
    setOpen(false);
  };

  useEffect(() => {
    if (error) {
      alert.error(error);
      dispatch(clearErrors());
    }
    if (error2) {
      alert.error(error2);
      dispatch(clearErrors());
    }
    if (success) {
      alert.success("Review Submitted Successfully");
      dispatch({ type: NEW_REVIEW_RESET });
    }

    const getProductDetails = async (id) => {
      try {
        const { data } = await axios.get(`/api/v1/product/${id}`);
        setProduct(data.product);
        setRating(data.product.ratings);
        setLoading(false);
        dispatch(getAllRecommandedProducts(data.product.category));
      } catch (error) {
        setLoading(false);
        alert.error(error);
        setProduct(null);
      }
    };

    getProductDetails(id);
  }, [dispatch, id, alert, error, error2, success]);

  const CaroOption = {
    autoPlay: true,
    autoplaySpeed: 1000,
    autoFocus: true,
    infiniteLoop: true,
    interval: 4000,
    transitionTime: 1000,
    width: "50%",
    showStatus: false,
  };

  const options = {
    value: rating,
    readOnly: true,
    size: "large",
    precision: 0.5,
  };

  console.log(products);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <MetaData title={`${product.name} -- NISHOSHOP`} />

          <div className="productDetails">
            <div className="carouselBlock">
              <div className="caro">
                <Carousel {...CaroOption}>
                  {product.images &&
                    product.images.map((item, index) => (
                      <div key={index} className="imgBlock">
                        <img
                          className="CarouselImage"
                          key={item.url}
                          src={item.url}
                          alt={`${index} Slide`}
                        />
                      </div>
                    ))}
                </Carousel>
              </div>
            </div>

            <div className="block-2">
              <div className="detailsBlock-1">
                <h2>{product.name}</h2>
                <p>Product # {product._id}</p>
              </div>
              <div className="detailsBlock-2">
                <Rating {...options} />
                <span className="detailsBlock-2-span">
                  ({product.numOfReviews} Reviews)
                </span>
              </div>
              <div className="detailsBlock-3">
                <h1>{`₹${product.price}`}</h1>

                <div className="detailsBlock-3-1">
                  <div className="detailsBlock-3-1-1">
                    <button
                      onClick={() =>
                        quantity > 1 ? setQuantity((preQ) => preQ - 1) : ""
                      }
                    >
                      -
                    </button>
                    <input type="number" readOnly value={quantity} />
                    <button
                      onClick={() =>
                        product.stock > quantity
                          ? setQuantity((preQ) => preQ + 1)
                          : ""
                      }
                    >
                      +
                    </button>
                  </div>

                  <button
                    disabled={product.stock < 1 ? true : false}
                    onClick={addToCartHandler}
                  >
                    Add to Cart
                  </button>
                </div>

                <p>
                  Status:{"\t"}
                  <b className={product.stock < 1 ? "redColor" : "greenColor"}>
                    {product.stock < 1 ? "OutOfStock" : "InStock"}
                  </b>
                </p>
              </div>

              <div className="detailsBlock-4">
                Description : <p>{product.description}</p>
              </div>

              <button
                className="submitReview"
                onClick={() => setOpen((prevOpen) => !prevOpen)}
              >
                Submit Review
              </button>
            </div>
          </div>

          <h3 className="reviewsHeading">REVIEWS</h3>

          <Dialog aria-labelledby="simple-dialog-title" open={open}>
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
                precision={0.5}
              />
              <textarea
                className="submitDialogTextArea"
                cols="30"
                row="5"
                onChange={(e) => setComment(e.target.value)}
                value={comment}
              ></textarea>
            </DialogContent>
            <DialogActions>
              <Button
                onClick={() => setOpen((prevOpen) => !prevOpen)}
                color="secondary"
              >
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

          {product.reviews && product.reviews[0] ? (
            <div
              className={
                product.reviews.length === 1
                  ? "reviews addJustify"
                  : "reviews removeJustify"
              }
            >
              {product.reviews &&
                product.reviews.map((review, index) => (
                  <ReviewCard key={index} review={review} />
                ))}
            </div>
          ) : (
            <p className="noReviews">No Reviews Yet</p>
          )}

          {products.length>1 &&  (
            <div className="RecommandedProducts">
              <h2>Recommanded Products</h2>
              <div>
                {products
                  .filter((prod) => prod._id !== id)
                  .map((product, i) => (
                    <ProductCard product={product} key={i} />
                  ))}
              </div>
            </div>
          )}
        </Fragment>
      )}
    </Fragment>
  );
};

export default ProductDetails;
