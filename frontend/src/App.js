import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
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
