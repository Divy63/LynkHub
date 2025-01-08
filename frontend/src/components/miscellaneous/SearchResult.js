import React, { useState } from "react";
import {
  InputGroup,
  FormControl,
  Button,
  Spinner,
  ListGroup,
  Toast,
} from "react-bootstrap";
import axios from "axios";
import { ChatState } from "../../Context/chatProvider";
import { FaTimes,FaSearch} from "react-icons/fa";
const SearchResult = () => {
  const { user, setSelectedChat, chats, setChats } = ChatState();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const [hasSearched, setHasSearched] = useState(false);

  const handleSearch = async () => {
    if (!search.trim()) return;

    try {
      setLoading(true);
      setHasSearched(true);
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.get(
        `/api/user?search=${search.trim()}`,
        config
      );
      setLoading(false);
      setSearchResult(data);
      console.log(data);
    } catch (error) {
      console.error(error.message);
      setLoading(false);
      setShowToast(true);
      setToastMessage("Error searching for users");
    }
  };

  const handleClearSearch=async()=>{
    setSearch("");
    setSearchResult([]);
    setHasSearched(false);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setSearch(value);

    // Reset hasSearched and searchResult if the input is cleared
    if (!value.trim()) {
      setHasSearched(false);
      setSearchResult([]);
    }
  };
  const handleStartChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(`/api/chat`, { userId }, config);
      if (!chats.find((c) => c.id === data._id)) setChats([data, ...chats]);

      setSelectedChat(data);
      setLoadingChat(false);
      console.log("Chat started:", data);
      setSearch("");
      setSearchResult([]);
      setHasSearched(false);
    } catch (error) {
      console.error(error.message);
      setLoadingChat(false);
      setShowToast(true);
      setToastMessage("Error starting chat");
    }

  };

  return (
    <div className="search-result-container">
      <InputGroup>
        <FormControl
          placeholder="Search Users..."
          value={search}
          onChange={handleInputChange}
          className="bg-dark text-warning border-warning"
          style={{
            backgroundColor: "var(--warm-sand)",
            color: "var(--slate-gray)",
            borderColor: "var(--soft-taupe)",
          }}
        />
        <Button
          style={{
            backgroundColor: "var(--soft-taupe)",
            borderColor: "var(--soft-taupe)",
            color: "var(--off-white)",
          }}
          onClick={hasSearched ? handleClearSearch : handleSearch}
          disabled={loading}
        >
          {loading ? (
            <Spinner animation="border" size="sm" />
          ) : hasSearched ? (
            <FaTimes /> // Cross symbol for Clear
          ) : (
            <FaSearch /> // Search label
          )}
        </Button>
      </InputGroup>

      {searchResult.length > 0 && (
        <ListGroup className="list-group">
          {searchResult.map((user) => (
            <ListGroup.Item
              key={user._id}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <img
                  src={
                    user.profile ||
                    "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg"
                  }
                  alt={user.name}
                  className="rounded-circle me-3"
                  width="40"
                  height="40"
                />
                <strong>{user.name}</strong>
                <div className="email-text">{user.email}</div>
              </div>
              <Button
                variant="outline-warning"
                size="sm"
                onClick={() => handleStartChat(user._id)}
                disabled={loadingChat}
                style={{
                  borderColor: "var(--soft-taupe)",
                  color: "var(--soft-taupe)",
                }}
              >
                {loadingChat ? (
                  <Spinner animation="border" size="sm" />
                ) : (
                  "Chat"
                )}
              </Button>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {searchResult.length === 0 && hasSearched && !loading && (
        <div className="email-text text-center">No results found.</div>
      )}

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

export default SearchResult;
