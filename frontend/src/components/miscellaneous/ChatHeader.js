import React from "react";
import { Navbar, Nav, Button } from "react-bootstrap";

const ChatHeader = ({chatName,onViewProfile}) => {

  
  return (
    <Navbar  variant="dark" className="chat-header">
      {/* <Navbar.Brand className="text-warning">{chatName}</Navbar.Brand> */}
      <Nav className="ml-auto">
        <Button
          variant="link"
          className="navbar-brand navbar-brand-golden fw-bold p-0 m-0"
          onClick={onViewProfile}
          style={{
            textDecoration: "none",
            fontSize: "1.5rem",
            cursor: "pointer",
            color: "var(--soft-taupe)", /* Golden text color */
          }}
        >
          {chatName}
        </Button>
        {/* <FaEye className="me-2" /> View Profile
        </Button>
        <Nav.Link>
          <FaBell className="text-warning" />
        </Nav.Link> */}
        {/* <Nav.Link>
          <FaBell className="text-warning" />
        </Nav.Link> */}
      </Nav>
    </Navbar>
  );
};

export default ChatHeader;
