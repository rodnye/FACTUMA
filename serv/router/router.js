const router = require("express").Router();
const auth = require("./auth/router.js"); 

router.use("/auth", auth); 

module.exports = router;