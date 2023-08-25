const router = require("express").Router();
const login = require("./login.js"); 
const register = require("./register.js");

router.post("/login" , (req , res) => login(req, res));
router.post("/register" , (req , res) => register(req , res));


module.exports = router;