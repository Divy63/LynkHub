const mongoose = require("mongoose");
const { default: ChatsPage } = require("../../../frontend/src/Pages/ChatsPage");

const chatSchema = mongoose.Schema({
  chatName: { type: String, trim: true },
  isGroupChat: { type: Boolean, default: false },
  users: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Users",
    },
  ],
  mostRecentMessage: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Messages",
  },
  groupAdmin: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
  },
},{timestamps:true});

const Chats=mongoose.model("Chats",chatSchema)
module.exports=ChatsPage