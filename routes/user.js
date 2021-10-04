const router = require("express").Router();
const User = require("../models/User");

router.get("/", async (req, res) => {
  const newuser = await new User({
    name: req.body.name,
    studentNumber: req.body.studentNumber,
    rollNumber: req.body.rollNumber,
    email: req.body.email,
    phoneNumber: req.body.phoneNumber,
    branch: req.body.branch,
    residency: req.body.residency,
    attendedExam: req.body.attendedExam,
    isAdmin: req.body.isAdmin,
  });

  try {
    const user = await newuser.save();
    res.status(200).json(user);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
