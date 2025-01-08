import React from "react";
import { Badge } from "react-bootstrap";

const UserBadge = ({ user, handleFunction }) => {
  return (
    <Badge
    bg="light"
      text="warning"
      className="me-2"
      style={{ cursor: "pointer"}}
      onClick={handleFunction}
    >
      {user.name} ✖
    </Badge>
  );
};

export default UserBadge;
