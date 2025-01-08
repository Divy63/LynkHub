import React, { useState } from "react";
import { InputGroup, FormControl, Button } from "react-bootstrap";


const MessageInput = () => {
    const [message, setMessage] = useState("");

    const handleSendMessage = () => {
      if (message.trim()) {
        // onSendMessage(message);
        setMessage("");
      }
    };
    return (
      <InputGroup className="p-3">
        <FormControl
          placeholder="Enter a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="bg-dark text-warning border-warning"
        />
        <Button
          variant="warning"
          onClick={handleSendMessage}
          className="send-button"
        >
          Send
        </Button>
      </InputGroup>
    );
};

export default MessageInput;
