const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");
const asyncHandler = require("express-async-handler");
const { jwtSecret } = require("../config/default.json");

const protect = asyncHandler(async (req, res, next) => {
  let token;

  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      token = req.headers.authorization.split(" ")[1];

      const decoded = jwt.verify(token, jwtSecret);
      req.user = await User.findById(decoded.id).select("-password")
    
      next();
      return;
    } catch(e) {
      res.status(401).json({ success: false, msg: "Not authorized, token failed " })
      return
    }
  }
  if (!token) {
    res.status(401).json({ success: false, msg: "Not authorized, token failed " })
  }
});

module.exports = protect;
