import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Row } from "react-bootstrap";
import ClientFeedback from "../ClientFeedback/ClientFeedback";
import * as ReactBootstrap from 'react-bootstrap';

const Feedbacks = () => {
  const [loading, setLoading] = useState(true);
  const [clientsFeedbacks, setClientsFeedbacks] = useState([]);

  useEffect(() => {
    fetch("https://my-creative-agency.herokuapp.com/allreviews")
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        setClientsFeedbacks(data);
      })
      .catch(() => alert("An Error occurred"));
  }, []);

  return (
    <div className="feedbacks my-5">
      <h2 className="text-center">
        Clients <span style={{ color: "#7AB259" }}>Feedback</span>
      </h2>
      <Container>
        <Row>
          {loading &&
            <div className="text-danger m-5 d-flex align-items-center font-weight-bold">
              <ReactBootstrap.Spinner animation="border" />
              <span className="ml-3"> Loading please wait......</span>
            </div>}
          {clientsFeedbacks.map((clientFeedback) => (
            <ClientFeedback
              key={clientFeedback._id}
              clientFeedback={clientFeedback}
            />
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Feedbacks;
