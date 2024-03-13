const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const logger = require("./utils/logger");
const mongoose = require("mongoose");
const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");
const {
  errorHandler,
  unknownEndpoint,
  logTraffic,
  tokenExtractor,
} = require("./utils/middleware");

mongoose.set("strictQuery", true);

logger.info("connecting to", config.MONGODB_URI);

const connectMongoose = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    logger.info("Connected!");
  } catch (e) {
    logger.error("Error while connecting to mongo", e.message);
  }
};

connectMongoose();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(tokenExtractor);
app.use(logTraffic);

app.use("/api/blogs", blogRouter);
app.use("/api/users", userRouter);
app.use("/api/login", loginRouter);

app.use(errorHandler);
app.use(unknownEndpoint);

module.exports = { app };
