const asyncHandler = require("express-async-handler");
const Chat = require("../Schema/ChatSchema");
const User = require("../Schema/UserSchema");
const Message = require("../Schema/MessageSchema");
// Creates or fetches a one to one chat
const accessChat = asyncHandler(async (req, res) => {
  const { userId } = req.body;
  if (!userId) {
    console.log("UserId not sent with the request");
    return res.sendStatus(400);
  }

  var isChat = await Chat.find({
    isGroupChat: false,
    $and: [
      { users: { $elemMatch: { $eq: userId } } },
      { users: { $elemMatch: { $eq: req.user._id } } },
    ],
  })
    .populate("users", "-password")
    .populate("mostRecentMessage");

  isChat = await User.populate(isChat, {
    path: "mostRecentMessage.sender",
    select: "name profile email",
  });

  // Getting only 1 chat
  if (isChat.length > 0) {
    res.send(isChat[0]);
  } else {
    // Creating a new chat
    var newChat = {
      chatName: "sender",
      isGroupChat: false,
      users: [req.user._id, userId],
    };

    try {
      var createdChat = await Chat.create(newChat);
      const fullChat = await Chat.findOne({ _id: createdChat._id }).populate(
        "users",
        "-password"
      );
      res.status(200).send(fullChat);
    } catch (error) {
      res.status(400);
      throw new Error(error.message);
    }
  }
});

const getChats = asyncHandler(async (req, res) => {
  try {
    Chat.find({ users: { $elemMatch: { $eq: req.user._id } } })
      .populate("users", "-password")
      .populate("groupAdmin", "-password")
      .populate("mostRecentMessage")
      .sort({ upDatedAt: -1 })
      .then(async (results) => {
        results = await User.populate(results, {
          path: "mostRecentMessage.sender",
          select: "name profile email",
        });

        res.status(200).send(results);
      });
  } catch (error) {
    res.status(400);
    throw new Error(error.message);
  }
});

const createGroupChat = asyncHandler(async (req, res) => {
  if (!req.body.users || !req.body.name) {
    return res.status(400).send({ message: "Please Fill all the fields!" });
  }
  
  var users = JSON.parse(req.body.users);
  
  if (users.length < 2) {
    return res.status(400).send({ message: "Please add at least 2 users!" });
  }

  users.push(req.user);

  try{
    const group=await Chat.create({
        chatName:req.body.name,
        users:users,
        isGroupChat:true,
        groupAdmin:req.user,
    });
    const fullGroupChat=await Chat.findOne({_id:group._id})
    .populate("users","-password")
    .populate("groupAdmin","-password");

    res.status(200).json(fullGroupChat);
  }catch(error){
    res.status(400)
    throw new Error(error.message);
  }

});

const renameGroupChat=asyncHandler(async(req,res)=>{
    const {chatId,chatName}=req.body;
    const updatedChat=await Chat.findByIdAndUpdate(
        chatId,{
            chatName:chatName
        },{
        new:true,
        }
    ).populate("users","-password").populate("groupAdmin","-password");
    if(!updatedChat){
        res.status(404);
        throw new Error("Chat not found");
        }else{
            res.json(updatedChat);
        }
});

module.exports = { accessChat, getChats, createGroupChat, renameGroupChat };
