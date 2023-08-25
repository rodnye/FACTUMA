const router = require("express").Router();
const login = require("./login.js"); 

router.post("/login" , (req , res) => login(req, res));

module.exports = router;