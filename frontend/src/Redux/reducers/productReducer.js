import * as AllConst from "../constants/productConstants";

export const newReviewReducer = (state = {}, action) => {
  switch (action.type) {
    case AllConst.NEW_REVIEW_REQUEST:
      return { ...state, loading: true };

    case AllConst.NEW_REVIEW_SUCCESS:
      return { loading: false, success: action.payload };

    case AllConst.NEW_REVIEW_FAIL:
      return { ...state, loading: false, error: action.payload };

    case AllConst.NEW_REVIEW_RESET:
      return { loading: false, success: false };

    case AllConst.CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const productsReducer = (state = { products: [] }, action) => {
  switch (action.type) {
    case AllConst.ADMIN_PRODUCT_REQUEST:
    case AllConst.GET_RECOMMANDED_PRODUCTS_REQUEST:
      return { loading: true, products: [] };

    case AllConst.ADMIN_PRODUCT_SUCCESS:
    case AllConst.GET_RECOMMANDED_PRODUCTS_SUCCESS:
      return { loading: false, products: action.payload };

    case AllConst.ADMIN_PRODUCT_FAIL:
    case AllConst.GET_RECOMMANDED_PRODUCTS_FAIL:
      return { loading: false, error: action.payload };

    case AllConst.CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const getProductReducer = (state = { product: {} }, action) => {
  switch (action.type) {
    case AllConst.GET_PRODUCT_REQUEST:
      return { loading: true };

    case AllConst.GET_PRODUCT_SUCCESS:
      return {
        loading: false,
        product: action.payload,
      };

    case AllConst.GET_PRODUCT_FAIL:
      return { loading: false, error: action.payload };

    case AllConst.CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const adminProductReducer = (state = {}, action) => {
  switch (action.type) {
    case AllConst.NEW_PRODUCT_REQUEST:
    case AllConst.UPDATE_PRODUCT_REQUEST:
    case AllConst.DELETE_PRODUCT_REQUEST:
      return { ...state, loading: true };

    case AllConst.NEW_PRODUCT_SUCCESS:
      return {
        loading: false,
        isCreated: action.payload,
      };
    case AllConst.NEW_PRODUCT_RESET:
      return { ...state, isCreated: false };

    case AllConst.UPDATE_PRODUCT_SUCCESS:
      return {
        loading: false,
        isUpdated: action.payload,
      };
    case AllConst.UPDATE_PRODUCT_RESET:
      return { ...state, isUpdated: false };

    case AllConst.DELETE_PRODUCT_SUCCESS:
      return {
        loading: false,
        isDeleted: action.payload,
      };
    case AllConst.DELETE_PRODUCT_RESET:
      return { ...state, isDeleted: false };

    case AllConst.NEW_PRODUCT_FAIL:
    case AllConst.UPDATE_PRODUCT_FAIL:
    case AllConst.DELETE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };

    case AllConst.CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const productReviewReducer = (state = { reviews: [] }, action) => {
  switch (action.type) {
    case AllConst.ALL_REVIEWS_REQUEST:
      return { ...state, loading: true };

    case AllConst.ALL_REVIEWS_SUCCESS:
      return { loading: false, reviews: action.payload };

    case AllConst.ALL_REVIEWS_FAIL:
      return { ...state, loading: false, error: action.payload };

    case AllConst.CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};

export const reviewReducer = (state = {}, action) => {
  switch (action.type) {
    case AllConst.DELETE_REVIEW_REQUEST:
      return { ...state, loading: true };

    case AllConst.DELETE_REVIEW_SUCCESS:
      return { loading: false, isDeleted: action.payload };

    case AllConst.DELETE_REVIEW_RESET:
      return { ...state, loading: false, isDeleted: false };

    case AllConst.DELETE_PRODUCT_FAIL:
      return { loading: false, error: action.payload };

    case AllConst.CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
