const express = require("express");
const router = express.Router();
const {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductDetails,
  createProductReview,
  getProductReviews,
  deleteReview,
  getAdminProducts,
  getRecommandedProducts,
} = require("../controllers/productController");
const { isAuthenticateUser, autorizeRoles } = require("../middleware/auth");

router.route("/products").get(getAllProducts);

router
  .route("/admin/products")
  .get(isAuthenticateUser, autorizeRoles("admin"), getAdminProducts);

router
  .route("/admin/product/new")
  .post(isAuthenticateUser, autorizeRoles("admin"), createProduct);

router
  .route("/admin/product/:id")
  .put(isAuthenticateUser, autorizeRoles("admin"), updateProduct)
  .delete(isAuthenticateUser, autorizeRoles("admin"), deleteProduct);

router.route("/product/:id").get(getProductDetails);

router.route("/products/recommanded").post(getRecommandedProducts);

router.route("/review").put(isAuthenticateUser, createProductReview);

router
  .route("/reviews")
  .get(getProductReviews)
  .delete(isAuthenticateUser, deleteReview);

module.exports = router;
