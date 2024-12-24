import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import { InputGroup, Button } from "react-bootstrap";
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [confirmPassword, setConfirmPassword] = useState();
  const [pic, setPic] = useState();

  const setProfilePicture = (picture) => {};
  const submitSignUp = () => {};
  return (
    <Form>
      <Form.Group className="mb-3" controlId="formName">
        <Form.Label>Name *</Form.Label>
        <Form.Control
          id="first-name"
          type="text"
          placeholder="Enter your name"
          onChange={(event) => setName(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formEmail">
        <Form.Label>Email Address *</Form.Label>
        <Form.Control
          type="email"
          placeholder="Enter your email address"
          onChange={(event) => setEmail(event.target.value)}
          required
        />
      </Form.Group>

      <Form.Group className="mb-3" controlId="formPassword">
        <Form.Label>Password *</Form.Label>
        <InputGroup>
          <Form.Control
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
        <Form.Label>Confirm Password *</Form.Label>
        <InputGroup>
          <Form.Control
            type="password"
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
        <Form.Label>Profile Picture</Form.Label>
        <Form.Control
          type="file"
          accept="image/*"
          onChange={(event) => setProfilePicture(event.target.files[0])}
        />
      </Form.Group>

      <Button
        className="custom-signup-button w-100"
        variant="outline-secondary"
        onClick={submitSignUp}
      >
        Sign Up
      </Button>
    </Form>
  );
};

export default Signup;
