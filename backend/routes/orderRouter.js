const express = require("express");
const {
  createOrder,
  getMyOrders,
  getOrder,
  updateOrder,
} = require("../controllers/orderController");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.route("/").post(protect, createOrder).get(protect, getMyOrders);
router.route("/:id").get(protect, getOrder).put(protect, updateOrder);

module.exports = router;
