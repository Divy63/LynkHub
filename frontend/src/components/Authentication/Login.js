import React, { useState } from "react";
import { Form, Button, InputGroup, Toast } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons
import axios from "axios";
import { useNavigate } from "react-router-dom";
const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();

  const submitLogin = async () => {
    if (!email || !password) {
      setToastMessage("Please fill in all fields.");
      setShowToast(true);
      setLoading(false);
      return;
    }
    setLoading(true);
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user/login",
        { email, password },
        config
      );
      setToastMessage("Login Successful!");
      setShowToast(true);

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("chats");
    } catch (error) {
      setToastMessage("Failed to Login");
      setShowToast(true);
      setLoading(false);
      console.log(error?.response?.data || error.message || error);
    }
  };

  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formEmail">
          <Form.Label className="custom-label">Email Address *</Form.Label>
          <Form.Control
            className="custom-input"
            type="email"
            value={email}
            placeholder="Enter your email address"
            onChange={(event) => setEmail(event.target.value.trim())}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPassword">
          <Form.Label className="custom-label">Password *</Form.Label>
          <InputGroup>
            <Form.Control
              className="custom-input"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              value={password}
              onChange={(event) => setPassword(event.target.value.trim())}
              required
            />
            <Button
              className="custom-show-button"
              variant="outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
        </Form.Group>

        <Button
          className="custom-login-button w-100"
          variant="outline-secondary"
          onClick={submitLogin}
          disabled={loading}
        >
          Login
        </Button>
        <Button
          className="custom-guest-button w-100 mt-2"
          variant="outline-secondary"
          onClick={() => {
            // handle guest login
            setEmail("guest@lynkhub.com");
            setPassword("lynkme");
          }}
        >
          Get Guest User Credentials
        </Button>
      </Form>

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

export default Login;
