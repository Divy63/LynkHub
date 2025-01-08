import React, { useState } from "react";
import { ChatState } from "../Context/chatProvider";
import SearchResult from "../components/miscellaneous/SearchResult";
import Chats from "../components/Chats";
import ChatOnDisplay from "../components/ChatOnDisplay";
import { Row, Col, Container } from "react-bootstrap";
import "./Styles/ChatsPage.css";
import ChatPageHeader from "../components/miscellaneous/ChatPageHeader";

const ChatsPage = () => {
  const { user } = ChatState();
  const [fetchAgain,setFetchAgain]=useState(false);

  return (
    // <div>
    //   {user && <SearchResult />}
    //   {user && <Chats />}
    //   {user && <ChatOnDisplay />}
    // </div>
    <div className="chat-page">
      {/* Header */}
      <ChatPageHeader user={user}/>
    {user ? (
    <Container fluid>
      
        <Row>
          {/* Sidebar: Chats */}
          <Col xs={4} className="chat-sidebar">
            <SearchResult />
            <Chats fetchAgain={fetchAgain}/>
          </Col>

          {/* Main Chat Area */}
          <Col xs={8} className="chat-display">
            <ChatOnDisplay fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />
          </Col>
        </Row>
        </Container>
      ) : (
        <div className="text-center text-warning mt-5">
          <h3>Please log in to access chats!</h3>
        </div>
      )}
    </div>
  );
};

export default ChatsPage;
