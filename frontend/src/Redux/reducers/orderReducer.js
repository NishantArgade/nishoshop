import * as AllConst from "../constants/orderConstants";

export const newOrderReducer = (state = {}, action) => {
  switch (action.type) {
    case AllConst.CREATE_ORDER_REQUEST:
      return { ...state, loading: true };

    case AllConst.CREATE_ORDER_SUCCESS:
      return { loading: false, order: action.payload };

    case AllConst.CREATE_ORDER_FAIL:
      return { loading: false, error: action.payload };

    case AllConst.CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
export const myOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case AllConst.MY_ORDER_REQUEST:
      return { loading: true };

    case AllConst.MY_ORDER_SUCCESS:
      return { loading: false, orders: action.payload };

    case AllConst.MY_ORDER_FAIL:
      return { loading: false, error: action.payload };

    case AllConst.CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
export const allOrdersReducer = (state = { orders: [] }, action) => {
  switch (action.type) {
    case AllConst.ALL_ORDER_REQUEST:
      return {...state, loading: true };

    case AllConst.ALL_ORDER_SUCCESS:
      return {...state, loading: false, orders: action.payload };

    case AllConst.ALL_ORDER_FAIL:
      return {...state, loading: false, error: action.payload };

    case AllConst.CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
export const orderReducer = (state = {}, action) => {
  switch (action.type) {
    case AllConst.UPDATE_ORDER_REQUEST:
    case AllConst.DELETE_ORDER_REQUEST:
      return { ...state, loading: true };

    case AllConst.UPDATE_ORDER_SUCCESS:
      return { ...state, loading: false, isUpdated: action.payload };

    case AllConst.UPDATE_ORDER_RESET:
      return { ...state, isUpdated: false };

    case AllConst.DELETE_ORDER_SUCCESS:
      return { ...state, loading: false, isDeleted: action.payload };

    case AllConst.DELETE_ORDER_RESET:
      return { ...state, isDeleted: false };

    case AllConst.UPDATE_ORDER_FAIL:
    case AllConst.DELETE_ORDER_FAIL:
      return { ...state, loading: false, error: action.payload };

    case AllConst.CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
export const orderDetailsReducer = (state = { order: {} }, action) => {
  switch (action.type) {
    case AllConst.ORDER_DETAILS_REQUEST:
      return { loading: true };

    case AllConst.ORDER_DETAILS_SUCCESS:
      return { loading: false, order: action.payload };

    case AllConst.ORDER_DETAILS_FAIL:
      return { loading: false, error: action.payload };

    case AllConst.CLEAR_ERRORS:
      return { ...state, error: null };

    default:
      return state;
  }
};
