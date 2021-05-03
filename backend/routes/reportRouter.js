const express = require("express");
const { protect, authorize } = require("../middlewares/auth");
const {
  getReports,
  createReport,
  getReport,
} = require("../controllers/reportController");

const router = express.Router();

router
  .route("/")
  .get(protect, authorize("admin"), getReports)
  .post(protect, authorize("user"), createReport);
router.route("/:id").get(protect, authorize("admin"), getReport);

module.exports = router;
