import React, { useEffect, useState, useRef } from "react";
import { InputGroup, FormControl, Button, Toast } from "react-bootstrap";
import ProfileModal from "./miscellaneous/ProfileModal";
import { ChatState } from "../Context/chatProvider";
import "../Pages/Styles/ChatsPage.css";
import ChatHeader from "./miscellaneous/ChatHeader";
import UpdateGroupChatModal from "./miscellaneous/UpdateGroupChatModal";
import axios from "axios";
import io from "socket.io-client";
import Lottie from "react-lottie";
import typinganimation from "../animations/typing-animation.json";
import {
  isLastMessage,
  // isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";

const ENDPOINT = "http://localhost:10000";
var socket, selectedChatCompare;

const ChatOnDisplay = ({ fetchAgain, setFetchAgain }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showUpdateGroupModal, setShowUpdateGroupModal] = useState(false);
  const { user, selectedChat, notification,setNotification } = ChatState();
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [newMessage, setNewMessage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [selectedProfileUser, setSelectedProfileUser] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const [typing, setTyping] = useState(false);
  const [isTyping, setIsTyping] = useState(false);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: typinganimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const messagesEndRef = useRef(null);

  const fetchMessages = async () => {
    if (!selectedChat) {
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `api/message/${selectedChat._id}`,
        config
      );
      setMessages(data);
      setLoading(false);
      socket.emit("join chat", selectedChat._id);
      // console.log(data);
    } catch (error) {
      setToastMessage("Error Occured");
      setShowToast(true);
    }
  };

  useEffect(() => {
    socket = io(ENDPOINT);
    socket.emit("setup", user);
    socket.on("connected", () => setSocketConnected(true));
    socket.on("typing", () => setIsTyping(true));
    socket.on("stop typing", () => setIsTyping(false));
  }, []);

  const sendMessage = async (e) => {
    if ((e.key === "Enter" || e.type === "click") && newMessage) {
      socket.emit("stop typing", selectedChat._id);
      try {
        const payload = { content: newMessage, chatId: selectedChat._id };

        const config = {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${user.token}`,
          },
        };
        setNewMessage("");
        const { data } = await axios.post("/api/message", payload, config);
        console.log(data);
        socket.emit("new message", data);
        setMessages([...messages, data]);
        scrollToBottom();
      } catch (error) {
        setToastMessage("Error Occured!");
        setShowToast(true);
        console.error("Error Sending Message", error);
      }
    }
  };

  const typingHandler = (event) => {
    setNewMessage(event.target.value);
    // Typing Indicator Logic
    if (!socketConnected) return;

    if (!typing) {
      setTyping(true);
      socket.emit("typing", selectedChat._id);
    }

    let lastTypingTime = new Date().getTime();
    var timerLength = 2000;
    setTimeout(() => {
      var timeNow = new Date().getTime();
      var timeDiff = timeNow - lastTypingTime;
      if (timeDiff > timerLength) {
        socket.emit("stop typing", selectedChat._id);
        setTyping(false);
      }
    }, timerLength);
  };

  const handleChatNameClick = () => {
    if (selectedChat.isGroupChat) {
      setShowUpdateGroupModal(true);
    } else {
      setSelectedProfileUser(
        selectedChat.users.find((u) => u._id !== user._id)
      );
      setShowProfileModal(true);
    }
  };

  const scrollToBottom = () => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollTop = messagesEndRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);


  useEffect(() => {
    fetchMessages();
    selectedChatCompare = selectedChat;
  }, [selectedChat]);

  useEffect(() => {
    console.log(notification, "Updated Notification");
  }, [notification]);

  useEffect(() => {
    socket.on("message recieved", (newMessageRecieved) => {
      if (
        !selectedChatCompare ||
        selectedChatCompare._id !== newMessageRecieved.chat._id
      ) {
          if(!notification.includes(newMessageRecieved)){
            console.log(newMessageRecieved);
            setNotification([newMessageRecieved,...notification]);
            setFetchAgain(!fetchAgain);
              // console.log(notification, "---------------");

          }

        } else {
          setMessages([...messages, newMessageRecieved]);
        }
    });
  });

  return (
    <div className="chat-display-window d-flex flex column">
      {/* Eye Button for Viewing Profile */}
      {selectedChat && (
        <ChatHeader
          chatName={
            selectedChat.isGroupChat
              ? selectedChat.chatName
              : selectedChat.users.find((u) => u._id !== user._id).name
          }
          onViewProfile={handleChatNameClick}
        />
      )}

      {/* Chat Messages */}
      <div
        className="messages-container flex-grow-1 overflow-auto p-3"
        ref={messagesEndRef}
      >
        {!selectedChat && (
          <div className="no-chat-selected">
            <h2>Click on a user to start the chat</h2>
          </div>
        )}
        {messages.map((msg, index) => {
          const isCurrentUser = msg.sender._id === user._id;
          const showProfile =
            !isCurrentUser && isLastMessage(messages, index, user._id);

          return (
            <div
              key={index}
              className={`message-wrapper d-flex ${
                isCurrentUser ? "justify-content-end" : "justify-content-start"
              }`}
            >
              {/* Profile Image */}
              {showProfile && (
                <img
                  src={msg.sender.profile}
                  alt={msg.sender.name}
                  className="rounded-circle sender-profile me-2"
                  style={{
                    width: "40px",
                    height: "40px",
                    cursor: "pointer",
                    marginBottom: isSameUser(messages, msg, index) ? 3 : 10,
                  }}
                  onClick={() => {
                    setSelectedProfileUser(msg.sender);
                    setShowProfileModal(true);
                  }} // Open profile modal on click
                  title={msg.sender.name} // Show name on hover
                />
              )}
              {/* Message Bubble */}
              <div
                className={`message-bubble ${
                  isCurrentUser ? "my-message" : "other-message"
                }`}
                style={{
                  marginLeft: isSameSenderMargin(
                    messages,
                    msg,
                    index,
                    user._id
                  ),
                  marginBottom: isSameUser(messages, msg, index) ? 3 : 10,
                }}
              >
                <div>{msg.messageContent}</div>
              </div>
            </div>
          );
        })}
      </div>

      {isTyping ? (
        // <div className="typing-animation-container">
        <Lottie
          width={83}
          height={65}
          style={{
            transform: "scale(0.5)", // Adjust the scale value to reduce the size
            transformOrigin: "center",
            marginBottom: 15,
            marginLeft: 0,
          }}
          options={defaultOptions}
        />
      ) : (
        // </div>
        <></>
      )}
      {/* Input Box */}
      {selectedChat && (
        <InputGroup className="message-input-bar">
          <FormControl
            placeholder="Type a message..."
            value={newMessage}
            onChange={typingHandler}
            onKeyDown={sendMessage}
            isrequired="true"
          />
          <Button
            variant="warning"
            onClick={(e) => sendMessage(e)}
            disabled={!newMessage.trim()}
            style={{
              backgroundColor: "var(--soft-taupe)",
              color: "var(--off-white)",
              border: "none",
              transition: "background-color 0.3s ease, color 0.3s ease",
            }}
          >
            Send
          </Button>
        </InputGroup>
      )}

      {/* {!selectedChat && (
        <div className="no-chat-selected">
          <h2>Click on a user to start the chat</h2>
        </div>
      )} */}

      {/* Profile Modal */}
      <ProfileModal
        show={showProfileModal}
        onHide={() => setShowProfileModal(false)}
        user={selectedProfileUser}
      />

      {/* Group Modal */}
      <UpdateGroupChatModal
        fetchAgain={fetchAgain}
        setFetchAgain={setFetchAgain}
        show={showUpdateGroupModal}
        handleClose={() => setShowUpdateGroupModal(false)}
        fetchMessages={fetchMessages}
      />

      <Toast
        show={showToast}
        onClose={() => setShowToast(false)}
        delay={5000}
        autohide
        className="custom-toast"
      >
        <Toast.Body>{toastMessage}</Toast.Body>
      </Toast>
    </div>
  );
};

export default ChatOnDisplay;
