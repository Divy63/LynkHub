import React from "react";
import { Modal, Button, Image } from "react-bootstrap";

const ProfileModal = ({ show, onHide, user }) => {
  if(!user){
    return null;
  }
  return (
    <Modal show={show} onHide={onHide} centered>
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
          className="fw-bold"
          style={{
            // color: "var(--off-white)",
            fontFamily: "Orbitron, sans-serif",
          }}
        >
          {user?.name || "User Name"}
        </Modal.Title>
      </Modal.Header>
      <Modal.Body
        className=" text-center"
        style={{
          backgroundColor: "var(--warm-sand)",
          color: "var(--slate-gray)",
        }}
      >
        <Image
          src={user?.profile || "https://via.placeholder.com/150"}
          alt={user.name || "User Name"}
          roundedCircle
          width="150"
          height="150"
          className="mb-3"
          style={{
            border: "3px solid var(--soft-taupe)",
          }}
        />
        <p
          style={{
            color: "var(--soft-taupe)",
            fontWeight: "bold",
          }}
        >
          Email:
        </p>
        <p
          style={{
            color: "var(--soft-taupe)",
            fontWeight: "bold",
          }}
        >
          {user?.email || "user@example.com"}
        </p>
      </Modal.Body>
      <Modal.Footer className="bg-dark border-0">
        <Button
          variant="outline-warning"
          onClick={onHide}
          className="w-100 close-button"
          style={{
            borderColor: "var(--soft-taupe)",
            color: "var(--off-white)",
            backgroundColor:"var(--soft-taupe)",
            transition: "background-color 0.3s ease, color 0.3s ease",
          }}
        >
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ProfileModal;
