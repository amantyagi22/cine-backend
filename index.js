const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const adminRoute = require("./routes/admin");
const questionRoute = require("./routes/question");
const bodyParser = require("body-parser");
const loginRoute = require("./routes/login");
const app = express();

mongoose.connect(process.env.MONGO_URL, () => {
  console.log("Connected to MONGODB");
});

//Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/questions", questionRoute);
app.use("/api/login", loginRoute);
app.use("/api/admin", adminRoute);

app.listen(8800, () => {
  console.log("Backend Server is running at 8800");
});
