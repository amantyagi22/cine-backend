const dotenv = require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const candidateRoute = require("./routes/candidate")
const authRoute = require("./routes/auth")
const questionRoute = require("./routes/question")

const app = express();

mongoose.connect(process.env.MONGO_URL,()=>{
    console.log("Connected to MONGODB");
});

//Middleware
app.use(express.json());
app.use("/api/candidates",candidateRoute);
app.use("/api/questions",questionRoute);
app.use("/api/auth",authRoute);

app.listen(8800,()=>{
    console.log("Backend Server is running");
})