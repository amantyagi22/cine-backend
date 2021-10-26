const router = require("express").Router();
const User = require("../models/User");

// Add a user
router.post("/register", async (req, res) => {
  try {
    const password = "secret"
    const body = {
      ...req.body,
      password: await bcrypt.hash(password, 10)
    }

    const condidateSchema = new candidate(body);
    const studentData = await condidateSchema.save()
    console.log(studentData);

    // ##################### using  nodemailer #################//
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASS_E
      }
    });
    const mailOption = {
      from: process.env.EMAIL,
      to: req.body.email,
      subject: "CINE'21",    // https://www.youtube.com/redirect?event=video_description&redir_token=QUFFLUhqbGZVWUJFbnFPUFk1aGVkMm9UVHhnaWJjc1FYUXxBQ3Jtc0tuZnFNa3BMVkR5SkZIWm5lLWw0NEF5b0tsYnF3T2dnR3pXUm1xNVo4YTJ2cFJiLVJsdGpfc24zYkpaWGx5bnFiT3lLb0NGQk9zcVlqaF9lRXI3alN6Qm5XVXBHNEdNS2NkeERuY0tZaDg5ZW1aUkZEYw&q=https%3A%2F%2Fmyaccount.google.com%2Flesssecureapps
      html: "<h3>CONGRATULATION,</h3><br>" + "<h1 style='font-weight:bold;'>You are successfully registered</h1>"
    };

    transporter.sendMail(mailOption, function (error, info) {
      if (error) {
        console.log(error)
        res.send(error);
      }
      else {
        console.log(mailOption)
        res.send(mailOption);
      }
    });
    res.status(200).send(mailOption);

  }
  catch (error) {
    console.log(error)
    res.status(400).send("You are already exist");
  }
})


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
router.put("/:id", async (req, res) => {
  if (req.body.isAdmin) {
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
