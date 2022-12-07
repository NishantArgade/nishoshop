import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  allUsersReducer,
  forgotPasswordReducer,
  profileReducer,
  userDetailsReducer,
  userReducer,
} from "./reducers/userReducer";
import { cartReducer } from "./reducers/cartReducer";
import {
  allOrdersReducer,
  myOrdersReducer,
  newOrderReducer,
  orderDetailsReducer,
  orderReducer,
} from "./reducers/orderReducer";
import {
  adminProductReducer,
  getProductReducer,
  newReviewReducer,
  productsReducer,
  productReviewReducer,
  reviewReducer,
} from "./reducers/productReducer";

const reducer = combineReducers({
  user: userReducer,
  profile: profileReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducer,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,

  adminProducts: productsReducer,
  getProduct: getProductReducer,
  adminProduct: adminProductReducer,

  allOrders: allOrdersReducer,
  order: orderReducer,

  allUsers: allUsersReducer,
  userDetails: userDetailsReducer,

  productReviews:productReviewReducer,
  review:reviewReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const middleware = [thunk];

const Store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default Store;

// import { createStore, applyMiddleware } from "redux";
// import logger from "redux-logger";
// import thunk from "redux-thunk";
// import RootReducer from "./RootReducer";

// const middleware = [thunk];

// if (process.env.NODE_ENV === "development") {
//   middleware.push(logger);
// }

// const Store = createStore(RootReducer, applyMiddleware(...middleware));

// export default Store;
