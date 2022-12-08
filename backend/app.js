const express = require("express");
const app = express();
const errorMiddleware = require("./middleware/error");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");

//Config
if (process.env.NODE_ENV !== "PRODUCTION") {
  const dotenv = require("dotenv");
  dotenv.config({ path: "backend/config/config.env" });
}
//for recogizing json body data
app.use(express.json()); //parse application/json
app.use(cookieParser()); //parse cookie
app.use(bodyParser.urlencoded({ extended: true })); //parse multiform-data
app.use(fileUpload());

//Route Imports
const product = require("./routes/productRoute");
const user = require("./routes/userRoute");
const order = require("./routes/orderRoute");
const payment = require("./routes/paymentRoute");
const res = require("express/lib/response");

app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);

app.use(express.static(path.join(__dirname, "../frontend/build")));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"));
});
// Middleware for (routes error handles)Errors
app.use(errorMiddleware);

module.exports = app;
