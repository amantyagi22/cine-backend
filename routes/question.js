const router = require("express").Router();

router.get("/",(req,res)=>{
    res.send("This is question route")
})

module.exports = router;