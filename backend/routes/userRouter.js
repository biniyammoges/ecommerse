const express = require("express");
// const { getMe } = require("../controllers/userController");
const { protect } = require("../middlewares/auth");

const router = express.Router();

// router.route("/").get(protect, getMe);

module.exports = router;
