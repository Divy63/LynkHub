import React, { useState } from "react";
import { ChatState } from "../../Context/chatProvider";
import {
  Button,
  Form,
  InputGroup,
  ListGroup,
  Modal,
  Spinner,
  Toast,
} from "react-bootstrap";
import UserListItem from "./UserListItem";
import UserBadge from "./UserBadge";
import "../../Pages/Styles/GroupChatModal.css";
import axios from "axios";

const UpdateGroupChatModal = ({
  fetchAgain,
  setFetchAgain,
  show,
  handleClose,
  fetchMessages,
}) => {
  const { user, selectedChat, setSelectedChat } = ChatState();
  const [groupChatName, setGroupChatName] = useState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [renameLoading, setRenameLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");


  const resetFields = () => {
    setSearch("");
    setSearchResult([]);
  };
  const handleCloseModal = () => {
    resetFields();
    handleClose(); // Calls the parent-provided `handleClose` to close the modal
  };

  const handleRenameGroup = async () => {
    if (!groupChatName) return;
    try {
      setRenameLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/chat/renamegroup`,
        {
          chatId: selectedChat._id,
          chatName: groupChatName,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setRenameLoading(false);
      handleCloseModal();
    } catch (error) {
      console.error(error);
      setToastMessage("Error Occured!");
      setShowToast(true);
      setRenameLoading(false);
    }
    setGroupChatName("");
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query.trim()) {
      setSearchResult([]);
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(
        `/api/user?search=${query.trim()}`,
        config
      );
      setSearchResult(data);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleAddUser = async (userToAdd) => {
    if (selectedChat.users.find((u) => u._id === userToAdd._id)) {
      console.log("User already in group");
      setToastMessage("User already in group.");
      setShowToast(true);
      return;
    }

    if (selectedChat.groupAdmin._id !== user._id) {
      setToastMessage("Only admins can add member to a group.");
      setShowToast(true);
      return;
    }

    try {
      setLoading(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/chat/addtogroup`,
        {
          chatId: selectedChat._id,
          userId: userToAdd._id,
        },
        config
      );

      setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
    } catch (error) {
      console.error(error);
      setToastMessage("Error Occured!");
      setShowToast(true);
    }
  };

  const handleRemoveUser = async (userToRemove) => {
    if (
      selectedChat.groupAdmin._id !== user._id &&
      userToRemove._id !== user._id
    ) {
      setToastMessage("Only admins can remove member from a group.");
      setShowToast(true);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/chat/removefromgroup`,
        {
          chatId: selectedChat._id,
          userId: userToRemove._id,
        },
        config
      );

      userToRemove._id === user._id
        ? setSelectedChat(null)
        : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      fetchMessages();
      setLoading(false);
    } catch (error) {
      console.error(error);
    }
  };

  const handleLeaveGroup = async (userToRemove) => {
    if (
      selectedChat.groupAdmin._id !== user._id &&
      userToRemove._id !== user._id
    ) {
      setToastMessage("Only admins can remove member from a group.");
      setShowToast(true);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.put(
        `/api/chat/removefromgroup`,
        {
          chatId: selectedChat._id,
          userId: userToRemove._id,
        },
        config
      );

      userToRemove._id === user._id
        ? setSelectedChat(null)
        : setSelectedChat(data);
      setFetchAgain(!fetchAgain);
      setLoading(false);
      handleCloseModal();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleCloseModal} centered>
        <Modal.Header
          closeButton
          style={{
            backgroundColor: "var(--soft-taupe)",
            color: "var(--off-white)",
            fontFamily: "Orbitron, sans-serif",
          }}
        >
          <Modal.Title className="modal-title-golden">Update Group</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="groupName">
            <Form.Label>Group Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter group name"
              value={groupChatName}
              onChange={(e) => setGroupChatName(e.target.value)}
            />
          </Form.Group>

          <Form.Group controlId="searchUsers" className="mt-3">
            <Form.Label>Search Users</Form.Label>
            <InputGroup>
              <Form.Control
                type="text"
                placeholder="Search users to add"
                value={search}
                onChange={(e) => handleSearch(e.target.value)}
              />
            </InputGroup>
          </Form.Group>

          {loading ? (
            <Spinner animation="border" size="sm" className="mt-3" />
          ) : (
            <ListGroup className="mt-3 user-list-group">
              {searchResult.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleAddUser(user)}
                />
              ))}
            </ListGroup>
          )}

          <div className="mt-3">
            {selectedChat?.users.map((user) => (
              <UserBadge
                key={user._id}
                user={user}
                handleFunction={() => handleRemoveUser(user)}
              />
            ))}
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            className="custom-leave-btn"
            onClick={() => handleLeaveGroup(user)}
          >
            Leave Group
          </Button>
          <Button
            className="custom-leave-btn"
            variant="primary"
            onClick={handleRenameGroup}
            disabled={renameLoading}
          >
            {renameLoading ? "Updating..." : "Update Group Name"}
          </Button>
        </Modal.Footer>
      </Modal>

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

export default UpdateGroupChatModal;
