const { User } = require("../models/user");
const jwt = require("jsonwebtoken");
const logger = require("./logger");

const logTraffic = (req, res, next) => {
  logger.info(`Method: ${req.method}`);
  logger.info("Path:  ", req.path);
  logger.info("Body:  ", req.body);
  logger.info("---");

  next();
};

const unknownEndpoint = (req, res) => {
  return res.status(404).json({ message: "Unknown endpoint" });
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.replace("Bearer ", "");
  }
  next();
};

const userExtractor = async (request, response, next) => {
  const token = request.token;
  const validatedToken = jwt.verify(token, process.env.SECRET);

  if (validatedToken && token) {
    request.user = await User.findById(validatedToken.userId);
  }

  next();
};

const errorHandler = (error, req, res, next) => {
  logger.error(error);

  if (error.name === "CastError") {
    return res.status(400).json({ message: "Malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ message: "Validation Error" });
  } else if (
    error.name === "MongoServerError" &&
    error.message.includes("E11000 duplicate key error")
  ) {
    return res.status(400).json({ error: "expected `username` to be unique" });
  } else if (error.name === "JsonWebTokenError") {
    return res.status(400).json({ error: "token missing or invalid" });
  } else if (error.name === "TokenExpiredError") {
    return res.status(401).json({
      error: "token expired",
    });
  }
  next(error);
};

module.exports = {
  errorHandler,
  unknownEndpoint,
  logTraffic,
  tokenExtractor,
  userExtractor,
};
