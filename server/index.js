const express = require("express");
const cors = require('cors');
const api = require("./api/v1");

const app = express();

app.use(
  cors({
    origin: '*',
  }),
);

// parse application/json
app.use(express.json());

app.use("/api/v1", api);

app.use((req, res, next) => {
  console.log(req)
  next({
    message: "Route not Found",
    statusCode: 404,
  });
});

app.use((err, req, res, next) => {
  const { message = "", statusCode = 500 } = err;
  res.status(statusCode);
  res.json({
    message,
  });
});

module.exports = app;
