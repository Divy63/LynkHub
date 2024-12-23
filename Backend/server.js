const express = require("express");
const chats = require("./data/data");
const dotenv = require("dotenv");

const app = express();

dotenv.config();
// Port on which the server runs
const PORT = process.env.PORT || 10000;

// Get API to get the home page
app.get(`/`, (request, response) => {
  response.send("API is Running Successfully");
});

// GET API to get all chats
app.get(`/api/chats`, (request, response) => {
  response.send(chats);
});

// GET API to get a single chat
app.get("/api/chats/:id", (request, response) => {
  // console.log(request.params.id);
  const chat = chats.find((chat) => chat._id === request.params.id);
  if (!chat) {
    response.status(404).send({ message: "Chat not found" });
  }
  response.send(chat);
});

// Starting Server
app.listen(PORT, console.log(`Server started on Port:${PORT}`));
