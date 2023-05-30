const express = require("express");
const app = express();
const errorMiddleware = require("./middlewares/errors");
app.use(express.json());
// import all route
const products = require("./routes/product");
const auth = require("./routes/auth");
app.use("/api/v1", products);
app.use("/api/v1", auth);
// middleware su ly loi
app.use(errorMiddleware);
module.exports = app;
