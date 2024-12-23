import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Button } from "react-bootstrap";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/Homepage";
import ChatsPage from "./Pages/ChatsPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>} exact></Route>
        <Route path="/chats" element={<ChatsPage />} exact></Route>
      </Routes>
      {/* <Button variant="primary">Click me</Button> */}
    </div>
  );
}

export default App;
