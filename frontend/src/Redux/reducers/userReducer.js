import * as AllConst from "../constants/userConstants";

export const userReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case AllConst.LOGIN_REQUEST:
    case AllConst.REGISTER_USER_REQUEST:
    case AllConst.LOAD_USER_REQUEST:
      return {
        loading: true,
        isAuthenticated: false,
      };
    case AllConst.LOGIN_SUCCESS:
    case AllConst.REGISTER_USER_SUCCESS:
    case AllConst.LOAD_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isAuthenticated: true,
        user: action.payload,
      };

    case AllConst.LOGOUT_SUCCESS:
      return {
        loading: false,
        user: null,
        isAuthenticated: false,
      };

    case AllConst.LOGOUT_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };

    case AllConst.LOGIN_FAIL:
    case AllConst.REGISTER_USER_FAIL:
      return {
        ...state,
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };
    case AllConst.LOAD_USER_FAIL:
      return {
        loading: false,
        isAuthenticated: false,
        user: null,
        error: action.payload,
      };

    case AllConst.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const profileReducer = (state = {}, action) => {
  switch (action.type) {
    case AllConst.UPDATE_PROFILE_REQUEST:
    case AllConst.UPDATE_PASSWORD_REQUEST:
    case AllConst.UPDATE_USER_REQUEST:
    case AllConst.DELETE_USER_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AllConst.UPDATE_PROFILE_SUCCESS:
    case AllConst.UPDATE_PASSWORD_SUCCESS:
    case AllConst.UPDATE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isUpdated: action.payload,
      };
    case AllConst.DELETE_USER_SUCCESS:
      return {
        ...state,
        loading: false,
        isDeleted: action.payload.success,
        message: action.payload.message,
      };
    case AllConst.UPDATE_PROFILE_FAIL:
    case AllConst.UPDATE_PASSWORD_FAIL:
    case AllConst.UPDATE_USER_FAIL:
    case AllConst.DELETE_USER_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case AllConst.UPDATE_PROFILE_RESET:
    case AllConst.UPDATE_PASSWORD_RESET:
    case AllConst.UPDATE_USER_RESET:
      return {
        ...state,
        isUpdated: false,
      };

    case AllConst.DELETE_USER_RESET:
      return {
        ...state,
        isDeleted: false,
      };
    case AllConst.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};

export const forgotPasswordReducer = (state = {}, action) => {
  switch (action.type) {
    case AllConst.FORGOT_PASSWORD_REQUEST:
    case AllConst.RESET_PASSWORD_REQUEST:
      return {
        ...state,
        loading: true,
        error: null,
      };
    case AllConst.FORGOT_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        message: action.payload,
      };
    case AllConst.RESET_PASSWORD_SUCCESS:
      return {
        ...state,
        loading: false,
        success: action.payload,
      };
    case AllConst.FORGOT_PASSWORD_FAIL:
    case AllConst.RESET_PASSWORD_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case AllConst.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const allUsersReducer = (state = { users: [] }, action) => {
  switch (action.type) {
    case AllConst.ALL_USERS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AllConst.ALL_USERS_SUCCESS:
      return {
        ...state,
        loading: false,
        users: action.payload,
      };

    case AllConst.ALL_USERS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
      
    case AllConst.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
export const userDetailsReducer = (state = { user: {} }, action) => {
  switch (action.type) {
    case AllConst.USER_DETAILS_REQUEST:
      return {
        ...state,
        loading: true,
      };
    case AllConst.USER_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        user: action.payload,
      };

    case AllConst.USER_DETAILS_FAIL:
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    case AllConst.CLEAR_ERRORS:
      return {
        ...state,
        error: null,
      };

    default:
      return state;
  }
};
