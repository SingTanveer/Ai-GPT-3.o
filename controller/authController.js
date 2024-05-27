const errorHandler = require("../middleware/errorMiddleware");
const userModel = require("../models/userModel");
const errorResponse = require("../utils/errorResponse");

// JWT TOKEN
exports.sendToken = (user, statusCode, res) => {
  const token = user.getSignedToken();

  user.setRefreshTokenCookie(res, token.refreshToken);

  res.status(statusCode).json({
    success: true,
    token: token.accessToken,
  });

  // Set refresh token in a cookie
};

//REGISTER
exports.registerController = async (req, res, next) => {
  try {
    const { username, email, password } = req.body;
    // Check for existing user
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return next(new errorResponse("Email is already registered", 400));
    }
    const user = await userModel.create({ username, email, password });
    this.sendToken(user, 201, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//LOGIN
exports.loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    // Validate input
    if (!email || !password) {
      return next(new errorResponse("Please provide email and password"));
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      return next(new errorResponse("Invalid Credentials"));
    }
    const isMatch = await user.matchPassword(password);
    if (!isMatch) {
      return next(new errorResponse("Invalid Credentials"));
    }
    this.sendToken(user, 200, res);
  } catch (error) {
    console.log(error);
    next(error);
  }
};

//LOGOUT
exports.logoutController = async (req, res) => {
  res.clearCookie("refreshToken");
  return res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
};
