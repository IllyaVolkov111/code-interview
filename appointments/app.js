const express = require("express");
const bodyParser = require("body-parser");
const createError = require("http-errors");
const morgan = require("morgan");
var cors = require('cors')

const routes = require("./api/api.routes");
const { initAddSubscription, initDeleteSubscription } = require("./pubsub");

const app = express();

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(routes);

Promise.all([initAddSubscription(), initDeleteSubscription()])
  .then(() => {
    console.log("PubSubProvider started");
  })
  .catch(({ message }) => {
    console.log("PubSubProvider starting error", {
      message
    });
  });

app.use(function(req, res, next) {
  next(createError(404));
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  res.status(err.status || 500);
  res.send("error");
});

module.exports = app;
