const express = require("express");
const mongoose = require("mongoose");

const logger = require("./utils/logger");
const config = require("./utils/config");

const userRouter = require("./controllers/user");

const app = express();

mongoose
  .connect(config.MONGODB_URI, { family: 4 })
  .then(() => {
    logger.info("Connected to MongoDB");
  })
  .catch((error) => {
    logger.error("Error connecting to MongoDB", error.message);
  });

app.use(express.json());
app.use("/api/user", userRouter);

module.exports = app;
