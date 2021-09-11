
const express = require("express");
const mongoose = require("mongoose");
const candidateRoute = require("./routes/candidate")
const adminRoute = require("./routes/admin")
const questionRoute = require("./routes/question")

const bodyParser = require("body-parser");
const app = express();

mongoose.connect("mongodb+srv://aman:12345@cluster0.jusdn.mongodb.net/cine?retryWrites=true&w=majority",{
  useNewUrlParser: true,
        useUnifiedTopology: true
},

function(){console.log("connected to db");}
);

//Middleware
// app.use(express.json());

app.use(bodyParser.json());



app.use("/api/candidates",candidateRoute);
app.use("/api/questions",questionRoute);
app.use("/api/admin",adminRoute);

app.use("/admin",adminRoute);

app.listen(8800,(req, res)=> {
    console.log("server running at port 8800");
  });