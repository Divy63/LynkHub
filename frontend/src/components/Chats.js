import React, { useEffect, useState } from "react";
import { ListGroup, Button, Toast } from "react-bootstrap";
import { ChatState } from "../Context/chatProvider";
import axios from "axios";
import { getSender, getProfile } from "../config/ChatLogics";
import GroupChatModal from "./miscellaneous/GroupChatModal";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUsers } from "@fortawesome/free-solid-svg-icons";

const Chats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();
  const { user, selectedChat, setSelectedChat, chats, setChats } = ChatState();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [showGroupChatModal, setShowGroupChatModal] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const getChats = async () => {
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get("api/chat", config);
      setChats(data);
      console.log(data);
    } catch (error) {
      console.log(error);
      setShowToast(true);
      setToastMessage("Error Occured!");
    }
  };

  const onSelectChat = async (chat) => {
    setSelectedChat(chat);
    console.log("Selected Chat:", chat);
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    getChats();
  }, [fetchAgain]);
  

  return (
    <div className="chats-container" >
      <Button
        className="btn-sm"
        variant="warning"
        onClick={() => setShowGroupChatModal(true)}
      >
        New Group Chat +
      </Button>
      <GroupChatModal
        show={showGroupChatModal}
        handleClose={() => setShowGroupChatModal(false)}
      />
      {/* </div> */}
      <ListGroup className="chat-list-group">
        {chats.map((chat) => (
          <ListGroup.Item
            className="chat-list-group-item"
            action
            key={chat._id}
            style={{
              backgroundColor: selectedChat === chat ? "var(--soft-taupe)" : "var(--warm-sand)",
              color:
                selectedChat === chat
                  ? "var(--off-white)"
                  : "var(--soft-taupe)",
              cursor: "pointer",
            }}
            onClick={() => onSelectChat(chat)}
          >
            <div>
              {!chat.isGroupChat ? (
                <img
                  src={getProfile(loggedUser, chat.users)}
                  alt="User Profile"
                  className="rounded-circle me-3"
                  width="40"
                  height="40"
                />
              ) : (
                <FontAwesomeIcon
                  icon={faUsers}
                  className="fathin me-3"
                  style={{
                    fontSize: "30px", // Adjust size to match the profile picture
                    color: "#000000", // Match the theme color
                  }}
                />
              )}
              <strong>
                {!chat.isGroupChat
                  ? getSender(loggedUser, chat.users)
                  : chat.chatName}
              </strong>
            </div>
            <div className="text-muted">{chat.lastMessage}</div>
          </ListGroup.Item>
        ))}
      </ListGroup>

      {/* Toast for Errors */}
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

export default Chats;
