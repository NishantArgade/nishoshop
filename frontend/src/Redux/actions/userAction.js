import * as AllConst from "../constants/userConstants";
import axios from "axios";

// Login action (when dispatch directly envoke reducer action)
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: AllConst.LOGIN_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(
      `/api/v1/login`,
      { email, password },
      config
    );

    dispatch({ type: AllConst.LOGIN_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: AllConst.LOGIN_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Register action
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: AllConst.REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.post(`/api/v1/register`, userData, config);

    dispatch({ type: AllConst.REGISTER_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: AllConst.REGISTER_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Load user action
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: AllConst.LOAD_USER_REQUEST });

    const { data } = await axios.get(`/api/v1/me`);

    dispatch({ type: AllConst.LOAD_USER_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: AllConst.LOAD_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Logout user action
export const logout = () => async (dispatch) => {
  try {
    await axios.get("/api/v1/logout");

    dispatch({ type: AllConst.LOGOUT_SUCCESS });
  } catch (error) {
    dispatch({
      type: AllConst.LOGOUT_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Profile action
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: AllConst.UPDATE_PROFILE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    const { data } = await axios.put(`/api/v1/me/update`, userData, config);

    dispatch({ type: AllConst.UPDATE_PROFILE_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: AllConst.UPDATE_PROFILE_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update Password action
export const updatePassword = (passwordData) => async (dispatch) => {
  try {
    dispatch({ type: AllConst.UPDATE_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/password/update`,
      passwordData,
      config
    );

    dispatch({ type: AllConst.UPDATE_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: AllConst.UPDATE_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Forgot Password action
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: AllConst.FORGOT_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.post(`/api/v1/password/forgot`, email, config);

    dispatch({ type: AllConst.FORGOT_PASSWORD_SUCCESS, payload: data.message });
  } catch (error) {
    dispatch({
      type: AllConst.FORGOT_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Reset Password action
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: AllConst.RESET_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      config
    );

    dispatch({ type: AllConst.RESET_PASSWORD_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: AllConst.RESET_PASSWORD_FAIL,
      payload: error.response.data.message,
    });
  }
};

// get All users -- Admin
export const getAllUsers = () => async (dispatch) => {
  try {
    dispatch({ type: AllConst.ALL_USERS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/users`);

    dispatch({ type: AllConst.ALL_USERS_SUCCESS, payload: data.users });
  } catch (error) {
    dispatch({
      type: AllConst.ALL_USERS_FAIL,
      payload: error.response.data.message,
    });
  }
};
// get user Details -- Admin
export const getUserDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: AllConst.USER_DETAILS_REQUEST });

    const { data } = await axios.get(`/api/v1/admin/user/${id}`);

    dispatch({ type: AllConst.USER_DETAILS_SUCCESS, payload: data.user });
  } catch (error) {
    dispatch({
      type: AllConst.USER_DETAILS_FAIL,
      payload: error.response.data.message,
    });
  }
};

// Update User -- Admin
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: AllConst.UPDATE_USER_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    const { data } = await axios.put(
      `/api/v1/admin/user/${id}`,
      userData,
      config
    );

    dispatch({ type: AllConst.UPDATE_USER_SUCCESS, payload: data.success });
  } catch (error) {
    dispatch({
      type: AllConst.UPDATE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
// Delete User -- Admin
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: AllConst.DELETE_USER_REQUEST });

    const { data } = await axios.delete(`/api/v1/admin/user/${id}`);

    dispatch({ type: AllConst.DELETE_USER_SUCCESS, payload: data });
  } catch (error) {
    dispatch({
      type: AllConst.DELETE_USER_FAIL,
      payload: error.response.data.message,
    });
  }
};
//Clearing Errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: AllConst.CLEAR_ERRORS });
};
