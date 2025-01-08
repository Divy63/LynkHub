const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");
const connectDatabase = require("./config/db");
const colors = require("colors");
const userRoutes = require("./routes/userRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleWare");
const chatRoutes = require("./routes/chatRoutes");
const cors = require("cors");
const messageRoutes = require("./routes/messageRoutes");
const path = require("path");

dotenv.config();
connectDatabase();
const app = express();
app.use(cors());
// Accepts JSON Data
app.use(express.json());

// Port on which the server runs
const PORT = process.env.PORT || 10000;

app.use("/api/user", userRoutes);
app.use("/api/chat", chatRoutes);
app.use("/api/message", messageRoutes);
// <-----------------------------------------------Deployemt------------------------------------------------------------------------>
const __dirname1 =path.resolve();
if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname1, "frontend","build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"));
  });
} else {
  app.get("/", (req, res) => {
    res.send("API is Running Successfully.");
  });
}
  // <-----------------------------------------------Deployemt------------------------------------------------------------------------>


  app.use(notFound);
app.use(errorHandler);

const server = app.listen(
  10000,
  console.log(`Server started on PORT ${PORT}`.yellow)
);

const io = require("socket.io")(server, {
  pingTimeout: 60000,
  cors: {
    origin: "http://localhost:3001",
  },
});

io.on("connection", (socket) => {
  console.log("Connected to socket.io");

  socket.on("setup", (userData) => {
    socket.join(userData._id);
    console.log(userData._id);
    socket.emit("connected");
  });

  socket.on("join chat", (room) => {
    socket.join(room);
    console.log("User Joined Room:"+room)
  });

  socket.on('typing',(room)=>socket.in(room).emit('typing'));
  socket.on("stop typing", (room) => socket.in(room).emit("stop typing"));

  socket.on('new message',(newMessageRecieved)=>{
    var chat = newMessageRecieved.chat;
    if(!chat.users) return console.log("Chat.users not defined");
    chat.users.forEach(user=>{
      if(user._id==newMessageRecieved.sender._id){
        return;

      }else{

      }socket.in(user._id).emit("message recieved",newMessageRecieved);
    });
  });

  socket.off("setup",()=>{
    console.log("USER DISCONNECTED");
  });
  
});
