const express = require("express");
const {
  getReviews,
  createReview,
  getReview,
  updateReview,
  deleteReview,
} = require("../controllers/reviewController");
const { protect } = require("../middlewares/auth");

const router = express.Router({ mergeParams: true });

router.route("/").get(getReviews).post(protect, createReview);
router
  .route("/:id")
  .get(getReview)
  .put(protect, updateReview)
  .delete(protect, deleteReview);

module.exports = router;
