const express = require("express");
const { protect, authorize } = require("../middlewares/auth");
const {
  createProduct,
  getProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  getTopRated,
} = require("../controllers/productController");

const router = express.Router();

router
  .route("/")
  .get(getProducts)
  .post(protect, authorize("admin"), createProduct);
router.route("/top").get(getTopRated);
router
  .route("/:id")
  .get(getProduct)
  .put(protect, authorize("admin"), updateProduct)
  .delete(protect, authorize("admin"), deleteProduct);

module.exports = router;
