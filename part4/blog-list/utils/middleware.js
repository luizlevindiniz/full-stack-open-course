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

const errorHandler = (error, req, res, next) => {
  logger.error(error);

  if (error.name === "CastError") {
    return res.status(400).json({ message: "Malformatted id" });
  } else if (error.name === "ValidationError") {
    return res.status(400).json({ message: "Validation Error" });
  }
  next(error);
};

module.exports = { errorHandler, unknownEndpoint, logTraffic };
