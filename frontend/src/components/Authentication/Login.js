import React, {useState} from 'react'
import { Form, Button, InputGroup } from 'react-bootstrap';
import { FaEye, FaEyeSlash } from "react-icons/fa"; // Import icons

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const[email, setEmail] = useState();
    const[password, setPassword] = useState();
    const submitLogin=()=>{};
    
    return (
      <Form>
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
              variant="outline-secondary"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <FaEyeSlash/> : <FaEye/>}
            </Button>
          </InputGroup>
        </Form.Group>

        <Button className="custom-login-button w-100" onClick={submitLogin}>
          Login
        </Button>
        <Button
          className="custom-guest-button w-100 mt-2"
          onClick={() => {
            // handle guest login
            setEmail("guest@lynkhub.com");
            setPassword("lynkme");
          }}
        >
          Get Guest User Credentials
        </Button>
      </Form>
    );
}

export default Login
