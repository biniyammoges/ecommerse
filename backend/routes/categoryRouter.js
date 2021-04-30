const express = require("express");
const { protect, authorize } = require("../middlewares/auth");
const {
  getCategory,
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
} = require("../controllers/categoryController");

// include other router
const productRouter = require("../routes/productRouter");

const router = express.Router();

// Re-route into other resource routers
router.use("/:categoryId/products", productRouter);

router
  .route("/")
  .get(getCategories)
  .post(protect, authorize("admin"), createCategory);
router
  .route("/:id")
  .get(getCategory)
  .put(protect, authorize("admin"), updateCategory)
  .delete(protect, authorize("admin"), deleteCategory);

module.exports = router;
