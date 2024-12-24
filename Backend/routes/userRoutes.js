const express=require('express');
const router = express.Router();
const {
  registerUser,
  authenticateUser,
} = require("../controllers/userControllers");

router.route("/").post(registerUser);

router.post("/login",authenticateUser);

module.exports=router;