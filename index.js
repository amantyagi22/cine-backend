const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");
const questionRoute = require("./routes/question");
const bodyParser = require("body-parser");
const app = express();

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Connected to MONGODB");
});

//Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/questions", questionRoute);
app.use("/api/admin", adminRoute);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8800;
}
app.listen(port, () => {
  console.log("Backend Server is running at 8800");
});
