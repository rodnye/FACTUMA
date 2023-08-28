const router = require("express").Router();
const auth = require("./auth/router.js"); 
const {cashierListRest} = require("./cashier/cashier.js");

router.use("/auth", auth); 
router.get("/cashierList" , cashierListRest);

module.exports = router;