const mongoose = require("mongoose");

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
module.exports=Chats