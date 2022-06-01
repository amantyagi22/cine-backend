const router = require("express").Router();
const UserLoginService = require('../Services/UserServices');


router.post("/Login", async (req, res) => {
  let result = await UserLoginService.LoginUserAsync(req.body)
  if (result.IsSuccess) {
    res.status(200).send({
      token: result.Token
    })
  } else {
    if (result.Status) {
      res.status(result.Status).send(result.Error)
    }
    else {
      res.status(500).send()
    }
  }
})


router.post("/Register", async (req, res) => {
  let result = await UserLoginService.CreateUserAsync(req.body)
  if (result.IsSuccess) {
    res.status(200).send({
      token: result.Token,
      role: result.Role
    })
  } else {
    res.status(500).send(
      {
        Error: result.Error
      }
    )
  }

})

module.exports = router;
