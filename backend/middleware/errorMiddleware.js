const {NODE_ENV} = require('../config/default.json') 

const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404).json({ success: false, msg: "404 Not found" });
  next(error);
}

const errorHandler = (err, req, res, next) => {
  const statusCode = req.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    msg: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack
  });
}

module.exports = { notFound, errorHandler }
