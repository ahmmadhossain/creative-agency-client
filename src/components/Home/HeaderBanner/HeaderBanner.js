import React from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import frame from "../../../images/logos/frame.png";
import  "./HeaderBanner.css"

const HeaderBanner = () => {
  return (
    <Container className="banner">
      <Row>
        <Col className="align-self-center" md={4}>
          <h1>Let’s Grow Your Brand To The Next Level</h1>
          <br/>
          <p>
            Lorem, ipsum dolor sit amet consectetur adipisicing elit. Similique animi, quidem praesentium pariatur autem porro consequatur alias nobis, commodi unde ipsum in dolorum deleniti enim facilis culpa tempore ipsam nam.
          </p>
          <br/>
          <Button variant="dark">Hire us</Button>
        </Col>
        <Col md={8}>
          <Image src={frame} className="img-fluid" />
        </Col>
      </Row>
    </Container>
  );
};

export default HeaderBanner;
