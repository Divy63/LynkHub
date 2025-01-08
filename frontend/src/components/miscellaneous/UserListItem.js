import React from "react";
import { ListGroup } from "react-bootstrap";

const UserListItem = ({ user, handleFunction}) => {
  return (
    <ListGroup.Item
      className="d-flex justify-content-between align-items-center"
      action
      onClick={handleFunction}
    >
      <div>
        <img
          src={user.profile || "https://via.placeholder.com/40"}
          alt={user.name}
          className="rounded-circle me-2"
          width="30"
          height="30"
        />
        <span>{user.name}</span>
      </div>
      <small className="text-muted">{user.email}</small>
    </ListGroup.Item>
  );
};

export default UserListItem;
