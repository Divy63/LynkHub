import React, { useState } from "react";
import {
  Navbar,
  Nav,
  Container,
  Dropdown,
  Spinner,
  ListGroup,
} from "react-bootstrap";
import { FaBell, FaSignOutAlt, FaHubspot } from "react-icons/fa";
import ProfileModal from "./ProfileModal";
import { Link, useNavigate } from "react-router-dom";
import { ChatState } from "../../Context/chatProvider";
import { getSender } from "../../config/ChatLogics";

const ChatPageHeader = ({ user }) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const { selectedChat, setSelectedChat, notification, setNotification } =
    ChatState();
  const [showDropdown, setShowDropdown] = useState(false);

  const toggleDropdown = () => setShowDropdown((prev) => !prev);

  const navigate = useNavigate();
  const handleProfileClick = () => {
    setShowProfileModal(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
  };

  if (!user) {
    return (
      <div
        className="spinner-container d-flex justify-content-center align-items-center"
        style={{ height: "100px" }}
      >
        <Spinner animation="border" variant="primary" />
      </div>
    );
  }

  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="py-2 px-3">
      <Container fluid className="custom-container">
        {/* Logo */}
        <Navbar.Brand
          as={Link}
          to="/chat"
          className="fw-bold d-flex align-items-center"
          style={{ color: "var(--soft-taupe)" }}
        >
          LynkHub
          <FaHubspot className="me-2" style={{ color: "var(--soft-taupe)" }} />
        </Navbar.Brand>
        <Nav.Item className="my-chats ms-auto d-none d-lg-block">
          <span
            className="text-warning fw-bold mx-4"
            style={{
              fontSize: "1.2rem",
              display: "flex",
              alignItems: "center",
              color: "var(--soft-taupe)",
            }}
          >
            My Chats
          </span>
        </Nav.Item>
        {/* Right-aligned icons */}
        <Nav className="ms-auto d-flex align-items-center">
          {/* Notifications Icon */}
          <Nav.Item className="position-relative me-4">
            <div
              style={{
                position: "relative",
                display: "inline-block",
                cursor: "pointer",
              }}
            >
              {/* Bell Icon */}
              <FaBell
                size={20}
                style={{ color: "var(--soft-taupe)", cursor: "pointer" }}
                onClick={toggleDropdown}
              />
              {notification.length > 0 && (
                <span
                  style={{
                    position: "absolute",
                    top: "-5px",
                    right: "-10px",
                    backgroundColor: "var(--warm-sand)",
                    color: "#000000",
                    borderRadius: "50%",
                    padding: "1px 6px",
                    fontSize: "0.8rem",
                    fontWeight: "bold",
                    border: "1px solid var(--soft-taupe)",
                  }}
                >
                  {notification.length}
                </span>
              )}
            </div>

            {/* Dropdown */}
            <Dropdown
              show={showDropdown}
              onToggle={setShowDropdown}
              align="end"
            >
              <Dropdown.Menu
                style={{
                  width: "230px",
                  height: "300px",
                  maxHeight: "600px",
                  overflowY: "auto",
                  backgroundColor: "var(--warm-sand)",
                  color: "var(--slate-gray)",
                  border: "1px solid var(--soft-taupe)",
                  borderRadius: "8px",
                }}
              >
                {notification.length === 0 ? (
                  <Dropdown.Item
                    disabled
                    className="text-center"
                    style={{
                      color: "var(--soft-taupe)",
                      padding: "10px 15px",
                    }}
                  >
                    No New Messages
                  </Dropdown.Item>
                ) : (
                  <ListGroup
                    variant="flush"
                    className="px-3 py-2"
                    style={{ maxWidth: 230, maxHeight: 80 }}
                  >
                    {notification.map((notif) => (
                      <ListGroup.Item
                        key={notif._id}
                        style={{
                          backgroundColor: "var(--off-white)",
                          color: "var(--slate-gray)",
                          border: "none",
                          cursor: "pointer",
                          padding: "10px 15px", // Padding for rectangular shape
                          borderRadius: "6px", // Rounded corners for rectangle
                          marginBottom: "5px", // Space between items
                        }}
                        onClick={() => {
                          setSelectedChat(notif.chat);
                          setNotification(
                            notification.filter((n) => n !== notif)
                          );
                        }}
                      >
                        {notif.chat.isGroupChat
                          ? `New Message in ${notif.chat.chatName}`
                          : `New Message from ${getSender(
                              user,
                              notif.chat.users
                            )}`}
                      </ListGroup.Item>
                    ))}
                  </ListGroup>
                )}
              </Dropdown.Menu>
            </Dropdown>
          </Nav.Item>

          {/* Profile Dropdown */}
          <Dropdown align="end">
            <Dropdown.Toggle
              variant="outline-warning"
              id="profile-dropdown"
              className="d-flex align-items-center"
              style={{
                borderColor: "var(--soft-taupe)",
                color: "var(--soft-taupe)",
              }}
            >
              <img
                src={user?.profile || "https://via.placeholder.com/40"}
                alt={user.name || "User Name"}
                className="rounded-circle"
                width="30"
                height="30"
              />
            </Dropdown.Toggle>

            <Dropdown.Menu
              style={{
                backgroundColor: "var(--warm-sand)",
                borderColor: "var(--soft-taupe)",
              }}
            >
              <Dropdown.Item
                onClick={handleProfileClick}
                style={{ color: "var(--soft-taupe)" }}
              >
                Profile
              </Dropdown.Item>
              <Dropdown.Divider />
              <Dropdown.Item
                onClick={handleLogout}
                style={{ color: "var(--soft-taupe)" }}
              >
                <FaSignOutAlt
                  className=" me-2"
                  style={{ color: "var(--soft-taupe)" }}
                />{" "}
                Logout
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Nav>
      </Container>

      {/* Profile Modal */}
      <ProfileModal
        show={showProfileModal}
        onHide={() => setShowProfileModal(false)}
        user={user}
      />
    </Navbar>
  );
};

export default ChatPageHeader;
