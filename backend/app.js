const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const errorMiddleware = require("../backend/middleware/error");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config({ path: "backend/config/config.env" });

app.use(
  express.json({
    limit: "50mb",
  })
);
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(fileUpload());
//Route imports
const product = require("./routes/productRoute");
const user = require("../backend/routes/userRoute");
const order = require("../backend/routes/orderRoute");
const payment = require("../backend/routes/paymentRoute");
app.use(
  cors({
    origin: ["https://shopwithecom.netlify.app","http://localhost:3000"],
    credentials: true,
  })
);
app.set("trust proxy", 1);
app.use("/api/v1", product);
app.use("/api/v1", user);
app.use("/api/v1", order);
app.use("/api/v1", payment);
//middleware for eror
app.use(errorMiddleware);

module.exports = app;
