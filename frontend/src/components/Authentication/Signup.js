import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { Toast } from "react-bootstrap";
import { InputGroup, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons
import { header } from "framer-motion/client";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [toastMessage, setToastMessage] = useState("");
  const navigate = useNavigate();
  const setProfilePicture = (picture) => {
    setLoading(true);
    if (picture === undefined) {
      setToastMessage("Please select a profile picture.");
      setShowToast(true);
      setLoading(false);
      return;
    }

    if (picture.type === "image/jpeg" || picture.type === "image/png") {
      const data = new FormData();
      data.append("file", picture);
      data.append("upload_preset", "Lynkhub");
      data.append("cloud_name", "dx6a8iuqj");
      fetch("https://api.cloudinary.com/v1_1/dx6a8iuqj/image/upload", {
        method: "post",
        body: data,
      })
        .then((res) => res.json())
        .then((data) => {
          setPic(data.url.toString());
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setLoading(false);
        });
    } else {
      setToastMessage("Please select a valid image file ( JPG or PNG ).");
      setShowToast(true);
      setLoading(false);
      return;
    }
  };
  const submitSignUp = async () => {
    setLoading(true);
    if (
      name === undefined ||
      email === undefined ||
      password === undefined ||
      confirmPassword === undefined
    ) {
      setToastMessage("Please fill in all fields.");
      setShowToast(true);
      setLoading(false);
      return;
    }

    if (password !== confirmPassword) {
      setToastMessage("Passwords do not match!.");
      setShowToast(true);
      setLoading(false);
      return;
    }

    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        "/api/user",
        { name, email, password, pic },
        config
      );
      setToastMessage("Registered Successfully!");
      setShowToast(true);

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("chats");
    } catch (error) {
      setToastMessage("Failed to register");
      setShowToast(true);
      setLoading(false);
      console.log(error?.response?.data || error.message || error);
    }finally{
      setLoading(false);
    }
  };
  return (
    <div>
      <Form>
        <Form.Group className="mb-3" controlId="formName">
          <Form.Label className="custom-label">Name *</Form.Label>
          <Form.Control
            className="custom-input"
            // id="first-name"
            type="text"
            placeholder="Enter your name"
            onChange={(event) => setName(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formEmailSignUp">
          <Form.Label className="custom-label">Email Address *</Form.Label>
          <Form.Control
            className="custom-input"
            type="email"
            placeholder="Enter your email address"
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="formPasswordSignUp">
          <Form.Label className="custom-label">Password *</Form.Label>
          <InputGroup>
            <Form.Control
              className="custom-input"
              type={showPassword ? "text" : "password"}
              placeholder="Enter password"
              onChange={(event) => setPassword(event.target.value)}
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

        <Form.Group className="mb-3" controlId="formConfirmPassword">
          <Form.Label className="custom-label">Confirm Password *</Form.Label>
          <InputGroup>
            <Form.Control
              className="custom-input"
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              onChange={(event) => setConfirmPassword(event.target.value)}
              required
            />
            <Button
              className="custom-show-button"
              variant="outline-secondary"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
            >
              {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
            </Button>
          </InputGroup>
        </Form.Group>

        <Form.Group controlId="profile" className="mb-3">
          <Form.Label className="custom-label">Profile Picture</Form.Label>
          <Form.Control
            className="custom-input"
            type="file"
            accept="image/*"
            onChange={(event) => setProfilePicture(event.target.files[0])}
          />
        </Form.Group>

        <Button
          className="custom-signup-button w-100"
          variant="outline-secondary"
          onClick={submitSignUp}
          disabled={loading}
        >
          Sign Up
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

export default Signup;
