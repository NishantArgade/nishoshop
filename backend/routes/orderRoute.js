const express = require("express");
const router = express.Router();
const { isAuthenticateUser, autorizeRoles } = require("../middleware/auth");
const {
  newOrder,
  getSingleOrder,
  myOrders,
  getAllOrders,
  updateOrder,
  deleteOrder,
} = require("../controllers/orderController");

router.route("/order/new").post(isAuthenticateUser, newOrder);

router.route("/orders/me").get(isAuthenticateUser, myOrders);

router
  .route("/admin/orders")
  .get(isAuthenticateUser, autorizeRoles("admin"), getAllOrders);

router
  .route("/admin/order/:id")
  .get(isAuthenticateUser, autorizeRoles("admin"), getSingleOrder)
  .put(isAuthenticateUser, autorizeRoles("admin"), updateOrder)
  .delete(isAuthenticateUser, autorizeRoles("admin"), deleteOrder);

module.exports = router;
