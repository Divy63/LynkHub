const express=require("express");
const {protect}=require("../middleware/authorization");
const {
  accessChat,
  getChats,
  createGroupChat,
  renameGroupChat,
  addToGroup,
  removeFromGroup,
} = require("../controllers/chatControllers");
const router=express.Router();

router.route("/").post(protect, accessChat);
router.route("/").get(protect,getChats);
router.route("/group").post(protect,createGroupChat);
router.route("/renamegroup").put(protect,renameGroupChat);
router.route("/removefromgroup").put(protect,removeFromGroup);
router.route("/addtogroup").put(protect, addToGroup);

module.exports=router;