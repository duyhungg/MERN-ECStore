const User = require("../models/user");
const ErrorHandler = require("../utils/errorHandler");
const catchAsyncErrors = require("../middlewares/catchAsyncErrors");
const sendToken = require("../utils/jwtToken");
// dang ky user => api/v1/register
exports.registerUser = catchAsyncErrors(async (req, res, next) => {
  const { name, password, email } = req.body;
  const user = await User.create({
    name,
    password,
    email,
    avatar: {
      public_id: "1223",
      url: "456",
    },
  });
  sendToken(user, 200, res);
});
exports.loginUser = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  // Checks if email and password is entered by user
  if (!email || !password) {
    return next(new ErrorHandler("Please enter email & password", 400));
  }

  // Finding user in database
  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }

  // Checks if password is correct or not
  const isPasswordMatched = await user.comparePassword(password);
  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid Email or Password", 401));
  }
  sendToken(user, 200, res);
});
