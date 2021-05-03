const asyncHandler = require("../middlewares/asyncHandler");
const Report = require("../models/reportModel");
const Product = require("../models/productMode");
const ErrorRespnse = require("../utils/errorResponse");

// @desc Get All reports
// @route GET /api/v1/reports
// @access private/admin
exports.getReports = asyncHandler(async (req, res, next) => {
  const reports = await Report.find({});

  res.status(200).json({
    count: reports.length,
    reports,
  });
});

// @desc add report
// @route POST /api/v1/reports
// @access public
exports.createReport = asyncHandler(async (req, res, next) => {
  req.body.user = req.user.id;

  const report = await Report.create(req.body);

  res.status(200).json({
    report,
  });
});

// @desc Get single report
// @route GET /api/v1/reports/:id
// @access public/admin
exports.getReport = asyncHandler(async (req, res, next) => {
  const report = await Report.findById(req.params.id);

  if (!report) {
    return next(new ErrorRespnse(`No report with id of ${req.params.id}`));
  }

  res.status(200).json({
    report,
  });
});
