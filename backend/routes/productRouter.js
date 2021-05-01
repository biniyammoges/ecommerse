const express = require("express");
const { protect, authorize } = require("../middlewares/auth");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getTopRated,
  getRelatedProduct,
} = require("../controllers/productController");

// Include other routers
const reviewRouter = require("./reviewRouter");

const router = express.Router({ mergeParams: true });

// re-router
router.use("/review/:productId", reviewRouter);

router
  .route("/")
  .get(getProducts)
  .post(protect, authorize("admin"), createProduct);
router.route("/top").get(getTopRated);
router.route("/related/:id").get(getRelatedProduct);
router
  .route("/:id")
  .get(getProduct)
  .put(protect, authorize("admin"), updateProduct)
  .delete(protect, authorize("admin"), deleteProduct);

module.exports = router;
