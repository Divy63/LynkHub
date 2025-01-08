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
// import UserBadge from './UserBadge';
import "../../Pages/Styles/GroupChatModal.css";
import axios from "axios";
import UserBadge from "./UserBadge";

const GroupChatModal = ({ show, handleClose }) => {
  const { user, chats, setChats } = ChatState();
  const [groupName, setGroupName] = useState("");
  const [search, setSearch] = useState("");
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [creating, setCreating] = useState(false);
  const [searchResult, setSearchResult] = useState();
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");


  const resetFields = () => {
    setGroupName("");
    setSearch("");
    setSelectedUsers([]);
    setSearchResult([]);
  };
  const handleCloseModal = () => {
    resetFields();
    handleClose(); // Calls the parent-provided `handleClose` to close the modal
  };

  const handleSearch = async (query) => {
    setSearch(query);
    if (!query) {
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

      const { data } = await axios.get(`/api/user?search=${query.trim()}`, config);
      console.log(data);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      console.error(error);
      setShowToast(true);
      setToastMessage("Error Occured!");
    }
  };

  const handleGroup = (user) => {
    if (selectedUsers.includes(user)) {
      setToastMessage("User already added!");
      setShowToast(true);
      return;
    }

    setSelectedUsers([...selectedUsers, user]);
  };

  const handleRemoveUser = (user) => {
    setSelectedUsers(selectedUsers.filter((sel) => sel._id !== user._id));
  };

  const handleCreateGroup = async () => {
    if (!groupName || !selectedUsers.length) {
      setToastMessage("Please fill all the fields.");
      setShowToast(true);
      return;
    }

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(
        "/api/chat/group",
        {
          name: groupName,
          users: JSON.stringify(selectedUsers.map((u) => u._id)),
        },
        config
      );

      setChats([data, ...chats]);
      handleCloseModal();
      setToastMessage("New group chat created.");
      setShowToast(true);
      resetFields();
    } catch (error) {
      console.error(error);
      setShowToast(true);
      setToastMessage("Failed to create a group chat.");
    }
  };

  return (
    <div>
      <Modal show={show} onHide={handleCloseModal} centered>
        <Modal.Header
          closeButton
          className="border-0"
          style={{
            backgroundColor: "var(--soft-taupe)",
            color: "var(--off-white)",
            fontFamily: "Orbitron, sans-serif",
          }}
        >
          <Modal.Title
            className="modal-title-golden"
            style={{
              color: "var(--off-white)",
              fontFamily: "Orbitron, sans-serif",
            }}
          >
            Create New Group Chat
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group controlId="groupName">
            <Form.Label>Group Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter group name"
              value={groupName}
              onChange={(e) => setGroupName(e.target.value)}
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
            <ListGroup className="mt-3 user-input-group">
              {searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => handleGroup(user)}
                />
              ))}
            </ListGroup>
          )}

          <div className="mt-3">
            {selectedUsers.map((user) => (
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
            variant="secondary"
            className="custom-leave-btn"
            onClick={handleCloseModal}
          >
            Cancel
          </Button>
          <Button
            className="custom-leave-btn"
            variant="primary"
            onClick={handleCreateGroup}
            disabled={creating}
          >
            {creating ? "Creating..." : "Create Group"}
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

export default GroupChatModal;
