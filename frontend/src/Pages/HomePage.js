import React from "react";
import Container from "react-bootstrap/Container";
import { Avatar } from "@ark-ui/react/avatar";

import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const HomePage = () => {
  return (
    <Container fluid="xl" centerContent>
      <Avatar.Root>
        {/* <Avatar.Fallback>PA</Avatar.Fallback> */}
        <Avatar.Image src="https://github.com/Divy63/LynkHub/blob/main/frontend/src/Images/LynkHubLogo.webp" />
      </Avatar.Root>
    </Container>
  );
};

export default HomePage;
