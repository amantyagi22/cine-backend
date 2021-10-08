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
// Delete the user
router.delete("/:id", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    res.status(200).json("Account has been deleted");
  } catch (err) {
    return res.status(500).json(err);
  }
});
// update a user
router.put("/:id", async (req, res) => {
  if (req.body.userId === req.params.id || req.body.isAdmin) {
    if (req.body.password) {
      try {
        const salt = await bcrypt.genSalt(10);
        req.body.password = await bcrypt.hash(req.body.password, salt);
      } catch (err) {
        return res.status(500).json(err);
      }
    }
    try {
      const user = await User.findByIdAndUpdate(req.params.id, {
        $set: req.body,
      });
      res.status(200).json("Account has been updated");
    } catch (err) {
      return res.status(500).json(err);
    }
  }
});
module.exports = router;
