import React, { useState } from "react";
import {
  Container,
  Tabs,
  Tab,
  Form,
  Button,
  InputGroup,
} from "react-bootstrap";
import "./Styles/HomePage.css"; // Import the CSS file
import Login  from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const HomePage = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="homepage-background">
      <Container className="form-container">
        <h2 className="form-title">LynkHub</h2>
        <Tabs defaultActiveKey="login" id="auth-tabs" className="mb-3">
          {/* Login Tab */}
          <Tab eventKey="login" title="Login">
            <Login/>{/* Rendering Login Component */}
          </Tab>

          {/* Sign Up Tab */}
          <Tab eventKey="signup" title="Sign Up">
            <Signup/>{/* Rendering Signup Component*/}
          </Tab>
        </Tabs>
      </Container>
    </div>
  );
};

export default HomePage;
