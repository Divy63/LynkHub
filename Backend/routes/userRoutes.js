const express=require('express');
const router = express.Router();
const {
  registerUser,
  authenticateUser,
  allUsers,
} = require("../controllers/userControllers");

const{
  protect
}=require("../middleware/authorization");

router.route("/").post(registerUser).get(protect,allUsers);

router.post("/login",authenticateUser);

module.exports=router;