const express = require("express");
const {
  register,
  login,
  logout,
  getMe,
  updateMe,
  changePassword,
  uploadAvatar,
  deleteAvatar,
} = require("../controllers/authController");
const { protect } = require("../middlewares/auth");

const router = express.Router();

router.route("/register").post(register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/me").get(protect, getMe);
router.route("/password").put(protect, changePassword);
router.route("/me/update").put(protect, updateMe);
router.route("/me/avatar").put(protect, uploadAvatar);
router.route("/me/avatar/remove").put(protect, deleteAvatar);

module.exports = router;
