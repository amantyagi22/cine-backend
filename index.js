require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const userRoute = require("./routes/user");
const questionRoute = require("./routes/question");

const allQuestions = require("./routes/getAllQuestions");
const allCandidates = require("./routes/getAllCandidates");
const SubmitQuestion = require('./routes/submitQuestion')
const LoginAndRegisterRoute = require('./routes/login')
const cors = require('cors')
const app = express();

mongoose
  .connect(process.env.MONGO_URL, {})
  .then(() => {
    console.log(`Connected to MONGODB`);
  })
  .catch((e) => {
    console.log(e);
  });

//Middleware
app.use(cors())
app.use(express.json());
app.use("/api/sign",LoginAndRegisterRoute)
app.use("/api/users", userRoute);
app.use("/api/questions", questionRoute, allQuestions);
app.use("/api/candidates", allCandidates);
app.use("/api/submit", SubmitQuestion);

let port = process.env.PORT;
if (port == null || port == "") {
  port = 8800;
}
app.listen(port, () => {
  console.log("Backend Server is running at 8800");
});
