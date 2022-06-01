const router = require("express").Router();
const User = require("../models/User");
const bcrypt = require("bcrypt");
const nodemailer = require("nodemailer");
const tokenServices = require("../Services/TokenServices");
const { findById } = require("../models/User");

// Add a user
router.post("/register", async (req, res) => {
  try {
    const password = "secret";
    const body = {
      ...req.body,
      password: await bcrypt.hash(password, 10),
    };

    const candidateSchema = new User(body);
    const studentData = await candidateSchema.save();
    console.log(studentData);
    //##################### using  nodemailer #################//
    // const transporter = nodemailer.createTransport({
    //   service: "gmail",
    //   auth: {
    //     user: process.env.EMAIL,
    //     pass: process.env.PASS_E,
    //   },
    // });
    // const mailOption = {
    //   from: process.env.EMAIL,
    //   to: req.body.email,
    //   subject: "CINE'21", // https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbGZVWUJFbnFPUFk1aGVkMm9UVHhnaWJjc1FYUXxBQ3Jtc0tuZnFNa3BMVkR5SkZIWm5lLWw0NEF5b0tsYnF3T2dnR3pXUm1xNVo4YTJ2cFJiLVJsdGpfc24zYkpaWGx5bnFiT3lLb0NGQk9zcVlqaF9lRXI3alN6Qm5XVXBHNEdNS2NkeERuY0tZaDg5ZW1aUkZEYw&q=https%3A%2F%2Fmyaccount.google.com%2Flesssecureapps
    //   html:
    //     "<h3>CONGRATULATION,</h3><br>" +
    //     "<h1 style='font-weight:bold;'>You are successfully registered</h1>",
    // };

    // transporter.sendMail(mailOption, function (error, info) {
    //   if (error) {
    //     console.log(error);
    //     // res.send(error);
    //   } else {
    //     console.log(mailOption);
    //     // res.send(mailOption);
    //   }
    // });
    // res.status(200).send(mailOption);
    res.status(200).send({
      message: "User Successfully Registered",
      id: candidateSchema._id,
    });
  } catch (error) {
    console.log(error);
    res.status(400).send("User already exist");
  }
});

// Get the user
router.get("/:id", async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json(err);
  }
});

// Delete the user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Account has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});

// Update a user
router.put("/update", async (req, res) => {
  // if (req.body.isAdmin) {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, {
      $set: req.body,
    });
    res.status(200).json("Account has been updated");
  } catch (err) {
    return res.status(500).json(err);
  }
});

// feedback
router.post("/feedback", async (req, res) => {
  try {
    const feedbackText = {
      feed: req.body.text,
    };
    console.log(feedbackText);
    const feedbackSchema = new feedback(feedbackText);
    const fb = await feedbackSchema.save();
    console.log(fb);
    res.status(200).send("successfully done");
  } catch (error) {
    console.log(error);
    res.status(400).send(error);
  }
});

router.put("/instruction", async (req, res) => {
  try {
    // const str = req.body.headers["auth-token"];
    // const userId = tokenServices.VerifyTokenAndGetIdFromJwt(
    //   str.substr(str.indexOf(" ") + 1)
    // );
    const userId = tokenServices.VerifyAuthTokenAndGetId(req);
    const user = await User.findById(userId._id);
    const data = await User.findByIdAndUpdate(userId._id, {
      loginAt: new Date(),
      hasAppeared: true,
      categorySelected: req.body.category,
    });
    res.status(200).json(userId._id);
  } catch (error) {
    console.log(error);
    res.status(400).json(error);
  }
});

module.exports = router;
