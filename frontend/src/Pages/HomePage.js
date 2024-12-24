import React, { useState } from "react";
import { FaHubspot } from "react-icons/fa";

import {
  Container,
  Tabs,
  Tab,
} from "react-bootstrap";
import "./Styles/HomePage.css"; // Import the CSS file
import Login  from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const HomePage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="homepage-background">
      <Container className="form-container">
        <h2 className="form-title">
          LynkHub
          <FaHubspot style={{ marginRight: "10px", color: "#F59E0B" }} />
        </h2>
        <Tabs defaultActiveKey="login" id="auth-tabs" className="mb-3">
          {/* Login Tab */}
          <Tab className="custom-label" eventKey="login" title="Login">
            <Login />
            {/* Rendering Login Component */}
          </Tab>

          {/* Sign Up Tab */}
          <Tab className="custom-label" eventKey="signup" title="Sign Up">
            <Signup />
            {/* Rendering Signup Component*/}
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default HomePage;
