import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import React, {useEffect} from "react";
import { Routes, Route } from "react-router-dom";
import HomePage from "./Pages/HomePage";
import ChatsPage from "./Pages/ChatsPage";



function App() {
useEffect(() => {
  const adjustHeight = () => {
    const vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty("--vh", `${vh}px`);
  };

  window.addEventListener("resize", adjustHeight);
  adjustHeight();

  return () => {
    window.removeEventListener("resize", adjustHeight);
  };
}, []);

  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<HomePage/>} exact></Route>
        <Route path="/chat" element={<ChatsPage />} exact></Route>
      </Routes>
    </div>
  );
}

export default App;
