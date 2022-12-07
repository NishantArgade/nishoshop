import * as AllCONST from "../constants/orderConstants";
import axios from "axios";

// Create Order
export const createOrder = (order) => async (dispatch) => {
  try {
    dispatch({ type: AllCONST.CREATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.post("/api/v1/order/new", order, config);

    dispatch({ type: AllCONST.CREATE_ORDER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: AllCONST.CREATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// My Orders
export const myOrders = () => async (dispatch) => {
  try {
    dispatch({ type: AllCONST.MY_ORDER_REQUEST });

    const { data } = await axios.get("/api/v1/orders/me");

    dispatch({ type: AllCONST.MY_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: AllCONST.MY_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get All Orders -- Admin
export const getAllOrders = () => async (dispatch) => {
  try {
    dispatch({ type: AllCONST.ALL_ORDER_REQUEST });

    const { data } = await axios.get("/api/v1/admin/orders");

    dispatch({ type: AllCONST.ALL_ORDER_SUCCESS, payload: data.orders });
  } catch (error) {
    dispatch({
      type: AllCONST.ALL_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Order -- Admin
export const updateOrder = (id,orderData) => async (dispatch) => {
  try {
    dispatch({ type: AllCONST.UPDATE_ORDER_REQUEST });

    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    const { data } = await axios.put(`/api/v1/admin/order/${id}`, orderData, config);

    dispatch({ type: AllCONST.UPDATE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: AllCONST.UPDATE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Delete Order -- Admin
export const deleteOrder = (id) => async (dispatch) => {
  try {
    dispatch({ type: AllCONST.DELETE_ORDER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/order/${id}`);

    dispatch({ type: AllCONST.DELETE_ORDER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: AllCONST.DELETE_ORDER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Get Order Details
export const getOrderDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: AllCONST.ORDER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/order/${id}`);

    dispatch({ type: AllCONST.ORDER_DETAILS_SUCCESS, payload: data.order });
  } catch (error) {
    dispatch({
      type: AllCONST.ORDER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: AllCONST.CLEAR_ERRORS });
};
