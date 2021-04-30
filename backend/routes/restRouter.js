const express = require("express");
const {
  createRestaurant,
  getRestaurant,
  getRestaurants,
  updateRestaurant,
  deleteRestaurant,
} = require("../controllers/restController");
const { protect, authorize } = require("../middlewares/auth");

const router = express.Router();

router
  .route("/")
  .get(getRestaurants)
  .post(protect, authorize("admin"), createRestaurant);
router
  .route("/:id")
  .get(getRestaurant)
  .put(protect, authorize("admin"), updateRestaurant)
  .delete(protect, authorize("admin"), deleteRestaurant);

module.exports = router;
