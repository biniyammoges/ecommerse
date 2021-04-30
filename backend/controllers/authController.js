const fs = require("fs");
const path = require("path");
const User = require("../models/userModel");
const ErrorResponse = require("../utils/errorResponse");
const asyncHandler = require("../middlewares/asyncHandler");

// @desc register new user
// @route POST /api/v1/auth/register
// @access public
exports.register = asyncHandler(async (req, res, next) => {
  const { name, email, password } = req.body;

  if (await User.findOne({ email })) {
    return next(new ErrorResponse(`User already exist with ${email}`, 401));
  }

  const user = await User.create({ name, email, password });

  sendTokenResponse(user, 201, res);
});

// @desc login user
// @route POST /api/v1/auth/login
// @access public
exports.login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorResponse("Please provide in all fields"));
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorResponse("Invalid email or password", 401));
  }

  const isMatch = await user.matchPassword(password);

  if (!isMatch) {
    return next(new ErrorResponse("Invalid email or password"));
  }

  sendTokenResponse(user, 200, res);
});

// @desc logout user
// @route  GET /api/v1/auth/logout
// @access private
exports.logout = asyncHandler(async (req, res, next) => {
  res.cookie("token", "none", {
    expires: new Date(Date.now() + 10 * 1000),
    httpOnly: true,
  });

  res.status(200).json({
    data: {},
  });
});

// @desc get profile
// @route get /api/v1/user
// @access private
exports.getMe = asyncHandler(async (req, res, next) => {
  const user = req.user;

  res.status(200).json({
    data: user,
  });
});

// @desc Update profile
// @route PUT /api/v1/auth/me/update
// @access private
exports.updateMe = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  user.name = req.body.name || user.name;
  user.email = req.body.email || user.email;
  user.bio = req.body.bio || user.bio;
  user.website = req.body.website || user.website;
  user.username = req.body.username || user.username;
  user.gender = req.body.gender || user.gender;

  await user.save();

  res.status(200).json({
    data: user,
  });
});

// @desc Update password
// @route PUT /api/v1/auth/password
// @access private
exports.changePassword = asyncHandler(async (req, res, next) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword) {
    return next(
      new ErrorResponse(
        "Please provide both old password and new password",
        400
      )
    );
  }

  const user = await User.findById(req.user.id).select("+password");

  if (!(await user.matchPassword(oldPassword))) {
    return next(new ErrorResponse(`Password incorrect`, 400));
  }

  user.password = newPassword;

  await user.save();

  sendTokenResponse(user, 200, res);
});

// @desc Upload avatar
// @route PUT /api/v1/auth/me/avatar
// @access private
exports.uploadAvatar = asyncHandler(async (req, res, next) => {
  if (!req.files) {
    return next(new ErrorResponse(`Please upload a file`, 400));
  }

  const file = req.files.file;

  // Make sure the image is a photo
  if (!file.mimetype.startsWith("image")) {
    return next(new ErrorResponse(`Please upload an image file`, 400));
  }

  // Check filesize
  if (file.size > process.env.MAX_PHOTO_SIZE) {
    return next(
      new ErrorResponse(`Please upload an image less than 1 mb`, 400)
    );
  }

  // Create custom filename
  file.name = `avatar_${req.user._id}${path.parse(file.name).ext}`;

  file.mv(`${process.env.USER_FILE_PATH}/${file.name}`, async (err) => {
    if (err) {
      console.error(err);
      return next(new ErrorResponse(`Problem with file upload`, 500));
    }

    await User.findByIdAndUpdate(req.user._id, {
      avatar: `/uploads/users/${file.name}`,
    });

    res.status(200).json({
      success: true,
      data: `/uploads/${file.name}`,
    });
  });
});

exports.deleteAvatar = asyncHandler(async (req, res, next) => {
  const user = await User.findById(req.user.id);

  if (user.avatar === "no-image.png") {
    return next(new ErrorResponse(`No image to delete`, 400));
  }

  fs.unlinkSync(`${process.env.FILE_PATH}${user.avatar}`);

  // user.avatar = "no-image.png";

  await user.update(
    { avatar: "no-image.png" },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    success: true,
  });
});

const sendTokenResponse = (user, statusCode, res) => {
  const token = user.generateToken();

  const options = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };

  res.status(statusCode).cookie("token", token, options).json({
    token,
  });
};
