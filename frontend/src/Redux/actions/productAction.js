import * as AllConst from "../constants/productConstants";
import axios from "axios";

// New Review
export const newReview = (reviewData) => async (dispatch) => {
  try {
    dispatch({ type: AllConst.NEW_REVIEW_REQUEST });

    const { data } = await axios.put("/api/v1/review", reviewData, {
      headers: { "Content-Type": "application/json" },
    });

    dispatch({ type: AllConst.NEW_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: AllConst.NEW_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Products  for  Admin
export const getAdminProducts = () => async (dispatch) => {
  try {
    dispatch({ type: AllConst.ADMIN_PRODUCT_REQUEST });

    const { data } = await axios.get("/api/v1/admin/products");

    dispatch({ type: AllConst.ADMIN_PRODUCT_SUCCESS, payload: data.products });
  } catch (error) {
    dispatch({
      type: AllConst.ADMIN_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Create New Product -- Admin
export const createNewProduct = (productData) => async (dispatch) => {
  try {
    dispatch({ type: AllConst.NEW_PRODUCT_REQUEST });

    const { data } = await axios.post(
      "/api/v1/admin/product/new",
      productData,
      { headers: { "Content-Type": "application/json" } }
    );

    dispatch({ type: AllConst.NEW_PRODUCT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: AllConst.NEW_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Single Product
export const getProductDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: AllConst.GET_PRODUCT_REQUEST });

    const { data } = await axios.get(`/api/v1/product/${id}`);

    dispatch({ type: AllConst.GET_PRODUCT_SUCCESS, payload: data.product });
  } catch (error) {
    dispatch({
      type: AllConst.GET_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Update Product -- Admin
export const updateProduct = (id, productData) => async (dispatch) => {
  try {
    dispatch({ type: AllConst.UPDATE_PRODUCT_REQUEST });

    const { data } = await axios.put(
      `/api/v1/admin/product/${id}`,
      productData,
      { headers: { "Content-Type": "application/json" } }
    );

    dispatch({ type: AllConst.UPDATE_PRODUCT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: AllConst.UPDATE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Delete Product -- Admin
export const deleteProduct = (id) => async (dispatch) => {
  try {
    dispatch({ type: AllConst.DELETE_PRODUCT_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/product/${id}`);

    dispatch({ type: AllConst.DELETE_PRODUCT_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: AllConst.DELETE_PRODUCT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Review of a Product -- Admin
export const getAllReviews = (productId) => async (dispatch) => {
  try {
    dispatch({ type: AllConst.ALL_REVIEWS_REQUEST });

    const { data } = await axios.get(`/api/v1/reviews?productId=${productId}`);

    dispatch({ type: AllConst.ALL_REVIEWS_SUCCESS, payload: data.reviews });
  } catch (error) {
    dispatch({
      type: AllConst.ALL_REVIEWS_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Get All Recommanded Products
export const getAllRecommandedProducts = (category) => async (dispatch) => {
  try {
    dispatch({ type: AllConst.GET_RECOMMANDED_PRODUCTS_REQUEST });

    const { data } = await axios.post(
      "/api/v1/products/recommanded",
      {category},
      { headers: { "Content-Type": "application/json" } }
    );

    dispatch({
      type: AllConst.GET_RECOMMANDED_PRODUCTS_SUCCESS,
      payload: data.products,
    });
  } catch (error) {
    dispatch({
      type: AllConst.GET_RECOMMANDED_PRODUCTS_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Delete Review of a Product -- Admin
export const deleteReview = (reviewId, productId) => async (dispatch) => {
  try {
    dispatch({ type: AllConst.DELETE_REVIEW_REQUEST });

    const { data } = await axios.delete(
      `/api/v1/reviews?reviewId=${reviewId}&productId=${productId}`
    );

    dispatch({ type: AllConst.DELETE_REVIEW_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: AllConst.DELETE_REVIEW_FAIL,
      payload: error.response.data.message,
    });
  }
};

export const clearErrors = () => (dispatch) => {
  dispatch({ type: AllConst.CLEAR_ERRORS });
};
