const express = require("express");
require("express-async-errors");
const app = express();
const cors = require("cors");
const config = require("./utils/config");
const notesRouter = require("./controllers/notes");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");
const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

logger.info("connecting to", config.MONGODB_URI);

const connectToMongo = async () => {
  try {
    await mongoose.connect(config.MONGODB_URI);
    logger.info("connected to MongoDB");
  } catch (error) {
    logger.error("error connecting to MongoDB:", error.message);
  }
};
connectToMongo();

app.use(cors());
app.use(express.static("dist"));
app.use(express.json());
app.use(middleware.requestLogger);

app.use("/api/notes", notesRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
